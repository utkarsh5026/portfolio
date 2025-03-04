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

  return (
    <div
      ref={nodeRef}
      id={id}
      className={`outline-node relative transition-all duration-300 ease-in-out ${
        isHighlighted
          ? "border-ctp-mauve p-4 border border-opacity-90 shadow-[0_0_12px_rgba(203,166,247,0.6),0_0_4px_rgba(203,166,247,0.8)] scale-[1.03] z-10 bg-ctp-mauve/5 rounded-sm -translate-y-0.5"
          : "border-transparent border"
      } ${className}`}
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
