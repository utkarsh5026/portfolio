import React from "react";
import { GiBullseye } from "react-icons/gi";
import { focusAreas } from "./data";
import {
  AboutSectionTemplate,
  AboutSectionHeader,
  AboutSectionContent,
} from "./AboutSectionTemplate";
import Reveal from "@/components/animations/reveal/Reveal";
import { Card, CardContent } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";

const CurrentFocus: React.FC = () => {
  return (
    <AboutSectionTemplate>
      <AboutSectionHeader
        icon={<GiBullseye />}
        title="Current Focus"
        accentColor="pink"
      />
      <AboutSectionContent>
        <div className="space-y-6">
          <Reveal effect="fade-up" duration={0.7}>
            <Alert className="bg-ctp-surface0/30 border-none">
              <AlertDescription className="text-ctp-text">
                I'm currently focused on deepening my expertise in:
              </AlertDescription>
            </Alert>
          </Reveal>

          <Card className="bg-ctp-base border-none overflow-hidden">
            <div className="h-1 bg-gradient-to-r from-ctp-pink/80 to-ctp-mauve/50"></div>
            <CardContent className="p-5">
              <ul className="space-y-4 mt-2">
                {focusAreas.map((area, index) => (
                  <Reveal
                    key={area}
                    effect="fade-through"
                    delay={0.2 + index * 0.1}
                    duration={0.6}
                  >
                    <li className="flex items-start gap-3 group items-center">
                      <div className="bg-ctp-surface0 p-2 rounded-md relative mt-1 group-hover:bg-ctp-pink/10 transition-colors">
                        <div className="absolute inset-0 bg-ctp-pink/10 rounded-md opacity-0 group-hover:opacity-100 transition-opacity"></div>
                        <GiBullseye className="w-4 h-4 text-ctp-pink relative" />
                      </div>
                      <span className="text-ctp-text">{area}</span>
                    </li>
                  </Reveal>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Reveal effect="fade-up" delay={0.5} duration={0.7}>
            <Alert className="bg-ctp-surface0/20 border-none">
              <AlertDescription className="text-sm font-mono text-ctp-pink">
                I am learning this to improve my skills and become a better
                developer 😊.
              </AlertDescription>
            </Alert>
          </Reveal>
        </div>
      </AboutSectionContent>
    </AboutSectionTemplate>
  );
};

export default CurrentFocus;
