import React, { useState } from "react";
import Section from "@/components/section/portfolio-section";
import {
  User,
  ChevronDown,
  BookOpen,
  GraduationCap,
  Code2,
  Brain,
  Heart,
  Target,
  Sparkles,
  ArrowRight,
} from "lucide-react";
import {
  Background,
  MyEducation,
  Skills,
  Philosophy,
  Interests,
  CurrentFocus,
} from "./sections";
import Reveal from "@/components/animations/reveal/Reveal";
import useMobile from "@/hooks/use-mobile";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
  DrawerClose,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { X } from "lucide-react";

const ABOUT_SECTION = "about";

interface SectionData {
  id: string;
  title: string;
  description: string;
  component: React.ReactNode;
  delay?: number;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  gradient: string;
}

const sections: SectionData[] = [
  {
    id: "background",
    title: "My Story",
    description: "Personal journey and background",
    component: <Background />,
    delay: 0.1,
    icon: BookOpen,
    color: "blue",
    gradient: "from-ctp-blue/20 to-ctp-sapphire/20",
  },
  {
    id: "education",
    title: "Education",
    description: "Academic foundation & achievements",
    component: <MyEducation />,
    delay: 0.2,
    icon: GraduationCap,
    color: "sapphire",
    gradient: "from-ctp-sapphire/20 to-ctp-sky/20",
  },
  {
    id: "core-skills",
    title: "Core Skills",
    description: "Technologies I work with daily",
    component: <Skills />,
    delay: 0.3,
    icon: Code2,
    color: "green",
    gradient: "from-ctp-green/20 to-ctp-teal/20",
  },
  {
    id: "philosophy",
    title: "Philosophy",
    description: "How I approach development & life",
    component: <Philosophy />,
    delay: 0.4,
    icon: Brain,
    color: "mauve",
    gradient: "from-ctp-mauve/20 to-ctp-pink/20",
  },
  {
    id: "interests",
    title: "Interests & Hobbies",
    description: "What keeps me curious and motivated",
    component: <Interests />,
    delay: 0.5,
    icon: Heart,
    color: "pink",
    gradient: "from-ctp-pink/20 to-ctp-red/20",
  },
  {
    id: "current-focus",
    title: "Current Focus",
    description: "What I'm actively learning and improving",
    component: <CurrentFocus />,
    delay: 0.6,
    icon: Target,
    color: "peach",
    gradient: "from-ctp-peach/20 to-ctp-yellow/20",
  },
];

interface ResponsiveAboutSectionProps {
  section: SectionData;
  index: number;
  totalSections: number;
}

