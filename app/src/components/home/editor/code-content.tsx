import { lazy, Suspense, useRef } from "react";

import { useSectionNav } from "@/hooks/use-editor-actions";
import useMobile from "@/hooks/use-mobile";
import { useSwipe } from "@/hooks/use-swipe";
import useProjectStore from "@/store/projects/projects-store";

import styles from "./code-content.module.css";
import {
  sections as sectionList,
  SectionType,
  useActiveProjectId,
  useActiveSection,
} from "./context/editor-store";
import { SectionLoadingScreen } from "./section/section-loading";

const ProjectFileFallback: React.FC<{ projectId: string }> = ({
  projectId,
}) => {
  const project = useProjectStore((s) =>
    s.projects.find((p) => p.name === projectId)
  );

  return (
    <div className="flex flex-col items-center justify-center h-full gap-3 text-ctp-subtext0 font-source">
      {project && (
        <>
          <span className="text-3xl leading-none">
            {project.icon ?? project.name.charAt(0).toUpperCase()}
          </span>
          <div className="flex flex-col items-center gap-0.5">
            <span className="text-sm font-medium text-ctp-text">
              {project.name}
            </span>
            {project.tagline && (
              <span className="text-xs text-ctp-subtext1">
                {project.tagline}
              </span>
            )}
          </div>
        </>
      )}
      <div className="flex items-center gap-2 text-xs">
        <span className="flex gap-1">
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className="w-1.5 h-1.5 rounded-full bg-ctp-blue animate-pulse"
              style={{ animationDelay: `${i * 0.2}s` }}
            />
          ))}
        </span>
        Opening {project ? project.name : "file"}…
      </div>
    </div>
  );
};

const ProjectMarkdown = lazy(
  () => import("../portfolio/projects/project-markdown")
);

interface CodeContentProps {
  sections: Record<SectionType, React.LazyExoticComponent<React.ComponentType>>;
}

const CodeContent: React.FC<CodeContentProps> = ({ sections }) => {
  const activeSection = useActiveSection();
  const activeProjectId = useActiveProjectId();
  const { setActiveSection } = useSectionNav();
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
          fallback={<ProjectFileFallback projectId={activeProjectId} />}
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
            {(() => {
              const ActiveSection = sections[activeSection];
              return <ActiveSection />;
            })()}
          </div>
        </div>
      </Suspense>
    </main>
  );
};

export default CodeContent;
