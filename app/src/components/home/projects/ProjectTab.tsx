import { memo, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";
import anime from "animejs";
import { Project } from "@/types";

const ProjectTab = memo(
  ({
    project,
    isSelected,
    onSelect,
  }: {
    project: Project;
    isSelected: boolean;
    onSelect: (project: Project) => (e: React.MouseEvent) => void;
  }) => {
    const tabRef = useRef<HTMLButtonElement>(null);

    useEffect(() => {
      if (isSelected && tabRef.current) {
        anime({
          targets: tabRef.current,
          scale: [1, 1.02, 1],
          duration: 400,
          easing: "easeOutElastic(1, .8)",
        });
      }
    }, [isSelected]);

    return (
      <button
        ref={tabRef}
        onClick={onSelect(project)}
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            onSelect(project)(e as unknown as React.MouseEvent);
          }
        }}
        className={cn(
          "w-full min-h-[80px] transition-all duration-300 cursor-pointer",
          "hover:bg-gradient-to-r hover:from-purple-500/10 hover:to-blue-500/10",
          "border border-transparent rounded-lg group relative",
          "focus:ring-2 focus:ring-purple-500/30 focus:outline-none",
          "overflow-hidden",
          isSelected
            ? "bg-gradient-to-r from-purple-500/20 to-blue-500/20 border-purple-500/50 shadow-lg"
            : [
                "hover:border-purple-500/30",
                "border-b border-gray-700/30 last:border-b-0",
              ]
        )}
      >
        <div className="flex flex-col gap-3 p-4 w-full items-start">
          <h3 className="font-semibold text-base group-hover:text-primary text-left w-full">
            {project.name}
          </h3>

          {project.tags && project.tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {project.tags.slice(0, 3).map((tag, index) => {
                const colors = [
                  "bg-gray-500/10 text-gray-400 group-hover:bg-gray-500/20",
                  "bg-gray-400/10 text-gray-400 group-hover:bg-gray-400/20",
                ];
                return (
                  <span
                    key={tag}
                    className={cn(
                      "text-xs px-3 py-1 rounded-full transition-colors whitespace-nowrap",
                      colors[index % colors.length]
                    )}
                  >
                    {tag}
                  </span>
                );
              })}
            </div>
          )}
        </div>
      </button>
    );
  }
);

ProjectTab.displayName = "ProjectTab";

export default ProjectTab;
