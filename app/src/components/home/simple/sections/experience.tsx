import React from "react";

import { technologies } from "@/components/base/technologies";
import { experiences } from "@/components/home/portfolio/work/experienceDump";
import { cn } from "@/lib/utils";

import RevealOnScroll from "../reveal-on-scroll";
import SectionShell from "../section-shell";
import styles from "../simple.module.css";

const techLabel = (tech: string) =>
  technologies[tech as keyof typeof technologies]?.name ?? tech;

const Experience: React.FC = () => (
  <SectionShell id="experience" title="Experience">
    <ol className="flex flex-col gap-12">
      {experiences.map((experience) => (
        <RevealOnScroll
          as="li"
          key={`${experience.company}-${experience.position}`}
        >
          <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6">
            <h3 className="text-[19px] font-medium leading-tight tracking-[-0.01em] text-ctp-text">
              {experience.position}
            </h3>
            <span className="shrink-0 font-source text-[11px] uppercase tracking-[0.12em] text-ctp-overlay0">
              {experience.duration}
            </span>
          </div>

          <a
            href={experience.companyUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              "mt-1 inline-block text-[15px] text-ctp-subtext1 transition-colors duration-300 hover:text-ctp-mauve",
              styles.link
            )}
          >
            {experience.company}
          </a>

          {/* Each piece of work gets its own labelled block, so eleven
              bullets don't run together as one undifferentiated list. */}
          <div className="mt-6 flex flex-col gap-6">
            {experience.achievements.map((achievement) => (
              <div
                key={achievement.title}
                className="sm:grid sm:grid-cols-[10rem_1fr] sm:gap-6"
              >
                <p className="font-source text-[11px] uppercase leading-[1.5] tracking-[0.1em] text-ctp-overlay1 sm:pt-1">
                  {achievement.title}
                </p>
                <ul className="mt-2 flex flex-col gap-1.5 sm:mt-0">
                  {achievement.description.map((line) => (
                    <li
                      key={line}
                      className="text-[14px] leading-[1.65] text-ctp-subtext0"
                    >
                      {line}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <p className="mt-6 font-source text-[11px] leading-[1.7] text-ctp-overlay0">
            {experience.technologies.map(techLabel).join(" · ")}
          </p>
        </RevealOnScroll>
      ))}
    </ol>
  </SectionShell>
);

export default Experience;
