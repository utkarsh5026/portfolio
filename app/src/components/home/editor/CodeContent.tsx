import { Suspense, useRef, useEffect } from "react";
import {
  useEditorContext,
  sections as sectionKeys,
} from "./context/explorer-context";
import { motion, AnimatePresence } from "framer-motion";
import { useSwipeable } from "react-swipeable";
import useMobile from "@/hooks/use-mobile";
import SwipeTutorialOverlay from "./SwipeTutorialOverlay";
import { useLocalStorage } from "@/hooks/use-local-storage";
import SectionLoadingScreen from "./context/section-loading";

interface CodeContentProps {
  sections: Record<string, React.ReactNode>;
}

const CodeContent: React.FC<CodeContentProps> = ({ sections }) => {
  const { activeSection, setActiveSection } = useEditorContext();
  const contentRef = useRef<HTMLDivElement>(null);
  const { isMobile } = useMobile();
  const {
    storedValue: hasSeenSwipeTutorial,
    setValue: setHasSeenSwipeTutorial,
  } = useLocalStorage("hasSeenSwipeTutorial", false);

  useEffect(() => {
    if (!isMobile) return;
    if (hasSeenSwipeTutorial) return;

    const timer = setTimeout(() => {
      setHasSeenSwipeTutorial(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, [isMobile, hasSeenSwipeTutorial, setHasSeenSwipeTutorial]);

  const dismissTutorial = () => {
    setHasSeenSwipeTutorial(true);
  };

  const handlers = useSwipeable({
    onSwipedLeft: () => {
      const currentIndex = sectionKeys.indexOf(activeSection);
      if (currentIndex < sectionKeys.length - 1) {
        setActiveSection(sectionKeys[currentIndex + 1]);
      }
    },
    onSwipedRight: () => {
      const currentIndex = sectionKeys.indexOf(activeSection);
      if (currentIndex > 0) {
        setActiveSection(sectionKeys[currentIndex - 1]);
      }
    },
    preventScrollOnSwipe: true,
    trackMouse: false,
  });

  return (
    <>
      <main className="flex-1 overflow-y-auto bg-ctp-crust" {...handlers}>
        <Suspense fallback={<SectionLoadingScreen section={activeSection} />}>
          <AnimatePresence mode="wait">
            <motion.div
              key={activeSection}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="min-h-[calc(100vh-8rem)] sm:min-h-[calc(100vh-10rem)] flex"
            >
              <div
                ref={contentRef}
                className="grow px-3 py-4 md:px-4 md:pt-8 flex flex-col"
              >
                {sections[activeSection]}
              </div>
            </motion.div>
          </AnimatePresence>
        </Suspense>
      </main>

      {/* Show tutorial overlay for first-time mobile users */}
      {!hasSeenSwipeTutorial && (
        <SwipeTutorialOverlay
          isOpen={!hasSeenSwipeTutorial}
          onDismiss={dismissTutorial}
        />
      )}
    </>
  );
};

export default CodeContent;
