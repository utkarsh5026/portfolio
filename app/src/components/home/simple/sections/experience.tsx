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
            <h3 className="text-[15px] font-medium text-ctp-text">
              {experience.position},{" "}
              <a
                href={experience.companyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  "font-normal text-ctp-subtext0 transition-colors duration-300 hover:text-ctp-mauve",
                  styles.link
                )}
              >
                {experience.company}
              </a>
            </h3>
            <span className="shrink-0 font-source text-[12px] text-ctp-overlay0">
              {experience.duration}
            </span>
          </div>

          <div className="mt-5 flex flex-col gap-5">
            {experience.achievements.map((achievement) => (
              <div key={achievement.title}>
                <p className="text-[14px] text-ctp-subtext1">
                  {achievement.title}
                </p>
                <ul className="mt-1 list-disc pl-4 marker:text-ctp-surface2">
                  {achievement.description.map((line) => (
                    <li
                      key={line}
                      className="text-[14px] leading-[1.7] text-ctp-subtext0"
                    >
                      {line}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <p className="mt-5 font-source text-[12px] leading-[1.7] text-ctp-overlay0">
            {experience.technologies.map(techLabel).join(", ")}
          </p>
        </RevealOnScroll>
      ))}
    </ol>
  </SectionShell>
);

export default Experience;
