import React from "react";
import ProjectCard from "./ProjectCard";
import Section from "@/components/base/Section";
import projects from "./data";

const Projects: React.FC = () => {
  return (
    <Section id="projects" label="Projects">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <ProjectCard key={project.name} project={project} />
        ))}
      </div>
    </Section>
  );
};

export default Projects;
