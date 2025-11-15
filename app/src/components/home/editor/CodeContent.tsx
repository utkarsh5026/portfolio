import { Suspense, useRef } from "react";
import { useEditorContext } from "./context/explorer-context";
import { motion, AnimatePresence } from "framer-motion";
import SectionLoadingScreen from "./context/section-loading";

interface CodeContentProps {
  sections: Record<string, React.ReactNode>;
}

const CodeContent: React.FC<CodeContentProps> = ({ sections }) => {
  const { activeSection } = useEditorContext();
  const contentRef = useRef<HTMLDivElement>(null);

  return (
    <main className="flex-1 overflow-y-auto bg-ctp-crust">
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
  );
};

export default CodeContent;
