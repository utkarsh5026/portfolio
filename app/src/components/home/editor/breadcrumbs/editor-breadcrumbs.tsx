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
import {
  VscChevronDown,
  VscChevronRight,
  VscSymbolClass,
  VscSymbolMethod,
  VscSymbolProperty,
} from "react-icons/vsc";

import { cn } from "@/lib/utils";
import type { HeadingNode } from "@/store";
import { useMarkdownHeadingStore } from "@/store";
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
import { TreeFile, TreeFolder } from "../shared/editor-tree";
import { getIconColor, sectionIconMap } from "../tabs/tab-style";
import TreeDropdown from "./tree-dropdown";

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
}

const FolderIcon: React.FC<{ isOpen: boolean }> = ({ isOpen }) =>
  isOpen ? <FaFolderOpen /> : <FaFolder />;

const LEVEL_META: Record<1 | 2 | 3, { icon: React.ReactNode; color: string }> =
  {
    1: { icon: <VscSymbolClass />, color: "text-ctp-mauve" },
    2: { icon: <VscSymbolMethod />, color: "text-ctp-green" },
    3: { icon: <VscSymbolProperty />, color: "text-ctp-peach" },
  };

interface HeadingRowProps {
  node: HeadingNode;
  depth: number;
  activeId: string | null;
  onNavigate: (id: string) => void;
}

const HeadingRow: React.FC<HeadingRowProps> = ({
  node,
  depth,
  activeId,
  onNavigate,
}) => {
  const meta = LEVEL_META[node.level];
  const isActive = node.id === activeId;

  return (
    <>
      <button
        onClick={() => onNavigate(node.id)}
        style={{ paddingLeft: `${16 + depth * 14}px` }}
        className={cn(
          "group w-full text-left py-[5px] pr-3 text-[13px] flex items-center gap-1.5 cursor-pointer outline-none font-source",
          isActive
            ? "bg-ctp-surface1/60 text-ctp-text"
            : "text-ctp-subtext0 hover:text-ctp-text hover:bg-ctp-surface0/50",
        )}
      >
        <span className={cn("w-[14px] h-[14px] flex-shrink-0", meta.color)}>
          {meta.icon}
        </span>
        <span className="truncate whitespace-nowrap">{node.text}</span>
      </button>

      {node.children.length > 0 &&
        node.children.map((child) => (
          <HeadingRow
            key={child.id}
            node={child}
            depth={depth + 1}
            activeId={activeId}
            onNavigate={onNavigate}
          />
        ))}
    </>
  );
};

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
}) => {
  const [open, setOpen] = useState(false);
  const [projectsOpen, setProjectsOpen] = useState(true);
  const projects = useProjectStore((s) => s.projects);

  const isHeading = !!seg.headingLevel;
  const hasDropdown =
    canOpenTree ||
    (isHeading && headingDropdownNodes && headingDropdownNodes.length > 0);

  const inner = (
    <>
      <span className={cn("flex-shrink-0 text-[11px]", seg.iconColor)}>
        {seg.isFolder ? <FolderIcon isOpen={open} /> : seg.icon}
      </span>
      <span
        className={cn(
          "leading-none",
          seg.isActive ? "text-ctp-text font-medium" : "text-ctp-subtext0",
        )}
      >
        {seg.label}
      </span>
      {hasDropdown && (
        <VscChevronDown
          className={cn(
            "w-3 h-3 flex-shrink-0 text-ctp-overlay0/70 transition-transform duration-150",
            open && "rotate-180",
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
            : "text-ctp-subtext0",
        )}
      >
        {inner}
      </span>
    );
  }

  const projectFiles = projects.map((p) => (
    <TreeFile
      key={p.name}
      name={getProjectFileName(p.name)}
      depth={treeVariant === "projects" ? 1 : 2}
      isActive={activeProjectId === p.name}
      onClick={() => {
        onSelectProject(p.name);
        setOpen(false);
      }}
    />
  ));

  const treeContent = isHeading ? (
    <>
      {headingDropdownNodes?.map((node) => (
        <HeadingRow
          key={node.id}
          node={node}
          depth={0}
          activeId={activeHeadingId ?? null}
          onNavigate={(id) => {
            document.getElementById(id)?.scrollIntoView({
              behavior: "smooth",
              block: "start",
            });
            setOpen(false);
          }}
        />
      ))}
      {(!headingDropdownNodes || headingDropdownNodes.length === 0) && (
        <span className="block px-4 py-3 text-xs text-ctp-overlay0 italic">
          No headings found
        </span>
      )}
    </>
  ) : treeVariant === "portfolio" ? (
    <TreeFolder name="portfolio" isOpen={true} depth={0} onToggle={() => {}}>
      {editorFiles.map((f) => (
        <TreeFile
          key={f.section}
          name={f.name}
          depth={1}
          isActive={activeProjectId === null && activeSection === f.section}
          onClick={() => {
            onSelectSection(f.section);
            setOpen(false);
          }}
        />
      ))}
      <TreeFolder
        name="projects"
        isOpen={projectsOpen}
        depth={1}
        onToggle={() => setProjectsOpen((v) => !v)}
      >
        {projectFiles}
      </TreeFolder>
    </TreeFolder>
  ) : (
    <TreeFolder name="projects" isOpen={true} depth={0} onToggle={() => {}}>
      {projectFiles}
    </TreeFolder>
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
            open && "bg-ctp-surface0/60 text-ctp-text",
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
  activeH2Id: string | null,
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
  ]);

  const handleSelectSection = useCallback(
    (section: SectionType) => setActiveSection(section),
    [setActiveSection],
  );

  const handleSelectProject = useCallback(
    (projectId: string) => {
      const project = projects.find((p) => p.name === projectId);
      if (project) openProject(project);
    },
    [projects, openProject],
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
                        activeH2Id,
                      )
                    : undefined
                }
                activeHeadingId={deepestActiveId}
              />
            </React.Fragment>
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default EditorBreadcrumbs;
