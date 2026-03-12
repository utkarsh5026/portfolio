import { Brain, Target, Zap } from "lucide-react";
import React from "react";

import Reveal from "@/components/animations/reveal/Reveal";
import IconBox from "@/components/ui/icon-box";
import QuoteBlock from "@/components/ui/quote-block";
import SectionContainer from "@/components/ui/section-container";

import SectionHeader from "./about-header";

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

const Philosophy: React.FC = () => {
  return (
    <SectionContainer>
      <SectionHeader
        icon={Brain}
        color="blue"
        title="Philosophy"
        subtitle="How I approach development & life"
      />

      <Reveal effect="fade-up" delay={0.8} duration={0.6}>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-3 md:gap-4">
          {philosophyPrinciples.map(
            ({ color, icon: Icon, title, description }) => (
              <div
                className={`p-3 sm:p-4 bg-ctp-base rounded-lg sm:rounded-xl text-center group hover:bg-ctp-${color}/5 hover:border-ctp-${color}/30 transition-all duration-300 w-full overflow-hidden`}
                key={title}
              >
                <IconBox
                  color={color}
                  size="md"
                  className={`w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 mx-auto mb-2 sm:mb-3 flex items-center justify-center group-hover:bg-ctp-${color}/20 transition-colors duration-300`}
                >
                  <Icon className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
                </IconBox>
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
        <QuoteBlock
          quote="If we want users to like our software, we should design it to behave like a likable person"
          attribution="Alan Cooper"
          className="mt-4 sm:mt-6 md:mt-8"
        />
      </Reveal>
    </SectionContainer>
  );
};

export default Philosophy;
