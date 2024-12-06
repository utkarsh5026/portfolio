import React from "react";
import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import { useState, useEffect } from "react";

interface AnimatedTextProps {
  statements: string[];
}

const AnimatedText: React.FC<AnimatedTextProps> = ({ statements }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    let timeout: NodeJS.Timeout;

    if (isTyping) {
      if (displayText !== statements[currentIndex]) {
        timeout = setTimeout(() => {
          setDisplayText(
            statements[currentIndex].slice(0, displayText.length + 1)
          );
        }, 50);
      } else {
        timeout = setTimeout(() => setIsTyping(false), 1000);
      }
    } else {
      if (displayText === "") {
        setCurrentIndex((prev) => (prev + 1) % statements.length);
        setIsTyping(true);
      } else {
        timeout = setTimeout(() => {
          setDisplayText(displayText.slice(0, -1));
        }, 30);
      }
    }

    return () => clearTimeout(timeout);
  }, [displayText, isTyping, currentIndex, statements]);

  return (
    <motion.div
      className="flex items-center gap-2 text-2xl md:text-3xl text-slate-200"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
    >
      <ChevronRight className="h-6 w-6 text-purple-500" />
      <span>{displayText}</span>
      <motion.span
        animate={{ opacity: [1, 0] }}
        transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse" }}
      >
        |
      </motion.span>
    </motion.div>
  );
};

export default AnimatedText;
