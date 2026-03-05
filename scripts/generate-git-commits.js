#!/usr/bin/env node
// generate-git-commits.js
// Mines the last 20 git commits from the repo and writes
// app/public/git-commits.json for the Source Control panel to consume at runtime.

"use strict";

const { execSync } = require("child_process");
const path = require("path");
const fs = require("fs");
const https = require("https");

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

/**
 * Fetch the GitHub avatar URL for a given username.
 * Uses the public GitHub Users API — no auth required for public profiles.
 * Falls back to a Gravatar-style placeholder on failure.
 */
function fetchAvatarUrl(username) {
  return new Promise((resolve) => {
    if (!username) {
      resolve("https://avatars.githubusercontent.com/u/0?v=4");
      return;
    }

    const url = `https://api.github.com/users/${encodeURIComponent(username)}`;
    const options = {
      hostname: "api.github.com",
      path: `/users/${encodeURIComponent(username)}`,
      method: "GET",
      headers: {
        "User-Agent": "portfolio-git-commits-script/1.0",
        Accept: "application/vnd.github.v3+json",
      },
      timeout: 5000,
    };

    const req = https.request(options, (res) => {
      let body = "";
      res.on("data", (chunk) => (body += chunk));
      res.on("end", () => {
        try {
          const data = JSON.parse(body);
          if (data.avatar_url) {
            resolve(data.avatar_url);
          } else {
            resolve(`https://avatars.githubusercontent.com/u/0?v=4`);
          }
        } catch {
          resolve(`https://avatars.githubusercontent.com/u/0?v=4`);
        }
      });
    });

    req.on("error", () => {
      resolve(`https://avatars.githubusercontent.com/u/0?v=4`);
    });

    req.on("timeout", () => {
      req.destroy();
      resolve(`https://avatars.githubusercontent.com/u/0?v=4`);
    });

    req.end();
  });
}

/**
 * Try to resolve a GitHub username from a git author name.
 * Strategy: run `git shortlog` to get the most common name, and then
 * map known authors. Falls back to lowercase first-word of name.
 */
