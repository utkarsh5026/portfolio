import React from "react";
import { useTour } from "../context/TourContext";
import { FaLightbulb } from "react-icons/fa";
import "./TourButton.css";

const TourFloatingButton: React.FC = () => {
  const { active, startTour } = useTour();

  return (
    <button
      className="fixed bottom-6 right-6 z-[9990] flex items-center gap-2 p-2 bg-ctp-yellow text-ctp-base border-2 border-ctp-lavender rounded-full font-mono text-sm font-bold shadow-xl hover:scale-105 transition-all duration-300 ease-in-out animate-pulse tour-floating-button"
      onClick={startTour}
      disabled={active}
      aria-label="Take a guided tour"
    >
      <FaLightbulb className="text-2xl" />
      <span className="tour-button-text">Take a Tour</span>
    </button>
  );
};

export default TourFloatingButton;
