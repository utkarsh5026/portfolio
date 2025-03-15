import React from "react";
import { motion } from "framer-motion";
import { Layers } from "lucide-react";

interface TechStackDisplayProps {
  techStack: Record<string, string[]>;
  theme: { main: string; secondary: string };
}

const TechStackDisplay: React.FC<TechStackDisplayProps> = ({
  techStack,
  theme,
}) => {
  const extractTechName = (description: string) => {
    const endIndex = description.indexOf(" -");
    return endIndex > 0 ? description.substring(0, endIndex) : description;
  };

  return (
    <div className="space-y-8">
      {Object.entries(techStack).map(([category, technologies], index) => (
        <motion.div
          key={category}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: index * 0.1 }}
          className="group"
        >
          {/* Simple category header */}
          <div className="my-3 flex items-center gap-2 ml-4">
            <div className={`p-1.5 rounded-md bg-ctp-${theme.main}/10`}>
              <Layers className={`w-4 h-4 text-ctp-${theme.main}`} />
            </div>
            <h3 className={`text-lg font-semibold text-ctp-${theme.main}`}>
              {category}
            </h3>
          </div>

          {/* Tech items in a simple list */}
          <div className="ml-8 grid md:grid-cols-2 gap-2">
            {technologies.map((tech, techIndex) => {
              const techName = extractTechName(tech);

              return (
                <motion.div
                  key={`${category}-${techIndex}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.1 + index * 0.05 + techIndex * 0.02 }}
                  className="flex items-start gap-2.5 group/tech"
                >
                  <div
                    className={`w-1.5 h-1.5 rounded-full bg-ctp-${theme.main} mt-2 flex-shrink-0`}
                  />

                  <div>
                    <span className="font-medium text-ctp-text">
                      {techName}
                    </span>

                    {/* Tech description in lighter text */}
                    {tech.includes(" - ") && (
                      <p className="text-sm text-ctp-subtext0">
                        {tech.substring(tech.indexOf(" - ") + 3)}
                      </p>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Simple separator */}
          {index < Object.keys(techStack).length - 1 && (
            <div className="h-px w-full bg-ctp-surface0/50 my-6" />
          )}
        </motion.div>
      ))}
    </div>
  );
};

export default TechStackDisplay;
