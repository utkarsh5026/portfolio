import { useEffect, useRef } from "react";

/**
 * Returns a ref to attach to a component's root element.
 * Stamps `data-git-component="<name>"` on mount so the GitBlameManager
 * can discover it on hover and show per-component git blame info.
 *
 * Usage:
 *   const ref = useGitComponent(SkillCard);
 *   return <div ref={ref}>...</div>;
 */
export function useGitComponent<
  T extends HTMLElement = HTMLDivElement,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  C extends React.ComponentType<any> | string = any,
>(component: C) {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    if (ref.current) {
      let componentName = "UnknownComponent";

      if (typeof component === "string") {
        componentName = component;
      } else if (component) {
        const comp = component as unknown as Record<string, unknown>;
        const compType = comp.type as Record<string, unknown> | undefined;

        componentName =
          (comp.displayName as string) ||
          (comp.name as string) ||
          (compType?.displayName as string) ||
          (compType?.name as string) ||
          "UnknownComponent";
      }

      ref.current.setAttribute("data-git-component", componentName);
    }
  }, [component]);

  return ref;
}
