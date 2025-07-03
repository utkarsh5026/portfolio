import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { Project } from "@/types";
import { type ProjectTheme, useProjectTheme } from "../context/ThemeContext";
import {
  OverviewContent,
  ProjectFeatures,
  TechStack,
  MediaShowcase,
  Sidebar,
  DemoVideo,
  MobileTabBar,
} from "./components";
import { Drawer, DrawerContent } from "@/components/ui/drawer";
import ProjectDrawerHeader from "./project-drawer-header";
import useMobile from "@/hooks/use-mobile";

type Tab = "overview" | "features" | "tech" | "media" | "demo";

/**
 * ProjectModal Component
 *
 * A drawer-based modal component that provides an excellent mobile-first experience:
 * - Uses Shadcn drawer for smooth slide-up animations
 * - Mobile-optimized with pull-to-close functionality
 * - Desktop-friendly with appropriate sizing
 * - Responsive tab navigation
 * - Spring animations for natural feel
 * - Keyboard navigation and accessibility features
 */

interface ProjectModalProps {
  isModalOpen: boolean;
  selectedProject: Project | null;
  closeModal: () => void;
}

const ProjectModal: React.FC<ProjectModalProps> = ({
  isModalOpen,
  selectedProject,
  closeModal,
}) => {
  const [activeTab, setActiveTab] = useState<Tab>("overview");
  const [explainOpen, setExplainOpen] = useState(false);
  const { getProjectTheme } = useProjectTheme();
  const { isMobile } = useMobile();

  useEffect(() => {
    setActiveTab("overview");
    setExplainOpen(false);
  }, [selectedProject]);

  // Handle escape key
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape" && isModalOpen) {
        closeModal();
      }
    };

    if (isModalOpen) {
      document.addEventListener("keydown", handleEscape);
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isModalOpen, closeModal]);

  if (!selectedProject) return null;

  const theme = getProjectTheme(selectedProject);
  const hasMedia =
    selectedProject.media?.gallery &&
    selectedProject.media?.gallery?.length > 0;
  const hasDemo = true;

  return (
    <Drawer open={isModalOpen} onOpenChange={closeModal}>
      <DrawerContent className="max-h-[95vh] bg-ctp-base border-ctp-surface1/50 z-[99999] w-full">
        {isMobile && <ProjectDrawerHeader selectedProject={selectedProject} />}

        {/* Content Area */}
        <div className="flex h-full  flex-col overflow-hidden">
          {/* Mobile Tab Bar */}
          <div className="lg:hidden border-b border-ctp-surface1/20">
            <MobileTabBar
              theme={theme}
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              hasMedia={hasMedia || false}
              hasDemo={hasDemo || false}
            />
          </div>

          {/* Content Layout */}
          <div className="flex flex-1 overflow-hidden">
            {/* Desktop Sidebar */}
            <div className="hidden lg:block w-80 border-r border-ctp-surface1/20">
              <Sidebar
                project={selectedProject}
                theme={theme}
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                explainOpen={explainOpen}
                setExplainOpen={setExplainOpen}
                hasMedia={hasMedia || false}
                hasDemo={hasDemo || false}
              />
            </div>

            {/* Main Content */}
            <div className="flex-1 overflow-y-auto overscroll-contain">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{
                    duration: 0.3,
                    ease: "easeOut",
                  }}
                  className="p-4 sm:p-6 lg:p-8"
                >
                  <ContentRenderer
                    project={selectedProject}
                    theme={theme}
                    activeTab={activeTab}
                  />
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Mobile Pull Indicator Enhancement */}
        <div className="absolute top-2 left-1/2 transform -translate-x-1/2 lg:hidden">
          <motion.div
            className="w-12 h-1 bg-ctp-surface2 rounded-full"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </div>
      </DrawerContent>
    </Drawer>
  );
};

interface ContentRendererProps {
  project: Project;
  activeTab: Tab;
  theme: ProjectTheme;
}

const ContentRenderer: React.FC<ContentRendererProps> = ({
  project,
  theme,
  activeTab,
}) => {
  return (
    <>
      {activeTab === "overview" && (
        <OverviewContent project={project} theme={theme} />
      )}
      {activeTab === "features" && (
        <ProjectFeatures project={project} theme={theme} />
      )}
      {activeTab === "tech" && <TechStack project={project} theme={theme} />}
      {activeTab === "media" && project.media && (
        <MediaShowcase media={project.media.gallery || []} theme={theme} />
      )}
      {activeTab === "demo" && <DemoVideo project={project} theme={theme} />}
    </>
  );
};

export default ProjectModal;
