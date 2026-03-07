import { LucideIcon } from "lucide-react";
import React from "react";
import { VscGitCommit } from "react-icons/vsc";

import Reveal from "@/components/animations/reveal/Reveal";
import { relativeTime } from "@/lib/utils";
import useGitMetaStore, {
  type ComponentMeta,
} from "@/store/git-store/git-meta-store";

import { sectionColorSchemes } from "./sec-utils";
import styles from "./section.module.css";

type SectionColorScheme =
  (typeof sectionColorSchemes)[keyof typeof sectionColorSchemes];

interface SectionHeaderProps {
  title?: string;
  description?: string;
  icon?: LucideIcon;
  colorScheme: SectionColorScheme;
  showHeader?: boolean;
  blameMeta?: ComponentMeta | null;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({
  title,
  description,
  icon: HeaderIcon,
  colorScheme,
  showHeader = false,
  blameMeta,
}) => {
  const getAuthor = useGitMetaStore((s) => s.getAuthor);
  const authorMeta = blameMeta ? getAuthor(blameMeta.author) : null;

  if (!showHeader || !title) {
    return null;
  }

  return (
    <Reveal effect="fade-up" duration={0.8}>
      <div className="flex flex-col items-start text-left mb-6 sm:mb-8 md:mb-10 font-source w-full">
        <div className="text-ctp-overlay1 text-sm sm:text-base md:text-lg w-full">
          <div className="flex items-center gap-2">
            <span>/**</span>
          </div>
          <div className="flex items-center gap-2 sm:gap-2.5 ml-4">
            <span>*</span>
            {HeaderIcon && (
              <HeaderIcon
                className={`w-4 h-4 sm:w-5 sm:h-5 text-${colorScheme.primary}`}
              />
            )}
            <h2
              className={`font-semibold bg-gradient-to-r ${colorScheme.gradient} bg-clip-text text-transparent ${styles.headerTitle}`}
            >
              @section {title}
            </h2>
          </div>

          {description && (
            <div className={`ml-4 flex gap-2 ${styles.headerDesc}`}>
              <span>*</span>
              <p className="max-w-2xl leading-relaxed">{description}</p>
            </div>
          )}

          {blameMeta && (
            <div className="ml-4 flex items-center gap-2 text-ctp-overlay0 text-xs sm:text-sm mt-0.5">
              <span>*</span>
              <VscGitCommit className="w-3 h-3 text-ctp-green flex-shrink-0" />
              {authorMeta?.avatar && (
                <img
                  src={authorMeta.avatar}
                  alt={blameMeta.author}
                  className="w-4 h-4 rounded-full flex-shrink-0"
                />
              )}
              <span className="text-ctp-subtext0">{blameMeta.author}</span>
              <span>·</span>
              <span>{relativeTime(blameMeta.date)}</span>
              <span>·</span>
              <span className="text-ctp-subtext0 truncate max-w-[260px]">
                {blameMeta.message.length > 55
                  ? blameMeta.message.slice(0, 55) + "…"
                  : blameMeta.message}
              </span>
              <span className="text-ctp-surface2 flex-shrink-0">
                ({blameMeta.shortHash})
              </span>
            </div>
          )}

          <div className="flex items-center gap-2">
            <span>*/</span>
          </div>
        </div>
      </div>
    </Reveal>
  );
};

export default SectionHeader;
