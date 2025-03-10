import { useState, useCallback } from "react";

export const useSteps = (totalSteps: number) => {
  const [typingSteps, setTypingSteps] = useState<number>(0);

  const incrementTypingSteps = useCallback(() => {
    if (typingSteps >= totalSteps) return;
    setTypingSteps((prev) => prev + 1);
  }, [typingSteps, totalSteps]);

  const isFinalStep = useCallback(() => {
    return typingSteps >= totalSteps;
  }, [typingSteps, totalSteps]);

  return { typingSteps, incrementTypingSteps, isFinalStep };
};
