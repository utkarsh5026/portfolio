import type { ProjectTheme } from "@/components/home/portfolio/projects/context/ThemeContext";
import type { Project } from "@/types";
import Reveal from "@/components/animations/reveal/Reveal";
import Technologies from "./TechnologiesUsed";
import ProjectExplainCollapsible from "./ProjectExplain";

interface OverviewContentProps {
  project: Project;
  theme: ProjectTheme;
}

const OverviewContent: React.FC<OverviewContentProps> = ({
  project,
  theme,
}) => {
  return (
    <Reveal className="p-4 sm:p-6 md:p-8 space-y-6 md:space-y-8">
      {/* Project Overview */}
      <OverViewComponent>
        <div className="absolute top-2 right-2 sm:top-4 sm:right-4 w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-br from-ctp-blue/20 to-ctp-purple/20 blur-xl" />
        <h2 className="text-xl sm:text-2xl font-bold text-white mb-3 sm:mb-4">
          Project Overview
        </h2>
        <p className="text-white/80 text-sm sm:text-base leading-relaxed">
          {project.description}
        </p>
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
    <Reveal className="relative rounded-2xl sm:rounded-3xl overflow-hidden bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md border border-white/20 p-4 sm:p-6 md:p-8">
      {children}
    </Reveal>
  );
};

export default OverviewContent;
