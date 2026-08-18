// @lovable.dev/vite-tanstack-config already includes the following - do NOT add them manually
// or the app will break with duplicate plugins:
//   - TanStack devtools (dev-only, first), tanstackStart, viteReact, tailwindcss, tsConfigPaths,
//     nitro (build-only using cloudflare as a default target), VITE_* env injection, @ path alias,
//     React/TanStack dedupe, error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... }, etc... }) if needed.
import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

const routeTreePath = resolve("src/routeTree.gen.js");
const stripRouteTreeTypes = (code) =>
  code.replace(/\nimport type \{ getRouter \}[\s\S]*$/u, "");
const stripRouteTreeTypesFromDisk = () => {
  if (!existsSync(routeTreePath)) return;
  const code = readFileSync(routeTreePath, "utf8");
  const stripped = stripRouteTreeTypes(code);
  if (stripped !== code) {
    writeFileSync(routeTreePath, stripped, "utf8");
  }
};

export default defineConfig({
  vite: {
    plugins: [
      {
        name: "strip-generated-route-tree-types",
        enforce: "pre",
        configResolved() {
          stripRouteTreeTypesFromDisk();
        },
        buildStart() {
          stripRouteTreeTypesFromDisk();
        },
        transform(code, id) {
          if (!id.replaceAll("\\", "/").endsWith("/src/routeTree.gen.js")) {
            return null;
          }

          return {
            code: stripRouteTreeTypes(code),
            map: null,
          };
        },
      },
    ],
  },
  tanstackStart: {
    router: {
      generatedRouteTree: "routeTree.gen.js",
      disableTypes: true,
    },
    // Redirect TanStack Start's bundled server entry to src/server.js (our SSR error wrapper).
    // nitro/vite builds from this
    server: { entry: "server" },
  },
});
