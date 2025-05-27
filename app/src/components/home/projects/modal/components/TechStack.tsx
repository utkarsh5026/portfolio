import React, { useState, useEffect, useRef } from "react";
import { motion, PanInfo } from "framer-motion";
import type { Project } from "@/types";
import type { ProjectTheme } from "@/components/home/projects/context/ThemeContext";
import { ChevronLeft, ChevronRight, Code } from "lucide-react";
import Reveal from "@/components/animations/reveal/Reveal";
import { cn } from "@/lib/utils";
import getCategoryIcon from "@/components/base/category-icon";
import { Button } from "@/components/ui/button";

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

            const translateX = stackOffset * 26;
            const translateY = absOffset * 12;
            const scale = isActive ? 1 : Math.max(0.92, 1 - absOffset * 0.04);
            const zIndex = totalCards - absOffset;

            const rotate = isActive ? 0 : stackOffset * 3.5;

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
                <TechStackCard card={card} theme={theme} isActive={isActive} />
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
        "w-full h-full rounded-xl overflow-hidden",
        "bg-ctp-mantle border border-ctp-surface0",
        "shadow-lg",
        isActive
          ? `shadow-xl shadow-ctp-${theme.main}/20 border-ctp-${theme.main}/30`
          : "shadow-ctp-base/20"
      )}
    >
      {/* Card Header */}
      <div
        className={cn(
          "p-4 border-b border-ctp-surface0",
          `bg-gradient-to-r from-ctp-${theme.main}/10 to-ctp-${theme.secondary}/10`
        )}
      >
        <div className="flex items-center gap-3">
          <div
            className={cn(
              "p-2 rounded-lg",
              `bg-ctp-${theme.main}/20 border border-ctp-${theme.main}/30`
            )}
          >
            <CategoryIcon className={`w-5 h-5 text-${theme.main}`} />
          </div>
          <div>
            <h3 className={`text-lg font-bold text-ctp-${theme.main}`}>
              {card.category}
            </h3>
            <p className="text-ctp-subtext0 text-sm">
              {card.technologies.length}{" "}
              {card.technologies.length === 1 ? "technology" : "technologies"}
            </p>
          </div>
        </div>
      </div>

      {/* Card Content */}
      <div className="p-4 h-auto overflow-y-auto custom-scrollbar">
        <div className="space-y-3">
          {card.technologies.map((tech, techIndex) => {
            const [name, description] = tech.includes(" - ")
              ? tech.split(" - ")
              : [tech, ""];

            return (
              <motion.div
                key={`${tech}-${techIndex}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: isActive ? techIndex * 0.05 : 0,
                  duration: 0.3,
                }}
                className={cn(
                  "p-3 rounded-lg transition-all duration-200",
                  "bg-ctp-surface0 hover:bg-ctp-surface1",
                  "border border-ctp-surface1/50",
                  isActive && "hover:scale-[1.01]"
                )}
              >
                <div className="flex items-start gap-3">
                  <div
                    className={cn(
                      "w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0",
                      `bg-ctp-${theme.main}`
                    )}
                  />
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-ctp-text text-sm">
                      {name}
                    </div>
                    {description && (
                      <div className="text-ctp-subtext0 text-xs mt-1 leading-relaxed">
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
      <div className="px-4 py-3 border-t border-ctp-surface0 bg-ctp-surface0/30">
        <div className="flex items-center justify-between">
          <span className="text-ctp-subtext1 text-xs">
            Layer {card.index + 1}
          </span>
          <div
            className={cn(
              "px-2 py-1 rounded-full text-xs font-medium",
              `bg-ctp-${theme.main}/20 text-ctp-${theme.main}`
            )}
          >
            {card.technologies.length} items
          </div>
        </div>
      </div>
    </div>
  );
};

export default TechStack;
