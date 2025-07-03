import type { Project } from "@/types";
import { List, FileCode, Images, Info, PlayCircle } from "lucide-react";
import type { ProjectTheme } from "@/components/home/portfolio/projects/context/ThemeContext";
import Reveal from "@/components/animations/reveal/Reveal";
import TabButton from "./TabButton";
import SidebarHeader from "./sidebar-header";
import ActionButtons from "./action-buttons";

type Tab = "overview" | "features" | "tech" | "media" | "demo";

interface ProjectSidebarProps {
  project: Project;
  theme: ProjectTheme;
  activeTab: Tab;
  setActiveTab: (tab: Tab) => void;
  explainOpen: boolean;
  setExplainOpen: (open: boolean) => void;
  hasMedia: boolean;
  hasDemo: boolean;
}

const ProjectSidebar: React.FC<ProjectSidebarProps> = ({
  project,
  theme,
  activeTab,
  setActiveTab,
  hasMedia,
  hasDemo,
}) => {
  const { technologies, features, media, githubLink, liveLink } = project;

  const tabs = [
    {
      id: "overview",
      icon: Info,
      label: "Overview",
      count: null,
      isSpecial: false,
    },
    {
      id: "features",
      icon: List,
      label: "Features",
      count: features.length,
      isSpecial: false,
    },
    {
      id: "tech",
      icon: FileCode,
      label: "Tech Stack",
      count: technologies.length,
      isSpecial: false,
    },
    ...(hasDemo
      ? [
          {
            id: "demo",
            icon: PlayCircle,
            label: "Demo Video",
            count: null,
            isSpecial: true, // Mark demo as special for unique styling
          },
        ]
      : []),
    ...(hasMedia
      ? [
          {
            id: "media",
            icon: Images,
            label: "Media Gallery",
            count: media?.gallery?.length ?? null,
            isSpecial: false,
          },
        ]
      : []),
  ];

  return (
    <div className="w-80 min-w-80 bg-ctp-base backdrop-blur-xl border-r border-ctp-surface1/50 flex flex-col overflow-y-auto">
      {/* Project Header */}
      <Reveal className="p-8 border-b border-ctp-surface1/50">
        <SidebarHeader project={project} theme={theme} />
      </Reveal>

      {/* Navigation Tabs */}
      <Reveal className="flex-1 p-6">
        <nav className="space-y-2">
          {tabs.map((tab) => (
            <TabButton
              key={tab.id}
              tab={tab}
              isActive={activeTab === tab.id}
              theme={theme}
              onClick={() => setActiveTab(tab.id as Tab)}
            />
          ))}
        </nav>
      </Reveal>

      <Reveal className="p-6">
        <ActionButtons
          githubLink={githubLink}
          liveLink={liveLink}
          theme={theme}
        />
      </Reveal>
    </div>
  );
};

export default ProjectSidebar;
