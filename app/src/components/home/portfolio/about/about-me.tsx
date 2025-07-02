import React from "react";
import Section from "@/components/section/portfolio-section";
import { motion } from "framer-motion";
import { User, Sparkles } from "lucide-react";
import ModernBackground from "./Background";
import ModernEducation from "./my-education";
import ModernSkills from "./Skills";
import ModernPhilosophy from "./Philosophy";
import ModernInterests from "./Intersests";
import ModernCurrentFocus from "./currrent-focus";
import OutlineNode from "../../editor/outline/OutlineNode";
import Reveal from "@/components/animations/reveal/Reveal";

const ABOUT_SECTION = "about";

interface ModernSectionProps {
  id: string;
  component: React.ReactNode;
  delay?: number;
}

const ModernSection: React.FC<ModernSectionProps> = ({
  id,
  component,
  delay = 0,
}) => {
  return (
    <Reveal effect="fade-up" duration={0.6} delay={delay} className="w-full">
      <div className="w-full overflow-hidden">
        <OutlineNode
          id={id}
          label={id.charAt(0).toUpperCase() + id.slice(1).replace("-", " ")}
          level={1}
          parentId={ABOUT_SECTION}
        >
          {component}
        </OutlineNode>
      </div>
    </Reveal>
  );
};

const sections: ModernSectionProps[] = [
  { id: "background", component: <ModernBackground />, delay: 0.1 },
  { id: "education", component: <ModernEducation />, delay: 0.2 },
  { id: "core-skills", component: <ModernSkills />, delay: 0.3 },
  { id: "philosophy", component: <ModernPhilosophy />, delay: 0.4 },
  { id: "interests", component: <ModernInterests />, delay: 0.5 },
  { id: "current-focus", component: <ModernCurrentFocus />, delay: 0.6 },
];

const AboutMe: React.FC = () => {
  return (
    <Section id={ABOUT_SECTION} label="About Me" icon="class">
      <div className="w-full min-h-0 overflow-hidden">
        <div className="w-full max-w-4xl mx-auto px-2 sm:px-4 md:px-6 py-4 sm:py-6 md:py-8 lg:py-12">
          {/* Modern Header */}
          <Reveal effect="fade-up" duration={0.8}>
            <div className="text-center mb-6 sm:mb-8 md:mb-12 lg:mb-16">
              <div className="flex flex-col items-center justify-center gap-2 mb-3 sm:mb-4">
                <motion.div
                  className="p-2 rounded-xl bg-gradient-to-r from-ctp-blue/20 to-ctp-mauve/20 backdrop-blur-sm"
                  whileHover={{ rotate: 5, scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <User className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-ctp-blue" />
                </motion.div>
                <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold bg-gradient-to-r from-ctp-blue via-ctp-mauve to-ctp-blue bg-clip-text text-transparent text-center leading-tight">
                  About Me
                </h2>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="flex flex-col items-center justify-center gap-1 mb-4 sm:mb-6 px-1"
              >
                <div className="flex items-center gap-1 sm:gap-2">
                  <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 text-ctp-yellow" />
                  <p className="text-ctp-subtext0 text-xs sm:text-sm md:text-base lg:text-lg text-center leading-relaxed">
                    Get to know the person behind the code
                  </p>
                  <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 text-ctp-yellow" />
                </div>
              </motion.div>

              {/* Decorative line */}
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="h-px bg-gradient-to-r from-transparent via-ctp-surface2 to-transparent mx-auto w-24 sm:w-32 md:w-48 lg:w-64"
              />
            </div>
          </Reveal>

          {/* Modern Sections Grid */}
          <div className="space-y-4 sm:space-y-6 md:space-y-8 lg:space-y-12 w-full">
            {sections.map((section) => (
              <ModernSection
                key={section.id}
                id={section.id}
                component={section.component}
                delay={section.delay}
              />
            ))}
          </div>

          {/* Footer Call to Action */}
          <Reveal effect="fade-up" duration={0.8} delay={0.7}>
            <motion.div
              className="mt-8 sm:mt-12 md:mt-16 lg:mt-20 text-center"
              whileHover={{ y: -2 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="w-full max-w-sm sm:max-w-md md:max-w-lg mx-auto">
                <div className="flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-2 md:gap-3 px-3 sm:px-4 md:px-6 lg:px-8 py-2 sm:py-3 md:py-4 bg-gradient-to-r from-ctp-surface0/80 to-ctp-surface1/40 backdrop-blur-sm rounded-lg sm:rounded-xl md:rounded-2xl border border-ctp-surface2/50 hover:border-ctp-blue/30 transition-all duration-300">
                  <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-ctp-green animate-pulse" />
                  <span className="text-ctp-text font-medium text-xs sm:text-sm md:text-base text-center leading-tight">
                    Always eager to connect and collaborate
                  </span>
                  <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-ctp-green animate-pulse hidden sm:block" />
                </div>
              </div>
            </motion.div>
          </Reveal>
        </div>
      </div>
    </Section>
  );
};

export default AboutMe;
