import React from "react";
import Section from "@/components/section/Section";
import { motion } from "framer-motion";
import { User, Sparkles } from "lucide-react";
import ModernBackground from "./Background";
import ModernEducation from "./Education";
import ModernSkills from "./Skills";
import ModernPhilosophy from "./Philosophy";
import ModernInterests from "./Intersests";
import ModernCurrentFocus from "./CurrentFocus";
import OutlineNode from "../editor/outline/OutlineNode";
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
      <OutlineNode
        id={id}
        label={id.charAt(0).toUpperCase() + id.slice(1).replace("-", " ")}
        level={1}
        parentId={ABOUT_SECTION}
      >
        {component}
      </OutlineNode>
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
      <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        {/* Modern Header */}
        <Reveal effect="fade-up" duration={0.8}>
          <div className="text-center mb-12 sm:mb-16">
            <div className="flex items-center justify-center gap-3 mb-4">
              <motion.div
                className="p-3 rounded-2xl bg-gradient-to-r from-ctp-blue/20 to-ctp-mauve/20 backdrop-blur-sm"
                whileHover={{ rotate: 5, scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <User className="w-6 h-6 text-ctp-blue" />
              </motion.div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-ctp-blue via-ctp-mauve to-ctp-blue bg-clip-text text-transparent">
                About Me
              </h2>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="flex items-center justify-center gap-2 mb-6"
            >
              <Sparkles className="w-4 h-4 text-ctp-yellow" />
              <p className="text-ctp-subtext0 text-base sm:text-lg max-w-2xl">
                Get to know the person behind the code
              </p>
              <Sparkles className="w-4 h-4 text-ctp-yellow" />
            </motion.div>

            {/* Decorative line */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="h-px bg-gradient-to-r from-transparent via-ctp-surface2 to-transparent mx-auto max-w-md"
            />
          </div>
        </Reveal>

        {/* Modern Sections Grid */}
        <div className="space-y-8 sm:space-y-12">
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
            className="mt-16 sm:mt-20 text-center"
            whileHover={{ y: -2 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <div className="inline-flex items-center gap-3 px-6 sm:px-8 py-4 bg-gradient-to-r from-ctp-surface0/80 to-ctp-surface1/40 backdrop-blur-sm rounded-2xl border border-ctp-surface2/50 hover:border-ctp-blue/30 transition-all duration-300">
              <div className="w-2 h-2 rounded-full bg-ctp-green animate-pulse" />
              <span className="text-ctp-text font-medium">
                Always eager to connect and collaborate
              </span>
              <div className="w-2 h-2 rounded-full bg-ctp-green animate-pulse" />
            </div>
          </motion.div>
        </Reveal>
      </div>
    </Section>
  );
};

export default AboutMe;
