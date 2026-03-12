#!/usr/bin/env node
// generate-git-meta.js
// Uses ts-morph to find React component line ranges in section files,
// then runs `git blame -L` to get per-component last-commit metadata.
// Outputs: app/public/data/git-meta.json

"use strict";

const { execSync } = require("child_process");
const path = require("path");
const fs = require("fs");
const tsMorphPath = require.resolve("ts-morph", {
  paths: [path.join(__dirname, "../app/node_modules")],
});
const { Project, SyntaxKind } = require(tsMorphPath);

/**
 * @typedef {{ github: string, avatar: string }} AuthorInfo
 * @typedef {Record<string, AuthorInfo>} AuthorMap
 */

/**
 * @typedef {{ name: string, start: number, end: number }} ComponentRange
 */

/**
 * @typedef {{ hash: string, shortHash: string, author: string, date: string | null, message: string }} CommitMeta
 */

/**
 * @typedef {{ added: number, deleted: number }} DiffStat
 */

/**
 * @typedef {{ section: string, file: string, lines: [number, number], diffStat: DiffStat } & CommitMeta} ComponentMeta
 */

/**
 * @typedef {{ generatedAt: string, authors: AuthorMap, components: Record<string, ComponentMeta> }} GitMetaOutput
 */

/** @type {AuthorMap} */
const AUTHOR_MAP = {
  "Utkarsh Priyadarshi": {
    github: "utkarsh5026",
    avatar: "https://github.com/utkarsh5026.png",
  },
};

const BASE = "app/src/components/home/portfolio";

const BASE_COMPONENTS = {
  TechBadge: "app/src/components/base/TechBadge.tsx",
};

const SECTIONS = {
  home: "intro/personal-intro.tsx",
  about: "about/about-me.tsx",
  skills: "skills/skills-section.tsx",
  projects: "projects/projects-section.tsx",
  experience: "work/work-experience.tsx",
  contact: "contact/contact-me.tsx",
  learning: "learning/learning-section.tsx",
  articles: "articles/articles-section.tsx",
  resume: "resume/resume-section.tsx",
};

const TARGET_FILES = Object.fromEntries(
  Object.entries(SECTIONS).map(([section, primary]) => [
    section,
    `${BASE}/${primary}`,
  ]),
);

/**
 * Recursively collect all .tsx files under a directory.
 * @param {string} dir
 * @returns {string[]}
 */
function collectTsxFiles(dir) {
  const results = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      results.push(...collectTsxFiles(full));
      continue;
    }

    if (entry.isFile() && entry.name.endsWith(".tsx")) {
      results.push(full);
    }
  }
  return results;
}

/**
 * Build EXTRA_COMPONENT_FILES at runtime by scanning each section directory
 * and excluding the primary file and pure data/icon files.
 * @returns {{ section: string, file: string }[]}
 */
function discoverExtraFiles() {
  const extras = [];
  const EXCLUDED_NAMES = new Set(["data.tsx", "icon-map.tsx"]);

  for (const [section, primary] of Object.entries(SECTIONS)) {
    const primaryAbs = path.join(REPO_ROOT, BASE, primary);
    const sectionDir = path.join(REPO_ROOT, BASE, path.dirname(primary));

    if (!fs.existsSync(sectionDir)) continue;

    for (const absFile of collectTsxFiles(sectionDir)) {
      if (
        absFile === primaryAbs ||
        EXCLUDED_NAMES.has(path.basename(absFile))
      ) {
        continue;
      }

      const relFile = path.relative(REPO_ROOT, absFile).replace(/\\/g, "/");
      extras.push({ section, file: relFile });
    }
  }
  return extras;
}

const REPO_ROOT = path.resolve(__dirname, "..");

/**
 * @param {string} cmd
 * @param {string} [cwd]
 * @returns {string}
 */
