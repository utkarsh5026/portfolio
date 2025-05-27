import React, { useState, useEffect, useRef } from "react";
import { motion, PanInfo } from "framer-motion";
import type { Project } from "@/types";
import type { ProjectTheme } from "@/components/home/projects/context/ThemeContext";
import { ChevronLeft, ChevronRight, Code } from "lucide-react";
import Reveal from "@/components/animations/reveal/Reveal";
import { cn } from "@/lib/utils";
import getCategoryIcon from "@/components/base/category-icon";
import { Button } from "@/components/ui/button";
import getRandomColors from "@/components/home/projects/context/colors";

interface TechStackProps {
  project: Project;
  theme: ProjectTheme;
}

interface TechStackCard {
  category: string;
  technologies: string[];
  index: number;
}

const TechStack: React.FC<TechStackProps> = ({ project, theme }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  // Transform techStack object into array of cards
  const techCards: TechStackCard[] = project.techStack
    ? Object.entries(project.techStack).map(
        ([category, technologies], index) => ({
          category,
          technologies,
          index,
        })
      )
    : [];

  const totalCards = techCards.length;

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % totalCards);
  };

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + totalCards) % totalCards);
  };

  const goToCard = (index: number) => {
    setCurrentIndex(index);
  };

  const handleDragEnd = (
    _event: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo
  ) => {
    const threshold = 50;
    if (info.offset.x > threshold) {
      goToPrevious();
    } else if (info.offset.x < -threshold) {
      goToNext();
    }
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") goToPrevious();
      if (e.key === "ArrowRight") goToNext();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  if (!project.techStack || totalCards === 0) {
    return (
      <Reveal className="p-8">
        <div className="text-center py-12">
          <Code className="w-16 h-16 mx-auto mb-4 text-white/30" />
          <p className="text-white/60">
            No technology stack information available
          </p>
        </div>
      </Reveal>
    );
  }

  return (
    <Reveal className="p-4 sm:p-8">
      <div className="mb-8">
        <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">
          Technology Stack
        </h2>
        <p className="text-white/60 text-sm sm:text-base">
          The tools and technologies powering this project
        </p>
      </div>

      <div className="relative w-full max-w-6xl mx-auto">
        <div
          ref={containerRef}
          className="relative h-[620px] sm:h-[480px] flex items-center justify-center"
        >
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 w-72 sm:w-80 h-4 bg-black/20 blur-lg rounded-full" />

          {techCards.map((card, index) => {
            const isActive = index === currentIndex;
            const stackOffset = index - currentIndex;
            const absOffset = Math.abs(stackOffset);

            const translateX = stackOffset * 36;
            const translateY = absOffset * 12;
            const scale = isActive ? 1 : Math.max(0.92, 1 - absOffset * 0.04);
            const zIndex = totalCards - absOffset;

            const rotate = isActive ? 0 : stackOffset * 3.5;
            const cardTheme = getRandomColors(index);

            return (
              <motion.div
                key={`${card.category}-${index}`}
                className="absolute cursor-grab active:cursor-grabbing"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{
                  opacity: absOffset > 4 ? 0 : 1,
                  scale,
                  x: translateX,
                  y: translateY,
                  rotate,
                  zIndex,
                }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{
                  type: "spring",
                  stiffness: 200,
                  damping: 20,
                  opacity: { duration: 0.2 },
                }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.1}
                onDragEnd={handleDragEnd}
                onClick={() => !isActive && goToCard(index)}
                style={{
                  width: "420px",
                  height: "480px",
                }}
              >
                <TechStackCard
                  card={card}
                  theme={cardTheme}
                  isActive={isActive}
                />
              </motion.div>
            );
          })}
        </div>

        {/* Navigation Controls */}
        <div className="flex items-center justify-between mt-8 px-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={goToPrevious}
            className={cn(
              "flex items-center justify-center w-12 h-12 rounded-full",
              "bg-ctp-surface0 border border-ctp-surface1",
              "hover:bg-ctp-surface1 hover:border-ctp-surface2",
              "transition-all duration-200 hover:scale-105",
              "disabled:opacity-50 disabled:cursor-not-allowed"
            )}
            disabled={totalCards <= 1}
          >
            <ChevronLeft className="w-5 h-5 text-ctp-text" />
          </Button>

          {/* Card Indicators */}
          <div className="flex items-center gap-2">
            {techCards.map((techCard, index) => (
              <Button
                key={techCard.category}
                variant="ghost"
                size="icon"
                onClick={() => goToCard(index)}
                className={cn(
                  "transition-all duration-200 rounded-full",
                  index === currentIndex
                    ? `w-8 h-3 bg-ctp-${theme.main}`
                    : "w-3 h-3 bg-ctp-surface1 hover:bg-ctp-surface2"
                )}
              />
            ))}
          </div>

          <Button
            variant="ghost"
            size="icon"
            onClick={goToNext}
            className={cn(
              "flex items-center justify-center w-12 h-12 rounded-full",
              "bg-ctp-surface0 border border-ctp-surface1",
              "hover:bg-ctp-surface1 hover:border-ctp-surface2",
              "transition-all duration-200 hover:scale-105",
              "disabled:opacity-50 disabled:cursor-not-allowed"
            )}
            disabled={totalCards <= 1}
          >
            <ChevronRight className="w-5 h-5 text-ctp-text" />
          </Button>
        </div>

        {/* Card Info */}
        <div className="text-center mt-6">
          <div className="flex items-center justify-center gap-4">
            <span className="text-ctp-subtext0 text-sm">
              {currentIndex + 1} of {totalCards}
            </span>
            <div className="w-px h-4 bg-ctp-surface1" />
            <span className={`text-ctp-${theme.main} text-sm font-medium`}>
              {techCards[currentIndex]?.category}
            </span>
          </div>
        </div>
      </div>
    </Reveal>
  );
};

