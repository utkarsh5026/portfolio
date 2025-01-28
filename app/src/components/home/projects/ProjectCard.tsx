/**
 * A fancy card component to show off our cool projects! 🚀
 *
 * This card displays project info with some neat interactive features:
 * - Hover effects with subtle shadows and border highlights
 * - Project thumbnail with zoom effect on hover
 * - Expandable section for showing detailed features
 * - Quick links to GitHub and live demo
 * - Tech stack badges for each project
 *
 * The whole card is clickable to visit the GitHub repo, except for
 * the buttons and expanded content (they have their own actions).
 *
 * Used in the Projects section to display our portfolio items in style!
 */

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink, ChevronDown } from "lucide-react";
import { SiGithub } from "react-icons/si";
import GradientText from "@/components/utils/GradientText";
import { cn } from "@/lib/utils";
import { Project } from "@/types";
import TechBadge from "@/components/base/TechBadge";

interface ProjectCardProps {
  project: Project;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  const [isExpanded, setIsExpanded] = useState(true);

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
      className="group hover:shadow-2xl transition-all duration-500 overflow-hidden border-2 hover:border-primary/50 backdrop-blur-sm bg-background/50 cursor-pointer"
      onClick={handleCardClick}
    >
      {project.thumbnail && (
        <div className="relative h-56 overflow-hidden">
          <img
            src={project.thumbnail}
            alt={project.name}
            className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-transparent" />
        </div>
      )}

      <CardHeader className="relative z-10">
        <CardTitle>
          <GradientText className="text-3xl font-bold tracking-tight">
            {project.name}
          </GradientText>
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-6 relative z-10">
        <p className="text-muted-foreground/90 text-sm leading-relaxed">
          {project.description}
        </p>

        <div className="flex flex-wrap gap-2">
          {project.technologies.map((tech) => (
            <TechBadge tech={tech.name} key={tech.name} />
          ))}
        </div>

        <div
          className={cn(
            "space-y-4 overflow-hidden transition-all duration-500",
            isExpanded ? "max-h-[500px]" : "max-h-0"
          )}
        >
          {project.features && (
            <div className="space-y-3 bg-primary/5 p-4 rounded-lg border border-primary/10">
              <h4 className="font-semibold text-primary/90">Key Features</h4>
              <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground/90">
                {project.features.map((feature, index) => (
                  <li
                    key={`${project.name}-feature-${index}`}
                    className="hover:text-primary transition-colors"
                  >
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3 pt-4">
          <Button
            variant="outline"
            size="sm"
            className="gap-2 hover:bg-primary hover:text-primary-foreground transition-colors duration-300"
            onClick={() => window.open(project.githubLink, "_blank")}
          >
            <SiGithub className="w-4 h-4" />
            Code
          </Button>
          {project.liveLink && (
            <Button
              variant="outline"
              size="sm"
              className="gap-2 hover:bg-primary hover:text-primary-foreground transition-colors duration-300"
              onClick={() => window.open(project.liveLink, "_blank")}
            >
              <ExternalLink className="w-4 h-4" />
              Live Demo
            </Button>
          )}
          <Button
            variant="ghost"
            size="sm"
            className="ml-auto hover:bg-primary/10"
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
