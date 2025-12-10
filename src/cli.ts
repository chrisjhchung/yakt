import path from "path";
import fs from "fs";
import { loadYmlx } from "./compiler/load-ymlx.js";
import { renderManifest } from "./compiler/render.js";

function parseArgs() {
  const args = process.argv.slice(2);
  
  if (args.length === 0) {
    return { command: null, manifest: null, stdout: false };
  }

  const command = args[0];
  const remaining = args.slice(1);
  
  // Check for -o or --stdout flag
  const stdout = remaining.includes("-o") || remaining.includes("--stdout");
  
  // Get manifest file (first non-flag argument)
  const manifest = remaining.find(arg => !arg.startsWith("-")) || null;

  return { command, manifest, stdout };
}

function showHelp() {
  console.log(`
Usage: yakt <command> [options] [manifest]

Commands:
  compile, build, render    Compile a .ymlx manifest to YAML

Options:
  -o, --stdout               Output to stdout instead of file

Examples:
  yakt compile examples/yaml/Manifest.ymlx
  yakt compile examples/yaml/Manifest.ymlx -o
  yakt build examples/json/Manifest.ymlx --stdout
`);
}

async function compile(manifestFile: string | null, stdout: boolean) {
  const defaultManifest = "examples/yaml/Manifest.ymlx";
  const manifestPath = manifestFile 
    ? path.resolve(manifestFile)
    : path.resolve(defaultManifest);

  if (!fs.existsSync(manifestPath)) {
    console.error(`Error: Manifest file not found: ${manifestPath}`);
    process.exit(1);
  }

  // load the Manifest component
  const mod = await loadYmlx(manifestPath);
  const manifestExport = mod.default;

  // call the top-level component
  const manifestOutput =
    typeof manifestExport === "function"
      ? await manifestExport()
      : manifestExport;

  // render YAML
  const yamlOutput = renderManifest(manifestOutput);

  if (stdout) {
    // Output to stdout
    process.stdout.write(yamlOutput);
  } else {
    // write output to an "out" directory relative to the manifest file
    const manifestDir = path.dirname(manifestPath);
    const outDir = path.join(manifestDir, "out");
    if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

    const outFile = path.join(outDir, "manifest.yaml");
    fs.writeFileSync(outFile, yamlOutput, "utf-8");

    const itemCount = Array.isArray(manifestOutput) ? manifestOutput.length : 1;
    console.log(`Generated manifest.yaml with ${itemCount} YAML document(s) in ${path.relative(process.cwd(), outDir)}/`);
  }
}

async function main() {
  const { command, manifest, stdout } = parseArgs();

  if (!command || command === "help" || command === "--help" || command === "-h") {
    showHelp();
    return;
  }

  const compileCommands = ["compile", "build", "render"];
  if (compileCommands.includes(command)) {
    await compile(manifest, stdout);
  } else {
    console.error(`Error: Unknown command "${command}"`);
    showHelp();
    process.exit(1);
  }
}

main().catch((error) => {
  console.error("Error:", error.message);
  process.exit(1);
});
