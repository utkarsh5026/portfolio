import type { Project } from "@/types";
import { motion } from "framer-motion";
import { ArrowUpRight, Lock } from "lucide-react";
import { FaCode, FaGithub, FaInfoCircle, FaLink, FaTags } from "react-icons/fa";
import React from "react";
import { useProjectTheme } from "../context/ThemeContext";
import Container from "./Container";
import TechBadge from "@/components/base/TechBadge";

interface ProjectOverviewProps {
  project: Project;
}

/**
 * ProjectOverview Component
 *
 * This component displays an overview of a project, including its description, technologies used, links, and tags.
 * It utilizes Framer Motion for animations and is styled with Tailwind CSS.
 *
 * Props:
 * - project (Project): The project object containing details to display.
 *
 * State:
 * - theme (Object): The theme object for the project, obtained from the useProjectTheme hook.
 *
 * Usage:
 * <ProjectOverview project={project} />
 */
const ProjectOverview: React.FC<ProjectOverviewProps> = ({ project }) => {
  const { getProjectTheme } = useProjectTheme();
  const theme = getProjectTheme(project);
  return (
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
      <div className="lg:col-span-3 flex flex-col gap-8">
        <Container
          color={theme.main}
          title="Project Overview"
          icon={<FaInfoCircle />}
        >
          <p className="text-ctp-text leading-relaxed">{project.description}</p>
        </Container>

        <Container
          color={theme.secondary}
          title="Technologies Used"
          icon={<FaCode />}
        >
          <div className="flex flex-wrap gap-2">
            {project.technologies.map((tech, index) => (
              <motion.div
                key={tech.name}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + index * 0.1 }}
              >
                <TechBadge tech={tech.name} />
              </motion.div>
            ))}
          </div>
        </Container>
      </div>

      <div className="space-y-6 lg:col-span-2">
        <div className="mt-6 space-y-6">
          <Container color={theme.main} title="Project Links" icon={<FaLink />}>
            <div className="space-y-3 p-2">
              {/* GitHub link */}
              {project.githubLink !== "private-repository" ? (
                <motion.a
                  href={project.githubLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 px-4 py-3 rounded-lg bg-ctp-surface0/50 hover:bg-ctp-surface0 border border-ctp-surface1 transition-all duration-300 hover:translate-y-[-2px] hover:shadow-md group"
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.4, delay: 0.3 }}
                >
                  <FaGithub
                    className={`w-5 h-5 text-ctp-${theme.main} group-hover:scale-110 transition-transform`}
                  />
                  <span className="text-ctp-text font-medium">
                    View Source Code
                  </span>
                  <ArrowUpRight className="w-4 h-4 ml-auto text-ctp-overlay0 group-hover:text-ctp-text group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                </motion.a>
              ) : (
                <motion.div
                  className="flex items-center gap-3 px-4 py-3 rounded-lg bg-ctp-surface0/30 border border-ctp-surface0 text-ctp-subtext0"
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.4, delay: 0.3 }}
                >
                  <Lock className="w-5 h-5" />
                  <span className="font-medium">Private Repository</span>
                </motion.div>
              )}
            </div>
          </Container>
          {project.tags && project.tags.length > 0 && (
            <Container
              color={theme.secondary}
              title="Project Tags"
              icon={<FaTags />}
            >
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag, idx) => (
                  <motion.span
                    key={tag}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{
                      delay: 0.3 + idx * 0.05,
                      duration: 0.3,
                    }}
                    className={`text-sm px-3 py-1 rounded-full 
                                          bg-ctp-surface0 text-ctp-text hover:bg-ctp-surface1 transition-colors cursor-default`}
                  >
                    {tag}
                  </motion.span>
                ))}
              </div>
            </Container>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectOverview;
