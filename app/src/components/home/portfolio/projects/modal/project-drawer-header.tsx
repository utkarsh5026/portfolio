import React from "react";
import type { Project } from "@/types";
import { useProjectTheme } from "../context/ThemeContext";
import { DrawerTitle, DrawerHeader } from "@/components/ui/drawer";
import useMobile from "@/hooks/use-mobile";

interface ProjectDrawerHeaderProps {
  selectedProject: Project;
}

const ProjectDrawerHeader: React.FC<ProjectDrawerHeaderProps> = ({
  selectedProject,
}) => {
  const { isMobile } = useMobile();
  const { getProjectTheme } = useProjectTheme();
  const theme = getProjectTheme(selectedProject);

  return (
    <DrawerHeader className="border-b border-ctp-surface1/50 p-3 sm:p-6">
      <div
        className={`flex items-center ${
          isMobile ? "justify-center" : "justify-between"
        } gap-2 sm:gap-4 mb-3 sm:mb-4`}
      >
        <div className="min-w-0 flex-1">
          <DrawerTitle className="text-lg sm:text-xl md:text-2xl font-bold text-ctp-text leading-tight text-center sm:text-left">
            {selectedProject.name}
          </DrawerTitle>
          {selectedProject.tagline && (
            <div className="mt-2 sm:mt-3 text-center sm:text-left">
              <span
                className={`inline-block px-3 py-1.5 rounded-lg text-xs sm:text-sm font-extrabold tracking-wider uppercase italic bg-ctp-${theme.main}/10 text-ctp-${theme.main} border-none backdrop-blur-sm shadow-sm`}
              >
                "{selectedProject.tagline}"
              </span>
            </div>
          )}
        </div>
      </div>
    </DrawerHeader>
  );
};

export default ProjectDrawerHeader;
