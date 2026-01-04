import React from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Phase } from "../config";

interface FlashcardNavigationProps {
  currentIndex: number;
  totalCards: number;
  onNavigate: (direction: number) => void;
  phase: Phase;
  canGoNext: boolean;
  canGoPrev: boolean;
}

const phaseColors = {
  problem: "bg-ctp-yellow",
  execution: "bg-ctp-blue",
  future: "bg-ctp-green",
};

const FlashcardNavigation: React.FC<FlashcardNavigationProps> = ({
  currentIndex,
  totalCards,
  onNavigate,
  phase,
  canGoNext,
  canGoPrev,
}) => {
  return (
    <div className="flex items-center justify-between gap-4 mt-4 px-2">
      <motion.button
        onClick={() => onNavigate(-1)}
        disabled={!canGoPrev}
        whileHover={canGoPrev ? { scale: 1.1 } : {}}
        whileTap={canGoPrev ? { scale: 0.9 } : {}}
        className={cn(
          "p-2 sm:p-3 rounded-xl transition-all duration-200",
          "bg-ctp-surface0/50 hover:bg-ctp-surface1/50",
          "disabled:opacity-30 disabled:cursor-not-allowed",
          "border border-ctp-surface1/50"
        )}
        aria-label="Previous card"
      >
        <ChevronLeft className="w-5 h-5 text-ctp-text" />
      </motion.button>

      <div className="flex items-center gap-1.5 sm:gap-2">
        {Array.from({ length: totalCards }).map((_, i) => (
          <motion.div
            key={i}
            initial={false}
            animate={{
              scale: i === currentIndex ? 1.2 : 1,
              opacity: i === currentIndex ? 1 : 0.4,
            }}
            transition={{ duration: 0.2 }}
            className={cn(
              "rounded-full transition-all duration-200",
              i === currentIndex
                ? cn("w-3 h-3 sm:w-4 sm:h-4", phaseColors[phase])
                : "w-2 h-2 sm:w-2.5 sm:h-2.5 bg-ctp-surface1"
            )}
          />
        ))}
      </div>

      <motion.button
        onClick={() => onNavigate(1)}
        disabled={!canGoNext}
        whileHover={canGoNext ? { scale: 1.1 } : {}}
        whileTap={canGoNext ? { scale: 0.9 } : {}}
        className={cn(
          "p-2 sm:p-3 rounded-xl transition-all duration-200",
          "bg-ctp-surface0/50 hover:bg-ctp-surface1/50",
          "disabled:opacity-30 disabled:cursor-not-allowed",
          "border border-ctp-surface1/50"
        )}
        aria-label="Next card"
      >
        <ChevronRight className="w-5 h-5 text-ctp-text" />
      </motion.button>
    </div>
  );
};

export default FlashcardNavigation;
