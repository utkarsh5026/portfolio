import React, { useMemo } from "react";
import { useEditorContext, type SectionType } from "./context/explorer-context";
import { cn } from "@/lib/utils";
import {
  FaGitAlt,
  FaCode,
  FaNewspaper,
  FaGraduationCap,
  FaEnvelope,
  FaBriefcase,
  FaStar,
  FaUser,
  FaHome,
  FaLaptopCode,
} from "react-icons/fa";
import { VscMarkdown } from "react-icons/vsc";

// Type definitions for status bar configuration
interface StatusConfig {
  fileName: string;
  language: string;
  encoding: string;
  branch: string;
  icon: React.ReactNode;
  lineCount: string;
  fileSize: string;
  status: string;
  statusColor: string;
  branchColor: string;
}

const StatusBarComponent: React.FC = () => {
  const { activeSection, activeProjectId, openTabs } = useEditorContext();

  // Configuration for each section's status bar appearance
  const sectionConfigs: Record<SectionType, StatusConfig> = useMemo(
    () => ({
      home: {
        fileName: "home.md",
        language: "Markdown",
        encoding: "UTF-8",
        branch: "main",
        icon: <FaHome className="w-3 h-3" />,
        lineCount: "125 lines",
        fileSize: "4.2 KB",
        status: "Ready",
        statusColor: "bg-ctp-green",
        branchColor: "text-ctp-green",
      },
      about: {
        fileName: "about.md",
        language: "Markdown",
        encoding: "UTF-8",
        branch: "feature/about",
        icon: <FaUser className="w-3 h-3" />,
        lineCount: "89 lines",
        fileSize: "3.1 KB",
        status: "Modified",
        statusColor: "bg-ctp-yellow",
        branchColor: "text-ctp-blue",
      },
      skills: {
        fileName: "skills.md",
        language: "Markdown",
        encoding: "UTF-8",
        branch: "feature/skills",
        icon: <FaStar className="w-3 h-3" />,
        lineCount: "156 lines",
        fileSize: "2.8 KB",
        status: "Staged",
        statusColor: "bg-ctp-peach",
        branchColor: "text-ctp-yellow",
      },
      projects: {
        fileName: "projects.md",
        language: "Markdown",
        encoding: "UTF-8",
        branch: "feature/projects",
        icon: <FaLaptopCode className="w-3 h-3" />,
        lineCount: "312 lines",
        fileSize: "8.7 KB",
        status: "Clean",
        statusColor: "bg-ctp-green",
        branchColor: "text-ctp-green",
      },
      experience: {
        fileName: "experience.md",
        language: "Markdown",
        encoding: "UTF-8",
        branch: "feature/experience",
        icon: <FaBriefcase className="w-3 h-3" />,
        lineCount: "204 lines",
        fileSize: "5.3 KB",
        status: "Updated",
        statusColor: "bg-ctp-mauve",
        branchColor: "text-ctp-mauve",
      },
      contact: {
        fileName: "contact.md",
        language: "Markdown",
        encoding: "UTF-8",
        branch: "feature/contact",
        icon: <FaEnvelope className="w-3 h-3" />,
        lineCount: "67 lines",
        fileSize: "1.9 KB",
        status: "Ready",
        statusColor: "bg-ctp-green",
        branchColor: "text-ctp-pink",
      },
      learning: {
        fileName: "learning.md",
        language: "Markdown",
        encoding: "UTF-8",
        branch: "feature/learning",
        icon: <FaGraduationCap className="w-3 h-3" />,
        lineCount: "178 lines",
        fileSize: "6.1 KB",
        status: "In Progress",
        statusColor: "bg-ctp-blue",
        branchColor: "text-ctp-sapphire",
      },
      articles: {
        fileName: "articles.md",
        language: "Markdown",
        encoding: "UTF-8",
        branch: "feature/articles",
        icon: <FaNewspaper className="w-3 h-3" />,
        lineCount: "243 lines",
        fileSize: "7.4 KB",
        status: "Published",
        statusColor: "bg-ctp-teal",
        branchColor: "text-ctp-teal",
      },
    }),
    []
  );

  // Derive current config — project file takes precedence
  const currentConfig: StatusConfig = useMemo(() => {
    if (activeProjectId !== null) {
      const tab = openTabs.find(
        (t) => t.type === "project" && t.id === activeProjectId
      );
      const slug = tab?.fileName ?? `${activeProjectId}.md`;
      return {
        fileName: slug,
        language: "Markdown",
        encoding: "UTF-8",
        branch: `projects/${slug.replace(".md", "")}`,
        icon: <VscMarkdown className="w-3 h-3" />,
        lineCount: "—",
        fileSize: "—",
        status: "Clean",
        statusColor: "bg-ctp-green",
        branchColor: "text-ctp-green",
      };
    }
    return sectionConfigs[activeSection];
  }, [activeProjectId, openTabs, activeSection, sectionConfigs]);

  return (
    <div className="bg-ctp-base border-t border-ctp-surface0 text-ctp-text text-xs flex items-center justify-between min-h-[28px] px-2 md:px-4 py-1">
      {/* Left Section - Git and File Info */}
      <div className="flex items-center gap-2 md:gap-4 flex-1 min-w-0">
        {/* Git Branch */}
        <div className="flex items-center gap-1 flex-shrink-0">
          <FaGitAlt className="w-3 h-3 text-ctp-peach" />
          <span className={cn("font-medium", currentConfig.branchColor)}>
            {currentConfig.branch}
          </span>
        </div>

        {/* File Info - Hidden on very small screens */}
        <div className="hidden sm:flex items-center gap-1 flex-shrink-0">
          {currentConfig.icon}
          <span className="text-ctp-subtext0 truncate">
            {currentConfig.fileName}
          </span>
        </div>

        {/* Language */}
        <div className="flex items-center gap-1 flex-shrink-0">
          <FaCode className="w-3 h-3 text-ctp-lavender" />
          <span className="text-ctp-subtext0 truncate">
            {currentConfig.language}
          </span>
        </div>

        {/* Encoding - Hidden on mobile */}
        <span className="hidden md:inline text-ctp-subtext1 flex-shrink-0">
          {currentConfig.encoding}
        </span>
      </div>

      {/* Right Section - File Stats and Status */}
      <div className="flex items-center gap-2 md:gap-4 flex-shrink-0">
        {/* File Stats - Hidden on very small screens */}
        <div className="hidden md:flex items-center gap-3 text-ctp-subtext1">
          <span>{currentConfig.lineCount}</span>
          <span>{currentConfig.fileSize}</span>
        </div>

        {/* Status Indicator */}
        <div className="flex items-center gap-1.5">
          <span
            className={cn(
              "w-2 h-2 rounded-full flex-shrink-0",
              currentConfig.statusColor
            )}
          />
          <span className="text-ctp-subtext0 font-medium">
            {currentConfig.status}
          </span>
        </div>

        {/* Version - Hidden on mobile */}
        <span className="hidden lg:inline text-ctp-subtext1 flex-shrink-0">
          v1.0.0
        </span>
      </div>
    </div>
  );
};

const StatusBar = React.memo(StatusBarComponent);
export default StatusBar;
