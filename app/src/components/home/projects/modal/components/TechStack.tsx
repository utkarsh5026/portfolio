import type { Project } from "@/types";
import { motion } from "framer-motion";
import type { ProjectTheme } from "@/components/home/projects/context/ThemeContext";
import { Layers } from "lucide-react";
import { technologies } from "@/components/base/technologies";

interface TechStackProps {
  project: Project;
  theme: ProjectTheme;
}

const TechStack: React.FC<TechStackProps> = ({ project, theme }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="p-8"
    >
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-white mb-2">Technology Stack</h2>
        <p className="text-white/60">
          The tools and technologies powering this project
        </p>
      </div>

      {project.techStack ? (
        <div className="space-y-8">
          {Object.entries(project.techStack).map(
            ([category, technologies], categoryIndex) => (
              <motion.div
                key={category}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: categoryIndex * 0.1 }}
                className="rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 p-6"
              >
                <h3
                  className={`text-xl font-bold text-ctp-${theme.main} mb-4 flex items-center gap-3`}
                >
                  <Layers className="w-5 h-5" />
                  {category}
                </h3>
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
                        <div className="font-medium text-white mb-1">
                          {name}
                        </div>
                        {description && (
                          <div className="text-sm text-white/60">
                            {description}
                          </div>
                        )}
                      </motion.div>
                    );
                  })}
                </div>
              </motion.div>
            )
          )}
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {project.technologies.map((tech, index) => (
            <motion.div
              key={tech}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05 }}
              className="p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all duration-300 text-center group"
              whileHover={{ scale: 1.05, y: -4 }}
            >
              <div
                className={`w-16 h-16 mx-auto mb-4 rounded-2xl bg-ctp-${theme.main}/20 flex items-center justify-center group-hover:bg-ctp-${theme.main}/30 transition-colors`}
              >
                <span className="text-xl font-bold text-white">
                  {technologies[tech].name.charAt(0)}
                </span>
              </div>
              <div className="text-white font-medium group-hover:text-white transition-colors">
                {technologies[tech].name}
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </motion.div>
  );
};

export default TechStack;
