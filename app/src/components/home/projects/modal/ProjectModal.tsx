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
} from "./components";
import Reveal from "@/components/animations/reveal/Reveal";

type Tab = "overview" | "features" | "tech" | "media";

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
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const { getProjectTheme } = useProjectTheme();
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (modalRef.current) {
        const rect = modalRef.current.getBoundingClientRect();
        setMousePosition({
          x: ((e.clientX - rect.left) / rect.width) * 100,
          y: ((e.clientY - rect.top) / rect.height) * 100,
        });
      }
    };

    if (isModalOpen) {
      document.addEventListener("mousemove", handleMouseMove);
    }

    return () => document.removeEventListener("mousemove", handleMouseMove);
  }, [isModalOpen]);

  useEffect(() => setActiveTab("overview"), [selectedProject]);

  if (!selectedProject) return null;

  const theme = getProjectTheme(selectedProject);
  const hasMedia =
    selectedProject.media?.gallery &&
    selectedProject.media?.gallery?.length > 0;

  const backgroundPattern = `
    radial-gradient(circle at ${mousePosition.x}% ${
    mousePosition.y
  }%, var(--ctp-${theme.main})/20 0%, transparent 50%),
    radial-gradient(circle at ${100 - mousePosition.x}% ${
    100 - mousePosition.y
  }%, var(--ctp-${theme.secondary})/15 0%, transparent 50%),
    linear-gradient(135deg, var(--ctp-base)/95 0%, var(--ctp-mantle)/98 100%)
  `;

  return (
    <DialogModal isOpen={isModalOpen} handleChange={closeModal}>
      <Reveal className=" inset-0 z-[9999999] flex items-center justify-center p-4 overflow-hidden w-full h-full ">
        <div
          ref={modalRef}
          className="relative w-[95vw] max-w-7xl h-[90vh] rounded-3xl overflow-hidden shadow-2xl backdrop-blur-xl border border-white/10"
          style={{
            background: backgroundPattern,
            transform: "perspective(1000px)",
          }}
        >
          {/* Main Content Layout */}
          <div className="flex h-full">
            <Sidebar
              project={selectedProject}
              theme={theme}
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              explainOpen={explainOpen}
              setExplainOpen={setExplainOpen}
              hasMedia={hasMedia || false}
            />

            {/* Right Content Area */}
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
      <div className="h-full overflow-y-auto custom-scrollbar">
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
      </div>
    </div>
  );
};

export default ProjectModal;
