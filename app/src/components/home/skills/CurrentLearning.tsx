import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import React from "react";
import type { TechnologyLearning } from "@/types";

interface CurrentLearningProps {
  technologies: TechnologyLearning[];
}

const CurrentLearning: React.FC<CurrentLearningProps> = ({ technologies }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Current Learning Journey</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {technologies.map((tech) => (
            <Card
              key={tech.name}
              className="border border-muted hover:border-primary transition-colors"
            >
              <CardContent className="p-4">
                <div className="flex items-center gap-6 mb-2">
                  <div className="w-6 h-6 flex items-center justify-center">
                    {tech.icon}
                  </div>
                  <h3 className="font-semibold">{tech.name}</h3>
                </div>
                <p className="text-sm text-muted-foreground mb-2">
                  {tech.description}
                </p>
                {tech.repoLink && (
                  <a
                    href={tech.repoLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-primary hover:underline mt-2 inline-block"
                  >
                    View Project →
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