function run(cmd, cwd = REPO_ROOT) {
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

/** @type {Map<string, DiffStat>} */
const diffStatCache = new Map();

/**
 * Get total insertions/deletions for a commit hash.
 * Results are cached so each hash is only fetched once.
 * @param {string} hash
 * @returns {DiffStat}
 */
function getDiffStat(hash) {
  if (diffStatCache.has(hash)) return diffStatCache.get(hash);

  const out = run(`git show --stat --format="" ${hash}`);
  let added = 0;
  let deleted = 0;

  if (out) {
    const addMatch = out.match(/(\d+) insertion/);
    const delMatch = out.match(/(\d+) deletion/);
    if (addMatch) added = parseInt(addMatch[1], 10);
    if (delMatch) deleted = parseInt(delMatch[1], 10);
  }

  const stat = { added, deleted };
  diffStatCache.set(hash, stat);
  return stat;
}

/**
 * Parse a file with ts-morph and return top-level React components
 * with their line ranges.
 * @param {string} absFilePath
 * @returns {ComponentRange[]}
 */
function extractComponents(absFilePath) {
  const project = new Project({
    addFilesFromTsConfig: false,
    skipAddingFilesFromTsConfig: true,
    compilerOptions: { allowJs: true, jsx: 1 /* Preserve */ },
  });

  const sf = project.addSourceFileAtPath(absFilePath);
  const components = [];

  for (const fn of sf.getFunctions()) {
    const name = fn.getName();
    if (!name || !/^[A-Z]/.test(name)) continue;
    components.push({
      name,
      start: fn.getStartLineNumber(),
      end: fn.getEndLineNumber(),
    });
  }

  for (const varDecl of sf.getVariableDeclarations()) {
    const name = varDecl.getName();
    if (!name || !/^[A-Z]/.test(name)) continue;

    const init = varDecl.getInitializer();
    if (!init) continue;

    const kind = init.getKind();
    if (
      kind !== SyntaxKind.ArrowFunction &&
      kind !== SyntaxKind.FunctionExpression
    )
      continue;

    const stmt = varDecl.getParent()?.getParent();
    if (!stmt) continue;

    components.push({
      name,
      start: stmt.getStartLineNumber(),
      end: stmt.getEndLineNumber(),
    });
  }

  return components
    .sort((a, b) => b.end - b.start - (a.end - a.start))
    .slice(0, 2);
}

/**
 * Parse porcelain git blame output and return the commit with the latest timestamp.
 * Porcelain format repeats commit header lines for each line blamed.
 * @param {string} blameOutput
 * @returns {CommitMeta | null}
 */
function parseBlameForLatestCommit(blameOutput) {
  if (!blameOutput) return null;

  /** @type {Map<string, { author?: string, authorTime?: number, summary?: string, authorMail?: string }>} */
  const commits = new Map();
  const lines = blameOutput.split("\n");

  let currentHash = null;

  const fields = [
    { prefix: "author ", key: "author", parse: (v) => v },
    {
      prefix: "author-time ",
      key: "authorTime",
      parse: (v) => parseInt(v, 10),
    },
    { prefix: "summary ", key: "summary", parse: (v) => v },
    {
      prefix: "author-mail ",
      key: "authorMail",
      parse: (v) => v.replace(/[<>]/g, ""),
    },
  ];

  for (const line of lines) {
    if (/^[0-9a-f]{40}\s/.test(line)) {
      currentHash = line.split(" ")[0];
      if (!commits.has(currentHash)) {
        commits.set(currentHash, {});
      }
    } else if (currentHash) {
      const entry = commits.get(currentHash);

      for (const { prefix, key, parse } of fields) {
        if (line.startsWith(prefix)) {
          entry[key] = parse(line.slice(prefix.length).trim());
          break;
        }
      }
    }
  }

  if (commits.size === 0) return null;

  let latest = null;
  for (const [hash, data] of commits.entries()) {
    if (!latest || (data.authorTime ?? 0) > (latest.authorTime ?? 0)) {
      latest = { hash, ...data };
    }
  }

  if (!latest) return null;

  return {
    hash: latest.hash,
    shortHash: latest.hash.slice(0, 7),
    author: latest.author ?? "Unknown",
    date: latest.authorTime
      ? new Date(latest.authorTime * 1000).toISOString()
      : null,
    message: latest.summary ?? "",
  };
}

function main() {
  console.log("Generating git-meta.json (component-level blame)...");

  /** @type {Record<string, ComponentMeta>} */
  const result = {};

  function processFile(relFile, section) {
    const absFile = path.join(REPO_ROOT, relFile);

    if (!fs.existsSync(absFile)) {
      console.warn(`  [SKIP] ${section}: file not found at ${relFile}`);
      return;
    }

    process.stdout.write(`  • ${section.padEnd(12)} → ${relFile}\n`);

    let components;
    try {
      components = extractComponents(absFile);
    } catch (err) {
      console.warn(`    [WARN] AST parse failed: ${err.message}`);
      return;
    }

    if (components.length === 0) {
      console.warn(`    [WARN] No React components found in ${relFile}`);
      return;
    }

    for (const comp of components) {
      process.stdout.write(
        `    ↳ ${comp.name.padEnd(30)} lines ${comp.start}–${comp.end} … `,
      );

      const blameOut = run(
        `git blame -L ${comp.start},${comp.end} --porcelain -- "${relFile}"`,
      );

      const meta = parseBlameForLatestCommit(blameOut);

      if (!meta) {
        console.log("(no blame data)");
        continue;
      }

      result[comp.name] = {
        section,
        file: relFile,
        lines: [comp.start, comp.end],
        ...meta,
        diffStat: getDiffStat(meta.hash),
      };

      console.log(
        `${meta.shortHash} by ${meta.author} — "${meta.message.slice(0, 50)}"`,
      );
    }
  }

  for (const [section, relFile] of Object.entries(TARGET_FILES)) {
    processFile(relFile, section);
  }

  const extraFiles = discoverExtraFiles();
  console.log(`\nProcessing ${extraFiles.length} sub-component files...`);
  for (const { file: relFile, section } of extraFiles) {
    processFile(relFile, section);
  }

  console.log("\nProcessing base components...");
  for (const [, relFile] of Object.entries(BASE_COMPONENTS)) {
    processFile(relFile, "base");
  }

  const mdDir = path.join(REPO_ROOT, "app/public/data/projects");
  if (fs.existsSync(mdDir)) {
    const mdFiles = fs.readdirSync(mdDir).filter((f) => f.endsWith(".md"));
    console.log(`\nProcessing ${mdFiles.length} project markdown files...`);

    for (const filename of mdFiles) {
      const slug = filename.replace(/\.md$/, "");
      const relFile = `app/public/data/projects/${filename}`;
      const absFile = path.join(REPO_ROOT, relFile);

      process.stdout.write(`  • ${slug.padEnd(50)} → ${relFile}\n`);

      const blameOut = run(`git blame --porcelain -- "${relFile}"`);
      const meta = parseBlameForLatestCommit(blameOut);

      if (!meta) {
        console.log("    (no blame data)");
        continue;
      }

      const lineCount = fs.readFileSync(absFile, "utf8").split("\n").length;

      result[slug] = {
        section: "projects",
        file: relFile,
        lines: [1, lineCount],
        ...meta,
        diffStat: getDiffStat(meta.hash),
      };

      console.log(
        `    ${meta.shortHash} by ${meta.author} — "${meta.message.slice(0, 50)}"`,
      );
    }
  }

  /** @type {GitMetaOutput} */
  const output = {
    generatedAt: new Date().toISOString(),
    authors: AUTHOR_MAP,
    components: result,
  };

  const outPath = path.join(REPO_ROOT, "app/public/data/git-meta.json");
  fs.writeFileSync(outPath, JSON.stringify(output, null, 2), "utf8");
  console.log(
    `\nWritten to ${outPath} (${Object.keys(result).length} components)`,
  );
}

main();
