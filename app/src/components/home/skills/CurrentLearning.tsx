import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import React from "react";
import type { TechnologyLearning } from "@/types";

interface CurrentLearningProps {
  technologies: TechnologyLearning[];
}

const CurrentLearning: React.FC<CurrentLearningProps> = ({ technologies }) => {
  return (
    <Card className="border-2 border-muted bg-background/60 backdrop-blur-sm">
      <CardHeader className="space-y-2">
        <CardTitle className="text-3xl ">Current Learning Journey</CardTitle>
        <p className="text-sm text-muted-foreground">
          Projects and technologies I'm currently exploring
        </p>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {technologies.map((tech) => (
            <Card
              key={tech.name}
              className="group border border-muted hover:border-primary transition-all duration-300 hover:shadow-lg hover:shadow-primary/5 bg-background/60 backdrop-blur-sm"
            >
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-8 h-8 flex items-center justify-center rounded-lg bg-primary/5 group-hover:bg-primary/10 transition-colors">
                    {tech.icon}
                  </div>
                  <h3 className="font-semibold text-lg group-hover:text-primary transition-colors">
                    {tech.name}
                  </h3>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                  {tech.description}
                </p>
                {tech.repoLink && (
                  <a
                    href={tech.repoLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-xs text-primary hover:text-primary/80 transition-colors gap-1 group/link"
                  >
                    View Project
                    <span className="transform translate-x-0 group-hover/link:translate-x-0.5 transition-transform">
                      →
                    </span>
                  </a>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default CurrentLearning;
