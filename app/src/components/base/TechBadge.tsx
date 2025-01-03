import React from "react";
import { technologies } from "./technologies";

type TechBadgeProps = {
  tech: string;
};

const TechBadge: React.FC<TechBadgeProps> = ({ tech }) => {
  const techName = tech.toLowerCase();

  const handleTechClick = () => {
    window.open(technologies[techName]?.aboutLink, "_blank");
  };

  return (
    <button
      className="px-3 py-1.5 bg-gray-100 dark:bg-gray-700 rounded-full text-sm 
      flex items-center gap-2.5 cursor-pointer transition-all duration-300 
      hover:bg-gray-200 dark:hover:bg-gray-600 hover:scale-105 
      hover:shadow-md dark:hover:shadow-gray-800 
      active:scale-95"
      onClick={handleTechClick}
    >
      {technologies[techName]?.icon && (
        <span className="text-base">{technologies[techName].icon}</span>
      )}
      <span className="font-medium">{technologies[techName]?.name}</span>
    </button>
  );
};

export default TechBadge;
