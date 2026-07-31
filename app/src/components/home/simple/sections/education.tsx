import React from "react";

import { education } from "@/components/home/portfolio/about/data/data";
import { cn } from "@/lib/utils";

import RevealOnScroll from "../reveal-on-scroll";
import SectionShell from "../section-shell";
import styles from "../simple.module.css";

const Education: React.FC = () => (
  <SectionShell id="education" title="Education">
    <ol className="flex flex-col gap-8">
      {education.map((item) => (
        <RevealOnScroll as="li" key={item.degree}>
          <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6">
            <h3 className="text-[15px] font-medium text-ctp-text">
              {item.degree}
            </h3>
            <span className="shrink-0 font-source text-[12px] text-ctp-overlay0">
              {item.duration}
            </span>
          </div>

          <a
            href={item.institutionUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              "mt-1 inline-block text-[14px] text-ctp-subtext0 transition-colors duration-300 hover:text-ctp-mauve",
              styles.link
            )}
          >
            {item.institution}
          </a>

          <p className="mt-2 max-w-[38rem] text-[14px] leading-[1.7] text-ctp-subtext0">
            {item.highlights.join(". ")}.
          </p>
        </RevealOnScroll>
      ))}
    </ol>
  </SectionShell>
);

export default Education;
