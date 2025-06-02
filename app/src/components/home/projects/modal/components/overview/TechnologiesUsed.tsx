import type { Project } from "@/types";
import type { ProjectTheme } from "../../../context/ThemeContext";
import { Zap } from "lucide-react";
import { technologies } from "@/components/base/technologies";

interface TechnologiesProps {
  project: Project;
  theme: ProjectTheme;
}

const Technologies: React.FC<TechnologiesProps> = ({ project, theme }) => {
  return (
    <>
      <h3 className="text-lg sm:text-xl font-bold text-white mb-4 sm:mb-6 flex items-center gap-2 sm:gap-3">
        <Zap className={`w-5 h-5 sm:w-6 sm:h-6 text-ctp-${theme.main}`} />
        Technology Stack
      </h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
        {project.technologies.map((tech) => (
          <div key={tech} className="group relative">
            <div className="relative p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all duration-300 hover:scale-105">
              <div className="text-center">
                <div
                  className={`w-10 h-10 sm:w-12 sm:h-12 mx-auto mb-2 sm:mb-3 rounded-lg sm:rounded-xl flex items-center justify-center`}
                >
                  <span className="text-xl sm:text-2xl font-bold text-white">
                    {technologies[tech as keyof typeof technologies].icon}
                  </span>
                </div>
                <div className="text-white text-xs sm:text-sm font-medium leading-tight">
                  {technologies[tech as keyof typeof technologies].name}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Technologies;
