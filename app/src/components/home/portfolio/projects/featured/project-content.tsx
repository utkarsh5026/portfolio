import { ArrowRight,ExternalLink } from "lucide-react";
import React from "react";
import { FaGithub } from "react-icons/fa";

import Reveal from "@/components/animations/reveal/Reveal";
import TechBadge from "@/components/base/TechBadge";
import { Button } from "@/components/ui/button";
import { Project } from "@/types";

interface ProjectContentProps {
  activeTab: "overview" | "features";
  featuredProject: Project;
  handleProjectSelect: (project: Project) => void;
}

const ProjectContent: React.FC<ProjectContentProps> = ({
  activeTab,
  featuredProject,
  handleProjectSelect,
}) => {
  return (
    <div className="xl:w-1/2 space-y-6">
      {activeTab === "overview" ? (
        <Reveal effect="fade-up" duration={0.4}>
          <p className="text-ctp-text leading-relaxed">
            {featuredProject.description}
          </p>
        </Reveal>
      ) : (
        <Reveal effect="fade-up" duration={0.4}>
          <ul className="space-y-4">
            {featuredProject.keyFeatures &&
            featuredProject.keyFeatures.length > 0 ? (
              featuredProject.keyFeatures.map((feature, index) => {
                let title = feature;
                let description = "";
                const splitIndex = feature.indexOf(": ");
                if (splitIndex !== -1) {
                  title = feature.substring(0, splitIndex);
                  description = feature.substring(splitIndex + 2);
                }

                return (
                  <Reveal
                    key={title}
                    effect="slide-in"
                    direction="left"
                    duration={0.3}
                    delay={index * 0.1}
                  >
                    <li className="flex flex-col gap-1">
                      <div className="flex items-start gap-2">
                        <span className="text-ctp-peach mt-1 text-lg">•</span>
                        <div className="flex-1">
                          <h5 className="text-ctp-text font-semibold">
                            {title}
                          </h5>
                          {description && (
                            <p className="text-ctp-subtext0 text-sm mt-1">
                              {description}
                            </p>
                          )}
                        </div>
                      </div>
                    </li>
                  </Reveal>
                );
              })
            ) : (
              <li className="text-ctp-subtext0 text-sm">
                No features documented yet.
              </li>
            )}
          </ul>
        </Reveal>
      )}

      <div className="pt-2">
        <h4 className="text-sm text-ctp-subtext0 mb-3">TECHNOLOGIES</h4>
        <div className="flex flex-wrap gap-2">
          {featuredProject.technologies.map((tech, index) => (
            <Reveal
              key={tech}
              effect="fade-up"
              duration={0.4}
              delay={0.2 + index * 0.1}
            >
              <TechBadge tech={tech} />
            </Reveal>
          ))}
        </div>
      </div>

      <Reveal effect="fade-up" duration={0.5} delay={0.3}>
        <div className="flex flex-wrap gap-4 pt-4">
          <Button
            onClick={() => handleProjectSelect(featuredProject)}
            className="relative overflow-hidden group bg-gradient-to-r from-ctp-peach to-ctp-maroon text-ctp-crust hover:from-ctp-maroon hover:to-ctp-peach transition-all duration-300"
          >
            <span className="relative z-10 flex items-center gap-2">
              Explore Project
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </span>
            <span className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
          </Button>

          {featuredProject.githubLink !== "private-repository" && (
            <Button
              variant="outline"
              className="border-ctp-surface0 hover:border-ctp-blue bg-transparent"
              onClick={() => window.open(featuredProject.githubLink, "_blank")}
            >
              <FaGithub className="mr-2" />
              Source Code
            </Button>
          )}

          {featuredProject.liveLink && (
            <Button
              variant="outline"
              className="border-ctp-surface0 hover:border-ctp-green bg-transparent"
              onClick={() => window.open(featuredProject.liveLink, "_blank")}
            >
              <ExternalLink className="mr-2 w-4 h-4" />
              Live Demo
            </Button>
          )}
        </div>
      </Reveal>
    </div>
  );
};

export default ProjectContent;
