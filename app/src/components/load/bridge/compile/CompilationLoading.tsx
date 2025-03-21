import React, { useState, useEffect, useRef, useCallback } from "react";
import CountDownTransition from "./CountDownTransition";
import "./CompilteTransition.css";
import { wordSequence } from "./wordSeq";
import { cn } from "@/lib/utils";

interface CompilationLoadingProps {
  onComplete: () => void;
  duration?: number;
}

/**
 * The CompilationLoading component is designed to display a sequence of words with animations
 * during the compilation process. It also includes a countdown transition at the end.
 *
 * This component is responsible for managing the visual representation of the compilation
 * process, including the display of words with animations and a countdown timer. It ensures
 * a smooth transition between the compilation process and the final result.
 *
 * @param {Object} props - The component props.
 * @param {Function} props.onComplete - A callback function to be called when the compilation process is complete.
 * @param {number} [props.duration=16000] - The total duration of the compilation process in milliseconds.
 *
 * @returns {JSX.Element} The JSX element representing the CompilationLoading component.
 */
const CompilationLoading: React.FC<CompilationLoadingProps> = ({
  onComplete,
  duration = 16000,
}) => {
  const [currentWord, setCurrentWord] = useState("");
  const [wordIndex, setWordIndex] = useState(-1);
  const [effect, setEffect] = useState("");
  const [startCountDown, setStartCountDown] = useState(false);

  const containerRef = useRef(null);
  const timeoutsRef = useRef<NodeJS.Timeout[]>([]);

  const wordSequenceRef = useRef(wordSequence);

  const startTimeRef = useRef<number>(0);
  const totalDurationRef = useRef<number>(0);

  /**
   * A safe version of setTimeout that keeps track of all timeouts created.
   *
   * @param {Function} callback - The function to be executed after the delay.
   * @param {number} delay - The delay in milliseconds before the function is executed.
   * @returns {NodeJS.Timeout} The timeout ID.
   */
  const safeSetTimeout = (callback: () => void, delay: number) => {
    const timeoutId = setTimeout(callback, delay);
    timeoutsRef.current.push(timeoutId);
    return timeoutId;
  };

  /**
   * Shows the next word in the sequence with its corresponding animation effect.
   */
  const showNextWord = useCallback(() => {
    let nextIndex = 0;
    const phase = () => {
      if (nextIndex >= wordSequenceRef.current.length) {
        setStartCountDown(true);
        return;
      }

      const wordConfig = wordSequenceRef.current[nextIndex];

      setCurrentWord("");
      setEffect("");

      safeSetTimeout(() => {
        setWordIndex((prev) => {
          return prev + 1;
        });
        setCurrentWord(wordConfig.text);
        setEffect(wordConfig.effect);
        nextIndex++;

        safeSetTimeout(phase, wordConfig.duration);
      }, 10);
    };

    phase();
  }, []);

  /**
   * Effect hook to manage the compilation loading process.
   * It sets the start time, shows the next word, calculates the total duration,
   * and sets a safety timeout to ensure the process completes within a reasonable time.
   * It also cleans up all timeouts and logs a cleanup message when the component unmounts.
   */
  useEffect(() => {
    startTimeRef.current = Date.now();
    showNextWord();

    totalDurationRef.current = wordSequenceRef.current.reduce(
      (total, word) => total + word.duration,
      0
    );

    const safetyTimeout = safeSetTimeout(() => {
      if (onComplete) onComplete();
    }, Math.min(duration, totalDurationRef.current + 5000));

    return () => {
      timeoutsRef.current.forEach((timeoutId) => clearTimeout(timeoutId));
      clearTimeout(safetyTimeout);
      timeoutsRef.current = [];
    };
  }, [duration, onComplete, showNextWord]);

  /**
   * Returns the CSS classes for the current word based on its configuration.
   *
   * @returns {string} The CSS classes for the current word.
   */
  const getWordClasses = (): string => {
    if (!currentWord || wordIndex < 0) return "";

    const wordConfig = wordSequenceRef.current[wordIndex];
    return `${wordConfig.size} ${wordConfig.color} font-bold word-animation ${effect}`;
  };

  /**
   * Returns the Tailwind classes for the container based on the progress of the compilation.
   *
   * @returns {string} The Tailwind classes for the container.
   */
  const getContainerClasses = () => {
    const elapsedTime = Date.now() - startTimeRef.current;
    const progress = Math.min(100, (elapsedTime / duration) * 100);
    const bgOpacity = Math.round((0.9 - (progress / 100) * 0.1) * 100);

    // Map opacity to the closest Tailwind opacity class
    const opacityClass = `bg-opacity-${bgOpacity}`;

    return opacityClass;
  };

  return (
    <div
      ref={containerRef}
      className={cn(
        "fixed inset-0 flex items-center justify-center z-50 overflow-hidden transition-all duration-1000 ease-in-out bg-black",
        getContainerClasses()
      )}
    >
      <div className="film-grain-overlay"></div>

      <div className="radial-light"></div>

      {!startCountDown && (
        <div className={`word-container ${currentWord ? "active" : ""}`}>
          <span className={getWordClasses()}>{currentWord}</span>
        </div>
      )}

      {startCountDown && <CountDownTransition onComplete={onComplete} />}

      <div className="dramatic-lines">
        <div className="h-line"></div>
        <div className="h-line"></div>
        <div className="v-line"></div>
        <div className="v-line"></div>
      </div>
    </div>
  );
};

export default CompilationLoading;
