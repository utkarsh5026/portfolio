import { ExternalLink } from "lucide-react";
import React from "react";

import { education } from "@/components/home/portfolio/about/data/data";
import { cn } from "@/lib/utils";

import RevealOnScroll from "../reveal-on-scroll";
import SectionShell from "../section-shell";
import styles from "../simple.module.css";

const Education: React.FC = () => (
  <SectionShell id="education" title="Education" accentClass="bg-ctp-yellow">
    <ol className="flex flex-col gap-6">
      {education.map((item, index) => (
        <RevealOnScroll as="li" key={item.degree} delay={index * 0.05}>
          <div className="border-l-2 border-ctp-surface0 pl-5">
            <div className="flex flex-col gap-0.5 sm:flex-row sm:items-baseline sm:justify-between">
              <h3 className="text-sm sm:text-base font-semibold text-ctp-text">
                {item.degree}
              </h3>
              <span className="shrink-0 font-source text-xs text-ctp-overlay1">
                {item.duration}
              </span>
            </div>

            <a
              href={item.institutionUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                "mt-1 inline-flex items-center gap-1.5 text-[13px] text-ctp-yellow",
                styles.link
              )}
            >
              {item.institution}
              <ExternalLink className="h-3 w-3" />
            </a>

            <ul className="mt-2.5 flex flex-col gap-1">
              {item.highlights.map((highlight) => (
                <li
                  key={highlight}
                  className="flex gap-2.5 text-[13px] leading-relaxed text-ctp-subtext0"
                >
                  <span
                    className="mt-[0.55rem] h-1 w-1 shrink-0 rounded-full bg-ctp-overlay0"
                    aria-hidden
                  />
                  {highlight}
                </li>
              ))}
            </ul>
          </div>
        </RevealOnScroll>
      ))}
    </ol>
  </SectionShell>
);

export default Education;
