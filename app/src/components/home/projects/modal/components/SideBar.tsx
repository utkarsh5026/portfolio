import { Project } from "@/types";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Code, List, FileCode, Images, ExternalLink, Info } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import { ProjectTheme } from "@/components/home/projects/context/ThemeContext";
import Reveal from "@/components/animations/reveal/Reveal";

type Tab = "overview" | "features" | "tech" | "media";

interface SidebarProps {
  project: Project;
  theme: ProjectTheme;
  activeTab: Tab;
  setActiveTab: (tab: Tab) => void;
  explainOpen: boolean;
  setExplainOpen: (open: boolean) => void;
  hasMedia: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({
  project,
  theme,
  activeTab,
  setActiveTab,
  hasMedia,
}) => {
  const {
    technologies,
    features,
    media,
    name: projectName,
    githubLink,
    liveLink,
  } = project;

  const tabs = [
    { id: "overview", icon: Info, label: "Overview", count: null },
    {
      id: "features",
      icon: List,
      label: "Features",
      count: features.length,
    },
    {
      id: "tech",
      icon: FileCode,
      label: "Tech Stack",
      count: technologies.length,
    },
    ...(hasMedia
      ? [
          {
            id: "media",
            icon: Images,
            label: "Media Gallery",
            count: media?.gallery?.length,
          },
        ]
      : []),
  ];

  return (
    <div className="w-80 min-w-80 bg-black/20 backdrop-blur-xl border-r border-white/10 flex flex-col">
      {/* Project Header */}
      <Reveal className="p-8 border-b border-white/10">
        <div className="flex items-center gap-4 mb-6">
          <div
            className={`w-16 h-16 rounded-2xl bg-gradient-to-br from-ctp-${theme.main} to-ctp-${theme.secondary} flex items-center justify-center shadow-lg`}
          >
            <Code className="w-8 h-8 text-white" />
          </div>
          <div className="flex-1">
            <h1 className="text-xl font-bold text-white break-words leading-tight">
              {projectName}
            </h1>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center">
            <div className="text-xl font-bold text-white">
              {technologies.length}
            </div>
            <div className="text-xs text-white/60">Technologies</div>
          </div>
          <div className="text-center">
            <div className="text-xl font-bold text-white">
              {features.length}
            </div>
            <div className="text-xs text-white/60">Features</div>
          </div>
          <div className="text-center">
            <div className="text-xl font-bold text-white">
              {media?.gallery?.length ?? 0}
            </div>
            <div className="text-xs text-white/60">Media</div>
          </div>
        </div>
      </Reveal>

      {/* Navigation Tabs */}
      <Reveal className="flex-1 p-6">
        <nav className="space-y-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as Tab)}
              className={cn(
                "w-full flex items-center gap-4 p-4 rounded-xl transition-all duration-300 group",
                activeTab === tab.id
                  ? `bg-ctp-${theme.main}/20 border border-ctp-${theme.main}/30 text-ctp-${theme.main}`
                  : "hover:bg-white/5 text-white/70 hover:text-white"
              )}
            >
              <div
                className={cn(
                  "p-2 rounded-lg transition-colors",
                  activeTab === tab.id
                    ? `bg-ctp-${theme.main}/30`
                    : "bg-white/10 group-hover:bg-white/20"
                )}
              >
                <tab.icon className="w-5 h-5" />
              </div>
              <span className="font-medium flex-1 text-left">{tab.label}</span>
              {tab.count && (
                <span
                  className={cn(
                    "text-xs px-2 py-1 rounded-full",
                    activeTab === tab.id
                      ? `bg-ctp-${theme.main}/30 text-ctp-${theme.main}`
                      : "bg-white/10 text-white/60"
                  )}
                >
                  {tab.count}
                </span>
              )}
            </button>
          ))}
        </nav>
      </Reveal>

      {/* Action Buttons */}
      <div className="p-6 border-t border-white/10 space-y-3">
        <motion.button
          onClick={() => window.open(githubLink, "_blank")}
          className={`w-full p-4 rounded-xl bg-gradient-to-r from-ctp-${theme.main}/60 to-ctp-${theme.secondary}/60 text-white font-medium flex items-center justify-center gap-3 hover:shadow-lg transition-all duration-300`}
          whileHover={{ scale: 1.02, y: -2 }}
          whileTap={{ scale: 0.98 }}
          disabled={githubLink === "private-repository"}
        >
          <FaGithub className="w-4 h-4" />
          Go To Repository
        </motion.button>

        <div className="flex gap-3">
          {liveLink && (
            <button
              onClick={() => window.open(liveLink, "_blank")}
              className="flex-1 p-3 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/20 transition-all duration-300 flex items-center justify-center gap-2"
            >
              <ExternalLink className="w-4 h-4" />
              Live
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
