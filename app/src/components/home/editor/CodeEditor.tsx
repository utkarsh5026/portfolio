import React, { lazy, useMemo } from "react";
import Explorer from "./left/Explorer";
import type { SectionType } from "./context/explorerContext";
import SideBar from "./left/SideBar";
import StatusBar from "./StatusBar";
import CodeContent from "./CodeContent";
import EditorTabs from "./tabs/EditorTabs";
import { OutlineProvider } from "./outline/context/OutlineProvider";
import { useEditorContext } from "./context/explorerContext";
import Terminal from "./terminal/Terminal";
import useMobile from "@/hooks/use-mobile";

const TerminalHeader = lazy(
  () => import("@/components/home/intro/PersonalHeader")
);
const AboutMe = lazy(() => import("@/components/home/about/AboutMe"));
const Skills = lazy(() => import("@/components/home/skills/skills-section"));
const Projects = lazy(() => import("@/components/home/projects/Projects"));
const Experience = lazy(() => import("@/components/home/work/WorkExperience"));
const ContactMe = lazy(() => import("@/components/home/contact/ContactMe"));
const Learning = lazy(
  () => import("@/components/home/learning/CurrentLearning")
);
const Articles = lazy(() => import("@/components/home/articles/Articles"));

/**
 * CodeEditor component represents the main editor interface of the application
 * It manages the layout and interactions between the sidebar, explorer, tabs, and content areas
 * Uses lazy loading for content components to improve performance
 * Implements responsive design for mobile optimization
 */
const CodeEditor: React.FC = () => {
  const { explorerOpen, terminalOpen } = useEditorContext();
  const { isMobile } = useMobile();

  // Create a mapping of all section components
  const sections: Record<SectionType, React.ReactNode> = useMemo(
    () => ({
      home: <TerminalHeader />,
      about: <AboutMe />,
      skills: <Skills />,
      projects: <Projects />,
      experience: <Experience />,
      contact: <ContactMe />,
      learning: <Learning />,
      articles: <Articles />,
    }),
    []
  );

  return (
    <OutlineProvider>
      <div className="min-h-screen bg-ctp-base flex">
        <div className="flex h-screen w-screen max-w-screen overflow-hidden">
          {!isMobile && <SideBar />}
          {!isMobile && explorerOpen && <Explorer />}
          <div className="flex-1 flex flex-col flex-grow">
            <EditorTabs sections={sections} />
            <CodeContent sections={sections} />
            <StatusBar />
            {terminalOpen && <Terminal />}
          </div>
        </div>
      </div>
    </OutlineProvider>
  );
};

export default CodeEditor;
