import { Code,Heart } from "lucide-react";
import React from "react";

import Reveal from "@/components/animations/reveal/Reveal";

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
    <div className="relative w-full overflow-hidden">
      <div className="relative bg-ctp-surface0/10 rounded-2xl sm:rounded-3xl border border-none overflow-hidden w-full">
        <div className="p-3 sm:p-4 md:p-6 lg:p-8">
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
                When I'm not coding, you can find me engaged in various
                activities that keep me balanced and inspired:
              </p>
            </div>
          </Reveal>

          {/* Interest Categories */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 md:gap-8">
            {Object.entries(interests).map(
              ([category, items], categoryIndex) => {
                const categoryConfig =
                  categoryData[category as keyof typeof categoryData];
                const Icon = categoryConfig.icon;

                return (
                  <Reveal
                    key={category}
                    effect="slide-in"
                    direction={categoryIndex % 2 === 0 ? "left" : "right"}
                    delay={0.2 + categoryIndex * 0.1}
                    duration={0.7}
                  >
                    <div className="h-full">
                      <div
                        className={`relative bg-ctp-surface0/20 rounded-xl sm:rounded-2xl border border-none overflow-hidden h-full`}
                      >
                        <div className="p-3 sm:p-4 md:p-6">
                          <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4 md:mb-6">
                            <div
                              className={`p-2 sm:p-2.5 md:p-3 rounded-lg sm:rounded-xl bg-ctp-${categoryConfig.color}/10 text-ctp-${categoryConfig.color} flex-shrink-0`}
                            >
                              <Icon className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5" />
                            </div>
                            <div className="min-w-0 flex-1">
                              <h4
                                className={`text-sm sm:text-base md:text-lg font-bold text-ctp-text group-hover:text-ctp-${categoryConfig.color} transition-colors duration-300 leading-tight break-words`}
                              >
                                {categoryConfig.title}
                              </h4>
                            </div>
                          </div>

                          <div className="space-y-2 sm:space-y-2.5 md:space-y-3">
                            {items.map((item) => {
                              return (
                                <div
                                  key={item}
                                  className="group/item flex items-start gap-2 sm:gap-3 p-2 sm:p-2.5 md:p-3 bg-transparent w-full overflow-hidden"
                                >
                                  <div className="flex-1 min-w-0 overflow-hidden">
                                    <p
                                      className={`text-xs sm:text-sm text-ctp-text leading-relaxed break-words`}
                                    >
                                      {item}
                                    </p>
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      </div>
                    </div>
                  </Reveal>
                );
              }
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Interests;
