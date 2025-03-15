import React, { useState, useRef, useEffect, memo, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Brain } from "lucide-react";
import { cn } from "@/lib/utils";
import useTypewriting from "@/components/type-write/hooks/use-type-write";
import { useProjectTheme } from "../context/ThemeContext";
import type { Project } from "@/types";
import type { ProjectTheme } from "../context/ThemeContext";

/**
 * Highlight technical terms in the explanation text with appropriate colors
 * This creates a visually rich reading experience where important terms stand out
 */
const processText = (text: string) => {
  // Define categories of terms to highlight
  const highlights = {
    blue: ["React", "TypeScript", "Python", "Docker", "Go", "MongoDB"],
    mauve: ["API", "CSS", "SVG", "JSON", "UI", "UX", "CLI"],
    green: ["goroutines", "concurrency", "performance", "optimization"],
    peach: ["security", "visualization", "analytics", "microservices"],
  };

  // Create regex patterns for each category
  const patterns = Object.entries(highlights).reduce((acc, [color, terms]) => {
    acc[color] = new RegExp(`(${terms.join("|")})`, "g");
    return acc;
  }, {} as Record<string, RegExp>);

  // Apply highlighting
  let processedText = text;
  Object.entries(patterns).forEach(([color, pattern]) => {
    processedText = processedText.replace(
      pattern,
      (match) => `<span class="font-medium text-ctp-${color}">${match}</span>`
    );
  });

  return <span dangerouslySetInnerHTML={{ __html: processedText }} />;
};

interface ExplainItToMeProps {
  project: Project;
}

/**
 * ExplainItToMe Component
 *
 * This component is responsible for displaying an interactive explanation of a project.
 * It utilizes a typewriting effect to reveal text paragraph by paragraph, enhancing user engagement.
 *
 * Props:
 * - project: The project object containing the explanation text and theme information.
 *
 * State:
 * - activeParagraph: Tracks the currently active paragraph being displayed.
 *
 * Refs:
 * - contentRef: A reference to the content div for animations.
 * - containerRef: A reference to the container div for scrolling behavior.
 * - paragraphRefs: An array of references for each paragraph to enable smooth scrolling.
 *
 * Effects:
 * - Automatically scrolls to the active paragraph when it changes.
 * - Starts the typewriting effect when the component mounts and resets when unmounted.
 *
 * Usage:
 * <ExplainItToMe project={yourProject} />
 */
