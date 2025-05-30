import React from "react";
import {
  Target,
  Zap,
  TrendingUp,
  Rocket,
  Database,
  Globe,
  Code,
  Cloud,
} from "lucide-react";
import { focusAreas } from "./data";
import Reveal from "@/components/animations/reveal/Reveal";

const focusIcons = [Cloud, Database, TrendingUp, Code, Globe];
const focusColors = ["peach", "blue", "green", "mauve", "teal"];

const learningPhilosophy = [
  {
    title: "Focused Learning",
    description: "Deep diving into specific areas for expertise",
    color: "peach",
    icon: Target,
  },
  {
    title: "Hands-on Practice",
    description: "Building real projects to solidify knowledge",
    color: "blue",
    icon: Zap,
  },
  {
    title: "Continuous Growth",
    description: "Always evolving with industry trends",
    color: "green",
    icon: TrendingUp,
  },
];

const CurrentFocus: React.FC = () => {
  return (
    <div className="relative w-full overflow-hidden">
      {/* Background decorative elements - hidden on mobile */}
      <div className="absolute -top-4 -right-4 sm:-top-8 sm:-right-8 w-16 h-16 sm:w-32 sm:h-32 bg-ctp-peach/5 rounded-full blur-2xl sm:blur-3xl hidden sm:block" />
      <div className="absolute -bottom-4 -left-4 sm:-bottom-8 sm:-left-8 w-16 h-16 sm:w-32 sm:h-32 bg-ctp-blue/5 rounded-full blur-2xl sm:blur-3xl hidden sm:block" />

      <div className="relative bg-gradient-to-br from-ctp-surface0/40 to-ctp-mantle/20 backdrop-blur-sm rounded-2xl sm:rounded-3xl border border-ctp-surface1/30 overflow-hidden w-full">
        {/* Header gradient bar */}
        <div className="h-0.5 sm:h-1 bg-gradient-to-r from-ctp-peach via-ctp-blue to-ctp-green" />

        <div className="p-3 sm:p-4 md:p-6 lg:p-8">
          {/* Section Header */}
          <Reveal effect="fade-up" duration={0.6}>
            <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6 md:mb-8">
              <div className="p-1.5 sm:p-2.5 rounded-lg sm:rounded-xl bg-ctp-peach/10 text-ctp-peach flex-shrink-0">
                <Target className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>
              <div className="min-w-0 flex-1">
                <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-ctp-text leading-tight">
                  Current Focus
                </h3>
                <p className="text-xs sm:text-sm text-ctp-subtext0">
                  What I'm actively learning and improving
                </p>
              </div>
            </div>
          </Reveal>

          {/* Focus Intro */}
          <Reveal effect="fade-up" duration={0.6} delay={0.1}>
            <div className="mb-4 sm:mb-6 md:mb-8 p-3 sm:p-4 md:p-6 bg-gradient-to-r from-ctp-surface0/30 via-ctp-mantle/20 to-ctp-surface0/30 rounded-xl sm:rounded-2xl border border-ctp-surface1/30">
              <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
                <Rocket className="w-4 h-4 sm:w-5 sm:h-5 text-ctp-peach flex-shrink-0" />
                <span className="text-ctp-text font-semibold text-sm sm:text-base">
                  Growth Mindset
                </span>
              </div>
              <p className="text-ctp-subtext0 text-xs sm:text-sm md:text-base leading-relaxed break-words">
                I'm currently focused on deepening my expertise in emerging
                technologies and best practices that will shape the future of
                development.
              </p>
            </div>
          </Reveal>

          {/* Focus Areas Grid */}
          <div className="space-y-2 sm:space-y-3 md:space-y-4 mb-4 sm:mb-6 md:mb-8">
            {focusAreas.map((area, index) => {
              const Icon = focusIcons[index % focusIcons.length];
              const color = focusColors[index % focusColors.length];

              return (
                <Reveal
                  key={area}
                  effect="slide-in"
                  direction={index % 2 === 0 ? "left" : "right"}
                  delay={0.2 + index * 0.1}
                  duration={0.6}
                >
                  <div className="group w-full">
                    <div
                      className={`relative bg-gradient-to-br from-ctp-surface0/30 to-ctp-mantle/30 rounded-xl sm:rounded-2xl border border-ctp-surface1/30 hover:border-ctp-${color}/30 transition-all duration-300 overflow-hidden p-3 sm:p-4 md:p-6 w-full`}
                    >
                      {/* Subtle background gradient */}
                      <div
                        className={`absolute inset-0 bg-gradient-to-br from-ctp-${color}/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
                      />

                      <div className="relative flex items-start gap-2 sm:gap-3 md:gap-4 w-full overflow-hidden">
                        {/* Focus Icon */}
                        <div
                          className={`flex-shrink-0 p-2 sm:p-2.5 md:p-3 rounded-lg sm:rounded-xl bg-ctp-${color}/10 text-ctp-${color} group-hover:bg-ctp-${color}/20 group-hover:scale-110 transition-all duration-300`}
                        >
                          <Icon className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5" />
                        </div>

                        {/* Focus Content */}
                        <div className="flex-1 min-w-0 overflow-hidden">
                          <div className="flex items-center gap-1 sm:gap-2 mb-1 sm:mb-2">
                            <h4
                              className={`text-sm sm:text-base font-semibold text-ctp-text group-hover:text-ctp-${color} transition-colors duration-300 break-words leading-tight`}
                            >
                              {area}
                            </h4>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>

          {/* Learning Philosophy */}
          <Reveal effect="fade-up" delay={0.8} duration={0.6}>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-3 md:gap-4 mb-4 sm:mb-6 md:mb-8">
              {learningPhilosophy.map(
                ({ color, icon: Icon, title, description }) => {
                  return (
                    <div
                      className={`p-2 sm:p-3 md:p-4 bg-ctp-surface0/20 rounded-lg sm:rounded-xl border border-ctp-surface1/20 text-center group hover:bg-ctp-${color}/5 hover:border-ctp-${color}/30 transition-all duration-300 w-full overflow-hidden`}
                      key={title}
                    >
                      <div
                        className={`w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 mx-auto mb-1 sm:mb-2 md:mb-3 rounded-lg sm:rounded-xl bg-ctp-${color}/10 flex items-center justify-center group-hover:bg-ctp-${color}/20 transition-colors duration-300`}
                      >
                        <Icon
                          className={`w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-ctp-${color}`}
                        />
                      </div>
                      <h4
                        className={`font-semibold text-ctp-text mb-1 sm:mb-2 group-hover:text-ctp-${color} transition-colors duration-300 text-xs sm:text-sm md:text-base leading-tight break-words`}
                      >
                        {title}
                      </h4>
                      <p className="text-xs text-ctp-subtext0 leading-relaxed break-words">
                        {description}
                      </p>
                    </div>
                  );
                }
              )}
            </div>
          </Reveal>

          {/* Current Status */}
          <Reveal effect="fade-up" delay={1.0} duration={0.6}>
            <div className="p-3 sm:p-4 md:p-6 bg-gradient-to-r from-ctp-surface0/30 via-ctp-mantle/20 to-ctp-surface0/30 rounded-xl sm:rounded-2xl border border-ctp-surface1/30">
              <p className="text-center text-xs sm:text-sm text-ctp-subtext0 italic leading-relaxed break-words">
                "In the beginner's mind, there are many possibilities; in the
                expert's mind, there are few. - Shunryu Suzuki"
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </div>
  );
};

export default CurrentFocus;
