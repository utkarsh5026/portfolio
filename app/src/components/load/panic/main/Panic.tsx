import React from "react";
import WindowProvider from "../context/WinowProvider";
import PanicScene from "./PanicScene";

interface PanicProps {
  onComplete: () => void;
}

const Panic: React.FC<PanicProps> = ({ onComplete }) => {
  return (
    <WindowProvider>
      <PanicScene onComplete={onComplete} />
    </WindowProvider>
  );
};

export default Panic;
