import React from "react";
import { motion } from "framer-motion";
import { Lock, ExternalLink as ExternalLinkIcon } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import type { Project } from "@/types";
import { useProjectTheme } from "../context/ThemeContext";
import { Button } from "@/components/ui/button";
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
        </div>
      </div>

      {/* Action Buttons - Responsive Layout */}
      <div
        className={`flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4 ${
          isMobile ? "justify-center flex-wrap" : "justify-start"
        }`}
      >
        {selectedProject.githubLink && (
          <motion.div whileHover={{ y: -1 }} whileTap={{ scale: 0.98 }}>
            <Button
              size={"sm"}
              onClick={() => window.open(selectedProject.githubLink, "_blank")}
              disabled={selectedProject.githubLink === "private-repository"}
              className={`flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 h-8 sm:h-9 rounded-lg bg-ctp-${theme.main} hover:bg-ctp-${theme.main}/90 text-ctp-base font-medium shadow-sm hover:shadow-md transition-all duration-200 disabled:opacity-50 text-xs sm:text-sm`}
            >
              {selectedProject.githubLink === "private-repository" ? (
                <Lock className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              ) : (
                <FaGithub className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              )}
              {selectedProject.githubLink === "private-repository"
                ? "Private"
                : "Code"}
            </Button>
          </motion.div>
        )}

        {selectedProject.liveLink && (
          <motion.div whileHover={{ y: -1 }} whileTap={{ scale: 0.98 }}>
            <Button
              size={"sm"}
              onClick={() => window.open(selectedProject.liveLink, "_blank")}
              className={`flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 h-8 sm:h-9 rounded-lg bg-ctp-${theme.secondary} hover:bg-ctp-${theme.secondary}/90 text-ctp-base font-medium shadow-sm hover:shadow-md transition-all duration-200 text-xs sm:text-sm`}
            >
              <ExternalLinkIcon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              Demo
            </Button>
          </motion.div>
        )}
      </div>
    </DrawerHeader>
  );
};

export default ProjectDrawerHeader;
