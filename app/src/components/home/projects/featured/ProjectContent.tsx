import { ExternalLink, ArrowRight } from "lucide-react";
import TechBadge from "@/components/base/TechBadge";
import { Button } from "@/components/ui/button";
import { Project } from "@/types";
import { motion } from "framer-motion";
import { FaGithub } from "react-icons/fa";
import React from "react";

interface ProjectContentProps {
  activeTab: "overview" | "features";
  featuredProject: Project;
  handleProjectSelect: (project: Project) => void;
}

/**
 * ProjectContent component displays the content of a featured project.
 * It shows either an overview or a list of features based on the active tab.
 * Additionally, it provides buttons to explore the project, view the source code,
 * and access a live demo if available.
 *
 * @param {Object} props - The component props.
 * @param {"overview" | "features"} props.activeTab - The currently active tab, either "overview" or "features".
 * @param {Project} props.featuredProject - The project object containing details such as description, features, and technologies.
 * @param {function} props.handleProjectSelect - A function to handle the selection of the project, typically to open a modal or navigate to a detailed view.
 *
 * @returns {JSX.Element} The rendered component.
 */
const ProjectContent: React.FC<ProjectContentProps> = ({
  activeTab,
  featuredProject,
  handleProjectSelect,
}) => {
  return (
    <div className="xl:w-1/2 space-y-6">
      {activeTab === "overview" ? (
        <motion.p
          className="text-ctp-text leading-relaxed"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
        >
          {featuredProject.description}
        </motion.p>
      ) : (
        <motion.ul
          className="space-y-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
        >
          {featuredProject.features.map((feature, index) => (
            <motion.li
              key={feature}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                delay: index * 0.1,
                duration: 0.3,
              }}
              className="flex items-start gap-2"
            >
              <span className="text-ctp-peach mt-1">•</span>
              <span className="text-ctp-text">{feature}</span>
            </motion.li>
          ))}
        </motion.ul>
      )}

      <div className="pt-2">
        <h4 className="text-sm text-ctp-subtext0 mb-3">TECHNOLOGIES</h4>
        <div className="flex flex-wrap gap-2">
          {featuredProject.technologies.map((tech, index) => (
            <motion.div
              key={tech}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + index * 0.1 }}
            >
              <TechBadge tech={tech} />
            </motion.div>
          ))}
        </div>
      </div>

      <div className="flex flex-wrap gap-4 pt-4">
        <Button
          onClick={() => handleProjectSelect(featuredProject)}
          className="relative overflow-hidden group bg-gradient-to-r from-ctp-peach to-ctp-maroon text-ctp-crust hover:from-ctp-maroon hover:to-ctp-peach transition-all duration-300"
        >
          <span className="relative z-10 flex items-center gap-2">
            Explore Project
            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
          </span>
          <span className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
        </Button>

        {featuredProject.githubLink !== "private-repository" && (
          <Button
            variant="outline"
            className="border-ctp-surface0 hover:border-ctp-blue bg-transparent"
            onClick={() => window.open(featuredProject.githubLink, "_blank")}
          >
            <FaGithub className="mr-2" />
            Source Code
          </Button>
        )}

        {featuredProject.liveLink && (
          <Button
            variant="outline"
            className="border-ctp-surface0 hover:border-ctp-green bg-transparent"
            onClick={() => window.open(featuredProject.liveLink, "_blank")}
          >
            <ExternalLink className="mr-2 w-4 h-4" />
            Live Demo
          </Button>
        )}
      </div>
    </div>
  );
};

export default ProjectContent;
