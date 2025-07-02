import React, { useState, memo } from "react";
import Cursor from "@/components/utils/Cursor";
import { useTypewriting } from "@/components/type-write/hooks/use-type-write";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import useMobile from "@/hooks/use-mobile";

import {
  HiLightBulb,
  HiWrenchScrewdriver,
  HiBookOpen,
  HiRocketLaunch,
  HiSparkles,
  HiCog6Tooth,
  HiFire,
} from "react-icons/hi2";
import { TbBrandVscode, TbTerminal2 } from "react-icons/tb";

const TYPING_SPEED = 50;
const ERASING_SPEED = 30;
const PAUSE_BEFORE_ERASE = 2500;

interface QAPair {
  question: string;
  answer: string;
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

  const { syntaxClass, icon } = getSyntaxColorAndIcon(currentPair.answer);

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
          {icon}
        </motion.div>

        <div className="flex items-center gap-1 min-w-0 flex-1">
          <span className={cn(syntaxClass, "font-medium")}>
            {displayedText}
          </span>
          <Cursor color={syntaxClass.split("-")[2]} />
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

const getSyntaxColorAndIcon = (
  answer: string
): { syntaxClass: string; icon: JSX.Element } => {
  // Building/Creating/Development
  if (
    answer.includes("exploring") ||
    answer.includes("creating") ||
    answer.includes("developing")
  ) {
    return {
      syntaxClass: "text-ctp-yellow",
      icon: (
        <motion.div
          animate={{ rotate: [0, 180, 360] }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
        >
          <HiCog6Tooth className="text-ctp-yellow" />
        </motion.div>
      ),
    };
  }

  // Passion/Love/Enthusiasm
  else if (
    answer.includes("love") ||
    answer.includes("passionate") ||
    answer.includes("excited")
  ) {
    return {
      syntaxClass: "text-ctp-pink",
      icon: (
        <motion.div
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <HiFire className="text-ctp-pink" />
        </motion.div>
      ),
    };
  }

  // Programming Languages
  else if (
    answer.includes("JavaScript") ||
    answer.includes("Python") ||
    answer.includes("Go") ||
    answer.includes("TypeScript") ||
    answer.includes("languages") ||
    answer.includes("programming")
  ) {
    return {
      syntaxClass: "text-ctp-pink",
      icon: (
        <motion.div
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <HiFire className="text-ctp-pink" />
        </motion.div>
      ),
    };
  }

  // Coding/Development/Software
  else if (
    answer.includes("code") ||
    answer.includes("development") ||
    answer.includes("software")
  ) {
    return {
      syntaxClass: "text-ctp-green",
      icon: (
        <motion.div
          animate={{
            y: [0, -2, 0],
            rotate: [0, 2, -2, 0],
          }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <TbTerminal2 className="text-ctp-green" />
        </motion.div>
      ),
    };
  }

  // Learning/Exploring/Research
  else if (
    answer.includes("exploring") ||
    answer.includes("learning") ||
    answer.includes("studying")
  ) {
    return {
      syntaxClass: "text-ctp-purple",
      icon: (
        <motion.div
          animate={{ rotateY: [0, 180, 360] }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          <HiBookOpen className="text-ctp-purple" />
        </motion.div>
      ),
    };
  }

  // Innovation/Ideas/Creative
  else if (
    answer.includes("innovative") ||
    answer.includes("creative") ||
    answer.includes("ideas")
  ) {
    return {
      syntaxClass: "text-ctp-yellow",
      icon: (
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            rotate: [0, 5, -5, 0],
          }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <HiLightBulb className="text-ctp-yellow" />
        </motion.div>
      ),
    };
  }

  // Problem Solving/Solutions
  else if (
    answer.includes("problem") ||
    answer.includes("solution") ||
    answer.includes("solving")
  ) {
    return {
      syntaxClass: "text-ctp-mauve",
      icon: (
        <motion.div
          animate={{
            rotate: [0, 90, 180, 270, 360],
            scale: [1, 1.1, 1],
          }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          <HiWrenchScrewdriver className="text-ctp-mauve" />
        </motion.div>
      ),
    };
  }

  // Projects/Portfolio/Work
  else if (
    answer.includes("project") ||
    answer.includes("portfolio") ||
    answer.includes("work")
  ) {
    return {
      syntaxClass: "text-ctp-teal",
      icon: (
        <motion.div
          animate={{
            y: [0, -5, 0],
            rotate: [0, 10, -10, 0],
          }}
          transition={{ duration: 2.5, repeat: Infinity }}
        >
          <HiRocketLaunch className="text-ctp-teal" />
        </motion.div>
      ),
    };
  }

  // Available/Ready/Open
  else if (
    answer.includes("available") ||
    answer.includes("ready") ||
    answer.includes("open")
  ) {
    return {
      syntaxClass: "text-ctp-green",
      icon: (
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [1, 0.7, 1],
          }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <HiSparkles className="text-ctp-green" />
        </motion.div>
      ),
    };
  }

  // Default case - Developer/Tech
  return {
    syntaxClass: "text-ctp-blue",
    icon: (
      <motion.div
        animate={{
          rotate: [0, 360],
          scale: [1, 1.05, 1],
        }}
        transition={{ duration: 4, repeat: Infinity }}
      >
        <TbBrandVscode className="text-ctp-blue" />
      </motion.div>
    ),
  };
};

export default AnimatedText;
