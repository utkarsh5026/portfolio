import React, { useEffect, useRef } from "react";
import { useOutline } from "./context/outlineContext";

interface OutlineNodeProps {
  // Outline item properties
  id: string;
  label: string;
  level: number;
  icon?: React.ReactNode;
  parentId?: string;

  // Children components to wrap
  children: React.ReactNode;

  // Optional class name and style
  className?: string;
}

/**
 * OutlineNode Component
 *
 * This component represents a single node in the outline structure. It is designed to be used within the OutlinePanel component.
 *
 * @param {Object} props - The properties passed to the component.
 * @param {string} props.id - The unique identifier for the node.
 * @param {string} props.label - The text label displayed for the node.
 * @param {number} props.level - The level of the node within the outline structure, affecting its visual representation.
 * @param {React.ReactNode} [props.icon] - An optional icon to be displayed next to the node label.
 * @param {string} [props.parentId] - The ID of the parent node, used for hierarchical relationships.
 * @param {React.ReactNode} props.children - The children components to be wrapped by the node.
 * @param {string} [props.className] - Optional additional CSS classes to apply to the node.
 *
 * @returns The OutlineNode component.
 */
const OutlineNode: React.FC<OutlineNodeProps> = ({
  id,
  label,
  level,
  icon,
  parentId,
  children,
  className = "",
}) => {
  const nodeRef = useRef<HTMLDivElement>(null);
  const { registerOutlineItem, unregisterOutlineItem, activeHighlightId } =
    useOutline();
  const isHighlighted = activeHighlightId === id;

  /**
   * Registers the outline item with the outline context and unregisters it on component unmount.
   * This ensures the node is properly tracked and managed within the outline structure.
   */
  useEffect(() => {
    registerOutlineItem({
      id,
      label,
      level,
      icon,
      parentId,
    });

    return () => {
      unregisterOutlineItem(id);
    };
  }, [
    id,
    label,
    level,
    icon,
    parentId,
    registerOutlineItem,
    unregisterOutlineItem,
  ]);

  /**
   * Dynamically applies styles based on the node's highlight state.
   *
   * @returns The dynamic class names for the node.
   */
  const getNodeClassNames = () => {
    return `outline-node relative transition-all duration-300 ease-in-out ${
      isHighlighted
        ? "border-ctp-mauve p-4 border border-opacity-90 shadow-[0_0_12px_rgba(203,166,247,0.6),0_0_4px_rgba(203,166,247,0.8)] scale-[1.03] z-10 bg-ctp-mauve/5 rounded-sm -translate-y-0.5"
        : "border-transparent border"
    } ${className}`;
  };

  return (
    <div
      ref={nodeRef}
      id={id}
      className={getNodeClassNames()}
      data-level={level}
      data-parent={parentId ?? ""}
    >
      {isHighlighted && (
        <div className="absolute inset-0 bg-gradient-to-r from-ctp-mauve/10 to-transparent rounded-sm animate-pulse-slow opacity-50"></div>
      )}
      {children}
    </div>
  );
};

export default OutlineNode;
