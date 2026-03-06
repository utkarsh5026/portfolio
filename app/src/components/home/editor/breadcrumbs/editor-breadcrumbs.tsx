import { AnimatePresence, motion } from "framer-motion";
import React, {
  type ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { FaFolder, FaFolderOpen } from "react-icons/fa";
import { SiTypescript } from "react-icons/si";
import {
  VscChevronDown,
  VscChevronRight,
  VscFolder,
  VscFolderOpened,
  VscMarkdown,
  VscSymbolClass,
  VscSymbolMethod,
  VscSymbolProperty,
} from "react-icons/vsc";

import { Tree } from "@/components/ui/tree";
import { ctpColorClass } from "@/lib/ctp-colors";
import { cn } from "@/lib/utils";
import type { HeadingNode } from "@/store";
import { useMarkdownHeadingStore } from "@/store";
import useOutlineStore, {
  type OutlineItem,
} from "@/store/outline/outline-store";
import useProjectStore from "@/store/projects/projects-store";

import {
  editorFiles,
  getProjectFileName,
  type SectionType,
} from "../context/editor-store";
import {
  type SectionTab,
  type Tab,
  useEditorContext,
} from "../context/explorer-context";
import { getIconColor, sectionIconMap } from "../tabs/tab-style";
import TreeDropdown from "./tree-dropdown";

const folderIcon = <VscFolder className="w-[14px] h-[14px]" />;
const folderOpenIcon = <VscFolderOpened className="w-[14px] h-[14px]" />;

interface BreadcrumbSegment {
  label: string;
  icon: ReactNode;
  iconColor: string;
  isActive: boolean;
  isFolder: boolean;
  /**
   * When set, this segment represents a heading at the given level.
   * The dropdown will show sibling headings (or the full tree for the file).
   */
  headingLevel?: 1 | 2 | 3 | "file";
  /** Heading id (slug) for this segment — used to highlight it in the dropdown. */
  headingId?: string;
  /** Flat outline items to show in the dropdown for this section file segment. */
  outlineItems?: OutlineItem[];
  /** Root id to start rendering the outline tree from. */
  outlineSectionId?: string;
}

const FolderIcon: React.FC<{ isOpen: boolean }> = ({ isOpen }) =>
  isOpen ? <FaFolderOpen /> : <FaFolder />;

const LEVEL_META: Record<1 | 2 | 3, { icon: React.ReactNode; color: string }> =
  {
    1: { icon: <VscSymbolClass />, color: "text-ctp-mauve" },
    2: { icon: <VscSymbolMethod />, color: "text-ctp-green" },
    3: { icon: <VscSymbolProperty />, color: "text-ctp-peach" },
  };

function renderHeadingTree(
  nodes: HeadingNode[],
  depth: number,
  onNavigate: (id: string) => void
): React.ReactNode[] {
  return nodes.map((node) => (
    <React.Fragment key={node.id}>
      <Tree.Item
        id={node.id}
        depth={depth}
        label={node.text}
        icon={LEVEL_META[node.level].icon}
        iconColor={LEVEL_META[node.level].color}
        onClick={() => onNavigate(node.id)}
      />
      {node.children.length > 0 &&
        renderHeadingTree(node.children, depth + 1, onNavigate)}
    </React.Fragment>
  ));
}

interface SegmentProps {
  seg: BreadcrumbSegment;
  activeSection: SectionType;
  activeProjectId: string | null;
  canOpenTree: boolean;
  treeVariant: "portfolio" | "projects";
  onSelectSection: (section: SectionType) => void;
  onSelectProject: (projectId: string) => void;
  /** Heading nodes to show when this segment's dropdown is a heading tree. */
  headingDropdownNodes?: HeadingNode[];
  /** Currently active heading id (for highlighting inside the heading dropdown). */
  activeHeadingId?: string | null;
  /** Flat outline items to render as the dropdown for a section file segment. */
  outlineItems?: OutlineItem[];
  /** Root id to start rendering the outline tree from. */
  outlineSectionId?: string;
  /** Currently highlighted outline node id. */
  activeOutlineId?: string | null;
}

function renderOutlineTree(
  parentId: string,
  items: OutlineItem[],
  depth: number,
  onNavigate: (id: string) => void
): React.ReactNode[] {
  return items
    .filter((item) => item.parentId === parentId)
    .map((item) => {
      const hasChildren = items.some((i) => i.parentId === item.id);
      const wrappedIcon = item.icon ? (
        <span className="w-3 h-3 flex items-center justify-center">
          {item.icon}
        </span>
      ) : undefined;
      const iconColor = item.iconColor
        ? ctpColorClass("text", item.iconColor)
        : undefined;
      if (hasChildren) {
        return (
          <Tree.Group
            key={item.id}
            id={item.id}
            depth={depth}
            label={item.label}
            icon={wrappedIcon}
            iconOpen={wrappedIcon}
            iconColor={iconColor}
            onClick={() => onNavigate(item.id)}
          >
            {renderOutlineTree(item.id, items, depth + 1, onNavigate)}
          </Tree.Group>
        );
      }
      return (
        <Tree.Item
          key={item.id}
          id={item.id}
          depth={depth}
          label={item.label}
          icon={wrappedIcon}
          iconColor={iconColor}
          onClick={() => onNavigate(item.id)}
        />
      );
    });
}

const BreadcrumbSegmentItem: React.FC<SegmentProps> = ({
  seg,
  activeSection,
  activeProjectId,
  canOpenTree,
  treeVariant,
  onSelectSection,
  onSelectProject,
  headingDropdownNodes,
  activeHeadingId,
  outlineItems,
  outlineSectionId,
  activeOutlineId,
}) => {
  const [open, setOpen] = useState(false);
  const projects = useProjectStore((s) => s.projects);
  const highlightNode = useOutlineStore((s) => s.highlightNode);

  const isHeading = !!seg.headingLevel;
  const isOutline =
    !!outlineItems &&
    !!outlineSectionId &&
    outlineItems.some((i) => i.parentId === outlineSectionId);
  const hasDropdown =
    canOpenTree ||
    (isHeading && headingDropdownNodes && headingDropdownNodes.length > 0) ||
    isOutline;

  const inner = (
    <>
      <span className={cn("flex-shrink-0 text-[11px]", seg.iconColor)}>
        {seg.isFolder ? <FolderIcon isOpen={open} /> : seg.icon}
      </span>
      <span
        className={cn(
          "leading-none",
          seg.isActive ? "text-ctp-text font-medium" : "text-ctp-subtext0"
        )}
      >
        {seg.label}
      </span>
      {hasDropdown && (
        <VscChevronDown
          className={cn(
            "w-3 h-3 flex-shrink-0 text-ctp-overlay0/70 transition-transform duration-150",
            open && "rotate-180"
          )}
        />
      )}
    </>
  );

  if (!hasDropdown) {
    return (
      <span
        className={cn(
          "flex items-center gap-1.5 px-1.5 py-0.5 rounded-sm",
          seg.isActive
            ? "text-ctp-text bg-ctp-surface0/60"
            : "text-ctp-subtext0"
        )}
      >
        {inner}
      </span>
    );
  }

  const tsIcon = <SiTypescript className="w-[14px] h-[14px]" />;
  const mdIcon = <VscMarkdown className="w-[14px] h-[14px]" />;

  const projectFileItems = projects.map((p) => (
    <Tree.Item
      key={p.name}
      id={p.name}
      depth={treeVariant === "projects" ? 1 : 2}
      label={getProjectFileName(p.name)}
      icon={mdIcon}
      iconColor="text-ctp-blue"
      onClick={() => {
        onSelectProject(p.name);
        setOpen(false);
      }}
    />
  ));

  const treeContent =
    isOutline && outlineItems && outlineSectionId ? (
      <Tree
        activeId={activeOutlineId ?? null}
        expandMode="all-open"
        indentStep={14}
        indentBase={16}
      >
        {renderOutlineTree(outlineSectionId, outlineItems, 0, (id) => {
          document.getElementById(id)?.scrollIntoView({
            behavior: "smooth",
            block: "center",
          });
          highlightNode(id);
          setOpen(false);
        })}
      </Tree>
    ) : isHeading ? (
      <>
        {headingDropdownNodes && headingDropdownNodes.length > 0 ? (
          <Tree
            activeId={activeHeadingId ?? null}
            expandMode="all-open"
            indentStep={14}
            indentBase={16}
          >
            {renderHeadingTree(headingDropdownNodes, 0, (id: string) => {
              document.getElementById(id)?.scrollIntoView({
                behavior: "smooth",
                block: "start",
              });
              setOpen(false);
            })}
          </Tree>
        ) : (
          <span className="block px-4 py-3 text-xs text-ctp-overlay0 italic">
            No headings found
          </span>
        )}
      </>
    ) : treeVariant === "portfolio" ? (
      <Tree
        activeId={
          activeProjectId ?? (activeProjectId === null ? activeSection : null)
        }
        defaultExpanded={new Set(["portfolio", "projects"])}
      >
        <Tree.Group
          id="portfolio"
          label="portfolio"
          depth={0}
          icon={folderIcon}
          iconOpen={folderOpenIcon}
          iconColor="text-ctp-blue"
          collapsible={false}
        >
          {editorFiles.map((f) => (
            <Tree.Item
              key={f.section}
              id={f.section}
              depth={1}
              label={f.name}
              icon={
                f.name.endsWith(".ts") || f.name.endsWith(".tsx")
                  ? tsIcon
                  : mdIcon
              }
              iconColor="text-ctp-blue"
              onClick={() => {
                onSelectSection(f.section);
                setOpen(false);
              }}
            />
          ))}
          <Tree.Group
            id="projects"
            label="projects"
            depth={1}
            icon={folderIcon}
            iconOpen={folderOpenIcon}
            iconColor="text-ctp-blue"
          >
            {projectFileItems}
          </Tree.Group>
        </Tree.Group>
      </Tree>
    ) : (
      <Tree activeId={activeProjectId} defaultExpanded={new Set(["projects"])}>
        <Tree.Group
          id="projects"
          label="projects"
          depth={0}
          icon={folderIcon}
          iconOpen={folderOpenIcon}
          iconColor="text-ctp-blue"
          collapsible={false}
        >
          {projectFileItems}
        </Tree.Group>
      </Tree>
    );

  return (
    <TreeDropdown
      open={open}
      onOpenChange={setOpen}
      trigger={
        <button
          className={cn(
            "flex items-center gap-1.5 px-1.5 py-0.5 rounded-sm transition-colors duration-150 cursor-pointer",
            "text-ctp-subtext0 hover:text-ctp-text hover:bg-ctp-surface0/40",
            open && "bg-ctp-surface0/60 text-ctp-text"
          )}
        >
          {inner}
        </button>
      }
    >
      {treeContent}
    </TreeDropdown>
  );
};

/**
 * Given the full heading tree and the currently active heading ids,
 * return the sibling nodes that should appear for a specific heading level.
 */
function getSiblingNodes(
  tree: HeadingNode[],
  level: 1 | 2 | 3 | "file",
  activeH1Id: string | null,
  activeH2Id: string | null
): HeadingNode[] {
  if (level === "file") return tree;

  if (level === 1) return tree;

  if (level === 2) {
    if (!activeH1Id) return [];
    const parent = tree.find((n) => n.id === activeH1Id);
    return parent?.children.filter((c) => c.level === 2) ?? [];
  }

  if (level === 3) {
    if (!activeH1Id || !activeH2Id) return [];
    const h1 = tree.find((n) => n.id === activeH1Id);
    const h2 = h1?.children.find((c) => c.id === activeH2Id);
    return h2?.children.filter((c) => c.level === 3) ?? [];
  }

  return [];
}

/** Build the slug id that matches how the renderer generates heading ids. */
const labelToSlug = (label: string): string =>
  label
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");

export const EditorBreadcrumbs: React.FC = () => {
  const {
    activeTabId,
    openTabs,
    setActiveSection,
    openProject,
    activeSection,
    activeProjectId,
  } = useEditorContext();
  const projects = useProjectStore((s) => s.projects);
  const outlineItemsMap = useOutlineStore((s) => s.items);
  const activeOutlineId = useOutlineStore((s) => s.activeHighlightId);
  const outlineItems = useMemo(
    () => [...outlineItemsMap.values()],
    [outlineItemsMap]
  );
  const isDeepDive = useMarkdownHeadingStore((s) => s.isDeepDive);
  const activeHeadings = useMarkdownHeadingStore((s) => s.activeHeadings);
  const headingTree = useMarkdownHeadingStore((s) => s.headingTree);

  const activeTab: Tab | null =
    openTabs.find((t) => t.id === activeTabId) ?? null;

  const activeH1Id = activeHeadings.h1 ? labelToSlug(activeHeadings.h1) : null;
  const activeH2Id = activeHeadings.h2 ? labelToSlug(activeHeadings.h2) : null;
  const activeH3Id = activeHeadings.h3 ? labelToSlug(activeHeadings.h3) : null;

  const deepestActiveId = activeH3Id ?? activeH2Id ?? activeH1Id;

  const segments: BreadcrumbSegment[] = useMemo(() => {
    if (!activeTab) return [];

    const root: BreadcrumbSegment = {
      label: "portfolio",
      icon: null,
      iconColor: "text-ctp-yellow",
      isActive: false,
      isFolder: true,
    };

    if (activeTab.type === "section") {
      const sectionId = (activeTab as SectionTab).id as SectionType;
      return [
        root,
        {
          label: activeTab.fileName,
          icon: sectionIconMap[sectionId],
          iconColor: getIconColor(sectionId),
          isActive: true,
          isFolder: false,
          outlineItems,
          outlineSectionId: sectionId,
        },
      ];
    }

    if (activeTab.type === "project") {
      const hasHeadings = isDeepDive && headingTree.length > 0;

      const base: BreadcrumbSegment[] = [
        root,
        {
          label: "projects",
          icon: null,
          iconColor: "text-ctp-green",
          isActive: false,
          isFolder: true,
        },
        {
          label: activeTab.fileName,
          icon: null,
          iconColor: "text-ctp-blue",
          isActive:
            !isDeepDive ||
            (!activeHeadings.h1 && !activeHeadings.h2 && !activeHeadings.h3),
          isFolder: false,
          // The file segment shows the full heading tree when clicked.
          headingLevel: hasHeadings ? "file" : undefined,
        },
      ];

      if (isDeepDive) {
        if (activeHeadings.h1) {
          base.push({
            label: activeHeadings.h1,
            icon: <VscSymbolClass />,
            iconColor: "text-ctp-mauve",
            isActive: !activeHeadings.h2 && !activeHeadings.h3,
            isFolder: false,
            headingLevel: 1,
            headingId: activeH1Id ?? undefined,
          });
        }
        if (activeHeadings.h2) {
          base.push({
            label: activeHeadings.h2,
            icon: <VscSymbolMethod />,
            iconColor: "text-ctp-green",
            isActive: !activeHeadings.h3,
            isFolder: false,
            headingLevel: 2,
            headingId: activeH2Id ?? undefined,
          });
        }
        if (activeHeadings.h3) {
          base.push({
            label: activeHeadings.h3,
            icon: <VscSymbolProperty />,
            iconColor: "text-ctp-peach",
            isActive: true,
            isFolder: false,
            headingLevel: 3,
            headingId: activeH3Id ?? undefined,
          });
        }
      }

      return base;
    }

    return [root];
  }, [
    activeTab,
    isDeepDive,
    activeHeadings,
    headingTree,
    activeH1Id,
    activeH2Id,
    activeH3Id,
    outlineItems,
  ]);

  const handleSelectSection = useCallback(
    (section: SectionType) => setActiveSection(section),
    [setActiveSection]
  );

  const handleSelectProject = useCallback(
    (projectId: string) => {
      const project = projects.find((p) => p.name === projectId);
      if (project) openProject(project);
    },
    [projects, openProject]
  );

  // Scroll the bar to reveal the rightmost (latest) heading segment whenever
  // segments change — needed on small screens where the bar overflows.
  const barRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = barRef.current;
    if (!el) return;
    el.scrollTo({ left: el.scrollWidth, behavior: "smooth" });
  }, [segments]);

  return (
    <AnimatePresence mode="wait">
      {activeTab && (
        <motion.div
          ref={barRef}
          key={`${activeTabId}-bar`}
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -4 }}
          transition={{ duration: 0.15, ease: "easeOut" }}
          className="flex items-center gap-0 px-3 py-1 bg-ctp-mantle border-none text-xs font-source select-none overflow-x-auto whitespace-nowrap [&::-webkit-scrollbar]:hidden"
        >
          {segments.map((seg, i) => (
            <React.Fragment key={`${seg.label}-${i}`}>
              {i > 0 && (
                <VscChevronRight className="w-3 h-3 text-ctp-overlay0/50 flex-shrink-0 mx-0.5" />
              )}
              <BreadcrumbSegmentItem
                seg={seg}
                activeSection={activeSection}
                activeProjectId={activeProjectId}
                canOpenTree={seg.isFolder}
                treeVariant={
                  seg.label === "projects" ? "projects" : "portfolio"
                }
                onSelectSection={handleSelectSection}
                onSelectProject={handleSelectProject}
                headingDropdownNodes={
                  seg.headingLevel
                    ? getSiblingNodes(
                        headingTree,
                        seg.headingLevel,
                        activeH1Id,
                        activeH2Id
                      )
                    : undefined
                }
                activeHeadingId={deepestActiveId}
                outlineItems={seg.outlineItems}
                outlineSectionId={seg.outlineSectionId}
                activeOutlineId={activeOutlineId}
              />
            </React.Fragment>
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default EditorBreadcrumbs;
