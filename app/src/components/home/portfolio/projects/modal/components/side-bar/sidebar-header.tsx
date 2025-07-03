import { Code } from "lucide-react";
import { ProjectTheme } from "../../../context/ThemeContext";
import { Project } from "@/types";

interface SidebarHeaderProps {
  project: Project;
  theme: ProjectTheme;
}

const SidebarHeader: React.FC<SidebarHeaderProps> = ({ project, theme }) => {
  const { name: projectName, tagline } = project;

  return (
    <>
      <div className="flex items-start gap-4 mb-6">
        <div
          className={`w-16 h-16 rounded-2xl bg-gradient-to-br from-ctp-${theme.main} to-ctp-${theme.secondary} flex items-center justify-center shadow-lg flex-shrink-0`}
        >
          <Code className="w-8 h-8 text-white" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="space-y-2">
            <h1 className="text-xl font-bold text-white break-words leading-tight">
              {projectName}
            </h1>
          </div>
        </div>
      </div>

      {tagline && (
        <div className="flex justify-start w-full">
          <span
            className={`inline-block px-3 py-1.5 mb-2 rounded-lg text-xs font-medium tracking-wider uppercase bg-ctp-${theme.main}/10 text-ctp-${theme.main} border-none backdrop-blur-sm shadow-sm w-full break-words italic font-extrabold`}
          >
            "{tagline}"
          </span>
        </div>
      )}
    </>
  );
};

export default SidebarHeader;
