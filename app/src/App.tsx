import { Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./components/base/ThemeProvider";
import PortfolioStory from "./components/load/portfolio-story";
import NotFound from "./components/load/not-found";

function App() {
  // This message will only appear in development (removed by terser in production)
  console.log("Please Hire Me 🥺");

  return (
    <ThemeProvider>
      <Routes>
        {/* Valid portfolio routes */}
        <Route path="/" element={<PortfolioStory />} />
        <Route path="/home" element={<PortfolioStory />} />
        <Route path="/about" element={<PortfolioStory />} />
        <Route path="/skills" element={<PortfolioStory />} />
        <Route path="/projects" element={<PortfolioStory />} />
        <Route path="/experience" element={<PortfolioStory />} />
        <Route path="/contact" element={<PortfolioStory />} />
        <Route path="/learning" element={<PortfolioStory />} />
        <Route path="/articles" element={<PortfolioStory />} />

        {/* Catch-all route for 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </ThemeProvider>
  );
}

export default App;
