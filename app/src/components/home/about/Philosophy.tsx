import React from "react";
import { Brain, Quote, Zap, Target, Heart } from "lucide-react";
import { philosophy } from "./data";
import Reveal from "@/components/animations/reveal/Reveal";

const philosophyIcons = [Target, Zap, Heart];

const philosophyPrinciples = [
  {
    title: "Make it Work",
    description: "Functionality first, ensuring the core requirements are met",
    color: "blue",
    icon: Target,
  },
  {
    title: "Make it Right",
    description: "Clean, maintainable code that follows best practices",
    color: "mauve",
    icon: Brain,
  },
  {
    title: "Make it Fast",
    description: "Optimize for performance and user experience",
    color: "pink",
    icon: Zap,
  },
];
/**
 * 🧠 Development philosophy and principles showcase
 *
 * Shares my approach to development and life through elegant quote cards
 * and principle sections. Shows how I think about writing code and
 * building software. It's my coding wisdom in visual form! 💭⚡
 */
const Philosophy: React.FC = () => {
  return (
    <div className="relative w-full overflow-hidden">
      {/* Background decorative elements - hidden on mobile */}
      <div className="absolute -top-5 -right-5 sm:-top-10 sm:-right-10 w-20 h-20 sm:w-40 sm:h-40 bg-ctp-blue/5 rounded-full blur-2xl sm:blur-3xl hidden sm:block" />
      <div className="absolute -bottom-5 -left-5 sm:-bottom-10 sm:-left-10 w-20 h-20 sm:w-40 sm:h-40 bg-ctp-mauve/5 rounded-full blur-2xl sm:blur-3xl hidden sm:block" />

      <div className="relative bg-gradient-to-br from-ctp-surface0/40 to-ctp-mantle/20 backdrop-blur-sm rounded-2xl sm:rounded-3xl border border-ctp-surface1/30 overflow-hidden w-full">
        {/* Header gradient bar */}
        <div className="h-0.5 sm:h-1 bg-gradient-to-r from-ctp-blue via-ctp-mauve to-ctp-pink" />

        <div className="p-3 sm:p-4 md:p-6 lg:p-8">
          <Reveal effect="fade-up" duration={0.6}>
            <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6 md:mb-8">
              <div className="p-1.5 sm:p-2.5 rounded-lg sm:rounded-xl bg-ctp-blue/10 text-ctp-blue flex-shrink-0">
                <Brain className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>
              <div className="min-w-0 flex-1">
                <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-ctp-text leading-tight">
                  Philosophy
                </h3>
                <p className="text-xs sm:text-sm text-ctp-subtext0">
                  How I approach development & life
                </p>
              </div>
            </div>
          </Reveal>

          {/* Main Philosophy Card */}
          <Reveal effect="fade-up" duration={0.7} delay={0.2}>
            <div className="relative mb-4 sm:mb-6 md:mb-8">
              {/* Quote background decoration - smaller on mobile */}
              <div className="absolute -top-2 -left-2 sm:-top-4 sm:-left-4 text-3xl sm:text-4xl md:text-6xl text-ctp-blue/10 font-serif pointer-events-none">
                "
              </div>
              <div className="absolute -bottom-2 -right-2 sm:-bottom-4 sm:-right-4 text-3xl sm:text-4xl md:text-6xl text-ctp-blue/10 font-serif pointer-events-none rotate-180">
                "
              </div>

              <div className="relative bg-gradient-to-br from-ctp-surface0/50 to-ctp-mantle/30 rounded-xl sm:rounded-2xl border border-ctp-surface1/30 p-3 sm:p-4 md:p-6 lg:p-8 overflow-hidden">
                {/* Subtle background pattern */}
                <div className="absolute inset-0 bg-gradient-to-br from-ctp-blue/5 via-transparent to-ctp-mauve/5" />

                <div className="relative space-y-3 sm:space-y-4 md:space-y-6">
                  {philosophy.map((paragraph, index) => {
                    const Icon = philosophyIcons[index];
                    return (
                      <Reveal
                        key={paragraph}
                        effect="slide-in"
                        direction={index % 2 === 0 ? "left" : "right"}
                        delay={0.3 + index * 0.2}
                        duration={0.7}
                      >
                        <div className="flex gap-2 sm:gap-3 md:gap-4 group w-full overflow-hidden">
                          {/* Philosophy icon */}
                          <div className="flex-shrink-0 mt-0.5 sm:mt-1">
                            <div
                              className={`w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 rounded-lg sm:rounded-xl bg-gradient-to-br ${
                                index === 0
                                  ? "from-ctp-blue/20 to-ctp-sapphire/20"
                                  : index === 1
                                  ? "from-ctp-mauve/20 to-ctp-pink/20"
                                  : "from-ctp-pink/20 to-ctp-red/20"
                              } flex items-center justify-center group-hover:scale-105 transition-transform duration-300`}
                            >
                              <Icon
                                className={`w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 ${
                                  index === 0
                                    ? "text-ctp-blue"
                                    : index === 1
                                    ? "text-ctp-mauve"
                                    : "text-ctp-pink"
                                }`}
                              />
                            </div>
                          </div>

                          {/* Philosophy text */}
                          <div className="flex-1 min-w-0 overflow-hidden">
                            <p className="text-ctp-text leading-relaxed text-xs sm:text-sm md:text-base group-hover:text-ctp-subtext1 transition-colors duration-300 break-words">
                              {paragraph}
                            </p>
                          </div>
                        </div>
                      </Reveal>
                    );
                  })}
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal effect="fade-up" delay={0.8} duration={0.6}>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-3 md:gap-4">
              {philosophyPrinciples.map(
                ({ color, icon: Icon, title, description }) => (
                  <div
                    className={`p-3 sm:p-4 bg-ctp-surface0/20 rounded-lg sm:rounded-xl border border-ctp-surface1/20 text-center group hover:bg-ctp-${color}/5 hover:border-ctp-${color}/30 transition-all duration-300 w-full overflow-hidden`}
                    key={title}
                  >
                    <div
                      className={`w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 mx-auto mb-2 sm:mb-3 rounded-lg sm:rounded-xl bg-ctp-${color}/10 flex items-center justify-center group-hover:bg-ctp-${color}/20 transition-colors duration-300`}
                    >
                      <Icon
                        className={`w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-ctp-${color}`}
                      />
                    </div>
                    <h4
                      className={`font-semibold text-ctp-text mb-1 sm:mb-2 group-hover:text-ctp-${color} transition-colors duration-300 text-sm sm:text-base leading-tight break-words`}
                    >
                      {title}
                    </h4>
                    <p className="text-xs text-ctp-subtext0 leading-relaxed break-words">
                      {description}
                    </p>
                  </div>
                )
              )}
            </div>
          </Reveal>

          <Reveal effect="fade-up" delay={1.0} duration={0.6}>
            <div className="mt-4 sm:mt-6 md:mt-8 p-3 sm:p-4 md:p-6 bg-gradient-to-r from-ctp-surface0/30 via-ctp-mantle/20 to-ctp-surface0/30 rounded-xl sm:rounded-2xl border border-ctp-surface1/30 text-center">
              <Quote className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-ctp-blue mx-auto mb-2 sm:mb-3 opacity-60" />
              <p className="text-ctp-text font-medium italic mb-1 sm:mb-2 text-xs sm:text-sm md:text-base leading-relaxed break-words">
                "If we want users to like our software, we should design it to
                behave like a likable person"
              </p>
              <div className="flex items-center justify-center gap-2 text-ctp-subtext0 text-xs sm:text-sm">
                <span>Alan Cooper</span>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </div>
  );
};

export default Philosophy;
