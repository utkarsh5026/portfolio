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

const AUTHOR_MAP = {
  "Utkarsh Priyadarshi": {
    github: "utkarsh5026",
    avatar: "https://github.com/utkarsh5026.png",
  },
};

const TARGET_FILES = {
  home: "app/src/components/home/portfolio/intro/personal-intro.tsx",
  about: "app/src/components/home/portfolio/about/about-me.tsx",
  skills: "app/src/components/home/portfolio/skills/skills-section.tsx",
  projects: "app/src/components/home/portfolio/projects/projects-section.tsx",
  experience: "app/src/components/home/portfolio/work/work-experience.tsx",
  contact: "app/src/components/home/portfolio/contact/contact-me.tsx",
  learning: "app/src/components/home/portfolio/learning/learning-section.tsx",
  articles: "app/src/components/home/portfolio/articles/articles-section.tsx",
};

// Sub-component files to track individually (file → section they belong to)
const EXTRA_COMPONENT_FILES = [
  {
    file: "app/src/components/home/portfolio/skills/skill-card/skill-card.tsx",
    section: "skills",
  },
  {
    file: "app/src/components/home/portfolio/projects/featured/featured-project.tsx",
    section: "projects",
  },
  {
    file: "app/src/components/home/portfolio/articles/article-card.tsx",
    section: "articles",
  },
  {
    file: "app/src/components/home/portfolio/work/experience-details.tsx",
    section: "experience",
  },
];

const REPO_ROOT = path.resolve(__dirname, "..");

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

/**
 * Parse a file with ts-morph and return top-level React components
 * with their line ranges: [{ name, start, end }]
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

  return components;
}

/**
 * Parse porcelain git blame output and return the commit with the latest timestamp.
 * Porcelain format repeats commit header lines for each line blamed.
 */
function parseBlameForLatestCommit(blameOutput) {
  if (!blameOutput) return null;

  const commits = new Map(); // hash → { author, authorTime, summary }
  const lines = blameOutput.split("\n");

  let currentHash = null;

  for (const line of lines) {
    if (/^[0-9a-f]{40}\s/.test(line)) {
      currentHash = line.split(" ")[0];
      if (!commits.has(currentHash)) {
        commits.set(currentHash, {});
      }
    } else if (currentHash) {
      const entry = commits.get(currentHash);
      if (line.startsWith("author ")) {
        entry.author = line.slice(7).trim();
      } else if (line.startsWith("author-time ")) {
        entry.authorTime = parseInt(line.slice(12).trim(), 10);
      } else if (line.startsWith("summary ")) {
        entry.summary = line.slice(8).trim();
      } else if (line.startsWith("author-mail ")) {
        entry.authorMail = line.slice(12).trim().replace(/[<>]/g, "");
      }
    }
  }

  if (commits.size === 0) return null;

  // Pick the commit with the latest authorTime
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

  const result = {};

  for (const [section, relFile] of Object.entries(TARGET_FILES)) {
    const absFile = path.join(REPO_ROOT, relFile);

    if (!fs.existsSync(absFile)) {
      console.warn(`  [SKIP] ${section}: file not found at ${relFile}`);
      continue;
    }

    process.stdout.write(`  • ${section.padEnd(12)} → ${relFile}\n`);

    let components;
    try {
      components = extractComponents(absFile);
    } catch (err) {
      console.warn(`    [WARN] AST parse failed: ${err.message}`);
      continue;
    }

    if (components.length === 0) {
      console.warn(`    [WARN] No React components found in ${relFile}`);
      continue;
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
      };

      console.log(
        `${meta.shortHash} by ${meta.author} — "${meta.message.slice(0, 50)}"`,
      );
    }
  }

  // Process extra sub-component files
  console.log("\nProcessing sub-component files...");
  for (const { file: relFile, section } of EXTRA_COMPONENT_FILES) {
    const absFile = path.join(REPO_ROOT, relFile);

    if (!fs.existsSync(absFile)) {
      console.warn(`  [SKIP] ${relFile}: file not found`);
      continue;
    }

    process.stdout.write(`  • ${section.padEnd(12)} → ${relFile}\n`);

    let components;
    try {
      components = extractComponents(absFile);
    } catch (err) {
      console.warn(`    [WARN] AST parse failed: ${err.message}`);
      continue;
    }

    if (components.length === 0) {
      console.warn(`    [WARN] No React components found in ${relFile}`);
      continue;
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
      };

      console.log(
        `${meta.shortHash} by ${meta.author} — "${meta.message.slice(0, 50)}"`,
      );
    }
  }

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
