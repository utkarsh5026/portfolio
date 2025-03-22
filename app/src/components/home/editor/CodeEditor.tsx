import { motion, AnimatePresence } from "framer-motion";
import React, { lazy, useMemo } from "react";
import { cn } from "@/lib/utils";

import Explorer from "./Explorer";
import type { SectionType } from "./context/explorerContext";
import SideBar from "./SideBar";
import StatusBar from "./StatusBar";
import CodeContent from "./CodeContent";
import EditorTabs from "./tabs/EditorTabs";
import { OutlineProvider } from "./outline/context/OutlineProvider";
import { useEditorContext } from "./context/explorerContext";
import Terminal from "./terminal/Terminal";

const TerminalHeader = lazy(
  () => import("@/components/home/intro/PersonalHeader")
);
const AboutMe = lazy(() => import("@/components/home/about/AboutMe"));
const Skills = lazy(() => import("@/components/home/skills/Skills"));
const Projects = lazy(() => import("@/components/home/projects/Projects"));
const Experience = lazy(() => import("@/components/home/work/WorkExperience"));
const ContactMe = lazy(() => import("@/components/home/contact/ContactMe"));
const Learning = lazy(
  () => import("@/components/home/learning/CurrentLearning")
);
const Articles = lazy(() => import("@/components/home/articles/Articles"));

const CodeEditor: React.FC = () => {
  const { explorerOpen, terminalOpen } = useEditorContext();
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
      <div className="min-h-screen bg-[#1e1e2e] flex">
        <div className="flex h-screen w-screen max-w-screen">
          <SideBar />
          <div className={cn("flex-1 flex")}>
            <AnimatePresence>
              {explorerOpen && (
                <motion.div
                  initial={{ width: 0, opacity: 0 }}
                  animate={{ width: "13rem", opacity: 1 }}
                  exit={{ width: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="h-full"
                >
                  <Explorer />
                </motion.div>
              )}
            </AnimatePresence>
            <div className="flex-1 flex flex-col flex-grow">
              <EditorTabs sections={sections} />
              <CodeContent sections={sections} />
              <StatusBar />
              {terminalOpen && <Terminal />}
            </div>
          </div>
        </div>
      </div>
    </OutlineProvider>
  );
};

export default CodeEditor;
