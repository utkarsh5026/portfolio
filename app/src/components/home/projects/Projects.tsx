import React, { useCallback, useRef, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Section from "@/components/section/Section";
import OutlineNode from "@/components/home/editor/outline/OutlineNode";
import { Sparkles, Code, Globe, ArrowUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ProjectModal from "./modal/ProjectModal";
import FeaturedProject from "./featured/FeaturedProject";
import ProjectSmall from "./ProjectSmall";
import { ProjectThemeProvider } from "./context/ProjectThemeProvider";
import { useProject } from "@/hooks/use-project";
import type { Project } from "@/types";
import Reveal from "@/components/animations/reveal/Reveal";

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
            {error ?? "Failed to load projects data"}
          </div>
        </div>
      </Section>
    );
  }

  return (
    <Section id="projects" label="Projects" icon="code">
      <ProjectThemeProvider>
        <div ref={projectsRef} className="relative max-w-6xl mx-auto px-4 py-8">
          <Reveal effect="fade-up" duration={0.7} delay={0.1}>
            <Tabs defaultValue="featured" className="w-full">
              <div className="w-full flex justify-end">
                <TabsList className="mb-8 bg-ctp-surface0/30 backdrop-blur-md border border-ctp-surface0 p-1 rounded-lg">
                  <TabsTrigger
                    value="featured"
                    className="flex-1 data-[state=active]:bg-ctp-peach/20 data-[state=active]:text-ctp-peach"
                  >
                    <Sparkles className="w-4 h-4 mr-2" />
                    <span className="hidden md:block">Featured Project</span>
                    <span className="block md:hidden">Featured</span>
                  </TabsTrigger>
                  <TabsTrigger
                    value="gallery"
                    className="flex-1 data-[state=active]:bg-ctp-green/20 data-[state=active]:text-ctp-green"
                  >
                    <Code className="w-4 h-4 mr-2" />
                    <span className="hidden md:block">Project Gallery</span>
                    <span className="block md:hidden">Gallery</span>
                  </TabsTrigger>
                </TabsList>
              </div>

              <TabsContent
                value="featured"
                className="focus-visible:outline-none"
              >
                <OutlineNode
                  id="featured-project"
                  label="Featured Project"
                  level={1}
                  parentId="projects"
                  icon={<Sparkles className="w-3 h-3 text-ctp-lavender" />}
                >
                  <Reveal
                    effect="fade-up"
                    duration={0.8}
                    delay={0.1}
                    className="w-full h-full flex flex-1"
                  >
                    <FeaturedProject
                      featuredProject={featuredProject}
                      handleProjectSelect={handleProjectSelect}
                    />
                  </Reveal>
                </OutlineNode>
              </TabsContent>

              <TabsContent
                value="gallery"
                className="focus-visible:outline-none"
              >
                <OutlineNode
                  id="project-gallery"
                  label="Project Gallery"
                  level={1}
                  parentId="projects"
                  icon={<Code className="w-3 h-3 text-ctp-green" />}
                >
                  <div>
                    <Reveal effect="fade-up" duration={0.7}>
                      <div className="sticky top-0 z-20 bg-ctp-mantle/80 backdrop-blur-md py-4 border-b border-ctp-surface0 mb-8 rounded-t-lg">
                        <div className="flex flex-col md:flex-row md:items-center gap-4 px-4">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-ctp-green to-ctp-teal flex items-center justify-center shadow-md shadow-ctp-green/10">
                              <Globe className="w-5 h-5 text-ctp-crust" />
                            </div>
                            <h3 className="text-xl font-semibold bg-gradient-to-r from-ctp-green to-ctp-teal text-transparent bg-clip-text">
                              Project Gallery
                            </h3>
                          </div>
                        </div>
                      </div>
                    </Reveal>

                    {/* Project grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                      {otherProjects
                        .slice(0, visibleCount)
                        .map((project, index) => (
                          <OutlineNode
                            key={project.name}
                            id={`project-${project.name}`}
                            label={project.name}
                            level={2}
                            parentId="project-gallery"
                          >
                            <Reveal
                              effect="fade-up"
                              duration={0.7}
                              delay={0.1 * (index % 3)}
                              staggerChildren={0.1}
                              className="w-full h-full flex flex-1"
                            >
                              <ProjectSmall
                                project={project}
                                handleProjectSelect={handleProjectSelect}
                                index={index}
                              />
                            </Reveal>
                          </OutlineNode>
                        ))}
                    </div>

                    {visibleCount < otherProjects.length && (
                      <Reveal effect="fade-up" duration={0.7} delay={0.3}>
                        <div className="flex justify-center mt-12">
                          <Button
                            onClick={loadMore}
                            variant="outline"
                            className="border-ctp-green/30 hover:border-ctp-green/50 bg-ctp-green/5 hover:bg-ctp-green/10 text-ctp-green px-6 py-6 text-base"
                          >
                            Load more projects (
                            {otherProjects.length - visibleCount} remaining)
                          </Button>
                        </div>
                      </Reveal>
                    )}
                  </div>
                </OutlineNode>
              </TabsContent>
            </Tabs>
          </Reveal>

          {/* Scroll to top button - Made mobile friendly with larger touch target */}
          <AnimatePresence>
            {showScrollTop && (
              <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                className="fixed bottom-6 right-6 z-40 p-4 rounded-full bg-ctp-blue/90 text-ctp-mantle shadow-lg hover:bg-ctp-lavender transition-colors backdrop-blur-sm border border-ctp-blue/20"
                onClick={scrollToTop}
                aria-label="Scroll to top"
              >
                <ArrowUp size={24} />
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
