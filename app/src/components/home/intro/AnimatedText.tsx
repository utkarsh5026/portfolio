import React, { useCallback, useEffect, useRef, useState, memo } from "react";
import Cursor from "./Cursor";
import { motion } from "framer-motion";

const TYPING_SPEED = 50;
const ERASING_SPEED = 30;
const PAUSE_BEFORE_ERASE = 2000;
const PAUSE_BEFORE_NEXT = 200;

interface AnimatedTextProps {
  statements: string[];
}

const getSyntaxColor = (statement: string): string => {
  if (statement.includes("build")) {
    return "text-[#f9e2af]";
  } else if (statement.includes("love")) {
    return "text-[#f5c2e7]";
  } else if (
    statement.includes("JavaScript") ||
    statement.includes("Python") ||
    statement.includes("Go")
  ) {
    return "text-[#89b4fa]";
  } else if (statement.includes("code")) {
    return "text-[#a6e3a1]";
  } else if (statement.includes("exploring")) {
    return "text-[#cba6f7]";
  }
  return "text-[#cdd6f4]";
};

const AnimatedText: React.FC<AnimatedTextProps> = memo(({ statements }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isTyping, setIsTyping] = useState(true);

  const animationFrameRef = useRef<number>();
  const lastUpdateTimeRef = useRef<number>(0);

  const animate = useCallback(
    (timestamp: number) => {
      if (!lastUpdateTimeRef.current) lastUpdateTimeRef.current = timestamp;

      const deltaTime = timestamp - lastUpdateTimeRef.current;
      const updateInterval = isTyping ? TYPING_SPEED : ERASING_SPEED;

      if (deltaTime >= updateInterval) {
        if (isTyping) {
          if (displayText !== statements[currentIndex]) {
            setDisplayText(
              statements[currentIndex].slice(0, displayText.length + 1)
            );
          } else {
            setTimeout(() => setIsTyping(false), PAUSE_BEFORE_ERASE);
            return;
          }
        } else {
          if (displayText === "") {
            setTimeout(() => {
              setCurrentIndex((prev) => (prev + 1) % statements.length);
              setIsTyping(true);
            }, PAUSE_BEFORE_NEXT);
            return;
          } else {
            setDisplayText(displayText.slice(0, -1));
          }
        }
        lastUpdateTimeRef.current = timestamp;
      }

      animationFrameRef.current = requestAnimationFrame(animate);
    },
    [currentIndex, displayText, isTyping, statements]
  );

  useEffect(() => {
    animationFrameRef.current = requestAnimationFrame(animate);
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [animate]);

  const syntaxClass = getSyntaxColor(statements[currentIndex]);

  return (
    <motion.div
      className="font-roboto-mono bg-[#181825]/80 p-3 rounded-lg w-full border border-[#313244] relative overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center gap-2 text-lg sm:text-xl md:text-xl lg:text-2xl">
        <span className="text-[#f38ba8] font-medium text-sm">$</span>
        <span className={`${syntaxClass} text-sm`}>{displayText}</span>
        <Cursor isTyping={isTyping} isEmpty={displayText.length === 0} />
      </div>
    </motion.div>
  );
});

export default AnimatedText;
