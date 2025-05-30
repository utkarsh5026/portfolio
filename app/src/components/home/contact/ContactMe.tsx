import React from "react";
import Section from "@/components/section/Section";
import Reveal from "@/components/animations/reveal/Reveal";
import { motion } from "framer-motion";
import { FaHandshake, FaEnvelope } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import SocialMediaLinks from "./SocialMediaLinks";
import AvailableForOpportunities from "./AvailableForOpportunities";

const ContactMe: React.FC = () => {
  return (
    <Section id="contact" label="Contact">
      <div className="w-full max-w-6xl mx-auto px-3 sm:px-4 md:px-6 py-6 sm:py-8 md:py-12">
        <Reveal
          effect="fade-up"
          duration={0.8}
          className="text-center mb-6 sm:mb-8 md:mb-12 flex flex-col items-center justify-center"
        >
          <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3 mb-3 sm:mb-4">
            <div className="p-2 sm:p-2.5 md:p-3 rounded-xl sm:rounded-2xl bg-ctp-mauve/20 backdrop-blur-sm flex-shrink-0">
              <FaHandshake className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-ctp-mauve" />
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r from-ctp-mauve via-ctp-pink to-ctp-red bg-clip-text text-transparent text-center break-words leading-tight">
              Let's Work Together
            </h2>
          </div>
          <p className="text-ctp-subtext0 text-sm sm:text-base md:text-lg max-w-3xl mx-auto leading-relaxed text-balance break-words px-2">
            I'm always open to discussing new projects, creative ideas, or
            opportunities to be part of your visions. Feel free to reach out!
          </p>
        </Reveal>

        {/* Email Highlight */}
        <Reveal effect="fade-through" duration={0.9} delay={0.2}>
          <div className="mb-6 sm:mb-8 md:mb-12 bg-ctp-surface0/30 border border-ctp-surface1/30 overflow-hidden backdrop-blur-sm group transition-all duration-500 hover:border-ctp-pink/50 hover:shadow-lg hover:shadow-ctp-pink/20 hover:ring-2 hover:ring-ctp-pink/20 rounded-xl sm:rounded-2xl">
            <div className="p-3 sm:p-4 md:p-6 text-center">
              <p className="text-ctp-subtext0 mb-3 sm:mb-4 text-sm sm:text-base break-words">
                Have a question or want to discuss a project?
              </p>
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button
                  variant="outline"
                  className="bg-ctp-pink/10 text-ctp-pink border-ctp-pink/30 hover:bg-ctp-pink/20 hover:border-ctp-pink/50 hover:text-ctp-pink/80 hover:shadow-ctp-pink/20 hover:shadow-lg hover:scale-105 hover:rotate-1 hover:translate-y-[-2px] px-3 sm:px-4 md:px-6 py-4 sm:py-4 md:py-6 rounded-lg sm:rounded-xl font-medium transition-all duration-300 group-hover:shadow-ctp-pink/30 group-hover:shadow-xl w-full max-w-sm sm:max-w-md mx-auto"
                  onClick={() =>
                    window.open(
                      "mailto:utkarshpriyadarshi5026@gmail.com",
                      "_blank"
                    )
                  }
                >
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-2 min-w-0 w-full">
                    <FaEnvelope className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                    <span className="text-xs sm:text-sm md:text-base font-mono break-all leading-tight min-w-0 text-center sm:text-left">
                      utkarshpriyadarshi5026@gmail.com
                    </span>
                  </div>
                </Button>
              </motion.div>
            </div>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 md:gap-8 lg:gap-12">
          <SocialMediaLinks />
          <AvailableForOpportunities />
        </div>
      </div>
    </Section>
  );
};

export default ContactMe;
