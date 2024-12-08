import React from "react";
import GradientText from "../utils/GradientText";

interface SectionProps {
  id: string;
  label: string;
  className?: string;
  children: React.ReactNode;
}

const Section: React.FC<SectionProps> = ({
  id,
  label,
  className,
  children,
}) => {
  return (
    <div id={id} className={`mt-64 ${className} relative`}>
      <div className="absolute -right-20 -top-20 w-1/2 h-96  rounded-full border-2 border-gray-500/10" />
      <GradientText className="text-8xl font-bold text-right">
        {label}
      </GradientText>
      <hr className="my-8" />
      {children}
    </div>
  );
};

export default Section;
