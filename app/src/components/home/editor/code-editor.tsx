import React, { lazy, useMemo } from "react";

import useMobile from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";

import EditorBreadcrumbs from "./breadcrumbs/editor-breadcrumbs";
import CodeContent from "./code-content";
import type { SectionType } from "./context/explorer-context";
import { useEditorContext } from "./context/explorer-context";
import { MarkdownHeadingProvider } from "./context/markdown-heading-context";
import Explorer from "./left/editor-explorer";
import SideBar from "./left/side-bar";
import { OutlineProvider } from "./outline";
import StatusBar from "./status-bar";
import EditorTabs from "./tabs/editor-tabs";
import Terminal from "./terminal/Terminal";

const TerminalHeader = lazy(
  () => import("@/components/home/portfolio/intro/personal-intro"),
);
const AboutMe = lazy(
  () => import("@/components/home/portfolio/about/about-me"),
);
const Skills = lazy(
  () => import("@/components/home/portfolio/skills/skills-section"),
);
const Projects = lazy(
  () => import("@/components/home/portfolio/projects/projects-section"),
);
const Experience = lazy(
  () => import("@/components/home/portfolio/work/work-experience"),
);
const ContactMe = lazy(
  () => import("@/components/home/portfolio/contact/contact-me"),
);
const Learning = lazy(
  () => import("@/components/home/portfolio/learning/learning-section"),
);
const Articles = lazy(
  () => import("@/components/home/portfolio/articles/articles-section"),
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
    [],
  );

  return (
    <OutlineProvider>
      <MarkdownHeadingProvider>
        <div className="min-h-screen bg-ctp-base flex">
          <div
            className={cn(
              "flex h-screen w-screen max-w-screen overflow-hidden",
              !isMobile && "ml-14",
            )}
          >
            {!isMobile && <SideBar />}
            {!isMobile && explorerOpen && <Explorer />}
            <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
              <EditorTabs sections={sections} />
              <EditorBreadcrumbs />
              <CodeContent sections={sections} />
              <StatusBar />
              {terminalOpen && <Terminal />}
            </div>
          </div>
        </div>
      </MarkdownHeadingProvider>
    </OutlineProvider>
  );
};

export default CodeEditor;
