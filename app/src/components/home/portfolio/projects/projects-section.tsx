import React, { useCallback, useRef, useState } from "react";
import Section from "@/components/section/portfolio-section";
import { OutlineNode } from "@/components/home/editor/outline";
import { Sparkles, Code, Globe, Folder } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ProjectDrawer from "./modal/project-drawer";
import FeaturedProject from "./featured/featured-project";
import ProjectSmall from "./project-small";
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

  const loadMore = () => {
    setVisibleCount((prev) => Math.min(prev + 6, otherProjects.length));
  };

  if (isLoading) {
    return (
      <Section
        id="projects"
        label="Projects"
        title="My Projects"
        description="A showcase of applications and tools I've built"
        headerIcon={Folder}
        icon="code"
        showHeader={true}
      >
        <div className="flex justify-center items-center h-64">
          <div className="text-ctp-text">Loading projects...</div>
        </div>
      </Section>
    );
  }

  if (error || !featuredProject) {
    return (
      <Section
        id="projects"
        label="Projects"
        title="My Projects"
        description="A showcase of applications and tools I've built"
        headerIcon={Folder}
        icon="code"
        showHeader={true}
      >
        <div className="flex justify-center items-center h-64">
          <div className="text-ctp-red">
            {error ?? "Failed to load projects data"}
          </div>
        </div>
      </Section>
    );
  }

  const tabs = [
    {
      value: "featured",
      label: "Featured Project",
      small: "Featured",
      icon: <Sparkles className="w-4 h-4 mr-2" />,
    },
    {
      value: "gallery",
      label: "Project Gallery",
      small: "Gallery",
      icon: <Code className="w-4 h-4 mr-2" />,
    },
  ];

  return (
    <Section
      id="projects"
      label="Projects"
      title="My Projects"
      description="A showcase of applications and tools I've built"
      headerIcon={Folder}
      icon="code"
      showHeader={true}
    >
      <ProjectThemeProvider>
        <div ref={projectsRef} className="relative max-w-6xl mx-auto px-4 ">
          <Reveal effect="fade-up" duration={0.7} delay={0.1}>
            <Tabs defaultValue="featured" className="w-full">
              <div className="w-full flex justify-end">
                <TabsList className="mb-8 bg-ctp-surface0/30 backdrop-blur-md border border-ctp-surface0 p-1 rounded-lg">
                  {tabs.map(({ value, label, small, icon }) => (
                    <TabsTrigger
                      key={value}
                      value={value}
                      className="flex-1 data-[state=active]:bg-ctp-yellow/20 data-[state=active]:text-ctp-yellow"
                    >
                      {icon}
                      <span className="hidden md:block">{label}</span>
                      <span className="block md:hidden">{small}</span>
                    </TabsTrigger>
                  ))}
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
                  icon={<Sparkles className="w-3 h-3 text-ctp-yellow" />}
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
                  icon={<Code className="w-3 h-3 text-ctp-peach" />}
                >
                  <Reveal effect="fade-up" duration={0.7}>
                    <div className="sticky top-0 z-20 bg-ctp-mantle/80 backdrop-blur-md py-4 border-b border-ctp-surface0 mb-8 rounded-t-lg">
                      <div className="flex flex-col md:flex-row md:items-center gap-4 px-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-ctp-peach to-ctp-red flex items-center justify-center shadow-md shadow-ctp-peach/10">
                            <Globe className="w-5 h-5 text-ctp-crust" />
                          </div>
                          <h3 className="text-xl font-semibold bg-gradient-to-r from-ctp-peach to-ctp-red text-transparent bg-clip-text">
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
                          className="border-ctp-peach/30 hover:border-ctp-peach/50 bg-ctp-peach/5 hover:bg-ctp-peach/10 hover:text-ctp-peach text-ctp-peach px-6 py-6 text-small hover:scale-105 transition-all duration-300"
                        >
                          Load more ({otherProjects.length - visibleCount}{" "}
                          remaining)
                        </Button>
                      </div>
                    </Reveal>
                  )}
                </OutlineNode>
              </TabsContent>
            </Tabs>
          </Reveal>

          {/* Project modal */}
          <ProjectDrawer
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
