import { Code } from "lucide-react";
import { ProjectTheme } from "../../../context/ThemeContext";
import { Project } from "@/types";

interface SidebarHeaderProps {
  project: Project;
  theme: ProjectTheme;
  hasDemo: boolean;
}

const SidebarHeader: React.FC<SidebarHeaderProps> = ({
  project,
  theme,
  hasDemo,
}) => {
  const { technologies, features, name: projectName } = project;

  return (
    <>
      <div className="flex items-center gap-4 mb-6">
        <div
          className={`w-16 h-16 rounded-2xl bg-gradient-to-br from-ctp-${theme.main} to-ctp-${theme.secondary} flex items-center justify-center shadow-lg`}
        >
          <Code className="w-8 h-8 text-white" />
        </div>
        <div className="flex-1">
          <h1 className="text-xl font-bold text-white break-words leading-tight">
            {projectName}
          </h1>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-3 gap-4">
        <div className="text-center">
          <div className="text-xl font-bold text-white">
            {technologies.length}
          </div>
          <div className="text-xs text-white/60">Technologies</div>
        </div>
        <div className="text-center">
          <div className="text-xl font-bold text-white">{features.length}</div>
          <div className="text-xs text-white/60">Features</div>
        </div>
        <div className="text-center">
          <div className="text-xl font-bold text-white">
            {hasDemo ? "1" : "0"}
          </div>
          <div className="text-xs text-white/60">Demo</div>
        </div>
      </div>
    </>
  );
};

export default SidebarHeader;
