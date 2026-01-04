import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import type { Flashcard as FlashcardType } from "@/types";
import type { Phase } from "../config";

interface FlashcardProps {
  card: FlashcardType;
  phase: Phase;
  index: number;
  total: number;
}

const Flashcard: React.FC<FlashcardProps> = ({
  card,
  phase,
  index,
  total,
}) => {
  const phaseColors = {
    problem: {
      bg: "from-ctp-yellow/10 via-ctp-peach/5 to-transparent",
      border: "border-ctp-yellow/30",
      question: "text-ctp-yellow",
      answer: "text-ctp-text",
      accent: "bg-ctp-yellow",
    },
    execution: {
      bg: "from-ctp-blue/10 via-ctp-mauve/5 to-transparent",
      border: "border-ctp-blue/30",
      question: "text-ctp-blue",
      answer: "text-ctp-text",
      accent: "bg-ctp-blue",
    },
    future: {
      bg: "from-ctp-green/10 via-ctp-teal/5 to-transparent",
      border: "border-ctp-green/30",
      question: "text-ctp-green",
      answer: "text-ctp-text",
      accent: "bg-ctp-green",
    },
  };

  const colors = phaseColors[phase];

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3 }}
      className={cn(
        "w-full rounded-xl p-4 sm:p-5",
        "bg-gradient-to-br",
        colors.bg,
        "border",
        colors.border,
        "backdrop-blur-sm"
      )}
    >
      {/* Card number indicator */}
      <div className="flex items-center justify-between mb-3">
        <div className={cn("w-1.5 h-1.5 rounded-full", colors.accent)} />
        <span className="text-[10px] text-ctp-overlay0 font-mono">
          {index + 1}/{total}
        </span>
      </div>

      {/* Question */}
      <p className={cn("text-sm sm:text-base font-medium mb-2", colors.question)}>
        {card.q}
      </p>

      {/* Answer */}
      <p className={cn("text-lg sm:text-xl font-bold", colors.answer)}>
        {card.a}
      </p>
    </motion.div>
  );
};

export default Flashcard;