function guessGitHubUsername(repoRoot, authorName) {
  const remoteUrl = run("git remote get-url origin", repoRoot);
  // e.g. https://github.com/utkarsh5026/portfolio.git or git@github.com:utkarsh5026/portfolio.git
  const match = remoteUrl.match(/github\.com[/:]([^/]+)\//);
  if (match) {
    const repoOwner = match[1];
    // If this is the main author (single-dev project), map them
    const mainAuthorRaw = run(
      "git shortlog -sn --no-merges | head -1",
      repoRoot,
    );
    const mainAuthor = mainAuthorRaw.replace(/^\s*\d+\s+/, "").trim();

    if (
      mainAuthor.toLowerCase() === authorName.toLowerCase() ||
      authorName
        .toLowerCase()
        .includes(repoOwner.toLowerCase().replace(/[-_]/g, " ")) ||
      repoOwner.toLowerCase().includes(authorName.split(" ")[0].toLowerCase())
    ) {
      return repoOwner;
    }
  }

  return authorName.toLowerCase().replace(/\s+/g, "");
}

async function main() {
  const repoRoot = path.resolve(__dirname, "..");
  const NUM_COMMITS = 20;

  console.log(`🔍 Extracting last ${NUM_COMMITS} git commits…`);

  // Format: hash|author name|author email|ISO date|subject
  const rawLog = run(
    `git log -${NUM_COMMITS} --pretty=format:"%H%x1f%an%x1f%ae%x1f%aI%x1f%s"`,
    repoRoot,
  );

  if (!rawLog) {
    console.error("❌ Could not read git log. Is this a git repository?");
    process.exit(1);
  }

  const lines = rawLog.split("\n").filter(Boolean);
  console.log(`  Found ${lines.length} commits\n`);

  const avatarCache = new Map();

  const commits = [];

  for (const line of lines) {
    const [hash, author, email, date, ...subjectParts] = line.split("\x1f");
    const message = subjectParts.join("\x1f").trim();

    const shortHash = hash ? hash.slice(0, 7) : "";

    let avatarUrl = "https://avatars.githubusercontent.com/u/0?v=4";

    if (email && email.includes("@")) {
      const noreplyMatch = email.match(
        /^(\d+)\+(.+)@users\.noreply\.github\.com$/,
      );
      if (noreplyMatch) {
        const uid = noreplyMatch[1];
        avatarUrl = `https://avatars.githubusercontent.com/u/${uid}?v=4`;
      } else {
        const cacheKey = (author || "").toLowerCase();
        if (avatarCache.has(cacheKey)) {
          avatarUrl = avatarCache.get(cacheKey);
        } else {
          const username = guessGitHubUsername(repoRoot, author || "");
          process.stdout.write(`  • Looking up @${username} (${author})… `);
          const fetched = await fetchAvatarUrl(username);
          avatarCache.set(cacheKey, fetched);
          avatarUrl = fetched;
          console.log("✓");
        }
      }
    }

    let insertions = 0;
    let deletions = 0;
    let filesChanged = 0;

    if (hash) {
      const shortStat =
        run(`git diff --shortstat "${hash}^" "${hash}"`, repoRoot) ||
        run(`git diff --shortstat --root "${hash}"`, repoRoot);

      if (shortStat) {
        const filesMatch = shortStat.match(/(\d+)\s+file/);
        const insMatch = shortStat.match(/(\d+)\s+insertion/);
        const delMatch = shortStat.match(/(\d+)\s+deletion/);
        if (filesMatch) filesChanged = parseInt(filesMatch[1], 10);
        if (insMatch) insertions = parseInt(insMatch[1], 10);
        if (delMatch) deletions = parseInt(delMatch[1], 10);
      }
    }

    commits.push({
      hash,
      shortHash,
      message: message || "(no message)",
      author: author || "Unknown",
      email: email || "",
      date: date || "",
      avatarUrl,
      insertions,
      deletions,
      filesChanged,
    });

    process.stdout.write(
      `  [${shortHash}] +${insertions} -${deletions} ~${filesChanged}f  ${(message || "").slice(0, 50)}${
        (message || "").length > 50 ? "…" : ""
      }\n`,
    );
  }

  // ── commitsByDate: bucket all commits from last 3 months by YYYY-MM-DD ──
  console.log("\n📅 Generating commit-by-date heatmap data…");
  const rawDates = run(
    'git log --format="%aI" --since="3 months ago"',
    repoRoot,
  );
  const commitsByDate = {};
  if (rawDates) {
    for (const line of rawDates.split("\n").filter(Boolean)) {
      const day = line.trim().slice(0, 10); // YYYY-MM-DD
      commitsByDate[day] = (commitsByDate[day] || 0) + 1;
    }
  }
  console.log(`  ${Object.keys(commitsByDate).length} active days`);

  // ── languageStats: count tracked files by extension ──
  console.log("\n📊 Generating language stats…");
  const EXT_MAP = {
    ".ts": "TypeScript",
    ".tsx": "TypeScript",
    ".js": "JavaScript",
    ".jsx": "JavaScript",
    ".css": "CSS",
    ".scss": "CSS",
    ".html": "HTML",
    ".json": "JSON",
    ".md": "Markdown",
    ".svg": "SVG",
  };
  const LANG_COLORS = {
    TypeScript: "#89b4fa",
    JavaScript: "#a6e3a1",
    CSS: "#cba6f7",
    HTML: "#fab387",
    JSON: "#f9e2af",
    Markdown: "#89dceb",
    SVG: "#f5c2e7",
    Other: "#6c7086",
  };

  const rawFiles = run("git ls-files", repoRoot);
  const langCounts = {};
  if (rawFiles) {
    for (const f of rawFiles.split("\n").filter(Boolean)) {
      const ext = path.extname(f).toLowerCase();
      const lang = EXT_MAP[ext] || "Other";
      langCounts[lang] = (langCounts[lang] || 0) + 1;
    }
  }

  const sorted = Object.entries(langCounts)
    .sort((a, b) => b[1] - a[1]);
  const top = sorted.slice(0, 6);
  const otherCount = sorted.slice(6).reduce((sum, [, c]) => sum + c, 0);
  const languageStats = top.map(([language, count]) => ({
    language,
    count,
    color: LANG_COLORS[language] || LANG_COLORS.Other,
  }));
  if (otherCount > 0) {
    languageStats.push({ language: "Other", count: otherCount, color: LANG_COLORS.Other });
  }
  console.log(`  ${languageStats.length} language groups`);

  const output = {
    generatedAt: new Date().toISOString(),
    commits,
    commitsByDate,
    languageStats,
  };

  const outPath = path.join(repoRoot, "app/public/git-commits.json");
  fs.writeFileSync(outPath, JSON.stringify(output, null, 2), "utf8");
  console.log(`\n✅ Written ${commits.length} commits to ${outPath}`);
}

main().catch((err) => {
  console.error("❌ Unexpected error:", err);
  process.exit(1);
});
