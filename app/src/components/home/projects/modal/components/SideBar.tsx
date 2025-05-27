import { Project } from "@/types";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import {
  Code,
  List,
  FileCode,
  Images,
  Brain,
  ExternalLink,
  Info,
} from "lucide-react";
import { FaGithub } from "react-icons/fa";
import { ProjectTheme } from "@/components/home/projects/context/ThemeContext";

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
  setExplainOpen,
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
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.1 }}
        className="p-8 border-b border-white/10"
      >
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
      </motion.div>

      {/* Navigation Tabs */}
      <div className="flex-1 p-6">
        <nav className="space-y-2">
          {tabs.map((tab) => (
            <motion.button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as Tab)}
              className={cn(
                "w-full flex items-center gap-4 p-4 rounded-xl transition-all duration-300 group",
                activeTab === tab.id
                  ? `bg-ctp-${theme.main}/20 border border-ctp-${theme.main}/30 text-ctp-${theme.main}`
                  : "hover:bg-white/5 text-white/70 hover:text-white"
              )}
              whileHover={{ x: 4 }}
              whileTap={{ scale: 0.98 }}
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
            </motion.button>
          ))}
        </nav>
      </div>

      {/* Action Buttons */}
      <div className="p-6 border-t border-white/10 space-y-3">
        <motion.button
          onClick={() => setExplainOpen(true)}
          className={`w-full p-4 rounded-xl bg-gradient-to-r from-ctp-${theme.main} to-ctp-${theme.secondary} text-white font-medium flex items-center justify-center gap-3 hover:shadow-lg transition-all duration-300`}
          whileHover={{ scale: 1.02, y: -2 }}
          whileTap={{ scale: 0.98 }}
        >
          <Brain className="w-5 h-5" />
          Explain It To Me
        </motion.button>

        <div className="flex gap-3">
          {githubLink !== "private-repository" && (
            <motion.button
              onClick={() => window.open(githubLink, "_blank")}
              className="flex-1 p-3 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/20 transition-all duration-300 flex items-center justify-center gap-2"
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              <FaGithub className="w-4 h-4" />
              Code
            </motion.button>
          )}
          {liveLink && (
            <motion.button
              onClick={() => window.open(liveLink, "_blank")}
              className="flex-1 p-3 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/20 transition-all duration-300 flex items-center justify-center gap-2"
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              <ExternalLink className="w-4 h-4" />
              Live
            </motion.button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
