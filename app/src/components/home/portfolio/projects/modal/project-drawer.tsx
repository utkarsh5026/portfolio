import { memo, useState, useEffect, useCallback, useMemo } from "react";
import type { Project } from "@/types";
import { type ProjectTheme, useProjectTheme } from "../context/ThemeContext";
import {
  OverviewContent,
  ProjectFeatures,
  MediaShowcase,
  Sidebar,
  DemoVideo,
  MobileTabBar,
} from "./components";
import { Drawer, DrawerContent } from "@/components/ui/drawer";
import ProjectDrawerHeader from "./project-drawer-header";
import { useMobileContext } from "@/hooks/use-mobile";

type Tab = "overview" | "features" | "media" | "demo";

interface ProjectModalProps {
  isModalOpen: boolean;
  selectedProject: Project | null;
  closeModal: () => void;
}

const ProjectModal = memo<ProjectModalProps>(function ProjectModal({
  isModalOpen,
  selectedProject,
  closeModal,
}) {
  const [activeTab, setActiveTab] = useState<Tab>("overview");
  const [explainOpen, setExplainOpen] = useState(false);
  const { getProjectTheme } = useProjectTheme();
  const { isMobile } = useMobileContext();

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

  const theme = useMemo(
    () => (selectedProject ? getProjectTheme(selectedProject) : null),
    [selectedProject, getProjectTheme]
  );

  const hasMedia = useMemo(
    () =>
      selectedProject?.media?.gallery &&
      selectedProject.media.gallery.length > 0,
    [selectedProject?.media?.gallery]
  );

  const handleSetActiveTab = useCallback((tab: Tab) => {
    setActiveTab(tab);
  }, []);

  const handleSetExplainOpen = useCallback((open: boolean) => {
    setExplainOpen(open);
  }, []);

  if (!selectedProject || !theme) return null;

  return (
    <Drawer open={isModalOpen} onOpenChange={closeModal}>
      <DrawerContent className="max-h-[95vh] bg-ctp-base border-ctp-surface1/50 z-[99999] w-full">
        {isMobile && <ProjectDrawerHeader selectedProject={selectedProject} />}

        {/* Content Area */}
        <div className="flex h-full flex-col overflow-hidden">
          {/* Mobile Tab Bar */}
          {isMobile && (
            <div className="border-b border-ctp-surface1/20">
              <MobileTabBar
                theme={theme}
                activeTab={activeTab}
                setActiveTab={handleSetActiveTab}
                hasMedia={hasMedia || false}
                hasDemo={true}
              />
            </div>
          )}

          {/* Content Layout */}
          <div className="flex flex-1 overflow-hidden">
            {/* Desktop Sidebar */}
            {!isMobile && (
              <div className="w-80 border-r border-ctp-surface1/20">
                <Sidebar
                  project={selectedProject}
                  theme={theme}
                  activeTab={activeTab}
                  setActiveTab={handleSetActiveTab}
                  explainOpen={explainOpen}
                  setExplainOpen={handleSetExplainOpen}
                  hasMedia={hasMedia || false}
                  hasDemo={true}
                />
              </div>
            )}

            {/* Main Content */}
            <div className="flex-1 overflow-y-auto overscroll-contain">
              <div className={isMobile ? "p-4" : "p-4 sm:p-6 lg:p-8"}>
                <ContentRenderer
                  project={selectedProject}
                  theme={theme}
                  activeTab={activeTab}
                />
              </div>
            </div>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
});

interface ContentRendererProps {
  project: Project;
  activeTab: Tab;
  theme: ProjectTheme;
}

const ContentRenderer = memo<ContentRendererProps>(function ContentRenderer({
  project,
  theme,
  activeTab,
}) {
  switch (activeTab) {
    case "overview":
      return <OverviewContent project={project} theme={theme} />;
    case "features":
      return <ProjectFeatures project={project} theme={theme} />;
    case "media":
      return project.media ? (
        <MediaShowcase media={project.media.gallery || []} theme={theme} />
      ) : null;
    case "demo":
      return <DemoVideo project={project} theme={theme} />;
    default:
      return null;
  }
});

export default ProjectModal;
