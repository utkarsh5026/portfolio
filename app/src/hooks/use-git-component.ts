import { useEffect, useRef } from "react";

/**
 * Returns a ref to attach to a component's root element.
 * Stamps `data-git-component="<name>"` on mount so the GitBlameManager
 * can discover it on hover and show per-component git blame info.
 *
 * Usage:
 *   const ref = useGitComponent("SkillCard");
 *   return <div ref={ref}>...</div>;
 */
export function useGitComponent<T extends HTMLElement = HTMLDivElement>(
  componentName: string
) {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    if (ref.current) {
      ref.current.setAttribute("data-git-component", componentName);
    }
  }, [componentName]);

  return ref;
}
