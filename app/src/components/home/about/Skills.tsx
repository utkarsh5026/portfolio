import React from "react";
import {
  FaCloud,
  FaLaptopCode,
  FaServer,
  FaTools,
  FaReact,
} from "react-icons/fa";
import { skills } from "./data";
import {
  AboutSectionTemplate,
  AboutSectionHeader,
  AboutSectionContent,
} from "./AboutSectionTemplate";
import Reveal from "@/components/animations/reveal/Reveal";
import { Card, CardContent } from "@/components/ui/card";

const categoryIconMap: Record<
  (typeof skills)[number]["category"],
  React.ReactNode
> = {
  Frontend: <FaReact />,
  Backend: <FaServer />,
  "DevOps & Cloud": <FaCloud />,
  "Tools & Others": <FaTools />,
};

const Skills: React.FC = () => {
  return (
    <AboutSectionTemplate>
      <AboutSectionHeader
        icon={<FaLaptopCode />}
        title="Core Skills"
        accentColor="red"
      />
      <AboutSectionContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {skills.map((skill, index) => (
            <Reveal
              key={skill.category}
              effect="fade-up"
              delay={0.1 * index}
              duration={0.5}
            >
              <Card className="bg-ctp-base border-none h-full overflow-hidden group hover:shadow-lg transition-all duration-300">
                <CardContent className="p-4">
                  <div className="font-medium text-ctp-peach mb-2 pb-1 border-b border-[#313244]/50 flex items-center gap-2">
                    {categoryIconMap[skill.category]}
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
      </AboutSectionContent>
    </AboutSectionTemplate>
  );
};

export default Skills;
