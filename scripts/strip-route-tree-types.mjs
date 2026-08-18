import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const routeTreePath = resolve(root, "src/routeTree.gen.js");
const code = readFileSync(routeTreePath, "utf8");
const stripped = code.replace(/\nimport type \{ getRouter \}[\s\S]*$/u, "");

if (stripped !== code) {
  writeFileSync(routeTreePath, stripped, "utf8");
}
