import React from "react";
import Section from "@/components/section/portfolio-section";
import Reveal from "@/components/animations/reveal/Reveal";
import { motion } from "framer-motion";
import { Heart, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import SocialMediaLinks from "./social-media-links";
import AvailableForOpportunities from "./available-for-opportunities";

const ContactMe: React.FC = () => {
  return (
    <Section
      id="contact"
      label="Contact"
      title="Let's Work Together"
      description="I'm always open to discussing new projects, creative ideas, or opportunities to be part of your visions. Feel free to reach out!"
      headerIcon={Heart}
      showHeader={true}
    >
      <div className="w-full max-w-6xl mx-auto px-3 sm:px-4 md:px-6 py-6 sm:py-8 md:py-12">
        <EmailHighlight />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 md:gap-8 lg:gap-12">
          <SocialMediaLinks />
          <AvailableForOpportunities />
        </div>
      </div>
    </Section>
  );
};

const EmailHighlight = () => {
  return (
    <Reveal effect="fade-through" duration={0.9} delay={0.2}>
      <div className="mb-8 sm:mb-10 md:mb-12 bg-ctp-surface0/30 border border-ctp-surface1/30 overflow-hidden backdrop-blur-sm group transition-all duration-500 hover:border-ctp-pink/50 hover:shadow-lg hover:shadow-ctp-pink/20 hover:ring-2 hover:ring-ctp-pink/20 rounded-xl sm:rounded-2xl">
        <div className="p-6 sm:p-6 md:p-8 text-center">
          <p className="text-ctp-subtext0 mb-6 sm:mb-6 md:mb-8 text-sm sm:text-base break-words">
            Have a question or want to discuss a project?
          </p>
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Button
              variant="outline"
              className="bg-ctp-pink/10 text-ctp-pink border-none hover:bg-ctp-pink/20 hover:border-ctp-pink/50 hover:text-ctp-pink/80 hover:shadow-ctp-pink/20 hover:shadow-lg hover:scale-105 hover:rotate-1 hover:translate-y-[-2px] px-4 sm:px-6 md:px-8 py-6 sm:py-6 md:py-8 rounded-lg sm:rounded-xl font-medium transition-all duration-300 group-hover:shadow-ctp-pink/30 group-hover:shadow-xl w-full max-w-sm sm:max-w-md mx-auto"
              onClick={() =>
                window.open("mailto:utkarshpriyadarshi5026@gmail.com", "_blank")
              }
            >
              <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3 min-w-0 w-full">
                <Mail className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0 hidden sm:block" />
                <span className="text-sm sm:text-base md:text-lg font-mono break-all leading-tight min-w-0 text-center sm:text-left">
                  utkarshpriyadarshi5026@gmail.com
                </span>
              </div>
            </Button>
          </motion.div>
        </div>
      </div>
    </Reveal>
  );
};

export default ContactMe;
