import { useState, useRef, useEffect, useCallback } from "react";

/**
 * TypewriterState represents the possible states of the typewriter animation
 *
 * - idle: Initial state, not yet started
 * - typing: Currently adding characters
 * - pausing: Temporarily paused (user-initiated or auto-pause after completion)
 * - deleting: Removing characters
 * - complete: Finished the current cycle
 */
type TypewriterState = "idle" | "typing" | "pausing" | "deleting" | "complete";

/**
 * Configuration options for the typewriter effect
 */
export interface TypewriterOptions {
  /** Text content to type */
  text: string;

  /** Typing speed in milliseconds per character */
  speed?: number;

  /** Initial delay before typing starts in milliseconds */
  delay?: number;

  /** Whether typing should start automatically */
  autoStart?: boolean;

  /** Callback function executed when typing completes (before deletion) */
  onComplete?: () => void;

  /** Callback function executed after text is fully deleted */
  onDelete?: () => void;

  /** Callback function executed after a full cycle (type + delete) */
  onCycle?: () => void;

  /** Add randomness to typing speed for a more human-like effect */
  humanize?: boolean;

  /** Humanization factor - higher means more randomness (0.1 to 1.0) */
  humanizeFactor?: number;

  /** Whether to show a cursor at the end of the text */
  showCursor?: boolean;

  /** Custom cursor element or string */
  cursor?: string | React.ReactNode;

  /** Whether to delete the text after typing and repeat */
  repeat?: boolean;

  /** Delay before starting to delete text (for repeat mode) */
  deleteDelay?: number;

  /** Speed for deleting characters (for repeat mode) */
  deleteSpeed?: number;

  /** Optional text processing function (for syntax highlighting etc.) */
  processText?: (text: string) => React.ReactNode;
}

/**
 * Return type for the useTypewriter hook
 */
export interface TypewriterResult {
  /** The current displayed text */
  displayedText: string;

  /** Processed version of displayed text (for syntax highlighting) */
  processedText: React.ReactNode;

  /** Whether typing is in progress */
  isTyping: boolean;

  /** Whether deletion is in progress */
  isDeleting: boolean;

  /** Whether typing has completed (but may still be in delete phase if repeat=true) */
  isComplete: boolean;

  /** Progress of typing as percentage (0-100) */
  progress: number;

  /** Function to start typing */
  start: () => void;

  /** Function to start deleting */
  startDeleting: () => void;

  /** Function to pause typing */
  pause: () => void;

  /** Function to reset and start from beginning */
  reset: () => void;

  /** Cursor element or string based on configuration */
  cursor: string | React.ReactNode | null;
}

/**
 * A robust hook for creating typewriter effects in React components
 *
 * This hook provides a stable and predictable typewriter animation with
 * features like humanized typing, pausing, and repeating.
 *
 * @param options Configuration options for the typewriting effect
 * @returns Object containing the current state and control functions
 *
 * @example
 * // Basic usage
 * const { displayedText, isComplete } = useTypewriter({
 *   text: "Hello, world!"
 * });
 *
 * @example
 * // Advanced usage with control functions
 * const { displayedText, isTyping, isDeleting, start, startDeleting, pause, reset } = useTypewriter({
 *   text: "This text will be typed...",
 *   speed: 50,
 *   delay: 1000,
 *   autoStart: false,
 *   humanize: true
 * });
 */
