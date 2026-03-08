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

import { useGitComponent } from "@/hooks/use-git-component";

import { type TechName, technologies } from "./technologies";

type TechBadgeProps = {
  tech: string;
};

const TechBadge: React.FC<TechBadgeProps> = ({ tech }) => {
  const gitRef = useGitComponent(TechBadge);
  const techData = technologies[tech as TechName];
  if (!techData) return null;

  const handleTechClick = () => {
    window.open(techData.aboutLink, "_blank");
  };

  return (
    <div
      ref={gitRef}
      onClick={handleTechClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === "Enter" && handleTechClick()}
      className="flex items-center gap-1.5 px-2.5 py-1.5 bg-ctp-surface1/15 hover:bg-ctp-surface1/30 rounded-md transition-all duration-200 group/tech cursor-pointer"
    >
      <div className="flex-shrink-0 flex items-center justify-center group-hover/tech:scale-110 transition-transform duration-200">
        <div className="w-3.5 h-3.5 flex items-center justify-center">
          {techData.icon}
        </div>
      </div>
      <span className="text-[11px] sm:text-xs text-ctp-subtext1 group-hover/tech:text-ctp-text font-medium transition-colors duration-200 -mt-[1px]">
        {techData.name}
      </span>
    </div>
  );
};

export default TechBadge;
