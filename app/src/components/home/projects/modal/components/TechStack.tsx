import type { Project } from "@/types";
import { motion } from "framer-motion";
import type { ProjectTheme } from "@/components/home/projects/context/ThemeContext";
import { ChevronDown, ChevronUp, Layers } from "lucide-react";
import Reveal from "@/components/animations/reveal/Reveal";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface TechStackProps {
  project: Project;
  theme: ProjectTheme;
}

const TechStack: React.FC<TechStackProps> = ({ project, theme }) => {
  return (
    <Reveal className="p-8">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-white mb-2">Technology Stack</h2>
        <p className="text-white/60">
          The tools and technologies powering this project
        </p>
      </div>

      {project.techStack && (
        <div className="space-y-8">
          {Object.entries(project.techStack).map(
            ([category, technologies], categoryIndex) => (
              <Reveal key={category}>
                <TechStackItem
                  category={category}
                  technologies={technologies}
                  theme={theme}
                  categoryIndex={categoryIndex}
                />
              </Reveal>
            )
          )}
        </div>
      )}
    </Reveal>
  );
};

interface TechStackItemProps {
  category: string;
  technologies: string[];
  theme: ProjectTheme;
  categoryIndex: number;
}
const TechStackItem: React.FC<TechStackItemProps> = ({
  category,
  technologies,
  theme,
  categoryIndex,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Collapsible open={isOpen}>
      <div className="rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 p-6">
        <div className="flex items-center justify-between">
          <h3
            className={`text-xl font-bold text-ctp-${theme.main} mb-4 flex items-center gap-3`}
          >
            <Layers className="w-5 h-5" />
            {category}
          </h3>

          <CollapsibleTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? (
                <ChevronUp className="w-4 h-4" />
              ) : (
                <ChevronDown className="w-4 h-4" />
              )}
            </Button>
          </CollapsibleTrigger>
        </div>
        <CollapsibleContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {technologies.map((tech, techIndex) => {
              const [name, description] = tech.includes(" - ")
                ? tech.split(" - ")
                : [tech, ""];
              return (
                <motion.div
                  key={tech}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{
                    delay: 0.1 + categoryIndex * 0.05 + techIndex * 0.02,
                  }}
                  className="p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-all duration-300"
                >
                  <div className="font-medium text-white mb-1">{name}</div>
                  {description && (
                    <div className="text-sm text-white/60">{description}</div>
                  )}
                </motion.div>
              );
            })}
          </div>
        </CollapsibleContent>
      </div>
    </Collapsible>
  );
};

export default TechStack;
