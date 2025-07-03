import type { ProjectTheme } from "@/components/home/portfolio/projects/context/ThemeContext";
import type { Project } from "@/types";
import Reveal from "@/components/animations/reveal/Reveal";
import Technologies from "./technologies-used";
import ProjectExplainCollapsible from "./project-explain";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { FaGithub } from "react-icons/fa";
import { Lock, ExternalLink } from "lucide-react";
import useMobile from "@/hooks/use-mobile";

interface OverviewContentProps {
  project: Project;
  theme: ProjectTheme;
}

const ProjectOverview: React.FC<OverviewContentProps> = ({
  project,
  theme,
}) => {
  const { isMobile } = useMobile();
  return (
    <Reveal className="p-4 sm:p-6 md:p-8 space-y-6 md:space-y-8">
      {/* Project Overview */}
      <OverViewComponent>
        <div className="absolute top-2 right-2 sm:top-4 sm:right-4 w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-br from-ctp-blue/20 to-ctp-purple/20 blur-xl" />
        <h2 className="text-xl sm:text-2xl font-bold text-white mb-3 sm:mb-4">
          Project Overview
        </h2>
        <p className="text-ctp-text text-sm sm:text-base leading-relaxed">
          {project.description}
        </p>

        <div
          className={`flex items-center gap-2 sm:gap-3 my-4 sm:mb-4 ${
            isMobile ? "justify-center flex-wrap" : "justify-start"
          }`}
        >
          {project.githubLink && (
            <motion.div whileHover={{ y: -1 }} whileTap={{ scale: 0.98 }}>
              <Button
                size={"sm"}
                onClick={() => window.open(project.githubLink, "_blank")}
                disabled={project.githubLink === "private-repository"}
                className={`flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 h-8 sm:h-9 rounded-lg bg-transparent  text-ctp-text font-medium shadow-sm hover:shadow-md transition-all duration-200 disabled:opacity-50 text-xs sm:text-sm`}
              >
                {project.githubLink === "private-repository" ? (
                  <Lock className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                ) : (
                  <FaGithub className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                )}
                {project.githubLink === "private-repository"
                  ? "Private"
                  : "Code"}
              </Button>
            </motion.div>
          )}

          {project.liveLink && (
            <motion.div whileHover={{ y: -1 }} whileTap={{ scale: 0.98 }}>
              <Button
                size={"sm"}
                onClick={() => window.open(project.liveLink, "_blank")}
                className={`flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 h-8 sm:h-9 rounded-lg bg-gradient-to-t from-ctp-base to-ctp-surface0 hover:bg-ctp-overlay0/90 text-ctp-text font-medium shadow-sm hover:shadow-md transition-all duration-200 text-xs sm:text-sm`}
              >
                <ExternalLink className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                Demo
              </Button>
            </motion.div>
          )}
        </div>
      </OverViewComponent>
      {project.explain && project.explain.length > 0 && (
        <OverViewComponent>
          <ProjectExplainCollapsible project={project} theme={theme} />
        </OverViewComponent>
      )}

      <OverViewComponent>
        <Technologies project={project} theme={theme} />
      </OverViewComponent>
    </Reveal>
  );
};

interface OverViewComponentProps {
  children: React.ReactNode;
}
const OverViewComponent: React.FC<OverViewComponentProps> = ({ children }) => {
  return (
    <Reveal className="relative rounded-2xl sm:rounded-3xl overflow-hidden bg-gradient-to-br from-ctp-surface0/10 to-ctp-surface0/5 backdrop-blur-md border-none p-4 sm:p-6 md:p-8">
      {children}
    </Reveal>
  );
};

export default ProjectOverview;
