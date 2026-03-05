import React from "react";
import { SiTypescript } from "react-icons/si";
import {
  VscChevronRight,
  VscFolder,
  VscFolderOpened,
  VscMarkdown,
} from "react-icons/vsc";

import { cn } from "@/lib/utils";

export interface TreeFileProps {
  name: string;
  isActive: boolean;
  depth?: number;
  onClick: () => void;
}

export const TreeFile: React.FC<TreeFileProps> = ({
  name,
  isActive,
  depth = 0,
  onClick,
}) => (
  <button
    onClick={onClick}
    style={{ paddingLeft: `${16 + depth * 12}px` }}
    className={cn(
      "group w-full text-left py-[4px] pr-3 text-[13px] flex items-center gap-1.5 cursor-pointer outline-none font-source",
      isActive
        ? "bg-ctp-surface1/60 text-ctp-text"
        : "text-ctp-subtext0 hover:text-ctp-text hover:bg-ctp-surface0/50",
    )}
  >
    {name.endsWith(".ts") || name.endsWith(".tsx") ? (
      <SiTypescript className="w-[14px] h-[14px] flex-shrink-0 text-ctp-blue" />
    ) : (
      <VscMarkdown className="w-[14px] h-[14px] flex-shrink-0 text-ctp-blue" />
    )}
    <span className="truncate whitespace-nowrap">{name}</span>
  </button>
);

export interface TreeFolderProps {
  name: string;
  isOpen: boolean;
  depth?: number;
  onToggle: () => void;
  children: React.ReactNode;
}

export const TreeFolder: React.FC<TreeFolderProps> = ({
  name,
  isOpen,
  depth = 0,
  onToggle,
  children,
}) => (
  <div className="mb-0">
    <button
      onClick={onToggle}
      style={{ paddingLeft: `${4 + depth * 12}px` }}
      className="group w-full text-left py-[4px] pr-3 text-[13px] flex items-center gap-1 text-ctp-subtext0 hover:text-ctp-text hover:bg-ctp-surface0/50 cursor-pointer outline-none font-source"
    >
      <VscChevronRight
        className={cn(
          "w-[14px] h-[14px] flex-shrink-0 transition-transform duration-150",
          isOpen ? "rotate-90 text-ctp-text" : "text-ctp-overlay0",
        )}
      />
      {isOpen ? (
        <VscFolderOpened className="w-[14px] h-[14px] flex-shrink-0 text-ctp-blue ml-0.5" />
      ) : (
        <VscFolder className="w-[14px] h-[14px] flex-shrink-0 text-ctp-blue ml-0.5" />
      )}
      <span className="truncate whitespace-nowrap ml-1">{name}</span>
    </button>
    {isOpen && <div className="mt-0">{children}</div>}
  </div>
);
