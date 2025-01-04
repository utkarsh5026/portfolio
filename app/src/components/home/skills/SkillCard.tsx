/* 
    Hey! This is a card component for showing off skills.
    Each card has a nice gradient background, an icon, and lists out
    related skills or technologies. It's designed to look clean
    while still having some nice hover effects.
*/

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
      <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-blue-500/20 blur-xl group-hover:blur-2xl transition-all duration-300 rounded-lg opacity-50 w-full" />
      <Card className="relative bg-background/60 backdrop-blur-sm border border-muted/20 hover:border-muted-foreground/30 transition-all duration-300 shadow-lg hover:shadow-xl">
        <CardHeader className="pb-2 sm:pb-4">
          <CardTitle className="flex items-center space-x-3">
            {icon || (
              <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 text-purple-400" />
            )}
            <span className="text-lg sm:text-xl font-semibold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              {skill}
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="flex flex-wrap gap-2 sm:gap-3">
            {items.map((item, index) => (
              <li
                key={`${item}-${index}`}
                className="text-sm sm:text-base text-muted-foreground/80 pl-4 sm:pl-6 relative before:absolute before:left-0 before:top-[0.4em] before:h-1.5 before:w-1.5 sm:before:h-2 sm:before:w-2 before:rounded-full before:bg-gradient-to-r before:from-purple-400 before:to-blue-400 hover:text-primary transition-colors duration-200"
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
