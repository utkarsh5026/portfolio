import React from "react";
import "../TourStyles.css";

const TourLoading: React.FC = () => {
  return (
    <div className="tour-loading-container">
      <div className="tour-loading-spinner">
        <div className="tour-loading-bar"></div>
        <div className="tour-loading-bar"></div>
        <div className="tour-loading-bar"></div>
        <div className="tour-loading-bar"></div>
      </div>
      <div className="tour-loading-text">
        <span>Initializing Tour</span>
        <span className="loading-dots">
          <span>.</span>
          <span>.</span>
          <span>.</span>
        </span>
      </div>
    </div>
  );
};

export default TourLoading;
