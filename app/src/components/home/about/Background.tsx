import React from "react";
import { FaCode } from "react-icons/fa";
import { background } from "./data";
import {
  AboutSectionTemplate,
  AboutSectionHeader,
  AboutSectionContent,
  AboutCard,
} from "./AboutSectionTemplate";
import Reveal from "@/components/animations/reveal/Reveal";

const Background: React.FC = () => {
  return (
    <AboutSectionTemplate>
      <AboutSectionHeader
        icon={<FaCode />}
        title="Background"
        accentColor="red"
      />
      <AboutSectionContent>
        <AboutCard className="border-l-2 border-ctp-red/50">
          <div className="space-y-4">
            {background.map((paragraph, index) => (
              <Reveal
                key={paragraph}
                effect="fade-up"
                delay={0.2 + index * 0.1}
                duration={0.5}
              >
                <p className="text-ctp-text">{paragraph}</p>
              </Reveal>
            ))}
          </div>
        </AboutCard>
      </AboutSectionContent>
    </AboutSectionTemplate>
  );
};

export default Background;
