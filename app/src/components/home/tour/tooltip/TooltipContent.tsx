import {
  X,
  Minimize,
  Maximize,
  ChevronLeft,
  ChevronRight,
  Grip,
} from "lucide-react";
import { useTour } from "../context/TourContext";
import { tourStepComponents } from "../steps/registry";
import React from "react";
import { cn } from "@/lib/utils";

interface TooltipContentProps {
  isCompact: boolean;
  headerHovered: boolean;
  toggleCompactMode: () => void;
  handleMouseEnter: () => void;
  handleMouseLeave: () => void;
  resetPosition: () => void;
}

/**
 * TooltipContent component - Displays the main content of the tooltip including
 * the header with controls, drag handle, main content, and footer with navigation.
 *
 * @param {Object} props - The component props.
 * @param {boolean} props.isCompact - Indicates if the tooltip is in compact mode.
 * @param {Function} props.toggleCompactMode - Toggles the compact mode of the tooltip.
 * @param {Function} props.handleMouseEnter - Handles mouse enter event on the header.
 * @param {Function} props.resetPosition - Resets the position of the tooltip.
 * @param {boolean} props.headerHovered - Indicates if the header is currently hovered.
 * @param {Function} props.handleMouseLeave - Handles mouse leave event on the header.
 * @param {React.RefObject} ref - The reference to the component.
 *
 * @returns {React.ReactElement} The TooltipContent component.
 */
const TooltipContent = React.forwardRef<HTMLDivElement, TooltipContentProps>(
  (
    {
      isCompact,
      toggleCompactMode,
      handleMouseEnter,
      resetPosition,
      headerHovered,
      handleMouseLeave,
    },
    ref
  ) => {
    const {
      getCurrentStep,
      nextStep,
      prevStep,
      endTour,
      isFirstStep,
      isLastStep,
    } = useTour();
    const currentStepId = getCurrentStep()?.id;

    if (!currentStepId) return null;

    const StepComponent = tourStepComponents[currentStepId];
    return (
      <div
        className="tour-tooltip font-sans rounded-lg border-4 border-ctp-surface0 bg-[#1e1e2e] text-[#cdd6f4] overflow-hidden shadow-[0_0_0_1px_rgba(0,0,0,0.1),0_10px_25px_rgba(0,0,0,0.3),0_0_50px_rgba(137,180,250,0.1)] backdrop-blur-md animate-[tooltip-entrance_0.4s_cubic-bezier(0.175,0.885,0.32,1.275)]"
        style={{
          width: isCompact ? "auto" : "800px",
          minWidth: isCompact ? "220px" : "auto",
        }}
      >
        {/* Header with controls */}
        <div
          className="tour-tooltip-header flex items-center justify-between px-2 py-1 bg-[rgba(30,30,46,0.95)] border-b border-[rgba(49,50,68,0.6)] rounded-t-lg h-8 select-none"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {/* Left side: macOS-style controls */}
          <div className="tour-tooltip-traffic-lights flex items-center gap-1.5">
            <button
              className="tour-traffic-light tour-traffic-close w-3 h-3 rounded-full bg-red-500 flex items-center justify-center hover:opacity-80 transition-opacity"
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
              className="tour-traffic-light tour-traffic-minimize w-3 h-3 rounded-full bg-yellow-500 flex items-center justify-center hover:opacity-80 transition-opacity"
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
              className="tour-traffic-light tour-traffic-maximize w-3 h-3 rounded-full bg-green-500 flex items-center justify-center hover:opacity-80 transition-opacity"
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
            Step {Object.keys(tourStepComponents).indexOf(currentStepId) + 1} of{" "}
            {Object.keys(tourStepComponents).length}
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
          ref={ref}
          className={cn(
            "tour-tooltip-handle relative h-[4px] cursor-grab flex justify-center items-center text-[#6c7086] transition-opacity hover:opacity-100 hover:bg-[rgba(137,180,250,0.05)] active:cursor-grabbing",
            headerHovered ? "opacity-30" : "opacity-0"
          )}
        >
          <Grip
            size={12}
            className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] opacity-50"
          />
        </div>

        {/* Main content */}
        <div
          className={cn(
            "tour-tooltip-content p-4 text-sm leading-relaxed overflow-y-auto scrollbar-thin scrollbar-thumb-[#313244] scrollbar-track-[#181825]",
            isCompact && "max-h-[200px] py-3"
          )}
        >
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
              className="tour-button tour-button-secondary font-mono px-4 py-1 rounded-md bg-ctp-surface1 hover:bg-ctp-surface2 text-ctp-subtext0 text-sm transition-colors hover:translate-y-[-1px]"
              onClick={endTour}
            >
              Skip Tour
            </button>
          </div>
        )}

        {/* Compact mode footer */}
        {isCompact && (
          <div className="tour-compact-footer flex justify-center items-center p-1 bg-ctp-surface0 border-t border-[#313244]">
            <button
              className="text-xs text-ctp-subtext0 hover:text-ctp-text px-2 py-0.5 transition-colors"
              onClick={endTour}
            >
              Skip
            </button>
          </div>
        )}
      </div>
    );
  }
);

export default TooltipContent;