const ResponsiveAboutSection: React.FC<ResponsiveAboutSectionProps> = ({
  section,
  index,
  totalSections,
}) => {
  const { isMobile } = useMobile();
  const [isOpen, setIsOpen] = useState(index === 0);
  const Icon = section.icon;

  const triggerContent = (
    <div className="relative w-full group">
      {/* Background with gradient */}
      <div
        className={`absolute inset-0 bg-gradient-to-r ${section.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl`}
      />

      {/* Border accent */}
      <div
        className={`absolute inset-0 rounded-xl border border-ctp-surface1/30 group-hover:border-ctp-${section.color}/40 transition-colors duration-300`}
      />

      {/* Main content */}
      <div className="relative flex items-center gap-4 p-4">
        {/* Left section: Icon and progress */}
        <div className="flex items-center gap-3">
          {/* Progress indicator */}
          <div className="flex flex-col items-center gap-1">
            <div
              className={`w-8 h-8 rounded-full bg-gradient-to-br ${section.gradient} border-2 border-ctp-${section.color}/30 group-hover:border-ctp-${section.color}/60 transition-all duration-300 flex items-center justify-center`}
            >
              <Icon className={`w-4 h-4 text-ctp-${section.color}`} />
            </div>
            <div className="text-xs text-ctp-subtext0 font-mono">
              {String(index + 1).padStart(2, "0")}
            </div>
          </div>

          {/* Connector line for desktop */}
          {!isMobile && index < totalSections - 1 && (
            <div className="absolute left-[19px] top-12 w-px h-6 bg-gradient-to-b from-ctp-surface2/50 to-transparent" />
          )}
        </div>

        {/* Center section: Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <h3
              className={`text-lg font-semibold text-ctp-text group-hover:text-ctp-${section.color} transition-colors duration-300`}
            >
              {section.title}
            </h3>
            {isOpen && (
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className={`w-2 h-2 rounded-full bg-ctp-${section.color} animate-pulse`}
              />
            )}
          </div>
          <p className="text-sm text-ctp-subtext0 group-hover:text-ctp-subtext1 transition-colors duration-300">
            {section.description}
          </p>

          {/* Status badge */}
          <div className="mt-2 flex items-center gap-2">
            {isOpen ? (
              <div className="flex items-center gap-1 px-2 py-1 bg-ctp-green/10 text-ctp-green rounded-full text-xs">
                <div className="w-1.5 h-1.5 rounded-full bg-ctp-green animate-pulse" />
                Expanded
              </div>
            ) : (
              <div className="flex items-center gap-1 px-2 py-1 bg-ctp-surface0/50 text-ctp-subtext0 rounded-full text-xs group-hover:bg-ctp-surface1/50 transition-colors duration-300">
                <Sparkles className="w-3 h-3" />
                Click to explore
              </div>
            )}
          </div>
        </div>

        {/* Right section: Action indicator */}
        <div className="flex items-center gap-2">
          {isMobile ? (
            <motion.div
              whileHover={{ x: 2 }}
              className="flex items-center gap-1 text-ctp-subtext0 group-hover:text-ctp-subtext1 transition-colors"
            >
              <span className="text-xs font-medium">View</span>
              <ArrowRight className="w-4 h-4" />
            </motion.div>
          ) : (
            <motion.div
              animate={{ rotate: isOpen ? 180 : 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="flex-shrink-0"
            >
              <ChevronDown
                className={`w-5 h-5 text-ctp-subtext0 group-hover:text-ctp-${section.color} transition-colors duration-300`}
              />
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );

  if (isMobile) {
    return (
      <Reveal effect="fade-up" duration={0.6} delay={section.delay}>
        <Drawer>
          <DrawerTrigger asChild>
            <motion.button
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              className="w-full text-left bg-ctp-surface0/20 backdrop-blur-sm hover:bg-ctp-surface0/40 transition-all duration-300 rounded-xl"
            >
              {triggerContent}
            </motion.button>
          </DrawerTrigger>
          <DrawerContent className="bg-ctp-base border-ctp-surface1">
            <DrawerHeader className="pb-0">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-10 h-10 rounded-xl bg-gradient-to-br ${section.gradient} border border-ctp-${section.color}/30 flex items-center justify-center`}
                  >
                    <Icon className={`w-5 h-5 text-ctp-${section.color}`} />
                  </div>
                  <div>
                    <DrawerTitle
                      className={`text-ctp-${section.color} text-lg`}
                    >
                      {section.title}
                    </DrawerTitle>
                    <p className="text-sm text-ctp-subtext0 mt-1">
                      {section.description}
                    </p>
                  </div>
                </div>
                <DrawerClose asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-ctp-subtext0 hover:text-ctp-text"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </DrawerClose>
              </div>
            </DrawerHeader>
            <div className="px-4 pb-6 max-h-[70vh] overflow-y-auto">
              {section.component}
            </div>
          </DrawerContent>
        </Drawer>
      </Reveal>
    );
  }

  return (
    <Reveal effect="fade-up" duration={0.6} delay={section.delay}>
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <CollapsibleTrigger asChild>
          <motion.button
            whileHover={{ scale: 1.005, y: -1 }}
            whileTap={{ scale: 0.995 }}
            className="w-full text-left bg-ctp-surface0/20 backdrop-blur-sm hover:bg-ctp-surface0/30 transition-all duration-300 rounded-xl shadow-sm hover:shadow-md hover:shadow-ctp-surface0/20"
          >
            {triggerContent}
          </motion.button>
        </CollapsibleTrigger>
        <CollapsibleContent className="data-[state=open]:animate-collapsible-down data-[state=closed]:animate-collapsible-up overflow-hidden">
          <motion.div
            initial={false}
            animate={{ opacity: isOpen ? 1 : 0 }}
            transition={{ duration: 0.3, delay: isOpen ? 0.1 : 0 }}
            className="pt-4 pl-11"
          >
            {section.component}
          </motion.div>
        </CollapsibleContent>
      </Collapsible>
    </Reveal>
  );
};

const AboutMe: React.FC = () => {
  const { isMobile } = useMobile();

  return (
    <Section
      id={ABOUT_SECTION}
      label="About Me"
      title="About Me"
      description="Get to know the person behind the code"
      headerIcon={User}
      icon="class"
      showHeader={true}
    >
      <div className="w-full min-h-0 overflow-hidden">
        <div className="w-full max-w-4xl mx-auto px-4 py-6">
          {/* Introduction */}
          <Reveal effect="fade-up" duration={0.6}>
            <div className="mb-8 text-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-ctp-surface0/20 rounded-full border border-ctp-surface1/30 mb-4">
                <Sparkles className="w-4 h-4 text-ctp-lavender" />
                <span className="text-sm text-ctp-text font-medium">
                  Interactive Journey
                </span>
              </div>
              <p className="text-ctp-subtext0 text-sm leading-relaxed max-w-2xl mx-auto">
                {isMobile
                  ? "Tap any section below to explore my background, skills, and interests in detail."
                  : "Click any section below to expand and explore my background, skills, and interests in detail."}
              </p>
            </div>
          </Reveal>

          {/* Responsive Sections */}
          <div className="space-y-4 relative">
            {sections.map((section, index) => (
              <ResponsiveAboutSection
                key={section.id}
                section={section}
                index={index}
                totalSections={sections.length}
              />
            ))}
          </div>

          {/* Footer Call to Action */}
          <Reveal effect="fade-up" duration={0.8} delay={0.7}>
            <div className="mt-12 text-center">
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="max-w-md mx-auto"
              >
                <div className="flex items-center justify-center gap-3 px-6 py-4 bg-gradient-to-r from-ctp-surface0/40 to-ctp-surface1/20 backdrop-blur-sm rounded-xl border border-ctp-surface2/30 hover:border-ctp-mauve/30 transition-all duration-300 group">
                  <span className="text-ctp-text font-medium text-sm group-hover:text-ctp-mauve transition-colors">
                    Always eager to connect and collaborate
                  </span>
                </div>
              </motion.div>
            </div>
          </Reveal>
        </div>
      </div>
    </Section>
  );
};

export default AboutMe;
