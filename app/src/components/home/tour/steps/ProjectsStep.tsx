import React, { useState, useEffect } from "react";
import TypeWriter from "../writer/TypeWriter";
import Step from "./Step";
import { projects } from "@/components/home/projects/data";
import type { Project } from "@/types";
import CodeTypeWriter from "../writer/JsTypeWriter";

const usedProjects = projects.slice(0, 4);

const prepareCodeText = (project: Project) => {
  return `
  const project = {
    name: "${project.name}",
    technologies: ["${project.tags?.join('", "')}"],
    highlights: ["${project.features?.join('",\n"')}"],
  };
  `;
};

type ProjectName = (typeof usedProjects)[number]["name"];

const ProjectsStep: React.FC = () => {
  const [typingComplete, setTypingComplete] = useState(false);
  const [selectedProject, setSelectedProject] = useState<ProjectName | null>(
    null
  );

  const currentProject = projects.find(
    (project) => project.name === selectedProject
  );

  useEffect(() => {
    return () => {
      const projectsSection = document.querySelector(".projects-section");
      if (projectsSection) {
        projectsSection.classList.remove("tour-highlight");
      }

      document.querySelectorAll(".project-highlight").forEach((el) => {
        el.classList.remove("project-highlight");
      });
    };
  }, []);

  const handleProjectSelect = (project: string) => {
    setSelectedProject(project);
  };

  return (
    <Step
      section="projects"
      title="Projects"
      onTitleComplete={() => setTypingComplete(true)}
    >
      {typingComplete && (
        <>
          <div className="tour-message">
            <TypeWriter
              text="Here are some of the projects I've built. Each one represents a unique challenge and learning experience."
              speed={20}
              delay={300}
            />
          </div>

          <div className="tour-interactive">
            <p>Select a project to learn more:</p>
            <div className="flex gap-2 flex-wrap mt-2">
              {usedProjects.map((project) => (
                <button
                  key={project.name}
                  className={`tour-demo-button font-mono ${
                    selectedProject === project.name ? "active-project" : ""
                  }`}
                  onClick={() => handleProjectSelect(project.name)}
                >
                  {project.name}
                </button>
              ))}
            </div>
          </div>

          {selectedProject && currentProject && (
            <div className="selected-project-info animate-fade-in code-block">
              <CodeTypeWriter
                code={prepareCodeText(currentProject)}
                speed={5}
              />

              <div className="tour-project-cta mt-4">
                <TypeWriter
                  text="Click on the project card to see more details and visit the live demo!"
                  speed={25}
                  delay={500}
                />
              </div>
            </div>
          )}
        </>
      )}
    </Step>
  );
};

export default ProjectsStep;
