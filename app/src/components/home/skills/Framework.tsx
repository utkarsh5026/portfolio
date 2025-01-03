import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Code2 } from "lucide-react";
import React from "react";

interface FrameworkProps {
  frameworks: Record<string, string[]>;
}

const Framework: React.FC<FrameworkProps> = ({ frameworks }) => {
  return (
    <div className="skill-card relative group w-full">
      <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-blue-500/20 blur-xl group-hover:blur-2xl transition-all duration-300 rounded-lg opacity-50 w-full" />
      <Card className="relative bg-background/60 backdrop-blur-sm border border-muted/20 hover:border-muted-foreground/30 transition-all duration-300 shadow-lg hover:shadow-xl">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center space-x-3">
            <Code2 className="w-5 h-5 text-purple-400" />
            <span className="text-xl font-semibold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              Frameworks & Libraries
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-6">
            {Object.entries(frameworks).map(([language, libs], index) => (
              <li key={`${language}-${index}`}>
                <h3 className="text-base mb-3 pl-6 relative before:absolute before:left-0 before:top-[0.4em] before:h-2 before:w-2 before:rounded-full before:bg-gradient-to-r before:from-purple-400 before:to-blue-400">
                  {language}
                </h3>
                <ul className="flex flex-wrap gap-3 pl-6">
                  {libs.map((framework, fIndex) => (
                    <li
                      key={`${framework}-${fIndex}`}
                      className="flex items-center text-base text-muted-foreground/80 hover:text-primary transition-colors duration-200"
                    >
                      {framework}
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
