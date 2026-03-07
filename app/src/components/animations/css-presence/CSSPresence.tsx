import "./presets.css";

import React, {
  cloneElement,
  useCallback,
  useLayoutEffect,
  useRef,
  useState,
} from "react";

type SlotState = "entering" | "idle" | "exiting";

interface Slot {
  key: string;
  element: React.ReactElement;
  state: SlotState;
}

export interface CSSPresenceProps {
  /**
   * A single React element with a `key` prop. When the key changes,
   * the old element plays its exit animation before being removed,
   * and the new element plays its enter animation on mount.
   */
  children: React.ReactElement | null;
  /** CSS class(es) applied while the element is entering. */
  enterClassName?: string;
  /** CSS class(es) applied while the element is exiting. */
  exitClassName?: string;
  /**
   * "sync"  — enter and exit animations run simultaneously (default).
   * "wait"  — new child only enters after the old child has fully exited.
   */
  mode?: "sync" | "wait";
  /** Wrapper element tag. Defaults to a transparent React Fragment wrapper div. */
  as?: keyof React.JSX.IntrinsicElements;
  className?: string;
}

/**
 * CSSPresence — a CSS-only alternative to Framer Motion's AnimatePresence.
 *
 * Wrap a single keyed child. When the key changes:
 *   • The outgoing child receives `exitClassName` and stays in the DOM until
 *     its CSS animation/transition ends (detected via animationend / transitionend).
 *   • The incoming child receives `enterClassName` on mount.
 *
 * Your CSS animations/transitions do all the visual work — this component
 * only manages the lifecycle.
 */
export function CSSPresence({
  children,
  enterClassName,
  exitClassName,
  mode = "sync",
  as: Tag = "div",
  className,
}: CSSPresenceProps) {
  const [slots, setSlots] = useState<Slot[]>(() => {
    if (!children) return [];
    const key = String(children.key ?? "__default__");
    return [{ key, element: children, state: "idle" }];
  });

  const pendingEnter = useRef<React.ReactElement | null>(null);

  const hasExiting = useCallback(
    (currentSlots: Slot[]) => currentSlots.some((s) => s.state === "exiting"),
    []
  );

  const flushPendingEnter = useCallback((currentSlots: Slot[]) => {
    const next = pendingEnter.current;
    if (!next) return currentSlots;
    pendingEnter.current = null;
    const key = String(next.key ?? "__default__");
    return [
      ...currentSlots,
      { key, element: next, state: "entering" as SlotState },
    ];
  }, []);

  useLayoutEffect(() => {
    if (!children) {
      setSlots((prev) =>
        prev.map((s) =>
          s.state !== "exiting" ? { ...s, state: "exiting" } : s
        )
      );
      return;
    }

    const newKey = String(children.key ?? "__default__");

    setSlots((prev) => {
      const existingKeys = new Set(prev.map((s) => s.key));

      // Key unchanged — just update the element in-place.
      if (prev.length === 1 && prev[0].key === newKey) {
        return [{ ...prev[0], element: children }];
      }

      const updated: Slot[] = prev.map((s) =>
        s.key !== newKey && s.state !== "exiting"
          ? { ...s, state: "exiting" }
          : s
      );

      if (mode === "wait" && hasExiting(updated)) {
        pendingEnter.current = children;
        return updated;
      }

      if (!existingKeys.has(newKey)) {
        updated.push({
          key: newKey,
          element: children,
          state: enterClassName ? "entering" : "idle",
        });
      }

      return updated;
    });
  }, [children, enterClassName, hasExiting, mode]);

  const handleAnimationEnd = useCallback(
    (
      key: string,
      state: SlotState,
      e: React.AnimationEvent | React.TransitionEvent
    ) => {
      if (e.target !== e.currentTarget) return;

      setSlots((prev) => {
        let next = prev;

        if (state === "exiting") {
          next = prev.filter((s) => s.key !== key);

          if (mode === "wait" && !hasExiting(next)) {
            next = flushPendingEnter(next);
          }
        } else if (state === "entering") {
          next = prev.map((s) => (s.key === key ? { ...s, state: "idle" } : s));
        }

        return next;
      });
    },
    [mode, hasExiting, flushPendingEnter]
  );

  return (
    <Tag className={className}>
      {slots.map(({ key, element, state }) => {
        const extraClass =
          state === "entering"
            ? enterClassName
            : state === "exiting"
              ? exitClassName
              : undefined;

        const originalClassName: string =
          ((element.props as Record<string, unknown>).className as string) ??
          "";

        const merged = [originalClassName, extraClass]
          .filter(Boolean)
          .join(" ");

        return cloneElement(element, {
          key,
          className: merged || undefined,
          onAnimationEnd: (e: React.AnimationEvent) =>
            handleAnimationEnd(key, state, e),
          onTransitionEnd: (e: React.TransitionEvent) =>
            handleAnimationEnd(key, state, e),
        } as Partial<typeof element.props>);
      })}
    </Tag>
  );
}

export default CSSPresence;
