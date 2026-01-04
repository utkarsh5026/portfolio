import React, { useState, useCallback, useMemo } from "react";
import { type Phase } from "./config";
import type { Project } from "@/types";
import { useMobileContext } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";
import {
  FlashcardDeck,
  FlashcardNavigation,
  PhaseTabs,
  useFlashcardNavigation,
} from "./flashcard";

interface ExplainItToMeProps {
  project: Project;
}

const ExplainItToMe: React.FC<ExplainItToMeProps> = ({ project }) => {
  const { isMobile } = useMobileContext();
  const [activePhase, setActivePhase] = useState<Phase>("problem");
  const [cardIndices, setCardIndices] = useState<Record<Phase, number>>({
    problem: 0,
    execution: 0,
    future: 0,
  });
  const [direction, setDirection] = useState(0);

  const cards = useMemo(() => project.explainCards, [project.explainCards]);

  const currentCards = cards[activePhase];
  const currentIndex = cardIndices[activePhase];

  const cardCounts = useMemo(
    () => ({
      problem: cards.problem.length,
      execution: cards.execution.length,
      future: cards.future.length,
    }),
    [cards]
  );

  const navigateCard = useCallback(
    (dir: number) => {
      setDirection(dir);
      setCardIndices((prev) => ({
        ...prev,
        [activePhase]: Math.max(
          0,
          Math.min(prev[activePhase] + dir, currentCards.length - 1)
        ),
      }));
    },
    [activePhase, currentCards.length]
  );

  const handlePhaseChange = useCallback((phase: Phase) => {
    setActivePhase(phase);
    setDirection(0);
  }, []);

  const { swipeHandlers, canGoNext, canGoPrev } = useFlashcardNavigation({
    onNext: () => navigateCard(1),
    onPrev: () => navigateCard(-1),
    totalCards: currentCards.length,
    currentIndex,
    enabled: true,
  });

  return (
    <div
      className={cn(
        "mt-4 w-full flex flex-col gap-4",
        isMobile ? "px-1" : "px-2"
      )}
      {...swipeHandlers}
    >
      {/* Phase Selection Tabs */}
      <PhaseTabs
        activePhase={activePhase}
        onPhaseChange={handlePhaseChange}
        cardCounts={cardCounts}
      />

      {/* Single Card View */}
      <FlashcardDeck
        cards={currentCards}
        phase={activePhase}
        currentIndex={currentIndex}
        direction={direction}
      />

      {/* Navigation Controls */}
      <FlashcardNavigation
        currentIndex={currentIndex}
        totalCards={currentCards.length}
        onNavigate={navigateCard}
        phase={activePhase}
        canGoNext={canGoNext}
        canGoPrev={canGoPrev}
      />

      {/* Keyboard Hint (desktop only) */}
      {!isMobile && (
        <div className="text-center text-ctp-overlay0 text-xs">
          Use{" "}
          <kbd className="px-1.5 py-0.5 bg-ctp-surface0 rounded text-ctp-subtext0">
            ←
          </kbd>{" "}
          <kbd className="px-1.5 py-0.5 bg-ctp-surface0 rounded text-ctp-subtext0">
            →
          </kbd>{" "}
          to navigate
        </div>
      )}
    </div>
  );
};

export default ExplainItToMe;
