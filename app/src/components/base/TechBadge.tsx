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
      className="px-3 py-1.5 bg-gray-900 dark:bg-black rounded-full text-sm 
      flex items-center gap-2.5 cursor-pointer transition-all duration-300 
      border border-transparent hover:border-primary/40
      hover:scale-105 hover:shadow-xl hover:shadow-primary/10
      dark:hover:shadow-primary/5 
      active:scale-95 text-white dark:text-gray-200"
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
