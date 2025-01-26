import React, { useCallback, useEffect, useRef, useState, memo } from "react";
import Cursor from "./Cursor";

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
    [displayText, isTyping, currentIndex, statements]
  );

  useEffect(() => {
    animationFrameRef.current = requestAnimationFrame(animate);
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [animate]);

  return (
    <div className="flex items-center gap-1 sm:gap-2 text-lg sm:text-xl md:text-2xl lg:text-3xl font-mono bg-slate-900/50 p-2 sm:p-3 md:p-4 rounded-lg w-full">
      <span className="text-emerald-300 font-extrabold">&gt;</span>
      <span className="text-emerald-300 font-bold">{displayText}</span>
      <Cursor isTyping={isTyping} isEmpty={displayText.length === 0} />
    </div>
  );
});

export default AnimatedText;
