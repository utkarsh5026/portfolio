import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import OutlineNode from "@/components/home/editor/outline/OutlineNode";
import { getIcon } from "./sec-utils";
import useMobile from "@/hooks/use-mobile";
import Reveal from "@/components/animations/reveal/Reveal";
import { LucideIcon } from "lucide-react";

// Color schemes for different sections
const sectionColorSchemes = {
  home: {
    primary: "ctp-blue",
    secondary: "ctp-sapphire",
    accent: "ctp-sky",
    gradient: "from-ctp-blue via-ctp-sapphire to-ctp-sky",
  },
  about: {
    primary: "ctp-mauve",
    secondary: "ctp-pink",
    accent: "ctp-lavender",
    gradient: "from-ctp-mauve via-ctp-pink to-ctp-lavender",
  },
  skills: {
    primary: "ctp-green",
    secondary: "ctp-teal",
    accent: "ctp-sapphire",
    gradient: "from-ctp-green via-ctp-teal to-ctp-sapphire",
  },
  projects: {
    primary: "ctp-yellow",
    secondary: "ctp-peach",
    accent: "ctp-red",
    gradient: "from-ctp-yellow via-ctp-peach to-ctp-red",
  },
  experience: {
    primary: "ctp-blue",
    secondary: "ctp-lavender",
    accent: "ctp-mauve",
    gradient: "from-ctp-blue via-ctp-lavender to-ctp-mauve",
  },
  contact: {
    primary: "ctp-pink",
    secondary: "ctp-mauve",
    accent: "ctp-flamingo",
    gradient: "from-ctp-pink via-ctp-mauve to-ctp-flamingo",
  },
  learning: {
    primary: "ctp-peach",
    secondary: "ctp-yellow",
    accent: "ctp-green",
    gradient: "from-ctp-peach via-ctp-yellow to-ctp-green",
  },
  articles: {
    primary: "ctp-pink",
    secondary: "ctp-mauve",
    accent: "ctp-lavender",
    gradient: "from-ctp-pink via-ctp-mauve to-ctp-lavender",
  },
} as const;

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

  // Intersection observer for progressive loading
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
          <div className="relative w-full">
            {/* Mobile-optimized content wrapper */}
            <motion.div
              ref={contentRef}
              className={`
                px-4 py-6
                sm:px-6 sm:py-8
                md:px-8 md:py-10
                lg:px-10 lg:py-12
                xl:px-12 xl:py-14
                
                w-full max-w-full
                
                overflow-x-hidden overflow-y-auto
                
                overscroll-behavior-y-contain
                
                focus-within:outline-none focus-within:ring-2 focus-within:ring-${colorScheme.primary}/20 focus-within:ring-offset-2
                
                transition-all duration-300 ease-out
              `}
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
            >
              {/* Section Header */}
              {showHeader && title && (
                <Reveal effect="fade-up" duration={0.8}>
                  <div className="text-center mb-6 sm:mb-8 md:mb-12 lg:mb-16">
                    <div className="flex flex-col items-center justify-center gap-2 mb-3 sm:mb-4">
                      {HeaderIcon && (
                        <motion.div
                          className={`p-2 sm:p-2.5 md:p-3 rounded-xl sm:rounded-2xl bg-gradient-to-r from-${colorScheme.primary}/20 to-${colorScheme.secondary}/20 backdrop-blur-sm flex-shrink-0`}
                          whileHover={{ rotate: 5, scale: 1.05 }}
                          transition={{ type: "spring", stiffness: 300 }}
                        >
                          <HeaderIcon
                            className={`w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-${colorScheme.primary}`}
                          />
                        </motion.div>
                      )}

                      <motion.h2
                        className={`text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r ${colorScheme.gradient} bg-clip-text text-transparent text-center leading-tight`}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2, duration: 0.6 }}
                      >
                        {title}
                      </motion.h2>
                    </div>

                    {description && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3, duration: 0.6 }}
                        className="flex flex-col items-center justify-center gap-1 mb-4 sm:mb-6 px-1"
                      >
                        <p className="text-ctp-subtext0 text-sm sm:text-base md:text-lg lg:text-xl max-w-2xl mx-auto px-2 leading-relaxed text-center">
                          {description}
                        </p>
                      </motion.div>
                    )}

                    {/* Animated decorative line */}
                    <motion.div
                      initial={{ scaleX: 0, opacity: 0 }}
                      animate={{ scaleX: 1, opacity: 1 }}
                      transition={{ delay: 0.5, duration: 0.8 }}
                      className={`h-px bg-gradient-to-r from-transparent via-${colorScheme.primary}/50 to-transparent mx-auto w-24 sm:w-32 md:w-48 lg:w-64`}
                    />
                  </div>
                </Reveal>
              )}

              <motion.div
                className={`
                  space-y-6
                  sm:space-y-8
                  lg:space-y-10
                  
                  text-sm
                  sm:text-base
                  lg:text-lg
                  
                  leading-relaxed
                  sm:leading-relaxed
                  lg:leading-loose
                `}
                initial={{ opacity: 0, y: 15 }}
                animate={
                  isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }
                }
                transition={{ duration: 0.6, delay: showHeader ? 0.6 : 0.3 }}
              >
                {children}
              </motion.div>

              {/* Mobile-friendly bottom spacing */}
              <div className="h-4 sm:h-6 lg:h-8" />
            </motion.div>
          </div>

          {/* Mobile scroll indicator (subtle visual cue) */}
          {isMobile && (
            <motion.div
              className={`absolute bottom-2 left-1/2 transform -translate-x-1/2 w-8 h-1 bg-${colorScheme.primary}/30 rounded-full`}
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
