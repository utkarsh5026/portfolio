import React from "react";

import { cn } from "@/lib/utils";

import RevealOnScroll from "./reveal-on-scroll";

interface SectionShellProps {
  id: string;
  title: string;
  /** Short line under the title, e.g. "1 role · 8 technologies". */
  eyebrow?: string;
  /** Full Tailwind class for the accent dot, e.g. "bg-ctp-peach". */
  accentClass: string;
  children: React.ReactNode;
  className?: string;
}

/**
 * Consistent heading + spacing for every block of the simple view.
 * `scroll-mt` keeps anchors clear of the sticky nav.
 */
const SectionShell: React.FC<SectionShellProps> = ({
  id,
  title,
  eyebrow,
  accentClass,
  children,
  className,
}) => (
  <section
    id={id}
    data-simple-section={id}
    className={cn("scroll-mt-24 py-12 sm:py-16", className)}
  >
    <RevealOnScroll className="mb-8 sm:mb-10">
      <div className="flex items-baseline gap-3">
        <span
          className={cn("h-1.5 w-1.5 rounded-full", accentClass)}
          aria-hidden
        />
        <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-ctp-text">
          {title}
        </h2>
      </div>
      {eyebrow && (
        <p className="mt-2 pl-[1.125rem] text-xs sm:text-sm text-ctp-overlay1 font-source">
          {eyebrow}
        </p>
      )}
    </RevealOnScroll>

    {children}
  </section>
);

export default SectionShell;
