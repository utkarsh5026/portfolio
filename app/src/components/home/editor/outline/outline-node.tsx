import React, { useEffect } from "react";

import type { AppColor } from "@/lib/ctp-colors";
import useOutlineStore from "@/store/outline/outline-store";
import { toOutlineId } from "@/utils/outline-id";

import { OutlineNodeContext, useOutlinePosition } from "./outline-node-context";

interface OutlineNodeProps {
  id?: string;
  label: string;
  icon?: React.ReactNode;
  iconColor?: AppColor;
  children: React.ReactNode;
  className?: string;
}

const OutlineNode: React.FC<OutlineNodeProps> = ({
  id: explicitId,
  label,
  icon,
  iconColor,
  children,
  className = "",
}) => {
  const { parentId, depth } = useOutlinePosition();
  const id = explicitId ?? toOutlineId(label, parentId);

  const isHighlighted = useOutlineStore((s) => s.activeHighlightId === id);
  const register = useOutlineStore((s) => s.register);
  const unregister = useOutlineStore((s) => s.unregister);

  useEffect(() => {
    register({ id, label, level: depth, icon, iconColor, parentId });
    return () => unregister(id);
  }, [id, label, depth, icon, iconColor, parentId, register, unregister]);

  return (
    <OutlineNodeContext.Provider value={{ parentId: id, depth: depth + 1 }}>
      <div
        id={id}
        className={`outline-node relative transition-all duration-300 ease-in-out ${
          isHighlighted
            ? "border-ctp-mauve p-4 border border-opacity-90 shadow-[0_0_12px_rgba(203,166,247,0.6),0_0_4px_rgba(203,166,247,0.8)] scale-[1.03] z-10 bg-ctp-mauve/5 rounded-sm -translate-y-0.5"
            : "border-transparent border"
        } ${className}`}
        data-level={depth}
        data-parent={parentId ?? ""}
      >
        {isHighlighted && (
          <div className="absolute inset-0 bg-gradient-to-r from-ctp-mauve/10 to-transparent rounded-sm animate-pulse-slow opacity-50" />
        )}
        {children}
      </div>
    </OutlineNodeContext.Provider>
  );
};

export default OutlineNode;
