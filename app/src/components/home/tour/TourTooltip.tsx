import React, { useEffect, useState, useRef, useCallback } from "react";
import { useTour } from "./context/TourContext";
import { tourStepComponents } from "./steps/registry";
import "./Tooltip.css";
import {
  ChevronLeft,
  ChevronRight,
  Grip,
  X,
  Minimize,
  Maximize,
} from "lucide-react";

/**
 * Type definitions for tooltip positioning and state management
 */
interface Position {
  top: number | string;
  left: number | string;
  transform?: string;
}

interface PointerPosition {
  x: number;
  y: number;
}

/**
 * TourTooltip component - Displays an interactive guided tour tooltip
 * with draggable functionality, step navigation, and content display
 */
const TourTooltip: React.FC = () => {
  const {
    active,
    getCurrentStep,
    nextStep,
    prevStep,
    endTour,
    isFirstStep,
    isLastStep,
  } = useTour();

  const [position, setPosition] = useState<Position>({ top: 0, left: 0 });
  const [tooltipReady, setTooltipReady] = useState<boolean>(false);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [dragOffset, setDragOffset] = useState<PointerPosition>({ x: 0, y: 0 });
  const [dragPosition, setDragPosition] = useState<PointerPosition | null>(
    null
  );
  const [isCompact, setIsCompact] = useState<boolean>(false);
  const [isUserPositioned, setIsUserPositioned] = useState<boolean>(false);
  const [headerHovered, setHeaderHovered] = useState<boolean>(false);

  const tooltipRef = useRef<HTMLDivElement>(null);
  const dragHandleRef = useRef<HTMLDivElement>(null);

  const currentStep = getCurrentStep();

  /**
   * Calculate tooltip position based on the target element and placement
   */
  useEffect(() => {
    if (!active || !currentStep) {
      setTooltipReady(false);
      return;
    }

    // If the user has manually positioned the tooltip, don't reposition it on step change
    if (isUserPositioned && dragPosition) {
      setTooltipReady(true);
      return;
    }

    const calculatePosition = (): void => {
      // Reset drag position when changing steps automatically
      setDragPosition(null);

      // If no highlight selector, center the tooltip
      if (
        !currentStep.highlightSelector ||
        currentStep.placement === "center"
      ) {
        setPosition({
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        });
        setTooltipReady(true);
        return;
      }

      // Find the target element
      const targetElement = document.querySelector(
        currentStep.highlightSelector
      );
      if (!targetElement) {
        console.error(
          `Target element not found: ${currentStep.highlightSelector}`
        );
        setPosition({
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        });
        setTooltipReady(true);
        return;
      }

      // Get element position
      const rect = targetElement.getBoundingClientRect();
      const placement = currentStep.placement || "bottom";

      // Window dimensions for boundary checking
      const windowWidth = window.innerWidth;
      const windowHeight = window.innerHeight;

      // Calculate position based on placement
      let newPosition: Position = { top: 0, left: 0 };
      const offset = 20; // Increased distance from the element

      switch (placement) {
        case "top":
          newPosition = {
            top: `${Math.max(rect.top - offset, 10)}px`,
            left: `${rect.left + rect.width / 2}px`,
            transform: "translate(-50%, -100%)",
          };
          break;

        case "bottom":
          newPosition = {
            top: `${Math.min(rect.bottom + offset, windowHeight - 100)}px`,
            left: `${rect.left + rect.width / 2}px`,
            transform: "translate(-50%, 0)",
          };
          break;

        case "left":
          newPosition = {
            top: `${rect.top + rect.height / 2}px`,
            left: `${Math.max(rect.left - offset, 10)}px`,
            transform: "translate(-100%, -50%)",
          };
          break;

        case "right":
          newPosition = {
            top: `${rect.top + rect.height / 2}px`,
            left: `${Math.min(rect.right + offset, windowWidth - 100)}px`,
            transform: "translate(0, -50%)",
          };
          break;

        default:
          newPosition = {
            top: `${Math.min(rect.bottom + offset, windowHeight - 100)}px`,
            left: `${rect.left + rect.width / 2}px`,
            transform: "translate(-50%, 0)",
          };
      }

      setPosition(newPosition);
      setTooltipReady(true);
    };

    if (currentStep.highlightSelector) {
      const targetElement = document.querySelector(
        currentStep.highlightSelector
      );
      if (targetElement) {
        // Add a subtle pulse animation to the highlight
        targetElement.classList.add("tour-highlight");
        targetElement.classList.add("tour-highlight-pulse");

        // Remove pulse after animation completes
        setTimeout(() => {
          targetElement.classList.remove("tour-highlight-pulse");
        }, 1000);
      }
    }

    // Calculate position after a small delay to allow for transitions
    setTimeout(calculatePosition, 100);

    // Cleanup function
    return () => {
      if (currentStep?.highlightSelector) {
        const targetElement = document.querySelector(
          currentStep.highlightSelector
        );
        if (targetElement) {
          targetElement.classList.remove("tour-highlight");
          targetElement.classList.remove("tour-highlight-pulse");
        }
      }
    };
  }, [active, currentStep, isUserPositioned, dragPosition]);

  /**
   * Handle mouse down event to start dragging
   */
  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>): void => {
    e.preventDefault();
    setIsDragging(true);

    // Calculate the offset between mouse position and tooltip position
    if (tooltipRef.current) {
      const rect = tooltipRef.current.getBoundingClientRect();
      setDragOffset({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    }
  };

  /**
   * Handle mouse move event to update drag position
   */
  const handleMouseMove = useCallback(
    (e: MouseEvent): void => {
      if (!isDragging) return;

      e.preventDefault();
      const x = e.clientX - dragOffset.x;
      const y = e.clientY - dragOffset.y;
      setDragPosition({ x, y });
      setIsUserPositioned(true);
    },
    [isDragging, dragOffset]
  );

  /**
   * Handle mouse up event to end dragging
   */
  const handleMouseUp = useCallback(
    (): void => setIsDragging(false),
    [setIsDragging]
  );

  /**
   * Add and remove event listeners for dragging
   */
  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging, dragOffset, handleMouseMove, handleMouseUp]);

  /**
   * Toggle compact mode
   */
  const toggleCompactMode = (): void => setIsCompact(!isCompact);

  /**
   * Reset tooltip position
   */
  const resetPosition = (): void => {
    setIsUserPositioned(false);
    setDragPosition(null);
  };

  // Don't render if not active or ready
  if (!active || !currentStep || !tooltipReady) {
    return null;
  }

  // Get the current step component
  const StepComponent = tourStepComponents[currentStep.id];

  // Calculate final position based on drag state
  const finalPosition = dragPosition
    ? { top: dragPosition.y, left: dragPosition.x, transform: "none" }
    : position;

  return (
    <>
      {/* Overlay backdrop */}
      {!isDragging && (
        <div
          className="fixed inset-0 z-40 bg-ctp-crust/40 backdrop-blur-sm pointer-events-none"
          style={{
            animation: "fadeIn 0.3s ease-out forwards",
          }}
        />
      )}

      {/* Main tooltip container */}
      <div
        ref={tooltipRef}
        className={`tour-tooltip-container ${isDragging ? "dragging" : ""} ${
          isCompact ? "compact-mode" : ""
        }`}
        style={{
          top: finalPosition.top,
          left: finalPosition.left,
          transform: finalPosition.transform as string,
          cursor: isDragging ? "grabbing" : "grab",
        }}
        data-placement={currentStep.placement}
        onMouseDown={handleMouseDown}
        role="dialog"
        aria-modal="true"
        aria-labelledby="tour-title"
      >
        {/* Add a visually hidden button for keyboard handling */}
        <button
          className="sr-only"
          onKeyDown={(e: React.KeyboardEvent) => {
            if (e.key === "Escape") endTour();
          }}
          autoFocus
        >
          Close tour with Escape key
        </button>

        <div className="tour-tooltip font-sans rounded-lg w-[800px] border-4 border-ctp-surface0">
          {/* Header with controls */}
          <div
            className="tour-tooltip-header flex items-center justify-between px-2 py-1"
            onMouseEnter={() => setHeaderHovered(true)}
            onMouseLeave={() => setHeaderHovered(false)}
          >
            {/* Left side: macOS-style controls */}
            <div className="tour-tooltip-traffic-lights flex items-center gap-1.5">
              <button
                className="tour-traffic-light tour-traffic-close w-3 h-3 rounded-full bg-red-500 flex items-center justify-center hover:opacity-80"
                onClick={endTour}
                aria-label="Close tour"
                title="Close tour"
              >
                <X
                  size={8}
                  className="opacity-0 hover:opacity-100 text-red-800"
                />
              </button>
              <button
                className="tour-traffic-light tour-traffic-minimize w-3 h-3 rounded-full bg-yellow-500 flex items-center justify-center hover:opacity-80"
                onClick={toggleCompactMode}
                aria-label={isCompact ? "Expand" : "Minimize"}
                title={isCompact ? "Expand" : "Minimize"}
              >
                <Minimize
                  size={8}
                  className="opacity-0 hover:opacity-100 text-yellow-800"
                />
              </button>
              <button
                className="tour-traffic-light tour-traffic-maximize w-3 h-3 rounded-full bg-green-500 flex items-center justify-center hover:opacity-80"
                onClick={resetPosition}
                aria-label="Reset position"
                title="Reset position"
              >
                <Maximize
                  size={8}
                  className="opacity-0 hover:opacity-100 text-green-800"
                />
              </button>
            </div>

            {/* Center: Step indicator */}
            <div className="text-xs font-mono text-ctp-subtext0">
              Step {Object.keys(tourStepComponents).indexOf(currentStep.id) + 1}{" "}
              of {Object.keys(tourStepComponents).length}
            </div>

            {/* Right side: Navigation controls */}
            <div className="flex items-center gap-2">
              {!isFirstStep() && (
                <button
                  className="tour-nav-icon w-6 h-6 rounded-full flex items-center justify-center hover:bg-ctp-surface0 text-ctp-subtext0 hover:text-ctp-blue transition-colors"
                  onClick={prevStep}
                  aria-label="Previous step"
                  title="Previous step"
                >
                  <ChevronLeft size={16} />
                </button>
              )}

              {!isLastStep() && (
                <button
                  className="tour-nav-icon w-6 h-6 rounded-full flex items-center justify-center hover:bg-ctp-surface0 text-ctp-subtext0 hover:text-ctp-blue transition-colors"
                  onClick={nextStep}
                  aria-label="Next step"
                  title="Next step"
                >
                  <ChevronRight size={16} />
                </button>
              )}
            </div>
          </div>

          {/* Drag handle */}
          <div
            ref={dragHandleRef}
            className="tour-tooltip-handle relative"
            style={{ height: "4px", opacity: headerHovered ? 0.3 : 0 }}
          >
            <Grip
              size={12}
              className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] opacity-50"
            />
          </div>

          {/* Main content */}
          <div className="tour-tooltip-content p-4">
            {StepComponent ? (
              <StepComponent />
            ) : (
              <div className="text-ctp-red">Missing step component</div>
            )}
          </div>

          {/* Footer with skip button */}
          {!isCompact && (
            <div className="flex justify-end items-center border-t border-ctp-surface0 p-2 bg-ctp-surface0">
              <button
                className="tour-button tour-button-secondary font-mono px-4 py-1 rounded-md bg-ctp-surface1 hover:bg-ctp-surface2 text-ctp-subtext0 text-sm"
                onClick={endTour}
              >
                Skip Tour
              </button>
            </div>
          )}

          {/* Compact mode footer */}
          {isCompact && (
            <div className="tour-compact-footer flex justify-center items-center p-1 bg-ctp-surface0">
              <button
                className="text-xs text-ctp-subtext0 hover:text-ctp-text px-2 py-0.5"
                onClick={endTour}
              >
                Skip
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default TourTooltip;
