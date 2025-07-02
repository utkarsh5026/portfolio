import React from "react";
import { motion } from "framer-motion";
import { X, Lock, ExternalLink as ExternalLinkIcon } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import type { Project } from "@/types";
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
    <DrawerHeader className="border-b border-ctp-surface1/50 p-6">
      {/* Main Header Row */}
      <div className="flex items-center justify-between gap-4 mb-4">
        <div className="flex items-center gap-4 min-w-0 flex-1">
          {/* Minimal Project Icon */}
          <motion.div
            className={`w-12 h-12 rounded-xl bg-ctp-${theme.main}/15 border-2 border-ctp-${theme.main}/30 flex items-center justify-center flex-shrink-0`}
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <div
              className={`w-6 h-6 rounded bg-ctp-${theme.main} opacity-80`}
            />
          </motion.div>

          {/* Project Title */}
          <div className="min-w-0 flex-1">
            <DrawerTitle className="text-xl sm:text-2xl font-bold text-ctp-text leading-tight">
              {selectedProject.name}
            </DrawerTitle>
          </div>
        </div>

        {/* Close Button */}
        <DrawerClose asChild>
          <Button
            variant="ghost"
            size="icon"
            className="p-2 rounded-lg bg-ctp-surface0/50 hover:bg-ctp-surface1/50 text-ctp-subtext0 hover:text-ctp-text transition-all duration-200 flex-shrink-0"
          >
            <X className="w-5 h-5" />
          </Button>
        </DrawerClose>
      </div>

      {/* Action Buttons - Distinct Solid Design */}
      <div className="flex items-center gap-3 mb-4">
        {selectedProject.githubLink && (
          <motion.div whileHover={{ y: -1 }} whileTap={{ scale: 0.98 }}>
            <Button
              size="sm"
              onClick={() => window.open(selectedProject.githubLink, "_blank")}
              disabled={selectedProject.githubLink === "private-repository"}
              className={`flex items-center gap-2 px-4 py-2 h-9 rounded-lg bg-ctp-${theme.main} hover:bg-ctp-${theme.main}/90 text-ctp-base font-medium shadow-sm hover:shadow-md transition-all duration-200 disabled:opacity-50`}
            >
              {selectedProject.githubLink === "private-repository" ? (
                <Lock className="w-4 h-4" />
              ) : (
                <FaGithub className="w-4 h-4" />
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
              size="sm"
              onClick={() => window.open(selectedProject.liveLink, "_blank")}
              className={`flex items-center gap-2 px-4 py-2 h-9 rounded-lg bg-ctp-${theme.secondary} hover:bg-ctp-${theme.secondary}/90 text-ctp-base font-medium shadow-sm hover:shadow-md transition-all duration-200`}
            >
              <ExternalLinkIcon className="w-4 h-4" />
              Demo
            </Button>
          </motion.div>
        )}
      </div>

      {/* Tags - Distinct Minimal Chip Design */}
      {selectedProject.tags && selectedProject.tags.length > 0 && (
        <div className="flex items-center gap-2 flex-wrap">
          {selectedProject.tags.slice(0, isMobile ? 4 : 6).map((tag, index) => (
            <motion.div
              key={tag}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ scale: 1.05 }}
              className={`px-3 py-1 text-xs font-medium rounded-full bg-ctp-surface0 border border-ctp-surface1 text-ctp-${theme.main} hover:border-ctp-${theme.main}/40 hover:bg-ctp-${theme.main}/5 transition-all duration-200 cursor-default`}
            >
              {tag}
            </motion.div>
          ))}
          {selectedProject.tags.length > (isMobile ? 4 : 6) && (
            <span className="px-3 py-1 text-xs text-ctp-subtext1 bg-ctp-surface0/50 rounded-full border border-ctp-surface1/50">
              +{selectedProject.tags.length - (isMobile ? 4 : 6)}
            </span>
          )}
        </div>
      )}
    </DrawerHeader>
  );
};

export default ProjectDrawerHeader;