const ExplainItToMe: React.FC<ExplainItToMeProps> = ({ project }) => {
  const { getProjectTheme } = useProjectTheme();
  const theme = getProjectTheme(project);

  const [activeParagraph, setActiveParagraph] = useState(0);
  const contentRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const { explain } = project;

  const { displayedText, start, isComplete, reset, progress } = useTypewriting({
    text: activeParagraph < explain.length ? explain[activeParagraph] : "",
    speed: 20,
    delay: 100,
    humanize: true,
    humanizeFactor: 0.5,
    autoStart: false,
    onComplete: () => {
      if (activeParagraph < explain.length - 1) {
        setActiveParagraph((prev) => prev + 1);
      }
    },
  });

  const paragraphRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (paragraphRefs.current[activeParagraph]) {
      paragraphRefs.current[activeParagraph]?.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      });
    }
  }, [activeParagraph, displayedText]);

  useEffect(() => {
    if (containerRef.current) start();
    return () => {
      reset();
      setActiveParagraph(0);
    };
  }, [start, reset]);

  return (
    <motion.div
      className="mt-6 w-full overflow-hidden flex flex-col gap-4"
      animate={{ height: "auto" }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      ref={containerRef}
    >
      <Header project={project} theme={theme} />

      {/* Main content panel */}
      <AnimatePresence>
        <motion.div
          ref={contentRef}
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className={cn(
            "relative border border-ctp-surface0 rounded-xl overflow-hidden",
            `bg-ctp-crust dark:bg-ctp-base shadow-lg`
          )}
        >
          {/* Vibrant background elements with reduced opacity */}
          <div
            className={`absolute top-0 left-0 w-full h-40 bg-gradient-to-b from-ctp-${theme.main}/10 to-transparent`}
          />

          <div className="relative z-10 p-6 space-y-8">
            {explain.map((paragraph, index) => (
              <motion.div
                key={paragraph}
                initial={{ opacity: 0, y: 20 }}
                animate={{
                  opacity: index <= activeParagraph ? 1 : 0.4,
                  y: 0,
                }}
                transition={{
                  duration: 0.6,
                  delay: 0.1 + index * 0.1,
                }}
                className={`relative ${
                  index > activeParagraph ? "opacity-40" : ""
                }`}
                ref={(el) => (paragraphRefs.current[index] = el)}
              >
                <ExplanationContent
                  explanations={explain}
                  index={index}
                  activeParagraph={activeParagraph}
                  theme={theme}
                  progress={progress}
                  displayedText={displayedText}
                  isComplete={isComplete}
                />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
};

interface ProgressBarProps {
  theme: ProjectTheme;
  progress: number;
}

const ProgressBar = ({ theme, progress }: ProgressBarProps) => {
  return (
    <div className="relative mt-3 mx-6">
      <div className="h-2 bg-ctp-surface0/30 rounded-full">
        <motion.div
          className={cn(
            "h-2 rounded-full absolute top-0 left-0",
            `bg-ctp-${theme.main}`
          )}
          initial={{ width: "0%" }}
          animate={{
            width: `${progress}%`,
          }}
          transition={{ ease: "linear" }}
        />
      </div>
    </div>
  );
};

interface HeaderProps {
  project: Project;
  theme: ProjectTheme;
}

const Header: React.FC<HeaderProps> = memo(({ project, theme }) => {
  const { name } = project;

  return (
    <motion.div
      className={cn(
        "w-full relative overflow-hidden",
        "rounded-xl border-none",
        "py-5 px-6",
        "shadow-lg transition-all duration-300",
        `bg-gradient-to-r from-ctp-${theme.main}/90 to-ctp-${theme.secondary}/90`
      )}
    >
      {/* Decorative elements with reduced opacity */}
      <div className="absolute top-0 right-0 w-32 h-32 rounded-full bg-white opacity-5" />
      <div className="absolute -bottom-10 -left-10 w-32 h-32 rounded-full bg-white opacity-5" />

      {/* Playful shapes with reduced opacity */}
      <div
        className={`absolute top-3 right-16 w-4 h-4 rotate-45 bg-ctp-${theme.main} opacity-70`}
      />
      <div className="absolute bottom-4 left-24 w-6 h-6 rounded-full bg-white opacity-10" />
      <div className="absolute top-10 right-40 w-3 h-3 rounded-full bg-white opacity-10" />

      <div className="relative flex items-center justify-between z-10">
        <div className="flex items-center gap-3">
          <div
            className={`
              p-2 rounded-lg
              bg-ctp-crust shadow-lg
              transition-all duration-300
            `}
          >
            <Brain className={`w-5 h-5 text-ctp-${theme.main}`} />
          </div>
          <div className="text-left">
            <h4 className="font-bold text-white text-lg">{name}</h4>
            <p className="text-sm text-white/80">
              Explore the technical implementation details
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
});

interface ExplanationContentProps {
  explanations: string[];
  index: number;
  activeParagraph: number;
  theme: ProjectTheme;
  progress: number;
  displayedText: string;
  isComplete: boolean;
}
const ExplanationContent: React.FC<ExplanationContentProps> = ({
  explanations,
  index,
  activeParagraph,
  theme,
  progress,
  displayedText,
  isComplete,
}) => {
  const classes = useMemo(() => {
    if (index === activeParagraph) {
      return {
        stepIndicator: `bg-ctp-${theme.main} text-ctp-crust shadow-md font-medium`,
        content: `bg-ctp-mantle dark:bg-ctp-base border border-ctp-${theme.main}/50 shadow-lg`,
      };
    } else if (index < activeParagraph) {
      return {
        stepIndicator: `bg-ctp-${theme.main}/20 text-ctp-${theme.main} font-medium`,
        content:
          "bg-ctp-mantle dark:bg-ctp-base border border-ctp-surface1 opacity-80",
      };
    } else {
      return {
        stepIndicator: "bg-ctp-surface0 text-ctp-overlay0 font-medium",
        content: "bg-ctp-surface0/30 border border-ctp-surface0/50",
      };
    }
  }, [index, activeParagraph, theme]);

  return (
    <div className="flex gap-4">
      {/* Step indicator with darker colors */}
      <div className="flex-shrink-0 mt-1">
        <div
          className={`
                        relative flex items-center justify-center
                        w-9 h-9 rounded-lg
                        ${classes.stepIndicator}
                        font-medium transition-all duration-500
                      `}
        >
          {index + 1}

          {/* Connection line between steps */}
          {index < explanations.length - 1 && (
            <div className="absolute top-full h-[calc(100%+1.5rem)] w-1 left-1/2 -translate-x-1/2">
              <motion.div
                className={`h-full w-full bg-ctp-${theme.main}/70`}
                initial={{ scaleY: 0, opacity: 0 }}
                animate={{
                  scaleY: index < activeParagraph ? 1 : 0,
                  opacity: index < activeParagraph ? 1 : 0,
                }}
                transition={{ duration: 0.5 }}
                style={{ transformOrigin: "top" }}
              />
              <div className="absolute inset-0 bg-ctp-surface0/50" />
            </div>
          )}
        </div>
      </div>

      {/* Content card with darker backgrounds */}
      <div className="flex-grow">
        <div
          className={`
                        relative p-4 rounded-xl
                        ${classes.content}
                        transition-all duration-300
                      `}
        >
          {/* Colorful accent for active paragraph */}
          {index === activeParagraph && (
            <div
              className={`absolute top-0 left-0 right-0 h-1 bg-ctp-${theme.main}/80 rounded-t-xl`}
            />
          )}

          <p
            className={`
                          relative z-10 text-ctp-text leading-relaxed
                          ${index < activeParagraph ? "text-ctp-text" : ""}
                        `}
          >
            {index < activeParagraph && processText(explanations[index])}
            {index === activeParagraph && (
              <>
                {processText(displayedText)}
                {!isComplete && activeParagraph === index && (
                  <span
                    className={`inline-block w-1 h-5 bg-ctp-${theme.main} ml-0.5 animate-pulse`}
                  />
                )}
              </>
            )}
          </p>

          {index === activeParagraph && (
            <ProgressBar theme={theme} progress={progress} />
          )}
        </div>
      </div>
    </div>
  );
};

export default ExplainItToMe;
