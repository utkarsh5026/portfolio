import React, { lazy, Suspense, useEffect } from "react";

import CodeEditor from "@/components/home/editor/code-editor";
import useViewModeStore from "@/store/view-mode-store";

const SimpleView = lazy(() => import("@/components/home/simple/simple-view"));

interface MainPortfolioProps {
  /** Rendered from /simple — show the simple view regardless of stored mode. */
  forceSimple?: boolean;
}

/**
 * Full editor experience by default; the simple one-page view when the
 * visitor has asked for it. The choice is persisted, so a recruiter who
 * switches once lands straight in the simple view next time.
 */
const MainPortfolio: React.FC<MainPortfolioProps> = ({
  forceSimple = false,
}) => {
  const mode = useViewModeStore((s) => s.mode);
  const setMode = useViewModeStore((s) => s.setMode);

  useEffect(() => {
    if (forceSimple) setMode("simple");
  }, [forceSimple, setMode]);

  if (forceSimple || mode === "simple") {
    return (
      <Suspense fallback={<div className="min-h-screen bg-ctp-base" />}>
        <SimpleView />
      </Suspense>
    );
  }

  return <CodeEditor />;
};

export default MainPortfolio;
