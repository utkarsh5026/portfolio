import { lazy, Suspense, useRef } from "react";

import useMobile from "@/hooks/use-mobile";
import { useSwipe } from "@/hooks/use-swipe";

import styles from "./code-content.module.css";
import {
  sections as sectionList,
  useEditorContext,
} from "./context/explorer-context";
import { SectionLoadingScreen } from "./section/section-loading";

const ProjectMarkdown = lazy(
  () => import("../portfolio/projects/project-markdown")
);

interface CodeContentProps {
  sections: Record<string, React.ReactNode>;
}

const CodeContent: React.FC<CodeContentProps> = ({ sections }) => {
  const { activeSection, activeProjectId, setActiveSection } =
    useEditorContext();
  const contentRef = useRef<HTMLDivElement>(null);
  const { isMobile } = useMobile();

  const currentSectionIndex = sectionList.indexOf(activeSection);
  const sectionSwipeHandlers = useSwipe({
    disabled: !isMobile || activeProjectId !== null,
    onSwipeLeft: () => {
      if (currentSectionIndex < sectionList.length - 1)
        setActiveSection(sectionList[currentSectionIndex + 1]);
    },
    onSwipeRight: () => {
      if (currentSectionIndex > 0)
        setActiveSection(sectionList[currentSectionIndex - 1]);
    },
  });

  // When a project file tab is active, render the project markdown view
  if (activeProjectId !== null) {
    return (
      <main
        className="flex-1 overflow-y-auto bg-ctp-crust"
        data-scroll-container
      >
        <Suspense
          fallback={
            <div className="flex items-center justify-center h-full text-ctp-overlay0 font-source text-sm">
              Opening file…
            </div>
          }
        >
          <div
            key={activeProjectId}
            className={`min-h-[calc(100vh-8rem)] sm:min-h-[calc(100vh-10rem)] ${styles.fadeIn}`}
          >
            <ProjectMarkdown projectId={activeProjectId} />
          </div>
        </Suspense>
      </main>
    );
  }

  return (
    <main className="flex-1 overflow-y-auto bg-ctp-crust">
      <Suspense fallback={<SectionLoadingScreen section={activeSection} />}>
        <div
          key={activeSection}
          className={`min-h-[calc(100vh-8rem)] sm:min-h-[calc(100vh-10rem)] flex ${styles.fadeIn}`}
          {...sectionSwipeHandlers}
        >
          <div
            ref={contentRef}
            className="grow px-3 py-4 md:px-4 md:pt-8 flex flex-col"
          >
            {sections[activeSection]}
          </div>
        </div>
      </Suspense>
    </main>
  );
};

export default CodeContent;
