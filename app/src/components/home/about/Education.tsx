import React from "react";
import { FaGraduationCap } from "react-icons/fa";
import { education } from "./data";
import {
  AboutSectionTemplate,
  AboutSectionHeader,
  AboutSectionContent,
} from "./AboutSectionTemplate";
import Reveal from "@/components/animations/reveal/Reveal";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const Education: React.FC = () => {
  return (
    <AboutSectionTemplate>
      <AboutSectionHeader
        icon={<FaGraduationCap />}
        title="Education"
        accentColor="blue"
      />
      <AboutSectionContent>
        <div className="space-y-6">
          {education.map((item, index) => (
            <Reveal
              key={item.degree}
              effect="slide-in"
              direction="left"
              delay={0.1 * index}
              duration={0.6}
            >
              <Card className="bg-[#313244]/30 hover:shadow-lg transition-all duration-300 border-ctp-surface0">
                <CardContent className="p-4">
                  <div className="font-medium text-[#89b4fa] text-lg">
                    {item.degree}
                  </div>
                  <div className="text-sm text-[#bac2de] flex flex-col sm:flex-row sm:justify-between mt-2 pb-3 border-b border-[#313244]/80">
                    <span className="mb-2 sm:mb-0">
                      <a
                        href={item.institutionUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-[#89b4fa] transition-colors cursor-pointer hover:underline flex items-center"
                      >
                        <span className="mr-1 opacity-10">🏫</span>{" "}
                        {item.institution}
                      </a>
                    </span>
                    <Badge
                      variant="outline"
                      className="self-start sm:self-auto bg-[#313244]/70 text-[#89b4fa] border-[#89b4fa]/20"
                    >
                      <span className="mr-1 opacity-30">🗓️</span>{" "}
                      {item.duration}
                    </Badge>
                  </div>
                  <ul className="list-disc ml-5 mt-3 text-sm space-y-2">
                    {item.highlights.map((highlight, hIndex) => (
                      <Reveal
                        key={highlight}
                        effect="fade-up"
                        delay={0.3 + index * 0.1 + hIndex * 0.05}
                        duration={0.4}
                      >
                        <li className="text-ctp-text">{highlight}</li>
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

export default Education;
