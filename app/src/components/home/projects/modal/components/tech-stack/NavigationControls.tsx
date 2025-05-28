import { ChevronRight, ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { ProjectTheme } from "@/components/home/projects/context/ThemeContext";

interface NavigationControlsProps {
  handlePrev: () => void;
  handleNext: () => void;
  handleCard: (index: number) => void;
  currentIndex: number;
  theme: ProjectTheme;
  cardTitles: string[];
}

const NavigationControls: React.FC<NavigationControlsProps> = ({
  handlePrev,
  handleNext,
  handleCard,
  currentIndex,
  theme,
  cardTitles,
}) => {
  const totalCards = cardTitles.length;
  return (
    <div className="flex items-center justify-between mt-8 px-4">
      <Button
        variant="ghost"
        size="icon"
        onClick={handlePrev}
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

      <Button
        variant="ghost"
        size="icon"
        onClick={handleNext}
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
  );
};

export default NavigationControls;
