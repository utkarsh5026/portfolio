import React, { lazy, useMemo } from "react";
import Explorer from "./left/editor-explorer";
import type { SectionType } from "./context/explorer-context";
import SideBar from "./left/side-bar";
import StatusBar from "./StatusBar";
import CodeContent from "./CodeContent";
import EditorTabs from "./tabs/editor-tabs";
import { OutlineProvider } from "./outline/context/OutlineProvider";
import { useEditorContext } from "./context/explorer-context";
import Terminal from "./terminal/Terminal";
import useMobile from "@/hooks/use-mobile";

const TerminalHeader = lazy(
  () => import("@/components/home/intro/PersonalHeader")
);
const AboutMe = lazy(
  () => import("@/components/home/portfolio/about/about-me")
);
const Skills = lazy(
  () => import("@/components/home/portfolio/skills/skills-section")
);
const Projects = lazy(
  () => import("@/components/home/portfolio/projects/projects-section")
);
const Experience = lazy(
  () => import("@/components/home/portfolio/work/work-experience")
);
const ContactMe = lazy(
  () => import("@/components/home/portfolio/contact/contact-me")
);
const Learning = lazy(
  () => import("@/components/home/portfolio/learning/learning-section")
);
const Articles = lazy(
  () => import("@/components/home/portfolio/articles/articles-section")
);

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
