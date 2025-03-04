import { motion, AnimatePresence } from "framer-motion";
import React, { lazy, useMemo } from "react";
import { cn } from "@/lib/utils";
import { VscError, VscWarning, VscInfo } from "react-icons/vsc";
import { FaTimes, FaBars } from "react-icons/fa";

import Explorer from "./Explorer";
import type { SectionType } from "./context/explorerContext";
import SideBar from "./SideBar";
import StatusBar from "./StatusBar";
import CodeContent from "./CodeContent";
import EditorTabs from "./EditorTabs";
import { OutlineProvider } from "./outline/context/OutlineProvider";
import { useEditorContext } from "./context/explorerContext";

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
  const {
    notifications,
    getNotificationIcon,
    mobileMenuOpen,
    explorerOpen,
    setMobileMenuOpen,
  } = useEditorContext();
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
      <div className="min-h-screen bg-[#1e1e2e] flex flex-col">
        {/* Notifications area */}
        <div className="fixed top-4 right-4 z-50 space-y-2 max-w-xs">
          <AnimatePresence>
            {notifications.map((notification) => (
              <motion.div
                key={notification.id}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: 100 }}
                className={cn(
                  "p-3 rounded-md shadow-lg border text-sm flex items-start gap-2",
                  {
                    "bg-red-900/20 border-red-700/50":
                      notification.type === "error",
                    "bg-amber-900/20 border-amber-700/50":
                      notification.type === "warning",
                    "bg-green-900/20 border-green-700/50":
                      notification.type === "success",
                    "bg-blue-900/20 border-blue-700/50":
                      notification.type === "info",
                  }
                )}
              >
                {getNotificationIcon(notification.type) === "error" && (
                  <VscError className="text-red-500" />
                )}
                {getNotificationIcon(notification.type) === "warning" && (
                  <VscWarning className="text-amber-500" />
                )}
                {getNotificationIcon(notification.type) === "success" && (
                  <VscInfo className="text-green-500" />
                )}
                {getNotificationIcon(notification.type) === "info" && (
                  <VscInfo className="text-blue-500" />
                )}
                <span className="text-[#cdd6f4]">{notification.message}</span>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        <button
          className="fixed top-4 right-4 z-40 md:hidden p-2 rounded-md bg-[#181825] text-[#cdd6f4]"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <FaTimes /> : <FaBars />}
        </button>

        <div className="flex h-screen">
          {/* Left Sidebar */}
          <SideBar />

          {/* Explorer Sidebar (now a separate component) */}
          <Explorer />

          {/* Main Content */}
          <div
            className={cn(
              "flex-1 flex flex-col",
              explorerOpen ? "lg:ml-[14rem]" : "lg:ml-14",
              "md:ml-14 transition-all duration-300"
            )}
          >
            {/* Editor Tabs */}
            <EditorTabs sections={sections} />

            {/* Content Area */}
            <CodeContent sections={sections} />

            <StatusBar />
          </div>
        </div>
      </div>
    </OutlineProvider>
  );
};

export default CodeEditor;
