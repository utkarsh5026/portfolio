import React, { useState, memo } from "react";
import Cursor from "@/components/utils/Cursor";
import { useTypewriting } from "@/components/type-write/hooks/use-type-write";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import useMobile from "@/hooks/use-mobile";

const TYPING_SPEED = 50;
const ERASING_SPEED = 30;
const PAUSE_BEFORE_ERASE = 2500;

interface QAPair {
  question: string;
  answer: string;
  syntaxClass: string;
  icon: JSX.Element;
}

interface AnimatedTextProps {
  qaPairs: QAPair[];
}

const AnimatedText: React.FC<AnimatedTextProps> = memo(({ qaPairs }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { isPhone } = useMobile();

  const currentPair = qaPairs[currentIndex];

  const { displayedText } = useTypewriting({
    text: currentPair.answer,
    speed: TYPING_SPEED,
    deleteSpeed: ERASING_SPEED,
    deleteDelay: PAUSE_BEFORE_ERASE,
    repeat: true,
    onCycle: () => {
      setCurrentIndex((prev) => (prev + 1) % qaPairs.length);
    },
  });

  return (
    <motion.div
      className={cn(
        "font-mono relative overflow-hidden bg-transparent",
        isPhone ? "p-3" : "p-4"
      )}
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Question/Command */}
      <div className="flex items-center gap-2 mb-3">
        <span className="text-ctp-green text-sm">❯</span>
        <span className="text-ctp-mauve text-sm font-mono">
          {currentPair.question}
        </span>
      </div>

      {/* Answer/Response */}
      <div
        className={cn(
          "flex items-center gap-3 ml-4",
          isPhone ? "text-sm" : "text-base"
        )}
      >
        <motion.div
          className={cn("flex-shrink-0", isPhone ? "text-lg" : "text-xl")}
          animate={{
            scale: [1, 1.1, 1],
            rotate: [0, 5, -5, 0],
          }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          {currentPair.icon}
        </motion.div>

        <div className="flex items-center gap-1 min-w-0 flex-1">
          <span className={cn(currentPair.syntaxClass, "font-medium")}>
            {displayedText}
          </span>
          <Cursor color={currentPair.syntaxClass.split("-")[2]} />
        </div>
      </div>

      {/* Status indicator */}
      <div className="flex items-center gap-2 mt-3 ml-4">
        {displayedText.length === currentPair.answer.length && (
          <motion.span
            className="text-ctp-green text-xs font-mono opacity-70"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 0.7, x: 0 }}
            transition={{ delay: 0.5 }}
          >
            ✓ response complete
          </motion.span>
        )}
      </div>

      {/* Progress indicator */}
      <div className="flex items-center justify-between mt-4 pt-3 border-t border-ctp-surface1/20">
        <div className="flex gap-1">
          {qaPairs.map((_, index) => (
            <div
              key={index}
              className={cn(
                "w-2 h-1 rounded-full transition-colors duration-300",
                index === currentIndex ? "bg-ctp-green" : "bg-ctp-surface1"
              )}
            />
          ))}
        </div>
        <span className="text-ctp-overlay1 text-xs font-mono">
          {currentIndex + 1}/{qaPairs.length}
        </span>
      </div>
    </motion.div>
  );
});

export default AnimatedText;
