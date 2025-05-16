import { Suspense, useRef } from "react";
import {
  useEditorContext,
  sections as sectionKeys,
} from "./context/explorerContext";
import { motion, AnimatePresence } from "framer-motion";
import { useSwipeable } from "react-swipeable";

interface CodeContentProps {
  sections: Record<string, React.ReactNode>;
}

const CodeContent: React.FC<CodeContentProps> = ({ sections }) => {
  const { activeSection, loadingSection, loadingText, setActiveSection } =
    useEditorContext();
  const contentRef = useRef<HTMLDivElement>(null);

  const handlers = useSwipeable({
    onSwipedLeft: () => {
      // Go to next section (right)
      const currentIndex = sectionKeys.indexOf(activeSection);
      if (currentIndex < sectionKeys.length - 1) {
        setActiveSection(sectionKeys[currentIndex + 1]);
      }
    },
    onSwipedRight: () => {
      // Go to previous section (left)
      const currentIndex = sectionKeys.indexOf(activeSection);
      if (currentIndex > 0) {
        setActiveSection(sectionKeys[currentIndex - 1]);
      }
    },
    preventScrollOnSwipe: true,
    trackMouse: false,
  });

  return (
    <main className="flex-1 overflow-y-auto bg-ctp-crust" {...handlers}>
      <AnimatePresence mode="wait">
        {loadingSection ? (
          <motion.div
            className="flex flex-col items-center justify-center px-4 h-[60vh] sm:h-[70vh]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            key="loading"
          >
            <div className="w-8 h-8 sm:w-10 sm:h-10 border-2 border-ctp-surface0 border-t-ctp-mauve rounded-full animate-spin mb-4 sm:mb-6" />
            <div className="text-ctp-text font-mono mb-3 sm:mb-4 text-sm sm:text-base text-center">
              {loadingText}
            </div>
            <div className="w-full max-w-xs sm:max-w-md h-1 bg-ctp-surface0 rounded-full overflow-hidden">
              <div className="h-full w-1/2 bg-ctp-mauve rounded-full animate-pulse" />
            </div>
          </motion.div>
        ) : (
          <Suspense
            fallback={
              <div className="h-60 sm:h-96 flex items-center justify-center px-4">
                <div className="text-ctp-text animate-pulse font-mono text-sm sm:text-base">
                  Loading module...
                </div>
              </div>
            }
          >
            <motion.div
              key="content"
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
          </Suspense>
        )}
      </AnimatePresence>
    </main>
  );
};

export default CodeContent;
