import React from "react";
import { ArrowRight, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import type { Project } from "@/types";

interface FeaturedProjectProps {
  featuredProject: Project;
  handleProjectSelect: (project: Project) => void;
}

const FeaturedProject: React.FC<FeaturedProjectProps> = ({
  featuredProject,
  handleProjectSelect,
}) => {
  return (
    <div className="mb-12 max-w-6xl mx-auto">
      <div className="flex items-center gap-3 mb-6">
        <Sparkles className="w-5 h-5 text-ctp-peach" />
        <h3 className="text-xl text-ctp-peach font-medium">Featured Project</h3>
        <div className="h-px flex-grow bg-gradient-to-r from-ctp-peach/40 to-transparent" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="p-0.5 bg-gradient-to-r from-ctp-peach/50 via-ctp-mauve/30 to-ctp-blue/30 rounded-xl"
      >
        <div className="bg-gradient-to-r from-ctp-crust to-ctp-mantle p-6 rounded-lg">
          <div className="flex flex-col md:flex-row gap-6 items-center">
            <div className="md:w-1/2">
              <h4 className="text-2xl font-bold text-ctp-text mb-3">
                {featuredProject.name}
              </h4>
              <p className="text-ctp-subtext0 mb-4">
                {featuredProject.description}
              </p>
              <div className="flex flex-wrap gap-2 mb-4">
                {featuredProject.technologies.slice(0, 4).map((tech) => (
                  <span
                    key={tech.name}
                    className="text-xs px-3 py-1 rounded-full bg-ctp-surface0 text-ctp-blue"
                  >
                    {tech.name}
                  </span>
                ))}
              </div>
              <button
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-ctp-surface0 text-ctp-blue hover:bg-ctp-surface1 transition-colors"
                onClick={() => handleProjectSelect(featuredProject)}
              >
                <span>View Details</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* Certificate image on the right side */}
            <div className="md:w-1/2 flex justify-center">
              <div className="relative overflow-hidden rounded-lg shadow-xl">
                <img
                  src="skoda-certificate.jpg"
                  alt={`${featuredProject.name} Certificate`}
                  className="w-full h-auto object-contain rounded-lg border-2 border-ctp-blue/20"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-ctp-peach/5 to-ctp-blue/5 pointer-events-none"></div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default FeaturedProject;
