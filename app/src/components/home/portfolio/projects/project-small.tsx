import React, { useState } from "react";
import { Project } from "@/types";
import { cn } from "@/lib/utils";
import { ExternalLink, ArrowUpRight } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import { motion } from "framer-motion";
import { useProjectTheme } from "./context/ThemeContext";
import { technologies } from "@/components/base/technologies";
import LayeredCard3D from "./utils/layered-guide";

interface ProjectSmallProps {
  project: Project;
  handleProjectSelect: (project: Project) => void;
  index: number;
}

const ProjectSmall: React.FC<ProjectSmallProps> = ({
  project,
  handleProjectSelect,
  index,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const { getProjectTheme } = useProjectTheme();
  const { accentColor, fromColor, toColor } = getProjectTheme(project);

  return (
    <LayeredCard3D>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
        className="h-full flex flex-col"
      >
        <button
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onClick={() => handleProjectSelect(project)}
          className={cn(
            "group relative h-full rounded-xl overflow-hidden cursor-pointer w-full text-left perspective-distant flex flex-col",
            "transform transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 active:translate-y-0",
            "touch-manipulation tap-highlight-transparent",
            isHovered ? `shadow-ctp-${accentColor}/20` : "shadow-md"
          )}
          aria-label={`View details for ${project.name}`}
        >
          <div
            className={cn(
              "absolute inset-0 p-[1px] rounded-xl transition-all duration-300",
              isHovered
                ? `bg-gradient-to-br from-ctp-${accentColor} to-ctp-${accentColor}/50 opacity-50`
                : "bg-ctp-surface0 opacity-100"
            )}
          />

          {/* Card background layers */}
          <div className="absolute inset-0 bg-ctp-mantle" />
          <div
            className={cn(
              "absolute inset-0 bg-gradient-to-br",
              fromColor,
              toColor,
              "opacity-0 transition-opacity duration-500",
              isHovered ? "opacity-40" : "opacity-0"
            )}
          />

          {/* Card content container */}
          <div className="relative z-10 p-5 sm:p-6 flex flex-col h-full">
            <div>
              <div
                className={cn(
                  "h-1 w-12 mb-3 rounded-full transition-all duration-500",
                  `bg-ctp-${accentColor}`,
                  isHovered ? "w-24" : "w-12"
                )}
              />

              <h4
                className={cn(
                  "text-lg font-bold transition-all duration-300",
                  isHovered ? `text-ctp-${accentColor}` : "text-ctp-text"
                )}
              >
                {project.name}
              </h4>

              {/* Tagline */}
              {project.tagline && (
                <motion.p
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1, duration: 0.4 }}
                  className={cn(
                    "mt-1 text-sm font-medium italic transition-all duration-300",
                    isHovered
                      ? `text-ctp-${accentColor}/80`
                      : "text-ctp-subtext1"
                  )}
                >
                  "{project.tagline}"
                </motion.p>
              )}
            </div>

            {project.tags && project.tags.length > 0 && (
              <div className="mt-2 flex flex-wrap gap-1.5">
                {project.tags.slice(0, 2).map((tag, i) => (
                  <motion.span
                    key={`${tag}-${i}`}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 + i * 0.1, duration: 0.3 }}
                    className={cn(
                      "text-xs px-2 py-0.5 rounded-full transition-all duration-300",
                      isHovered
                        ? `bg-ctp-${accentColor}/10 text-ctp-${accentColor} border border-ctp-${accentColor}/30`
                        : "bg-ctp-surface0 text-ctp-subtext1 border border-transparent"
                    )}
                  >
                    {tag}
                  </motion.span>
                ))}
                {project.tags.length > 2 && (
                  <span className="text-xs px-2 py-0.5 rounded-full bg-ctp-surface0 text-ctp-subtext0">
                    +{project.tags.length - 2}
                  </span>
                )}
              </div>
            )}

            {/* Description - Set a fixed height */}
            <div className="mt-3 h-[4.5rem]">
              <p className="text-ctp-subtext0 text-sm line-clamp-3 transition-colors duration-300 group-hover:text-ctp-text">
                {project.description}
              </p>
            </div>

            {/* Tech stack - Set a fixed height */}
            <div className="mt-4 h-[4rem]">
              <div className="mb-1 text-xs font-medium text-ctp-subtext0">
                Tech Stack
              </div>
              <div className="flex flex-wrap gap-1.5">
                {project.technologies.slice(0, 3).map((tech, i) => (
                  <motion.span
                    key={technologies[tech as keyof typeof technologies].name}
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 + i * 0.1, duration: 0.3 }}
                    className={cn(
                      "text-xs px-2 py-0.5 rounded-md transition-all duration-300",
                      isHovered
                        ? `bg-ctp-surface0 border-ctp-${accentColor}/20 text-ctp-text`
                        : "bg-ctp-surface0/50 text-ctp-subtext0 border-transparent"
                    )}
                  >
                    {technologies[tech as keyof typeof technologies].name}
                  </motion.span>
                ))}
                {project.technologies.length > 3 && (
                  <span className="text-xs px-2 py-0.5 rounded-md bg-ctp-surface0/50 text-ctp-subtext0">
                    +{project.technologies.length - 3}
                  </span>
                )}
              </div>
            </div>

            {/* Action buttons - Push to bottom with mt-auto */}
            <div className="mt-auto pt-4 border-t border-ctp-surface0 flex items-center justify-between">
              <div className="flex space-x-2">
                {project.githubLink !== "private-repository" && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      window.open(project.githubLink, "_blank");
                    }}
                    className={cn(
                      "text-ctp-subtext1 transition-all duration-300 p-2 rounded-full",
                      "hover:bg-ctp-surface0 hover:text-ctp-blue active:scale-95",
                      isHovered
                        ? "translate-y-0 opacity-100"
                        : "translate-y-2 opacity-0"
                    )}
                    title="View on GitHub"
                    aria-label="View project on GitHub"
                  >
                    <FaGithub className="w-4 h-4" />
                  </button>
                )}

                {project.liveLink && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      window.open(project.liveLink, "_blank");
                    }}
                    className={cn(
                      "text-ctp-subtext1 transition-all duration-300 p-2 rounded-full",
                      "hover:bg-ctp-surface0 hover:text-ctp-green active:scale-95",
                      isHovered
                        ? "translate-y-0 opacity-100 delay-75"
                        : "translate-y-2 opacity-0"
                    )}
                    title="View Live"
                    aria-label="View live project"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </button>
                )}
              </div>

              <div
                className={cn(
                  "inline-flex items-center gap-1.5 text-xs py-1.5 px-2.5 rounded-md transition-all duration-300",
                  isHovered
                    ? `bg-ctp-${accentColor}/10 text-ctp-${accentColor}`
                    : "bg-transparent text-ctp-subtext0"
                )}
              >
                View details
                <ArrowUpRight
                  className={cn(
                    "w-3 h-3 transition-transform duration-300",
                    isHovered ? "translate-x-0.5 -translate-y-0.5" : ""
                  )}
                />
              </div>
            </div>
          </div>
        </button>
      </motion.div>
    </LayeredCard3D>
  );
};

export default ProjectSmall;
