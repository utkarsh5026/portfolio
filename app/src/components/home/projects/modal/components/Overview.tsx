import { motion, AnimatePresence } from "framer-motion";
import type { ProjectTheme } from "@/components/home/projects/context/ThemeContext";
import type { Project } from "@/types";
import { Zap, Brain, Lightbulb, X } from "lucide-react";
import { technologies } from "@/components/base/technologies";
import Reveal from "@/components/animations/reveal/Reveal";
import { useState } from "react";
import ExplainItToMe from "../explain-to-me/ExplainItToMe";
import { Button } from "@/components/ui/button";

interface OverviewContentProps {
  project: Project;
  theme: ProjectTheme;
}

const OverviewContent: React.FC<OverviewContentProps> = ({
  project,
  theme,
}) => {
  const [isExplainOpen, setIsExplainOpen] = useState(false);

  return (
    <Reveal className="p-8 space-y-8">
      {/* Project Overview */}
      <OverViewComponent>
        <div className="absolute top-4 right-4 w-20 h-20 rounded-full bg-gradient-to-br from-ctp-blue/20 to-ctp-purple/20 blur-xl" />
        <h2 className="text-2xl font-bold text-white mb-4">Project Overview</h2>
        <p className="text-white/80 text-lg leading-relaxed">
          {project.description}
        </p>
      </OverViewComponent>

      {project.explain && project.explain.length > 0 && (
        <OverViewComponent>
          <div
            className={`w-full p-8 text-left transition-all duration-300 group  flex items-center justify-between`}
          >
            <div className="flex items-center gap-4">
              <div
                className={`p-3 rounded-xl bg-ctp-${theme.main}/20 border border-ctp-${theme.main}/30 group-hover:bg-ctp-${theme.main}/30 transition-colors duration-300`}
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

            <div className="flex items-center gap-3">
              <Button
                className={`px-4 py-2 rounded-xl bg-gradient-to-r from-ctp-${theme.main} to-ctp-${theme.secondary} text-white font-medium text-sm flex items-center gap-2 shadow-lg group-hover:shadow-xl transition-all duration-300`}
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
          </div>

          {/* Collapsible Content */}
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
        </OverViewComponent>
      )}

      {/* Technologies Grid */}
      <OverViewComponent>
        <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
          <Zap className={`w-6 h-6 text-ctp-${theme.main}`} />
          Technology Stack
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {project.technologies.map((tech, index) => (
            <motion.div
              key={tech}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05 }}
              className="group relative"
            >
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
            </motion.div>
          ))}
        </div>
      </OverViewComponent>
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

export default OverviewContent;
