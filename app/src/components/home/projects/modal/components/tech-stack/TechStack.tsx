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
      <Reveal className="p-4 sm:p-8">
        <div className="text-center py-8 sm:py-12">
          <Code className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-4 text-white/30" />
          <p className="text-white/60 text-sm sm:text-base">
            No technology stack information available
          </p>
        </div>
      </Reveal>
    );
  }

  return (
    <Reveal className="p-3 sm:p-4 lg:p-8">
      <div className="mb-6 sm:mb-8">
        <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white mb-2">
          Technology Stack
        </h2>
        <p className="text-white/60 text-xs sm:text-sm lg:text-base">
          The tools and technologies powering this project
        </p>
      </div>

      <div className="relative w-full max-w-6xl mx-auto h-full">
        <div
          ref={containerRef}
          className="relative flex items-center justify-center overflow-auto  h-[600px]"
        >
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
      </div>
    </Reveal>
  );
};

export default TechStack;
