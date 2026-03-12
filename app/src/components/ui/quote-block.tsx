import { Quote } from "lucide-react";
import React from "react";

import { cn } from "@/lib/utils";

interface QuoteBlockProps {
  quote: string;
  attribution?: string;
  className?: string;
}

/**
 * Gradient-background quote callout with an optional attribution line.
 *
 * @example
 * <QuoteBlock
 *   quote="In the beginner's mind there are many possibilities..."
 *   attribution="Shunryu Suzuki"
 * />
 */
const QuoteBlock: React.FC<QuoteBlockProps> = ({
  quote,
  attribution,
  className,
}) => (
  <div
    className={cn(
      "p-3 sm:p-4 md:p-6 bg-gradient-to-r from-ctp-surface0/30 via-ctp-mantle/20 to-ctp-surface0/30 rounded-xl sm:rounded-2xl border border-ctp-surface1/30 text-center",
      className
    )}
  >
    <Quote className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-ctp-blue mx-auto mb-2 sm:mb-3 opacity-60" />
    <p className="text-ctp-text font-medium italic mb-1 sm:mb-2 text-xs sm:text-sm md:text-base leading-relaxed break-words">
      &ldquo;{quote}&rdquo;
    </p>
    {attribution && (
      <div className="flex items-center justify-center gap-2 text-ctp-subtext0 text-xs sm:text-sm">
        <span>{attribution}</span>
      </div>
    )}
  </div>
);

export default QuoteBlock;
