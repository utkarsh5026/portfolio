import { createContext, useContext } from "react";
import { TourStep } from "./TourType";

export type TourContextType = {
  /**
   * Indicates if the tour is currently active.
   */
  active: boolean;
  /**
   * The ID of the current step in the tour.
   */
  currentStepId: TourStep | null;
  /**
   * Function to get the current step details.
   */
  getCurrentStep: () => {
    id: TourStep;
    placement: string;
    highlightSelector: string | null;
  } | null;
  /**
   * Function to start the tour.
   */
  startTour: () => void;
  /**
   * Function to end the tour.
   */
  endTour: () => void;
  /**
   * Function to navigate to the next step in the tour.
   */
  nextStep: () => void;
  /**
   * Function to navigate to the previous step in the tour.
   */
  prevStep: () => void;
  /**
   * Function to navigate to a specific step in the tour.
   * @param stepId - The ID of the step to navigate to.
   */
  goToStep: (stepId: TourStep) => void;
  /**
   * Function to check if the current step is the first step in the tour.
   */
  isFirstStep: () => boolean;
  /**
   * Function to check if the current step is the last step in the tour.
   */
  isLastStep: () => boolean;
};

/**
 * Creates a context for the tour state.
 */
export const TourContext = createContext<TourContextType | null>(null);

/**
 * A hook to use the TourContext.
 *
 * Throws an error if used outside of a TourProvider.
 *
 * @returns The current tour context.
 */
export const useTour = () => {
  const context = useContext(TourContext);
  if (!context) {
    throw new Error("useTour must be used within a TourProvider");
  }
  return context;
};
