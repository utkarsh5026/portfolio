import type { Project } from "@/types";
import type { ProjectTheme } from "../../../context/ThemeContext";
import { Zap } from "lucide-react";
import { technologies } from "@/components/base/technologies";

interface TechnologiesProps {
  project: Project;
  theme: ProjectTheme;
}

const Technologies: React.FC<TechnologiesProps> = ({ project, theme }) => {
  const projectTechnologies = project.technologies.filter(
    (tech) => tech in technologies
  );
  return (
    <>
      <h3 className="text-lg font-bold text-ctp-text mb-4 flex items-center gap-2">
        <Zap className={`w-5 h-5 text-ctp-${theme.main}`} />
        Technology Stack
      </h3>
      <div className="grid grid-cols-3 gap-3">
        {projectTechnologies.map((tech) => (
          <div
            key={tech}
            className="text-center p-3 rounded-lg bg-ctp-surface0/10 border-none"
          >
            <div className="w-8 h-8 mx-auto mb-2 flex items-center justify-center">
              <span className="text-lg text-ctp-text">
                {technologies[tech].icon}
              </span>
            </div>
            <div className="text-ctp-text text-sm font-medium">
              {technologies[tech].name}
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Technologies;
