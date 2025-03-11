import React, { useEffect, useState } from "react";
import { useTour } from "./context/TourContext";
import "./TourStyles.css";
import "./TourSpotlight.css";

const TourSpotlight: React.FC = () => {
  const { active, getCurrentStep } = useTour();
  const currentStep = getCurrentStep();
  const [spotlightStyle, setSpotlightStyle] = useState({});
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!active || !currentStep?.highlightSelector) {
      setIsVisible(false);
      return;
    }

    const updateSpotlightPosition = () => {
      const targetElement = document.querySelector(
        currentStep?.highlightSelector ?? ""
      );

      if (!targetElement) {
        setIsVisible(false);
        return;
      }

      const rect = targetElement.getBoundingClientRect();

      const padding = 15;
      setSpotlightStyle({
        top: `${rect.top - padding}px`,
        left: `${rect.left - padding}px`,
        width: `${rect.width + padding * 2}px`,
        height: `${rect.height + padding * 2}px`,
      });

      setIsVisible(true);

      targetElement.classList.add("tour-highlight");
    };

    updateSpotlightPosition();

    window.addEventListener("scroll", updateSpotlightPosition);
    window.addEventListener("scroll", updateSpotlightPosition);
    window.addEventListener("resize", updateSpotlightPosition);

    return () => {
      window.removeEventListener("scroll", updateSpotlightPosition);
      window.removeEventListener("resize", updateSpotlightPosition);

      // Remove highlight class from target element
      if (currentStep?.highlightSelector) {
        const targetElement = document.querySelector(
          currentStep.highlightSelector
        );
        if (targetElement) {
          targetElement.classList.remove("tour-highlight");
        }
      }
    };
  }, [active, currentStep]);

  useEffect(() => {
    if (!active || !currentStep) {
      setIsVisible(false);
      return;
    }

    if (currentStep.placement === "center" || !currentStep.highlightSelector) {
      setIsVisible(false);
    }
  }, [active, currentStep]);

  if (!isVisible) return null;

  return (
    <div className="tour-spotlight-container">
      <div className="tour-spotlight-mask">
        <div className="tour-spotlight-hole" style={spotlightStyle} />
      </div>
    </div>
  );
};

export default TourSpotlight;
