import React, { useMemo } from "react";
import { useEditorContext, type SectionType } from "./context/explorerContext";
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

/**
 * StatusBarComponent renders a dynamic status bar that changes based on the current section.
 *
 * Key Features:
 * - Dynamic content based on active section
 * - Mobile-optimized responsive design
 * - Section-specific file information
 * - Git branch simulation per section
 * - Clean, VS Code-inspired interface
 *
 * The component uses the editor context to determine the current section and displays
 * relevant file information, language types, and section-specific metadata.
 */
const StatusBarComponent: React.FC = () => {
  const { activeSection } = useEditorContext();

  // Configuration for each section's status bar appearance
  const sectionConfigs: Record<SectionType, StatusConfig> = useMemo(
    () => ({
      home: {
        fileName: "home.tsx",
        language: "TypeScript React",
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
        fileName: "skills.json",
        language: "JSON",
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
        fileName: "projects.jsx",
        language: "JavaScript React",
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
        fileName: "experience.log",
        language: "Log File",
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
        fileName: "contact.ts",
        language: "TypeScript",
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
        fileName: "learning.tsx",
        language: "TypeScript React",
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

  const currentConfig = sectionConfigs[activeSection];

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

        {/* Language - Truncated on mobile */}
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

        {/* Version - Hidden on mobile, shown on larger screens */}
        <span className="hidden lg:inline text-ctp-subtext1 flex-shrink-0">
          v1.0.0
        </span>
      </div>
    </div>
  );
};

const StatusBar = React.memo(StatusBarComponent);
export default StatusBar;
