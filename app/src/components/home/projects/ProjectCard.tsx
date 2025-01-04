import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Github, ExternalLink, ChevronDown } from "lucide-react";
import GradientText from "@/components/utils/GradientText";
import { cn } from "@/lib/utils";
import { Project } from "@/types";
import TechBadge from "@/components/base/TechBadge";
interface ProjectCardProps {
  project: Project;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <Card className="group hover:shadow-xl transition-all duration-300 overflow-hidden border-2 hover:border-primary/50">
      {project.thumbnail && (
        <div className="relative h-48 overflow-hidden">
          <img
            src={project.thumbnail}
            alt={project.name}
            className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-300"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
        </div>
      )}

      <CardHeader>
        <div className="flex justify-between items-start">
          <CardTitle>
            <GradientText className="text-2xl font-bold">
              {project.name}
            </GradientText>
          </CardTitle>
          <span className="px-3 py-1 text-xs rounded-full bg-primary/10 text-primary">
            {project.status}
          </span>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <p className="text-muted-foreground">{project.description}</p>

        {/* Technologies */}
        <div className="flex flex-wrap gap-2">
          {project.technologies.map((tech) => (
            <TechBadge tech={tech.name} key={tech.name} />
          ))}
        </div>

        {/* Expandable Content */}
        <div
          className={cn(
            "space-y-4 overflow-hidden transition-all duration-300",
            isExpanded ? "max-h-[500px]" : "max-h-0"
          )}
        >
          {/* Features */}
          {project.features && (
            <div className="space-y-2">
              <h4 className="font-semibold">Key Features</h4>
              <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                {project.features.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
            </div>
          )}
          
        </div>

        {/* Actions */}
        <div className="flex items-center gap-4 pt-4">
          <Button
            variant="outline"
            size="sm"
            className="gap-2"
            onClick={() => window.open(project.githubLink, "_blank")}
          >
            <Github className="w-4 h-4" />
            Code
          </Button>
          {project.liveLink && (
            <Button
              variant="outline"
              size="sm"
              className="gap-2"
              onClick={() => window.open(project.liveLink, "_blank")}
            >
              <ExternalLink className="w-4 h-4" />
              Live Demo
            </Button>
          )}
          <Button
            variant="ghost"
            size="sm"
            className="ml-auto"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            <ChevronDown
              className={cn(
                "w-4 h-4 transition-transform",
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