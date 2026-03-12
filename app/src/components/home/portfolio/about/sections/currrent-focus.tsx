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
import IconBox from "@/components/ui/icon-box";
import QuoteBlock from "@/components/ui/quote-block";
import SectionContainer from "@/components/ui/section-container";
import { AppColor } from "@/lib/ctp-colors";

import { focusAreas } from "../data/data";
import SectionHeader from "./about-header";

const focusIcons = [Cloud, Database, TrendingUp, Code, Globe];
const focusColors: AppColor[] = ["peach", "blue", "green", "mauve", "teal"];

const CurrentFocus: React.FC = () => {
  return (
    <SectionContainer>
      <SectionHeader
        icon={Target}
        color="peach"
        title="Current Focus"
        subtitle="What I'm actively learning and improving"
      />

      <Reveal effect="fade-up" duration={0.6} delay={0.1}>
        <div className="mb-4 sm:mb-6 md:mb-8 p-3 sm:p-4 md:p-6 bg-ctp-surface0/20 hover:bg-ctp-surface0/40 rounded-xl sm:rounded-2xl overflow-hidden">
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
                  className={`relative bg-ctp-surface0/20 hover:bg-ctp-surface0/40 rounded-xl sm:rounded-2xl hover:border-ctp-${color}/30 transition-all duration-300 overflow-hidden p-3 sm:p-4 md:p-6 w-full`}
                >
                  <div className="relative flex items-start gap-2 sm:gap-3 md:gap-4 w-full overflow-hidden">
                    <IconBox
                      color={color}
                      className={`group-hover:bg-ctp-${color}/20 group-hover:scale-110 transition-all duration-300`}
                    >
                      <Icon className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5" />
                    </IconBox>
                    <div className="flex-1 min-w-0 overflow-hidden">
                      <h4
                        className={`text-sm sm:text-base font-semibold text-ctp-text group-hover:text-ctp-${color} transition-colors duration-300 break-words leading-tight`}
                      >
                        {area}
                      </h4>
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
          );
        })}
      </div>

      <Reveal effect="fade-up" delay={1.0} duration={0.6}>
        <QuoteBlock
          quote="In the beginner's mind, there are many possibilities; in the expert's mind, there are few."
          attribution="Shunryu Suzuki"
        />
      </Reveal>
    </SectionContainer>
  );
};

export default CurrentFocus;
