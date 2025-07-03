import React, { useState, useRef, useEffect } from "react";
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
  const contentRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
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

  useEffect(() => {
    if (containerRef.current) start();
    return () => {
      reset();
      setActiveParagraph(0);
    };
  }, [start, reset]);

  return (
    <div
      className="mt-6 w-full overflow-auto flex flex-col gap-6 h-full"
      ref={containerRef}
    >
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
