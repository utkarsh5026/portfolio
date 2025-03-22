import React, {
  useState,
  useCallback,
  useEffect,
  useMemo,
  useRef,
} from "react";
import { TourContext } from "./TourContext";
import type { TourStep } from "./TourType";
import { tourSteps } from "../steps/registry";

/**
 * TourProvider component - Manages the guided tour experience for the application
 *
 * This component provides the tour state and functionality to all child components
 * through React Context. It handles:
 * - Starting and ending the tour
 * - Navigating between tour steps
 * - Tracking the current step
 * - Keyboard navigation (Escape to exit)
 * - Preserving scroll position between tour sessions
 *
 * @example
 * ```tsx
 * <TourProvider>
 *   <YourApp />
 * </TourProvider>
 * ```
 */
export const TourProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [active, setActive] = useState(false);
  const [currentStepId, setCurrentStepId] = useState<TourStep | null>(null);
  const steps = useRef(tourSteps);

  /**
   * Starts the guided tour
   *
   * Sets the tour to active and displays the first step.
   * Saves the current scroll position to restore it when the tour ends.
   */
  const startTour = useCallback(() => {
    if (steps.current.length <= 0) return;

    document.body.setAttribute(
      "data-scroll-position",
      window.scrollY.toString()
    );
    setCurrentStepId(steps.current[0].id);
    setActive(true);
  }, [steps]);

  /**
   * Ends the guided tour
   *
   * Deactivates the tour, clears the current step,
   * and restores the original scroll position.
   */
  const endTour = useCallback(() => {
    setActive(false);
    setCurrentStepId(null);

    const scrollY = parseInt(
      document.body.getAttribute("data-scroll-position") ?? "0"
    );
    window.scrollTo(0, scrollY);
  }, []);

  /**
   * Navigates to the next step in the tour
   *
   * If at the last step, ends the tour.
   */
  const nextStep = useCallback(() => {
    if (!currentStepId || !active) return;
    const currentIndex = steps.current.findIndex(
      (step) => step.id === currentStepId
    );
    if (currentIndex < steps.current.length - 1)
      setCurrentStepId(steps.current[currentIndex + 1].id);
    else endTour();
  }, [currentStepId, active, steps, endTour]);

  /**
   * Navigates to the previous step in the tour
   *
   * Does nothing if already at the first step.
   */
  const prevStep = useCallback(() => {
    if (!currentStepId || !active) return;
    const currentIndex = steps.current.findIndex(
      (step) => step.id === currentStepId
    );
    if (currentIndex > 0) {
      setCurrentStepId(steps.current[currentIndex - 1].id);
    }
  }, [currentStepId, active, steps]);

  /**
   * Navigates to a specific step in the tour
   *
   * @param stepId - The ID of the step to navigate to
   */
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

  /**
   * Gets the current step's details
   *
   * @returns The current step object or null if no step is active
   */
  const getCurrentStep = useCallback(() => {
    if (!currentStepId) return null;
    return steps.current.find((step) => step.id === currentStepId) || null;
  }, [steps, currentStepId]);

  /**
   * Checks if the current step is the first step in the tour
   *
   * @returns True if on the first step, false otherwise
   */
  const isFirstStep = useCallback(() => {
    if (!currentStepId || !active) return false;
    return steps.current.findIndex((step) => step.id === currentStepId) === 0;
  }, [currentStepId, active, steps]);

  /**
   * Checks if the current step is the last step in the tour
   *
   * @returns True if on the last step, false otherwise
   */
  const isLastStep = useCallback(() => {
    if (!currentStepId || !active) return false;
    return (
      steps.current.findIndex((step) => step.id === currentStepId) ===
      steps.current.length - 1
    );
  }, [currentStepId, active, steps]);

  // Handle keyboard events (Escape to exit tour)
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
