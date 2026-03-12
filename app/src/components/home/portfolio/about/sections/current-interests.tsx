import { Code, Heart } from "lucide-react";
import React from "react";

import Reveal from "@/components/animations/reveal/Reveal";
import IconCard from "@/components/ui/icon-card";
import SectionContainer from "@/components/ui/section-container";

import { interests } from "../data/data";
import SectionHeader from "./about-header";

const categoryData = {
  technical: {
    title: "Technical Interests",
    color: "green",
    icon: Code,
  },
  nonTechnical: {
    title: "Life & Hobbies",
    color: "pink",
    icon: Heart,
  },
} as const;

/**
 * ❤️ Personal interests and hobbies showcase
 *
 * Displays both technical and non-technical interests in beautiful
 * categorized sections. Shows what keeps me curious, motivated, and
 * balanced outside of coding. It's my personality in component form! 🎮☕🎵
 */
const Interests: React.FC = () => {
  return (
    <SectionContainer>
      {/* Section Header */}
      <SectionHeader
        icon={Heart}
        color="green"
        title="Interests & Hobbies"
        subtitle="What keeps me curious and motivated"
      />

      {/* Intro Message */}
      <Reveal effect="fade-up" duration={0.6} delay={0.1}>
        <div className="mb-4 sm:mb-6 md:mb-8 p-3 sm:p-4 bg-transparent">
          <p className="text-ctp-text text-xs sm:text-sm md:text-base leading-relaxed text-center break-words">
            When I'm not coding, you can find me engaged in various activities
            that keep me balanced and inspired:
          </p>
        </div>
      </Reveal>

      {/* Interest Categories */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 md:gap-8">
        {Object.entries(interests).map(([category, items], categoryIndex) => {
          const categoryConfig =
            categoryData[category as keyof typeof categoryData];

          return (
            <Reveal
              key={category}
              effect="slide-in"
              direction={categoryIndex % 2 === 0 ? "left" : "right"}
              delay={0.2 + categoryIndex * 0.1}
              duration={0.7}
            >
              <IconCard
                icon={categoryConfig.icon}
                color={categoryConfig.color}
                title={categoryConfig.title}
              >
                <div className="space-y-2 sm:space-y-2.5 md:space-y-3">
                  {items.map((item) => (
                    <div
                      key={item}
                      className="flex items-start gap-2 sm:gap-3 p-2 sm:p-2.5 md:p-3 w-full overflow-hidden"
                    >
                      <div className="flex-1 min-w-0 overflow-hidden">
                        <p className="text-xs sm:text-sm text-ctp-text leading-relaxed break-words">
                          {item}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </IconCard>
            </Reveal>
          );
        })}
      </div>
    </SectionContainer>
  );
};

export default Interests;
