import React, { useRef, useEffect } from "react";
import { cn } from "@/lib/utils";
import { getIconColor, sectionIconMap, getActiveTabColor } from "./tab-style";
import { motion } from "framer-motion";
import { VscMarkdown, VscClose } from "react-icons/vsc";
import { useEditorContext } from "../context/explorer-context";
import type { Tab, SectionTab } from "../context/explorer-context";

const DesktopTabs: React.FC = () => {
  const { openTabs, activeTabId, openTab, closeTab } = useEditorContext();
  const scrollRef = useRef<HTMLDivElement>(null);

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

  return (
    <div
      ref={scrollRef}
      className="w-full font-source overflow-x-auto [&::-webkit-scrollbar]:h-1 [&::-webkit-scrollbar-thumb]:bg-ctp-surface2/50 [&::-webkit-scrollbar-track]:bg-transparent"
    >
      <div className="flex h-10 w-max min-w-full bg-ctp-mantle items-end">
        {openTabs.map((tab: Tab) => {
          const isActive = activeTabId === tab.id;
          const isSectionTab = tab.type === "section";

          return (
            <button
              key={tab.id}
              onClick={() => openTab(tab)}
              className={cn(
                "relative h-10 px-3 flex-shrink-0 min-w-[140px] max-w-[220px] border-r border-ctp-surface0/50 text-xs transition-colors flex items-center gap-2 group",
                isActive
                  ? "bg-ctp-base text-ctp-text font-medium"
                  : "bg-ctp-mantle text-ctp-subtext0 hover:bg-ctp-surface0 hover:text-ctp-text",
              )}
            >
              {isSectionTab ? (
                <span
                  className={cn(
                    "w-3 h-3 flex-shrink-0",
                    getIconColor((tab as SectionTab).id),
                  )}
                >
                  {sectionIconMap[(tab as SectionTab).id]}
                </span>
              ) : (
                <VscMarkdown className="w-3.5 h-3.5 text-ctp-blue flex-shrink-0" />
              )}

              <span className="text-sm tracking-wide truncate flex-1 text-left  select-none">
                {isSectionTab ? (tab as SectionTab).id : tab.fileName}
              </span>

              {/* Close button */}
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
                    : "opacity-0 group-hover:opacity-70 hover:!opacity-100 hover:bg-ctp-surface1",
                )}
              >
                <VscClose className="w-3 h-3" />
              </span>

              {/* Active indicator */}
              {isActive && (
                <motion.div
                  layoutId="activeTabIndicator"
                  className={cn(
                    "absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r",
                    isSectionTab
                      ? getActiveTabColor((tab as SectionTab).id)
                      : "from-ctp-green to-ctp-teal",
                  )}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.2 }}
                />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default DesktopTabs;
