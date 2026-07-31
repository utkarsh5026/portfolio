import React from "react";

import { currentLearningTechnologies } from "@/components/home/portfolio/learning/data";
import { cn } from "@/lib/utils";

import RevealOnScroll from "../reveal-on-scroll";
import SectionShell from "../section-shell";
import styles from "../simple.module.css";

/** A few entries still carry the placeholder repo URL — don't link those. */
const isRealRepo = (link?: string) =>
  Boolean(link) && !link!.includes("yourusername");

const Learning: React.FC = () => (
  <SectionShell id="learning" title="Learning">
    <ul className="flex flex-col gap-7">
      {currentLearningTechnologies.map((tech) => (
        <RevealOnScroll as="li" key={tech.name}>
          <h3 className="text-[15px] font-medium text-ctp-text">{tech.name}</h3>
          <p className="mt-1.5 max-w-[38rem] text-[14px] leading-[1.7] text-ctp-subtext0">
            {tech.description}
          </p>
          {isRealRepo(tech.repoLink) && (
            <a
              href={tech.repoLink}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                "mt-2 inline-block font-source text-[12px] text-ctp-overlay1 transition-colors duration-300 hover:text-ctp-mauve",
                styles.link
              )}
            >
              Source
            </a>
          )}
        </RevealOnScroll>
      ))}
    </ul>
  </SectionShell>
);

export default Learning;
