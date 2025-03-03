import React, { useState, useCallback, memo, useRef, useEffect } from "react";
import ProjectCard from "./ProjectCard";
import Section from "@/components/base/Section";
import projects from "./data";
import anime from "animejs";
import { Project } from "@/types";
import ProjectTab from "./ProjectTab";
import { motion, AnimatePresence } from "framer-motion";
import "./style.css";
import FeaturedProject from "./FeaturedProject";

const ProjectsComponent: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState(projects[0]);
  const [isPreviewing, setIsPreviewing] = useState(false);
  const [previewProject, setPreviewProject] = useState<Project | null>(null);
  const cardContainerRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

  // Animation for background patterns
  useEffect(() => {
    if (!sectionRef.current) return;

    const particles = sectionRef.current.querySelectorAll(".particle");

    particles.forEach((particle) => {
      anime({
        targets: particle,
        translateX: () => anime.random(-20, 20),
        translateY: () => anime.random(-20, 20),
        opacity: [0.3, 0.8, 0.3],
        easing: "easeInOutSine",
        duration: () => anime.random(4000, 8000),
        loop: true,
        direction: "alternate",
      });
    });
  }, []);

  const handleProjectSelect = useCallback(
    (project: Project) => (e: React.MouseEvent) => {
      e.preventDefault();

      if (project.name === selectedProject.name) return;

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
    [selectedProject]
  );

  const handleProjectPreview = (project: Project) => {
    if (project.name === selectedProject.name) return;
    setPreviewProject(project);
    setIsPreviewing(true);
  };

  const handlePreviewEnd = () => {
    setIsPreviewing(false);
    setPreviewProject(null);
  };

  const generateParticles = (count: number) => {
    const particles = [];
    const shapes = ["circle", "triangle", "square", "diamond"];
    const catpColors = [
      "ctp-lavender",
      "ctp-blue",
      "ctp-mauve",
      "ctp-sapphire",
      "ctp-teal",
    ];

    for (let i = 0; i < count; i++) {
      const shape = shapes[Math.floor(Math.random() * shapes.length)];
      const color = catpColors[Math.floor(Math.random() * catpColors.length)];
      const size = 5 + Math.random() * 10;
      const top = Math.random() * 100;
      const left = Math.random() * 100;

      particles.push(
        <div
          key={i}
          className={`particle absolute bg-${color}/20 ${
            shape === "circle"
              ? "rounded-full"
              : shape === "triangle"
              ? "triangle"
              : shape === "diamond"
              ? "diamond"
              : "rounded-sm"
          }`}
          style={{
            width: `${size}px`,
            height: `${size}px`,
            top: `${top}%`,
            left: `${left}%`,
          }}
        />
      );
    }

    return particles;
  };

  const featuredProject = projects[0];

  return (
    <Section id="projects" label="Projects" icon="code" glowAccent="blue">
      <div ref={sectionRef} className="relative mx-auto px-4 overflow-hidden">
        {/* Decorative background elements */}
        <div className="absolute inset-0 overflow-hidden opacity-30 pointer-events-none z-0">
          {generateParticles(20)}

          {/* Subtle grid pattern */}
          <div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: `radial-gradient(circle, var(--ctp-blue) 1px, transparent 1px)`,
              backgroundSize: "30px 30px",
            }}
          />

          {/* Background gradients */}
          <div className="absolute top-1/4 right-1/5 w-64 h-64 bg-ctp-blue/10 rounded-full blur-3xl" />
          <div className="absolute bottom-1/3 left-1/4 w-80 h-80 bg-ctp-lavender/10 rounded-full blur-3xl" />
        </div>

        <FeaturedProject
          featuredProject={featuredProject}
          handleProjectSelect={handleProjectSelect}
        />

        {/* Main projects content */}
        <div className="flex flex-col md:flex-row gap-8 max-w-6xl mx-auto">
          {/* Left side - Project tabs with decoration */}
          <div className="md:w-1/3 relative">
            <div className="absolute -left-4 top-0 bottom-0 w-px bg-gradient-to-b from-ctp-blue/0 via-ctp-blue/20 to-ctp-blue/0"></div>

            <div className="space-y-4 sticky top-24 max-h-[70vh] overflow-y-auto pr-4 scrollbar-hide">
              {/* Project count indicator */}
              <div className="flex items-center gap-2 mb-6 text-ctp-subtext0 text-sm">
                <div className="h-px w-8 bg-ctp-surface1"></div>
                <span>{projects.length} Projects</span>
                <div className="h-px flex-grow bg-ctp-surface1"></div>
              </div>

              <div className="flex flex-col gap-4">
                <AnimatePresence>
                  {projects.map((project) => (
                    <motion.div
                      key={project.name}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      transition={{ duration: 0.3 }}
                      onMouseEnter={() => handleProjectPreview(project)}
                      onMouseLeave={handlePreviewEnd}
                    >
                      <ProjectTab
                        project={project}
                        isSelected={selectedProject.name === project.name}
                        onSelect={handleProjectSelect}
                      />
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </div>
          </div>

          {/* Right side - Selected project card with floating preview */}
          <div className="md:w-2/3 relative" ref={cardContainerRef}>
            {/* Preview overlay that appears on hover */}
            <AnimatePresence>
              {isPreviewing && previewProject && (
                <motion.div
                  className="absolute inset-0 z-10 pointer-events-none"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="relative h-full flex items-center justify-center">
                    <div className="absolute inset-0 bg-ctp-crust/70 backdrop-blur-sm rounded-xl"></div>
                    <div className="relative p-6 text-center">
                      <h3 className="text-xl font-medium text-ctp-lavender mb-2">
                        {previewProject.name}
                      </h3>
                      <p className="text-ctp-subtext0 text-sm mb-3">
                        Click to view detailed information
                      </p>
                      <div className="flex justify-center gap-2">
                        {previewProject.technologies.slice(0, 3).map((tech) => (
                          <span
                            key={tech.name}
                            className="text-xs px-2 py-1 rounded-full bg-ctp-surface0 text-ctp-blue"
                          >
                            {tech.name}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Main project card */}
            <motion.div
              key={selectedProject.name}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="relative z-0"
            >
              <ProjectCard project={selectedProject} />
            </motion.div>

            {/* Subtle ornamental elements */}
            <div className="absolute -bottom-4 right-8 w-12 h-12 flex items-center justify-center rotate-45 opacity-10 pointer-events-none">
              <div className="absolute inset-0 border-2 border-ctp-blue rounded-md"></div>
              <div className="absolute inset-3 border border-ctp-lavender rounded-sm"></div>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
};

const Projects = memo(ProjectsComponent);

export default Projects;
