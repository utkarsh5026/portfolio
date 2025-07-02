import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import OutlineNode from "@/components/home/editor/outline/OutlineNode";
import { getIcon } from "./sec-utils";
import useMobile from "@/hooks/use-mobile";
import { Book, LucideIcon } from "lucide-react";
import { sectionColorSchemes } from "./sec-utils";
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
    <OutlineNode id={id} label={label} level={0} icon={getIcon(icon)}>
      <motion.div
        ref={sectionRef}
        id={id}
        className={`${id}-section relative w-full ${className}`}
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{
          duration: 0.6,
          ease: [0.25, 0.46, 0.45, 0.94], // Custom easing for smooth mobile animation
        }}
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
            <motion.div
              className={`absolute bottom-2 left-1/2 transform -translate-x-1/2 w-8 h-1 bg-ctp-surface0/30 rounded-full`}
              initial={{ opacity: 0, scaleX: 0 }}
              animate={
                isInView ? { opacity: 1, scaleX: 1 } : { opacity: 0, scaleX: 0 }
              }
              transition={{ duration: 0.8, delay: 0.5 }}
            />
          )}

          {/* Responsive border decoration with section color */}
          <motion.div
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
            `}
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          />
        </div>

        {isInView && (
          <div className="sr-only" aria-live="polite">
            {label} section loaded
          </div>
        )}
      </motion.div>
    </OutlineNode>
  );
};

export default Section;
