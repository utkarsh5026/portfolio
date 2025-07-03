import { ThemeProvider } from "./components/base/ThemeProvider";
import PortfolioStory from "./components/load/portfolio-story";

function App() {
  return (
    <ThemeProvider>
      <PortfolioStory />
    </ThemeProvider>
  );
}

export default App;
