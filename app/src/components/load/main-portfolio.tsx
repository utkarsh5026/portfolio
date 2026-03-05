import { EditorProvider } from "@/components/home/editor/context/editor-provider";
import CodeEditor from "@/components/home/editor/code-editor";

const MainPortfolio = () => {
  return (
    <EditorProvider>
      <CodeEditor />
    </EditorProvider>
  );
};

export default MainPortfolio;
