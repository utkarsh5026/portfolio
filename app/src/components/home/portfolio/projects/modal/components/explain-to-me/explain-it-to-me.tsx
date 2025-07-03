import React, { useState, useRef, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import useTypewriting from "@/components/type-write/hooks/use-type-write";
import { type Phase, phaseConfig } from "./config";
import type { Project } from "@/types";
import PhaseContent from "./phase-content";
import useMobile from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";

interface ExplainItToMeProps {
  project: Project;
}

const phases: Phase[] = ["problem", "execution", "future"];

const ExplainItToMe: React.FC<ExplainItToMeProps> = ({ project }) => {
  const [activeParagraph, setActiveParagraph] = useState(0);
  const [autoScrollEnabled, setAutoScrollEnabled] = useState(true);
  const contentRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const isScrollingProgrammatically = useRef(false);
  const scrollTimeoutRef = useRef<NodeJS.Timeout>();
  const { isMobile } = useMobile();
  const { explain } = project;

  const { displayedText, start, isComplete, reset, progress } = useTypewriting({
    text: activeParagraph < explain.length ? explain[activeParagraph] : "",
    speed: 25,
    delay: 150,
    humanize: true,
    humanizeFactor: 0.6,
    autoStart: false,
    onComplete: () => {
      if (activeParagraph < explain.length - 1) {
        setTimeout(() => {
          setActiveParagraph((prev) => prev + 1);
        }, 1000);
      }
    },
  });

  console.log(displayedText, progress);

  const paragraphRefs = useRef<HTMLDivElement[]>([]);

  // Handle scroll detection to disable auto-scroll when user scrolls manually
  const handleScroll = useCallback(() => {
    if (scrollTimeoutRef.current) {
      clearTimeout(scrollTimeoutRef.current);
    }

    scrollTimeoutRef.current = setTimeout(() => {
      setAutoScrollEnabled(false);
    }, 150); // Small delay to avoid triggering on programmatic scroll
  }, []);

  // Auto-scroll effect - only runs when auto-scroll is enabled
  useEffect(() => {
    if (!autoScrollEnabled || !paragraphRefs.current[activeParagraph]) {
      return;
    }

    isScrollingProgrammatically.current = true;

    paragraphRefs.current[activeParagraph]?.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });

    const resetTimeout = setTimeout(() => {
      isScrollingProgrammatically.current = false;
    }, 1000); // Account for smooth scroll duration

    return () => clearTimeout(resetTimeout);
  }, [activeParagraph, displayedText, autoScrollEnabled]);

  // Set up scroll event listener
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    container.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      container.removeEventListener("scroll", handleScroll);
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, [handleScroll]);

  useEffect(() => {
    if (containerRef.current) start();
    return () => {
      reset();
      setActiveParagraph(0);
      setAutoScrollEnabled(true); // Reset auto-scroll when component unmounts
    };
  }, [start, reset]);

  return (
    <div
      className="mt-6 w-full overflow-auto flex flex-col gap-6 h-full"
      ref={containerRef}
    >
      {/* Optional: Add a button to re-enable auto-scroll */}
      {/* {!autoScrollEnabled && (
        <motion.button
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          onClick={() => setAutoScrollEnabled(true)}
          className="mb-2 px-3 py-1 text-xs bg-ctp-blue text-ctp-base rounded-md hover:bg-ctp-sky transition-colors self-center"
        >
          Re-enable auto-scroll
        </motion.button>
      )} */}

      <div
        ref={contentRef}
        className={cn(
          "relative border-none rounded-xl overflow-hidden shadow-2xl bg-transparent",
          !isMobile && "bg-gradient-to-b from-ctp-base to-ctp-crust p-6"
        )}
      >
        <div className="relative z-10  space-y-6 sm:space-y-8  h-auto">
          {explain.map((paragraph, index) => {
            const phase = phases[index] || "problem";
            const config = phaseConfig[phase];

            return (
              <motion.div
                key={`${paragraph}-${index}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{
                  opacity: index <= activeParagraph ? 1 : 0.3,
                  y: 0,
                }}
                transition={{
                  duration: 0.6,
                  delay: 0.1 + index * 0.1,
                }}
                className={`relative ${
                  index > activeParagraph ? "opacity-30" : ""
                }`}
                ref={(el) =>
                  (paragraphRefs.current[index] = el as HTMLDivElement)
                }
              >
                <PhaseContent
                  explanations={explain}
                  index={index}
                  activeParagraph={activeParagraph}
                  phase={phase}
                  config={config}
                  progress={progress}
                  displayedText={displayedText}
                  isComplete={isComplete}
                />
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ExplainItToMe;
