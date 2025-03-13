import React, { useEffect, useState, useRef, type ReactNode } from "react";
import { cn } from "@/lib/utils";
import { FaCode } from "react-icons/fa";
import { useOutline } from "./outline/context/outlineContext";
import { useEditorContext, type SectionType } from "./context/explorerContext";
import "./css/TabAnimations.css"; // Import our custom CSS animations

interface EditorTabsProps {
  sections: Record<SectionType, ReactNode>;
}

const EditorTabs: React.FC<EditorTabsProps> = ({ sections }) => {
  const { setCurrentSection } = useOutline();
  const { activeSection, setActiveSection } = useEditorContext();

  // State to track tab order
  const [tabOrder, setTabOrder] = useState<SectionType[]>([]);

  // Dragging state
  const [draggedTab, setDraggedTab] = useState<SectionType | null>(null);
  const [dragOverTab, setDragOverTab] = useState<SectionType | null>(null);
  const [dragDirection, setDragDirection] = useState<"left" | "right" | null>(
    null
  );
  const [recentlyMovedTab, setRecentlyMovedTab] = useState<SectionType | null>(
    null
  );
  const [movedDirection, setMovedDirection] = useState<"left" | "right" | null>(
    null
  );

  // Refs for tracking drag position and elements
  const tabRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const containerRef = useRef<HTMLDivElement>(null);
  const dragStartX = useRef<number>(0);
  const dragCurrentX = useRef<number>(0);
  const dragImageRef = useRef<HTMLDivElement | null>(null);

  // Initialize tab order when sections change
  useEffect(() => {
    setTabOrder(Object.keys(sections) as SectionType[]);
  }, [sections]);

  // Update outline section when active section changes
  useEffect(() => {
    setCurrentSection(activeSection);
  }, [activeSection, setCurrentSection]);

  // Create and cleanup ghost element for drag image
  useEffect(() => {
    // Create ghost element for drag image
    const ghost = document.createElement("div");
    ghost.className = "tab-ghost";
    ghost.style.display = "none";
    document.body.appendChild(ghost);
    dragImageRef.current = ghost;

    // Cleanup
    return () => {
      if (dragImageRef.current) {
        document.body.removeChild(dragImageRef.current);
      }
    };
  }, []);

  // Cleanup animation classes when recentlyMovedTab changes
  useEffect(() => {
    if (recentlyMovedTab) {
      const timer = setTimeout(() => {
        setRecentlyMovedTab(null);
        setMovedDirection(null);
      }, 500); // Match with animation duration

      return () => clearTimeout(timer);
    }
  }, [recentlyMovedTab]);

  // Handle drag start
  const handleDragStart = (
    e: React.DragEvent<HTMLButtonElement>,
    tab: SectionType
  ) => {
    setDraggedTab(tab);

    // Store the initial X position
    dragStartX.current = e.clientX;

    // Set up the custom drag image
    if (e.dataTransfer && tabRefs.current[tab] && dragImageRef.current) {
      const tabRect = tabRefs.current[tab]!.getBoundingClientRect();

      // Configure ghost element
      const ghost = dragImageRef.current;
      ghost.style.display = "block";
      ghost.style.width = `${tabRect.width}px`;
      ghost.style.height = `${tabRect.height}px`;
      ghost.style.top = `${tabRect.top}px`;
      ghost.style.left = `${tabRect.left}px`;
      ghost.textContent = tab; // Add the tab name

      // Set as drag image
      e.dataTransfer.setDragImage(ghost, tabRect.width / 2, tabRect.height / 2);

      // Hide original ghost after a moment
      setTimeout(() => {
        ghost.style.display = "none";
      }, 0);
    }
  };

  // Handle drag over
  const handleDragOver = (
    e: React.DragEvent<HTMLButtonElement>,
    tab: SectionType
  ) => {
    e.preventDefault();

    if (!draggedTab || draggedTab === tab) return;

    // If this is a new tab being dragged over
    if (dragOverTab !== tab) {
      setDragOverTab(tab);
    }

    // Determine drag direction
    dragCurrentX.current = e.clientX;
    const tabRect = e.currentTarget.getBoundingClientRect();
    const tabCenter = tabRect.left + tabRect.width / 2;

    // Set direction based on mouse position relative to tab center
    const newDirection = dragCurrentX.current < tabCenter ? "left" : "right";
    if (dragDirection !== newDirection) {
      setDragDirection(newDirection);
    }
  };

  // Handle drop
  const handleDrop = (
    e: React.DragEvent<HTMLButtonElement>,
    targetTab: SectionType
  ) => {
    e.preventDefault();

    if (!draggedTab) return;

    // Reorder the tabs
    const newOrder = [...tabOrder];
    const sourceIndex = newOrder.indexOf(draggedTab);
    const targetIndex = newOrder.indexOf(targetTab);

    if (sourceIndex !== -1 && targetIndex !== -1) {
      // Remove the dragged tab
      newOrder.splice(sourceIndex, 1);

      // Calculate insertion position based on direction
      let insertionIndex = targetIndex;
      if (sourceIndex < targetIndex && dragDirection === "left") {
        insertionIndex--;
      } else if (sourceIndex > targetIndex && dragDirection === "right") {
        insertionIndex++;
      }

      // Ensure insertion index is within bounds
      insertionIndex = Math.max(0, Math.min(insertionIndex, newOrder.length));

      // Insert the dragged tab at the new position
      newOrder.splice(insertionIndex, 0, draggedTab);

      // Update the tab order
      setTabOrder(newOrder);

      // Add shake class to container for powerful effect
      if (containerRef.current) {
        containerRef.current.classList.add("tabs-container-shake");

        // Flash effect on the container
        containerRef.current.style.animation =
          "tab-container-flash 0.6s ease-out";

        // Remove the animation classes after they complete
        setTimeout(() => {
          if (containerRef.current) {
            containerRef.current.classList.remove("tabs-container-shake");
            containerRef.current.style.animation = "";
          }
        }, 700);
      }

      // Set the recently moved tab for animation
      setRecentlyMovedTab(draggedTab);
      setMovedDirection(sourceIndex < insertionIndex ? "right" : "left");

      // Add dropping animation to the tab
      if (tabRefs.current[draggedTab]) {
        tabRefs.current[draggedTab]?.classList.add("tab-dropping");

        // Remove the animation class after it completes
        setTimeout(() => {
          tabRefs.current[draggedTab]?.classList.remove("tab-dropping");
        }, 600);
      }
    }

    // Reset dragging state
    resetDragState();
  };

  // Handle drag end
  const handleDragEnd = () => {
    resetDragState();
  };

  // Reset all dragging state
  const resetDragState = () => {
    setDraggedTab(null);
    setDragOverTab(null);
    setDragDirection(null);
    dragStartX.current = 0;
    dragCurrentX.current = 0;

    // Hide ghost element
    if (dragImageRef.current) {
      dragImageRef.current.style.display = "none";
    }
  };

  // Get the CSS classes for a tab based on its state
  const getTabClasses = (tab: SectionType) => {
    const baseClasses =
      "editor-tab h-full px-4 whitespace-nowrap border-r border-[#313244] hover:bg-[#181825] text-sm flex items-center gap-2 relative";

    const stateClasses = [
      activeSection === tab ? "active" : "",
      draggedTab === tab ? "tab-dragging" : "",
      dragOverTab === tab ? "tab-drag-over" : "",
      recentlyMovedTab === tab ? "tab-moved" : "",
      dragOverTab === tab && dragDirection === "left" ? "tab-insert-left" : "",
      dragOverTab === tab && dragDirection === "right"
        ? "tab-insert-right"
        : "",
    ];

    return cn(baseClasses, ...stateClasses);
  };

  return (
    <div
      className="tabs-container bg-[#1e1e2e] border-b border-[#313244] font-roboto-mono sticky top-0 z-30 overflow-x-auto scrollbar-hide md:h-9"
      ref={containerRef}
    >
      <div className="flex items-center h-full">
        {tabOrder.map((id) => (
          <button
            key={id}
            ref={(el) => (tabRefs.current[id] = el)}
            className={getTabClasses(id)}
            onClick={() => {
              setActiveSection(id as SectionType);
            }}
            draggable={true}
            onDragStart={(e) => handleDragStart(e, id)}
            onDragOver={(e) => handleDragOver(e, id)}
            onDragEnd={handleDragEnd}
            onDrop={(e) => handleDrop(e, id)}
            onDragEnter={(e) => {
              e.preventDefault();
              // Additional visual feedback can be handled by CSS classes
            }}
          >
            <FaCode
              className={cn("w-3 h-3", {
                "text-ctp-red": id === "home",
                "text-ctp-green": id === "projects",
                "text-ctp-yellow": id === "skills",
                "text-ctp-blue": id === "about",
                "text-ctp-mauve": id === "experience",
                "text-ctp-pink": id === "contact",
                "text-ctp-teal": id === "articles",
                "text-ctp-sapphire": id === "learning",
              })}
            />
            {id}
            <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              ×
            </span>
          </button>
        ))}

        <div className="flex-1 border-b border-[#313244]"></div>
      </div>
    </div>
  );
};

export default EditorTabs;