interface TechStackCardProps {
  card: TechStackCard;
  theme: ProjectTheme;
  isActive: boolean;
}

const TechStackCard: React.FC<TechStackCardProps> = ({
  card,
  theme,
  isActive,
}) => {
  const CategoryIcon = getCategoryIcon(card.category);
  return (
    <div
      className={cn(
        "w-full h-full rounded-2xl overflow-hidden flex flex-col relative",
        "bg-gradient-to-br from-ctp-mantle via-ctp-mantle to-ctp-surface0/50",
        "backdrop-blur-sm border border-white/10",
        "transition-all duration-300 ease-out",
        isActive
          ? `shadow-2xl shadow-ctp-${theme.main}/25 border-ctp-${theme.main}/40 scale-[1.02]`
          : "shadow-lg shadow-black/20 hover:shadow-xl hover:shadow-black/30"
      )}
    >
      {/* Gradient Overlay */}
      <div
        className={cn(
          "absolute inset-0 opacity-20 rounded-2xl",
          `bg-gradient-to-br from-ctp-${theme.main}/30 via-transparent to-ctp-${theme.secondary}/20`
        )}
      />

      {/* Animated Border */}
      {isActive && (
        <div
          className={cn(
            "absolute inset-0 rounded-2xl opacity-60",
            `bg-gradient-to-r from-ctp-${theme.main}/40 via-ctp-${theme.secondary}/40 to-ctp-${theme.main}/40`,
            "animate-pulse"
          )}
          style={{
            background: `conic-gradient(from 0deg, var(--ctp-${theme.main}), var(--ctp-${theme.secondary}), var(--ctp-${theme.main}))`,
            padding: "1px",
            mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
            maskComposite: "xor",
          }}
        />
      )}

      {/* Card Header */}
      <div className="relative z-10 p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-4">
            <div
              className={cn(
                "p-3 rounded-xl relative overflow-hidden",
                `bg-gradient-to-br from-ctp-${theme.main}/20 to-ctp-${theme.main}/10`,
                "border border-white/10 backdrop-blur-sm"
              )}
            >
              <CategoryIcon
                className={`w-6 h-6 text-ctp-${theme.main} relative z-10`}
              />
              <div
                className={cn(
                  "absolute inset-0 rounded-xl opacity-50",
                  `bg-gradient-to-br from-ctp-${theme.main}/30 to-transparent`
                )}
              />
            </div>
            <div>
              <h3
                className={cn(
                  "text-xl font-bold mb-1 bg-gradient-to-r bg-clip-text text-transparent",
                  `from-ctp-${theme.main} to-ctp-${theme.secondary}`
                )}
              >
                {card.category}
              </h3>
              <div className="flex items-center gap-2">
                <div
                  className={cn(
                    "px-3 py-1 rounded-full text-xs font-medium",
                    `bg-ctp-${theme.main}/15 text-ctp-${theme.main} border border-ctp-${theme.main}/20`
                  )}
                >
                  {card.technologies.length}{" "}
                  {card.technologies.length === 1 ? "tech" : "techs"}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Card Content */}
      <div className="relative z-10 px-6 pb-6 h-auto overflow-y-auto custom-scrollbar flex-1">
        <div className="grid gap-3">
          {card.technologies.map((tech, techIndex) => {
            const [name, description] = tech.includes(" - ")
              ? tech.split(" - ")
              : [tech, ""];

            return (
              <motion.div
                key={`${tech}-${techIndex}`}
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{
                  delay: isActive ? techIndex * 0.08 : 0,
                  duration: 0.4,
                  ease: "easeOut",
                }}
                className={cn(
                  "group relative p-4 rounded-xl transition-all duration-300",
                  "bg-gradient-to-br from-ctp-surface0/80 to-ctp-surface0/40",
                  "border border-white/5 backdrop-blur-sm",
                  "hover:border-white/20 hover:shadow-lg hover:shadow-black/20",
                  isActive && "hover:scale-[1.02] hover:-translate-y-1"
                )}
              >
                {/* Tech Item Glow Effect */}
                <div
                  className={cn(
                    "absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300",
                    `bg-gradient-to-r from-ctp-${theme.main}/10 to-ctp-${theme.secondary}/5`
                  )}
                />

                <div className="relative z-10 flex items-start gap-3">
                  <div
                    className={cn(
                      "w-2 h-2 rounded-full mt-2 flex-shrink-0 transition-all duration-300",
                      `bg-gradient-to-r from-ctp-${theme.main} to-ctp-${theme.secondary}`,
                      "group-hover:scale-125 group-hover:shadow-lg",
                      `group-hover:shadow-ctp-${theme.main}/50`
                    )}
                  />
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold text-ctp-text text-sm mb-1 group-hover:text-white transition-colors duration-200">
                      {name}
                    </div>
                    {description && (
                      <div className="text-ctp-subtext0 text-xs leading-relaxed group-hover:text-ctp-subtext1 transition-colors duration-200">
                        {description}
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Card Footer */}
      <div className="relative z-10 px-6 py-4 bg-gradient-to-r from-ctp-surface0/30 to-ctp-surface0/10 backdrop-blur-sm border-t border-white/5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div
              className={cn(
                "w-2 h-2 rounded-full",
                `bg-gradient-to-r from-ctp-${theme.main} to-ctp-${theme.secondary}`
              )}
            />
            <span className="text-ctp-subtext1 text-xs font-medium">
              Stack Layer {card.index + 1}
            </span>
          </div>
          <div
            className={cn(
              "px-3 py-1.5 rounded-lg text-xs font-semibold",
              "bg-gradient-to-r from-black/20 to-black/10",
              "border border-white/10 backdrop-blur-sm",
              `text-ctp-${theme.main}`
            )}
          >
            {card.technologies.length}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TechStack;
