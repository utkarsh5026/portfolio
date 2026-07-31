import { Code2 } from "lucide-react";
import React, { useEffect } from "react";

import About from "./sections/about";
import Contact from "./sections/contact";
import Education from "./sections/education";
import Experience from "./sections/experience";
import Hero from "./sections/hero";
import Learning from "./sections/learning";
import Projects from "./sections/projects";
import Skills from "./sections/skills";
import Writing from "./sections/writing";
import SimpleNav from "./simple-nav";
import useViewSwitch from "./use-view-switch";

/**
 * The recruiter view: everything on one scrollable page, no editor chrome.
 *
 * Same content as the full experience, ordered for skimming — who I am, what
 * I've shipped, what I know, how to reach me.
 */
const SimpleView: React.FC = () => {
  const switchView = useViewSwitch();

  useEffect(() => {
    const root = document.documentElement;
    const previous = root.style.scrollBehavior;
    root.style.scrollBehavior = "smooth";
    window.scrollTo(0, 0);
    return () => {
      root.style.scrollBehavior = previous;
    };
  }, []);

  return (
    <div
      id="top"
      className="min-h-screen bg-ctp-base text-ctp-text antialiased"
    >
      <SimpleNav />

      <main className="mx-auto max-w-4xl px-5 sm:px-8">
        <Hero />

        <div className="divide-y divide-ctp-surface0">
          <Experience />
          <Projects />
          <Skills />
          <Education />
          <Writing />
          <Learning />
          <About />
          <Contact />
        </div>
      </main>

      <footer className="border-t border-ctp-surface0">
        <div className="mx-auto flex max-w-4xl flex-col items-center justify-between gap-4 px-5 py-8 sm:flex-row sm:px-8">
          <p className="font-source text-xs text-ctp-overlay0">
            Built with React, TypeScript & Tailwind.
          </p>
          <button
            type="button"
            onClick={() => switchView("editor")}
            className="inline-flex items-center gap-2 text-xs font-medium text-ctp-subtext0 transition-colors duration-300 hover:text-ctp-text"
          >
            <Code2 className="h-3.5 w-3.5 text-ctp-mauve" />
            Prefer the full interactive version?
          </button>
        </div>
      </footer>
    </div>
  );
};

export default SimpleView;
