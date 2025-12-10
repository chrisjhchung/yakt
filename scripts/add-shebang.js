import fs from "fs";
import path from "path";

const cliPath = path.join(process.cwd(), "dist", "cli.js");
const content = fs.readFileSync(cliPath, "utf-8");

// Only add shebang if it doesn't already exist
if (!content.startsWith("#!/usr/bin/env node")) {
  fs.writeFileSync(cliPath, "#!/usr/bin/env node\n" + content);
  console.log("Added shebang to dist/cli.js");
}

