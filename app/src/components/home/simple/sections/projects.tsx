import React, { useEffect, useState } from "react";

import { technologies } from "@/components/base/technologies";
import { cn } from "@/lib/utils";
import useProjectStore from "@/store/projects/projects-store";
import type { Project } from "@/types";

import RevealOnScroll from "../reveal-on-scroll";
import SectionShell from "../section-shell";
import styles from "../simple.module.css";

const INITIAL_COUNT = 8;
const PRIVATE_REPO = "private-repository";

const techLabel = (tech: string) =>
  technologies[tech as keyof typeof technologies]?.name ?? tech;

/** Key features read "Title: detail" — split so the title can lead. */
const splitFeature = (feature: string) => {
  const separator = feature.indexOf(":");
  if (separator === -1) return { title: feature, detail: "" };
  return {
    title: feature.slice(0, separator),
    detail: feature.slice(separator + 1).trim(),
  };
};

const ProjectEntry: React.FC<{ project: Project }> = ({ project }) => {
  const isPrivate = project.githubLink === PRIVATE_REPO;
  const features = project.keyFeatures ?? [];
  const [open, setOpen] = useState(false);

  return (
    <article className="py-6">
      <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6">
        <h3 className="text-[15px] font-medium text-ctp-text">
          {project.name}
        </h3>
        <span className="shrink-0 font-source text-[12px] text-ctp-overlay0">
          {isPrivate ? "Private" : null}
        </span>
      </div>

      <p className="mt-2 max-w-[38rem] text-[14px] leading-[1.7] text-ctp-subtext0">
        {project.description}
      </p>

      <p className="mt-3 font-source text-[12px] leading-[1.7] text-ctp-overlay0">
        {project.technologies.map(techLabel).join(", ")}
      </p>

      <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-2 font-source text-[12px]">
        {!isPrivate && (
          <a
            href={project.githubLink}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              "text-ctp-subtext0 transition-colors duration-300 hover:text-ctp-mauve",
              styles.link
            )}
          >
            Source
          </a>
        )}

        {project.liveLink && (
          <a
            href={project.liveLink}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              "text-ctp-subtext0 transition-colors duration-300 hover:text-ctp-mauve",
              styles.link
            )}
          >
            Live
          </a>
        )}

        {features.length > 0 && (
          <button
            type="button"
            aria-expanded={open}
            onClick={() => setOpen((value) => !value)}
            className="inline-flex items-center gap-1.5 text-ctp-overlay1 transition-colors duration-300 hover:text-ctp-subtext0"
          >
            <span
              className={cn(
                "text-[10px] transition-transform duration-300",
                open && "rotate-90"
              )}
              aria-hidden
            >
              ▸
            </span>
            How it works
          </button>
        )}
      </div>

      {open && (
        <ul
          className={cn(
            "mt-4 flex max-w-[38rem] flex-col gap-2.5",
            styles.enter
          )}
        >
          {features.map((feature) => {
            const { title, detail } = splitFeature(feature);
            return (
              <li
                key={feature}
                className="text-[13px] leading-[1.65] text-ctp-subtext0"
              >
                <span className="text-ctp-subtext1">{title}.</span> {detail}
              </li>
            );
          })}
        </ul>
      )}
    </article>
  );
};

const Projects: React.FC = () => {
  const projects = useProjectStore((s) => s.projects);
  const error = useProjectStore((s) => s.error);
  const fetchProjects = useProjectStore((s) => s.fetchProjects);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  const visible = expanded ? projects : projects.slice(0, INITIAL_COUNT);
  const hidden = projects.length - visible.length;

  return (
    <SectionShell id="projects" title="Projects">
      {error && (
        <p className="text-[14px] text-ctp-subtext0">
          Couldn&apos;t load projects —{" "}
          <a
            href="https://github.com/utkarsh5026"
            target="_blank"
            rel="noopener noreferrer"
            className="text-ctp-mauve"
          >
            github.com/utkarsh5026
          </a>{" "}
          has all of them.
        </p>
      )}

      <div className="-my-6 divide-y divide-ctp-surface0/60">
        {visible.map((project) => (
          <RevealOnScroll key={project.name}>
            <ProjectEntry project={project} />
          </RevealOnScroll>
        ))}
      </div>

      {hidden > 0 && (
        <button
          type="button"
          onClick={() => setExpanded(true)}
          className={cn(
            "mt-10 font-source text-[12px] text-ctp-overlay1 transition-colors duration-300 hover:text-ctp-mauve",
            styles.link
          )}
        >
          {hidden} more →
        </button>
      )}
    </SectionShell>
  );
};

export default Projects;
