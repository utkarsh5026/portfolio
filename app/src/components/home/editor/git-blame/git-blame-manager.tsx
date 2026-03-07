import React, { useCallback, useEffect, useRef, useState } from "react";

import useGitMetaStore, {
  type AuthorMeta,
  type ComponentMeta,
} from "@/store/git-store/git-meta-store";
import useSettingsStore from "@/store/settings-store";

import GitBlamePortalTooltip from "./git-blame-portal-tooltip";

const SHOW_DELAY_MS = 450;

interface TooltipState {
  visible: boolean;
  x: number;
  y: number;
  meta: ComponentMeta | null;
  authorMeta: AuthorMeta | null;
}

/**
 * Mounted once at the editor root. Listens for mouseover events and walks
 * the DOM to find the nearest element with [data-git-section] or
 * [data-git-component], then shows a portal tooltip with git blame info.
 *
 * - [data-git-section="about"]     → looks up by section id
 * - [data-git-component="SkillCard"] → looks up by component name
 */
const GitBlameManager: React.FC = () => {
  const getBySection = useGitMetaStore((s) => s.getBySection);
  const getByComponent = useGitMetaStore((s) => s.getByComponent);
  const getAuthor = useGitMetaStore((s) => s.getAuthor);
  const fetchGitMeta = useGitMetaStore((s) => s.fetchGitMeta);

  useEffect(() => {
    fetchGitMeta();
  }, [fetchGitMeta]);
  const gitBlameEnabled = useSettingsStore((s) => s.gitBlameEnabled);
  const [tooltip, setTooltip] = useState<TooltipState>({
    visible: false,
    x: 0,
    y: 0,
    meta: null,
    authorMeta: null,
  });

  const showTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const currentTarget = useRef<Element | null>(null);
  const mousePos = useRef({ x: 0, y: 0 });

  const clearTimer = useCallback(() => {
    if (showTimer.current) {
      clearTimeout(showTimer.current);
      showTimer.current = null;
    }
  }, []);

  const hide = useCallback(() => {
    clearTimer();
    currentTarget.current = null;
    setTooltip((prev) => ({ ...prev, visible: false }));
  }, [clearTimer]);

  const resolveMeta = useCallback(
    (el: Element): ComponentMeta | null => {
      const component = el
        .closest("[data-git-component]")
        ?.getAttribute("data-git-component");
      if (component) return getByComponent(component);

      const section = el
        .closest("[data-git-section]")
        ?.getAttribute("data-git-section");
      if (section) return getBySection(section);

      return null;
    },
    [getBySection, getByComponent]
  );

  useEffect(() => {
    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as Element | null;
      if (!target) return;

      const annotated = target.closest(
        "[data-git-section], [data-git-component]"
      );

      if (!annotated) {
        hide();
        return;
      }

      // Same target — just update mouse position, don't restart timer
      if (annotated === currentTarget.current) {
        mousePos.current = { x: e.clientX, y: e.clientY };
        setTooltip((prev) =>
          prev.visible ? { ...prev, x: e.clientX, y: e.clientY } : prev
        );
        return;
      }

      hide();
      currentTarget.current = annotated;
      mousePos.current = { x: e.clientX, y: e.clientY };

      showTimer.current = setTimeout(() => {
        const meta = resolveMeta(annotated);
        if (!meta) return;
        setTooltip({
          visible: true,
          x: mousePos.current.x,
          y: mousePos.current.y,
          meta,
          authorMeta: getAuthor(meta.author),
        });
      }, SHOW_DELAY_MS);
    };

    const onMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
      if (tooltip.visible) {
        setTooltip((prev) => ({ ...prev, x: e.clientX, y: e.clientY }));
      }
    };

    const onScroll = () => hide();

    document.addEventListener("mouseover", onMouseOver);
    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("scroll", onScroll, true);

    return () => {
      document.removeEventListener("mouseover", onMouseOver);
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("scroll", onScroll, true);
      clearTimer();
    };
  }, [hide, resolveMeta, tooltip.visible, clearTimer, getAuthor]);

  if (!gitBlameEnabled) return null;

  return (
    <GitBlamePortalTooltip
      meta={tooltip.meta}
      authorMeta={tooltip.authorMeta}
      x={tooltip.x}
      y={tooltip.y}
      visible={tooltip.visible}
    />
  );
};

export default GitBlameManager;
