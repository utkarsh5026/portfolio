import React from "react";
import { FaBook } from "react-icons/fa";
import { interests } from "./data";
import {
  AboutSectionTemplate,
  AboutSectionHeader,
  AboutSectionContent,
} from "./AboutSectionTemplate";
import Reveal from "@/components/animations/reveal/Reveal";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";

const InterestsHobbies: React.FC = () => {
  return (
    <AboutSectionTemplate>
      <AboutSectionHeader
        icon={<FaBook />}
        title="Interests & Hobbies"
        accentColor="green"
      />
      <AboutSectionContent>
        <div className="space-y-6">
          <Reveal effect="fade-up" duration={0.7}>
            <Alert className="bg-ctp-surface0/30 border-none">
              <AlertDescription className="text-ctp-text">
                When I'm not coding, you can find me engaged in various
                activities that keep me balanced and inspired:
              </AlertDescription>
            </Alert>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            {Object.entries(interests).map(([category, items], index) => (
              <Reveal
                key={category}
                effect="slide-in"
                direction={index % 2 === 0 ? "left" : "right"}
                delay={0.2 * index}
                duration={0.6}
              >
                <Card className="bg-ctp-crust hover:shadow-lg transition-all duration-300 border-none overflow-hidden">
                  <div className="h-1 bg-gradient-to-r from-ctp-green/70 to-ctp-teal/50"></div>
                  <CardHeader className="pb-2">
                    <h4 className="font-medium text-ctp-green text-lg border-b border-ctp-green/30 pb-2">
                      {category
                        .split(/(?=[A-Z])/)
                        .map(
                          (word) => word.charAt(0).toUpperCase() + word.slice(1)
                        )
                        .join(" ")}
                    </h4>
                  </CardHeader>
                  <CardContent>
                    <ul className="list-disc ml-5 space-y-2">
                      {items.map((item, itemIndex) => (
                        <Reveal
                          key={item}
                          effect="fade-through"
                          delay={0.3 + index * 0.1 + itemIndex * 0.05}
                          duration={0.5}
                        >
                          <li className="text-ctp-text">{item}</li>
                        </Reveal>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </Reveal>
            ))}
          </div>

          <Reveal effect="fade-up" delay={0.4} duration={0.7}>
            <Alert className="bg-ctp-surface0/20 border-l-2 border-ctp-green mt-6">
              <AlertDescription className="text-sm italic text-ctp-text">
                I'm always looking to connect with like-minded professionals for
                collaborations and knowledge exchange. Feel free to reach out!
              </AlertDescription>
            </Alert>
          </Reveal>
        </div>
      </AboutSectionContent>
    </AboutSectionTemplate>
  );
};

export default InterestsHobbies;
