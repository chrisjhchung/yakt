import { pathToFileURL } from "url";
import path from "path";
import fs from "fs";
import ts from "typescript";

// Cache to avoid re-transpiling the same file
const cache = new Map<string, { code: string; mtime: number }>();

async function transpileYmlx(
    filePath: string,
    visited: Set<string> = new Set()
): Promise<string> {
    const absPath = path.resolve(filePath);

    if (visited.has(absPath)) {
        throw new Error(`Circular import detected: ${absPath}`);
    }
    visited.add(absPath);

    if (!fs.existsSync(absPath)) {
        throw new Error(`File not found: ${absPath}`);
    }

    // Check cache
    const stats = fs.statSync(absPath);
    const cached = cache.get(absPath);
    if (cached && cached.mtime === stats.mtimeMs) {
        return cached.code;
    }

    // Read source
    const sourceCode = fs.readFileSync(absPath, "utf-8");

    // Transpile TypeScript to JavaScript
    const result = ts.transpileModule(sourceCode, {
        compilerOptions: {
            target: ts.ScriptTarget.ES2022,
            module: ts.ModuleKind.ESNext,
            moduleResolution: ts.ModuleResolutionKind.NodeJs,
            esModuleInterop: true,
            allowSyntheticDefaultImports: true,
        },
    });

    let jsCode = result.outputText;

    // Cache the result
    cache.set(absPath, { code: jsCode, mtime: stats.mtimeMs });

    return jsCode;
}

export async function loadYmlx(filePath: string): Promise<any> {
    if (!filePath.endsWith(".ymlx")) {
        throw new Error("Only .ymlx files are supported in prototype");
    }

    const absPath = path.resolve(filePath);

    // First, handle .ymlx imports by loading them and writing them as separate modules
    const baseDir = path.dirname(absPath);
    const sourceCode = fs.readFileSync(absPath, "utf-8");
    const importRegex = /import\s+(\w+)\s+from\s+["']([^"']+)\.ymlx["']/g;

    // Collect all .ymlx imports
    const ymlxImports: Array<{ name: string; importPath: string; resolvedPath: string }> = [];
    let match;
    while ((match = importRegex.exec(sourceCode)) !== null) {
        const [, importName, importPath] = match;
        const resolvedImportPath = path.resolve(baseDir, importPath + ".ymlx");
        ymlxImports.push({ name: importName, importPath, resolvedPath: resolvedImportPath });
    }

    // Load all .ymlx imports and create cache files for them
    const cacheDir = path.join(process.cwd(), "node_modules", ".cache", "yakt");
    if (!fs.existsSync(cacheDir)) {
        fs.mkdirSync(cacheDir, { recursive: true });
    }

    const importMap = new Map<string, string>();

    if (ymlxImports.length > 0) {
        // Load all .ymlx imports first
        for (const imp of ymlxImports) {
            const importedMod = await loadYmlx(imp.resolvedPath);
            // Write the imported module to a cache file
            const importCacheFile = path.join(
                cacheDir,
                `${path.basename(imp.resolvedPath, ".ymlx")}-import-${Date.now()}.mjs`
            );

            // Export the default export
            const importCode = `export default ${JSON.stringify(importedMod.default, null, 2)};`;
            // Actually, we can't JSON.stringify functions. Let's use a different approach
            // Write the actual module code instead
            const importedJsCode = await transpileYmlx(imp.resolvedPath);
            fs.writeFileSync(importCacheFile, importedJsCode, "utf-8");
            const importUrl = pathToFileURL(importCacheFile).href;
            importMap.set(imp.name, importUrl);
        }
    }

    // Transpile the main file
    let jsCode = await transpileYmlx(absPath);

    // Replace .ymlx imports with imports from cache files
    if (ymlxImports.length > 0) {
        for (const imp of ymlxImports) {
            const importUrl = importMap.get(imp.name);
            if (importUrl) {
                // Replace the import statement
                jsCode = jsCode.replace(
                    new RegExp(`import\\s+${imp.name}\\s+from\\s+["'][^"']+\\.ymlx["']`, "g"),
                    `import ${imp.name} from "${importUrl}";`
                );
            }
        }
    }

    // Write to a temporary cache file (cacheDir already created above if needed)
    const cacheFile = path.join(
        cacheDir,
        `${path.basename(absPath, ".ymlx")}-${Date.now()}.mjs`
    );

    fs.writeFileSync(cacheFile, jsCode, "utf-8");

    try {
        const mod = await import(pathToFileURL(cacheFile).href);
        // Clean up after a delay
        setTimeout(() => {
            try {
                fs.unlinkSync(cacheFile);
            } catch {
                // Ignore cleanup errors
            }
        }, 1000);
        return mod;
    } catch (error) {
        try {
            fs.unlinkSync(cacheFile);
        } catch {
            // Ignore
        }
        throw error;
    }
}
