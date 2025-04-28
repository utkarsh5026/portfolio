import React, { useCallback, useRef, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Section from "@/components/section/Section";
import OutlineNode from "../editor/outline/OutlineNode";
import { Sparkles, Code, Globe, ArrowUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import ProjectModal from "./modal/ProjectModal";
import FeaturedProject from "./featured/FeaturedProject";
import ProjectSmall from "./ProjectSmall";
import { ProjectThemeProvider } from "./context/ProjectThemeProvider";
import { useProject } from "@/hooks/use-project";
import type { Project } from "@/types";

const Projects: React.FC = () => {
  const {
    featuredProject,
    otherProjects,
    isLoading,
    error,
    selectProject,
    selectedProject,
  } = useProject();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [visibleCount, setVisibleCount] = useState(6);
  const projectsRef = useRef<HTMLDivElement>(null);
  const [showScrollTop, setShowScrollTop] = useState(false);

  const handleProjectSelect = useCallback(
    (project: Project) => {
      selectProject(project);
      setIsModalOpen(true);
    },
    [selectProject]
  );

  // Close modal handler
  const handleCloseModal = useCallback(() => {
    setIsModalOpen(false);
    // Optional: delay clearing the selected project for smooth animation
    setTimeout(() => selectProject(null), 300);
  }, [selectProject]);

  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({
      top: projectsRef.current?.offsetTop ?? 0,
      behavior: "smooth",
    });
  };

  // Detect scroll position to show/hide scroll-to-top button
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

  // Load more projects handler
  const loadMore = () => {
    setVisibleCount((prev) => Math.min(prev + 6, otherProjects.length));
  };

  // Handle loading state
  if (isLoading) {
    return (
      <Section id="projects" label="Projects" icon="code">
        <div className="flex justify-center items-center h-64">
          <div className="text-ctp-text">Loading projects...</div>
        </div>
      </Section>
    );
  }

  // Handle error state
  if (error || !featuredProject) {
    return (
      <Section id="projects" label="Projects" icon="code">
        <div className="flex justify-center items-center h-64">
          <div className="text-ctp-red">
            {error || "Failed to load projects data"}
          </div>
        </div>
      </Section>
    );
  }

  return (
    <Section id="projects" label="Projects" icon="code">
      <ProjectThemeProvider>
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
            closeModal={handleCloseModal}
          />
        </div>
      </ProjectThemeProvider>
    </Section>
  );
};

export default Projects;
