import React from "react";

import { cn } from "@/lib/utils";
import useViewModeStore from "@/store/view-mode-store";

interface SimpleViewButtonProps {
  className?: string;
  /** Compact rendering for the mobile top bar. */
  compact?: boolean;
}

/**
 * The escape hatch out of the editor UI. Sits top-right so a recruiter who
 * doesn't want to explore an IDE can get to a plain, scrollable page.
 */
const SimpleViewButton: React.FC<SimpleViewButtonProps> = ({
  className,
  compact = false,
}) => {
  const setMode = useViewModeStore((s) => s.setMode);

  return (
    <button
      type="button"
      onClick={() => setMode("simple")}
      title="Switch to a plain one-page version of this portfolio"
      className={cn(
        "shrink-0 whitespace-nowrap rounded-md border border-ctp-surface1/60 font-source text-xs",
        "text-ctp-subtext0 transition-colors duration-300",
        "hover:border-ctp-surface2 hover:text-ctp-text",
        compact ? "h-9 px-3" : "mr-2 h-7 self-center px-3",
        className
      )}
    >
      <span className="hidden sm:inline">I want a simple view</span>
      <span className="sm:hidden">Simple view</span>
    </button>
  );
};

export default SimpleViewButton;
