import React, { useState, useEffect, useCallback } from "react";

interface TypeWriterProps {
  text: string;
  speed?: number;
  delay?: number;
  className?: string;
  onComplete?: () => void;
}

const TypeWriter: React.FC<TypeWriterProps> = ({
  text,
  speed = 40,
  delay = 0,
  className = "",
  onComplete,
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
    const timeout = setTimeout(performTyping, speed);
    return () => clearTimeout(timeout);
  }, [currentIndex, startTyping, speed, performTyping, text.length]);

  return <span className={className}>{displayedText}</span>;
};

TypeWriter.displayName = "TypeWriter";
export default TypeWriter;
