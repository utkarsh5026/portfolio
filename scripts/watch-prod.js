#!/usr/bin/env node
// Builds the project in watch mode and serves the production output at localhost:3000.
// Run from repo root: bun scripts/watch-prod.js

import { spawn } from "child_process";
import path from "path";
import { fileURLToPath } from "url";

const appDir = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  "../app",
);

function run(cmd, args, label) {
  const proc = spawn(cmd, args, {
    cwd: appDir,
    stdio: "inherit",
    shell: true,
  });
  proc.on("error", (err) => console.error(`[${label}] error:`, err.message));
  proc.on("exit", (code) => {
    if (code !== 0) {
      console.error(`[${label}] exited with code ${code}`);
      process.exit(code ?? 1);
    }
  });
  return proc;
}

console.log("Building initial production bundle...");
const initial = spawn("bun", ["run", "build"], {
  cwd: appDir,
  stdio: "inherit",
  shell: true,
});

initial.on("exit", (code) => {
  if (code !== 0) {
    console.error("Initial build failed.");
    process.exit(code ?? 1);
  }

  console.log("Initial build done. Starting watcher and preview server...\n");
  run("bunx", ["vite", "build", "--watch"], "build");
  run("bunx", ["vite", "preview", "--port", "3000", "--strictPort"], "preview");
});

for (const sig of ["SIGINT", "SIGTERM"]) {
  process.on(sig, () => process.exit(0));
}
