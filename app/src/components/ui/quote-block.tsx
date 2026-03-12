import React from "react";

import { cn } from "@/lib/utils";

interface QuoteBlockProps {
  quote: string;
  attribution?: string;
  className?: string;
}

const QuoteBlock: React.FC<QuoteBlockProps> = ({
  quote,
  attribution,
  className,
}) => (
  <div className={cn("relative pl-5 border-l-2 border-ctp-blue/50", className)}>
    <p className="text-sm sm:text-base text-ctp-subtext1 italic leading-relaxed">
      {quote}
    </p>
    {attribution && (
      <span className="mt-2 block text-xs text-ctp-subtext0 not-italic">
        {attribution}
      </span>
    )}
  </div>
);

export default QuoteBlock;
