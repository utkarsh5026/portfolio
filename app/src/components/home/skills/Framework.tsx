import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Code2 } from "lucide-react";
import React from "react";

interface FrameworkProps {
  frameworks: Record<string, string[]>;
}

const Framework: React.FC<FrameworkProps> = ({ frameworks }) => {
  return (
    <div className="skill-card relative group w-full">
      <div className="absolute inset-0 blur-xl group-hover:blur-2xl transition-all duration-300 rounded-lg opacity-50" />
      <Card className="relative bg-background/60 backdrop-blur-sm border-muted hover:border-muted-foreground/50 transition-all duration-300">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Code2 className="w-4 h-4 mr-2" />
            <span className="text-lg">Frameworks & Libraries</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-4">
            {Object.entries(frameworks).map(([language, libs], index) => (
              <li key={index}>
                <h3 className="text-base mb-2 pl-6 relative flex items-center before:absolute before:left-0 before:top-1/2 before:transform before:-translate-y-1/2 before:h-2 before:w-2 before:rounded-full before:bg-gradient-to-r from-purple-500 to-blue-500">
                  {language}
                </h3>
                <ul className="flex flex-wrap gap-2 pl-8">
                  {libs.map((framework, fIndex) => (
                    <li key={fIndex} className="text-sm text-muted-foreground">
                      {framework} |
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

export default Framework;
