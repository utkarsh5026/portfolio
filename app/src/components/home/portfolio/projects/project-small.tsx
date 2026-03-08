import { ExternalLink, Folder } from "lucide-react";
import { memo, useCallback } from "react";
import { FaGithub } from "react-icons/fa";

import TechBadge from "@/components/base/tech-badge";
import { useGitComponent } from "@/hooks/use-git-component";
import { Project } from "@/types";

import { useProjectTheme } from "./context/ThemeContext";

interface ProjectSmallProps {
  project: Project;
  handleProjectSelect: (project: Project) => void;
  index: number;
}

const ProjectSmall = memo<ProjectSmallProps>(function ProjectSmall({
  project,
  handleProjectSelect,
}) {
  const ref = useGitComponent<HTMLButtonElement>(ProjectSmall);
  const { getProjectTheme } = useProjectTheme();
  const { accentColor } = getProjectTheme(project);

  const handleGithubClick = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      window.open(project.githubLink, "_blank");
    },
    [project.githubLink]
  );

  const handleLiveClick = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      window.open(project.liveLink, "_blank");
    },
    [project.liveLink]
  );

  const handleClick = useCallback(() => {
    handleProjectSelect(project);
  }, [handleProjectSelect, project]);

  return (
    <button
      ref={ref}
      onClick={handleClick}
      className={`group w-full text-left cursor-pointer bg-ctp-surface0/10 border border-ctp-surface0/30 hover:border-ctp-${accentColor}/50 rounded-xl sm:rounded-2xl p-4 sm:p-5 overflow-hidden transition-all duration-300 shadow-sm hover:shadow-md hover:shadow-ctp-${accentColor}/5 hover:-translate-y-0.5`}
      aria-label={`View details for ${project.name}`}
    >
      <div className="flex items-center gap-3 sm:gap-4 mb-4">
        <div
          className={`p-2.5 sm:p-3 rounded-xl sm:rounded-2xl bg-ctp-${accentColor}/15 text-ctp-${accentColor} flex-shrink-0 transition-transform duration-200 group-hover:scale-110`}
        >
          {project.icon ? (
            <span className="w-5 h-5 sm:w-6 sm:h-6 flex items-center justify-center text-lg sm:text-xl leading-none">
              {project.icon}
            </span>
          ) : (
            <Folder className="w-5 h-5 sm:w-6 sm:h-6" />
          )}
        </div>
        <div className="min-w-0 flex-1">
          <h4 className="text-base sm:text-lg font-bold text-ctp-text leading-tight break-words group-hover:text-ctp-text transition-colors duration-200">
            {project.name}
          </h4>
          {project.tagline && (
            <p className="text-xs sm:text-sm text-ctp-subtext0 mt-0.5 break-words font-medium leading-relaxed">
              {project.tagline}
            </p>
          )}
        </div>
      </div>

      {/* Description */}
      <div className="mb-5">
        <p className="text-[13px] sm:text-sm text-ctp-subtext0 leading-[1.6] line-clamp-3 group-hover:text-ctp-subtext1 transition-colors duration-300">
          {project.description}
        </p>
      </div>

      {/* Tech stack pills */}
      <div className="flex flex-wrap items-center gap-2 mb-4">
        {project.technologies.map((tech) => (
          <TechBadge key={tech} tech={tech} />
        ))}
      </div>

      {/* Footer Links (Always visible but subtle) */}
      <div className="mt-5 pt-4 border-t border-ctp-surface0/40 flex items-center justify-between">
        <div
          className={`text-[11px] font-semibold tracking-wider uppercase text-ctp-${accentColor}/70 group-hover:text-ctp-${accentColor} transition-colors`}
        >
          View Project
        </div>
        <div className="flex space-x-1.5">
          {project.githubLink !== "private-repository" && (
            <button
              onClick={handleGithubClick}
              className="text-ctp-subtext0 p-1.5 rounded-md hover:bg-ctp-surface1 hover:text-ctp-text transition-all"
              aria-label="View project on GitHub"
            >
              <FaGithub className="w-3.5 h-3.5" />
            </button>
          )}
          {project.liveLink && (
            <button
              onClick={handleLiveClick}
              className="text-ctp-subtext0 p-1.5 rounded-md hover:bg-ctp-surface1 hover:text-ctp-text transition-all"
              aria-label="View live project"
            >
              <ExternalLink className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>
    </button>
  );
});

export default ProjectSmall;
