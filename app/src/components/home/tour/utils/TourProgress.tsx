import React from "react";
import { useTour } from "../context/TourContext";
import { tourSteps } from "../steps/registry";

const TourProgress: React.FC = () => {
  const { currentStepId } = useTour();
  const currentIndex = tourSteps.findIndex((step) => step.id === currentStepId);
  const totalSteps = tourSteps.length;
  const progressPercentage = ((currentIndex + 1) / totalSteps) * 100;

  return (
    <div className="flex items-start gap-2 flex-col p-2">
      <div className="h-1 w-full bg-ctp-surface0 rounded-full">
        <div
          className="h-full bg-ctp-lavender rounded-full"
          style={{ width: `${progressPercentage}%` }}
        />
      </div>
      <div className="text-sm text-ctp-mauve">
        Step {currentIndex + 1} of {totalSteps}
      </div>
    </div>
  );
};

export default TourProgress;
