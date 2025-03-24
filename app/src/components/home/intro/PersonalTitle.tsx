import { motion } from "framer-motion";
import React from "react";
import Reveal from "@/components/animations/reveal/Reveal";

/**
 * PersonalTitle component displays a title and a brief bio for the user.
 * It utilizes framer-motion for animations to enhance the visual appeal.
 *
 * @returns {JSX.Element} The rendered PersonalTitle component.
 */
const PersonalTitle: React.FC = () => {
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
          <Reveal effect="slide-in" direction="right" delay={1}>
            <span className="ml-6 bg-gradient-to-r from-ctp-teal to-ctp-mauve text-transparent bg-clip-text">
              Utkarsh Priyadarshi
            </span>
          </Reveal>
        </span>
      </motion.h1>

      <Reveal effect="typewriter" direction="left" delay={1} duration={1.5}>
        <p className="text-lg sm:text-xl text-[#cdd6f4] mb-4">
          <span className="border-r-2 border-ctp-yellow pr-2 mr-2">
            Full-Stack Developer
          </span>
          <span>& DevOps Engineer</span>
        </p>
      </Reveal>
    </>
  );
};

export default PersonalTitle;
