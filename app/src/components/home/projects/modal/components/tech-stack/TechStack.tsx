import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  useMemo,
} from "react";
import { PanInfo } from "framer-motion";
import type { Project } from "@/types";
import type { ProjectTheme } from "@/components/home/projects/context/ThemeContext";
import { Code } from "lucide-react";
import Reveal from "@/components/animations/reveal/Reveal";
import getRandomColors from "@/components/home/projects/context/colors";
import TechStackCard from "./TechStackCard";
import NavigationControls from "./NavigationControls";
import StackLayer from "./StackLayer";

interface TechStackProps {
  project: Project;
  theme: ProjectTheme;
}

const TechStack: React.FC<TechStackProps> = ({ project, theme }) => {
  const [currentIndex, setCurrentIndex] = useState(() => {
    return project.techStack
      ? Math.floor(Object.keys(project.techStack).length / 2)
      : 0;
  });

  const containerRef = useRef<HTMLDivElement>(null);

  const techCards: TechStackCard[] = useMemo(
    () =>
      project.techStack
        ? Object.entries(project.techStack).map(
            ([category, technologies], index) => ({
              category,
              technologies,
              index,
            })
          )
        : [],
    [project.techStack]
  );

  const totalCards = useMemo(() => techCards.length, [techCards]);

  const goToNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % totalCards);
  }, [totalCards]);

  const goToPrevious = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + totalCards) % totalCards);
  }, [totalCards]);

  const goToCard = useCallback((index: number) => {
    setCurrentIndex(index);
  }, []);

  const handleDragEnd = useCallback(
    (_event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
      const THRESHOLD = 50;
      if (info.offset.x > THRESHOLD) goToPrevious();
      else if (info.offset.x < -THRESHOLD) goToNext();
    },
    [goToNext, goToPrevious]
  );

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") goToPrevious();
      if (e.key === "ArrowRight") goToNext();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [goToNext, goToPrevious]);

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
            const cardTheme = getRandomColors(index);

            return (
              <StackLayer
                key={`${card.category}-${index}`}
                itemIndex={index}
                activeItemIndex={currentIndex}
                totalCards={totalCards}
                handleDragEnd={handleDragEnd}
                goToCard={goToCard}
              >
                <TechStackCard
                  card={card}
                  theme={cardTheme}
                  isActive={index === currentIndex}
                />
              </StackLayer>
            );
          })}
        </div>

        {/* Navigation Controls */}
        <NavigationControls
          handleCard={goToCard}
          handleNext={goToNext}
          handlePrev={goToPrevious}
          currentIndex={currentIndex}
          cardTitles={techCards.map((t) => t.category)}
          theme={theme}
        />

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

export default TechStack;
