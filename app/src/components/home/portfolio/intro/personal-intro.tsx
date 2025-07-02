import React from "react";
import Reveal from "@/components/animations/reveal/Reveal";

import PersonalTitle from "./PersonalTitle";
import ProfileButtons from "./ProfileButtons";
import Terminal from "./Terminal";
import PersonalDescription from "./personal-description";
import TechSkills from "./TechSkills";
import ProfilePicture from "./ProfilePicture";
import { cn } from "@/lib/utils";

/**
 * Enhanced PersonalHeader with cinematic reveal animations
 *
 * This component orchestrates a cinematic entrance sequence using
 * the CinematicReveal component for all child elements.
 */
const PersonalIntro: React.FC = () => {
  return (
    <Reveal
      effect="fade-up"
      duration={0.7}
      className="relative isolate min-h-screen overflow-hidden"
    >
      <div className="absolute inset-0  -z-20">
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
            "backdrop-blur-lg bg-gradient-to-r from-ctp-mantle to-ctp-crust  rounded-2xl",
            "p-6 md:p-10 shadow-2xl mb-10 overflow-hidden"
          )}
        >
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 items-center relative z-10">
            <Reveal
              effect="assemble"
              cascade={true}
              staggerChildren={0.09}
              className="lg:col-span-3 order-2 lg:order-1"
            >
              <Reveal effect="slide-in" direction="left">
                <PersonalTitle />
              </Reveal>

              <Reveal effect="spotlight-in" delay={1}>
                <PersonalDescription />
              </Reveal>

              <Reveal effect="fold-unfold" delay={1}>
                <Terminal />
              </Reveal>

              <Reveal effect="fade-up" delay={0.7}>
                <ProfileButtons />
              </Reveal>
            </Reveal>

            <Reveal
              effect="ripple-in"
              direction="right"
              duration={1}
              delay={0.5}
              className="lg:col-span-2 order-1 lg:order-2 flex justify-center"
            >
              <ProfilePicture />
            </Reveal>
          </div>
        </Reveal>

        <TechSkills />
      </div>
    </Reveal>
  );
};

export default PersonalIntro;
