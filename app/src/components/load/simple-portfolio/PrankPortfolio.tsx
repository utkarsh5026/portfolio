import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  thoughtSequence,
  errorMessages,
  errors,
  type Thought,
  type Priority,
  type Position,
} from "./content";
import "./PrankAnimations.css";
import BasicPortfolio from "./BasicPortfolio";
import Console from "./Console";

interface ChaoticPortfolioProps {
  onComplete: () => void;
}

type ActualThought = Omit<Thought, "delay"> & {
  id: number;
  isNew: boolean;
};

type ConsoleError = {
  id: number;
  message: string;
  isNew: boolean;
};

const CONSOLE_ERROR_COUNT = 12;
const TOTAL_ANIMATION_TIMING = 12000;
const INITIAL_DELAY = 0.1 * TOTAL_ANIMATION_TIMING;
const CHAOS_INTERVAL = 400;
const VIOLENT_SCREEN_SHAKE_INTERVAL = 500;

const PrankPortfolio: React.FC<ChaoticPortfolioProps> = ({ onComplete }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const visitorAlertRef = useRef<HTMLDivElement>(null);
  const [panicThoughts, setPanicThoughts] = useState<ActualThought[]>([]);
  const [layoutBroken, setLayoutBroken] = useState(false);
  const [showTerminal, setShowTerminal] = useState(false);
  const [showFatalError, setShowFatalError] = useState(false);
  const [consoleErrors, setConsoleErrors] = useState<ConsoleError[]>([]);

  const addPanicThought = useCallback(
    (
      text: string,
      priority: Priority,
      position: Position,
      makeOldTime = 500
    ) => {
      const removeOldThoughts = () => {
        setPanicThoughts((prevThoughts) => {
          return prevThoughts.filter((thought) => thought.id !== newThought.id);
        });
      };

      const makeCurrentThoughOld = () => {
        setPanicThoughts((prevThoughts) =>
          prevThoughts.map((thought) => {
            if (thought.id === newThought.id)
              return { ...thought, isNew: false };
            return thought;
          })
        );
      };

      const newThought = {
        id: Date.now(),
        text,
        priority,
        position,
        isNew: true,
      };

      setPanicThoughts((prevThoughts) => [...prevThoughts, newThought]);
      setTimeout(makeCurrentThoughOld, makeOldTime);
      setTimeout(removeOldThoughts, 10000);
    },
    []
  );

  const showConsoleErrors = useCallback(() => {
    const addConsoleError = (message: string) => {
      const newError = {
        id: Date.now(),
        message,
        isNew: true,
      };

      setConsoleErrors((prev) => [newError, ...prev].slice(0, 8));

      setTimeout(() => {
        setConsoleErrors((prev) =>
          prev.map((error) =>
            error.id === newError.id ? { ...error, isNew: false } : error
          )
        );
      }, 500);
    };

    const errorTimeouts: NodeJS.Timeout[] = [];
    for (let i = 0; i < CONSOLE_ERROR_COUNT; i++) {
      const timeout = setTimeout(() => {
        const message = errorMessages[i % errorMessages.length];
        addConsoleError(message);
      }, 2000 + i * 1200);
      errorTimeouts.push(timeout);
    }
    return () => {
      errorTimeouts.forEach((timeout) => clearTimeout(timeout));
    };
  }, []);

  const createRandomErrors = useCallback(() => {
    // Create and append error messages at random positions more frequently
    for (let i = 0; i < 15; i++) {
      setTimeout(() => {
        if (!containerRef.current) return;

        const errorElement = document.createElement("div");
        errorElement.className = "error-message";
        errorElement.textContent =
          errors[Math.floor(Math.random() * errors.length)];

        // Random position
        errorElement.style.top = `${10 + Math.random() * 80}%`;
        errorElement.style.left = `${Math.random() * 80}%`;
        errorElement.style.zIndex = "100";

        // Add some random styling for variety
        if (Math.random() > 0.5) {
          errorElement.style.transform = `rotate(${
            (Math.random() - 0.5) * 20
          }deg)`;
        }

        if (Math.random() > 0.6) {
          errorElement.style.fontSize = `${14 + Math.random() * 10}px`;
        }

        // Random animation duration for more chaos
        errorElement.style.animationDuration = `${2 + Math.random() * 3}s`;

        containerRef.current.appendChild(errorElement);

        // Remove after some time
        setTimeout(() => {
          containerRef.current?.removeChild(errorElement);
        }, 3000 + Math.random() * 2000);
      }, 1500 + i * 1000);
    }
  }, []);

  const startChaos = useCallback(() => {
    let start = 0;
    const chaosInterval = setInterval(() => {
      if (containerRef.current) {
        const intensity = Math.min(
          0.7,
          Math.random() * 0.2 + (layoutBroken ? 0.3 : 0.1)
        );
        const skewX = (Math.random() - 0.5) * 20 * intensity;
        const skewY = (Math.random() - 0.5) * 10 * intensity;
        const rotate = (Math.random() - 0.5) * 5 * intensity;
        const scaleX = 1 + (Math.random() - 0.5) * 0.4 * intensity;

        containerRef.current.style.transform = `skew(${skewX}deg, ${skewY}deg) rotate(${rotate}deg) scaleX(${scaleX}) bg-black`;

        if (start == 0 || Math.random() > 0.8) {
          containerRef.current?.classList.add("violent-shake");
          setTimeout(
            () => containerRef.current?.classList.remove("violent-shake"),
            VIOLENT_SCREEN_SHAKE_INTERVAL
          );
        }
      }
      start++;
    }, INITIAL_DELAY + CHAOS_INTERVAL);

    return () => clearInterval(chaosInterval);
  }, [layoutBroken]);

  const startChaosEffects = useCallback(() => {
    if (!containerRef.current) return;
    containerRef.current.classList.add("mega-glitching");

    setTimeout(
      () => visitorAlertRef.current?.classList.add("show-alert"),
      6000
    );

    createRandomErrors();
  }, [createRandomErrors]);

  const showThoughts = useCallback(() => {
    const thoughtTimeouts = thoughtSequence.map((thought) => {
      return setTimeout(() => {
        addPanicThought(thought.text, thought.priority, thought.position);

        if (thought.text.includes("WRONG PORTFOLIO")) startChaosEffects();
        if (thought.text.includes("unstyled HTML")) setLayoutBroken(true);

        if (thought.text.includes("client is going to KILL")) {
          setShowTerminal(true);
        }

        if (thought.text.includes("EVERYTHING IS FALLING APART")) {
          // Show fatal error screen
          setTimeout(() => {
            setShowFatalError(true);
          }, 1000);
        }
      }, thought.delay);
    });

    return () => {
      thoughtTimeouts.forEach((timeout) => clearTimeout(timeout));
    };
  }, [startChaosEffects, addPanicThought]);

  useEffect(() => {
    const initialReactionTimeout = setTimeout(
      () => addPanicThought("What the hell is this?! 😱", "high", "left", 2000),
      INITIAL_DELAY
    );

    const clearConsoleErrors = showConsoleErrors();
    const clearThoughts = showThoughts();
    const completionTimeout = setTimeout(onComplete, 12000);
    const clearChaos = startChaos();

    return () => {
      clearTimeout(initialReactionTimeout);
      clearThoughts();
      clearConsoleErrors();
      clearTimeout(completionTimeout);
      clearChaos();
    };
  }, [
    onComplete,
    startChaos,
    showThoughts,
    showConsoleErrors,
    addPanicThought,
  ]);

  return (
    <div
      ref={containerRef}
      className="chaotic-portfolio-container relative w-full h-screen overflow-hidden bg-white text-black font-serif p-5"
    >
      {/* Glitch overlay elements - keep these with original CSS classes for animations */}
      <div className="glitch-lines"></div>
      <div className="rgb-shift"></div>
      <div className="noise-overlay"></div>

      <BasicPortfolio layoutBroken={layoutBroken} />

      {/* Console error terminal */}
      {showTerminal && <Console errors={consoleErrors} />}

      {/* Panic thought bubbles - keep original CSS classes for animations and positioning */}
      {panicThoughts.map((thought) => (
        <div
          key={thought.id}
          className={`panic-thought ${thought.priority}-priority ${
            thought.position
          }-position ${thought.isNew ? "animate-in" : ""}`}
        >
          {thought.text}
        </div>
      ))}

      {/* Visitor alert that appears during chaos - keep original class for animations */}
      <div
        ref={visitorAlertRef}
        className="visitor-alert fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 scale-0 w-96 bg-gray-900 border-2 border-red-600 rounded-lg shadow-xl z-50 overflow-hidden opacity-0 transition-all duration-300"
      >
        <div className="bg-red-600 text-white p-3 flex items-center">
          <span className="mr-2.5 text-lg">⚠️</span>
          <span className="flex-grow font-bold font-sans uppercase tracking-wider">
            CRITICAL FAILURE
          </span>
          <span className="text-xl cursor-pointer">×</span>
        </div>
        <div className="p-5 font-sans text-white">
          <p className="text-red-500 text-2xl font-bold mb-2.5 text-center uppercase alert-main-message">
            WRONG PORTFOLIO DEPLOYED!
          </p>
          <p className="mb-4">
            CSS failed to load! Frameworks broken! Visitors are seeing unstyled
            content!
          </p>
          <div className="bg-gray-800 bg-opacity-30 rounded-md my-4 p-2.5 flex justify-between">
            <div className="flex flex-col items-center p-1">
              <span className="text-xl mb-1">👁️</span>
              <span className="text-xs text-gray-300">5 active visitors</span>
            </div>
            <div className="flex flex-col items-center p-1">
              <span className="text-xl mb-1">⏱️</span>
              <span className="text-xs text-gray-300">4m 12s exposure</span>
            </div>
            <div className="flex flex-col items-center p-1">
              <span className="text-xl mb-1">📉</span>
              <span className="text-xs text-gray-300">100% bounce rate</span>
            </div>
          </div>
          <div className="flex justify-center gap-2.5 mt-4">
            <button
              className="bg-red-600 text-white px-4 py-2 rounded font-bold animate-pulse"
              onClick={() => {}}
            >
              PANIC
            </button>
            <button className="bg-transparent text-gray-300 border border-gray-600 px-4 py-2 rounded">
              Refresh Page
            </button>
          </div>
        </div>
      </div>

      {/* Fatal error screen */}
      {showFatalError && (
        <div className="fixed inset-0 bg-red-900 bg-opacity-95 z-50 flex justify-center items-center animate-fadeIn">
          <div className="w-96 bg-gray-800 border-2 border-red-600 rounded-lg p-8 text-center text-white shadow-2xl">
            <div className="text-5xl mb-5 inline-block fatal-error-icon">
              💀
            </div>
            <h2 className="text-2xl font-bold mb-4 text-red-600 fatal-error-title">
              FATAL ERROR
            </h2>
            <p className="text-gray-300 mb-5">
              System has encountered a critical error and cannot recover
            </p>
            <div className="inline-block bg-red-900 bg-opacity-20 px-2.5 py-1 rounded text-sm font-mono text-red-400 mb-5">
              ERR_PORTFOLIO_CRASH
            </div>
            <div className="text-left font-mono text-xs text-gray-500 bg-black bg-opacity-50 p-2.5 rounded mb-5 overflow-auto max-h-24">
              <div className="mb-1">at renderPortfolio (portfolio.js:42)</div>
              <div className="mb-1">at loadStylesheets (styles.js:17)</div>
              <div className="mb-1">at Object.initializeApp (index.js:23)</div>
              <div className="mb-1">
                at performReactRefresh (react-refresh.js:63)
              </div>
            </div>
            <button
              className="bg-red-600 text-white border-none py-2.5 px-5 rounded font-bold text-base cursor-pointer"
              onClick={() => {
                if (onComplete) onComplete();
              }}
            >
              EMERGENCY RECOVERY
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PrankPortfolio;
