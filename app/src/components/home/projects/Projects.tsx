import React, { useState, useCallback, memo, useRef } from "react";
import ProjectCard from "./ProjectCard";
import Section from "@/components/base/Section";
import projects from "./data";
import anime from "animejs";
import { Project } from "@/types";
import ProjectTab from "./ProjectTab";

const ProjectsComponent: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState(projects[0]);
  const cardContainerRef = useRef<HTMLDivElement>(null);

  const handleProjectSelect = useCallback(
    (project: Project) => (e: React.MouseEvent) => {
      e.preventDefault();

      if (cardContainerRef.current) {
        anime({
          targets: cardContainerRef.current,
          opacity: [1, 0],
          translateY: [0, 20],
          duration: 300,
          easing: "easeOutCubic",
          complete: () => {
            setSelectedProject(project);
            anime({
              targets: cardContainerRef.current,
              opacity: [0, 1],
              translateY: [20, 0],
              duration: 300,
              easing: "easeOutCubic",
            });
          },
        });
      }
    },
    []
  );

  return (
    <Section id="projects" label="Projects">
      <div className="flex flex-col md:flex-row gap-8 max-w-6xl mx-auto">
        {/* Left side - Project tabs */}
        <div className="md:w-1/3">
          <div className="space-y-4 sticky top-24 max-h-[70vh] overflow-y-auto scrollbar-hide">
            <div className="flex flex-col gap-4 pr-4">
              {projects.map((project) => (
                <ProjectTab
                  key={project.name}
                  project={project}
                  isSelected={selectedProject.name === project.name}
                  onSelect={handleProjectSelect}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Right side - Selected project card */}
        <div className="md:w-2/3" ref={cardContainerRef}>
          <ProjectCard key={selectedProject.name} project={selectedProject} />
        </div>
      </div>
    </Section>
  );
};

const Projects = memo(ProjectsComponent);

export default Projects;
