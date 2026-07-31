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
 * The recruiter view: one measured column, no editor chrome.
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
    <div id="top" className="min-h-screen bg-ctp-base antialiased">
      <SimpleNav />

      <div className="mx-auto max-w-[54rem] px-6 sm:px-8">
        <Hero />

        <main>
          <Experience />
          <Projects />
          <Skills />
          <Education />
          <Writing />
          <Learning />
          <About />
          <Contact />
        </main>

        <footer className="border-t border-ctp-surface0/70 py-10 lg:grid lg:grid-cols-[7rem_1fr] lg:gap-10">
          <div aria-hidden className="hidden lg:block" />
          <button
            type="button"
            onClick={() => switchView("editor")}
            className="font-source text-[12px] text-ctp-overlay0 transition-colors duration-300 hover:text-ctp-mauve"
          >
            There is a fuller, more interactive version of this site →
          </button>
        </footer>
      </div>
    </div>
  );
};

export default SimpleView;
