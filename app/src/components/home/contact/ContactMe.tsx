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
      <Reveal
        effect="fade-up"
        duration={0.8}
        className="text-center mb-12 flex flex-col items-center justify-center"
      >
        <div className="flex items-center justify-center gap-3 mb-4">
          <div className="p-3 rounded-2xl bg-ctp-mauve/20 backdrop-blur-sm">
            <FaHandshake className="w-6 h-6 text-ctp-mauve" />
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-ctp-mauve via-ctp-pink to-ctp-red bg-clip-text text-transparent">
            Let's Work Together
          </h2>
        </div>
        <p className="text-ctp-subtext0 text-lg max-w-3xl mx-auto leading-relaxed text-balance break-words">
          I'm always open to discussing new projects, creative ideas, or
          opportunities to be part of your visions. Feel free to reach out!
        </p>
      </Reveal>

      {/* Email Highlight */}
      <Reveal effect="fade-through" duration={0.9} delay={0.2}>
        <div className="mb-12 bg-ctp-surface0/30 border border-ctp-surface1/30 overflow-hidden backdrop-blur-sm group transition-all duration-500 hover:border-ctp-pink/50 hover:shadow-lg hover:shadow-ctp-pink/20 hover:ring-2 hover:ring-ctp-pink/20 rounded-2xl">
          <div className="p-6 text-center">
            <p className="text-ctp-subtext0 mb-4">
              Have a question or want to discuss a project?
            </p>
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button
                variant="outline"
                className="bg-ctp-pink/10 text-ctp-pink border-ctp-pink/30 hover:bg-ctp-pink/20 hover:border-ctp-pink/50 hover:text-ctp-pink/80 hover:shadow-ctp-pink/20 hover:shadow-lg hover:scale-105 hover:rotate-1 hover:translate-y-[-2px] px-6 py-3 rounded-xl font-medium transition-all duration-300 group-hover:shadow-ctp-pink/30 group-hover:shadow-xl"
                onClick={() =>
                  window.open(
                    "mailto:utkarshpriyadarshi5026@gmail.com",
                    "_blank"
                  )
                }
              >
                <FaEnvelope className="w-4 h-4 mr-2" />
                utkarshpriyadarshi5026@gmail.com
              </Button>
            </motion.div>
          </div>
        </div>
      </Reveal>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
        <SocialMediaLinks />
        <AvailableForOpportunities />
      </div>
    </Section>
  );
};

export default ContactMe;
