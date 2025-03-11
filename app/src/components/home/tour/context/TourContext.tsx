import { createContext, useContext } from "react";
import { TourStep } from "./TourType";

export type TourContextType = {
  active: boolean;
  currentStepId: TourStep | null;
  getCurrentStep: () => {
    id: TourStep;
    placement: string;
    highlightSelector: string | null;
  } | null;
  startTour: () => void;
  endTour: () => void;
  nextStep: () => void;
  prevStep: () => void;
  goToStep: (stepId: TourStep) => void;
  isFirstStep: () => boolean;
  isLastStep: () => boolean;
};

export const TourContext = createContext<TourContextType | null>(null);

export const useTour = () => {
  const context = useContext(TourContext);
  if (!context) {
    throw new Error("useTour must be used within a TourProvider");
  }
  return context;
};
