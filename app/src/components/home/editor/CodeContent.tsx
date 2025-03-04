import { Suspense } from "react";
import { useEditorContext } from "./context/explorerContext";
interface CodeContentProps {
  sections: Record<string, React.ReactNode>;
}

const CodeContent: React.FC<CodeContentProps> = ({ sections }) => {
  const { activeSection, loadingSection, loadingText } = useEditorContext();
  return (
    <main className="flex-1 overflow-y-auto  relative">
      {loadingSection ? (
        <div className="flex flex-col items-center justify-center h-[70vh]">
          <div className="w-16 h-16 border-t-2 border-b-2 border-[#89b4fa] rounded-full animate-spin mb-6"></div>
          <div className="text-[#cdd6f4] animate-pulse font-mono mb-4">
            {loadingText}
          </div>
          <div className="w-64 h-2 bg-[#313244] rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-[#89b4fa] to-[#cba6f7] animate-progressBar"></div>
          </div>
        </div>
      ) : (
        <Suspense
          fallback={
            <div className="h-96 bg-[#1e1e2e] rounded-lg flex items-center justify-center">
              <div className="text-[#cdd6f4] text-lg animate-pulse font-mono">
                Loading module...
              </div>
            </div>
          }
        >
          <div className="animate-fadeIn">
            {/* Line numbers */}
            <div className="absolute left-0 top-0 bottom-0 w-12 border-r border-[#313244] bg-[#181825]/50 flex flex-col items-end px-2 pt-8 text-xs text-[#6c7086] font-mono">
              {Array.from({ length: 50 }).map((_, i) => (
                <div key={i} className="leading-6">
                  {i + 1}
                </div>
              ))}
            </div>
            <div className="ml-12 pl-4 pt-8">{sections[activeSection]}</div>
          </div>
        </Suspense>
      )}
    </main>
  );
};

export default CodeContent;
