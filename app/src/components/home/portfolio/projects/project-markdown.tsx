import React, { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import useProjectStore from "@/store/projects/projects-store";
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";

import { technologies } from "@/components/base/technologies";
import type { TechName } from "@/components/base/technologies";
import { MarkdownRender } from "@/components/home/editor/markdown-renderer";

/** Convert a project name into a URL-friendly slug for the .md filename */
function nameToSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

const TechChip: React.FC<{ tech: TechName }> = ({ tech }) => {
  const info = technologies[tech];
  return (
    <a
      href={info?.aboutLink}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md
        bg-ctp-surface0 border border-ctp-surface1 text-ctp-subtext1 text-xs font-mono
        hover:border-ctp-blue hover:text-ctp-text transition-colors"
    >
      {info?.icon && <span className="text-sm leading-none">{info.icon}</span>}
      <span>{info?.name ?? tech}</span>
    </a>
  );
};

const SectionHeading: React.FC<{
  children: React.ReactNode;
  color?: string;
}> = ({ children, color = "bg-ctp-blue" }) => (
  <div className="flex items-center gap-3 mt-10 mb-4">
    <span className={cn("w-0.5 h-4 rounded-full shrink-0", color)} />
    <h2 className="text-xs font-semibold uppercase tracking-widest text-ctp-subtext0">
      {children}
    </h2>
    <span className="flex-1 border-t border-ctp-surface1" />
  </div>
);

type LoadState = "loading" | "loaded" | "error";

interface ProjectMarkdownProps {
  projectId: string;
}

const ProjectMarkdown: React.FC<ProjectMarkdownProps> = ({ projectId }) => {
  const project = useProjectStore((state) =>
    state.projects.find((p) => p.name === projectId),
  );

  const [markdown, setMarkdown] = useState<string>("");
  const [loadState, setLoadState] = useState<LoadState>("loading");

  useEffect(() => {
    if (!project) return;

    const slug = nameToSlug(project.name);
    console.log(slug);
    const url = `/data/projects/${slug}.md`;

    setLoadState("loading");
    setMarkdown("");

    fetch(url)
      .then((res) => {
        if (!res.ok) throw new Error(`${res.status}`);
        return res.text();
      })
      .then((text) => {
        setMarkdown(text);
        setLoadState("loaded");
      })
      .catch(() => setLoadState("error"));
  }, [project]);

  // ── Project not in store yet ─────────────────────────────────────────────
  if (!project) {
    return (
      <div className="flex items-center justify-center h-full text-ctp-overlay0 font-mono text-sm">
        Loading project…
      </div>
    );
  }

  return (
    <article className="max-w-2xl mx-auto px-6 py-10 font-mono text-sm text-ctp-text leading-relaxed">
      {/* ── Title block ───────────────────────────────────────────────────── */}
      <div className="mb-2">
        <h1 className="text-[22px] font-bold text-ctp-text leading-tight">
          {project.name}
        </h1>
        {project.tagline && (
          <p className="mt-1 text-ctp-blue italic text-sm">
            &gt;&nbsp;{project.tagline}
          </p>
        )}
      </div>

      {/* action links */}
      <div className="flex items-center gap-3 mt-4">
        {project.githubLink && project.githubLink !== "private-repository" && (
          <a
            href={project.githubLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs text-ctp-subtext1 hover:text-ctp-mauve transition-colors"
          >
            <FaGithub className="w-3.5 h-3.5" />
            GitHub
          </a>
        )}
        {project.liveLink && (
          <>
            <span className="text-ctp-surface2">·</span>
            <a
              href={project.liveLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs text-ctp-subtext1 hover:text-ctp-blue transition-colors"
            >
              <FaExternalLinkAlt className="w-3 h-3" />
              Live Demo
            </a>
          </>
        )}
      </div>

      {/* ── Tech stack (always from JSON) ─────────────────────────────────── */}
      {project.technologies.length > 0 && (
        <>
          <SectionHeading color="bg-ctp-yellow">Tech Stack</SectionHeading>
          <div className="flex flex-wrap gap-2">
            {project.technologies.map((tech) => (
              <TechChip key={tech} tech={tech as TechName} />
            ))}
          </div>
        </>
      )}

      {/* ── Markdown body ─────────────────────────────────────────────────── */}
      {loadState === "loading" && (
        <div className="mt-8 space-y-3 animate-pulse">
          {[80, 60, 90, 50, 70].map((w, i) => (
            <div
              key={i}
              className="h-3 rounded bg-ctp-surface1"
              style={{ width: `${w}%` }}
            />
          ))}
        </div>
      )}

      {loadState === "loaded" && markdown && (
        <div className="mt-8">
          <MarkdownRender markdown={markdown} />
        </div>
      )}
    </article>
  );
};

export default ProjectMarkdown;
