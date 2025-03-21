import { motion, AnimationControls } from "framer-motion";
import React from "react";

interface PersonalTitleProps {
  nameControls: AnimationControls;
  bioControls: AnimationControls;
}

/**
 * PersonalTitle component displays a title and a brief bio for the user.
 * It utilizes framer-motion for animations to enhance the visual appeal.
 *
 * @component
 * @param {PersonalTitleProps} props - The properties for the component.
 * @param {AnimationControls} props.nameControls - Animation controls for the name text.
 * @param {AnimationControls} props.bioControls - Animation controls for the bio text.
 *
 * @returns {JSX.Element} The rendered PersonalTitle component.
 *
 * @example
 * <PersonalTitle nameControls={nameAnimation} bioControls={bioAnimation} />
 */
const PersonalTitle: React.FC<PersonalTitleProps> = ({
  nameControls,
  bioControls,
}) => {
  return (
    <>
      <motion.h1
        className="text-3xl sm:text-5xl font-bold mb-3 text-white flex flex-col"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <span className="flex items-center whitespace-nowrap">
          <motion.span
            className="text-white"
            animate={{
              textShadow: [
                "0 0 10px rgba(180, 190, 254, 0)",
                "0 0 20px rgba(180, 190, 254, 0.5)",
                "0 0 10px rgba(180, 190, 254, 0)",
              ],
            }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            Hi, I'm
          </motion.span>{" "}
          <motion.span
            className="ml-6 bg-gradient-to-r from-[#89b4fa] to-[#cba6f7] text-transparent bg-clip-text"
            initial={{ opacity: 0, y: 30 }}
            animate={nameControls}
          >
            Utkarsh Priyadarshi
          </motion.span>
        </span>
      </motion.h1>

      <motion.p
        className="text-lg sm:text-xl text-[#cdd6f4] mb-4"
        initial={{ opacity: 0, y: 30 }}
        animate={bioControls}
      >
        <span className="border-r-2 border-[#89b4fa] pr-2 mr-2">
          Full-Stack Developer
        </span>
        & DevOps Engineer
      </motion.p>
    </>
  );
};

export default PersonalTitle;
