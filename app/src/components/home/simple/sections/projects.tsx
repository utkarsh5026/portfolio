import React, { useState } from "react";

import { technologies } from "@/components/base/technologies";
import { cn } from "@/lib/utils";
import useProjectStore from "@/store/projects/projects-store";
import type { Project } from "@/types";

import RevealOnScroll from "../reveal-on-scroll";
import SectionShell from "../section-shell";
import styles from "../simple.module.css";

/** How many get the full treatment before the list turns compact. */
const SELECTED_COUNT = 5;
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

const linkClass = cn(
  "text-ctp-subtext0 transition-colors duration-300 hover:text-ctp-mauve"
);

const SelectedProject: React.FC<{ project: Project }> = ({ project }) => {
  const isPrivate = project.githubLink === PRIVATE_REPO;
  const features = project.keyFeatures ?? [];
  const [open, setOpen] = useState(false);

  return (
    <article className="py-7">
      <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6">
        <h3 className="text-[19px] font-medium leading-tight tracking-[-0.01em] text-ctp-text">
          {project.name}
        </h3>
        {isPrivate && (
          <span className="shrink-0 font-source text-[11px] uppercase tracking-[0.12em] text-ctp-overlay0">
            Private
          </span>
        )}
      </div>

      <p className="mt-2.5 max-w-[36rem] text-[15px] leading-[1.65] text-ctp-subtext1">
        {project.summary ?? project.description}
      </p>

      <p className="mt-3.5 font-source text-[11px] leading-[1.7] text-ctp-overlay0">
        {project.technologies.map(techLabel).join(" · ")}
      </p>

      <div className="mt-3.5 flex flex-wrap items-center gap-x-5 gap-y-2 font-source text-[12px]">
        {!isPrivate && (
          <a
            href={project.githubLink}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(linkClass, styles.link)}
          >
            Source
          </a>
        )}

        {project.liveLink && (
          <a
            href={project.liveLink}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(linkClass, styles.link)}
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
        <div
          className={cn(
            "mt-4 max-w-[36rem] border-l border-ctp-surface0 pl-5",
            styles.enter
          )}
        >
          {/* The summary is the scannable line; the full description only
              earns its length once someone has asked for detail. */}
          {project.summary && (
            <p className="text-[13px] leading-[1.7] text-ctp-subtext0">
              {project.description}
            </p>
          )}

          <ul
            className={cn(
              "flex flex-col gap-2.5",
              project.summary && "mt-3 border-t border-ctp-surface0/60 pt-3"
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
        </div>
      )}
    </article>
  );
};

/** One row, two columns: what it is on the left, its stack on the right. */
const CompactProject: React.FC<{ project: Project }> = ({ project }) => {
  const isPrivate = project.githubLink === PRIVATE_REPO;
  const Tag = isPrivate ? "div" : "a";

  return (
    <Tag
      {...(isPrivate
        ? {}
        : {
            href: project.githubLink,
            target: "_blank",
            rel: "noopener noreferrer",
          })}
      className="group flex flex-col gap-2 border-b border-ctp-surface0/50 py-4 sm:flex-row sm:items-start sm:gap-8"
    >
      <div className="min-w-0 sm:flex-1">
        <h3 className="text-[15px] font-medium text-ctp-text transition-colors duration-300 group-hover:text-ctp-mauve">
          {project.name}
        </h3>
        <p className="mt-1 text-[13.5px] leading-[1.6] text-ctp-subtext0">
          {project.summary ?? project.description}
        </p>
      </div>
      <p className="shrink-0 font-source text-[11px] leading-[1.7] text-ctp-overlay0 sm:w-48 sm:text-right">
        {project.technologies.slice(0, 3).map(techLabel).join(" · ")}
      </p>
    </Tag>
  );
};

const Projects: React.FC = () => {
  const projects = useProjectStore((s) => s.projects);
  const error = useProjectStore((s) => s.error);

  const selected = projects.slice(0, SELECTED_COUNT);
  const rest = projects.slice(SELECTED_COUNT);

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

      {/* Two tiers: a handful in full, the rest as one-line rows. Sixteen
          identical blocks read as a wall however short each one is. */}
      <div className="-mt-7 divide-y divide-ctp-surface0/60">
        {selected.map((project) => (
          <RevealOnScroll key={project.name}>
            <SelectedProject project={project} />
          </RevealOnScroll>
        ))}
      </div>

      {rest.length > 0 && (
        <div className="mt-12">
          <p className="font-source text-[11px] uppercase tracking-[0.14em] text-ctp-overlay0">
            Also built
          </p>
          <div className="mt-3">
            {rest.map((project) => (
              <RevealOnScroll key={project.name}>
                <CompactProject project={project} />
              </RevealOnScroll>
            ))}
          </div>
        </div>
      )}
    </SectionShell>
  );
};

export default Projects;
