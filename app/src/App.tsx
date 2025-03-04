import { useState } from "react";
import { ThemeProvider } from "./components/base/ThemeProvider";
import CodeEditor from "./components/home/editor/CodeEditor";
import { EditorProvider } from "./components/home/editor/context/EditorProvider";
import CodeCompilation from "./components/compilation/CodeCompilation";

function App() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <ThemeProvider>
      {isLoading ? (
        <CodeCompilation onLoadComplete={() => setIsLoading(false)} />
      ) : (
        <EditorProvider>
          <CodeEditor />
        </EditorProvider>
      )}
    </ThemeProvider>
  );
}

export default App;
