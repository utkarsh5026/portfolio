import { motion, AnimatePresence } from "framer-motion";
import type { ProjectTheme } from "@/components/home/projects/context/ThemeContext";
import type { Project } from "@/types";
import { Zap, Brain, Lightbulb, X } from "lucide-react";
import { technologies } from "@/components/base/technologies";
import Reveal from "@/components/animations/reveal/Reveal";
import { useState } from "react";
import ExplainItToMe from "../explain-to-me/ExplainItToMe";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
interface OverviewContentProps {
  project: Project;
  theme: ProjectTheme;
}

const OverviewContent: React.FC<OverviewContentProps> = ({
  project,
  theme,
}) => {
  return (
    <Reveal className="p-8 space-y-8">
      {/* Project Overview */}
      <OverViewComponent>
        <div className="absolute top-4 right-4 w-20 h-20 rounded-full bg-gradient-to-br from-ctp-blue/20 to-ctp-purple/20 blur-xl" />
        <h2 className="text-2xl font-bold text-white mb-4">Project Overview</h2>
        <p className="text-white/80 text-base leading-relaxed">
          {project.description}
        </p>
      </OverViewComponent>
      {project.explain && project.explain.length > 0 && (
        <ProjectExplainCollapsible project={project} theme={theme} />
      )}

      <Technologies project={project} theme={theme} />
    </Reveal>
  );
};

interface OverViewComponentProps {
  children: React.ReactNode;
}
const OverViewComponent: React.FC<OverViewComponentProps> = ({ children }) => {
  return (
    <Reveal className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md border border-white/20 p-8">
      {children}
    </Reveal>
  );
};

interface TechnologiesProps {
  project: Project;
  theme: ProjectTheme;
}

const Technologies: React.FC<TechnologiesProps> = ({ project, theme }) => {
  return (
    <OverViewComponent>
      <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
        <Zap className={`w-6 h-6 text-ctp-${theme.main}`} />
        Technology Stack
      </h3>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {project.technologies.map((tech) => (
          <div key={tech} className="group relative">
            <div className="relative p-4 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all duration-300 hover:scale-105">
              <div className="text-center">
                <div
                  className={`w-12 h-12 mx-auto mb-3 rounded-xl flex items-center justify-center`}
                >
                  <span className="text-2xl font-bold text-white">
                    {technologies[tech].icon}
                  </span>
                </div>
                <div className="text-white text-sm font-medium">
                  {technologies[tech].name}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </OverViewComponent>
  );
};

interface ProjectExplainCollapsibleProps {
  theme: ProjectTheme;
  project: Project;
}
const ProjectExplainCollapsible: React.FC<ProjectExplainCollapsibleProps> = ({
  theme,
  project,
}) => {
  const [isExplainOpen, setIsExplainOpen] = useState(false);
  return (
    <OverViewComponent>
      <Collapsible>
        <div
          className={`w-full text-left transition-all duration-300 group/explain flex items-center justify-between`}
        >
          <div className="flex items-center gap-4">
            <div
              className={`p-3 rounded-xl bg-ctp-${theme.main}/20 border border-ctp-${theme.main}/30 group-hover/explain:bg-ctp-${theme.main}/30 transition-colors duration-300`}
            >
              <Lightbulb className={`w-6 h-6 text-ctp-${theme.main}`} />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white mb-1 group-hover:text-white transition-colors">
                Why I Built This
              </h3>
              <p className="text-white/60 text-sm">
                Deep dive into the motivation and technical decisions
              </p>
            </div>
          </div>

          <CollapsibleTrigger asChild>
            <div className="flex items-center gap-3">
              <Button
                className={cn(
                  `px-4 py-2 rounded-xl bg-gradient-to-r from-ctp-${theme.main}/20 to-ctp-${theme.secondary}/80 text-white font-medium text-sm flex items-center gap-2 shadow-2xl`,
                  `hover:shadow-ctp-${theme.main} hover:shadow-xl hover:scale-105 hover:rotate-1 transition-all duration-300`,
                  isExplainOpen &&
                    `bg-gradient-to-r from-ctp-${theme.main}/20 to-ctp-${theme.secondary}/80`
                )}
                onClick={() => setIsExplainOpen(!isExplainOpen)}
              >
                {isExplainOpen ? (
                  <X className="w-4 h-4" />
                ) : (
                  <Brain className="w-4 h-4" />
                )}
                {isExplainOpen ? "Close" : "Explain It To Me"}
              </Button>
            </div>
          </CollapsibleTrigger>
        </div>

        {/* Collapsible Content */}
        <CollapsibleContent>
          <AnimatePresence>
            {isExplainOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{
                  duration: 0.4,
                  ease: "easeInOut",
                  opacity: { duration: 0.3 },
                }}
                className="overflow-hidden p-8"
              >
                <ExplainItToMe project={project} />
              </motion.div>
            )}
          </AnimatePresence>
        </CollapsibleContent>
      </Collapsible>
    </OverViewComponent>
  );
};

export default OverviewContent;
