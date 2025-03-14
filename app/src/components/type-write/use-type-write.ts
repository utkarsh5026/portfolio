import { useState, useEffect, useRef, useCallback } from "react";

/**
 * Configuration options for the typewriting effect
 */
export interface TypewritingOptions {
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
  cursor?: string | JSX.Element;

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
 * Return type for the useTypewriting hook
 */
export interface TypewritingResult {
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
  cursor: string | JSX.Element | null;
}

/**
 * Animation phases for the typewriter effect
 */
enum TypewriterPhase {
  IDLE = "idle",
  TYPING = "typing",
  TYPED = "typed",
  PAUSING = "pausing",
  DELETING = "deleting",
  DELETED = "deleted",
}

/**
 * A flexible hook for creating typewriter effects in React components
 *
 * @param options Configuration options for the typewriting effect
 * @returns Object containing the current state and control functions
 *
 * @example
 * // Basic usage
 * const { displayedText, isComplete } = useTypewriting({
 *   text: "Hello, world!"
 * });
 *
 * @example
 * // Advanced usage with control functions
 * const { displayedText, isTyping, isDeleting, start, startDeleting, pause, reset } = useTypewriting({
 *   text: "This text will be typed...",
 *   speed: 50,
 *   delay: 1000,
 *   autoStart: false,
 *   humanize: true
 * });
 */
export const useTypewriting = (
  options: TypewritingOptions
): TypewritingResult => {
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
    cursor = "▌",
    repeat = false,
    deleteDelay = 2000,
    deleteSpeed = 30,
    processText = (text: string) => text,
  } = options;

  const [displayedText, setDisplayedText] = useState<string>("");
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [phase, setPhase] = useState<TypewriterPhase>(TypewriterPhase.IDLE);
  const [shouldStart, setShouldStart] = useState<boolean>(autoStart);

  const isTyping = phase === TypewriterPhase.TYPING;
  const isDeleting = phase === TypewriterPhase.DELETING;
  const isComplete =
    phase === TypewriterPhase.TYPED || phase === TypewriterPhase.PAUSING;

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const textRef = useRef(text);

  /**
   * Clear all timeouts
   */
  const clearTimers = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  /**
   * Start the typing animation
   */
  const start = useCallback(() => {
    clearTimers();
    setPhase(TypewriterPhase.IDLE);
    setShouldStart(true);

    // Start typing after the specified delay
    timerRef.current = setTimeout(() => {
      setPhase(TypewriterPhase.TYPING);
    }, delay);
  }, [delay, clearTimers]);

  /**
   * Start deleting the text
   */
  const startDeleting = useCallback(() => {
    clearTimers();
    setPhase(TypewriterPhase.DELETING);
  }, [clearTimers]);

  /**
   * Pause the typing animation
   */
  const pause = useCallback(() => {
    clearTimers();
    setPhase((prevPhase) =>
      prevPhase === TypewriterPhase.TYPING ||
      prevPhase === TypewriterPhase.DELETING
        ? TypewriterPhase.PAUSING
        : prevPhase
    );
  }, [clearTimers]);

  /**
   * Reset and restart the typing animation
   */
  const reset = useCallback(() => {
    clearTimers();
    setDisplayedText("");
    setCurrentIndex(0);
    setPhase(TypewriterPhase.IDLE);

    // Restart
    if (shouldStart) {
      start();
    }
  }, [start, clearTimers, shouldStart]);

  /**
   * Handle the deletion of the text
   */
  const handleDeletion = useCallback(() => {
    if (phase !== TypewriterPhase.DELETING) return;

    const handleDeletionComplete = () => {
      setPhase(TypewriterPhase.DELETED);
      setCurrentIndex(0);

      if (onDelete) {
        onDelete();
      }

      if (onCycle) {
        onCycle();
      }

      if (repeat) {
        timerRef.current = setTimeout(() => {
          setPhase(TypewriterPhase.TYPING);
        }, delay);
      }
    };

    const continueDeletion = () =>
      setDisplayedText((prev) => prev.slice(0, -1));

    if (displayedText.length === 0) {
      handleDeletionComplete();
      return;
    }

    timerRef.current = setTimeout(() => {
      continueDeletion();
    }, deleteSpeed);
  }, [displayedText, deleteSpeed, delay, onDelete, onCycle, repeat, phase]);

  /**
   * Handle the typing of the text
   */
  const handleTyping = useCallback(() => {
    if (phase !== TypewriterPhase.TYPING) return;

    const handleTypingComplete = () => {
      setPhase(TypewriterPhase.TYPED);

      if (onComplete) {
        onComplete();
      }

      if (repeat) {
        timerRef.current = setTimeout(() => {
          setPhase(TypewriterPhase.DELETING);
        }, deleteDelay);
      }
    };

    const humaizeTyping = () => {
      const randomFactor = 0.7 + Math.random() * 0.6 * humanizeFactor;
      let typingSpeed = Math.round(speed * randomFactor);

      // Add additional randomness for certain characters
      const nextChar = text[currentIndex];
      if ([".", ",", "!", "?"].includes(nextChar)) {
        typingSpeed *= 1.5;
      }
      return typingSpeed;
    };

    if (currentIndex >= text.length) {
      handleTypingComplete();
      return;
    }

    let typingSpeed = speed;
    if (humanize) {
      typingSpeed = humaizeTyping();
    }

    timerRef.current = setTimeout(() => {
      setDisplayedText((prev) => prev + text[currentIndex]);
      setCurrentIndex((prev) => prev + 1);
    }, typingSpeed);
  }, [
    currentIndex,
    deleteDelay,
    humanize,
    humanizeFactor,
    onComplete,
    repeat,
    speed,
    phase,
    text,
  ]);

  useEffect(() => {
    if (text !== textRef.current) {
      textRef.current = text;
      reset();
    }
  }, [text, reset]);

  useEffect(() => {
    if (phase === TypewriterPhase.TYPING) {
      handleTyping();
      return clearTimers;
    }
  }, [phase, handleTyping, clearTimers]);

  useEffect(() => {
    if (phase === TypewriterPhase.DELETING) {
      handleDeletion();
      return clearTimers;
    }
  }, [phase, handleDeletion, clearTimers]);

  useEffect(() => {
    if (autoStart) start();
    return clearTimers;
  }, [autoStart, start, clearTimers]);

  const progress =
    text.length > 0 ? Math.floor((currentIndex / text.length) * 100) : 0;

  const processedText = processText(displayedText);

  const shouldShowCursor =
    showCursor &&
    (phase === TypewriterPhase.TYPING ||
      phase === TypewriterPhase.PAUSING ||
      phase === TypewriterPhase.DELETING);

  const cursorElement = shouldShowCursor ? cursor : null;

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
