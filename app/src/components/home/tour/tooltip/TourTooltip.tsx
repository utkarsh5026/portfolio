import React, { useEffect, useState, useRef, useCallback } from "react";
import { useTour } from "../context/TourContext";
import "./Tooltip.css";
import TooltipContent from "./TooltipContent";

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
  const { active, getCurrentStep, endTour } = useTour();

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

        <TooltipContent
          isCompact={isCompact}
          headerHovered={headerHovered}
          toggleCompactMode={toggleCompactMode}
          handleMouseEnter={() => setHeaderHovered(true)}
          handleMouseLeave={() => setHeaderHovered(false)}
          resetPosition={resetPosition}
          ref={dragHandleRef}
        />
      </div>
    </>
  );
};

export default TourTooltip;
