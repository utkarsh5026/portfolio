import React, { useEffect, useState } from "react";
import {
  useEditorContext,
  SectionType,
} from "@/components/home/editor/context/explorerContext";
import TypeWriter from "../writer/TypeWriter";
import { ArrowRight, ChevronRightCircle, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

interface StepProps {
  section: SectionType | null;
  title: string;
  children: React.ReactNode;
  onTitleComplete?: () => void;
}

/**
 * Step component for displaying a tour step with a title and content.
 *
 * This component allows users to navigate to different sections of the application
 * while providing a visual indication of the current section. It includes a title
 * that can be animated and a button to navigate to the specified section.
 *
 * @param {Object} props - The props for the Step component.
 * @param {SectionType | null} props.section - The section to navigate to.
 * @param {string} props.title - The title of the step, displayed at the top.
 * @param {React.ReactNode} props.children - The content to display within the step.
 * @param {function} [props.onTitleComplete] - Optional callback function that is called
 * when the title animation is complete.
 *
 * @returns {JSX.Element} The rendered Step component.
 */
const Step: React.FC<StepProps> = ({
  section,
  title,
  children,
  onTitleComplete,
}) => {
  const { setActiveSection } = useEditorContext();
  const [isHovering, setIsHovering] = useState(false);
  const [isTitleComplete, setIsTitleComplete] = useState(false);
  const [hasNavigated, setHasNavigated] = useState(false);
  const [isClicking, setIsClicking] = useState(false);

  useEffect(() => {
    if (!section) return;
    return () => {
      const sectionElement = document.querySelector(`.${section}-section`);
      if (sectionElement) {
        sectionElement.classList.remove("tour-highlight");
      }
    };
  }, [section]);

  const navigateToSection = () => {
    if (!section) return;

    setIsClicking(true);
    setTimeout(() => setIsClicking(false), 300);

    setActiveSection(section);
    setHasNavigated(true);

    setTimeout(() => {
      const sectionElement = document.querySelector(`.${section}-section`);

      if (sectionElement) {
        document.querySelectorAll(".tour-highlight").forEach((element) => {
          element.classList.remove("tour-highlight");
        });

        sectionElement.classList.add("tour-highlight");

        sectionElement.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });

        sectionElement.classList.add("tour-pulse-animation");

        setTimeout(() => {
          sectionElement.classList.remove("tour-pulse-animation");
        }, 2000);
      }
    }, 300);
  };

  const handleTitleComplete = () => {
    setIsTitleComplete(true);
    onTitleComplete?.();
  };

  return (
    <div className="flex flex-col gap-4 p-2 font-mono">
      <div className="flex items-center justify-between gap-2">
        <h3 className="text-lg font-bold text-ctp-pink">
          <TypeWriter
            text={title}
            speed={30}
            onComplete={handleTitleComplete}
          />
        </h3>

        {isTitleComplete && section && (
          <div className="relative group flex-shrink-0">
            <div
              className={`absolute -inset-0.5 bg-gradient-to-r 
              ${
                hasNavigated
                  ? "from-ctp-blue/30 via-ctp-lavender/20 to-ctp-blue/30"
                  : "from-ctp-surface0 via-ctp-surface2 to-ctp-surface0"
              } 
              rounded-lg blur opacity-30 group-hover:opacity-100 transition duration-1000 
              group-hover:duration-200 animate-gradient-x`}
            ></div>

            <button
              onClick={navigateToSection}
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
              onMouseDown={() => setIsClicking(true)}
              onMouseUp={() => setIsClicking(false)}
              onMouseOut={() => setIsClicking(false)}
              onBlur={() => setIsClicking(false)}
              className={cn(
                "relative flex items-center gap-2 px-3 py-1.5 rounded-md text-sm",
                "backdrop-blur-sm backdrop-saturate-150",
                "transition-all duration-300",
                isHovering ? "scale-[1.02]" : "scale-100",
                isClicking ? "scale-95" : "scale-100",
                hasNavigated
                  ? "bg-ctp-blue/10 text-ctp-blue border border-ctp-blue/40"
                  : "bg-ctp-mantle/90 text-ctp-text border border-ctp-surface0 hover:border-ctp-blue/30",
                "shadow-sm hover:shadow-md shadow-black/5 hover:shadow-ctp-blue/10"
              )}
            >
              {hasNavigated ? (
                <>
                  <ChevronRightCircle size={16} className="text-ctp-blue" />
                  <span className="font-medium whitespace-nowrap">
                    Section Active
                  </span>
                </>
              ) : (
                <>
                  <ArrowRight
                    size={16}
                    className={`transition-transform duration-300 ${
                      isHovering ? "translate-x-1" : "translate-x-0"
                    }`}
                  />
                  <span className="font-medium whitespace-nowrap">
                    Go to {section}
                  </span>
                </>
              )}
              <Sparkles
                size={12}
                className={`transition-all duration-500 ${
                  isHovering && !hasNavigated ? "text-ctp-yellow" : ""
                }`}
              />
            </button>
          </div>
        )}
      </div>

      <div className="text-ctp-text">{children}</div>
    </div>
  );
};

export default Step;
