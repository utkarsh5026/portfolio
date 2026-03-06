import { Code, Folder, Sparkles } from "lucide-react";
import React, { useCallback, useRef, useState } from "react";

import Reveal from "@/components/animations/reveal/Reveal";
import { useEditorContext } from "@/components/home/editor/context/explorer-context";
import { OutlineNode } from "@/components/home/editor/outline";
import Section from "@/components/section/portfolio-section";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MobileProvider } from "@/hooks/use-mobile";
import { useProject } from "@/hooks/use-project";
import type { Project } from "@/types";

import { ProjectThemeProvider } from "./context/ProjectThemeProvider";
import FeaturedProject from "./featured/featured-project";
import ProjectSmall from "./project-small";

const Projects: React.FC = () => {
  const { featuredProject, otherProjects, isLoading, error } = useProject();

  const { openProject } = useEditorContext();
  const [visibleCount, setVisibleCount] = useState(6);
  const projectsRef = useRef<HTMLDivElement>(null);

  const handleProjectSelect = useCallback(
    (project: Project) => {
      openProject(project);
    },
    [openProject]
  );

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
      <MobileProvider>
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
                    label="Featured Project"
                    icon={<Sparkles className="w-3 h-3 text-ctp-yellow" />}
                  >
                    <FeaturedProject
                      featuredProject={featuredProject}
                      handleProjectSelect={handleProjectSelect}
                    />
                  </OutlineNode>
                </TabsContent>

                <TabsContent
                  value="gallery"
                  className="focus-visible:outline-none"
                >
                  <OutlineNode
                    label="Project Gallery"
                    icon={<Code className="w-3 h-3 text-ctp-peach" />}
                  >
                    {/* Project grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-1 gap-4 sm:gap-6">
                      {otherProjects
                        .slice(0, visibleCount)
                        .map((project, index) => (
                          <OutlineNode
                            key={project.name}
                            label={project.name}
                            icon={
                              project.icon ? (
                                <span className="text-[10px]">
                                  {project.icon}
                                </span>
                              ) : undefined
                            }
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
          </div>
        </ProjectThemeProvider>
      </MobileProvider>
    </Section>
  );
};

export default Projects;
