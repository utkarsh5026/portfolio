import { Route,Routes } from "react-router-dom";

import { ThemeProvider } from "./components/base/ThemeProvider";
import MainPortfolio from "./components/load/main-portfolio";
import NotFound from "./components/load/not-found";

function App() {
  // This message will only appear in development (removed by terser in production)
  console.log("Please Hire Me 🥺");

  return (
    <ThemeProvider>
      <Routes>
        {/* Valid portfolio routes */}
        <Route path="/" element={<MainPortfolio />} />
        <Route path="/home" element={<MainPortfolio />} />
        <Route path="/about" element={<MainPortfolio />} />
        <Route path="/skills" element={<MainPortfolio />} />
        <Route path="/projects" element={<MainPortfolio />} />
        <Route path="/experience" element={<MainPortfolio />} />
        <Route path="/contact" element={<MainPortfolio />} />
        <Route path="/learning" element={<MainPortfolio />} />
        <Route path="/articles" element={<MainPortfolio />} />

        {/* Catch-all route for 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </ThemeProvider>
  );
}

export default App;
