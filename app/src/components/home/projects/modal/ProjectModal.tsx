import React, { useState, useEffect, useRef } from "react";
import { Project } from "@/types";
import DialogModal from "@/components/utils/DialogModal";
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
import Reveal from "@/components/animations/reveal/Reveal";

type Tab = "overview" | "features" | "tech" | "media" | "demo";

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

  useEffect(() => setActiveTab("overview"), [selectedProject]);

  if (!selectedProject) return null;

  const theme = getProjectTheme(selectedProject);
  const hasMedia =
    selectedProject.media?.gallery &&
    selectedProject.media?.gallery?.length > 0;
  const hasDemo = true;

  return (
    <DialogModal isOpen={isModalOpen} handleChange={closeModal}>
      <Reveal className="inset-0 z-[9999999] flex items-center justify-center overflow-hidden w-full h-full p-2 sm:p-4">
        <div
          ref={modalRef}
          className="relative w-full h-full sm:w-[95vw] sm:max-w-6xl sm:h-[90vh] rounded-none sm:rounded-3xl overflow-hidden shadow-2xl backdrop-blur-xl border-0 sm:border sm:border-white/10"
          style={{
            transform: "perspective(1000px)",
          }}
        >
          {/* Mobile Header - Only visible on small screens */}
          <div className="sm:hidden flex items-center justify-between p-4 border-b border-white/10 bg-black/20 backdrop-blur-sm">
            <div className="flex items-center gap-3 min-w-0 flex-1">
              <div
                className={`p-2 rounded-lg bg-ctp-${theme.main}/20 flex-shrink-0`}
              >
                <div className={`w-5 h-5 text-ctp-${theme.main}`}>
                  {/* Project icon placeholder */}
                  <div className="w-full h-full bg-current opacity-70 rounded-sm" />
                </div>
              </div>
              <div className="min-w-0 flex-1">
                <h2 className="text-xl font-bold text-white truncate">
                  {selectedProject.name}
                </h2>
                <p className="text-sm text-white/60 truncate">
                  Project Details
                </p>
              </div>
            </div>
          </div>

          {/* Main Content Layout */}
          <div className="flex h-full flex-col sm:flex-row overflow-hidden">
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
        </div>
      </Reveal>
    </DialogModal>
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
    <div className="flex-1 overflow-hidden relative">
      <div className="h-full overflow-y-auto overscroll-contain custom-scrollbar">
        <div className="p-4 sm:p-6 lg:p-8">
          {activeTab === "overview" && (
            <OverviewContent key="overview" project={project} theme={theme} />
          )}
          {activeTab === "features" && (
            <FeaturesContent key="features" project={project} theme={theme} />
          )}
          {activeTab === "tech" && (
            <TechStack key="tech" project={project} theme={theme} />
          )}
          {activeTab === "media" && project.media && (
            <MediaShowcase
              key="media"
              media={project.media.gallery || []}
              theme={theme}
            />
          )}
          {activeTab === "demo" && (
            <DemoVideo key="demo" project={project} theme={theme} />
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectModal;
