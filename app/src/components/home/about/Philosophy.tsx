import React from "react";
import { FaBrain } from "react-icons/fa";
import { philosophy } from "./data";
import {
  AboutSectionTemplate,
  AboutSectionHeader,
  AboutSectionContent,
  AboutCard,
} from "./AboutSectionTemplate";
import Reveal from "@/components/animations/reveal/Reveal";

const Philosophy: React.FC = () => {
  return (
    <AboutSectionTemplate>
      <AboutSectionHeader
        icon={<FaBrain />}
        title="Philosophy"
        accentColor="blue"
      />
      <AboutSectionContent>
        <AboutCard className="bg-gradient-to-br from-[#1e1e2e]/80 to-[#313244]/30 border-l-2 border-ctp-red/30 relative overflow-hidden">
          {/* Subtle background decoration */}
          <div className="absolute -right-16 -top-16 w-32 h-32 bg-ctp-red/5 rounded-full blur-xl"></div>
          <div className="absolute -left-16 -bottom-16 w-32 h-32 bg-ctp-blue/5 rounded-full blur-xl"></div>

          <div className="relative">
            <div className="absolute -left-8 top-0 text-ctp-red opacity-40 text-4xl font-serif">
              "
            </div>
            <div className="space-y-4 py-2">
              {philosophy.map((item, index) => (
                <Reveal
                  key={index}
                  effect="fade-through"
                  delay={0.2 * index}
                  duration={0.7}
                >
                  <p className="pl-2 text-ctp-text leading-relaxed">{item}</p>
                </Reveal>
              ))}
            </div>
            <div className="absolute -right-2 bottom-0 text-ctp-red opacity-40 text-4xl font-serif">
              "
            </div>
          </div>
        </AboutCard>
      </AboutSectionContent>
    </AboutSectionTemplate>
  );
};

export default Philosophy;
