import { motion, MotionValue } from "framer-motion";

import { ProjectTheme } from "@/components/home/projects/context/ThemeContext";
import type { Project } from "@/types";
import { Zap, Sparkles } from "lucide-react";
import { technologies } from "@/components/base/technologies";

interface OverviewContentProps {
  project: Project;
  theme: ProjectTheme;
  y1: MotionValue<number>;
  y2: MotionValue<number>;
}

const OverviewContent: React.FC<OverviewContentProps> = ({
  project,
  theme,
  y1,
  y2,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="p-8 space-y-8"
    >
      {/* Hero Section */}
      <motion.div
        style={{ y: y1 }}
        className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md border border-white/20 p-8"
      >
        <div className="absolute top-4 right-4 w-20 h-20 rounded-full bg-gradient-to-br from-ctp-blue/20 to-ctp-purple/20 blur-xl" />
        <h2 className="text-3xl font-bold text-white mb-4">Project Overview</h2>
        <p className="text-white/80 text-lg leading-relaxed">
          {project.description}
        </p>
      </motion.div>

      {/* Technologies Grid */}
      <motion.div
        style={{ y: y2 }}
        className="rounded-3xl overflow-hidden bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-md border border-white/20 p-8"
      >
        <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
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
                    className={`w-12 h-12 mx-auto mb-3 rounded-xl bg-ctp-${theme.main}/20 flex items-center justify-center`}
                  >
                    <span className="text-lg font-bold text-white">
                      {technologies[tech].name.charAt(0)}
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
      </motion.div>

      {/* Highlights */}
      {project.highlights && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="rounded-3xl overflow-hidden bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md border border-white/20 p-8"
        >
          <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
            <Sparkles className={`w-6 h-6 text-ctp-${theme.main}`} />
            Highlights
          </h3>
          <div className="space-y-4">
            {project.highlights.map((highlight, index) => (
              <motion.div
                key={highlight}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 + index * 0.1 }}
                className="flex items-start gap-4"
              >
                <div
                  className={`w-2 h-2 rounded-full bg-ctp-${theme.main} mt-3 flex-shrink-0`}
                />
                <p className="text-white/80 leading-relaxed">{highlight}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default OverviewContent;
