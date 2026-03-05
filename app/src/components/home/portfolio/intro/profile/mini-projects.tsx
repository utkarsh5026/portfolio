import React, { useEffect } from "react";
import { FaGithub } from "react-icons/fa";
import { HiOutlineExternalLink } from "react-icons/hi";
import { useLocation,useNavigate } from "react-router-dom";

import { useEditorStore } from "@/components/home/editor/context/editor-store";
import SketchBorder from "@/components/ui/sketch-border";
import { cn } from "@/lib/utils";
import useProjectStore from "@/store/projects/projects-store";

const cardColors = ["mauve", "green", "blue", "peach"] as const;

const MiniProjects: React.FC = () => {
  const { projects, fetchProjects, isLoading } = useProjectStore();
  const openProject = useEditorStore((s) => s.openProject);
  const navigate = useNavigate();
  const { pathname } = useLocation();

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  const topTwo = projects.slice(1, 3);

  return (
    <div className="w-full mt-10 mb-2 hidden lg:block">
      <div className="flex items-center gap-4 mb-4">
        <h3 className="text-sm font-semibold text-ctp-text tracking-wider uppercase font-source">
          Recent Highlights
        </h3>
        <div className="h-[1px] flex-1 bg-gradient-to-r from-ctp-surface1 to-transparent" />
      </div>

      {isLoading && (
        <div className="grid grid-cols-2 gap-4">
          {[0, 1].map((i) => (
            <div
              key={i}
              className="h-32 rounded-xl bg-ctp-surface0/30 animate-pulse border border-ctp-surface1/30"
            />
          ))}
        </div>
      )}

      {!isLoading && (
        <div className="grid grid-cols-2 gap-4">
          {topTwo.map((project, idx) => {
            const color = cardColors[idx % cardColors.length];
            return (
              <SketchBorder
                key={project.name}
                primaryColor={color}
                secondaryColor="yellow"
                primaryOpacity={40}
                secondaryOpacity={20}
                rotation={idx % 2 === 0 ? 0.8 : -0.8}
                hoverScale
              >
                {/* Card body — clicking opens the project tab */}
                <button
                  type="button"
                  onClick={() => openProject(project, navigate, pathname)}
                  className={cn(
                    "group/card block text-left h-full w-full rounded-xl p-4",
                    "transition-all duration-300 cursor-pointer",
                    "bg-ctp-surface0/30 hover:bg-ctp-surface0/60",
                    "border border-ctp-surface1/40 backdrop-blur-sm",
                    "shadow-lg shadow-black/5",
                  )}
                >
                  {/* Header */}
                  <div className="flex items-start justify-between mb-1.5">
                    <div className="flex items-center gap-1.5 min-w-0">
                      {project.icon && (
                        <span className="text-base leading-none shrink-0">
                          {project.icon}
                        </span>
                      )}
                      <span
                        className={cn(
                          "text-ctp-text font-bold font-source truncate",
                          `group-hover/card:text-ctp-${color} transition-colors`,
                        )}
                      >
                        {project.name}
                      </span>
                    </div>

                    {/* External link icons — stop propagation so they don't also open the tab */}
                    <div className="flex items-center gap-1.5 shrink-0 ml-2">
                      {project.githubLink && (
                        <a
                          href={project.githubLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`${project.name} GitHub`}
                          onClick={(e) => e.stopPropagation()}
                          className="text-ctp-overlay0 hover:text-ctp-text transition-colors"
                        >
                          <FaGithub className="w-3.5 h-3.5" />
                        </a>
                      )}
                      {project.liveLink && (
                        <a
                          href={project.liveLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`${project.name} live`}
                          onClick={(e) => e.stopPropagation()}
                          className="text-ctp-overlay0 hover:text-ctp-blue transition-colors"
                        >
                          <HiOutlineExternalLink className="w-3.5 h-3.5" />
                        </a>
                      )}
                    </div>
                  </div>

                  {/* Tagline / description */}
                  <p className="text-xs text-ctp-subtext0 mb-3 line-clamp-2 min-h-[32px] font-source">
                    {project.tagline ?? project.description}
                  </p>

                  {/* Tags */}
                  {project.technologies && project.technologies.length > 0 && (
                    <div className="flex flex-wrap gap-1">
                      {project.technologies.slice(0, 3).map((p) => (
                        <span
                          key={p}
                          className="text-[10px] px-1.5 py-0.5 rounded bg-ctp-base text-ctp-subtext1 font-source"
                        >
                          {p}
                        </span>
                      ))}
                    </div>
                  )}
                </button>
              </SketchBorder>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default MiniProjects;
