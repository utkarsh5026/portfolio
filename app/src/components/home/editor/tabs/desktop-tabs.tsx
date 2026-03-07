import React, { useEffect, useRef } from "react";
import { VscClose, VscMarkdown } from "react-icons/vsc";

import GitBlameTooltip from "@/components/home/editor/git-blame/git-blame-tooltip";
import { useGitMeta } from "@/hooks/use-git-meta";
import { cn } from "@/lib/utils";

import type { SectionTab, Tab } from "../context/explorer-context";
import { useEditorContext } from "../context/explorer-context";
import styles from "../editor-ui.module.css";
import { TabActions } from "./tab-actions";
import { getActiveTabColor, getIconColor, sectionIconMap } from "./tab-style";

const DesktopTabs: React.FC = () => {
  const {
    openTabs,
    activeTabId,
    openTab,
    closeTab,
    closeAllTabs,
    closeTabsToLeft,
    closeTabsToRight,
    closeAllProjects,
  } = useEditorContext();
  const { getBySection } = useGitMeta();

  const scrollRef = useRef<HTMLDivElement>(null);

  const activeIdx = openTabs.findIndex((t) => t.id === activeTabId);
  const hasLeft = activeIdx > 0;
  const hasRight = activeIdx !== -1 && activeIdx < openTabs.length - 1;
  const hasProjects = openTabs.some((t) => t.type === "project");

  // Horizontal scroll with mouse wheel
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const onWheel = (e: WheelEvent) => {
      if (e.deltaY !== 0 && !e.shiftKey) {
        e.preventDefault();
        el.scrollLeft += e.deltaY;
      }
    };
    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, []);

  // Scroll active tab into view when it changes
  useEffect(() => {
    const el = scrollRef.current;
    if (!el || !activeTabId) return;
    const activeTabEl = el.querySelector<HTMLElement>(
      `[data-tab-id="${activeTabId}"]`
    );
    if (activeTabEl) {
      activeTabEl.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "nearest",
      });
    }
  }, [activeTabId]);

  return (
    <div className="flex items-stretch w-full font-source">
      {/* ── Scrollable tab strip ── */}
      <div
        ref={scrollRef}
        className="flex-1 overflow-x-auto [&::-webkit-scrollbar]:h-1 [&::-webkit-scrollbar-thumb]:bg-ctp-surface2/50 [&::-webkit-scrollbar-track]:bg-transparent min-w-0"
      >
        <div className="flex h-10 w-max min-w-full bg-ctp-mantle items-end">
          {openTabs.map((tab: Tab) => {
            const isActive = activeTabId === tab.id;
            const isSectionTab = tab.type === "section";
            const blameMeta = isSectionTab
              ? getBySection((tab as SectionTab).id)
              : null;

            return (
              <GitBlameTooltip key={tab.id} meta={blameMeta}>
                <button
                  data-tab-id={tab.id}
                  onClick={() => openTab(tab)}
                  className={cn(
                    "relative h-10 px-3 flex-shrink-0 min-w-[140px] max-w-[220px] border-r border-ctp-surface0/50 text-xs transition-colors flex items-center gap-2 group",
                    isActive
                      ? "bg-ctp-base text-ctp-text font-medium"
                      : "bg-ctp-mantle text-ctp-subtext0 hover:bg-ctp-surface0 hover:text-ctp-text"
                  )}
                >
                  {isSectionTab ? (
                    <span
                      className={cn(
                        "w-3 h-3 flex-shrink-0",
                        getIconColor((tab as SectionTab).id)
                      )}
                    >
                      {sectionIconMap[(tab as SectionTab).id]}
                    </span>
                  ) : (
                    <VscMarkdown className="w-3.5 h-3.5 text-ctp-blue flex-shrink-0" />
                  )}

                  <span className="text-sm tracking-wide truncate flex-1 text-left select-none">
                    {isSectionTab ? (tab as SectionTab).id : tab.fileName}
                  </span>

                  {/* Per-tab close button */}
                  <span
                    role="button"
                    tabIndex={0}
                    onClick={(e) => {
                      e.stopPropagation();
                      closeTab(tab.id);
                    }}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.stopPropagation();
                        closeTab(tab.id);
                      }
                    }}
                    className={cn(
                      "w-4 h-4 rounded-sm flex items-center justify-center ml-1 flex-shrink-0 transition-colors",
                      isActive
                        ? "opacity-70 hover:opacity-100 hover:bg-ctp-surface1"
                        : "opacity-0 group-hover:opacity-70 hover:!opacity-100 hover:bg-ctp-surface1"
                    )}
                  >
                    <VscClose className="w-3 h-3" />
                  </span>

                  {/* Active top-border indicator */}
                  {isActive && (
                    <div
                      className={cn(
                        "absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r",
                        isSectionTab
                          ? getActiveTabColor((tab as SectionTab).id)
                          : "from-ctp-green to-ctp-teal",
                        styles.activeTabIndicator
                      )}
                    />
                  )}
                </button>
              </GitBlameTooltip>
            );
          })}
        </div>
      </div>

      {/* ── Tab actions menu (far right) ── */}
      <TabActions
        openTabsCount={openTabs.length}
        hasLeft={hasLeft}
        hasRight={hasRight}
        hasProjects={hasProjects}
        activeTabId={activeTabId}
        closeAllTabs={closeAllTabs}
        closeTabsToLeft={closeTabsToLeft}
        closeTabsToRight={closeTabsToRight}
        closeAllProjects={closeAllProjects}
      />
    </div>
  );
};

export default DesktopTabs;
