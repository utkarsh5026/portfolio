import React, { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import useProjectStore from "@/store/projects/projects-store";
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";

import { technologies } from "@/components/base/technologies";
import type { TechName } from "@/components/base/technologies";
import { MarkdownRender } from "@/components/home/editor/markdown-renderer";

function nameToSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

const COVER_GRADIENTS = [
  "from-ctp-mauve/40 via-ctp-mantle to-ctp-base",
  "from-ctp-blue/40 via-ctp-mantle to-ctp-base",
  "from-ctp-green/40 via-ctp-mantle to-ctp-base",
  "from-ctp-peach/40 via-ctp-mantle to-ctp-base",
  "from-ctp-pink/40 via-ctp-mantle to-ctp-base",
  "from-ctp-teal/40 via-ctp-mantle to-ctp-base",
  "from-ctp-yellow/40 via-ctp-mantle to-ctp-base",
  "from-ctp-red/40 via-ctp-mantle to-ctp-base",
] as const;

function pickGradient(name: string): string {
  let hash = 0;
  for (let i = 0; i < name.length; i++)
    hash = (hash * 31 + name.charCodeAt(i)) >>> 0;
  return COVER_GRADIENTS[hash % COVER_GRADIENTS.length];
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

const CoverBand: React.FC<{ coverImage?: string; name: string }> = ({
  coverImage,
  name,
}) => {
  const gradient = pickGradient(name);

  if (coverImage) {
    return (
      <div className="relative w-full h-44 overflow-hidden rounded-t-xl">
        <img
          src={coverImage}
          alt={`${name} cover`}
          className="absolute inset-0 w-full h-full object-cover"
        />
        {/* Gradient overlay for legibility */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-ctp-base/40 to-ctp-base/90" />
      </div>
    );
  }

  return (
    <div
      className={cn(
        "relative w-full h-36 rounded-t-xl bg-gradient-to-b",
        gradient,
      )}
    >
      {/* Subtle noise texture via repeating tiny radial */}
      <div className="absolute inset-0 opacity-10 [background-image:radial-gradient(circle,_hsl(var(--ctp-overlay2))_1px,_transparent_1px)] [background-size:20px_20px]" />
    </div>
  );
};

const PageIcon: React.FC<{ icon?: string; name: string }> = ({
  icon,
  name,
}) => {
  const label = icon ?? name.charAt(0).toUpperCase();
  const isEmoji = icon !== undefined;

  return (
    <div
      className={cn(
        "relative -mt-14 ml-6 flex items-center justify-center z-10",
        "w-24 h-24 rounded-2xl shadow-md ring-[6px] ring-ctp-base",
        "bg-ctp-base text-5xl select-none",
        !isEmoji && "bg-ctp-surface0 text-ctp-mauve font-bold text-4xl",
      )}
    >
      {label}
    </div>
  );
};

const LoadingSkeleton: React.FC = () => (
  <div className="mt-8 space-y-3 animate-pulse px-6">
    {[80, 60, 90, 50, 70].map((w, i) => (
      <div
        key={i}
        className="h-3 rounded bg-ctp-surface1"
        style={{ width: `${w}%` }}
      />
    ))}
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

  if (!project) {
    return (
      <div className="flex items-center justify-center h-full text-ctp-overlay0 font-mono text-sm">
        Loading project…
      </div>
    );
  }

  return (
    <article className="max-w-4xl mx-auto font-mono text-sm text-ctp-text leading-relaxed mt-4">
      <CoverBand coverImage={project.coverImage} name={project.name} />
      <PageIcon icon={project.icon} name={project.name} />

      <div className="px-6 mt-6 mb-4">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-ctp-text leading-tight">
          {project.name}
        </h1>
        {project.tagline && (
          <p className="mt-3 text-ctp-subtext0 text-lg md:text-xl font-medium leading-relaxed">
            {project.tagline}
          </p>
        )}
      </div>

      <div className="flex items-center gap-3 px-6 mt-3">
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

      {project.technologies.length > 0 && (
        <div className="px-6">
          <SectionHeading color="bg-ctp-yellow">Tech Stack</SectionHeading>
          <div className="flex flex-wrap gap-2">
            {project.technologies.map((tech) => (
              <TechChip key={tech} tech={tech as TechName} />
            ))}
          </div>
        </div>
      )}

      {loadState === "loading" && <LoadingSkeleton />}

      {loadState === "loaded" && markdown && (
        <div className="mt-8 px-6 pb-10">
          <MarkdownRender markdown={markdown} />
        </div>
      )}

      {loadState === "error" && (
        <p className="px-6 mt-8 text-ctp-red text-xs font-mono">
          ⚠ Could not load project notes.
        </p>
      )}
    </article>
  );
};

export default ProjectMarkdown;
