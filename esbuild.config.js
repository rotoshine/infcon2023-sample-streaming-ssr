import { build } from "esbuild";
import fs from "fs";
import path from "path";

const pkg = JSON.parse(fs.readFileSync(path.resolve("./package.json")));

const external = [
  ...Object.keys({
    ...pkg.dependencies,
    ...pkg.peerDependencies,
  }),
  "../dist/entry-server.js",
];

build({
  entryPoints: ["./src/_start.ts", "./src/_serverless.ts"],
  outdir: "dist",
  target: "node18",
  platform: "node",
  bundle: true,
  minify: false,
  sourcemap: true,
  format: "esm",
  outExtension: {
    ".js": ".mjs",
  },
  external,
}).catch((err) => {
  console.log(err);
  process.exit(1);
});
