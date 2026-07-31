import React from "react";

import { cn } from "@/lib/utils";

import RevealOnScroll from "./reveal-on-scroll";

interface SectionShellProps {
  id: string;
  title: string;
  children: React.ReactNode;
}

/**
 * Editorial layout: on wide screens the section name sits in the left margin
 * and the content runs in a single measured column. On narrow screens the
 * label drops above the content.
 */
const SectionShell: React.FC<SectionShellProps> = ({ id, title, children }) => (
  <section
    id={id}
    data-simple-section={id}
    className="scroll-mt-16 border-t border-ctp-surface0/70 py-12 lg:grid lg:grid-cols-[7rem_1fr] lg:gap-10 lg:py-14"
  >
    <RevealOnScroll className="mb-6 lg:mb-0">
      <h2
        className={cn(
          "font-source text-[11px] uppercase tracking-[0.18em] text-ctp-overlay0",
          "lg:sticky lg:top-16"
        )}
      >
        {title}
      </h2>
    </RevealOnScroll>

    <div className="min-w-0">{children}</div>
  </section>
);

export default SectionShell;
