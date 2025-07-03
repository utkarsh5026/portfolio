import { ChevronRight, ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { ProjectTheme } from "@/components/home/portfolio/projects/context/ThemeContext";

interface NavigationControlsProps {
  handlePrev: () => void;
  handleNext: () => void;
  handleCard: (index: number) => void;
  currentIndex: number;
  theme: ProjectTheme;
  cardTitles: string[];
  layout?: "left" | "right" | "indicators" | "full";
}

const NavigationControls: React.FC<NavigationControlsProps> = ({
  handlePrev,
  handleNext,
  handleCard,
  currentIndex,
  theme,
  cardTitles,
  layout = "full",
}) => {
  const totalCards = cardTitles.length;

  const buttonClasses = cn(
    "flex items-center justify-center w-12 h-12 rounded-full",
    "bg-ctp-surface0 border border-ctp-surface1",
    "hover:bg-ctp-surface1 hover:border-ctp-surface2",
    "transition-all duration-200 hover:scale-105",
    "disabled:opacity-50 disabled:cursor-not-allowed"
  );

  // Left navigation button only
  if (layout === "left") {
    return (
      <Button
        variant="ghost"
        size="icon"
        onClick={handlePrev}
        className={buttonClasses}
        disabled={totalCards <= 1}
      >
        <ChevronLeft className="w-5 h-5 text-ctp-text" />
      </Button>
    );
  }

  // Right navigation button only
  if (layout === "right") {
    return (
      <Button
        variant="ghost"
        size="icon"
        onClick={handleNext}
        className={buttonClasses}
        disabled={totalCards <= 1}
      >
        <ChevronRight className="w-5 h-5 text-ctp-text" />
      </Button>
    );
  }

  // Card indicators only
  if (layout === "indicators") {
    return (
      <div className="flex items-center gap-2 mt-4">
        {cardTitles.map((techCard, index) => (
          <Button
            key={techCard}
            variant="ghost"
            size="icon"
            onClick={() => handleCard(index)}
            className={cn(
              "transition-all duration-200 rounded-full",
              index === currentIndex
                ? `w-8 h-3 bg-ctp-${theme.main}`
                : "w-3 h-3 bg-ctp-surface1 hover:bg-ctp-surface2"
            )}
          />
        ))}
      </div>
    );
  }

  // Original full layout (fallback)
  return (
    <div className="flex items-center justify-between mt-4 sm:mt-6 lg:mt-8 px-2 sm:px-4">
      <Button
        variant="ghost"
        size="icon"
        onClick={handlePrev}
        className={buttonClasses}
        disabled={totalCards <= 1}
      >
        <ChevronLeft className="w-5 h-5 text-ctp-text" />
      </Button>

      {/* Card Indicators */}
      <div className="flex items-center gap-1.5 sm:gap-2">
        {cardTitles.map((techCard, index) => (
          <Button
            key={techCard}
            variant="ghost"
            size="icon"
            onClick={() => handleCard(index)}
            className={cn(
              "transition-all duration-200 rounded-full",
              index === currentIndex
                ? `w-6 sm:w-8 h-2.5 sm:h-3 bg-ctp-${theme.main}`
                : "w-2.5 sm:w-3 h-2.5 sm:h-3 bg-ctp-surface1 hover:bg-ctp-surface2"
            )}
          />
        ))}
      </div>

      <Button
        variant="ghost"
        size="icon"
        onClick={handleNext}
        className={buttonClasses}
        disabled={totalCards <= 1}
      >
        <ChevronRight className="w-5 h-5 text-ctp-text" />
      </Button>
    </div>
  );
};

export default NavigationControls;
