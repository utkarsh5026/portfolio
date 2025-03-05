import { EditorProvider } from "@/components/home/editor/context/EditorProvider";
import CodeEditor from "@/components/home/editor/CodeEditor";

const MainPortfolio = () => {
  return (
    <EditorProvider>
      <CodeEditor />
    </EditorProvider>
  );
};

export default MainPortfolio;
