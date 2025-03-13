import React, { useState, useCallback, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Section from "@/components/section/Section";
import projects from "./data";
import type { Project } from "@/types";
import OutlineNode from "../editor/outline/OutlineNode";
import { Sparkles, Code, Globe, ArrowUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import ProjectModal from "./ProjectModal";
import FeaturedProject from "./FeaturedProject";
import ProjectSmall from "./ProjectSmall";

const [featuredProject, ...otherProjects] = projects;

const Projects: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [visibleCount, setVisibleCount] = useState(6);
  const projectsRef = useRef<HTMLDivElement>(null);

  const handleProjectSelect = useCallback((project: Project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  }, []);

  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({
      top: projectsRef.current?.offsetTop ?? 0,
      behavior: "smooth",
    });
  };

  // Check if scroll is beyond a threshold to show scroll-to-top button
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const projectsEl = projectsRef.current;
      if (projectsEl) {
        const scrollPosition = window.scrollY;
        const projectsPosition = projectsEl.offsetTop;
        setShowScrollTop(scrollPosition > projectsPosition + 600);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Load more projects
  const loadMore = () => {
    setVisibleCount((prev) => Math.min(prev + 6, otherProjects.length));
  };

  return (
    <Section id="projects" label="Projects" icon="code" glowAccent="blue">
      <div ref={projectsRef} className="relative max-w-6xl mx-auto px-4 py-8">
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

        <OutlineNode
          id="project-gallery"
          label="Project Gallery"
          level={1}
          parentId="projects"
          icon={<Code className="w-3 h-3 text-ctp-green" />}
        >
          <div>
            <div className="sticky top-0 z-20 bg-ctp-mantle/80 backdrop-blur-md py-4 border-b border-ctp-surface0 mb-8">
              <div className="flex flex-col md:flex-row md:items-center gap-4 px-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-ctp-green to-ctp-teal flex items-center justify-center">
                    <Globe className="w-4 h-4 text-ctp-crust" />
                  </div>
                  <h3 className="text-xl text-ctp-green font-medium">
                    Project Gallery
                  </h3>
                </div>
              </div>
            </div>

            {/* Project grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {otherProjects.slice(0, visibleCount).map((project, index) => (
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
                    index={index}
                  />
                </OutlineNode>
              ))}
            </div>

            {visibleCount < otherProjects.length && (
              <div className="flex justify-center mt-12">
                <Button
                  onClick={loadMore}
                  variant="outline"
                  className="border-ctp-blue/30 hover:border-ctp-blue/50 bg-ctp-blue/5 hover:bg-ctp-blue/10 text-ctp-blue px-6"
                >
                  Load more projects ({otherProjects.length - visibleCount}{" "}
                  remaining)
                </Button>
              </div>
            )}
          </div>
        </OutlineNode>

        {/* Scroll to top button */}
        <AnimatePresence>
          {showScrollTop && (
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="fixed bottom-8 right-8 z-40 p-3 rounded-full bg-ctp-blue text-ctp-mantle shadow-lg hover:bg-ctp-lavender transition-colors"
              onClick={scrollToTop}
            >
              <ArrowUp size={20} />
            </motion.button>
          )}
        </AnimatePresence>

        {/* Project modal */}
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
