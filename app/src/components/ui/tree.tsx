import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import { VscChevronRight } from "react-icons/vsc";

import { cn } from "@/lib/utils";

export type TreeExpandMode = "manual" | "all-open";

export interface TreeProps {
  activeId?: string | null;
  expandMode?: TreeExpandMode;
  defaultExpanded?: Set<string> | string[];
  expanded?: Set<string>;
  onExpandedChange?: (expanded: Set<string>) => void;
  guideLines?: boolean;
  indentStep?: number;
  indentBase?: number;
  rowHeight?: number;
  className?: string;
  children: React.ReactNode;
}

export interface TreeItemProps {
  id: string;
  depth?: number;
  label: React.ReactNode;
  icon?: React.ReactNode;
  iconColor?: string;
  onClick?: () => void;
  className?: string;
}

export interface TreeGroupProps {
  id: string;
  depth?: number;
  label: React.ReactNode;
  icon?: React.ReactNode;
  iconOpen?: React.ReactNode;
  iconColor?: string;
  collapsible?: boolean;
  onClick?: () => void;
  className?: string;
  children: React.ReactNode;
}

interface TreeContextValue {
  activeId: string | null;
  expandMode: TreeExpandMode;
  expanded: Set<string>;
  toggle: (id: string) => void;
  guideLines: boolean;
  indentStep: number;
  indentBase: number;
  rowHeight: number | undefined;
}

const TreeContext = createContext<TreeContextValue | null>(null);

function useTreeContext(): TreeContextValue {
  const ctx = useContext(TreeContext);
  if (!ctx)
    throw new Error("Tree.Item / Tree.Group must be used inside <Tree>");
  return ctx;
}

const GuideLines: React.FC<{ depth: number; indentStep: number }> = ({
  depth,
  indentStep,
}) => (
  <>
    {Array.from({ length: depth }).map((_, i) => (
      <span
        key={i}
        className="absolute top-0 bottom-0 border-l border-ctp-surface1/30"
        style={{ left: `${i * indentStep + 10}px` }}
      />
    ))}
  </>
);

function rowClassName(isActive: boolean, className?: string) {
  return cn(
    "group w-full text-left pr-3 text-[13px] flex items-center cursor-pointer outline-none font-source select-none relative",
    isActive
      ? "bg-ctp-surface1/60 text-ctp-text"
      : "text-ctp-subtext0 hover:text-ctp-text hover:bg-ctp-surface0/50",
    className
  );
}

const TreeItem: React.FC<TreeItemProps> = ({
  id,
  depth = 0,
  label,
  icon,
  iconColor,
  onClick,
  className,
}) => {
  const { activeId, guideLines, indentStep, indentBase, rowHeight } =
    useTreeContext();
  const isActive = id === activeId;
  const paddingLeft = indentBase + 12 + depth * indentStep;

  return (
    <button
      onClick={onClick}
      style={{
        paddingLeft: `${paddingLeft}px`,
        ...(rowHeight != null ? { height: `${rowHeight}px` } : {}),
      }}
      className={cn(rowClassName(isActive, className), "gap-1.5 py-[4px]")}
    >
      {guideLines && <GuideLines depth={depth} indentStep={indentStep} />}
      {icon && (
        <span className={cn("w-[14px] h-[14px] flex-shrink-0", iconColor)}>
          {icon}
        </span>
      )}
      <span className="truncate whitespace-nowrap">{label}</span>
    </button>
  );
};

const TreeGroup: React.FC<TreeGroupProps> = ({
  id,
  depth = 0,
  label,
  icon,
  iconOpen,
  iconColor = "text-ctp-blue",
  collapsible = true,
  onClick,
  className,
  children,
}) => {
  const {
    expandMode,
    expanded,
    toggle,
    activeId,
    guideLines,
    indentStep,
    indentBase,
    rowHeight,
  } = useTreeContext();

  const alwaysOpen = expandMode === "all-open" || !collapsible;
  const isOpen = alwaysOpen || expanded.has(id);
  const isActive = id === activeId;
  const paddingLeft = indentBase + depth * indentStep;

  const handleClick = useCallback(() => {
    if (!alwaysOpen) toggle(id);
    onClick?.();
  }, [alwaysOpen, toggle, id, onClick]);

  return (
    <div>
      <button
        onClick={handleClick}
        style={{
          paddingLeft: `${paddingLeft}px`,
          ...(rowHeight != null ? { height: `${rowHeight}px` } : {}),
        }}
        className={cn(rowClassName(isActive, className), "gap-1 py-[4px]")}
      >
        {guideLines && <GuideLines depth={depth} indentStep={indentStep} />}
        {!alwaysOpen && (
          <VscChevronRight
            className={cn(
              "w-[14px] h-[14px] flex-shrink-0 transition-transform duration-150",
              isOpen ? "rotate-90 text-ctp-text" : "text-ctp-overlay0"
            )}
          />
        )}
        {(icon || iconOpen) && (
          <span className={cn("flex-shrink-0 ml-0.5", iconColor)}>
            {isOpen ? (iconOpen ?? icon) : icon}
          </span>
        )}
        <span className="truncate whitespace-nowrap ml-1">{label}</span>
      </button>
      {isOpen && <div>{children}</div>}
    </div>
  );
};

function toSet(val: Set<string> | string[] | undefined): Set<string> {
  if (!val) return new Set();
  return val instanceof Set ? val : new Set(val);
}

const TreeRoot: React.FC<TreeProps> = ({
  activeId = null,
  expandMode = "manual",
  defaultExpanded,
  expanded: controlledExpanded,
  onExpandedChange,
  guideLines = false,
  indentStep = 12,
  indentBase = 4,
  rowHeight,
  className,
  children,
}) => {
  const [internalExpanded, setInternalExpanded] = useState<Set<string>>(() =>
    toSet(defaultExpanded)
  );

  const isControlled = controlledExpanded !== undefined;
  const expanded = isControlled ? controlledExpanded : internalExpanded;

  const toggle = useCallback(
    (id: string) => {
      const next = new Set(expanded);
      if (next.has(id)) next.delete(id);
      else next.add(id);

      if (isControlled) {
        onExpandedChange?.(next);
      } else {
        setInternalExpanded(next);
      }
    },
    [expanded, isControlled, onExpandedChange]
  );

  const ctx = useMemo<TreeContextValue>(
    () => ({
      activeId,
      expandMode,
      expanded,
      toggle,
      guideLines,
      indentStep,
      indentBase,
      rowHeight,
    }),
    [
      activeId,
      expandMode,
      expanded,
      toggle,
      guideLines,
      indentStep,
      indentBase,
      rowHeight,
    ]
  );

  return (
    <TreeContext.Provider value={ctx}>
      <div className={className}>{children}</div>
    </TreeContext.Provider>
  );
};

export const Tree = Object.assign(TreeRoot, {
  Item: TreeItem,
  Group: TreeGroup,
});

export default Tree;
