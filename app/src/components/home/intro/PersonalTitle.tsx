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
        className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-3 text-white flex flex-col"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <span className="flex flex-col xs:flex-row xs:items-center xs:flex-wrap gap-1 xs:gap-2">
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
          </motion.span>
          <Reveal effect="slide-in" direction="right" delay={1}>
            <span className="bg-gradient-to-r from-ctp-teal to-ctp-mauve text-transparent bg-clip-text break-words">
              Utkarsh Priyadarshi
            </span>
          </Reveal>
        </span>
      </motion.h1>

      <Reveal effect="typewriter" direction="left" delay={1} duration={1.5}>
        <p className="text-base xs:text-lg sm:text-xl md:text-2xl text-[#cdd6f4] mb-4">
          <span className="inline-block border-r-2 border-ctp-yellow pr-1 xs:pr-2 mr-1 xs:mr-2">
            Full-Stack Developer
          </span>
          <span className="inline-block">& DevOps Engineer</span>
        </p>
      </Reveal>
    </>
  );
};

export default PersonalTitle;
