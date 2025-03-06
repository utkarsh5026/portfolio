import { ThemeProvider } from "./components/base/ThemeProvider";
import PortfolioStory from "./components/load/PortfolioStory";

function App() {
  return (
    <ThemeProvider>
      <PortfolioStory />
    </ThemeProvider>
  );
}

export default App;
