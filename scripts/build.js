#!/usr/bin/env node
// build.js
// Full production build pipeline:
//   1. Unshallow git clone (needed in CI/Vercel environments)
//   2. Generate all git data JSON files
//   3. Generate activity feed
//   4. Run Vite build
//
// Usage (from repo root):  bun scripts/build.js
// Usage (from app/):       bun ../scripts/build.js

"use strict";

const { execSync } = require("child_process");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");
const APP = path.join(ROOT, "app");

function run(cmd, opts = {}) {
  console.log(`\n> ${cmd}`);
  execSync(cmd, { stdio: "inherit", ...opts });
}

try {
  run("git fetch --unshallow", { cwd: ROOT });
} catch {
  // Not a shallow clone or fetch failed — safe to ignore
}

run("bun scripts/generate-git-stats.js", { cwd: ROOT });
run("bun scripts/generate-git-commits.js", { cwd: ROOT });
run("bun scripts/generate-git-meta.js", { cwd: ROOT });

run("bun scripts/generate-activity-feed.js", { cwd: ROOT });

run("bun run build", { cwd: APP });

console.log("\nBuild complete.");
