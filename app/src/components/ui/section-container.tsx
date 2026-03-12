import React from "react";

import { cn } from "@/lib/utils";

interface SectionContainerProps {
  children: React.ReactNode;
  className?: string;
}

/**
 * Outer wrapper for portfolio section panels.
 *
 * Replaces the repeated three-div nesting:
 * `relative w-full overflow-hidden` →
 * `bg-ctp-surface0/10 rounded-2xl/3xl overflow-hidden` →
 * `p-3 sm:p-4 md:p-6 lg:p-8`
 */
const SectionContainer: React.FC<SectionContainerProps> = ({
  children,
  className,
}) => (
  <div className="relative w-full overflow-hidden">
    <div
      className={cn(
        "relative bg-ctp-surface0/10 rounded-2xl sm:rounded-3xl overflow-hidden w-full",
        className
      )}
    >
      <div className="p-3 sm:p-4 md:p-6 lg:p-8">{children}</div>
    </div>
  </div>
);

export default SectionContainer;
