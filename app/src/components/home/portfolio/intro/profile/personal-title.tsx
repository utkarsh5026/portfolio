import React from "react";

import Reveal from "@/components/animations/reveal/Reveal";
import { useGitComponent } from "@/hooks/use-git-component";

import styles from "./profile.module.css";

/**
 * PersonalTitle component with minimal tech-inspired design.
 * Clean and modern with subtle tech aesthetics.
 */
const PersonalTitle: React.FC = () => {
  const ref = useGitComponent(PersonalTitle);

  return (
    <div ref={ref} className="relative">
      {/* Subtle grid background */}
      <div
        className="absolute inset-0 opacity-[0.02] pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(rgb(var(--ctp-blue)) 1px, transparent 1px),
            linear-gradient(90deg, rgb(var(--ctp-blue)) 1px, transparent 1px)
          `,
          backgroundSize: "30px 30px",
        }}
      />

      {/* Terminal prompt indicator */}
      <div
        className={`flex items-center gap-2 mb-4 font-source text-sm text-ctp-overlay1 ${styles.textFadeIn}`}
      >
        <span className="text-ctp-green">❯</span>
        <span>./introduce_myself</span>
      </div>

      {/* Main title */}
      <h1
        className={`text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold font-source mb-6 text-ctp-text ${styles.textFadeInDelay1}`}
      >
        <span className="flex flex-col xs:flex-row xs:items-center xs:flex-wrap gap-1 xs:gap-3">
          <span className="text-ctp-text">Hi, I'm</span>
          <Reveal effect="slide-in" direction="right" delay={1}>
            <span
              className="bg-gradient-to-r from-ctp-teal to-ctp-mauve text-transparent bg-clip-text relative"
              style={{
                filter:
                  "drop-shadow(0 0 8px color-mix(in srgb, rgb(var(--ctp-mauve)) 30%, transparent))",
              }}
            >
              Utkarsh Priyadarshi
            </span>
          </Reveal>
        </span>
      </h1>

      {/* Role description with subtle tech styling */}
      <Reveal effect="typewriter" direction="left" delay={1.5} duration={1.5}>
        <div className="relative">
          <p className="text-base xs:text-lg sm:text-xl md:text-2xl text-ctp-text mb-4 font-source">
            <span className="text-ctp-peach border-r-2 border-ctp-yellow pr-2 mr-2">
              Full-Stack Developer
            </span>
            <span className="text-ctp-sapphire">&</span>
            <span className="text-ctp-teal ml-2">DevOps Engineer</span>
          </p>

          {/* Subtle accent line */}
          <div
            className={`h-[1px] bg-gradient-to-r from-ctp-mauve via-ctp-blue to-transparent w-[60%] ${styles.textFadeInDelay2}`}
          />
        </div>
      </Reveal>
    </div>
  );
};

export default PersonalTitle;
