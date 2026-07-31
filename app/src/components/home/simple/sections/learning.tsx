import { ArrowUpRight } from "lucide-react";
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
  <SectionShell
    id="learning"
    title="Currently learning"
    accentClass="bg-ctp-teal"
    eyebrow="What I'm digging into right now, and why"
  >
    <div className="grid gap-4 sm:grid-cols-2">
      {currentLearningTechnologies.map((tech, index) => (
        <RevealOnScroll key={tech.name} delay={Math.min(index, 5) * 0.04}>
          <article
            className={cn(
              "h-full rounded-xl border border-ctp-surface0 bg-ctp-mantle/40 p-5 hover:border-ctp-surface1",
              styles.card
            )}
          >
            <div className="flex items-center justify-between gap-3">
              <h3 className="text-sm font-semibold text-ctp-text">
                {tech.name}
              </h3>
              <span className="shrink-0 rounded-full border border-ctp-surface1 px-2 py-0.5 text-[10px] uppercase tracking-wider text-ctp-overlay1">
                {tech.category}
              </span>
            </div>

            <p className="mt-2.5 text-[13px] leading-relaxed text-ctp-subtext0">
              {tech.description}
            </p>

            {isRealRepo(tech.repoLink) && (
              <a
                href={tech.repoLink}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  "mt-3 inline-flex items-center gap-1 text-[11px] font-medium text-ctp-teal",
                  styles.link
                )}
              >
                Repository
                <ArrowUpRight className="h-3 w-3" />
              </a>
            )}
          </article>
        </RevealOnScroll>
      ))}
    </div>
  </SectionShell>
);

export default Learning;
