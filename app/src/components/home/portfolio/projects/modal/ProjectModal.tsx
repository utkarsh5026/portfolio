import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Lock } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import { ExternalLink } from "lucide-react";
import { Project } from "@/types";
import { type ProjectTheme, useProjectTheme } from "../context/ThemeContext";
import {
  OverviewContent,
  FeaturesContent,
  TechStack,
  MediaShowcase,
  Sidebar,
  DemoVideo,
  MobileTabBar,
} from "./components";
import { Button } from "@/components/ui/button";

type Tab = "overview" | "features" | "tech" | "media" | "demo";

/**
 * ProjectModal Component
 *
 * A modal component that follows the WhatDoIKnow modal pattern with:
 * - Direct AnimatePresence implementation (no DialogModal wrapper)
 * - Simplified header without title/description duplication
 * - Mobile-optimized action buttons for GitHub/Live links
 * - Responsive design with mobile-first approach
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
  const modalRef = useRef<HTMLDivElement>(null);

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
      // Prevent body scroll when modal is open
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isModalOpen, closeModal]);

  if (!selectedProject || !isModalOpen) return null;

  const theme = getProjectTheme(selectedProject);
  const hasMedia =
    selectedProject.media?.gallery &&
    selectedProject.media?.gallery?.length > 0;
  const hasDemo = true;

  return (
    <AnimatePresence>
      {isModalOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-2 sm:p-4"
          onClick={closeModal}
        >
          <motion.div
            ref={modalRef}
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-7xl max-h-[95vh] sm:max-h-[90vh] bg-ctp-base rounded-2xl sm:rounded-3xl border border-ctp-surface1/50 shadow-2xl overflow-y-auto overscroll-contain custom-scrollbar"
          >
            {/* Simplified Header */}
            <div className="relative p-3 sm:p-4 border-b border-ctp-surface1/50">
              <div className="flex items-center justify-between gap-2">
                {/* Mobile: Project indicator with action buttons */}
                <div className="flex sm:hidden items-center gap-2 min-w-0 flex-1">
                  <motion.div
                    className={`p-1.5 rounded-lg bg-ctp-${theme.main}/20 flex-shrink-0`}
                    whileHover={{ scale: 1.1 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <div className={`w-4 h-4 text-ctp-${theme.main}`}>
                      <div className="w-full h-full bg-current opacity-70 rounded-sm" />
                    </div>
                  </motion.div>
                  <div className="min-w-0 flex-1">
                    <h2 className="text-sm font-semibold text-ctp-text truncate">
                      {selectedProject.name}
                    </h2>
                  </div>

                  {/* Mobile Action Buttons */}
                  <div className="flex items-center gap-2 flex-shrink-0">
                    {selectedProject.githubLink && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() =>
                          window.open(selectedProject.githubLink, "_blank")
                        }
                        disabled={
                          selectedProject.githubLink === "private-repository"
                        }
                        className={`flex items-center gap-1 px-2 py-1 rounded-lg bg-ctp-${theme.main}/20 hover:bg-ctp-${theme.main}/30 text-ctp-${theme.main} transition-all duration-200 text-xs font-medium disabled:opacity-50`}
                      >
                        {selectedProject.githubLink === "private-repository" ? (
                          <Lock className="w-3 h-3" />
                        ) : (
                          <FaGithub className="w-3 h-3" />
                        )}
                        {selectedProject.githubLink === "private-repository"
                          ? "Private"
                          : "Code"}
                      </Button>
                    )}
                    {selectedProject.liveLink && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() =>
                          window.open(selectedProject.liveLink, "_blank")
                        }
                        className={`flex items-center gap-1 px-2 py-1 rounded-lg bg-ctp-${theme.secondary}/20 hover:bg-ctp-${theme.secondary}/30 text-ctp-${theme.secondary} transition-all duration-200 text-xs font-medium`}
                      >
                        <ExternalLink className="w-3 h-3" />
                        Live
                      </Button>
                    )}
                  </div>
                </div>

                {/* Desktop: Just project indicator */}
                <div className="hidden sm:flex items-center gap-3 min-w-0 flex-1">
                  <motion.div
                    className={`p-2 rounded-xl bg-ctp-${theme.main}/20 flex-shrink-0`}
                    whileHover={{ rotate: 10 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <div className={`w-5 h-5 text-ctp-${theme.main}`}>
                      <div className="w-full h-full bg-current opacity-70 rounded-sm" />
                    </div>
                  </motion.div>
                  <div className="min-w-0 flex-1">
                    <h2 className="text-lg font-bold text-ctp-text truncate">
                      {selectedProject.name}
                    </h2>
                  </div>
                </div>

                <Button
                  variant="ghost"
                  size="icon"
                  onClick={closeModal}
                  className="p-1.5 sm:p-2 rounded-lg sm:rounded-xl bg-ctp-surface0/50 hover:bg-ctp-surface1/50 text-ctp-subtext0 hover:text-ctp-text transition-all duration-200 flex-shrink-0"
                >
                  <X className="w-4 h-4 sm:w-5 sm:h-5" />
                </Button>
              </div>
            </div>

            {/* Content */}
            <div className="flex h-full max-h-[calc(95vh-80px)] sm:max-h-[calc(90vh-90px)] flex-col sm:flex-row overflow-y-auto overscroll-contain custom-scrollbar">
              {/* Mobile: Tab bar at the top */}
              <div className="sm:hidden">
                <MobileTabBar
                  theme={theme}
                  activeTab={activeTab}
                  setActiveTab={setActiveTab}
                  hasMedia={hasMedia || false}
                  hasDemo={hasDemo || false}
                />
              </div>

              {/* Desktop: Traditional sidebar */}
              <div className="hidden sm:block">
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

              {/* Content Area */}
              <RightContent
                project={selectedProject}
                theme={theme}
                activeTab={activeTab}
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

interface RightContentProps {
  project: Project;
  activeTab: Tab;
  theme: ProjectTheme;
}

const RightContent: React.FC<RightContentProps> = ({
  project,
  theme,
  activeTab,
}) => {
  return (
    <div className="flex-1 overflow-y-auto overscroll-contain custom-scrollbar relative">
      <div className="h-full overflow-y-auto overscroll-contain">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="p-4 sm:p-6 lg:p-8"
          >
            {activeTab === "overview" && (
              <OverviewContent project={project} theme={theme} />
            )}
            {activeTab === "features" && (
              <FeaturesContent project={project} theme={theme} />
            )}
            {activeTab === "tech" && (
              <TechStack project={project} theme={theme} />
            )}
            {activeTab === "media" && project.media && (
              <MediaShowcase
                media={project.media.gallery || []}
                theme={theme}
              />
            )}
            {activeTab === "demo" && (
              <DemoVideo project={project} theme={theme} />
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default ProjectModal;
