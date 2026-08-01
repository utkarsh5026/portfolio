import React from "react";

import { articles } from "@/components/home/portfolio/articles/articles-dump";
import { cn } from "@/lib/utils";

import RevealOnScroll from "../reveal-on-scroll";
import SectionShell from "../section-shell";
import styles from "../simple.module.css";

/** Numerals give the list a second column for the eye to run down. */
const Writing: React.FC = () => (
  <SectionShell id="writing" title="Writing">
    <ol className="flex flex-col">
      {articles.map((article, index) => (
        <RevealOnScroll as="li" key={article.link}>
          <a
            href={article.link}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex gap-5 border-b border-ctp-surface0/50 py-3.5"
          >
            <span className="w-5 shrink-0 pt-0.5 font-source text-[11px] tabular-nums text-ctp-overlay0 transition-colors duration-300 group-hover:text-ctp-mauve">
              {String(index + 1).padStart(2, "0")}
            </span>
            <span
              className={cn(
                "text-[15px] leading-[1.55] text-ctp-subtext1 transition-colors duration-300 group-hover:text-ctp-text",
                styles.link
              )}
            >
              {article.title}
            </span>
          </a>
        </RevealOnScroll>
      ))}
    </ol>
  </SectionShell>
);

export default Writing;
