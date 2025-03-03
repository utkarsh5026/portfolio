import React from "react";

interface GradientTextProps {
  children: React.ReactNode;
  className?: string;
}
const GradientText: React.FC<GradientTextProps> = ({ children, className }) => {
  return (
    <span
      className={`bg-gradient-to-r from-ctp-lavender via-ctp-blue to-ctp-lavender bg-clip-text text-transparent ${className}`}
    >
      {children}
    </span>
  );
};

export default GradientText;
