import React, { memo, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";
import anime from "animejs";
import type { Project } from "@/types";

interface ProjectTabProps {
  outlineID: string;
  project: Project;
  isSelected: boolean;
  onSelect: (project: Project) => (e: React.MouseEvent) => void;
}

const ProjectTabComponent: React.FC<ProjectTabProps> = ({
  outlineID,
  project,
  isSelected,
  onSelect,
}: ProjectTabProps) => {
  const tabRef = useRef<HTMLButtonElement>(null);

  // Define tag colors based on Catppuccin palette
  const tagColors = [
    "bg-ctp-surface0 text-ctp-lavender border border-ctp-lavender/20",
    "bg-ctp-surface0 text-ctp-blue border border-ctp-blue/20",
    "bg-ctp-surface0 text-ctp-mauve border border-ctp-mauve/20",
    "bg-ctp-surface0 text-ctp-sapphire border border-ctp-sapphire/20",
    "bg-ctp-surface0 text-ctp-teal border border-ctp-teal/20",
  ];

  useEffect(() => {
    if (isSelected && tabRef.current) {
      anime({
        targets: tabRef.current,
        scale: [1, 1.02, 1],
        duration: 400,
        easing: "easeOutElastic(1, .8)",
      });

      // Add a subtle pulse animation to the border
      anime({
        targets: tabRef.current,
        boxShadow: [
          "0 0 0 rgba(0,0,0,0)",
          "0 0 8px rgba(180, 190, 254, 0.4)",
          "0 0 0 rgba(0,0,0,0)",
        ],
        duration: 1500,
        easing: "easeOutSine",
      });
    }
  }, [isSelected]);

  return (
    <button
      id={outlineID}
      ref={tabRef}
      onClick={onSelect(project)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          onSelect(project)(e as unknown as React.MouseEvent);
        }
      }}
      className={cn(
        "w-full min-h-[90px] transition-all duration-300 cursor-pointer",
        "hover:bg-gradient-to-r hover:from-ctp-blue/5 hover:to-ctp-lavender/5",
        "border rounded-lg group relative",
        "focus:ring-2 focus:ring-ctp-lavender/30 focus:outline-none",
        "overflow-hidden backdrop-blur-sm",
        isSelected
          ? "bg-gradient-to-r from-ctp-base to-ctp-mantle border-ctp-lavender shadow-lg"
          : [
              "bg-ctp-mantle hover:border-ctp-lavender/30",
              "border-ctp-surface0",
            ]
      )}
    >
      {/* Left accent bar */}
      <div
        className={cn(
          "absolute left-0 top-0 bottom-0 w-1 transition-all duration-300",
          isSelected
            ? "bg-ctp-lavender"
            : "bg-ctp-surface0 group-hover:bg-ctp-lavender/30"
        )}
      />

      <div className="flex flex-col gap-3 p-4 pl-6 w-full items-start">
        {/* Project name with hover effect */}
        <h3
          className={cn(
            "font-medium text-base transition-colors duration-300 text-left w-full",
            isSelected
              ? "text-ctp-lavender"
              : "text-ctp-text group-hover:text-ctp-lavender"
          )}
        >
          {project.name}
        </h3>

        {/* Project tags with Catppuccin colors */}
        {project.tags && project.tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {project.tags.slice(0, 3).map((tag, index) => (
              <span
                key={tag}
                className={cn(
                  "text-xs px-3 py-1 rounded-full transition-all duration-300 whitespace-nowrap",
                  tagColors[index % tagColors.length],
                  "transform group-hover:scale-105"
                )}
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Selection indicator */}
        {isSelected && (
          <div className="absolute right-4 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-ctp-lavender" />
        )}
      </div>
    </button>
  );
};

ProjectTabComponent.displayName = "ProjectTab";
const ProjectTab = memo(ProjectTabComponent);
export default ProjectTab;
