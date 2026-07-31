import React, { useEffect, useState } from "react";

import { cn } from "@/lib/utils";

import { profile, simpleSections } from "./data";
import useViewSwitch from "./use-view-switch";

/**
 * Slim jump bar. It stays out of the way until you scroll past the header,
 * then holds the section links and the way back to the editor.
 */
const SimpleNav: React.FC = () => {
  const switchView = useViewSwitch();
  const [activeId, setActiveId] = useState<string>("");
  const [scrolled, setScrolled] = useState(false);

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
      { rootMargin: "-15% 0px -75% 0px", threshold: 0 }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 120);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className={cn(
        "sticky top-0 z-40 border-b transition-colors duration-500",
        scrolled
          ? "border-ctp-surface0/70 bg-ctp-base/90 backdrop-blur"
          : "border-transparent bg-transparent"
      )}
    >
      <nav className="mx-auto flex h-12 max-w-[54rem] items-center gap-5 px-6 sm:px-8">
        <a
          href="#top"
          className={cn(
            "shrink-0 font-source text-[12px] text-ctp-subtext1 transition-opacity duration-500",
            scrolled ? "opacity-100" : "pointer-events-none opacity-0"
          )}
        >
          {profile.name}
        </a>

        {/* Below sm there isn't room for these without truncating mid-word,
            and scrolling is the natural motion on a phone anyway. */}
        <ul className="hidden flex-1 items-center gap-4 overflow-x-auto scrollbar-hide sm:flex">
          {simpleSections.map((section) => (
            <li key={section.id}>
              <a
                href={`#${section.id}`}
                className={cn(
                  "block whitespace-nowrap py-1 text-[12px] transition-colors duration-300",
                  activeId === section.id
                    ? "text-ctp-text"
                    : "text-ctp-overlay0 hover:text-ctp-subtext0"
                )}
              >
                {section.label}
              </a>
            </li>
          ))}
        </ul>

        <button
          type="button"
          onClick={() => switchView("editor")}
          className="ml-auto shrink-0 whitespace-nowrap font-source text-[12px] text-ctp-overlay0 transition-colors duration-300 hover:text-ctp-mauve"
        >
          Editor view
        </button>
      </nav>
    </div>
  );
};

export default SimpleNav;
