import { ExternalLink } from "lucide-react";
import React from "react";

import { experiences } from "@/components/home/portfolio/work/experienceDump";
import { cn } from "@/lib/utils";

import RevealOnScroll from "../reveal-on-scroll";
import SectionShell from "../section-shell";
import styles from "../simple.module.css";
import TechChip from "../tech-chip";

const Experience: React.FC = () => (
  <SectionShell
    id="experience"
    title="Experience"
    accentClass="bg-ctp-peach"
    eyebrow={`${experiences.length} role${experiences.length === 1 ? "" : "s"}`}
  >
    <ol className="flex flex-col gap-8">
      {experiences.map((experience, index) => (
        <RevealOnScroll
          as="li"
          key={`${experience.company}-${experience.position}`}
          delay={index * 0.05}
        >
          <article
            className={cn(
              "rounded-xl border border-ctp-surface0 bg-ctp-mantle/40 p-5 sm:p-7 hover:border-ctp-surface1",
              styles.card
            )}
          >
            <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
              <div>
                <h3 className="text-base sm:text-lg font-semibold text-ctp-text">
                  {experience.position}
                </h3>
                <a
                  href={experience.companyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(
                    "mt-0.5 inline-flex items-center gap-1.5 text-sm text-ctp-peach",
                    styles.link
                  )}
                >
                  {experience.company}
                  <ExternalLink className="h-3 w-3" />
                </a>
              </div>
              <span className="shrink-0 font-source text-xs text-ctp-overlay1">
                {experience.duration}
              </span>
            </div>

            <ul className="mt-5 flex flex-col gap-4">
              {experience.achievements.map((achievement) => (
                <li key={achievement.title}>
                  <p className="text-sm font-medium text-ctp-subtext1">
                    {achievement.title}
                  </p>
                  <ul className="mt-1.5 flex flex-col gap-1">
                    {achievement.description.map((line) => (
                      <li
                        key={line}
                        className="flex gap-2.5 text-[13px] leading-relaxed text-ctp-subtext0"
                      >
                        <span
                          className="mt-[0.55rem] h-1 w-1 shrink-0 rounded-full bg-ctp-overlay0"
                          aria-hidden
                        />
                        {line}
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>

            <div className="mt-5 flex flex-wrap gap-1.5">
              {experience.technologies.map((tech) => (
                <TechChip key={tech} tech={tech} />
              ))}
            </div>
          </article>
        </RevealOnScroll>
      ))}
    </ol>
  </SectionShell>
);

export default Experience;
