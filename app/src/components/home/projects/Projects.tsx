import React, { useState } from "react";
import ProjectCard from "./ProjectCard";
import Section from "@/components/base/Section";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import projects from "./data";

const Projects: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const categories = ["All", "Web", "Mobile", "Backend", "DevOps", "AI/ML"];

  return (
    <Section id="projects" label="Projects">
      {/* Category Filter */}
      <div className="flex flex-wrap gap-4 mb-8 justify-center">
        {categories.map((category) => (
          <Button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={cn(
              "px-4 py-2 rounded-full transition-all duration-300",
              selectedCategory === category
                ? "bg-primary text-white shadow-lg scale-105"
                : "bg-secondary hover:bg-primary/10"
            )}
          >
            {category}
          </Button>
        ))}
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects
          .filter(
            (project) =>
              selectedCategory === "All" ||
              project.category === selectedCategory
          )
          .map((project) => (
            <ProjectCard key={project.name} project={project} />
          ))}
      </div>
    </Section>
  );
};

export default Projects;
