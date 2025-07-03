import { motion } from "framer-motion";
import React from "react";
import Reveal from "@/components/animations/reveal/Reveal";

/**
 * PersonalTitle component with minimal tech-inspired design.
 * Clean and modern with subtle tech aesthetics.
 */
const PersonalTitle: React.FC = () => {
  return (
    <div className="relative">
      {/* Subtle grid background */}
      <div
        className="absolute inset-0 opacity-[0.02] pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(rgba(137, 180, 250, 1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(137, 180, 250, 1) 1px, transparent 1px)
          `,
          backgroundSize: "30px 30px",
        }}
      />

      {/* Terminal prompt indicator */}
      <motion.div
        className="flex items-center gap-2 mb-4 font-mono text-sm text-ctp-overlay1"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
      >
        <span className="text-ctp-green">❯</span>
        <span>./introduce_myself</span>
      </motion.div>

      {/* Main title */}
      <motion.h1
        className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-white"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <span className="flex flex-col xs:flex-row xs:items-center xs:flex-wrap gap-1 xs:gap-3">
          <motion.span
            className="text-white"
            animate={{
              textShadow: [
                "0 0 0px rgba(137, 180, 250, 0)",
                "0 0 20px rgba(137, 180, 250, 0.3)",
                "0 0 0px rgba(137, 180, 250, 0)",
              ],
            }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          >
            Hi, I'm
          </motion.span>
          <Reveal effect="slide-in" direction="right" delay={1}>
            <span
              className="bg-gradient-to-r from-ctp-teal to-ctp-mauve text-transparent bg-clip-text relative"
              style={{
                filter: "drop-shadow(0 0 8px rgba(203, 166, 247, 0.3))",
              }}
            >
              Utkarsh Priyadarshi
            </span>
          </Reveal>
        </span>
      </motion.h1>

      {/* Role description with subtle tech styling */}
      <Reveal effect="typewriter" direction="left" delay={1.5} duration={1.5}>
        <div className="relative">
          <p className="text-base xs:text-lg sm:text-xl md:text-2xl text-ctp-text mb-4 font-mono">
            <span className="text-ctp-peach border-r-2 border-ctp-yellow pr-2 mr-2">
              Full-Stack Developer
            </span>
            <span className="text-ctp-sapphire">&</span>
            <span className="text-ctp-teal ml-2">DevOps Engineer</span>
          </p>

          {/* Subtle accent line */}
          <motion.div
            className="h-[1px] bg-gradient-to-r from-ctp-mauve via-ctp-blue to-transparent"
            initial={{ width: 0 }}
            animate={{ width: "60%" }}
            transition={{ duration: 1.5, delay: 3 }}
          />
        </div>
      </Reveal>
    </div>
  );
};

export default PersonalTitle;
