import CodeEditor from "@/components/home/editor/code-editor";
import { EditorProvider } from "@/components/home/editor/context/editor-provider";

const MainPortfolio = () => {
  return (
    <EditorProvider>
      <CodeEditor />
    </EditorProvider>
  );
};

export default MainPortfolio;
