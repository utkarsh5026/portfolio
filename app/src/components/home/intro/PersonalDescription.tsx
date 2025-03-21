import { motion, AnimationControls } from "framer-motion";
import React from "react";

interface PersonalDescriptionProps {
  descriptionControls: AnimationControls;
}

/**
 * PersonalDescription Component
 *
 * This component displays a personal description in a styled motion div.
 * It utilizes Framer Motion for animations and is designed to be visually appealing
 * with a responsive layout.
 *
 * Props:
 * - descriptionControls: AnimationControls
 *   Controls the animation state of the component, allowing for smooth transitions
 *   when the component comes into view.
 *
 * Usage:
 * <PersonalDescription descriptionControls={yourAnimationControls} />
 *
 * Example:
 * const descriptionControls = useAnimation();
 *
 * return (
 *   <PersonalDescription descriptionControls={descriptionControls} />
 * );
 */
const PersonalDescription: React.FC<PersonalDescriptionProps> = ({
  descriptionControls,
}) => {
  return (
    <motion.div
      className="mb-6 text-[#bac2de] p-4 border-l-2 border-ctp-peach bg-[#1e1e2e]/60 rounded-md shadow-lg hover:shadow-xl transition-all"
      initial={{ opacity: 0, x: -30 }}
      animate={descriptionControls}
    >
      <p className="mb-2">
        Passionate developer with a knack for crafting elegant solutions to
        complex problems.
      </p>
      <p className="mb-2">
        I specialize in building scalable web applications and robust
        infrastructure systems that deliver exceptional user experiences.
      </p>
      <p>
        With expertise spanning front-end aesthetics to back-end architecture, I
        bridge the gap between user needs and technical implementation.
      </p>
    </motion.div>
  );
};

export default PersonalDescription;
