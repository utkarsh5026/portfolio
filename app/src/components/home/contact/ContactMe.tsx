import React from "react";
import Section from "@/components/section/Section";
import { Card, CardContent } from "@/components/ui/card";
import Reveal from "@/components/animations/reveal/Reveal";
import AvailableForOpportunities from "./AvailableForOpportunities";
import SocialMediaLinks from "./SocialMediaLinks";

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
        <Card className="border-none bg-transparent transition-all duration-500 max-w-4xl mx-auto px-4 md:px-8 lg:px-12">
          <CardContent className="p-4 sm:p-6 md:p-8 lg:p-10">
            <div className="text-center space-y-4 sm:space-y-6 md:space-y-8">
              <Reveal effect="zoom-in" duration={0.7} delay={0.1}>
                <h3 className="text-2xl sm:text-2xl md:text-3xl font-bold text-ctp-mauve">
                  Let's Work Together!
                </h3>
              </Reveal>

              <Reveal effect="fade-through" duration={0.9} delay={0.2}>
                <p className="text-sm sm:text-base md:text-lg sm:my-4 md:my-6 lg:my-8 text-ctp-text max-w-2xl mx-auto">
                  I'm always open to discussing new projects, creative ideas, or
                  opportunities to be part of your visions. Feel free to reach
                  out through any of the following channels. If you have any
                  questions, email me at{" "}
                  <span className="inline-block px-2 py-1 my-1 font-medium text-ctp-pink bg-ctp-pink/5 rounded-md border-b-2 border-ctp-pink hover:bg-ctp-pink/10 hover:text-ctp-pink transition-all duration-300 break-words">
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
                <SocialMediaLinks />
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
      </Reveal>
    </Section>
  );
};

export default ContactMe;
