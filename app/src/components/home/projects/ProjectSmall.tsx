import React from "react";
import { Project } from "@/types";
import { cn } from "@/lib/utils";
import { ExternalLink, ChevronRight } from "lucide-react";
import { FaGithub } from "react-icons/fa";

interface ProjectSmallProps {
  project: Project;
  handleProjectSelect: (project: Project) => void;
}

const ProjectSmall: React.FC<ProjectSmallProps> = ({
  project,
  handleProjectSelect,
}) => {
  return (
    <div
      className={cn(
        "group relative h-full bg-ctp-mantle border border-ctp-surface0 rounded-xl p-6",
        "hover:border-ctp-blue/40 transition-all duration-300 overflow-hidden",
        "hover:shadow-lg hover:shadow-ctp-blue/10 hover:-translate-y-1 cursor-pointer",
        "before:absolute before:inset-0 before:bg-gradient-to-br before:from-ctp-blue/5 before:to-transparent before:opacity-0",
        "before:transition-opacity before:duration-300 group-hover:before:opacity-100"
      )}
      onClick={() => handleProjectSelect(project)}
      tabIndex={0}
      role="button"
      aria-label={`View details for ${project.name}`}
    >
      <div className="flex flex-col h-full relative z-10">
        <div className="mb-3">
          <h4 className="text-lg font-semibold text-ctp-text mb-2 group-hover:text-ctp-blue transition-colors flex items-center">
            {project.name}
            <span className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -translate-x-2 group-hover:translate-x-0 transform">
              <ChevronRight className="w-4 h-4" />
            </span>
          </h4>
          <p className="text-ctp-subtext0 text-sm line-clamp-3 mb-4 group-hover:text-ctp-subtext1 transition-colors">
            {project.description}
          </p>
        </div>

        <div className="mt-auto">
          <div className="flex flex-wrap gap-1.5 mb-4">
            {project.technologies.slice(0, 3).map((tech) => (
              <span
                key={tech.name}
                className="text-xs px-2 py-1 rounded-full bg-ctp-surface0 text-ctp-blue group-hover:bg-ctp-surface1 transition-colors"
              >
                {tech.name}
              </span>
            ))}
            {project.technologies.length > 3 && (
              <span className="text-xs px-2 py-1 rounded-full bg-ctp-surface0 text-ctp-subtext0 group-hover:bg-ctp-surface1 transition-colors">
                +{project.technologies.length - 3}
              </span>
            )}
          </div>

          <div className="flex items-center justify-between">
            <div className="flex space-x-1">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  window.open(project.githubLink, "_blank");
                }}
                className="text-ctp-subtext1 hover:text-ctp-blue transition-colors p-1.5 rounded-full hover:bg-ctp-surface0"
                title="View on GitHub"
              >
                <FaGithub className="w-4 h-4" />
              </button>

              {project.liveLink && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    window.open(project.liveLink, "_blank");
                  }}
                  className="text-ctp-subtext1 hover:text-ctp-green transition-colors p-1.5 rounded-full hover:bg-ctp-surface0"
                  title="View Live"
                >
                  <ExternalLink className="w-4 h-4" />
                </button>
              )}
            </div>

            <span className="text-xs text-ctp-subtext0 group-hover:text-ctp-text transition-colors flex items-center gap-1">
              View details
              <ChevronRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
            </span>
          </div>
        </div>
      </div>

      {/* Subtle hover effect */}
      <div className="absolute inset-0 bg-gradient-to-tr from-ctp-blue/0 via-ctp-blue/0 to-ctp-blue/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
    </div>
  );
};

export default ProjectSmall;
