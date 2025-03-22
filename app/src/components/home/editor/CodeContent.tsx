import { Suspense, useEffect, useState, useRef } from "react";
import { useEditorContext } from "./context/explorerContext";

interface CodeContentProps {
  sections: Record<string, React.ReactNode>;
}

/**
 * CodeContent component renders the main code editor content area.
 * It displays the active section of code with line numbers and handles loading states.
 *
 * Features:
 * - Dynamic line numbering that adjusts based on content height
 * - Loading animation with progress bar
 * - Suspense fallback for code modules
 * - Automatic resize detection
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
   * Sets up resize and mutation observers to recalculate when content changes.
   *
   * @effect
   * @dependency {string} activeSection - Currently active code section
   * @dependency {boolean} loadingSection - Loading state flag
   * @dependency {Record<string, React.ReactNode>} sections - Available code sections
   */
  useEffect(() => {
    const calculateLineCount = () => {
      if (!loadingSection && contentRef.current) {
        const contentHeight = contentRef.current.scrollHeight;
        const lineHeight = 24; // Assuming each line is 24px (leading-6)
        const calculatedLines = Math.ceil(contentHeight / lineHeight);
        setLineCount(calculatedLines + 5);
      }
    };

    calculateLineCount();

    const resizeObserver = new ResizeObserver(() => {
      calculateLineCount();
    });

    if (contentRef.current) resizeObserver.observe(contentRef.current);

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
    <main className="flex-1 overflow-y-auto relative">
      {loadingSection ? (
        <div className="flex flex-col items-center justify-center h-[70vh]">
          <div className="w-16 h-16 border-t-2 border-b-2 border-ctp-mauve rounded-full animate-spin mb-6"></div>
          <div className="text-ctp-mauve animate-pulse font-mono mb-4">
            {loadingText}
          </div>
          <div className="w-64 h-2 bg-ctp-base rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-ctp-mauve to-ctp-mauve animate-progressBar"></div>
          </div>
        </div>
      ) : (
        <Suspense
          fallback={
            <div className="h-96 bg-ctp-base rounded-lg flex items-center justify-center">
              <div className="text-ctp-text text-lg animate-pulse font-mono">
                Loading module...
              </div>
            </div>
          }
        >
          <div className="animate-fadeIn">
            {/* Line numbers */}
            <div className="absolute left-0 top-0 bottom-0 w-12 border-r border-ctp-surface0 bg-ctp-base/50 flex flex-col items-end px-2 pt-8 text-xs text-ctp-text font-mono">
              {Array.from({ length: lineCount }).map((_, i) => (
                <div key={`line-${i + 1}`} className="leading-6">
                  {i + 1}
                </div>
              ))}
            </div>
            <div ref={contentRef} className="ml-12 pl-4 pt-8">
              {sections[activeSection]}
            </div>
          </div>
        </Suspense>
      )}
    </main>
  );
};

export default CodeContent;
