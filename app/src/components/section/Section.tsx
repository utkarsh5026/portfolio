import React, { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import OutlineNode from "@/components/home/editor/outline/OutlineNode";
import { getIcon } from "./sec-utils";

interface SectionProps {
  id: string;
  label: string;
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
}

const Section: React.FC<SectionProps> = ({
  id,
  label,
  className = "",
  children,
  icon = "code",
  scanlines = false,
}) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile viewport
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

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
        {/* Mobile-optimized container with responsive design */}
        <div className="relative w-full overflow-hidden">
          {/* Enhanced background with mobile considerations */}
          <div className="absolute inset-0 bg-gradient-to-br from-ctp-surface0/5 via-transparent to-ctp-mantle/5 pointer-events-none" />

          {/* Adaptive scanlines effect - more subtle on mobile */}
          {scanlines && (
            <motion.div
              className="absolute inset-0 z-10 pointer-events-none"
              initial={{ opacity: 0 }}
              animate={{ opacity: isInView ? 1 : 0 }}
              transition={{ duration: 1, delay: 0.3 }}
            >
              <div
                className={`absolute inset-0 ${
                  isMobile ? "opacity-5" : "opacity-10"
                }`}
                style={{
                  backgroundImage: `repeating-linear-gradient(
                    0deg, 
                    transparent, 
                    transparent ${isMobile ? "2px" : "1px"}, 
                    rgba(0, 0, 0, 0.3) ${isMobile ? "2px" : "1px"}, 
                    rgba(0, 0, 0, 0.3) ${isMobile ? "3px" : "2px"}
                  )`,
                  backgroundSize: `100% ${isMobile ? "3px" : "2px"}`,
                }}
              />
            </motion.div>
          )}

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
                
                focus-within:outline-none focus-within:ring-2 focus-within:ring-ctp-blue/20 focus-within:ring-offset-2
                
                transition-all duration-300 ease-out
              `}
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
            >
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
                transition={{ duration: 0.6, delay: 0.3 }}
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
              className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-8 h-1 bg-ctp-surface2/30 rounded-full"
              initial={{ opacity: 0, scaleX: 0 }}
              animate={
                isInView ? { opacity: 1, scaleX: 1 } : { opacity: 0, scaleX: 0 }
              }
              transition={{ duration: 0.8, delay: 0.5 }}
            />
          )}

          {/* Responsive border decoration */}
          <motion.div
            className={`
              absolute inset-0 rounded-none
              sm:rounded-lg
              lg:rounded-xl
              
              border-0
              sm:border border-ctp-surface1/10
              
              shadow-none
              sm:shadow-sm
              lg:shadow-md
              
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
