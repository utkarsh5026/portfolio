import { memo, useCallback } from "react";
import type { ProjectTheme } from "@/components/home/portfolio/projects/context/ThemeContext";
import type { Project } from "@/types";
import Reveal from "@/components/animations/reveal/Reveal";
import Technologies from "./technologies-used";
import ProjectExplainCollapsible from "./project-explain";
import { Button } from "@/components/ui/button";
import { FaGithub } from "react-icons/fa";
import { Lock, ExternalLink } from "lucide-react";
import { useMobileContext } from "@/hooks/use-mobile";

interface OverviewContentProps {
  project: Project;
  theme: ProjectTheme;
}

const ProjectOverview = memo<OverviewContentProps>(function ProjectOverview({
  project,
  theme,
}) {
  const { isMobile } = useMobileContext();

  const openGithub = useCallback(() => {
    window.open(project.githubLink, "_blank");
  }, [project.githubLink]);

  const openLive = useCallback(() => {
    window.open(project.liveLink, "_blank");
  }, [project.liveLink]);

  return (
    <div className="p-4 sm:p-6 md:p-8 space-y-6 md:space-y-8">
      <OverViewComponent isMobile={isMobile}>
        {!isMobile && (
          <div className="absolute top-2 right-2 sm:top-4 sm:right-4 w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-br from-ctp-blue/20 to-ctp-purple/20 blur-xl" />
        )}
        <h2 className="text-xl sm:text-2xl font-bold text-white mb-3 sm:mb-4">
          Project Overview
        </h2>
        <p className="text-ctp-subtext1 text-sm sm:text-base leading-relaxed sm:leading-7">
          {project.description}
        </p>

        <div className="flex items-center gap-2 sm:gap-3 my-4 sm:mb-4 justify-start">
          {project.githubLink && (
            <Button
              size="sm"
              onClick={openGithub}
              disabled={project.githubLink === "private-repository"}
              className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 h-8 sm:h-9 rounded-lg bg-transparent text-ctp-text font-medium shadow-sm disabled:opacity-50 text-xs sm:text-sm active:scale-95 transition-transform"
            >
              {project.githubLink === "private-repository" ? (
                <Lock className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              ) : (
                <FaGithub className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              )}
              {project.githubLink === "private-repository" ? "Private" : "Code"}
            </Button>
          )}

          {project.liveLink && (
            <Button
              size="sm"
              onClick={openLive}
              className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 h-8 sm:h-9 rounded-lg bg-gradient-to-t from-ctp-base to-ctp-surface0 text-ctp-text font-medium shadow-sm text-xs sm:text-sm active:scale-95 transition-transform"
            >
              <ExternalLink className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              Demo
            </Button>
          )}
        </div>
      </OverViewComponent>

      {project.explain && project.explain.length > 0 && (
        <OverViewComponent isMobile={isMobile}>
          <ProjectExplainCollapsible project={project} theme={theme} />
        </OverViewComponent>
      )}

      <OverViewComponent isMobile={isMobile}>
        <Technologies project={project} theme={theme} />
      </OverViewComponent>
    </div>
  );
});

interface OverViewComponentProps {
  children: React.ReactNode;
  isMobile: boolean;
}

const OverViewComponent = memo<OverViewComponentProps>(
  function OverViewComponent({ children, isMobile }) {
    if (isMobile) {
      return (
        <div className="relative rounded-2xl overflow-hidden bg-ctp-surface0/40 p-4">
          {children}
        </div>
      );
    }

    return (
      <Reveal className="relative rounded-2xl sm:rounded-3xl overflow-hidden bg-gradient-to-br from-ctp-surface0/10 to-ctp-surface0/5 backdrop-blur-md border-none p-4 sm:p-6 md:p-8">
        {children}
      </Reveal>
    );
  }
);

export default ProjectOverview;
