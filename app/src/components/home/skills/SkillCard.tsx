/* 
    Hey! This is a card component for showing off skills.
    Each card has a nice gradient background, an icon, and lists out
    related skills or technologies. It's designed to look clean
    while still having some nice hover effects.
*/

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChevronRight } from "lucide-react";
import React from "react";
import SkillItem from "./SkillItem";

interface SkillCardProps {
  skill: string;
  icon?: React.ReactNode;
  items: string[];
}

const SkillCard: React.FC<SkillCardProps> = ({ skill, icon, items }) => {
  return (
    <div className="skill-card group relative w-full">
      <div className="absolute inset-0 overflow-hidden rounded-lg">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-blue-500/20 opacity-50 transform transition-transform duration-300 group-hover:scale-110" />
      </div>

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
            {items.map((item) => (
              <SkillItem key={item} item={item} />
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

const SkillCardComponent = React.memo(SkillCard);
export default SkillCardComponent;
