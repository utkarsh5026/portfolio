import React from "react";
import Reveal from "@/components/animations/reveal/Reveal";
import PersonalTitle from "./personal-title";
import ProfileButtons from "./profile-buttons";
import Terminal from "./statements-terminal";
import PersonalDescription from "./personal-description";
import TechSkills from "./tech-skills";
import ProfilePicture from "./profile-picture";
import { cn } from "@/lib/utils";
import useMobile from "@/hooks/use-mobile";

// Desktop-optimized layout
const DesktopPersonalIntro: React.FC = () => {
  return (
    <>
      {/* Background Effects */}
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
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12 items-start relative z-10">
            {/* Left Column - Main Content (3 columns) */}
            <div className="lg:col-span-3">
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
              </Reveal>
            </div>

            {/* Right Column - Visual Content (2 columns) */}
            <div className="lg:col-span-2 h-full">
              <div className="flex flex-col justify-center h-full gap-8">
                {/* Profile Picture */}
                <Reveal
                  effect="ripple-in"
                  direction="right"
                  duration={1}
                  delay={0.5}
                >
                  <ProfilePicture />
                </Reveal>

                {/* Terminal */}
                <Reveal effect="fold-unfold" delay={1.2}>
                  <Terminal />
                </Reveal>
              </div>
            </div>

            {/* Tech Skills - Full width spanning all columns */}
            <div className="lg:col-span-5 mt-8">
              <Reveal effect="fade-up" delay={1.4}>
                <div className="border-t border-ctp-surface1/20 pt-8">
                  <div className="text-center mb-6">
                    <h3 className="text-xl font-semibold text-ctp-text mb-2">
                      Tech Stack
                    </h3>
                    <p className="text-ctp-subtext1 text-sm">
                      Tools & technologies I work with
                    </p>
                  </div>
                  <TechSkills />
                </div>
              </Reveal>
            </div>
          </div>
        </Reveal>
      </div>
    </>
  );
};

// Mobile-optimized layout
const MobilePersonalIntro: React.FC = () => {
  return (
    <>
      {/* Simplified background for mobile */}
      <div className="absolute inset-0 -z-20">
        <Reveal duration={1.2} delay={0.5}>
          <div
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage: `radial-gradient(circle at 50% 30%, rgba(203, 166, 247, 0.1), transparent 60%)`,
            }}
          />
        </Reveal>
      </div>

      <div className="mx-auto max-w-2xl px-4 py-6">
        <Reveal
          duration={0.8}
          delay={0.1}
          className={cn(
            "relative",
            "bg-transparent rounded-xl",
            "p-4  mb-8 overflow-hidden"
          )}
        >
          {/* Mobile-first vertical layout */}
          <div className="space-y-8">
            {/* Header Section */}
            <div className="text-center space-y-6">
              <Reveal effect="zoom-in" delay={0.3}>
                <div className="inline-block">
                  <ProfilePicture />
                </div>
              </Reveal>

              <Reveal delay={0.5}>
                <PersonalTitle />
              </Reveal>
            </div>

            {/* Description */}
            <Reveal effect="fade-up" delay={0.7}>
              <PersonalDescription />
            </Reveal>

            {/* Action Buttons */}
            <Reveal delay={0.9}>
              <div className="flex justify-center">
                <ProfileButtons />
              </div>
            </Reveal>

            {/* Mobile Terminal - Compact Version */}
            <Reveal delay={1.1}>
              <div className="bg-ctp-surface0/30 rounded-lg p-3 border border-ctp-surface1/20">
                <Terminal />
              </div>
            </Reveal>
          </div>
        </Reveal>

        {/* Tech Skills integrated into mobile layout */}
        <Reveal delay={1.3} className="mt-8">
          <div
            className={cn(
              "backdrop-blur-md bg-gradient-to-b from-ctp-mantle/80 to-ctp-crust/60 rounded-xl",
              "p-4 shadow-xl border-t border-ctp-surface1/20"
            )}
          >
            <div className="text-center mb-4">
              <h3 className="text-lg font-semibold text-ctp-text mb-1">
                Tech Stack
              </h3>
              <p className="text-ctp-subtext1 text-xs">
                Technologies I work with
              </p>
            </div>
            <TechSkills />
          </div>
        </Reveal>
      </div>
    </>
  );
};

/**
 * Enhanced PersonalHeader with separate mobile and desktop optimized layouts
 *
 * This component chooses between completely different structures based on device type,
 * providing optimal experiences for each platform.
 */
const PersonalIntro: React.FC = () => {
  const { isMobile } = useMobile();

  return (
    <Reveal
      effect="fade-up"
      duration={0.7}
      className="relative isolate min-h-screen overflow-hidden"
    >
      {isMobile ? <MobilePersonalIntro /> : <DesktopPersonalIntro />}
    </Reveal>
  );
};

export default PersonalIntro;
