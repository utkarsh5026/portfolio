#!/usr/bin/env node
// generate-git-stats.js
// Mines real git history for each portfolio section and writes
// app/public/git-stats.json for the StatusBar to consume at runtime.

"use strict";

const { execSync } = require("child_process");
const path = require("path");
const fs = require("fs");

const SECTION_DIRS = {
  home: "app/src/components/home/portfolio/intro",
  about: "app/src/components/home/portfolio/about",
  skills: "app/src/components/home/portfolio/skills",
  projects: "app/src/components/home/portfolio/projects",
  experience: "app/src/components/home/portfolio/work",
  contact: "app/src/components/home/portfolio/contact",
  learning: "app/src/components/home/portfolio/learning",
  articles: "app/src/components/home/portfolio/articles",
  resume: "app/src/components/home/portfolio/resume",
};

function run(cmd, cwd) {
  try {
    return execSync(cmd, {
      cwd,
      encoding: "utf8",
      stdio: ["pipe", "pipe", "pipe"],
    }).trim();
  } catch {
    return "";
  }
}

function shortHash(hash) {
  return hash ? hash.slice(0, 7) : "";
}

function getStatsForDir(repoRoot, relDir) {
  const absDir = path.join(repoRoot, relDir);

  if (!fs.existsSync(absDir)) {
    return null;
  }

  const logLine = run(
    `git log -1 --format="%H|%ai|%s|%an" -- "${relDir}"`,
    repoRoot,
  );

  let lastCommitHash = "";
  let lastCommitDate = "";
  let lastCommitMessage = "";
  let lastAuthor = "";

  if (logLine) {
    const [hash, date, ...rest] = logLine.split("|");

    lastCommitHash = shortHash(hash);
    lastCommitDate = date ? date.trim() : "";

    if (rest.length >= 2) {
      lastAuthor = rest[rest.length - 1].trim();
      lastCommitMessage = rest
        .slice(0, rest.length - 1)
        .join("|")
        .trim();
    } else {
      lastCommitMessage = rest[0] ? rest[0].trim() : "";
      lastAuthor = "";
    }
  }

  const commitCountRaw = run(`git log --oneline -- "${relDir}"`, repoRoot);
  const commitCount = commitCountRaw
    ? commitCountRaw.split("\n").filter(Boolean).length
    : 0;

  let linesAdded = 0;
  let linesDeleted = 0;

  if (lastCommitHash) {
    const diffStat = run(
      `git diff --numstat "${lastCommitHash}^" "${lastCommitHash}" -- "${relDir}"`,
      repoRoot,
    );
    if (diffStat) {
      diffStat.split("\n").forEach((line) => {
        const parts = line.trim().split(/\s+/);
        if (parts.length >= 2) {
          const added = parseInt(parts[0], 10);
          const deleted = parseInt(parts[1], 10);
          if (!isNaN(added)) linesAdded += added;
          if (!isNaN(deleted)) linesDeleted += deleted;
        }
      });
    }
  }

  const lsFiles = run(`git ls-files -- "${relDir}"`, repoRoot);
  const fileCount = lsFiles ? lsFiles.split("\n").filter(Boolean).length : 0;

  const allDiffRaw = run(
    `git log --numstat --format="" -- "${relDir}"`,
    repoRoot,
  );
  let totalAdded = 0;
  let totalDeleted = 0;
  if (allDiffRaw) {
    allDiffRaw.split("\n").forEach((line) => {
      const parts = line.trim().split(/\s+/);
      if (parts.length >= 2) {
        const a = parseInt(parts[0], 10);
        const d = parseInt(parts[1], 10);
        if (!isNaN(a)) totalAdded += a;
        if (!isNaN(d)) totalDeleted += d;
      }
    });
  }

  return {
    lastCommitHash,
    lastCommitDate,
    lastCommitMessage,
    lastAuthor,
    commitCount,
    linesAdded,
    linesDeleted,
    totalAdded,
    totalDeleted,
    fileCount,
  };
}

function main() {
  const repoRoot = path.resolve(__dirname, "..");

  console.log("🔍 Generating git stats…");

  const sections = {};

  for (const [section, relDir] of Object.entries(SECTION_DIRS)) {
    process.stdout.write(`  • ${section.padEnd(12)} (${relDir})… `);
    const stats = getStatsForDir(repoRoot, relDir);
    if (stats) {
      sections[section] = stats;
      console.log(
        `✓  ${stats.commitCount} commits, last: "${stats.lastCommitMessage.slice(0, 50)}"`,
      );
    } else {
      console.log("⚠  directory not found, skipping");
    }
  }

  const output = {
    generatedAt: new Date().toISOString(),
    sections,
  };

  const outPath = path.join(repoRoot, "app/public/git-stats.json");
  fs.writeFileSync(outPath, JSON.stringify(output, null, 2), "utf8");
  console.log(`\n✅ Written to ${outPath}`);
}

main();
