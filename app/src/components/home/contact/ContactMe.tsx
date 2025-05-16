import React from "react";
import Section from "@/components/section/Section";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MdEmail } from "react-icons/md";
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";
import OutlineNode from "../editor/outline/OutlineNode";
import Reveal from "@/components/animations/reveal/Reveal";
import { RevealEffect } from "@/components/animations/reveal/effects";
import AvailableForOpportunities from "./AvailableForOpportunities";

const socialLinks = [
  {
    name: "Email",
    icon: <MdEmail className="w-6 h-6" />,
    href: "mailto:utkarshpriyadarshi5026@gmail.com",
    color: "hover:text-ctp-blue",
    outlineIcon: <MdEmail className="w-3 h-3 text-ctp-blue" />,
    revealEffect: "slide-in",
    direction: "up" as const,
  },
  {
    name: "GitHub",
    icon: <FaGithub className="w-6 h-6" />,
    href: "https://github.com/utkarsh5026",
    color: "hover:text-ctp-mauve",
    outlineIcon: <FaGithub className="w-3 h-3 text-ctp-mauve" />,
    revealEffect: "slide-in",
    direction: "up" as const,
  },
  {
    name: "LinkedIn",
    icon: <FaLinkedin className="w-6 h-6" />,
    href: "https://www.linkedin.com/in/utkarsh-priyadarshi-8b5a731b9/",
    color: "hover:text-ctp-sapphire",
    outlineIcon: <FaLinkedin className="w-3 h-3 text-ctp-sapphire" />,
    revealEffect: "slide-in",
    direction: "up" as const,
  },
  {
    name: "Twitter",
    icon: <FaTwitter className="w-6 h-6" />,
    href: "https://x.com/UtkarshPriyad10",
    color: "hover:text-ctp-sky",
    outlineIcon: <FaTwitter className="w-3 h-3 text-ctp-sky" />,
    revealEffect: "slide-in",
    direction: "up" as const,
  },
];

/**
 * ContactMe component displays contact information and social links.
 * Enhanced with reveal animations for a more dynamic and engaging user experience.
 * This component is optimized for both desktop and mobile views.
 *
 * @returns {JSX.Element} The rendered ContactMe component.
 */
const ContactMe: React.FC = () => {
  return (
    <Section id="contact" label="Contact" scanlines={true}>
      <Reveal effect="fade-up" duration={0.8}>
        <div className="max-w-4xl mx-auto px-4 md:px-8 lg:px-12">
          <Card className="border-none bg-transparent transition-all duration-500">
            <CardContent className="p-4 sm:p-6 md:p-8 lg:p-10">
              <div className="text-center space-y-4 sm:space-y-6 md:space-y-8">
                <Reveal effect="zoom-in" duration={0.7} delay={0.1}>
                  <h3 className="text-2xl sm:text-2xl md:text-3xl font-bold text-ctp-mauve">
                    Let's Work Together!
                  </h3>
                </Reveal>

                <Reveal effect="fade-through" duration={0.9} delay={0.2}>
                  <p className="text-sm sm:text-base md:text-lg sm:my-4 md:my-6 lg:my-8 text-ctp-text max-w-2xl mx-auto">
                    I'm always open to discussing new projects, creative ideas,
                    or opportunities to be part of your visions. Feel free to
                    reach out through any of the following channels. If you have
                    any questions, email me at{" "}
                    <span className="border-b-2 border-ctp-pink hover:border-ctp-pink/50 transition-all duration-300 break-all">
                      utkarshpriyadarshi5026@gmail.com
                    </span>
                  </p>
                </Reveal>

                <Reveal
                  effect="cascade"
                  duration={0.5}
                  delay={0.3}
                  staggerChildren={0.1}
                  className="flex flex-col sm:flex-row flex-wrap justify-center gap-2 sm:gap-3 md:gap-4 mt-4 sm:mt-6 md:mt-8"
                >
                  {socialLinks.map((link, index) => (
                    <OutlineNode
                      key={link.name}
                      id={link.name}
                      label={link.name}
                      level={1}
                      parentId="contact"
                      icon={link.outlineIcon}
                    >
                      <Reveal
                        effect={link.revealEffect as RevealEffect}
                        direction={link.direction}
                        duration={0.6}
                        delay={0.4 + index * 0.1}
                        threshold={0.1}
                      >
                        <Button
                          variant="ghost"
                          size="default"
                          className={`w-full sm:w-[calc(50%-0.5rem)] md:w-auto px-4 py-3 rounded-lg group relative overflow-hidden transition-all duration-300 ${link.color} hover:bg-ctp-base`}
                          onClick={() => window.open(link.href, "_blank")}
                        >
                          <div className="relative flex items-center justify-center gap-3 text-ctp-text">
                            <span className="text-xl">{link.icon}</span>
                            <span className="font-medium">{link.name}</span>
                          </div>
                        </Button>
                      </Reveal>
                    </OutlineNode>
                  ))}
                </Reveal>

                <Reveal
                  effect="emerge"
                  duration={0.8}
                  delay={0.7}
                  threshold={0.1}
                >
                  <AvailableForOpportunities />
                </Reveal>
              </div>
            </CardContent>
          </Card>
        </div>
      </Reveal>
    </Section>
  );
};

export default ContactMe;
