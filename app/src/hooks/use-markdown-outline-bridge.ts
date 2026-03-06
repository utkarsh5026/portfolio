import { FileText } from "lucide-react";
import React, { useEffect, useRef } from "react";
import {
  VscSymbolClass,
  VscSymbolMethod,
  VscSymbolProperty,
} from "react-icons/vsc";

import type { AppColor } from "@/lib/ctp-colors";
import useMarkdownHeadingStore, {
  type HeadingNode,
} from "@/store/markdown-heading/markdown-heading-store";
import useOutlineStore, {
  type OutlineItem,
} from "@/store/outline/outline-store";
const LEVEL_CONFIG: Record<
  1 | 2 | 3,
  { icon: React.ReactNode; color: AppColor }
> = {
  1: {
    icon: React.createElement(VscSymbolClass, { className: "w-3 h-3" }),
    color: "mauve",
  },
  2: {
    icon: React.createElement(VscSymbolMethod, { className: "w-3 h-3" }),
    color: "blue",
  },
  3: {
    icon: React.createElement(VscSymbolProperty, { className: "w-3 h-3" }),
    color: "lavender",
  },
};

function flattenHeadingTree(
  nodes: HeadingNode[],
  parentId: string,
  baseLevel: number
): OutlineItem[] {
  const items: OutlineItem[] = [];
  for (const node of nodes) {
    const config = LEVEL_CONFIG[node.level];
    items.push({
      id: node.id,
      label: node.text,
      level: baseLevel + node.level,
      icon: config.icon,
      iconColor: config.color,
      parentId,
    });
    if (node.children.length > 0) {
      items.push(...flattenHeadingTree(node.children, node.id, baseLevel));
    }
  }
  return items;
}

/**
 * Bridges markdown heading tree into the outline store.
 * When Deep Dive is active, registers a root node for the project
 * and all heading nodes as outline items. Sets the project as the
 * active section so the outline panel displays them.
 * Unregisters everything when switching away or unmounting.
 */
export function useMarkdownOutlineBridge(projectName: string) {
  const headingTree = useMarkdownHeadingStore((s) => s.headingTree);
  const isDeepDive = useMarkdownHeadingStore((s) => s.isDeepDive);
  const register = useOutlineStore((s) => s.register);
  const unregister = useOutlineStore((s) => s.unregister);
  const setActiveSection = useOutlineStore((s) => s.setActiveSection);
  const registeredIds = useRef<string[]>([]);
  const prevActiveSection = useRef<string | null>(null);

  useEffect(() => {
    for (const id of registeredIds.current) unregister(id);
    registeredIds.current = [];

    if (!isDeepDive || headingTree.length === 0) {
      if (prevActiveSection.current !== null) {
        setActiveSection(prevActiveSection.current);
        prevActiveSection.current = null;
      }
      return;
    }

    const currentActive = useOutlineStore.getState().activeSection;
    if (prevActiveSection.current === null) {
      prevActiveSection.current = currentActive;
    }

    const rootId = `md-${projectName}`;
    register({
      id: rootId,
      label: projectName,
      level: 0,
      icon: React.createElement(FileText, { className: "w-3 h-3" }),
      iconColor: "green",
      parentId: null,
    });
    registeredIds.current.push(rootId);

    const items = flattenHeadingTree(headingTree, rootId, 0);
    for (const item of items) {
      register(item);
      registeredIds.current.push(item.id);
    }

    setActiveSection(rootId);

    return () => {
      for (const id of registeredIds.current) unregister(id);
      registeredIds.current = [];
      if (prevActiveSection.current !== null) {
        setActiveSection(prevActiveSection.current);
        prevActiveSection.current = null;
      }
    };
  }, [
    isDeepDive,
    headingTree,
    projectName,
    register,
    unregister,
    setActiveSection,
  ]);
}
