import React from "react";

interface GradientTextProps {
  children: React.ReactNode;
  className?: string;
}
const GradientText: React.FC<GradientTextProps> = ({ children, className }) => {
  return (
    <div
      className={`bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent font-bold ${className}`}
    >
      {children}
    </div>
  );
};

export default GradientText;
