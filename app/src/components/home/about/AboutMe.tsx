import React from "react";
import Section from "@/components/section/Section";
import {
  FaLaptopCode,
  FaBook,
  FaCode,
  FaGraduationCap,
  FaBrain,
} from "react-icons/fa";
import { GiBullseye } from "react-icons/gi";
import Background from "./Background";
import Education from "./Education";
import OutlineNode from "../editor/outline/OutlineNode";
import Skills from "./Skills";
import Philosophy from "./Philosophy";
import InterestsHobbies from "./Intersests";
import CurrentFocus from "./CurrentFocus";
import Reveal from "@/components/animations/reveal/Reveal";

const ABOUT_SECTION = "about";

interface AboutMeSectionProps {
  label: string;
  icon: React.ReactNode;
  content: React.ReactNode;
  iconColor: string;
  id: string;
}

/**
 * AboutMeSection component displays a section in the About Me page
 * It wraps content in an OutlineNode for navigation and organization
 */
const AboutMeSection: React.FC<AboutMeSectionProps> = ({
  label,
  icon,
  content,
  iconColor,
  id,
}) => {
  return (
    <OutlineNode
      label={label}
      id={id}
      level={1}
      parentId={ABOUT_SECTION}
      icon={React.cloneElement(icon as React.ReactElement, {
        className: `w-3 h-3 text-ctp-${iconColor}`,
      })}
    >
      {content}
    </OutlineNode>
  );
};

/**
 * AboutMe component is the main component for the About Me page
 * It organizes multiple sections in a editor-like interface
 */
const AboutMe: React.FC = () => {
  // Define all sections with their properties for consistency
  const sections: AboutMeSectionProps[] = [
    {
      id: "background",
      label: "Background",
      icon: <FaCode />,
      iconColor: "blue",
      content: <Background />,
    },
    {
      id: "education",
      label: "Education",
      icon: <FaGraduationCap />,
      iconColor: "blue",
      content: <Education />,
    },
    {
      id: "skills",
      label: "Skills",
      icon: <FaLaptopCode />,
      iconColor: "red",
      content: <Skills />,
    },
    {
      id: "philosophy",
      label: "Philosophy",
      icon: <FaBrain />,
      iconColor: "blue",
      content: <Philosophy />,
    },
    {
      id: "interests",
      label: "Interests & Hobbies",
      icon: <FaBook />,
      iconColor: "green",
      content: <InterestsHobbies />,
    },
    {
      id: "current-focus",
      label: "Current Focus",
      icon: <GiBullseye />,
      iconColor: "pink",
      content: <CurrentFocus />,
    },
  ];

  return (
    <Section id={ABOUT_SECTION} label="About Me" icon="class">
      <div className="max-w-5xl mx-auto">
        <Reveal effect="fade-up" duration={0.7}>
          <div className="overflow-hidden relative">
            {/* Main content */}
            <div className="p-6 relative">
              <div className="space-y-8 pl-8 flex flex-col gap-6">
                {sections.map((section, index) => (
                  <Reveal
                    key={section.id}
                    effect="fade-up"
                    delay={0.2 + index * 0.1}
                    duration={0.5}
                  >
                    <AboutMeSection
                      id={section.id}
                      label={section.label}
                      icon={section.icon}
                      iconColor={section.iconColor}
                      content={section.content}
                    />
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </Section>
  );
};

export default AboutMe;
