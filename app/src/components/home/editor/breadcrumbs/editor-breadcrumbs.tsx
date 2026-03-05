import React, { type ReactNode, useCallback, useEffect, useRef } from "react";
import { FaFolder, FaFolderOpen } from "react-icons/fa";
import {
  VscChevronDown,
  VscChevronRight,
  VscSymbolClass,
  VscSymbolMethod,
  VscSymbolProperty,
} from "react-icons/vsc";

import { useMarkdownHeading } from "@/components/home/editor/context/markdown-heading-context";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import useProjectStore from "@/store/projects/projects-store";

import { type SectionType } from "../context/editor-store";
import {
  type SectionTab,
  type Tab,
  useEditorContext,
} from "../context/explorer-context";
import { getIconColor, sectionIconMap } from "../tabs/tab-style";
import BreadcrumbTreeDropdown from "./breadcrumb-tree-dropdown";

interface BreadcrumbSegment {
  label: string;
  icon: ReactNode;
  iconColor: string;
  isActive: boolean;
  isFolder: boolean;
}

const FolderIcon: React.FC<{ isOpen: boolean }> = ({ isOpen }) =>
  isOpen ? <FaFolderOpen /> : <FaFolder />;

interface SegmentProps {
  seg: BreadcrumbSegment;
  activeSection: SectionType;
  activeProjectId: string | null;
  canOpenTree: boolean;
  treeVariant: "portfolio" | "projects";
  onSelectSection: (section: SectionType) => void;
  onSelectProject: (projectId: string) => void;
}

const BreadcrumbSegmentItem: React.FC<SegmentProps> = ({
  seg,
  activeSection,
  activeProjectId,
  canOpenTree,
  treeVariant,
  onSelectSection,
  onSelectProject,
}) => {
  const inner = (
    <>
      <span className={cn("flex-shrink-0 text-[11px]", seg.iconColor)}>
        {seg.isFolder ? <FolderIcon isOpen={false} /> : seg.icon}
      </span>
      <span
        className={cn(
          "leading-none",
          seg.isActive ? "text-ctp-text font-medium" : "text-ctp-subtext0",
        )}
      >
        {seg.label}
      </span>
      {canOpenTree && (
        <VscChevronDown className="w-3 h-3 flex-shrink-0 text-ctp-overlay0/70 transition-transform duration-150 data-[state=open]:rotate-180" />
      )}
    </>
  );

  if (!canOpenTree) {
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

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          className={cn(
            "flex items-center gap-1.5 px-1.5 py-0.5 rounded-sm transition-colors duration-150 cursor-pointer",
            "text-ctp-subtext0 hover:text-ctp-text hover:bg-ctp-surface0/40",
            "data-[state=open]:bg-ctp-surface0/60 data-[state=open]:text-ctp-text",
          )}
        >
          {inner}
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="start"
        className="w-[260px] max-h-[300px] bg-ctp-mantle/75 backdrop-blur-md border-ctp-surface0/60 shadow-2xl shadow-black/60 py-1.5 overflow-y-auto overflow-x-hidden"
      >
        <BreadcrumbTreeDropdown
          activeSection={activeSection}
          activeProjectId={activeProjectId}
          variant={treeVariant}
          onSelectSection={onSelectSection}
          onSelectProject={onSelectProject}
        />
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

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
  const { isDeepDive, activeHeadings } = useMarkdownHeading();

  const activeTab: Tab | null =
    openTabs.find((t) => t.id === activeTabId) ?? null;

  const segments: BreadcrumbSegment[] = React.useMemo(() => {
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
          });
        }
        if (activeHeadings.h2) {
          base.push({
            label: activeHeadings.h2,
            icon: <VscSymbolMethod />,
            iconColor: "text-ctp-green",
            isActive: !activeHeadings.h3,
            isFolder: false,
          });
        }
        if (activeHeadings.h3) {
          base.push({
            label: activeHeadings.h3,
            icon: <VscSymbolProperty />,
            iconColor: "text-ctp-peach",
            isActive: true,
            isFolder: false,
          });
        }
      }

      return base;
    }

    return [root];
  }, [activeTab, isDeepDive, activeHeadings]);

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
    <div
      ref={barRef}
      className="flex items-center gap-0 px-3 py-1 bg-ctp-mantle border-none text-xs font-source select-none overflow-x-auto whitespace-nowrap [&::-webkit-scrollbar]:hidden"
    >
      {activeTab &&
        segments.map((seg, i) => (
          <React.Fragment key={`${seg.label}-${i}`}>
            {i > 0 && (
              <VscChevronRight className="w-3 h-3 text-ctp-overlay0/50 flex-shrink-0 mx-0.5" />
            )}
            <BreadcrumbSegmentItem
              seg={seg}
              activeSection={activeSection}
              activeProjectId={activeProjectId}
              canOpenTree={seg.isFolder}
              treeVariant={seg.label === "projects" ? "projects" : "portfolio"}
              onSelectSection={handleSelectSection}
              onSelectProject={handleSelectProject}
            />
          </React.Fragment>
        ))}
    </div>
  );
};

export default EditorBreadcrumbs;
