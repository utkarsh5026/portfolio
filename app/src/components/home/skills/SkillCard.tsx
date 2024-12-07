import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChevronRight } from "lucide-react";
import React from "react";

interface SkillCardProps {
  skill: string;
  icon?: React.ReactNode;
  items: string[];
}

const SkillCard: React.FC<SkillCardProps> = ({ skill, icon, items }) => {
  return (
    <div className="skill-card relative group w-full">
      <div className="absolute inset-0 bg-gradient-to-r blur-xl group-hover:blur-2xl transition-all duration-300 rounded-lg opacity-50 w-full" />
      <Card className="relative bg-background/60 backdrop-blur-sm border-4 hover:border-muted-foreground/50 transition-all duration-300">
        <CardHeader>
          <CardTitle className="flex items-center">
            {icon || <ChevronRight className="w-4 h-4 mr-2" />}
            <span className="text-lg">{skill}</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="flex flex-wrap gap-2">
            {items.map((item, index) => (
              <li
                key={index}
                className="text-base text-muted-foreground pl-6 relative before:absolute before:left-0 before:top-[0.4em] before:h-2 before:w-2 before:rounded-full before:bg-gradient-to-r from-purple-500 to-blue-500 mx-2"
              >
                {item}
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

export default SkillCard;