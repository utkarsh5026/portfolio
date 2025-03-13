import React, { useState, useRef, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { TechnologyLearning } from "@/types";
import { categoryInfo, currentLearningTechnologies } from "./data";
import OutlineNode from "../editor/outline/OutlineNode";
import LearningCard from "./LearningCard";

type Category = (typeof currentLearningTechnologies)[number]["category"];

interface FeaturedLearningsProps {
  categorizedTech: Record<Category, TechnologyLearning[]>;
  handleTechSelect: (tech: TechnologyLearning) => void;
}

const FeaturedLearnings: React.FC<FeaturedLearningsProps> = ({
  categorizedTech,
  handleTechSelect,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeCard, setActiveCard] = useState<string | null>(null);

  const featuredItems = useMemo(() => {
    const featuredItems: Array<{
      tech: TechnologyLearning;
      category: Category;
    }> = [];

    Object.entries(categorizedTech).forEach(([category, techs]) => {
      techs.forEach((tech) => {
        featuredItems.push({
          tech: tech,
          category: category as Category,
        });
      });
    });
    return featuredItems;
  }, [categorizedTech]);

  return (
    <motion.div
      ref={containerRef}
      className="relative z-20"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Featured items card grid with enhanced visual effects */}
      <div className="px-10 pb-20 grid grid-cols-1 md:grid-cols-3 gap-8">
        <AnimatePresence>
          {featuredItems.map(({ tech, category }, index) => {
            const isActive = activeCard === tech.name;
            const catInfo = categoryInfo[category];

            return (
              <OutlineNode
                key={tech.name}
                id={tech.name}
                label={tech.name}
                icon={tech.icon}
                level={1}
                parentId="learning"
              >
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                  className="h-full"
                >
                  <div
                    className="group relative h-full rounded-xl overflow-hidden cursor-pointer"
                    onMouseEnter={() => setActiveCard(tech.name)}
                    onMouseLeave={() => setActiveCard(null)}
                    onClick={() => handleTechSelect(tech)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        handleTechSelect(tech);
                      }
                    }}
                    aria-label={`Learn about ${tech.name}`}
                  >
                    {/* Card glow effect */}
                    <motion.div
                      className="absolute -inset-0.5 rounded-xl z-[1000000] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      animate={{
                        boxShadow: isActive
                          ? `0 0 25px 2px ${catInfo.color}40`
                          : `0 0 0px 0px ${catInfo.color}00`,
                      }}
                      transition={{ duration: 0.3 }}
                    />

                    <LearningCard
                      tech={tech}
                      catInfo={catInfo}
                      isActive={isActive}
                      category={category}
                    />

                    <div
                      className="absolute -bottom-2 -right-2 w-20 h-20 rounded-full opacity-0 group-hover:opacity-10 transition-opacity duration-500 pointer-events-none"
                      style={{
                        background: `radial-gradient(circle, ${catInfo.color}, transparent 70%)`,
                        filter: "blur(10px)",
                      }}
                    />
                  </div>
                </motion.div>
              </OutlineNode>
            );
          })}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default FeaturedLearnings;
