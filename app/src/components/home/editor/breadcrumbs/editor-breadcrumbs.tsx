import React, {
  useState,
  useRef,
  useEffect,
  useCallback,
  type ReactNode,
} from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { VscChevronRight, VscChevronDown } from "react-icons/vsc";
import { FaFolder, FaFolderOpen } from "react-icons/fa";
import { cn } from "@/lib/utils";
import {
  useEditorContext,
  type SectionTab,
  type Tab,
} from "../context/explorer-context";
import {
  editorFiles,
  getProjectFileName,
  type SectionType,
} from "../context/editor-store";
import { sectionIconMap, getIconColor } from "../tabs/tab-style";
import useProjectStore from "@/store/projects/projects-store";
import { TreeFile, TreeFolder } from "../shared/editor-tree";

interface BreadcrumbSegment {
  label: string;
  icon: ReactNode;
  iconColor: string;
  isActive: boolean;
  isFolder: boolean;
}

const FolderIcon: React.FC<{ isOpen: boolean }> = ({ isOpen }) =>
  isOpen ? <FaFolderOpen /> : <FaFolder />;

interface DropdownRect {
  top: number;
  left: number;
}

interface TreeDropdownProps {
  anchor: DropdownRect;
  activeSection: SectionType;
  activeProjectId: string | null;
  variant: "portfolio" | "projects";
  onSelectSection: (section: SectionType) => void;
  onSelectProject: (projectId: string) => void;
  onClose: () => void;
}

const BreadcrumbTreeDropdown: React.FC<TreeDropdownProps> = ({
  anchor,
  activeSection,
  activeProjectId,
  variant,
  onSelectSection,
  onSelectProject,
  onClose,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [projectsOpen, setProjectsOpen] = useState(true);
  const projects = useProjectStore((s) => s.projects);

  // Close on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) onClose();
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [onClose]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [onClose]);

  const projectFiles = (
    <>
      {projects.map((p) => (
        <TreeFile
          key={p.name}
          name={getProjectFileName(p.name)}
          depth={variant === "projects" ? 1 : 2}
          isActive={activeProjectId === p.name}
          onClick={() => {
            onSelectProject(p.name);
            onClose();
          }}
        />
      ))}
    </>
  );

  const panel = (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: -6, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -6, scale: 0.97 }}
      transition={{ duration: 0.12, ease: "easeOut" }}
      style={{
        position: "fixed",
        top: anchor.top,
        left: anchor.left,
        zIndex: 9999,
      }}
      className="min-w-[220px] max-w-[300px] rounded-md bg-ctp-mantle border border-ctp-surface0/60 shadow-2xl shadow-black/60 py-1.5 overflow-hidden"
    >
      {variant === "portfolio" ? (
        /* Full portfolio tree */
        <TreeFolder
          name="portfolio"
          isOpen={true}
          depth={0}
          onToggle={() => {}}
        >
          {editorFiles.map((f) => (
            <TreeFile
              key={f.section}
              name={f.name}
              depth={1}
              isActive={activeProjectId === null && activeSection === f.section}
              onClick={() => {
                onSelectSection(f.section);
                onClose();
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
        /* Projects-only tree */
        <TreeFolder name="projects" isOpen={true} depth={0} onToggle={() => {}}>
          {projectFiles}
        </TreeFolder>
      )}
    </motion.div>
  );

  return createPortal(panel, document.body);
};

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
  const [open, setOpen] = useState(false);
  const btnRef = useRef<HTMLButtonElement>(null);
  const [rect, setRect] = useState<DropdownRect>({ top: 0, left: 0 });

  const close = useCallback(() => setOpen(false), []);

  const handleClick = () => {
    if (!canOpenTree || !btnRef.current) return;
    const r = btnRef.current.getBoundingClientRect();
    setRect({ top: r.bottom + 4, left: r.left });
    setOpen((v) => !v);
  };

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
      {canOpenTree && (
        <VscChevronDown
          className={cn(
            "w-3 h-3 flex-shrink-0 text-ctp-overlay0/70 transition-transform duration-150",
            open && "rotate-180",
          )}
        />
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
    <>
      <button
        ref={btnRef}
        onClick={handleClick}
        className={cn(
          "flex items-center gap-1.5 px-1.5 py-0.5 rounded-sm transition-colors duration-150 cursor-pointer",
          "text-ctp-subtext0 hover:text-ctp-text hover:bg-ctp-surface0/40",
          open && "bg-ctp-surface0/60 text-ctp-text",
        )}
      >
        {inner}
      </button>

      <AnimatePresence>
        {open && (
          <BreadcrumbTreeDropdown
            anchor={rect}
            activeSection={activeSection}
            activeProjectId={activeProjectId}
            variant={treeVariant}
            onSelectSection={onSelectSection}
            onSelectProject={onSelectProject}
            onClose={close}
          />
        )}
      </AnimatePresence>
    </>
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
      return [
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
          isActive: true,
          isFolder: false,
        },
      ];
    }

    return [root];
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeTab, openTabs, projects]);

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

  return (
    <AnimatePresence mode="wait">
      {activeTab && (
        <motion.div
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
              />
            </React.Fragment>
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default EditorBreadcrumbs;
