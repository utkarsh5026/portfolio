import { ArrowUpRight } from "lucide-react";
import React from "react";

import { articles } from "@/components/home/portfolio/articles/articles-dump";
import { cn } from "@/lib/utils";

import RevealOnScroll from "../reveal-on-scroll";
import SectionShell from "../section-shell";
import styles from "../simple.module.css";

const Writing: React.FC = () => (
  <SectionShell
    id="writing"
    title="Writing"
    accentClass="bg-ctp-pink"
    eyebrow={`${articles.length} articles on Medium — mostly databases, Go and language internals`}
  >
    <ul className="flex flex-col divide-y divide-ctp-surface0 border-y border-ctp-surface0">
      {articles.map((article, index) => (
        <RevealOnScroll as="li" key={article.link} delay={index * 0.04}>
          <a
            href={article.link}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-start justify-between gap-4 py-4 transition-colors duration-300"
          >
            <span
              className={cn(
                "text-[13px] sm:text-sm leading-relaxed text-ctp-subtext0 transition-colors duration-300 group-hover:text-ctp-text",
                styles.link
              )}
            >
              {article.title}
            </span>
            <ArrowUpRight className="mt-0.5 h-4 w-4 shrink-0 text-ctp-overlay0 transition-colors duration-300 group-hover:text-ctp-pink" />
          </a>
        </RevealOnScroll>
      ))}
    </ul>
  </SectionShell>
);

export default Writing;
