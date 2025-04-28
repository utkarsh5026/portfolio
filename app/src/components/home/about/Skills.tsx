import React from "react";
import { FaLaptopCode } from "react-icons/fa";
import { skills } from "./data";
import {
  AboutSectionTemplate,
  AboutSectionHeader,
  AboutSectionContent,
} from "./AboutSectionTemplate";
import Reveal from "@/components/animations/reveal/Reveal";
import { Card, CardContent } from "@/components/ui/card";

const Skills: React.FC = () => {
  return (
    <AboutSectionTemplate>
      <AboutSectionHeader
        icon={<FaLaptopCode />}
        title="Core Skills"
        accentColor="red"
      />
      <AboutSectionContent>
        <Card className="bg-[#1e1e2e]/30 border-ctp-surface0 overflow-hidden">
          <div className="h-1 bg-gradient-to-r from-ctp-red/80 to-ctp-peach/50"></div>
          <CardContent className="p-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {skills.map((skill, index) => (
                <Reveal
                  key={skill.category}
                  effect="fade-up"
                  delay={0.1 * index}
                  duration={0.5}
                >
                  <Card className="bg-[#313244]/30 border-ctp-surface0 h-full overflow-hidden group hover:shadow-lg transition-all duration-300">
                    <div className="h-0.5 bg-gradient-to-r from-ctp-peach to-ctp-red opacity-40 group-hover:opacity-70 transition-opacity"></div>
                    <CardContent className="p-4">
                      <div className="font-medium text-[#fab387] mb-2 pb-1 border-b border-[#313244]/50 flex items-center">
                        {skill.category}
                      </div>
                      <ul className="list-disc ml-5 text-sm space-y-1">
                        {skill.skills.map((skillItem, itemIndex) => (
                          <Reveal
                            key={skillItem}
                            effect="fade-up"
                            delay={0.2 + index * 0.05 + itemIndex * 0.03}
                            duration={0.4}
                          >
                            <li className="text-ctp-text">{skillItem}</li>
                          </Reveal>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </Reveal>
              ))}
            </div>
          </CardContent>
        </Card>
      </AboutSectionContent>
    </AboutSectionTemplate>
  );
};

export default Skills;
