import { Code2 } from "lucide-react";
import React, { useEffect, useState } from "react";

import { cn } from "@/lib/utils";

import { profile, simpleSections } from "./data";
import useViewSwitch from "./use-view-switch";

/**
 * Sticky top bar: jump links with a scroll spy, plus the escape hatch back to
 * the full editor experience.
 */
const SimpleNav: React.FC = () => {
  const switchView = useViewSwitch();
  const [activeId, setActiveId] = useState<string>("");
  const [scrolled, setScrolled] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const sections = Array.from(
      document.querySelectorAll<HTMLElement>("[data-simple-section]")
    );

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);

        if (visible.length > 0) {
          setActiveId(
            visible[0].target.getAttribute("data-simple-section") ?? ""
          );
        }
      },
      { rootMargin: "-20% 0px -70% 0px", threshold: 0 }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const onScroll = () => {
      const scrollable = document.body.scrollHeight - window.innerHeight;
      setScrolled(window.scrollY > 24);
      setProgress(scrollable > 0 ? (window.scrollY / scrollable) * 100 : 0);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className={cn(
        "sticky top-0 z-40 transition-colors duration-300",
        scrolled
          ? "bg-ctp-base/85 backdrop-blur-md border-b border-ctp-surface0"
          : "bg-transparent border-b border-transparent"
      )}
    >
      {/* Reading progress */}
      <div
        className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-ctp-mauve via-ctp-blue to-ctp-teal origin-left transition-transform duration-150"
        style={{ transform: `scaleX(${progress / 100})` }}
        aria-hidden
      />

      <nav className="mx-auto flex h-14 max-w-4xl items-center gap-4 px-5 sm:px-8">
        <a
          href="#top"
          className={cn(
            "shrink-0 font-source text-sm font-semibold text-ctp-text transition-opacity duration-300",
            scrolled ? "opacity-100" : "opacity-0 pointer-events-none"
          )}
        >
          {profile.name.split(" ")[0]}
        </a>

        <div className="flex-1 overflow-x-auto scrollbar-hide">
          <ul className="flex items-center gap-1">
            {simpleSections.map((section) => (
              <li key={section.id}>
                <a
                  href={`#${section.id}`}
                  className={cn(
                    "block whitespace-nowrap rounded-md px-2.5 py-1.5 text-xs font-medium transition-colors duration-300",
                    activeId === section.id
                      ? "bg-ctp-surface0 text-ctp-text"
                      : "text-ctp-overlay1 hover:text-ctp-text"
                  )}
                >
                  {section.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <button
          type="button"
          onClick={() => switchView("editor")}
          className="shrink-0 inline-flex items-center gap-2 rounded-lg border border-ctp-surface1 px-3 py-1.5 text-xs font-medium text-ctp-subtext0 transition-colors duration-300 hover:border-ctp-mauve/50 hover:text-ctp-text"
        >
          <Code2 className="h-3.5 w-3.5 text-ctp-mauve" />
          <span className="hidden sm:inline">Full experience</span>
        </button>
      </nav>
    </div>
  );
};

export default SimpleNav;
