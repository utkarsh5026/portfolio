import { useSwipeable } from "react-swipeable";
import { useEffect, useCallback } from "react";

interface UseFlashcardNavigationProps {
  onNext: () => void;
  onPrev: () => void;
  totalCards: number;
  currentIndex: number;
  enabled?: boolean;
}

export const useFlashcardNavigation = ({
  onNext,
  onPrev,
  totalCards,
  currentIndex,
  enabled = true,
}: UseFlashcardNavigationProps) => {
  const handleNext = useCallback(() => {
    if (currentIndex < totalCards - 1) onNext();
  }, [currentIndex, totalCards, onNext]);

  const handlePrev = useCallback(() => {
    if (currentIndex > 0) onPrev();
  }, [currentIndex, onPrev]);

  useEffect(() => {
    if (!enabled) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement
      ) {
        return;
      }

      switch (e.key) {
        case "ArrowRight":
          handleNext();
          break;
        case "ArrowLeft":
          handlePrev();
          break;
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [enabled, handleNext, handlePrev]);

  const swipeHandlers = useSwipeable({
    onSwipedLeft: handleNext,
    onSwipedRight: handlePrev,
    preventScrollOnSwipe: true,
    trackMouse: false,
    delta: 50,
  });

  return {
    swipeHandlers,
    handleNext,
    handlePrev,
    canGoNext: currentIndex < totalCards - 1,
    canGoPrev: currentIndex > 0,
  };
};
