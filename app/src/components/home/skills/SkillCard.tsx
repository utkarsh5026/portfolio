import React from "react";
import { Card } from "@/components/ui/card";
import { ChevronRight } from "lucide-react";
import SkillItem from "./SkillItem";
import Reveal from "@/components/animations/reveal/Reveal";

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
  description?: string;
}

/**
 * SkillCard Component
 *
 * This component renders a card for a specific skill, including the skill title, icon, description, and a list of items.
 * It uses reveal animations to create smooth entrance effects for each element.
 *
 * Props:
 * - skill: string - The title of the skill.
 * - icon: React.ReactNode - The icon of the skill.
 * - items: string[] - The list of items related to the skill.
 * - accentColor: string - The accent color of the skill card. Defaults to "lavender".
 * - description: string - The description of the skill.
 *
 * The animations are optimized for both mobile and desktop viewing experiences, with careful
 * attention to performance, timing, and visual hierarchy.
 *
 * @param {SkillCardProps} props - The component props
 * @returns {React.ReactElement} The rendered skill card component
 */
const SkillCard: React.FC<SkillCardProps> = ({
  skill,
  icon,
  items,
  accentColor = "lavender",
  description,
}) => {
  return (
    <Reveal
      effect="rise"
      duration={0.7}
      className="skill-card group relative w-full transition-all duration-500 hover:-translate-y-2"
    >
      <div className="absolute -inset-0.5 rounded-xl bg-gradient-to-r from-ctp-blue/30 to-ctp-lavender/30 opacity-0 group-hover:opacity-100 blur-sm transition-opacity duration-500"></div>

      <Card className="relative bg-ctp-base border-none hover:border-ctp-surface2 transition-all duration-300 overflow-hidden">
        <div className="p-6">
          <Reveal effect="fade-up" duration={0.5} delay={0.1}>
            <div className="flex items-start gap-4 mb-4">
              <Reveal effect="zoom-in" duration={0.6} delay={0.2}>
                <div
                  className={`relative p-3 rounded-lg bg-ctp-${accentColor}/10 flex items-center justify-center`}
                >
                  {icon || (
                    <ChevronRight
                      className={`w-5 h-5 text-ctp-${accentColor}`}
                    />
                  )}
                </div>
              </Reveal>

              {/* Title and description */}
              <div>
                <h3
                  className={`text-xl font-bold text-ctp-${accentColor} mb-1`}
                >
                  {skill}
                </h3>
                {description && (
                  <p className="text-sm text-ctp-subtext0">{description}</p>
                )}
              </div>
            </div>
          </Reveal>

          <Reveal
            effect="cascade"
            duration={0.5}
            delay={0.3}
            staggerChildren={0.05}
            className="grid grid-cols-2 gap-x-4 gap-y-3 mt-6"
          >
            {items.map((item) => (
              <div key={item}>
                <SkillItem item={item} accentColor={accentColor} />
              </div>
            ))}
          </Reveal>
        </div>
      </Card>
    </Reveal>
  );
};

export default SkillCard;
