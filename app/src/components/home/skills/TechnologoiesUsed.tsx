import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import React from "react";

type Technology = {
  name: string;
  icon: React.ReactNode;
};

interface TechnologiesUsedProps {
  technologies: Technology[];
}

const TechnologiesUsed: React.FC<TechnologiesUsedProps> = ({
  technologies,
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Technologies Used / Learnt</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-4">
          {technologies.map((technology) => (
            <div key={technology.name}>{technology.name}</div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default TechnologiesUsed;
