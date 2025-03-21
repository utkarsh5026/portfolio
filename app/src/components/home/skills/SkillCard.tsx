import React from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { ChevronRight } from "lucide-react";
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
  description?: string;
}

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

/**
 * SkillCard Component
 *
 * This component renders a card for a specific skill, including the skill title, icon, description, and a list of items.
 * It utilizes Framer Motion for animations, providing a smooth entrance effect.
 *
 * Props:
 * - skill: string - The title of the skill.
 * - icon: React.ReactNode - The icon of the skill.
 * - items: string[] - The list of items related to the skill.
 * - accentColor: string - The accent color of the skill card. Defaults to "lavender".
 * - description: string - The description of the skill.
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
  const secondaryColor = colorPairs[accentColor] || "blue";

  return (
    <motion.div
      className="skill-card group relative w-full transition-all duration-500 hover:-translate-y-2"
      whileHover={{
        boxShadow: `0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)`,
      }}
    >
      <div className="absolute -inset-0.5 rounded-xl bg-gradient-to-r from-ctp-blue/30 to-ctp-lavender/30 opacity-0 group-hover:opacity-100 blur-sm transition-opacity duration-500"></div>

      <Card className="relative bg-ctp-mantle border border-ctp-surface0 hover:border-ctp-surface2 transition-all duration-300 overflow-hidden">
        <div
          className={`h-1 w-full bg-gradient-to-r from-ctp-${accentColor} to-ctp-${secondaryColor}`}
        ></div>

        <div className="p-6">
          <div className="flex items-start gap-4 mb-4">
            <motion.div
              className={`relative p-3 rounded-lg bg-ctp-${accentColor}/10 flex items-center justify-center`}
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              {icon || (
                <ChevronRight className={`w-5 h-5 text-ctp-${accentColor}`} />
              )}
            </motion.div>

            {/* Title and description */}
            <div>
              <h3 className={`text-xl font-bold text-ctp-${accentColor} mb-1`}>
                {skill}
              </h3>
              {description && (
                <p className="text-sm text-ctp-subtext0">{description}</p>
              )}
            </div>
          </div>

          <motion.ul
            className="grid grid-cols-2 gap-x-4 gap-y-3 mt-6"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.05,
                },
              },
            }}
            initial="hidden"
            animate="visible"
          >
            {items.map((item) => (
              <motion.div
                key={item}
                variants={{
                  hidden: { opacity: 0, y: 10 },
                  visible: { opacity: 1, y: 0 },
                }}
                transition={{ duration: 0.3 }}
              >
                <SkillItem item={item} accentColor={accentColor} />
              </motion.div>
            ))}
          </motion.ul>
        </div>
      </Card>
    </motion.div>
  );
};

export default SkillCard;
