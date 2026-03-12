import { ArrowUpRight } from "lucide-react";

import Reveal from "@/components/animations/reveal/Reveal";
import { useGitComponent } from "@/hooks/use-git-component";
import { useImageLoad } from "@/hooks/use-image-load";
import { cn } from "@/lib/utils";

import { articles } from "./articles-dump";

interface ArticleCardProps {
  article: (typeof articles)[0];
  index: number;
}

const ArticleCard: React.FC<ArticleCardProps> = ({ article, index }) => {
  const { loaded, error, imgProps } = useImageLoad();
  const gitRef = useGitComponent<HTMLAnchorElement>("ArticleCard");

  return (
    <Reveal effect="fade-up" duration={0.5} delay={index * 0.1}>
      <a
        ref={gitRef}
        href={article.link}
        target="_blank"
        rel="noopener noreferrer"
        className="group flex h-full flex-col"
      >
        <div
          className={cn(
            "relative flex flex-col h-full rounded-2xl sm:rounded-[24px] transition-all duration-300 p-2 sm:p-2.5",
            "bg-gradient-to-b from-ctp-surface1/40 to-ctp-surface0/20",
            "border border-ctp-surface1/60",
            "overflow-hidden",
            "sm:hover:border-ctp-pink/40 sm:hover:shadow-lg sm:hover:shadow-ctp-pink/10",
            "sm:hover:-translate-y-1.5",
            "active:scale-[0.98] sm:active:scale-100"
          )}
        >
          {/* Image Header wrapper - 16:9 aspect ratio */}
          <div className="relative aspect-video w-full overflow-hidden rounded-xl sm:rounded-[16px] bg-ctp-surface0">
            {!loaded && !error && (
              <div className="absolute inset-0 bg-ctp-surface0/80 animate-pulse">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-ctp-surface1/20 to-transparent skeleton-shimmer" />
              </div>
            )}

            {error && (
              <div className="absolute inset-0 flex items-center justify-center bg-ctp-surface0/50">
                <span className="text-ctp-subtext0 text-xs text-center px-4">
                  Failed to load image
                </span>
              </div>
            )}

            {/* Image */}
            <img
              src={article.imageUrl}
              alt={article.title}
              loading="lazy"
              {...imgProps}
              className={cn(
                "absolute inset-0 w-full h-full object-cover transition-all duration-700 ease-out",
                "saturate-[0.85] brightness-[0.85]",
                "sm:group-hover:scale-105 sm:group-hover:saturate-100 sm:group-hover:brightness-100",
                loaded ? "opacity-90" : "opacity-0"
              )}
            />

            {/* Persistent subtle dark wash to soften the image */}
            <div className="absolute inset-0 bg-ctp-crust/20 pointer-events-none transition-opacity duration-500 sm:group-hover:opacity-0" />

            {/* Overlay for premium vibe on hover */}
            <div className="absolute inset-0 bg-gradient-to-t from-ctp-base/70 via-ctp-base/10 to-transparent opacity-0 sm:group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

            <div className="absolute top-3 right-3 sm:top-4 sm:right-4">
              <div className="bg-ctp-base/90 p-1.5 sm:p-2 rounded-full text-ctp-text opacity-0 sm:group-hover:opacity-100 transform translate-y-2 sm:group-hover:translate-y-0 shadow-lg transition-all duration-300 backdrop-blur-sm border border-ctp-surface1/50">
                <ArrowUpRight className="w-3 h-3 sm:w-4 sm:h-4 text-ctp-pink" />
              </div>
            </div>
          </div>

          {/* Content Body */}
          <div className="flex flex-col flex-grow pt-4 sm:pt-5 px-2 sm:px-3 pb-2 sm:pb-3 bg-transparent relative z-10">
            <h3
              className={cn(
                "text-sm sm:text-[15px] font-semibold text-ctp-text line-clamp-3 leading-snug",
                "transition-colors duration-300",
                "sm:group-hover:text-ctp-pink"
              )}
              title={article.title}
            >
              {article.title}
            </h3>

            <div className="mt-auto pt-4 sm:pt-6 flex items-center justify-between">
              <span className="text-xs font-medium text-ctp-subtext0 flex items-center gap-1.5 transition-colors sm:group-hover:text-ctp-text">
                Read Article
              </span>
            </div>
          </div>

          {/* Animated decorative line at the bottom */}
          <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-gradient-to-r from-ctp-pink to-ctp-mauve transition-all duration-500 sm:group-hover:w-full z-20" />
        </div>
      </a>
    </Reveal>
  );
};

export default ArticleCard;
