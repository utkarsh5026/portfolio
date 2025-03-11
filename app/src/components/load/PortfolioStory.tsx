import "./style.css";
import React, { useEffect, useState } from "react";
import Realization from "./realization/Realization";
import Panic from "./panic/main/Panic";
import CodeCompilation from "./compilation/CodeCompilation";
import MainPortfolio from "./MainPortfolio";
import PrankPortfolio from "./simple-portfolio/PrankPortfolio";
import FakePortfolioLoading from "./bridge/FakePortfolioLoading";
import CompilationLoading from "./bridge/CompilationLoading";

type PortfolioStage =
  | "realization"
  | "panic"
  | "chaos-loading"
  | "compilation"
  | "chaos"
  | "compilation-loading"
  | "portfolio";

const PortfolioStory: React.FC = () => {
  const [currentStage, setCurrentStage] =
    useState<PortfolioStage>("realization");
  const [showSkipButton, setShowSkipButton] = useState(false);

  useEffect(() => {
    const hasSeenIntro = localStorage.getItem("hasSeenPortfolioIntro");
    if (hasSeenIntro === "true") {
      setShowSkipButton(true);
    }
  }, []);

  const handleRealizationComplete = () => setCurrentStage("panic");

  const handlePanicComplete = () => {
    setCurrentStage("chaos-loading");
  };

  const handleCompilationLoadingComplete = () => {
    setCurrentStage("compilation");
  };

  const handleCompilationComplete = () => {
    setCurrentStage("portfolio");
    localStorage.setItem("hasSeenPortfolioIntro", "true");
  };

  const handleChaosLoadingComplete = () => {
    setCurrentStage("chaos");
  };

  const handleChaosComplete = () => {
    setCurrentStage("compilation-loading");
  };

  return (
    <div className="portfolio-story-container scene-transition-container">
      {currentStage === "realization" && (
        <Realization onComplete={handleRealizationComplete} />
      )}

      {currentStage === "panic" && <Panic onComplete={handlePanicComplete} />}

      {currentStage === "chaos" && (
        <PrankPortfolio onComplete={handleChaosComplete} />
      )}

      {currentStage === "compilation-loading" && (
        <CompilationLoading onComplete={handleCompilationLoadingComplete} />
      )}

      {currentStage === "compilation" && (
        <CodeCompilation onLoadComplete={handleCompilationComplete} />
      )}

      {currentStage === "chaos-loading" && (
        <FakePortfolioLoading
          onComplete={handleChaosLoadingComplete}
          duration={2000}
        />
      )}

      {currentStage === "portfolio" && <MainPortfolio />}

      {showSkipButton && currentStage !== "portfolio" && (
        <button
          className="skip-intro-button"
          onClick={handleCompilationComplete}
        >
          Skip Intro
        </button>
      )}
    </div>
  );
};

export default PortfolioStory;
