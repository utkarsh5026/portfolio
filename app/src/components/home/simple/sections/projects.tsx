import { ChevronRight, ExternalLink, Github, Lock } from "lucide-react";
import React, { useEffect, useState } from "react";

import { cn } from "@/lib/utils";
import useProjectStore from "@/store/projects/projects-store";
import type { Project } from "@/types";

import RevealOnScroll from "../reveal-on-scroll";
import SectionShell from "../section-shell";
import styles from "../simple.module.css";
import TechChip from "../tech-chip";

const INITIAL_COUNT = 6;
const PRIVATE_REPO = "private-repository";

/** Key features are written as "Title: detail" — split so the title can lead. */
const splitFeature = (feature: string) => {
  const separator = feature.indexOf(":");
  if (separator === -1) return { title: feature, detail: "" };
  return {
    title: feature.slice(0, separator),
    detail: feature.slice(separator + 1).trim(),
  };
};

const ProjectCard: React.FC<{ project: Project }> = ({ project }) => {
  const isPrivate = project.githubLink === PRIVATE_REPO;

  return (
    <article
      className={cn(
        "flex h-full flex-col rounded-xl border border-ctp-surface0 bg-ctp-mantle/40 p-5 hover:border-ctp-surface1",
        styles.card
      )}
    >
      <div className="flex items-start gap-3">
        {project.icon && (
          <span className="text-xl leading-none" aria-hidden>
            {project.icon}
          </span>
        )}
        <div className="min-w-0">
          <h3 className="text-base font-semibold text-ctp-text">
            {project.name}
          </h3>
          {project.tagline && (
            <p className="mt-0.5 text-xs text-ctp-overlay1">
              {project.tagline}
            </p>
          )}
        </div>
      </div>

      <p className="mt-3 text-[13px] leading-relaxed text-ctp-subtext0">
        {project.description}
      </p>

      {project.keyFeatures && project.keyFeatures.length > 0 && (
        <details className={cn("mt-3 group", styles.details)}>
          <summary className="inline-flex items-center gap-1 text-[11px] font-medium text-ctp-lavender">
            <ChevronRight className={cn("h-3 w-3", styles.chevron)} />
            {project.keyFeatures.length} highlights
          </summary>
          <ul className={cn("mt-2.5 flex flex-col gap-2", styles.disclosure)}>
            {project.keyFeatures.map((feature) => {
              const { title, detail } = splitFeature(feature);
              return (
                <li key={feature} className="text-[12px] leading-relaxed">
                  <span className="font-medium text-ctp-subtext1">{title}</span>
                  {detail && (
                    <span className="text-ctp-subtext0"> — {detail}</span>
                  )}
                </li>
              );
            })}
          </ul>
        </details>
      )}

      <div className="mt-4 flex flex-wrap gap-1.5">
        {project.technologies.slice(0, 6).map((tech) => (
          <TechChip key={tech} tech={tech} />
        ))}
        {project.technologies.length > 6 && (
          <span className="inline-flex items-center px-1.5 py-1 text-[11px] text-ctp-overlay0">
            +{project.technologies.length - 6}
          </span>
        )}
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-4 border-t border-ctp-surface0 pt-3">
        {isPrivate ? (
          <span className="inline-flex items-center gap-1.5 text-[11px] text-ctp-overlay0">
            <Lock className="h-3 w-3" />
            Private repository
          </span>
        ) : (
          <a
            href={project.githubLink}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              "inline-flex items-center gap-1.5 text-[11px] font-medium text-ctp-subtext0 transition-colors duration-300 hover:text-ctp-text",
              styles.link
            )}
          >
            <Github className="h-3 w-3" />
            Source
          </a>
        )}

        {project.liveLink && (
          <a
            href={project.liveLink}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              "inline-flex items-center gap-1.5 text-[11px] font-medium text-ctp-blue transition-colors duration-300 hover:text-ctp-sky",
              styles.link
            )}
          >
            <ExternalLink className="h-3 w-3" />
            Live
          </a>
        )}
      </div>
    </article>
  );
};

const Projects: React.FC = () => {
  const projects = useProjectStore((s) => s.projects);
  const isLoading = useProjectStore((s) => s.isLoading);
  const error = useProjectStore((s) => s.error);
  const fetchProjects = useProjectStore((s) => s.fetchProjects);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  const visible = expanded ? projects : projects.slice(0, INITIAL_COUNT);
  const hidden = projects.length - visible.length;

  return (
    <SectionShell
      id="projects"
      title="Projects"
      accentClass="bg-ctp-blue"
      eyebrow={
        projects.length > 0
          ? `${projects.length} things I've built · expand any card for highlights`
          : "Loading…"
      }
    >
      {error && (
        <p className="text-sm text-ctp-red">
          Couldn&apos;t load projects — see{" "}
          <a
            href="https://github.com/utkarsh5026"
            target="_blank"
            rel="noopener noreferrer"
            className="underline"
          >
            github.com/utkarsh5026
          </a>{" "}
          instead.
        </p>
      )}

      {isLoading && projects.length === 0 && (
        <div className="grid gap-4 sm:grid-cols-2">
          {["a", "b", "c", "d"].map((key) => (
            <div
              key={key}
              className="h-52 animate-pulse rounded-xl border border-ctp-surface0 bg-ctp-surface0/20"
            />
          ))}
        </div>
      )}

      <div className="grid gap-4 sm:grid-cols-2">
        {visible.map((project, index) => (
          <RevealOnScroll
            key={project.name}
            delay={Math.min(index, 5) * 0.04}
            className="h-full"
          >
            <ProjectCard project={project} />
          </RevealOnScroll>
        ))}
      </div>

      {hidden > 0 && (
        <div className="mt-7 flex justify-center">
          <button
            type="button"
            onClick={() => setExpanded(true)}
            className="rounded-lg border border-ctp-surface1 px-4 py-2 text-xs font-medium text-ctp-subtext0 transition-colors duration-300 hover:border-ctp-blue/50 hover:text-ctp-text"
          >
            Show all {projects.length} projects
          </button>
        </div>
      )}
    </SectionShell>
  );
};

export default Projects;
