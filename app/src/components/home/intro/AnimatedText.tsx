import React, { useState, memo } from "react";
import Cursor from "./Cursor";
import { useTypewriting } from "@/components/type-write/use-type-write";

const TYPING_SPEED = 50;
const ERASING_SPEED = 30;
const PAUSE_BEFORE_ERASE = 2000;

interface AnimatedTextProps {
  statements: string[];
}

const AnimatedText: React.FC<AnimatedTextProps> = memo(({ statements }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const { displayedText, isTyping, isDeleting } = useTypewriting({
    text: statements[currentIndex],
    speed: TYPING_SPEED,
    deleteSpeed: ERASING_SPEED,
    deleteDelay: PAUSE_BEFORE_ERASE,
    repeat: true,
    onCycle: () => {
      setCurrentIndex((prev) => (prev + 1) % statements.length);
    },
  });

  const syntaxClass = getSyntaxColor(statements[currentIndex]);

  return (
    <div className="font-roboto-mono bg-[#181825]/80 p-3 rounded-lg w-full border border-[#313244] relative overflow-hidden">
      <div className="flex items-center gap-2 text-lg sm:text-xl md:text-xl lg:text-2xl">
        <span className="text-[#f38ba8] font-medium text-sm">$</span>
        <span className={`${syntaxClass} text-sm`}>{displayedText}</span>
        <Cursor
          isTyping={isTyping || isDeleting}
          isEmpty={displayedText.length === 0}
        />
      </div>
    </div>
  );
});

/**
 * Determines the syntax color based on the content of the statement.
 *
 * This function checks the provided statement for specific keywords
 * and returns a corresponding CSS class for syntax highlighting.
 *
 * @param statement - The text statement to analyze for keywords.
 * @returns A string representing the CSS class for the syntax color.
 *
 * The following keywords are checked:
 * - "build": returns "text-ctp-yellow"
 * - "love": returns "text-ctp-pink"
 * - "JavaScript", "Python", or "Go": returns "text-ctp-blue"
 * - "code": returns "text-ctp-green"
 * - "exploring": returns "text-ctp-purple"
 * - If none of the keywords are found, returns "text-ctp-mauve"
 */
const getSyntaxColor = (statement: string): string => {
  if (statement.includes("build")) {
    return "text-ctp-yellow";
  } else if (statement.includes("love")) {
    return "text-ctp-pink";
  } else if (
    statement.includes("JavaScript") ||
    statement.includes("Python") ||
    statement.includes("Go")
  ) {
    return "text-ctp-blue";
  } else if (statement.includes("code")) {
    return "text-ctp-green";
  } else if (statement.includes("exploring")) {
    return "text-ctp-purple";
  }
  return "text-ctp-mauve";
};
export default AnimatedText;
