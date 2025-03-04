import { ThemeProvider } from "./components/base/ThemeProvider";
import CodeEditor from "./components/home/editor/CodeEditor";
import { EditorProvider } from "./components/home/editor/context/EditorProvider";

function App() {
  return (
    <ThemeProvider>
      <EditorProvider>
        <CodeEditor />
      </EditorProvider>
    </ThemeProvider>
  );
}

export default App;
