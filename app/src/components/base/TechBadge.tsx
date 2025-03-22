/**
 * A clickable badge component that shows off different technologies! 🛠️
 *
 * This component creates those neat little tech pills you see throughout the app.
 * Each badge shows an icon and the name of a technology, and when clicked,
 * it'll take you to more info about that tech.
 *
 * Features:
 * - Hover animations with a subtle glow effect
 * - Click animation that scales the badge down
 * - Dark mode support
 * - Auto-fetches icons and links from our technologies config
 */

import React from "react";
import { technologies, type TechName } from "./technologies";

type TechBadgeProps = {
  tech: TechName;
};

const TechBadge: React.FC<TechBadgeProps> = ({ tech }) => {
  const handleTechClick = () => {
    window.open(technologies[tech]?.aboutLink, "_blank");
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
      {technologies[tech]?.icon && (
        <span className="text-base">{technologies[tech].icon}</span>
      )}
      <span className="font-medium">{technologies[tech]?.name}</span>
    </button>
  );
};

export default TechBadge;
