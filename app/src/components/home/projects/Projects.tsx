import React, { useState, useCallback } from "react";
import Section from "@/components/section/Section";
import projects from "./data";
import type { Project } from "@/types";
import OutlineNode from "../editor/outline/OutlineNode";
import { Sparkles, Code } from "lucide-react";
import ProjectModal from "./ProjectModal";
import FeaturedProject from "./FeaturedProject";
import ProjectSmall from "./ProjectSmall";

const Projects: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleProjectSelect = useCallback((project: Project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  }, []);

  const featuredProject = projects[0];

  return (
    <Section id="projects" label="Projects" icon="code" glowAccent="blue">
      <div className="relative max-w-6xl mx-auto px-4 py-8">
        <div className="absolute inset-0 overflow-hidden opacity-30 pointer-events-none z-0">
          <div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: `radial-gradient(circle, var(--ctp-blue) 1px, transparent 1px)`,
              backgroundSize: "30px 30px",
            }}
          />
          <div className="absolute top-1/4 right-1/5 w-64 h-64 bg-ctp-blue/10 rounded-full blur-3xl particle" />
          <div className="absolute bottom-1/3 left-1/4 w-80 h-80 bg-ctp-lavender/10 rounded-full blur-3xl particle" />
          <div className="absolute top-2/3 right-1/3 w-56 h-56 bg-ctp-sapphire/10 rounded-full blur-3xl particle" />
        </div>

        <OutlineNode
          id="featured-project"
          label="Featured Project"
          level={1}
          parentId="projects"
          icon={<Sparkles className="w-3 h-3 text-ctp-lavender" />}
        >
          <FeaturedProject
            featuredProject={featuredProject}
            handleProjectSelect={handleProjectSelect}
          />
        </OutlineNode>

        {/* Project Gallery */}
        <OutlineNode
          id="project-gallery"
          label="Project Gallery"
          level={1}
          parentId="projects"
          icon={<Code className="w-3 h-3 text-ctp-green" />}
        >
          <div>
            <div className="flex items-center gap-3 mb-8">
              <h3 className="text-xl text-ctp-green font-medium flex items-center gap-2">
                <Code className="w-5 h-5" />
                Project Gallery
              </h3>
              <div className="h-px flex-grow bg-gradient-to-r from-ctp-green/40 to-transparent" />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((project) => (
                <OutlineNode
                  key={project.name}
                  id={`project-${project.name}`}
                  label={project.name}
                  level={2}
                  parentId="project-gallery"
                >
                  <ProjectSmall
                    project={project}
                    handleProjectSelect={handleProjectSelect}
                  />
                </OutlineNode>
              ))}
            </div>
          </div>
        </OutlineNode>

        <ProjectModal
          isModalOpen={isModalOpen}
          selectedProject={selectedProject}
          closeModal={() => setIsModalOpen(false)}
        />
      </div>
    </Section>
  );
};

export default Projects;
