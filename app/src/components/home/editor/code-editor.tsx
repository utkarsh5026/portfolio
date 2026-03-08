import React, { lazy } from "react";

import useMobile from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";

import EditorBreadcrumbs from "./breadcrumbs/editor-breadcrumbs";
import CodeContent from "./code-content";
import type { SectionType } from "./context/explorer-context";
import { useEditorContext } from "./context/explorer-context";
import GitBlameManager from "./git-blame/git-blame-manager";
import Explorer from "./left/editor-explorer";
import SideBar from "./left/side-bar";
import MobileSwipeHint from "./mobile-swipe-hint";
import StatusBar from "./status-bar";
import EditorTabs from "./tabs/editor-tabs";
import Terminal from "./terminal/Terminal";

const sectionComponents: Record<
  SectionType,
  React.LazyExoticComponent<React.ComponentType>
> = {
  home: lazy(() => import("@/components/home/portfolio/intro/personal-intro")),
  about: lazy(() => import("@/components/home/portfolio/about/about-me")),
  skills: lazy(
    () => import("@/components/home/portfolio/skills/skills-section")
  ),
  projects: lazy(
    () => import("@/components/home/portfolio/projects/projects-section")
  ),
  experience: lazy(
    () => import("@/components/home/portfolio/work/work-experience")
  ),
  contact: lazy(() => import("@/components/home/portfolio/contact/contact-me")),
  learning: lazy(
    () => import("@/components/home/portfolio/learning/learning-section")
  ),
  articles: lazy(
    () => import("@/components/home/portfolio/articles/articles-section")
  ),
  resume: lazy(
    () => import("@/components/home/portfolio/resume/resume-section")
  ),
};

/**
 * CodeEditor component represents the main editor interface of the application
 * It manages the layout and interactions between the sidebar, explorer, tabs, and content areas
 * Uses lazy loading for content components to improve performance
 * Implements responsive design for mobile optimization
 */
const CodeEditor: React.FC = () => {
  const { explorerOpen, terminalOpen } = useEditorContext();
  const { isMobile } = useMobile();

  return (
    <div className="min-h-screen bg-ctp-base flex">
      <div
        className={cn(
          "flex h-screen w-screen max-w-screen overflow-hidden",
          !isMobile && "ml-14"
        )}
      >
        {!isMobile && <SideBar />}
        {!isMobile && explorerOpen && <Explorer />}
        <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
          <GitBlameManager />
          <EditorTabs sections={sectionComponents} />
          <EditorBreadcrumbs />
          <CodeContent sections={sectionComponents} />
          <StatusBar />
          {terminalOpen && <Terminal />}
          <MobileSwipeHint />
        </div>
      </div>
    </div>
  );
};

export default CodeEditor;
