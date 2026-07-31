import React from "react";

import { articles } from "@/components/home/portfolio/articles/articles-dump";
import { cn } from "@/lib/utils";

import RevealOnScroll from "../reveal-on-scroll";
import SectionShell from "../section-shell";
import styles from "../simple.module.css";

const Writing: React.FC = () => (
  <SectionShell id="writing" title="Writing">
    <ul className="flex flex-col gap-3.5">
      {articles.map((article) => (
        <RevealOnScroll as="li" key={article.link}>
          <a
            href={article.link}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              "text-[14px] leading-[1.6] text-ctp-subtext0 transition-colors duration-300 hover:text-ctp-mauve",
              styles.link
            )}
          >
            {article.title}
          </a>
        </RevealOnScroll>
      ))}
    </ul>
  </SectionShell>
);

export default Writing;
