import { motion } from "framer-motion";
import type { ProjectTheme } from "@/components/home/projects/context/ThemeContext";
import type { Project } from "@/types";

interface FeaturesContentProps {
  project: Project;
  theme: ProjectTheme;
}

const FeaturesContent: React.FC<FeaturesContentProps> = ({
  project,
  theme,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="p-8"
    >
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-white mb-2">Key Features</h2>
        <p className="text-white/60">Explore what makes this project special</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {project.features.map((feature, index) => (
          <motion.div
            key={feature}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="group relative p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all duration-300"
            whileHover={{ scale: 1.02, y: -4 }}
          >
            <div className="flex items-start gap-4">
              <div
                className={`w-3 h-3 rounded-full bg-ctp-${theme.main} mt-2 flex-shrink-0 group-hover:scale-125 transition-transform`}
              />
              <p className="text-white/90 leading-relaxed group-hover:text-white transition-colors">
                {feature}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default FeaturesContent;
