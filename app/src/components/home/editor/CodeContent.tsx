import { Suspense, useEffect, useState, useRef } from "react";
import { useEditorContext } from "./context/explorerContext";
import { motion, AnimatePresence } from "framer-motion";

interface CodeContentProps {
  sections: Record<string, React.ReactNode>;
}

/**
 * CodeContent component renders the main content area of the editor.
 * This clean, minimal implementation focuses on readability and performance
 * while maintaining a modern aesthetic.
 *
 * @component
 * @param {Object} props - Component props
 * @param {Record<string, React.ReactNode>} props.sections - Object containing all available code sections
 * @returns {JSX.Element} Rendered code content with line numbers and active section
 */
const CodeContent: React.FC<CodeContentProps> = ({ sections }) => {
  const { activeSection, loadingSection, loadingText } = useEditorContext();
  const contentRef = useRef<HTMLDivElement>(null);
  const [lineCount, setLineCount] = useState(50);

  /**
   * Effect hook to calculate and update line count based on content height.
   */
  useEffect(() => {
    const calculateLineCount = () => {
      if (!loadingSection && contentRef.current) {
        const contentHeight = contentRef.current.scrollHeight;
        const lineHeight = 24; // Assuming each line is 24px (leading-6)
        const calculatedLines = Math.ceil(contentHeight / lineHeight);
        setLineCount(calculatedLines + 5); // Add extra lines for padding
      }
    };

    calculateLineCount();

    // Set up resize observer for responsive recalculation
    const resizeObserver = new ResizeObserver(() => {
      calculateLineCount();
    });

    if (contentRef.current) resizeObserver.observe(contentRef.current);

    // Set up mutation observer to detect content changes
    const mutationObserver = new MutationObserver(() => {
      calculateLineCount();
    });

    if (contentRef.current) {
      mutationObserver.observe(contentRef.current, {
        childList: true,
        subtree: true,
        characterData: true,
      });
    }

    return () => {
      resizeObserver.disconnect();
      mutationObserver.disconnect();
    };
  }, [activeSection, loadingSection, sections]);

  return (
    <main className="flex-1 overflow-y-auto bg-ctp-base">
      <AnimatePresence mode="wait">
        {loadingSection ? (
          <motion.div
            className="flex flex-col items-center justify-center h-[70vh]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            key="loading"
          >
            <div className="w-10 h-10 border-2 border-ctp-surface0 border-t-ctp-mauve rounded-full animate-spin mb-6" />
            <div className="text-ctp-text font-mono mb-4">{loadingText}</div>
            <div className="w-64 h-1 bg-ctp-surface0 rounded-full overflow-hidden">
              <div className="h-full w-1/2 bg-ctp-mauve rounded-full animate-pulse" />
            </div>
          </motion.div>
        ) : (
          <Suspense
            fallback={
              <div className="h-96 flex items-center justify-center">
                <div className="text-ctp-text animate-pulse font-mono">
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
              className="min-h-[calc(100vh-10rem)] flex"
            >
              {/* Line numbers */}
              <div className="w-12 shrink-0 border-r border-ctp-surface0 bg-ctp-mantle/50 flex flex-col items-end px-2 pt-8 text-xs text-ctp-overlay1 font-mono select-none">
                {Array.from({ length: lineCount }).map((_, i) => (
                  <div key={`line-${i + 1}`} className="leading-6 h-6">
                    {i + 1}
                  </div>
                ))}
              </div>

              {/* Main content */}
              <div ref={contentRef} className="grow pl-4 pt-8 pr-4">
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
