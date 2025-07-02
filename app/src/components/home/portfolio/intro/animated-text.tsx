import React, { useState, memo } from "react";
import Cursor from "@/components/utils/Cursor";
import { useTypewriting } from "@/components/type-write/hooks/use-type-write";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import useMobile from "@/hooks/use-mobile";
import {
  SiJavascript,
  SiPython,
  SiGo,
  SiReact,
  SiDocker,
} from "react-icons/si";
import { HiHeart, HiGlobeAlt, HiCpuChip } from "react-icons/hi2";
import { MdBuild } from "react-icons/md";

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
  if (answer.includes("build") || answer.includes("creating")) {
    return {
      syntaxClass: "text-ctp-yellow",
      icon: <MdBuild className="text-ctp-yellow" />,
    };
  } else if (answer.includes("love") || answer.includes("passionate")) {
    return {
      syntaxClass: "text-ctp-pink",
      icon: <HiHeart className="text-ctp-pink" />,
    };
  } else if (
    answer.includes("JavaScript") ||
    answer.includes("Python") ||
    answer.includes("Go") ||
    answer.includes("languages")
  ) {
    return {
      syntaxClass: "text-ctp-blue",
      icon: (
        <motion.div
          className="flex items-center"
          animate={{ x: [-15, 0, 15, 0, -15] }}
          transition={{ duration: 4, repeat: Infinity }}
        >
          <div className="flex gap-1">
            <SiJavascript className="text-ctp-yellow text-sm" />
            <SiPython className="text-ctp-blue text-sm" />
            <SiGo className="text-ctp-teal text-sm" />
          </div>
        </motion.div>
      ),
    };
  } else if (answer.includes("code") || answer.includes("development")) {
    return {
      syntaxClass: "text-ctp-green",
      icon: <SiDocker className="text-ctp-green" />,
    };
  } else if (answer.includes("exploring") || answer.includes("learning")) {
    return {
      syntaxClass: "text-ctp-purple",
      icon: (
        <div className="flex gap-1">
          <SiReact className="text-ctp-purple text-sm" />
          <HiCpuChip className="text-ctp-mauve text-sm" />
        </div>
      ),
    };
  }
  return {
    syntaxClass: "text-ctp-mauve",
    icon: <HiGlobeAlt className="text-ctp-mauve" />,
  };
};

export default AnimatedText;
