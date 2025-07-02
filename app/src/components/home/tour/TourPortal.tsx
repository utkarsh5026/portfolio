import React from "react";
import ReactDOM from "react-dom";
import TourOverlay from "./TourOverlay";
// import TourFloatingButton from "./utils/TourFloatingbutton";
import { useTour } from "./context/TourContext";

const TourPortal: React.FC = () => {
  const { active } = useTour();
  return (
    <>
      {/* {ReactDOM.createPortal(<TourFloatingButton />, document.body)} */}
      {active && ReactDOM.createPortal(<TourOverlay />, document.body)}
    </>
  );
};

export default TourPortal;
