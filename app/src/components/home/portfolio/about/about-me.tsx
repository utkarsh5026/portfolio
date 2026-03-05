import { motion } from "framer-motion";
import {
  BookOpen,
  Brain,
  Code2,
  GraduationCap,
  Heart,
  Target,
  User,
} from "lucide-react";
import React, { lazy, Suspense,useState } from "react";

import Reveal from "@/components/animations/reveal/Reveal";
import Section from "@/components/section/portfolio-section";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import useMobile from "@/hooks/use-mobile";

import AboutSectionCard from "./about-section-card";

// Lazy load section components for better mobile performance
const Background = lazy(() => import("./sections/my-background"));
const MyEducation = lazy(() => import("./sections/my-education"));
const Skills = lazy(() => import("./sections/skills-display"));
const Philosophy = lazy(() => import("./sections/my-philosophy"));
const Interests = lazy(() => import("./sections/current-interests"));
const CurrentFocus = lazy(() => import("./sections/currrent-focus"));

const ABOUT_SECTION = "about";

// Loading fallback for lazy components
const SectionLoader: React.FC = () => (
  <div className="flex items-center justify-center p-8">
    <div className="w-6 h-6 border-2 border-ctp-blue border-t-transparent rounded-full animate-spin" />
  </div>
);

interface SectionData {
  id: string;
  title: string;
  description: string;
  Component: React.LazyExoticComponent<React.FC>;
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
    Component: Background,
    delay: 0.1,
    icon: BookOpen,
    color: "blue",
    gradient: "from-ctp-blue/20 to-ctp-sapphire/20",
  },
  {
    id: "education",
    title: "Education",
    description: "Academic foundation & achievements",
    Component: MyEducation,
    delay: 0.2,
    icon: GraduationCap,
    color: "sapphire",
    gradient: "from-ctp-sapphire/20 to-ctp-sky/20",
  },
  {
    id: "core-skills",
    title: "Core Skills",
    description: "Technologies I work with daily",
    Component: Skills,
    delay: 0.3,
    icon: Code2,
    color: "green",
    gradient: "from-ctp-green/20 to-ctp-teal/20",
  },
  {
    id: "philosophy",
    title: "Philosophy",
    description: "How I approach development & life",
    Component: Philosophy,
    delay: 0.4,
    icon: Brain,
    color: "mauve",
    gradient: "from-ctp-mauve/20 to-ctp-pink/20",
  },
  {
    id: "interests",
    title: "Interests & Hobbies",
    description: "What keeps me curious and motivated",
    Component: Interests,
    delay: 0.5,
    icon: Heart,
    color: "pink",
    gradient: "from-ctp-pink/20 to-ctp-red/20",
  },
  {
    id: "current-focus",
    title: "Current Focus",
    description: "What I'm actively learning and improving",
    Component: CurrentFocus,
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

  if (isMobile) {
    return (
      <MobileAboutSection
        section={section}
        index={index}
        isOpen={isOpen}
        totalSections={totalSections}
      />
    );
  }

  return (
    <DesktopAboutSection
      section={section}
      index={index}
      isMobile={isMobile}
      totalSections={totalSections}
      isOpen={isOpen}
      setIsOpen={setIsOpen}
    />
  );
};

interface MobileAboutSectionProps {
  section: SectionData;
  index: number;
  isOpen: boolean;
  totalSections: number;
}

const MobileAboutSection: React.FC<MobileAboutSectionProps> = ({
  section,
  index,
  isOpen,
  totalSections,
}) => {
  const SectionComponent = section.Component;

  return (
    <div className="w-full">
      <Drawer>
        <DrawerTrigger asChild>
          <button className="w-full text-left bg-ctp-surface0/20 hover:bg-ctp-surface0/40 transition-all duration-300 rounded-xl">
            <AboutSectionCard
              section={section}
              index={index}
              totalSections={totalSections}
              isMobile={true}
              isOpen={isOpen}
            />
          </button>
        </DrawerTrigger>
        <DrawerContent className="bg-ctp-mantle border-none z-[99999]">
          <div className="py-8 max-h-[90vh] h-[90vh] overflow-y-auto">
            <Suspense fallback={<SectionLoader />}>
              <SectionComponent />
            </Suspense>
          </div>
        </DrawerContent>
      </Drawer>
    </div>
  );
};

interface DesktopAboutSectionProps {
  section: SectionData;
  index: number;
  isMobile: boolean;
  totalSections: number;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const DesktopAboutSection: React.FC<DesktopAboutSectionProps> = ({
  section,
  index,
  isMobile,
  totalSections,
  isOpen,
  setIsOpen,
}) => {
  const SectionComponent = section.Component;

  return (
    <Reveal effect="fade-up" duration={0.6} delay={section.delay}>
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <CollapsibleTrigger asChild>
          <button className="w-full text-left bg-ctp-surface0/20 hover:bg-ctp-surface0/30 transition-all duration-300 rounded-xl shadow-sm hover:shadow-md hover:shadow-ctp-surface0/20">
            <AboutSectionCard
              section={section}
              index={index}
              totalSections={totalSections}
              isMobile={isMobile}
              isOpen={isOpen}
            />
          </button>
        </CollapsibleTrigger>
        <CollapsibleContent className="data-[state=open]:animate-collapsible-down data-[state=closed]:animate-collapsible-up overflow-hidden">
          <motion.div
            initial={false}
            animate={{ opacity: isOpen ? 1 : 0 }}
            transition={{ duration: 0.3, delay: isOpen ? 0.1 : 0 }}
            className="pt-4 pl-11"
          >
            <Suspense fallback={<SectionLoader />}>
              <SectionComponent />
            </Suspense>
          </motion.div>
        </CollapsibleContent>
      </Collapsible>
    </Reveal>
  );
};

const AboutMe: React.FC = () => {
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
              <div className="max-w-md mx-auto">
                <div className="flex items-center justify-center gap-3 px-6 py-4 bg-gradient-to-r from-ctp-peach/40 to-ctp-yellow/50 rounded-xl border-none hover:border-ctp-mauve/30 transition-all duration-300 group">
                  <span className="text-ctp-text text-sm group-hover:text-ctp-text transition-colors italic font-bold">
                    Always eager to connect and collaborate
                  </span>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </Section>
  );
};

export default AboutMe;
