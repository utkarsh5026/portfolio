import { lazy, Suspense, useRef } from "react";

import styles from "./code-content.module.css";
import { useEditorContext } from "./context/explorer-context";
import { SectionLoadingScreen } from "./section/section-loading";

const ProjectMarkdown = lazy(
  () => import("../portfolio/projects/project-markdown")
);

interface CodeContentProps {
  sections: Record<string, React.ReactNode>;
}

const CodeContent: React.FC<CodeContentProps> = ({ sections }) => {
  const { activeSection, activeProjectId } = useEditorContext();
  const contentRef = useRef<HTMLDivElement>(null);

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
