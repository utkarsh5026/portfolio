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
const PAUSE_BEFORE_ERASE = 2000;

interface AnimatedTextProps {
  statements: string[];
}

const AnimatedText: React.FC<AnimatedTextProps> = memo(({ statements }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { isPhone } = useMobile();

  const { displayedText } = useTypewriting({
    text: statements[currentIndex],
    speed: TYPING_SPEED,
    deleteSpeed: ERASING_SPEED,
    deleteDelay: PAUSE_BEFORE_ERASE,
    repeat: true,
    onCycle: () => {
      setCurrentIndex((prev) => (prev + 1) % statements.length);
    },
  });

  const { syntaxClass, icon } = getSyntaxColorAndIcon(statements[currentIndex]);

  return (
    <motion.div
      className={cn(
        "font-mono relative overflow-hidden",
        "bg-gradient-to-r from-ctp-surface0/40 to-ctp-surface0/20",
        "border border-ctp-surface1/30 rounded-lg",
        "backdrop-blur-sm",
        isPhone ? "p-3" : "p-4"
      )}
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Command prefix */}
      <div className="flex items-center gap-2 mb-2">
        <span className="text-ctp-green text-sm">❯</span>
        <span className="text-ctp-overlay1 text-sm font-mono">echo</span>
        <span className="text-ctp-blue text-sm">"</span>
      </div>

      {/* Main text output */}
      <div
        className={cn(
          "flex items-center gap-3",
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

      {/* Closing quote */}
      <div className="flex items-center gap-2 mt-2">
        <span className="text-ctp-blue text-sm">"</span>
        {displayedText.length === statements[currentIndex].length && (
          <motion.span
            className="text-ctp-green text-sm font-mono"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
          >
            ✓ executed
          </motion.span>
        )}
      </div>

      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-gradient-to-br from-ctp-green/20 via-transparent to-ctp-blue/20" />
      </div>
    </motion.div>
  );
});

const getSyntaxColorAndIcon = (
  statement: string
): { syntaxClass: string; icon: JSX.Element } => {
  if (statement.includes("build")) {
    return {
      syntaxClass: "text-ctp-yellow",
      icon: <MdBuild className="text-ctp-yellow" />,
    };
  } else if (statement.includes("love")) {
    return {
      syntaxClass: "text-ctp-pink",
      icon: <HiHeart className="text-ctp-pink" />,
    };
  } else if (
    statement.includes("JavaScript") ||
    statement.includes("Python") ||
    statement.includes("Go")
  ) {
    // For multi-language statement, show rotating icons
    return {
      syntaxClass: "text-ctp-blue",
      icon: (
        <motion.div
          className="flex items-center"
          animate={{ x: [-20, 0, 20, 0, -20] }}
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
  } else if (statement.includes("code")) {
    return {
      syntaxClass: "text-ctp-green",
      icon: <SiDocker className="text-ctp-green" />,
    };
  } else if (statement.includes("exploring")) {
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
