import React, { useState, useRef, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink, ChevronDown, Code } from "lucide-react";
import { SiGithub } from "react-icons/si";
import { cn } from "@/lib/utils";
import { Project } from "@/types";
import TechBadge from "@/components/base/TechBadge";
import GradientText from "@/components/utils/GradientText";
import anime from "animejs";

interface ProjectCardProps {
  project: Project;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  const [isExpanded, setIsExpanded] = useState(true);
  const cardRef = useRef<HTMLDivElement>(null);

  // Animation effect when card comes into view
  useEffect(() => {
    if (cardRef.current) {
      anime({
        targets: cardRef.current,
        opacity: [0, 1],
        translateY: [20, 0],
        duration: 800,
        easing: "easeOutCubic",
      });
    }
  }, []);

  const handleCardClick = (e: React.MouseEvent) => {
    if (
      e.target instanceof Element &&
      (e.target.closest("button") || isExpanded)
    ) {
      return;
    }
    window.open(project.githubLink, "_blank");
  };

  return (
    <Card
      ref={cardRef}
      className="group cursor-pointer overflow-hidden border border-ctp-surface0 hover:border-ctp-lavender transition-all duration-500 bg-gradient-to-br from-ctp-crust to-ctp-mantle backdrop-blur-sm shadow-lg hover:shadow-xl"
      onClick={handleCardClick}
    >
      {/* Project thumbnail with overlay */}
      {project.thumbnail && (
        <div className="relative h-56 overflow-hidden">
          <img
            src={project.thumbnail}
            alt={project.name}
            className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ctp-crust via-ctp-crust/80 to-transparent" />

          {/* Subtle video player like overlay */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="w-12 h-12 rounded-full bg-ctp-crust/80 flex items-center justify-center border border-ctp-lavender">
              <Code className="w-5 h-5 text-ctp-lavender" />
            </div>
          </div>
        </div>
      )}

      {/* Project title with gradient text */}
      <CardHeader className="relative z-10 pb-2">
        <CardTitle className="text-2xl font-bold tracking-tight">
          <GradientText>{project.name}</GradientText>
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-6 relative z-10">
        {/* Project description */}
        <p className="text-ctp-subtext0 text-sm leading-relaxed">
          {project.description}
        </p>

        {/* Technology badges */}
        <div className="flex flex-wrap gap-2 my-4">
          {project.technologies.map((tech) => (
            <TechBadge tech={tech.name} key={tech.name} />
          ))}
        </div>

        {/* Expandable features section */}
        <div
          className={cn(
            "space-y-4 overflow-hidden transition-all duration-500",
            isExpanded ? "max-h-[500px]" : "max-h-0"
          )}
        >
          {project.features && (
            <div className="space-y-3 bg-ctp-surface0/30 p-5 rounded-lg border border-ctp-surface1">
              <h4 className="font-semibold text-ctp-lavender flex items-center">
                <span className="w-1.5 h-4 bg-ctp-lavender rounded-full inline-block mr-2"></span>
                Key Features
              </h4>
              <ul className="space-y-2 text-sm text-ctp-subtext1">
                {project.features.map((feature, index) => (
                  <li
                    key={`${project.name}-feature-${index}`}
                    className="pl-4 relative hover:text-ctp-text transition-colors"
                  >
                    <span className="absolute left-0 top-[0.4em] h-1.5 w-1.5 rounded-full bg-ctp-blue/70"></span>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3 pt-4 border-t border-ctp-surface0">
          <Button
            variant="outline"
            size="sm"
            className="gap-2 bg-ctp-mantle hover:bg-ctp-surface0 border-ctp-surface1 hover:border-ctp-lavender text-ctp-text transition-all duration-300"
            onClick={() => window.open(project.githubLink, "_blank")}
          >
            <SiGithub className="w-4 h-4 text-ctp-lavender" />
            <span>Code</span>
          </Button>

          {project.liveLink && (
            <Button
              variant="outline"
              size="sm"
              className="gap-2 bg-ctp-mantle hover:bg-ctp-surface0 border-ctp-surface1 hover:border-ctp-blue text-ctp-text transition-all duration-300"
              onClick={() => window.open(project.liveLink, "_blank")}
            >
              <ExternalLink className="w-4 h-4 text-ctp-blue" />
              <span>Live Demo</span>
            </Button>
          )}

          <Button
            variant="ghost"
            size="sm"
            className="ml-auto hover:bg-ctp-surface0 text-ctp-subtext0 hover:text-ctp-text"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            <ChevronDown
              className={cn(
                "w-4 h-4 transition-transform duration-300",
                isExpanded && "rotate-180"
              )}
            />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProjectCard;
