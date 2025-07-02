import React from "react";
import { motion } from "framer-motion";
import { X, Lock } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import { ExternalLink } from "lucide-react";
import { Project } from "@/types";
import { useProjectTheme } from "../context/ThemeContext";
import { Button } from "@/components/ui/button";
import { DrawerTitle, DrawerClose, DrawerHeader } from "@/components/ui/drawer";
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
    <DrawerHeader className="border-b border-ctp-surface1/50 p-4 pb-6">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-4 min-w-0 flex-1">
          {/* Project Icon */}
          <motion.div
            className={`p-3 rounded-xl bg-ctp-${theme.main}/20 flex-shrink-0`}
            whileHover={{ rotate: 10, scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <div className={`w-6 h-6 text-ctp-${theme.main}`}>
              <div className="w-full h-full bg-current opacity-70 rounded-sm" />
            </div>
          </motion.div>

          {/* Project Info */}
          <div className="min-w-0 flex-1">
            <DrawerTitle className="text-xl sm:text-2xl font-bold text-ctp-text text-left leading-tight">
              {selectedProject.name}
            </DrawerTitle>
          </div>
        </div>

        {!isMobile && (
          <DrawerClose asChild>
            <Button
              variant="ghost"
              size="icon"
              className="p-2 rounded-xl bg-ctp-surface0/50 hover:bg-ctp-surface1/50 text-ctp-subtext0 hover:text-ctp-text transition-all duration-200 flex-shrink-0"
            >
              <X className="w-5 h-5" />
            </Button>
          </DrawerClose>
        )}
      </div>

      {/* Action Buttons Row */}
      <div className="flex items-center gap-3 mt-4 flex-wrap">
        {selectedProject.githubLink && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => window.open(selectedProject.githubLink, "_blank")}
            disabled={selectedProject.githubLink === "private-repository"}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl bg-ctp-${theme.main}/20 hover:bg-ctp-${theme.main}/30 text-ctp-${theme.main} transition-all duration-200 font-medium disabled:opacity-50 flex-shrink-0`}
          >
            {selectedProject.githubLink === "private-repository" ? (
              <Lock className="w-4 h-4" />
            ) : (
              <FaGithub className="w-4 h-4" />
            )}
            {selectedProject.githubLink === "private-repository"
              ? "Private Repository"
              : "View Code"}
          </Button>
        )}
        {selectedProject.liveLink && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => window.open(selectedProject.liveLink, "_blank")}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl bg-ctp-${theme.secondary}/20 hover:bg-ctp-${theme.secondary}/30 text-ctp-${theme.secondary} transition-all duration-200 font-medium flex-shrink-0`}
          >
            <ExternalLink className="w-4 h-4" />
            Live Demo
          </Button>
        )}

        {/* Categories/Tags */}
        {selectedProject.tags && (
          <div className="flex items-center gap-2 flex-wrap">
            {selectedProject.tags.slice(0, 2).map((category) => (
              <span
                key={category}
                className={`px-3 py-1 rounded-full text-xs font-medium bg-ctp-${theme.main}/10 text-ctp-${theme.main} border border-ctp-${theme.main}/20`}
              >
                {category}
              </span>
            ))}
          </div>
        )}
      </div>
    </DrawerHeader>
  );
};

export default ProjectDrawerHeader;
