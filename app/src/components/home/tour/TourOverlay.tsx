import React, { useEffect, useState } from "react";
import { useTour } from "./context/TourContext";
import TourTooltip from "./TourTooltip";
import TourGuide from "./guide/TourGuide";
import TourLoading from "./utils/TourLoading";
import TourSpotlight from "./TourSpotlight";
import "./TourStyles.css";

const TourOverlay: React.FC = () => {
  const { active, endTour } = useTour();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!active) return;
    setLoading(true);
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, [active]);

  useEffect(() => {
    if (!active) return;

    const scrollY = window.scrollY;

    document.body.style.position = "fixed";
    document.body.style.top = `-${scrollY}px`;
    document.body.style.width = "100%";

    return () => {
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.width = "";
      window.scrollTo(0, scrollY);
    };
  }, [active]);

  if (!active) return null;

  return (
    <div className="fixed z-[9995] top-0 left-0 w-full h-full pointer-events-none">
      {loading ? (
        <TourLoading />
      ) : (
        <>
          <TourSpotlight />
          <TourTooltip />
          <TourGuide />

          <button
            className="tour-close-button"
            onClick={endTour}
            aria-label="Close tour"
          >
            <span>×</span>
          </button>
        </>
      )}
    </div>
  );
};

export default TourOverlay;
