import { memo, useMemo, useCallback, MouseEvent } from "react";
import { Project } from "@/types";
import { cn } from "@/lib/utils";
import { ExternalLink, ArrowUpRight } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import { useProjectTheme } from "./context/ThemeContext";
import { technologies } from "@/components/base/technologies";
import { useMobileContext } from "@/hooks/use-mobile";

interface ProjectSmallProps {
  project: Project;
  handleProjectSelect: (project: Project) => void;
  index: number;
}

const ProjectSmall = memo<ProjectSmallProps>(function ProjectSmall({
  project,
  handleProjectSelect,
}) {
  const { isMobile } = useMobileContext();
  const { getProjectTheme } = useProjectTheme();
  const { accentColor } = getProjectTheme(project);

  const filteredTechs = useMemo(
    () =>
      project.technologies.filter(
        (tech) => technologies[tech as keyof typeof technologies]
      ),
    [project.technologies]
  );

  const displayTechs = useMemo(() => filteredTechs.slice(0, 3), [filteredTechs]);
  const remainingCount = filteredTechs.length - 3;

  const handleClick = useCallback(() => {
    handleProjectSelect(project);
  }, [handleProjectSelect, project]);

  const handleGithubClick = useCallback(
    (e: MouseEvent) => {
      e.stopPropagation();
      window.open(project.githubLink, "_blank");
    },
    [project.githubLink]
  );

  const handleLiveClick = useCallback(
    (e: MouseEvent) => {
      e.stopPropagation();
      window.open(project.liveLink, "_blank");
    },
    [project.liveLink]
  );

  if (isMobile) {
    return (
      <button
        onClick={handleClick}
        className="group relative h-full rounded-2xl overflow-hidden cursor-pointer w-full text-left flex flex-col bg-ctp-mantle border border-ctp-surface0 active:scale-[0.98] transition-transform"
        aria-label={`View details for ${project.name}`}
      >
        <div className="relative z-10 p-5 flex flex-col h-full">
          {/* Header */}
          <div className="space-y-1.5">
            <div
              className={`h-1 w-12 rounded-full bg-ctp-${accentColor}`}
            />
            <h4 className="text-lg font-bold text-white leading-tight">
              {project.name}
            </h4>
            {project.tagline && (
              <p className="text-xs font-medium italic text-ctp-subtext0">
                {project.tagline}
              </p>
            )}
          </div>

          {/* Description */}
          <div className="mt-3 flex-1">
            <p className="text-ctp-subtext1 text-sm leading-relaxed line-clamp-2">
              {project.description}
            </p>
          </div>

          {/* Tech Stack */}
          <div className="mt-4 flex flex-wrap gap-1.5">
            {displayTechs.map((tech) => (
              <span
                key={tech}
                className="text-xs px-2 py-0.5 rounded-md bg-ctp-surface0/50 text-ctp-subtext1"
              >
                {technologies[tech as keyof typeof technologies].name}
              </span>
            ))}
            {remainingCount > 0 && (
              <span className="text-xs px-2 py-0.5 rounded-md bg-ctp-surface0/50 text-ctp-subtext0">
                +{remainingCount}
              </span>
            )}
          </div>
        </div>
      </button>
    );
  }


  return (
    <button
      onClick={handleClick}
      className={cn(
        "group relative h-full rounded-xl overflow-hidden cursor-pointer w-full text-left flex flex-col",
        "bg-ctp-mantle border border-ctp-surface0 hover:border-ctp-surface1",
        "hover:shadow-xl transition-shadow"
      )}
      aria-label={`View details for ${project.name}`}
    >
      <div className="relative z-10 p-5 sm:p-6 flex flex-col h-full">
        <div>
          <div
            className={cn(
              "h-1 w-12 mb-3 rounded-full transition-[width] duration-300",
              `bg-ctp-${accentColor}`,
              "group-hover:w-24"
            )}
          />
          <h4
            className={cn(
              "text-lg font-bold transition-colors duration-200",
              "text-white group-hover:text-ctp-" + accentColor
            )}
          >
            {project.name}
          </h4>
          {project.tagline && (
            <p className="mt-1 text-sm font-medium italic text-ctp-subtext1">
              "{project.tagline}"
            </p>
          )}
        </div>

        <div className="mt-3 h-[4.5rem]">
          <p className="text-ctp-subtext1 text-sm line-clamp-3 transition-colors duration-200 group-hover:text-ctp-text">
            {project.description}
          </p>
        </div>

        <div className="mt-4 h-[4rem]">
          <div className="mb-1 text-xs font-medium text-ctp-subtext0">
            Tech Stack
          </div>
          <div className="flex flex-wrap gap-1.5">
            {displayTechs.map((tech) => (
              <span
                key={tech}
                className="text-xs px-2 py-0.5 rounded-md bg-ctp-surface0/50 text-ctp-subtext1"
              >
                {technologies[tech as keyof typeof technologies].name}
              </span>
            ))}
            {remainingCount > 0 && (
              <span className="text-xs px-2 py-0.5 rounded-md bg-ctp-surface0/50 text-ctp-subtext0">
                +{remainingCount}
              </span>
            )}
          </div>
        </div>

        <div className="mt-auto pt-4 border-t border-ctp-surface0 flex items-center justify-between">
          <div className="flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
            {project.githubLink !== "private-repository" && (
              <button
                onClick={handleGithubClick}
                className="text-ctp-subtext1 p-2 rounded-full hover:bg-ctp-surface0 hover:text-ctp-blue active:scale-95 transition-colors"
                aria-label="View project on GitHub"
              >
                <FaGithub className="w-4 h-4" />
              </button>
            )}
            {project.liveLink && (
              <button
                onClick={handleLiveClick}
                className="text-ctp-subtext1 p-2 rounded-full hover:bg-ctp-surface0 hover:text-ctp-green active:scale-95 transition-colors"
                aria-label="View live project"
              >
                <ExternalLink className="w-4 h-4" />
              </button>
            )}
          </div>
          <div
            className={cn(
              "inline-flex items-center gap-1.5 text-xs py-1.5 px-2.5 rounded-md transition-colors",
              "text-ctp-subtext0 group-hover:bg-ctp-" +
                accentColor +
                "/10 group-hover:text-ctp-" +
                accentColor
            )}
          >
            View details
            <ArrowUpRight className="w-3 h-3" />
          </div>
        </div>
      </div>
    </button>
  );
});

export default ProjectSmall;
