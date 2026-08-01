import React, { useEffect } from "react";

import { cn } from "@/lib/utils";
import useViewModeStore from "@/store/view-mode-store";

import styles from "./simple-view-button.module.css";

interface SimpleViewButtonProps {
  className?: string;
  /** Compact rendering for the mobile top bar. */
  compact?: boolean;
}

/**
 * The escape hatch out of the editor UI. It is the one filled control in the
 * chrome, because a recruiter who doesn't want to explore an IDE has to spot
 * it within a couple of seconds or they never will.
 */
const SimpleViewButton: React.FC<SimpleViewButtonProps> = ({
  className,
  compact = false,
}) => {
  const setMode = useViewModeStore((s) => s.setMode);
  const hintSeen = useViewModeStore((s) => s.hintSeen);
  const markHintSeen = useViewModeStore((s) => s.markHintSeen);

  // The nudge runs once per visitor, then never again.
  useEffect(() => {
    if (hintSeen) return;
    const timer = window.setTimeout(markHintSeen, 8000);
    return () => window.clearTimeout(timer);
  }, [hintSeen, markHintSeen]);

  return (
    <button
      type="button"
      onClick={() => setMode("simple")}
      title="Switch to a plain one-page version of this portfolio"
      className={cn(
        "relative shrink-0 whitespace-nowrap rounded-md font-source text-xs font-medium",
        "bg-ctp-mauve text-ctp-crust shadow-sm",
        "transition-[background-color,transform] duration-300",
        "hover:bg-ctp-lavender active:scale-[0.98]",
        compact ? "h-8 px-3" : "mr-2 h-7 self-center px-3.5",
        !hintSeen && styles.nudge,
        className
      )}
    >
      <span className="hidden sm:inline">I want a simple view</span>
      <span className="sm:hidden">Simple view</span>
    </button>
  );
};

export default SimpleViewButton;
