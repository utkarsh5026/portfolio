import React, { useState, useEffect, useRef, useMemo } from "react";
import { distributeTime } from "@/components/load/utls/time";
import "./CountDownAnimations.css";

interface CountdownTransitionProps {
  onComplete: () => void;
  duration?: number;
}

type CountdownNumber = number | "GO!";
const DELAY = 200;

/**
 * CountdownTransition component displays a visual countdown sequence (3, 2, 1, GO!)
 * with animated transitions between each number.
 *
 * This component is used to create a dramatic transition effect before completing
 * an action, such as loading the portfolio.
 *
 * @param {Object} props - The component props
 * @param {Function} props.onComplete - Callback function executed when countdown finishes
 * @param {number} [props.duration=2500] - Total duration of the countdown in milliseconds
 * @returns {JSX.Element} The rendered countdown transition
 */
const CountdownTransition: React.FC<CountdownTransitionProps> = ({
  onComplete,
  duration = 2500,
}) => {
  /**
   * State to track the currently displayed number in the countdown
   * Can be 3, 2, 1, "GO!", or null during transitions
   */
  const [currentNumber, setCurrentNumber] = useState<CountdownNumber | null>(
    null
  );

  /**
   * Ref to store all timeout IDs for proper cleanup
   */
  const timeoutsRef = useRef<NodeJS.Timeout[]>([]);

  /**
   * Calculate the timing delays for transitions between countdown numbers
   * using the distributeTime utility to create a balanced sequence
   */
  const [threeToTwoDelay, twoToOneDelay, oneToGoDelay] = useMemo(
    () => distributeTime(duration, [1, 2, 3]),
    [duration]
  );

  /**
   * Helper function to safely create timeouts and track them for cleanup
   *
   * @param {Function} callback - Function to execute after the delay
   * @param {number} delay - Time in milliseconds to wait before execution
   * @returns {NodeJS.Timeout} The timeout ID
   */
  const safeSetTimeout = (callback: () => void, delay: number) => {
    const timeoutId = setTimeout(callback, delay);
    timeoutsRef.current.push(timeoutId);
    return timeoutId;
  };

  /**
   * Determines the visual style for the current number in the countdown
   * Each number has a unique animation effect, color, and size
   *
   * @returns {Object} Style configuration for the current number
   */
  const getNumberStyle = () => {
    const styles = [
      { effect: "zoom-in", color: "text-yellow-500", size: "text-9xl" },
      { effect: "pulse-number", color: "text-blue-500", size: "text-9xl" },
      { effect: "glitch", color: "text-green-500", size: "text-9xl" },
    ];

    const numberStyles = {
      3: styles[0],
      2: styles[1],
      1: styles[2],
      "GO!": { effect: "scale-up", color: "text-green-600", size: "text-9xl" },
    };

    const defaultStyle = {
      effect: "zoom-in",
      color: "text-white",
      size: "text-8xl",
    };
    return (
      numberStyles[currentNumber as keyof typeof numberStyles] || defaultStyle
    );
  };

  /**
   * Effect to manage the countdown sequence and timing
   * Sets up the transitions between numbers and triggers onComplete when finished
   */
  useEffect(() => {
    const goToTwo = () => {
      setCurrentNumber(null);
      safeSetTimeout(() => setCurrentNumber(2), DELAY);
    };

    const goToOne = () => {
      setCurrentNumber(null);
      safeSetTimeout(() => setCurrentNumber(1), DELAY);
    };

    const goToGo = () => {
      setCurrentNumber(null);
      safeSetTimeout(() => setCurrentNumber("GO!"), DELAY);
    };

    setCurrentNumber(3);
    safeSetTimeout(goToTwo, threeToTwoDelay);
    safeSetTimeout(goToOne, twoToOneDelay);
    safeSetTimeout(goToGo, oneToGoDelay);
    safeSetTimeout(onComplete, duration);
    return () => {
      timeoutsRef.current.forEach((timeoutId) => clearTimeout(timeoutId));
      timeoutsRef.current = [];
    };
  }, [onComplete, duration, threeToTwoDelay, twoToOneDelay, oneToGoDelay]);

  /**
   * Generates the CSS class string for the current number based on its style
   *
   * @returns {string} CSS classes for the current number
   */
  const getNumberClasses = () => {
    if (currentNumber === null) return "";
    const style = getNumberStyle();
    return `${style.size} ${style.color} font-bold number-animation ${style.effect}`;
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center  overflow-hidden transition-all duration-1000 ease-in-out bg-black bg-opacity-90">
      <div
        className={`number-container ${currentNumber !== null ? "active" : ""}`}
      >
        <span className={getNumberClasses()} data-text={currentNumber}>
          {currentNumber}
        </span>
      </div>
    </div>
  );
};

export default CountdownTransition;
