import React, {
  useState,
  useCallback,
  useEffect,
  useMemo,
  useRef,
} from "react";
import { TourContext } from "./TourContext";
import type { TourStep } from "../TourType";
import { tourSteps } from "../steps/registry";

export const TourProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [active, setActive] = useState(false);
  const [currentStepId, setCurrentStepId] = useState<TourStep | null>(null);
  const steps = useRef(tourSteps);

  const startTour = useCallback(() => {
    if (steps.current.length <= 0) return;

    document.body.setAttribute(
      "data-scroll-position",
      window.scrollY.toString()
    );
    setCurrentStepId(steps.current[0].id);
    setActive(true);
  }, [steps]);

  const endTour = useCallback(() => {
    setActive(false);
    setCurrentStepId(null);

    const scrollY = parseInt(
      document.body.getAttribute("data-scroll-position") ?? "0"
    );
    window.scrollTo(0, scrollY);
  }, []);

  const nextStep = useCallback(() => {
    if (!currentStepId || !active) return;
    const currentIndex = steps.current.findIndex(
      (step) => step.id === currentStepId
    );
    if (currentIndex < steps.current.length - 1)
      setCurrentStepId(steps.current[currentIndex + 1].id);
    else endTour();
  }, [currentStepId, active, steps, endTour]);

  const prevStep = useCallback(() => {
    if (!currentStepId || !active) return;
    const currentIndex = steps.current.findIndex(
      (step) => step.id === currentStepId
    );
    if (currentIndex > 0) {
      setCurrentStepId(steps.current[currentIndex - 1].id);
    }
  }, [currentStepId, active, steps]);

  const goToStep = useCallback(
    (stepId: TourStep) => {
      if (!active) return;

      const targetStep = steps.current.find((step) => step.id === stepId);
      if (targetStep) {
        setCurrentStepId(targetStep.id);
      }
    },
    [active, steps]
  );

  const getCurrentStep = useCallback(() => {
    if (!currentStepId) return null;
    return steps.current.find((step) => step.id === currentStepId) || null;
  }, [steps, currentStepId]);

  const isFirstStep = useCallback(() => {
    if (!currentStepId || !active) return false;
    return steps.current.findIndex((step) => step.id === currentStepId) === 0;
  }, [currentStepId, active, steps]);

  const isLastStep = useCallback(() => {
    if (!currentStepId || !active) return false;
    return (
      steps.current.findIndex((step) => step.id === currentStepId) ===
      steps.current.length - 1
    );
  }, [currentStepId, active, steps]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && active) {
        endTour();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [active, endTour]);

  // Provide the tour context to children
  const contextValue = useMemo(
    () => ({
      active,
      currentStepId,
      getCurrentStep,
      startTour,
      endTour,
      nextStep,
      prevStep,
      goToStep,
      isFirstStep,
      isLastStep,
    }),
    [
      active,
      currentStepId,
      getCurrentStep,
      startTour,
      endTour,
      nextStep,
      prevStep,
      goToStep,
      isFirstStep,
      isLastStep,
    ]
  );

  return (
    <TourContext.Provider value={contextValue}>{children}</TourContext.Provider>
  );
};
