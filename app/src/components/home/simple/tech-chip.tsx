import React from "react";

import { technologies } from "@/components/base/technologies";
import { cn } from "@/lib/utils";

interface TechChipProps {
  tech: string;
  className?: string;
}

/**
 * Flat, quiet chip for a technology. Falls back to the raw key when a tech
 * isn't in the shared registry so nothing silently disappears.
 */
const TechChip: React.FC<TechChipProps> = ({ tech, className }) => {
  const entry = technologies[tech as keyof typeof technologies];

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-md border border-ctp-surface0 bg-ctp-surface0/30 px-2 py-1 text-[11px] font-medium text-ctp-subtext0",
        className
      )}
    >
      {entry?.icon && (
        <span className="text-[13px] leading-none">{entry.icon}</span>
      )}
      {entry?.name ?? tech}
    </span>
  );
};

export default TechChip;
