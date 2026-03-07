import { RefObject, useEffect, useState } from "react";

interface UseInViewOptions {
  once?: boolean;
  margin?: string;
  threshold?: number | number[];
}

export function useInView(
  ref: RefObject<Element | null>,
  options: UseInViewOptions = {}
): boolean {
  const { once = false, margin = "0px", threshold = 0 } = options;
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    if (!ref.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);

        // If once is true and it's in view, disconnect the observer
        if (once && entry.isIntersecting) {
          observer.disconnect();
        }
      },
      {
        rootMargin: margin,
        threshold,
      }
    );

    const currentRef = ref.current;
    observer.observe(currentRef);

    return () => {
      observer.unobserve(currentRef);
      observer.disconnect();
    };
  }, [ref, once, margin, threshold]);

  return isInView;
}
