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
import FatalError from "./FatalError";
import { cn } from "@/lib/utils";

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

const INITIAL_DELAY = 1200;
const TERMINAL_DELAY = INITIAL_DELAY + 3000;
const FATAL_ERROR_DELAY = INITIAL_DELAY + 4000;
const TOTAL_ANIMATION_TIMING = FATAL_ERROR_DELAY + 1500;

const CHAOS_INTERVAL = 400;
const VIOLENT_SCREEN_SHAKE_INTERVAL = 500;
const TERMINAL_MESSAGE_INTERVAL = 200;

/**
 * PrankPortfolio Component
 *
 * A chaotic portfolio component that simulates a website breaking down with visual glitches,
 * error messages, and panic thoughts. This creates a humorous "prank" experience before
 * transitioning to the actual portfolio.
 *
 * The component progresses through several stages:
 * 1. Initial entrance animation
 * 2. Displaying panic thoughts
 * 3. Breaking the layout
 * 4. Showing a terminal with errors
 * 5. Displaying a fatal error
 * 6. Final blackout transition to the real portfolio
 *
 * @param {Object} props - Component props
 * @param {Function} props.onComplete - Callback function to execute when animation completes
 */
const PrankPortfolio: React.FC<ChaoticPortfolioProps> = ({ onComplete }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [panicThoughts, setPanicThoughts] = useState<ActualThought[]>([]);
  const [layoutBroken, setLayoutBroken] = useState(false);
  const [showTerminal, setShowTerminal] = useState(false);
  const [showFatalError, setShowFatalError] = useState(false);
  const [consoleErrors, setConsoleErrors] = useState<ConsoleError[]>([]);
  const [enableBlackout, setEnableBlackout] = useState(false);
  const [entrance, setEntrance] = useState(false);

  /**
   * Triggers the final blackout effect and completes the animation sequence
   * by calling the onComplete callback after a delay.
   */
  const blackout = useCallback(() => {
    setEnableBlackout(true);
    setTimeout(onComplete, 1500);
  }, [onComplete]);

  /**
   * Adds a new panic thought bubble to the screen with specified properties.
   * The thought will appear as new, then transition to old, and finally be removed.
   *
   * @param {string} text - The text content of the thought
   * @param {Priority} priority - Priority level affecting the visual style (high, medium, low)
   * @param {Position} position - Screen position for the thought (left, right, center)
   * @param {number} makeOldTime - Time in ms before the thought transitions from new to old
   */
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

  /**
   * Displays a sequence of error messages in the console terminal.
   * Adds errors at timed intervals to simulate a system breakdown.
   *
   * @returns {Function} Cleanup function to clear all timeouts
   */
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
      }, TERMINAL_DELAY + i * TERMINAL_MESSAGE_INTERVAL);
      errorTimeouts.push(timeout);
    }
    return () => {
      errorTimeouts.forEach((timeout) => clearTimeout(timeout));
    };
  }, []);

  /**
   * Creates random error message elements that appear at random positions
   * on the screen to enhance the chaotic effect.
   */
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

  /**
   * Initiates the chaotic visual effects by applying random transformations
   * to the container at regular intervals, creating a glitchy appearance.
   *
   * @returns {Function} Cleanup function to clear the interval
   */
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

  /**
   * Enhances the chaos effect by adding mega-glitching class and
   * creating random error messages on the screen.
   */
  const startChaosEffects = useCallback(() => {
    if (!containerRef.current) return;
    containerRef.current.classList.add("mega-glitching");
    createRandomErrors();
  }, [createRandomErrors]);

  /**
   * Displays the sequence of panic thoughts based on the predefined
   * thought sequence, triggering additional effects at specific points.
   *
   * @returns {Function} Cleanup function to clear all timeouts
   */
  const showThoughts = useCallback(() => {
    const thoughtTimeouts = thoughtSequence.map((thought) => {
      return setTimeout(() => {
        addPanicThought(thought.text, thought.priority, thought.position);
        if (thought.text.includes("WRONG PORTFOLIO")) startChaosEffects();
        if (thought.text.includes("unstyled HTML")) setLayoutBroken(true);
      }, thought.delay);
    });

    return () => {
      thoughtTimeouts.forEach((timeout) => clearTimeout(timeout));
    };
  }, [startChaosEffects, addPanicThought]);

  /**
   * Displays the fatal error screen after a specified delay.
   *
   * @returns {Function} Cleanup function to clear the timeout
   */
  const fatalError = useCallback(() => {
    const fatalErrorTimeout = setTimeout(
      () => setShowFatalError(true),
      FATAL_ERROR_DELAY
    );
    return () => clearTimeout(fatalErrorTimeout);
  }, []);

  /**
   * Shows the terminal console after a specified delay.
   *
   * @returns {Function} Cleanup function to clear the timeout
   */
  const bringTerminal = useCallback(() => {
    const terminalTimeout = setTimeout(
      () => setShowTerminal(true),
      TERMINAL_DELAY
    );
    return () => clearTimeout(terminalTimeout);
  }, []);

  /**
   * Main effect that orchestrates the entire animation sequence.
   * Sets up all the timeouts and intervals for the various stages of the prank.
   */
  useEffect(() => {
    if (!entrance) return;

    const initialReactionTimeout = setTimeout(
      () => addPanicThought("What the hell is this?! 😱", "high", "left", 2000),
      INITIAL_DELAY
    );

    const clearTerminal = bringTerminal();
    const clearConsoleErrors = showConsoleErrors();
    const clearFatalError = fatalError();
    const clearThoughts = showThoughts();
    const completionTimeout = setTimeout(
      blackout,
      TOTAL_ANIMATION_TIMING - 1500
    );
    const clearChaos = startChaos();

    return () => {
      clearTimeout(initialReactionTimeout);
      clearThoughts();
      clearConsoleErrors();
      clearTimeout(completionTimeout);
      clearChaos();
      clearFatalError();
      clearTerminal();
    };
  }, [
    onComplete,
    startChaos,
    showThoughts,
    showConsoleErrors,
    addPanicThought,
    bringTerminal,
    fatalError,
    blackout,
    entrance,
  ]);

  /**
   * Handles the initial entrance animation before starting the main sequence.
   */
  useEffect(() => {
    if (!entrance) {
      containerRef.current?.classList.add("entrance-chaotic");
      setTimeout(() => setEntrance(true), 3000);
    }
  }, [entrance]);

  return (
    <div
      ref={containerRef}
      className={cn(
        "chaotic-portfolio-container relative w-full h-screen overflow-hidden bg-white text-black font-serif p-5",
        enableBlackout && "enable-blackout"
      )}
    >
      <div className="smooth-blackout-container">
        <div className="blackout-vignette"></div>
        <div className="blackout-scanlines"></div>
        <div className="blackout-center"></div>
        <div className="blackout-overlay"></div>
      </div>
      <div className="glitch-lines"></div>
      <div className="rgb-shift"></div>

      <BasicPortfolio layoutBroken={layoutBroken} />

      {/* Console error terminal */}
      {showTerminal && <Console errors={consoleErrors} />}

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

      {showFatalError && (
        <FatalError makeSkullLarge={enableBlackout} onComplete={blackout} />
      )}
    </div>
  );
};

export default PrankPortfolio;
