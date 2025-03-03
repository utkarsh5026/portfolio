import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChevronRight } from "lucide-react";
import React from "react";
import SkillItem from "./SkillItem";

interface SkillCardProps {
  skill: string;
  icon?: React.ReactNode;
  items: string[];
  accentColor?:
    | "mauve"
    | "blue"
    | "lavender"
    | "sapphire"
    | "teal"
    | "green"
    | "red"
    | "peach";
}

const SkillCardComponent: React.FC<SkillCardProps> = ({
  skill,
  icon,
  items,
  accentColor = "lavender",
}) => {
  // Define complementary colors for gradients
  const colorPairs = {
    mauve: "blue",
    blue: "lavender",
    lavender: "sapphire",
    sapphire: "sky",
    teal: "green",
    green: "teal",
    red: "peach",
    peach: "yellow",
  };

  const secondaryColor = colorPairs[accentColor] || "blue";

  return (
    <div className="skill-card group relative w-full transition-all duration-300 hover:transform hover:-translate-y-1">
      {/* Background gradient effect */}
      <div className="absolute inset-0 overflow-hidden rounded-lg">
        <div
          className={`absolute inset-0 bg-gradient-to-r from-ctp-${accentColor}/20 to-ctp-${secondaryColor}/20 opacity-50 transform transition-transform duration-300 group-hover:scale-110`}
        />
      </div>

      {/* Main card */}
      <Card className="relative bg-ctp-mantle border border-ctp-surface0 hover:border-ctp-surface2 transition-all duration-300 shadow hover:shadow-lg">
        <CardHeader className="pb-2 sm:pb-4">
          <CardTitle className="flex items-center gap-3">
            {/* Icon with accent color */}
            <div
              className={`p-2 rounded-lg bg-ctp-${accentColor}/10 flex items-center justify-center`}
            >
              {icon || (
                <ChevronRight
                  className={`w-4 h-4 sm:w-5 sm:h-5 text-ctp-${accentColor}`}
                />
              )}
            </div>

            {/* Skill title with gradient */}
            <span className={`text-lg sm:text-xl font-semibold text-ctp-peach`}>
              {skill}
            </span>
          </CardTitle>
        </CardHeader>

        <CardContent>
          <ul className="flex flex-wrap gap-2 sm:gap-3">
            {items.map((item) => (
              <SkillItem key={item} item={item} accentColor={accentColor} />
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

const SkillCard = React.memo(SkillCardComponent);

export default SkillCard;
