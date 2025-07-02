import { motion, AnimatePresence } from "framer-motion";
import type { ProjectTheme } from "@/components/home/portfolio/projects/context/ThemeContext";
import type { Project } from "@/types";
import { Brain, Lightbulb, X } from "lucide-react";
import { useState } from "react";
import ExplainItToMe from "../../explain-to-me/ExplainItToMe";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

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
    <Collapsible>
      <div
        className={`w-full text-left transition-all duration-300 group/explain flex flex-col sm:flex-row sm:items-center justify-between gap-4`}
      >
        <div className="flex items-center gap-3 sm:gap-4">
          <div
            className={`p-2 sm:p-3 rounded-lg sm:rounded-xl bg-ctp-${theme.main}/20 border border-ctp-${theme.main}/30 group-hover/explain:bg-ctp-${theme.main}/30 transition-colors duration-300 flex-shrink-0`}
          >
            <Lightbulb
              className={`w-5 h-5 sm:w-6 sm:h-6 text-ctp-${theme.main}`}
            />
          </div>
          <div className="min-w-0 flex-1">
            <h3 className="text-lg sm:text-xl font-bold text-white mb-1 group-hover:text-white transition-colors">
              Why I Built This
            </h3>
            <p className="text-white/60 text-xs sm:text-sm leading-tight">
              Deep dive into the motivation and technical decisions
            </p>
          </div>
        </div>

        <CollapsibleTrigger asChild>
          <div className="flex items-center gap-3 justify-end sm:justify-start">
            <Button
              className={cn(
                `px-3 py-2 sm:px-4 sm:py-2 rounded-lg sm:rounded-xl bg-gradient-to-r from-ctp-${theme.main}/20 to-ctp-${theme.secondary}/80 text-white font-medium text-xs sm:text-sm flex items-center gap-2 shadow-2xl flex-shrink-0`,
                `hover:shadow-ctp-${theme.main} hover:shadow-xl hover:scale-105 hover:rotate-1 transition-all duration-300`,
                isExplainOpen &&
                  `bg-gradient-to-r from-ctp-${theme.main}/20 to-ctp-${theme.secondary}/80`
              )}
              onClick={() => setIsExplainOpen(!isExplainOpen)}
            >
              {isExplainOpen ? (
                <X className="w-3 h-3 sm:w-4 sm:h-4" />
              ) : (
                <Brain className="w-3 h-3 sm:w-4 sm:h-4" />
              )}
              <span className="hidden xs:inline">
                {isExplainOpen ? "Close" : "Explain It To Me"}
              </span>
              <span className="xs:hidden">
                {isExplainOpen ? "Close" : "Explain"}
              </span>
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
              className="overflow-hidden p-4 sm:p-6 md:p-8"
            >
              <ExplainItToMe project={project} />
            </motion.div>
          )}
        </AnimatePresence>
      </CollapsibleContent>
    </Collapsible>
  );
};

export default ProjectExplainCollapsible;
