import React from "react";
import { useTour } from "../context/TourContext";
import { FaLightbulb } from "react-icons/fa";
import "./TourButton.css";

const TourFloatingButton: React.FC = () => {
  const { active, startTour } = useTour();

  return (
    <button
      className="fixed bottom-6 right-6 z-[9990] flex items-center gap-2 p-2.5 bg-ctp-lavender text-ctp-surface0 border-none rounded-full font-mono text-sm font-medium shadow-lg cursor-pointer  ease-in-out tour-floating-button"
      onClick={startTour}
      disabled={active}
      aria-label="Take a guided tour"
    >
      <FaLightbulb className="text-xl" />
      <span className="tour-button-text">Take a Tour</span>
    </button>
  );
};

export default TourFloatingButton;
