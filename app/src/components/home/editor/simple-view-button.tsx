import { Sparkles } from "lucide-react";
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
        "group inline-flex shrink-0 items-center gap-1.5 rounded-md border border-ctp-surface1/70",
        "bg-gradient-to-r from-ctp-mauve/10 to-ctp-blue/10 text-ctp-subtext1",
        "transition-all duration-300 hover:border-ctp-mauve/50 hover:text-ctp-text",
        "hover:from-ctp-mauve/20 hover:to-ctp-blue/20",
        compact ? "h-9 px-2.5" : "h-7 px-2.5 self-center mr-1",
        className
      )}
    >
      <Sparkles
        className={cn(
          "text-ctp-mauve transition-transform duration-300 group-hover:scale-110",
          compact ? "h-4 w-4" : "h-3.5 w-3.5"
        )}
      />
      <span className="whitespace-nowrap text-xs font-medium">
        <span className="hidden sm:inline">I want a simple view</span>
        <span className="sm:hidden">Simple view</span>
      </span>
    </button>
  );
};

export default SimpleViewButton;
