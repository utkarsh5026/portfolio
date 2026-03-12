import React from "react";
import { FiGitCommit, FiStar } from "react-icons/fi";
import { VscRepoForked } from "react-icons/vsc";

import { cn, relativeTime } from "@/lib/utils";
import type { ProjectActivity } from "@/store/activity/activity-store";

interface ProjectActivityCardProps {
  project: ProjectActivity;
  isActive: boolean;
  onClick: () => void;
}

const ProjectActivityCard: React.FC<ProjectActivityCardProps> = ({
  project,
  isActive,
  onClick,
}) => {
  return (
    <button
      onClick={onClick}
      className={cn(
        "w-full text-left px-3 py-2.5 rounded-md border transition-all duration-200 font-source",
        isActive
          ? "border-ctp-blue/50 bg-ctp-blue/10"
          : "border-ctp-surface0/60 bg-ctp-surface0/20 hover:border-ctp-surface1 hover:bg-ctp-surface0/40"
      )}
    >
      {/* Repo name + language */}
      <div className="flex items-center gap-1.5 mb-1">
        <span
          className={cn(
            "text-xs font-semibold truncate",
            isActive ? "text-ctp-blue" : "text-ctp-text"
          )}
        >
          {project.name}
        </span>
        {project.language && (
          <span className="text-[10px] text-ctp-overlay0 ml-auto flex-shrink-0">
            {project.language}
          </span>
        )}
      </div>

      {/* Language bar */}
      {project.languages.length > 0 && (
        <div className="flex h-1 rounded-full overflow-hidden gap-px mb-1.5">
          {project.languages.map((l, i) => (
            <div
              key={i}
              style={{ width: `${l.percent}%`, backgroundColor: l.color }}
              className="min-w-[2px] first:rounded-l-full last:rounded-r-full"
            />
          ))}
        </div>
      )}

      {/* Stats row */}
      <div className="flex items-center gap-3 text-[10px] text-ctp-subtext0">
        <span className="flex items-center gap-1">
          <FiGitCommit className="w-2.5 h-2.5 text-ctp-teal" />
          {project.commitCount}
        </span>
        {project.stars > 0 && (
          <span className="flex items-center gap-1">
            <FiStar className="w-2.5 h-2.5 text-ctp-yellow" />
            {project.stars}
          </span>
        )}
        {project.forks > 0 && (
          <span className="flex items-center gap-1">
            <VscRepoForked className="w-2.5 h-2.5 text-ctp-mauve" />
            {project.forks}
          </span>
        )}
        {project.updatedAt && (
          <span className="ml-auto text-ctp-overlay0">
            {relativeTime(project.updatedAt)}
          </span>
        )}
      </div>
    </button>
  );
};

export default ProjectActivityCard;
