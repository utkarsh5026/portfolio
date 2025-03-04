import { ThemeProvider } from "./components/base/ThemeProvider";
import CodeEditor from "./components/home/editor/CodeEditor";

function App() {
  return (
    <ThemeProvider defaultTheme="mocha">
      <CodeEditor />
    </ThemeProvider>
  );
}

export default App;
