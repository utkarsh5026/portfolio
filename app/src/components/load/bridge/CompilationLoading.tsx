import React, { useState, useEffect, useRef, useCallback } from "react";
import CountDownTransition from "./CountDownTransition";
import "./CompilteTransition.css";

const wordSequence = [
  {
    text: "PANIC",
    duration: 700,
    effect: "zoom-in",
    color: "text-red-500",
    size: "text-7xl",
  },
  {
    text: "SYSTEM FAILURE",
    duration: 500,
    effect: "slide-up",
    color: "text-yellow-500",
    size: "text-6xl",
  },
  {
    text: "BROKEN",
    duration: 400,
    effect: "flicker",
    color: "text-red-600",
    size: "text-8xl",
  },
  {
    text: "CRISIS",
    duration: 350,
    effect: "zoom-in",
    color: "text-orange-500",
    size: "text-7xl",
  },
  {
    text: "CHAOS",
    duration: 300,
    effect: "shake",
    color: "text-red-400",
    size: "text-7xl",
  },
  {
    text: "ERROR",
    duration: 300,
    effect: "glitch",
    color: "text-red-500",
    size: "text-7xl",
  },
  {
    text: "ALERT",
    duration: 250,
    effect: "pulse",
    color: "text-yellow-500",
    size: "text-6xl",
  },
  {
    text: "EMERGENCY",
    duration: 350,
    effect: "slide-left",
    color: "text-red-600",
    size: "text-6xl",
  },
  {
    text: "UNSTABLE",
    duration: 300,
    effect: "rotate",
    color: "text-yellow-400",
    size: "text-6xl",
  },
  {
    text: "CORRUPTED",
    duration: 300,
    effect: "glitch",
    color: "text-red-500",
    size: "text-6xl",
  },
  {
    text: "FIX IT",
    duration: 400,
    effect: "pulse",
    color: "text-blue-500",
    size: "text-7xl",
  },
  {
    text: "RECOVER",
    duration: 400,
    effect: "slide-up",
    color: "text-blue-600",
    size: "text-7xl",
  },
  {
    text: "REBUILD",
    duration: 450,
    effect: "zoom-in",
    color: "text-blue-500",
    size: "text-7xl",
  },
  {
    text: "RECOMPILE",
    duration: 500,
    effect: "slide-left",
    color: "text-green-500",
    size: "text-6xl",
  },
  {
    text: "STABILIZE",
    duration: 550,
    effect: "zoom-in",
    color: "text-green-600",
    size: "text-7xl",
  },
  {
    text: "DEPLOY",
    duration: 800,
    effect: "pulse",
    color: "text-green-500",
    size: "text-8xl",
  },
];

interface ImpactTransitionProps {
  onComplete: () => void;
  duration?: number;
}
const ImpactTransition: React.FC<ImpactTransitionProps> = ({
  onComplete,
  duration = 16000,
}) => {
  const [currentWord, setCurrentWord] = useState("");
  const [wordIndex, setWordIndex] = useState(-1);
  const [effect, setEffect] = useState("");
  const [startCountDown, setStartCountDown] = useState(false);

  // Reference to the container element
  const containerRef = useRef(null);

  // Reference to store all active timeouts for proper cleanup
  const timeoutsRef = useRef<NodeJS.Timeout[]>([]);

  // Reference to store the word sequence
  const wordSequenceRef = useRef(wordSequence);

  console.log(wordIndex);

  // References to track timing
  const startTimeRef = useRef<number>(0);
  const totalDurationRef = useRef<number>(0);

  // Helper function to safely set timeouts with proper cleanup
  const safeSetTimeout = (callback: () => void, delay: number) => {
    const timeoutId = setTimeout(callback, delay);
    timeoutsRef.current.push(timeoutId);
    return timeoutId;
  };

  // Show the next word in sequence
  const showNextWord = useCallback(() => {
    let nextIndex = 0;
    const phase = () => {
      // Check if we've reached the end of the sequence
      if (nextIndex >= wordSequenceRef.current.length) {
        // Sequence complete
        setStartCountDown(true);
        // if (onComplete) {
        //   // Small delay before transitioning to next component
        //   safeSetTimeout(() => {
        //     onComplete();
        //   }, 300);
        // }
        return;
      }

      const wordConfig = wordSequenceRef.current[nextIndex];

      // Set the word with initial opacity 0 (clear current word)
      setCurrentWord("");
      setEffect("");

      // Small delay for exit animation to complete
      safeSetTimeout(() => {
        // Update the word index and display the new word
        setWordIndex((prev) => {
          return prev + 1;
        });
        setCurrentWord(wordConfig.text);
        setEffect(wordConfig.effect);
        nextIndex++;

        // Schedule next word after this word's duration
        safeSetTimeout(phase, wordConfig.duration);
      }, 10);
    };

    phase();
  }, [wordIndex, onComplete]);

  // Initialize the sequence
  useEffect(() => {
    // Record start time for progress calculation
    startTimeRef.current = Date.now();

    // Begin the word sequence
    showNextWord();

    // Calculate total duration of all words for fallback completion
    totalDurationRef.current = wordSequenceRef.current.reduce(
      (total, word) => total + word.duration,
      0
    );

    // Safety timeout in case animations take longer than expected
    const safetyTimeout = safeSetTimeout(() => {
      if (onComplete) onComplete();
    }, Math.min(duration, totalDurationRef.current + 5000));

    // Cleanup function to clear all timeouts when component unmounts
    return () => {
      timeoutsRef.current.forEach((timeoutId) => clearTimeout(timeoutId));
      console.log("cleanup");
      clearTimeout(safetyTimeout);
      timeoutsRef.current = [];
    };
  }, []); // Only re-run if duration or onComplete change

  // Dynamic classes based on current word
  const getWordClasses = () => {
    if (!currentWord || wordIndex < 0) return "";

    const wordConfig = wordSequenceRef.current[wordIndex];
    return `${wordConfig.size} ${wordConfig.color} font-bold word-animation ${effect}`;
  };

  // Dynamic styles for container
  const getContainerStyle = () => {
    // Calculate progress through the sequence
    const elapsedTime = Date.now() - startTimeRef.current;
    const progress = Math.min(100, (elapsedTime / duration) * 100);

    // Background gets slightly lighter as we progress
    // This subtly indicates transition from dark/panic to light/resolution
    const bgOpacity = 0.9 - (progress / 100) * 0.1;

    return {
      backgroundColor: `rgba(0, 0, 0, ${bgOpacity})`,
    };
  };

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 flex items-center justify-center z-50 overflow-hidden transition-all duration-1000 ease-in-out"
      style={getContainerStyle()}
    >
      {/* Film grain overlay for cinematic effect */}
      <div className="film-grain-overlay"></div>

      {/* Radial light effect that intensifies as we progress */}
      <div className="radial-light"></div>

      {/* Flashing word */}
      {!startCountDown && (
        <div className={`word-container ${currentWord ? "active" : ""}`}>
          <span className={getWordClasses()}>{currentWord}</span>
        </div>
      )}

      {startCountDown && <CountDownTransition onComplete={onComplete} />}

      {/* Optional dramatic lines that animate across screen */}
      <div className="dramatic-lines">
        <div className="h-line"></div>
        <div className="h-line"></div>
        <div className="v-line"></div>
        <div className="v-line"></div>
      </div>
    </div>
  );
};

export default ImpactTransition;
