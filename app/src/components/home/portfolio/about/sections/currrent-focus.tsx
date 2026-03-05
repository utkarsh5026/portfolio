import {
  Cloud,
  Code,
  Database,
  Globe,
  Rocket,
  Target,
  TrendingUp,
} from "lucide-react";
import React from "react";

import Reveal from "@/components/animations/reveal/Reveal";

import { focusAreas } from "../data/data";
import SectionHeader from "./about-header";

const focusIcons = [Cloud, Database, TrendingUp, Code, Globe];
const focusColors = ["peach", "blue", "green", "mauve", "teal"];

const CurrentFocus: React.FC = () => {
  return (
    <div className="relative w-full overflow-hidden">
      <div className="relative bg-ctp-surface0/10 rounded-2xl sm:rounded-3xl border border-none overflow-hidden w-full">
        <div className="p-3 sm:p-4 md:p-6 lg:p-8">
          <SectionHeader
            icon={Target}
            color="peach"
            title="Current Focus"
            subtitle="What I'm actively learning and improving"
          />

          <Reveal effect="fade-up" duration={0.6} delay={0.1}>
            <div className="mb-4 sm:mb-6 md:mb-8 p-3 sm:p-4 md:p-6 bg-ctp-surface0/20 hover:bg-ctp-surface0/40 rounded-xl sm:rounded-2xl border border-none">
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
                      className={`relative bg-ctp-surface0/20 hover:bg-ctp-surface0/40 rounded-xl sm:rounded-2xl border border-none hover:border-ctp-${color}/30 transition-all duration-300 overflow-hidden p-3 sm:p-4 md:p-6 w-full`}
                    >
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
