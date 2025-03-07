import React, { useState, useEffect, useRef, useMemo } from "react";
import { distributeTime } from "../utls/time";
import "./CountDownAnimations.css";

interface CountdownTransitionProps {
  onComplete: () => void;
  duration?: number;
}

type CountdownNumber = number | "GO!";
const DELAY = 200;

const CountdownTransition: React.FC<CountdownTransitionProps> = ({
  onComplete,
  duration = 2500,
}) => {
  const [currentNumber, setCurrentNumber] = useState<CountdownNumber | null>(
    null
  );
  const timeoutsRef = useRef<NodeJS.Timeout[]>([]);

  const [threeToTwoDelay, twoToOneDelay, oneToGoDelay] = useMemo(
    () => distributeTime(duration, [1, 2, 3]),
    [duration]
  );

  const safeSetTimeout = (callback: () => void, delay: number) => {
    const timeoutId = setTimeout(callback, delay);
    timeoutsRef.current.push(timeoutId);
    return timeoutId;
  };

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
