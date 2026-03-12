#!/usr/bin/env node
// generate-activity-feed.js
// Fetches recent commits from multiple GitHub repos via the GitHub API
// and writes app/public/data/activity-feed.json for the Activity Feed panel.
//
// Usage:
//   GITHUB_TOKEN=ghp_xxx bun scripts/generate-activity-feed.js
//   (token is optional but recommended to avoid 60 req/hr rate limit)

"use strict";

const https = require("https");
const fs = require("fs");
const path = require("path");

const GITHUB_USER = "utkarsh5026";

/**
 * How many recently-pushed repos to include.
 * Repos are discovered dynamically via /users/{user}/repos sorted by push date.
 */
const MAX_REPOS = 10;

/** How many recent commits to fetch per repo */
const COMMITS_PER_REPO = 15;

/**
 * Returns the top MAX_REPOS repos the user has pushed to most recently,
 * skipping forks so only original work appears in the feed.
 */
async function discoverRepos() {
  const data = await githubGet(
    `/users/${GITHUB_USER}/repos?sort=pushed&direction=desc&per_page=${MAX_REPOS}&type=owner`,
  );
  if (!Array.isArray(data)) return [];

  return data
    .filter((r) => !r.fork && !r.archived)
    .slice(0, MAX_REPOS)
    .map((r) => r.full_name);
}

const TOKEN = process.env.GITHUB_TOKEN || "";

function githubGet(apiPath) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: "api.github.com",
      path: apiPath,
      method: "GET",
      headers: {
        "User-Agent": "portfolio-activity-feed/1.0",
        Accept: "application/vnd.github.v3+json",
        ...(TOKEN ? { Authorization: `token ${TOKEN}` } : {}),
      },
      timeout: 10000,
    };

    const req = https.request(options, (res) => {
      let body = "";
      res.on("data", (c) => (body += c));
      res.on("end", () => {
        if (res.statusCode === 404) {
          resolve(null);
          return;
        }
        if (res.statusCode >= 400) {
          reject(
            new Error(`GitHub API ${res.statusCode} for ${apiPath}: ${body}`),
          );
          return;
        }
        try {
          resolve(JSON.parse(body));
        } catch {
          reject(new Error(`JSON parse error for ${apiPath}`));
        }
      });
    });

    req.on("error", reject);
    req.on("timeout", () => {
      req.destroy();
      reject(new Error(`Timeout fetching ${apiPath}`));
    });

    req.end();
  });
}

async function fetchRepoMeta(ownerRepo) {
  const data = await githubGet(`/repos/${ownerRepo}`);
  if (!data) return null;

  return {
    name: data.name,
    fullName: data.full_name,
    description: data.description || "",
    url: data.html_url,
    language: data.language || "Unknown",
    stars: data.stargazers_count || 0,
    forks: data.forks_count || 0,
    topics: data.topics || [],
    defaultBranch: data.default_branch || "main",
    updatedAt: data.pushed_at || data.updated_at,
  };
}

async function fetchRepoCommits(ownerRepo, branch) {
  const data = await githubGet(
    `/repos/${ownerRepo}/commits?sha=${branch}&per_page=${COMMITS_PER_REPO}`,
  );
  if (!data || !Array.isArray(data)) return [];

  return data.map((c) => ({
    hash: c.sha,
    shortHash: c.sha.slice(0, 7),
    message: c.commit?.message?.split("\n")[0] || "(no message)",
    author: c.commit?.author?.name || c.author?.login || "Unknown",
    authorLogin: c.author?.login || "",
    avatarUrl:
      c.author?.avatar_url || `https://avatars.githubusercontent.com/u/0?v=4`,
    date: c.commit?.author?.date || "",
    url: c.html_url,
  }));
}

async function fetchRepoLanguages(ownerRepo) {
  const data = await githubGet(`/repos/${ownerRepo}/languages`);
  if (!data) return {};
  return data;
}

const LANG_COLORS = {
  TypeScript: "#89b4fa",
  JavaScript: "#a6e3a1",
  CSS: "#cba6f7",
  HTML: "#fab387",
  JSON: "#f9e2af",
  Markdown: "#89dceb",
  SVG: "#f5c2e7",
  Go: "#89dceb",
  Python: "#f9e2af",
  Rust: "#fab387",
  Java: "#eba0ac",
  Shell: "#a6e3a1",
  Dockerfile: "#89b4fa",
  Other: "#6c7086",
};

function topLanguages(langBytes, maxLangs = 4) {
  const total = Object.values(langBytes).reduce((s, n) => s + n, 0);
  if (total === 0) return [];

  return Object.entries(langBytes)
    .sort((a, b) => b[1] - a[1])
    .slice(0, maxLangs)
    .map(([lang, bytes]) => ({
      language: lang,
      percent: Math.round((bytes / total) * 100),
      color: LANG_COLORS[lang] || LANG_COLORS.Other,
    }));
}

async function processRepo(ownerRepo) {
  process.stdout.write(`  → ${ownerRepo} … `);

  try {
    const [meta, langBytes] = await Promise.all([
      fetchRepoMeta(ownerRepo),
      fetchRepoLanguages(ownerRepo),
    ]);

    if (!meta) {
      console.log("not found, skipping");
      return null;
    }

    const commits = await fetchRepoCommits(ownerRepo, meta.defaultBranch);
    const languages = topLanguages(langBytes);

    console.log(
      `✓  (${commits.length} commits, ${languages[0]?.language ?? "?"} primary)`,
    );

    return {
      ...meta,
      languages,
      recentCommits: commits,
    };
  } catch (err) {
    console.log(`✗  (${err.message})`);
    return null;
  }
}

async function main() {
  console.log("🚀 Generating activity feed…\n");

  if (!TOKEN) {
    console.warn(
      "⚠️  No GITHUB_TOKEN found — unauthenticated requests are limited to 60/hr.\n" +
        "   Set GITHUB_TOKEN env var to avoid rate limiting.\n",
    );
  }

  const repos = await discoverRepos();
  console.log(`📦 Discovered ${repos.length} repos: ${repos.join(", ")}\n`);

  const results = [];
  for (const repo of repos) {
    const result = await processRepo(repo);
    if (result) results.push(result);
  }

  const timeline = results
    .flatMap((project) =>
      project.recentCommits.map((commit) => ({
        ...commit,
        repo: project.name,
        repoFullName: project.fullName,
        repoUrl: project.url,
        repoLanguage: project.language,
      })),
    )
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const projects = {};
  for (const p of results) {
    const { recentCommits, ...rest } = p;
    projects[p.name] = {
      ...rest,
      commitCount: recentCommits.length,
      latestCommit: recentCommits[0] ?? null,
    };
  }

  const output = {
    generatedAt: new Date().toISOString(),
    githubUser: GITHUB_USER,
    projects,
    timeline,
  };

  const outDir = path.resolve(__dirname, "../app/public/data");
  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

  const outPath = path.join(outDir, "activity-feed.json");
  fs.writeFileSync(outPath, JSON.stringify(output, null, 2), "utf8");

  console.log(
    `\n✅ ${results.length} repos · ${timeline.length} total commits`,
  );
  console.log(`   Written to ${outPath}`);
}

main().catch((err) => {
  console.error("❌ Fatal error:", err);
  process.exit(1);
});