export const useTypewriting = (
  options: TypewriterOptions
): TypewriterResult => {
  const {
    text,
    speed = 40,
    delay = 0,
    autoStart = true,
    onComplete,
    onDelete,
    onCycle,
    humanize = false,
    humanizeFactor = 0.5,
    showCursor = true,
    cursor = "|",
    repeat = false,
    deleteDelay = 2000,
    deleteSpeed = 30,
    processText = (text: string) => text,
  } = options;
  const [displayedText, setDisplayedText] = useState<string>("");
  const [state, setState] = useState<TypewriterState>("idle");
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [shouldStart, setShouldStart] = useState<boolean>(autoStart);

  const textRef = useRef<string>(text);

  const timerRefs = useRef<Set<NodeJS.Timeout>>(new Set());

  console.dir(timerRefs.current);
  console.log(displayedText, state, currentIndex);

  /**
   * Clear all active timers to avoid memory leaks and race conditions
   * This ensures that when state changes or component unmounts,
   * we don't have lingering timeouts
   */
  const clearTimers = useCallback(() => {
    timerRefs.current.forEach((timerId) => clearTimeout(timerId));
    timerRefs.current.clear();
  }, []);

  /**
   * Helper to safely create timeouts that get tracked for cleanup
   * @param callback Function to call when timeout expires
   * @param ms Milliseconds to wait
   * @returns Timeout ID (also stored internally)
   */
  const safeTimeout = useCallback(
    (callback: () => void, ms: number): NodeJS.Timeout => {
      const id = setTimeout(() => {
        // Remove this timer from the set when it runs
        timerRefs.current.delete(id);
        callback();
      }, ms);

      // Track this timer for potential cleanup
      timerRefs.current.add(id);
      return id;
    },
    []
  );

  /**
   * Calculate a realistic typing speed with slight variations
   * This makes the typing feel more human and less mechanical
   */
  const getHumanizedSpeed = useCallback(() => {
    if (!humanize) return speed;

    // Add randomness to timing, influenced by humanizeFactor
    const variation = Math.random() * humanizeFactor;
    const factor = 0.7 + variation;
    let typingSpeed = Math.round(speed * factor);

    // Add even more delay for certain punctuation marks
    const nextChar = text[currentIndex];
    if ([".", ",", "!", "?", ";", ":"].includes(nextChar)) {
      typingSpeed *= 1.5;
    }

    return typingSpeed;
  }, [humanize, humanizeFactor, speed, text, currentIndex]);

  /**
   * Start the typing animation
   * This can be called manually or automatically based on options
   */
  const start = useCallback(() => {
    clearTimers();
    setState("idle");
    setShouldStart(true);

    // Start typing after the specified delay
    safeTimeout(() => {
      setState("typing");
    }, delay);
  }, [delay, clearTimers, safeTimeout]);

  /**
   * Start the deletion animation
   * This removes characters one by one
   */
  const startDeleting = useCallback(() => {
    clearTimers();
    setState("deleting");
  }, [clearTimers]);

  /**
   * Pause the current animation
   * Can be resumed later with start() or startDeleting()
   */
  const pause = useCallback(() => {
    clearTimers();
    setState("pausing");
  }, [clearTimers]);

  /**
   * Reset the animation to the beginning
   * Optionally restarts if shouldStart is true
   */
  const reset = useCallback(() => {
    clearTimers();
    setDisplayedText("");
    setCurrentIndex(0);
    setState("idle");

    // Wait for state to settle before potentially restarting
    // This avoids race conditions with React's state batching
    safeTimeout(() => {
      if (shouldStart) {
        start();
      }
    }, 10);
  }, [clearTimers, shouldStart, start, safeTimeout]);

  /**
   * Handle text changes by resetting and restarting
   * This ensures the animation works properly when text prop changes
   */
  useEffect(() => {
    if (text !== textRef.current) {
      textRef.current = text;
      reset();
    }
  }, [text, reset]);

  /**
   * Core typing animation logic
   * This effect runs whenever the typing state changes
   */
  useEffect(() => {
    if (state !== "typing") return;

    // If we're at the end of the text
    if (currentIndex >= text.length) {
      setState("complete");

      if (onComplete) {
        onComplete();
      }

      // Set up deletion if repeat mode is enabled
      if (repeat) {
        safeTimeout(() => {
          setState("deleting");
        }, deleteDelay);
      }

      return;
    }

    // Calculate timing for next character
    const typingSpeed = getHumanizedSpeed();

    // Schedule addition of next character
    safeTimeout(() => {
      setDisplayedText((prev) => prev + text[currentIndex]);
      setCurrentIndex((prev) => prev + 1);
    }, typingSpeed);
  }, [
    state,
    currentIndex,
    text,
    repeat,
    deleteDelay,
    getHumanizedSpeed,
    onComplete,
    safeTimeout,
  ]);

  /**
   * Core deletion animation logic
   * This effect runs whenever the deleting state changes
   */
  useEffect(() => {
    if (state !== "deleting") return;

    // If all text is deleted
    if (displayedText.length === 0) {
      setState("complete");

      if (onDelete) {
        onDelete();
      }

      if (onCycle) {
        onCycle();
      }

      // Restart if in repeat mode
      if (repeat) {
        safeTimeout(() => {
          reset();
        }, delay);
      }

      return;
    }

    // Schedule removal of last character
    safeTimeout(() => {
      setDisplayedText((prev) => prev.slice(0, -1));
    }, deleteSpeed);
  }, [
    state,
    displayedText,
    deleteSpeed,
    delay,
    repeat,
    onDelete,
    onCycle,
    reset,
    safeTimeout,
  ]);

  /**
   * Auto-start effect
   * This runs on mount and when autoStart changes
   */
  useEffect(() => {
    if (autoStart) start();

    // Cleanup timers when component unmounts
    return () => {
      clearTimers();
    };
  }, [autoStart, start, clearTimers]);

  // Calculate progress percentage
  const progress =
    text.length > 0 ? Math.floor((currentIndex / text.length) * 100) : 0;

  // Process text for special formatting if needed
  const processedText = processText(displayedText);

  // Determine if cursor should be shown
  const isTypingOrPausing =
    state === "typing" || state === "pausing" || state === "deleting";
  const cursorElement = showCursor && isTypingOrPausing ? cursor : null;

  // Determine states for return object
  const isTyping = state === "typing";
  const isDeleting = state === "deleting";
  const isComplete =
    state === "complete" || (!repeat && displayedText === text);

  // Return the complete result object
  return {
    displayedText,
    processedText,
    isTyping,
    isDeleting,
    isComplete,
    progress,
    start,
    startDeleting,
    pause,
    reset,
    cursor: cursorElement,
  };
};

export default useTypewriting;
