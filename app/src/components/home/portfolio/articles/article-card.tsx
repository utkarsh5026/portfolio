import { useState } from "react";
import { ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";
import { articles } from "./articles-dump";
import Reveal from "@/components/animations/reveal/Reveal";

interface ArticleCardProps {
  article: (typeof articles)[0];
  index: number;
}

const ArticleCard: React.FC<ArticleCardProps> = ({ article, index }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  return (
    <Reveal effect="fade-up" duration={0.5} delay={index * 0.1}>
      <a
        href={article.link}
        target="_blank"
        rel="noopener noreferrer"
        className="group block"
      >
        <div
          className={cn(
            "relative rounded-lg sm:rounded-xl p-[1px] transition-all duration-300",
            "bg-gradient-to-b from-ctp-surface1/60 via-ctp-surface0/30 to-ctp-surface1/60",
            "sm:hover:from-ctp-pink/50 sm:hover:via-ctp-mauve/30 sm:hover:to-ctp-pink/50",
            "sm:hover:shadow-xl sm:hover:shadow-ctp-pink/10",
            "sm:hover:-translate-y-2",
            "active:scale-[0.98] sm:active:scale-100"
          )}
        >
          {/* Fixed aspect ratio container for consistent card heights */}
          <div className="relative aspect-[3/4] sm:aspect-[3/4] overflow-hidden rounded-[7px] sm:rounded-[11px] bg-ctp-base">
            {!isLoaded && !hasError && (
              <div className="absolute inset-0 bg-ctp-surface0/50 animate-pulse">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-ctp-surface1/30 to-transparent skeleton-shimmer" />
              </div>
            )}

            {hasError && (
              <div className="absolute inset-0 flex items-center justify-center bg-ctp-surface0/50">
                <span className="text-ctp-subtext0 text-xs">
                  Failed to load
                </span>
              </div>
            )}

            {/* Image with lazy loading and fade-in */}
            <img
              src={article.imageUrl}
              alt={article.title}
              loading="lazy"
              onLoad={() => setIsLoaded(true)}
              onError={() => setHasError(true)}
              className={cn(
                "absolute inset-0 w-full h-full object-cover object-top transition-all duration-500",
                "brightness-[0.8] contrast-[0.95] saturate-[0.85]",
                "sm:group-hover:brightness-[0.85] sm:group-hover:scale-105",
                isLoaded ? "opacity-100" : "opacity-0"
              )}
            />

            {/* Vignette effect */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  "radial-gradient(ellipse at center, transparent 30%, rgba(0, 0, 0, 0.5) 100%)",
              }}
            />

            {/* Bottom gradient - transparent to dark */}
            <div
              className="absolute inset-x-0 bottom-0 h-1/2 pointer-events-none"
              style={{
                background:
                  "linear-gradient(to bottom, transparent 0%, rgba(17, 17, 27, 0.7) 50%, rgba(17, 17, 27, 0.95) 100%)",
              }}
            />

            {/* Netflix-style title overlay at bottom */}
            <div className="absolute bottom-0 left-0 right-0 p-2 sm:p-4">
              <div
                className={cn(
                  "bg-ctp-base/85 backdrop-blur-md rounded-md sm:rounded-lg p-2 sm:p-3",
                  "border border-ctp-surface1/40",
                  "transition-all duration-300",
                  "sm:group-hover:bg-ctp-base/90 sm:group-hover:border-ctp-pink/40"
                )}
              >
                <h3
                  className={cn(
                    "text-xs sm:text-sm font-semibold text-ctp-text line-clamp-2",
                    "sm:group-hover:text-ctp-pink transition-colors duration-300"
                  )}
                >
                  {article.title}
                </h3>
                {/* Always visible on mobile, hover on desktop */}
                <div
                  className={cn(
                    "flex items-center gap-1 sm:gap-1.5 mt-1.5 sm:mt-2 text-[10px] sm:text-xs text-ctp-subtext0",
                    "opacity-100 sm:opacity-0 sm:max-h-0 sm:overflow-hidden",
                    "sm:group-hover:opacity-100 sm:group-hover:max-h-10",
                    "transition-all duration-300"
                  )}
                >
                  <ExternalLink className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                  <span>Read on Medium</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </a>
    </Reveal>
  );
};

export default ArticleCard;
