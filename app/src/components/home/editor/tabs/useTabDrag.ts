import { useState, useRef, useEffect, useCallback } from "react";
import { SectionType } from "@/components/home/editor/context/explorerContext";
import styles from "./TabAnimations.module.css";

export type TabState = {
  id: SectionType;
  isActive: boolean;
  isDragged: boolean;
  isDraggedOver: boolean;
  dragDirection: "left" | "right" | null;
  isRecentlyMoved: boolean;
};

export type DragDirection = "left" | "right" | null;

/**
 * Custom hook to manage tab dragging and reordering functionality.
 * Provides a complete solution for implementing draggable tabs with visual feedback.
 *
 * @param initialSections - Initial array of section IDs to create tabs for
 * @returns Object containing tab state and handler functions for drag operations
 */
export const useTabDrag = (initialSections: SectionType[]) => {
  console.log(initialSections);
  /**
   * State to track the current order of tabs
   */
  const [tabOrder, setTabOrder] = useState<SectionType[]>(initialSections);

  /**
   * Currently dragged tab (or null if no drag in progress)
   */
  const [draggedTab, setDraggedTab] = useState<SectionType | null>(null);

  /**
   * Tab currently being hovered over during drag (or null if not hovering)
   */
  const [dragOverTab, setDragOverTab] = useState<SectionType | null>(null);

  /**
   * Direction of insertion relative to hovered tab (left/right/null)
   */
  const [dragDirection, setDragDirection] = useState<DragDirection>(null);

  /**
   * Tab that was recently moved (for animation purposes)
   */
  const [recentlyMovedTab, setRecentlyMovedTab] = useState<SectionType | null>(
    null
  );

  /**
   * References to all tab DOM elements for positioning and animations
   */
  const tabRefs = useRef<Record<string, HTMLButtonElement | null>>({});

  /**
   * X-coordinate where drag started
   */
  const dragStartX = useRef<number>(0);

  /**
   * Current X-coordinate during drag
   */
  const dragCurrentX = useRef<number>(0);

  /**
   * Reference to the custom drag ghost element
   */
  const dragImageRef = useRef<HTMLDivElement | null>(null);

  /**
   * Synchronize tab order when initial sections change
   */
  useEffect(() => {
    setTabOrder(initialSections);
  }, [initialSections]);

  /**
   * Create and manage the custom ghost element used during drag operations
   */
  useEffect(() => {
    /**
     * Create and manage the custom ghost element used during drag operations
     */
    const createGhostElement = () => {
      const ghost = document.createElement("div");
      ghost.className = styles.tabGhost;
      ghost.style.display = "none";
      document.body.appendChild(ghost);
      dragImageRef.current = ghost;
    };

    createGhostElement();
    return () => {
      if (dragImageRef.current) {
        document.body.removeChild(dragImageRef.current);
      }
    };
  }, []);

  /**
   * Handle animation timing for recently moved tabs
   */
  useEffect(() => {
    if (recentlyMovedTab) {
      const timer = setTimeout(() => {
        setRecentlyMovedTab(null);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [recentlyMovedTab]);

  /**
   * Register a DOM reference for a specific tab
   * @param id - The tab ID to register
   * @param element - The DOM element reference
   */
  const setTabRef = (id: string, element: HTMLButtonElement | null) => {
    tabRefs.current[id] = element;
  };

  /**
   * Reset all drag-related state to default values
   */
  const resetDragState = useCallback(() => {
    setDraggedTab(null);
    setDragOverTab(null);
    setDragDirection(null);
    dragStartX.current = 0;
    dragCurrentX.current = 0;
    if (dragImageRef.current) dragImageRef.current.style.display = "none";
  }, []);

  /**
   * Handle the start of a tab drag operation
   * Sets up the custom drag image and initializes drag state
   */
  const handleDragStart = useCallback(
    (e: React.DragEvent<HTMLButtonElement>, tab: SectionType) => {
      setDraggedTab(tab);
      dragStartX.current = e.clientX;

      if (!e.dataTransfer || !tabRefs.current[tab] || !dragImageRef.current)
        return;

      const tabRect = tabRefs.current[tab].getBoundingClientRect();
      const ghost = dragImageRef.current;

      const setupGhostElementCss = () => {
        ghost.style.display = "block";
        ghost.style.width = `${tabRect.width}px`;
        ghost.style.height = `${tabRect.height}px`;
        ghost.style.top = `${tabRect.top}px`;
        ghost.style.left = `${tabRect.left}px`;
        ghost.textContent = tab;
      };

      setupGhostElementCss();
      e.dataTransfer.setDragImage(ghost, tabRect.width / 2, tabRect.height / 2);

      setTimeout(() => {
        ghost.style.display = "none";
      }, 0);
    },
    []
  );

  /**
   * Handle dragging over another tab
   * Determines insertion direction and updates visual indicators
   */
  const handleDragOver = useCallback(
    (e: React.DragEvent<HTMLButtonElement>, tab: SectionType) => {
      e.preventDefault();

      if (!draggedTab || draggedTab === tab) return;
      if (dragOverTab !== tab) setDragOverTab(tab);

      const calculateDragDirection = (
        cursorX: number,
        tabElement: HTMLButtonElement | null
      ): DragDirection => {
        if (!tabElement) return null;
        const tabRect = tabElement.getBoundingClientRect();
        const tabCenter = tabRect.left + tabRect.width / 2;
        return cursorX < tabCenter ? "left" : "right";
      };

      const newDirection = calculateDragDirection(
        dragCurrentX.current,
        tabRefs.current[tab]
      );
      if (dragDirection !== newDirection) {
        setDragDirection(newDirection);
      }
    },
    [dragDirection, dragCurrentX, tabRefs, draggedTab, dragOverTab]
  );

  /**
   * Handle dropping a tab onto another tab
   * Reorders the tabs based on drag direction and applies animations
   */
  const handleDrop = (
    e: React.DragEvent<HTMLButtonElement>,
    targetTab: SectionType
  ) => {
    e.preventDefault();
    if (!draggedTab) return;

    let newOrder = [...tabOrder];
    const sourceIndex = newOrder.indexOf(draggedTab);
    const targetIndex = newOrder.indexOf(targetTab);

    /**
     * Calculate the insertion index based on the drag direction
     */
    const calculateInsertionIndex = () => {
      let insertionIndex = targetIndex;
      if (sourceIndex < targetIndex && dragDirection === "left") {
        insertionIndex--;
      } else if (sourceIndex > targetIndex && dragDirection === "right") {
        insertionIndex++;
      }

      return Math.max(0, Math.min(insertionIndex, newOrder.length));
    };

    /**
     * Apply animation effects to the container element when tabs are reordered
     */
    const applyContainerEffects = (container: HTMLElement | null): void => {
      if (!container) return;
      container.classList.add(styles.tabsContainerShake);
      container.style.animation = "tabContainerFlash 0.6s ease-out";

      const removeContainerEffects = () => {
        container.classList.remove(styles.tabsContainerShake);
        container.style.animation = "";
      };

      setTimeout(() => removeContainerEffects(), 700);
    };

    /**
     * Apply animation effects to a tab element
     */
    const applyTabEffects = (tab: HTMLElement | null, effect: string): void => {
      if (!tab) return;
      tab.classList.add(effect);
      setTimeout(() => tab.classList.remove(effect), 600);
    };

    /**
     * Apply effects after animations are complete
     */
    const applyAfterAnimations = () => {
      const container = tabRefs.current[draggedTab]?.closest(
        `.${styles.tabsContainer}`
      );
      applyContainerEffects(container as HTMLElement);
      setRecentlyMovedTab(draggedTab);
      applyTabEffects(tabRefs.current[draggedTab], styles.tabDropping);
    };

    if (sourceIndex !== -1 && targetIndex !== -1) {
      newOrder = newOrder.filter((tab) => tab !== draggedTab);
      const insertionIndex = calculateInsertionIndex();
      newOrder = [
        ...newOrder.slice(0, insertionIndex),
        draggedTab,
        ...newOrder.slice(insertionIndex),
      ];
      setTabOrder(newOrder);
      applyAfterAnimations();
    }
    resetDragState();
  };

  /**
   * Handle the end of a drag operation (when drag is canceled)
   */
  const handleDragEnd = useCallback(() => {
    resetDragState();
  }, [resetDragState]);

  // Return all state and handlers needed for tab drag functionality
  return {
    tabOrder,
    draggedTab,
    dragOverTab,
    dragDirection,
    recentlyMovedTab,
    setTabRef,
    tabRefs,
    handleDragStart,
    handleDragOver,
    handleDragEnd,
    handleDrop,
    resetDragState,
  };
};

export default useTabDrag;
