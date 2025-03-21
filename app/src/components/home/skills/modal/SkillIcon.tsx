import { motion, AnimatePresence } from "framer-motion";
import React from "react";

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
  return (
    <motion.div
      className="relative flex-shrink-0 mt-1"
      initial={{ opacity: 0.9 }}
      animate={{ opacity: 1 }}
      whileHover={{ scale: 1.05 }}
    >
      {/* Icon container */}
      <motion.div
        className={`
          relative flex h-10 w-10 items-center justify-center 
          rounded-md
          ${
            isActive
              ? `bg-gradient-to-br from-ctp-${color} to-ctp-${color}/80 text-ctp-base shadow-md shadow-ctp-${color}/10`
              : isCompleted
              ? `bg-ctp-surface0 text-ctp-${color}`
              : "bg-ctp-surface0 text-ctp-overlay0"
          }
        `}
        animate={getIconAnimation(isActive, isTransitioning)}
      >
        {/* The icon */}
        <motion.div
          animate={getIconRotationAnimation(isActive, isTransitioning)}
        >
          {icon}
        </motion.div>

        {/* Status indicator */}
        <AnimatePresence>
          {isCompleted && (
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{
                scale: 1,
                opacity: 1,
                transition: {
                  type: "spring",
                  stiffness: 400,
                  damping: 20,
                },
              }}
              exit={{ scale: 0, opacity: 0 }}
              className="absolute -bottom-1 -right-1 w-4 h-4 bg-ctp-crust rounded-full flex items-center justify-center border border-ctp-surface0"
            >
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
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
};

/**
 * Returns the animation properties for the icon based on its active state and transition state.
 *
 * @param {boolean} isActive - Indicates if the icon is currently active.
 * @param {boolean} isTransitioning - Indicates if the icon is in a transitioning state.
 * @returns {object} - The animation properties including scale and transition settings.
 *
 * If the icon is active and not transitioning, it will scale up and down infinitely.
 * If the icon is transitioning, it will scale slightly larger.
 * If neither condition is met, it returns an empty object.
 */
const getIconAnimation = (isActive: boolean, isTransitioning: boolean) => {
  if (isActive && !isTransitioning) {
    return {
      scale: [1, 1.05, 1],
      transition: { duration: 2, repeat: Infinity },
    };
  } else if (isTransitioning) {
    return {
      scale: 1.1,
      transition: { duration: 0.3 },
    };
  }
  return {};
};

/**
 * Returns the rotation animation properties for the icon based on its active state and transition state.
 *
 * @param {boolean} isActive - Indicates if the icon is currently active.
 * @param {boolean} isTransitioning - Indicates if the icon is in a transitioning state.
 * @returns {object} - The animation properties including rotation and transition settings.
 *
 * If the icon is active and not transitioning, it will rotate back and forth infinitely.
 * If the icon is transitioning, it will rotate slightly.
 * If neither condition is met, it returns an empty object.
 */
const getIconRotationAnimation = (
  isActive: boolean,
  isTransitioning: boolean
) => {
  if (isActive && !isTransitioning) {
    return {
      rotate: [0, 5, 0, -5, 0],
      transition: { duration: 4, repeat: Infinity },
    };
  } else if (isTransitioning) {
    return {
      rotate: [0, 10, 0],
      transition: { duration: 0.5 },
    };
  }
  return {};
};

export default SkillIcon;
