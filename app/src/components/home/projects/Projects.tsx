import React, { useState } from "react";
import ProjectCard from "./ProjectCard";
import Section from "@/components/base/Section";
import projects from "./data";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const Projects: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState(projects[0]);

  // Prevent event bubbling and ensure state updates
  const handleProjectSelect =
    (project: (typeof projects)[0]) => (e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setSelectedProject(project);
    };

  return (
    <Section id="projects" label="Projects">
      <div className="flex flex-col md:flex-row gap-6">
        {/* Left side - Project tabs */}
        <div className="md:w-1/3 flex flex-col gap-2">
          {projects.map((project) => (
            <Button
              key={project.name}
              onClick={handleProjectSelect(project)}
              type="button"
              variant="ghost"
              className={cn(
                "w-full justify-start px-4 py-6 text-left transition-all duration-300",
                "hover:bg-gradient-to-r hover:from-purple-500/10 hover:to-blue-500/10",
                "border border-transparent group relative z-10",
                selectedProject.name === project.name
                  ? "bg-gradient-to-r from-purple-500/20 to-blue-500/20 border-purple-500/50"
                  : "hover:border-purple-500/30"
              )}
            >
              <span className="font-semibold text-base truncate block w-full group-hover:text-primary">
                {project.name}
              </span>
            </Button>
          ))}
        </div>

        {/* Right side - Selected project card */}
        <div className="md:w-2/3">
          <ProjectCard key={selectedProject.name} project={selectedProject} />
        </div>
      </div>
    </Section>
  );
};

export default Projects;
