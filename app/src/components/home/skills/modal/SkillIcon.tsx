import React from "react";
import "./css/SkillIcon.css";

interface SkillIconProps {
  icon: React.ReactNode;
  color: string;
  isActive: boolean;
  isCompleted: boolean;
  isTransitioning: boolean;
}

/**
 * SkillIcon Component
 *
 * This component renders an animated skill icon with various states
 * to indicate whether the skill is active, completed, or transitioning.
 *
 * Props:
 * - icon: React.ReactNode - The icon to be displayed.
 * - color: string - The color associated with the skill, used for styling.
 * - isActive: boolean - Indicates if the skill is currently active.
 * - isCompleted: boolean - Indicates if the skill has been completed.
 * - isTransitioning: boolean - Indicates if the skill is currently transitioning.
 *
 * The component uses framer-motion for animations, including hover effects,
 * scaling, and rotation based on the skill's state.
 */
const SkillIcon: React.FC<SkillIconProps> = ({
  icon,
  color,
  isActive,
  isCompleted,
  isTransitioning,
}) => {
  const containerClass = `icon-container ${isActive ? "active" : ""} ${
    isTransitioning ? "transitioning" : ""
  }`;

  const iconClass = `icon-inner ${isActive ? "active" : ""} ${
    isTransitioning ? "transitioning" : ""
  }`;

  const bgTextClass = () => {
    if (isActive)
      return `bg-gradient-to-br from-ctp-${color} to-ctp-${color}/80 text-ctp-base shadow-md shadow-ctp-${color}/10`;

    if (isCompleted) return `bg-ctp-surface0 text-ctp-${color}`;
    return "bg-ctp-surface0 text-ctp-overlay0";
  };

  return (
    <div className="skill-icon-wrapper relative flex-shrink-0 mt-1">
      {/* Icon container */}
      <div
        className={`
          relative flex h-10 w-10 items-center justify-center 
          rounded-md ${containerClass}
          ${bgTextClass()}
        `}
      >
        {/* The icon */}
        <div className={iconClass}>{icon}</div>

        {/* Status indicator */}
        {isCompleted && (
          <div className="status-indicator absolute -bottom-1 -right-1 w-4 h-4 bg-ctp-crust rounded-full flex items-center justify-center border border-ctp-surface0">
            <div className={`w-2.5 h-2.5 rounded-full bg-ctp-${color}/80`}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={3}
                stroke="currentColor"
                className="w-2.5 h-2.5 text-ctp-crust"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m4.5 12.75 6 6 9-13.5"
                />
              </svg>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SkillIcon;
