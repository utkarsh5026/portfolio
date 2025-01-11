import React, { useCallback, useEffect, useRef, useState } from "react";
import anime from "animejs";

// Constants
const TYPING_SPEED = 50;
const ERASING_SPEED = 30;
const PAUSE_BEFORE_ERASE = 2000;
const PAUSE_BEFORE_NEXT = 200;

interface AnimatedTextProps {
  statements: string[];
}

/**
 * AnimatedText Component
 *
 * A React component that displays text with a typing animation effect.
 * It cycles through an array of statements, typing them out character by character,
 * then erasing them before moving to the next statement.
 *
 * @param {Object} props - Component props
 * @param {string[]} props.statements - Array of strings to be animated
 *
 * @returns {JSX.Element} A div containing the animated text with a cursor
 */
const AnimatedText: React.FC<AnimatedTextProps> = ({ statements }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isTyping, setIsTyping] = useState(true);

  const containerRef = useRef<HTMLDivElement>(null);
  const cursorRef = useRef<HTMLSpanElement>(null);

  /**
   * Handles the typing animation logic
   * @returns {NodeJS.Timeout} Timeout ID for cleanup
   */
  const handleTyping = useCallback(() => {
    let timeout: NodeJS.Timeout;
    if (displayText !== statements[currentIndex]) {
      timeout = setTimeout(() => {
        setDisplayText(
          statements[currentIndex].slice(0, displayText.length + 1)
        );
      }, TYPING_SPEED);
    } else {
      timeout = setTimeout(() => setIsTyping(false), PAUSE_BEFORE_ERASE);
    }
    return timeout;
  }, [displayText, statements, currentIndex]);

  /**
   * Handles the erasing animation logic
   * @returns {NodeJS.Timeout} Timeout ID for cleanup
   */
  const handleErasing = useCallback(() => {
    let timeout: NodeJS.Timeout;
    if (displayText === "") {
      timeout = setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % statements.length);
        setIsTyping(true);
      }, PAUSE_BEFORE_NEXT);
    } else {
      timeout = setTimeout(() => {
        setDisplayText(displayText.slice(0, -1));
      }, ERASING_SPEED);
    }
    return timeout;
  }, [displayText, statements.length]);

  // Effect for handling typing and erasing animations
  useEffect(() => {
    const timeout = isTyping ? handleTyping() : handleErasing();
    return () => clearTimeout(timeout);
  }, [displayText, isTyping, handleTyping, handleErasing]);

  // Effect for cursor blinking animation
  useEffect(() => {
    if (cursorRef.current) {
      const cursor = cursorRef.current;
      cursor.style.opacity = "1";

      if (!isTyping && displayText.length === 0) {
        const animation = anime({
          targets: cursor,
          opacity: [1, 0],
          duration: 800,
          loop: true,
          easing: "easeInOutQuad",
          direction: "alternate",
        });

        return () => {
          animation.pause();
          if (cursor) {
            cursor.style.opacity = "1";
          }
        };
      }
    }
  }, [isTyping, displayText]);

  return (
    <div
      ref={containerRef}
      className="flex items-center gap-1 sm:gap-2 text-lg sm:text-xl md:text-2xl lg:text-3xl font-mono bg-slate-900/50 p-2 sm:p-3 md:p-4 rounded-lg w-full"
    >
      <span className="text-emerald-300 font-extrabold">&gt;</span>
      <span className="text-emerald-300 font-bold">{displayText}</span>
      <span
        ref={cursorRef}
        className="text-emerald-300 font-extrabold w-2 sm:w-3"
      >
        |
      </span>
    </div>
  );
};

export default AnimatedText;
