import React from "react";
import Reveal from "@/components/animations/reveal/Reveal";

import PersonalTitle from "./personal-title";
import ProfileButtons from "./ProfileButtons";
import Terminal from "./statements-terminal";
import PersonalDescription from "./personal-description";
import TechSkills from "./TechSkills";
import ProfilePicture from "./profile-picture";
import { cn } from "@/lib/utils";
import useMobile from "@/hooks/use-mobile";

// New component for right sidebar content
const RightSidebarContent: React.FC = () => {
  return (
    <div className="flex flex-col justify-center h-full gap-12">
      {/* Profile Picture */}
      <Reveal effect="ripple-in" direction="right" duration={1} delay={0.5}>
        <ProfilePicture />
      </Reveal>

      {/* Terminal - moved to right side for balance */}
      <Reveal effect="fold-unfold" delay={1.2}>
        <Terminal />
      </Reveal>

      {/* Quick Stats Card */}
      {/* <Reveal effect="fade-up" delay={1.5}>
        <div
          className={cn(
            "bg-gradient-to-br from-ctp-surface0/60 to-ctp-mantle/40",
            "backdrop-blur-sm rounded-xl border border-ctp-surface1/40",
            "p-4 shadow-lg"
          )}
        >
          <h3 className="text-sm font-mono text-ctp-green mb-3">
            ❯ whoami --stats
          </h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-ctp-overlay1">Experience:</span>
              <span className="text-ctp-blue font-mono">3+ years</span>
            </div>
            <div className="flex justify-between">
              <span className="text-ctp-overlay1">Projects:</span>
              <span className="text-ctp-green font-mono">15+ built</span>
            </div>
            <div className="flex justify-between">
              <span className="text-ctp-overlay1">Coffee:</span>
              <span className="text-ctp-yellow font-mono">∞ cups</span>
            </div>
          </div>
        </div>
      </Reveal> */}
    </div>
  );
};

/**
 * Enhanced PersonalHeader with cinematic reveal animations
 *
 * This component orchestrates a cinematic entrance sequence using
 * the CinematicReveal component for all child elements.
 */
const PersonalIntro: React.FC = () => {
  const { isMobile } = useMobile();

  return (
    <Reveal
      effect="fade-up"
      duration={0.7}
      className="relative isolate min-h-screen overflow-hidden"
    >
      <div className="absolute inset-0 -z-20">
        <Reveal effect="blur-in" duration={1.8} delay={0.8}>
          <div
            className="absolute inset-0 opacity-25 mix-blend-overlay"
            style={{
              backgroundImage: `radial-gradient(circle at 30% 70%, rgba(203, 166, 247, 0.15), transparent 40%),
                                 radial-gradient(circle at 70% 30%, rgba(137, 180, 250, 0.15), transparent 40%)`,
            }}
          />
        </Reveal>
      </div>

      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-6 md:py-12">
        <Reveal
          effect="emerge"
          duration={0.9}
          delay={0.2}
          className={cn(
            "relative",
            "backdrop-blur-lg bg-gradient-to-b from-ctp-mantle to-ctp-crust rounded-2xl",
            "p-6 md:p-10 shadow-2xl mb-10 overflow-hidden"
          )}
        >
          <div
            className={cn(
              "grid gap-8 lg:gap-12 items-start relative z-10",
              isMobile ? "grid-cols-1" : "grid-cols-1 lg:grid-cols-2"
            )}
          >
            {/* Left Column - Main Content */}
            <Reveal
              effect="assemble"
              cascade={true}
              staggerChildren={0.09}
              className="space-y-6"
            >
              <Reveal effect="slide-in" direction="left">
                <PersonalTitle />
              </Reveal>

              <Reveal effect="spotlight-in" delay={1}>
                <PersonalDescription />
              </Reveal>

              <Reveal effect="fade-up" delay={0.7}>
                <ProfileButtons />
              </Reveal>
              {/* 
              <Reveal effect="fold-unfold" delay={1.2}>
                <Terminal />
              </Reveal> */}

              {/* On mobile, show a simplified version here */}
              {isMobile && (
                <Reveal effect="fade-up" delay={1}>
                  <div className="flex justify-center py-4">
                    <ProfilePicture />
                  </div>
                </Reveal>
              )}
            </Reveal>

            {/* Right Column - Visual Content (Desktop Only) */}
            {!isMobile && (
              <div className="lg:pl-8 h-full">
                <RightSidebarContent />
              </div>
            )}
          </div>

          {/* Mobile Terminal - shown below main content on mobile */}
          {isMobile && (
            <Reveal effect="fold-unfold" delay={1.2}>
              <div className="mt-6">
                <Terminal />
              </div>
            </Reveal>
          )}
        </Reveal>

        <TechSkills />
      </div>
    </Reveal>
  );
};

export default PersonalIntro;
