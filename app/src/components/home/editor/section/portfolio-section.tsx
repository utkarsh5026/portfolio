import { Book, LucideIcon } from "lucide-react";
import React, { useRef } from "react";

import { OutlineNode } from "@/components/home/editor/outline";
import { useInView } from "@/hooks/use-in-view";
import useMobile from "@/hooks/use-mobile";

import { getIcon, sectionColorSchemes } from "./sec-utils";
import styles from "./section.module.css";
import SectionContent from "./section-content";

interface SectionProps {
  id: string;
  label: string;
  title?: string;
  description?: string;
  headerIcon?: LucideIcon;
  className?: string;
  children: React.ReactNode;
  icon?:
    | "terminal"
    | "code"
    | "debug"
    | "class"
    | "api"
    | "database"
    | "server"
    | "magic";
  scanlines?: boolean;
  showHeader?: boolean;
}

const Section: React.FC<SectionProps> = ({
  id,
  label,
  title,
  description,
  headerIcon: HeaderIcon,
  className = "",
  children,
  icon = "code",
  showHeader = false,
}) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const { isMobile } = useMobile();

  // Get color scheme for this section
  const colorScheme =
    sectionColorSchemes[id as keyof typeof sectionColorSchemes] ||
    sectionColorSchemes.home;

  const isInView = useInView(sectionRef, {
    once: true,
    margin: "-10% 0px -10% 0px",
  });

  return (
    <OutlineNode id={id} label={label} icon={getIcon(icon)}>
      <div
        ref={sectionRef}
        id={id}
        className={`${id}-section relative w-full ${className} ${styles.sectionContainer} ${isInView ? styles.sectionVisible : ""}`}
      >
        <div className="relative w-full overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-ctp-surface0/5 via-transparent to-ctp-mantle/5 pointer-events-none" />

          {/* Main content container with mobile-first responsive design */}
          <SectionContent
            title={title || ""}
            description={description || ""}
            icon={HeaderIcon || Book}
            colorScheme={colorScheme}
            showHeader={showHeader}
            isInView={isInView}
            children={children}
            ref={contentRef}
          />

          {/* Mobile scroll indicator (subtle visual cue) */}
          {isMobile && (
            <div
              className={`absolute bottom-2 left-1/2 w-8 h-1 bg-ctp-surface0/30 rounded-full ${styles.scrollbar} ${isInView ? styles.scrollbarVisible : ""}`}
            />
          )}

          {/* Responsive border decoration with section color */}
          <div
            className={`
              absolute inset-0 rounded-none
              sm:rounded-lg
              lg:rounded-xl

              border-0
              sm:border border-${colorScheme.primary}/10

              shadow-none
              sm:shadow-sm
              lg:shadow-md lg:shadow-${colorScheme.primary}/5

              pointer-events-none
              ${styles.borderDeco} ${isInView ? styles.borderDecoVisible : ""}
            `}
          />
        </div>

        {isInView && (
          <div className="sr-only" aria-live="polite">
            {label} section loaded
          </div>
        )}
      </div>
    </OutlineNode>
  );
};

export default Section;
