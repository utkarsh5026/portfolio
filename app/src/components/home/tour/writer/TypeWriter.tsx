import React, { useState, useEffect, useCallback } from "react";

interface TypeWriterProps {
  text: string;
  speed?: number;
  delay?: number;
  className?: string;
  onComplete?: () => void;
  humanize?: boolean;
}

/**
 * TypeWriter component simulates a typing effect for a given text,
 * creating an engaging user experience by displaying text one character at a time.
 *
 * This component is useful for creating dynamic text displays, such as
 * in tutorials, storytelling, or any scenario where you want to draw
 * attention to specific content.
 *
 * Props:
 * @param {string} text - The text to be displayed with the typing effect.
 * @param {number} [speed=40] - The speed of typing in milliseconds per character.
 *                              A lower value means faster typing.
 * @param {number} [delay=0] - The delay before starting the typing effect in milliseconds.
 * @param {string} [className=""] - Optional additional class names for styling the text.
 * @param {function} [onComplete] - Callback function to be called when typing is complete.
 * @param {boolean} [humanize=false] - If true, adds randomness to the typing speed
 *                                      for a more natural, human-like effect.
 *
 * Example usage:
 * <TypeWriter text="Hello, World!" speed={50} delay={1000} onComplete={() => alert('Done!')} />
 */
const TypeWriter: React.FC<TypeWriterProps> = ({
  text,
  speed = 40,
  delay = 0,
  className = "",
  onComplete,
  humanize = false,
}) => {
  const [displayedText, setDisplayedText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [startTyping, setStartTyping] = useState(false);

  const performTyping = useCallback(() => {
    if (currentIndex < text.length) {
      setDisplayedText((prev) => prev + text[currentIndex]);
      setCurrentIndex((prevIndex) => prevIndex + 1);
    } else onComplete?.();
  }, [currentIndex, text, onComplete]);

  useEffect(() => {
    setDisplayedText("");
    setCurrentIndex(0);
    setStartTyping(false);

    const delayTimer = setTimeout(() => {
      setStartTyping(true);
    }, delay);

    return () => clearTimeout(delayTimer);
  }, [text, delay]);

  useEffect(() => {
    if (!startTyping || currentIndex > text.length) return;

    const typingSpeed = humanize ? speed * (0.7 + Math.random() * 0.6) : speed;

    const timeout = setTimeout(performTyping, typingSpeed);
    return () => clearTimeout(timeout);
  }, [currentIndex, startTyping, speed, performTyping, text.length, humanize]);

  return <span className={className}>{displayedText}</span>;
};

TypeWriter.displayName = "TypeWriter";
export default TypeWriter;
