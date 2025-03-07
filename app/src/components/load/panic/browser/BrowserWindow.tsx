import { Card, CardContent } from "@/components/ui/card";
import { browserTabs } from "./tabs";
import { cn } from "@/lib/utils";
import { useEffect, useState, useCallback, useMemo, useRef } from "react";
import { SiGooglechrome } from "react-icons/si";
import "./BrowserWindow.css";
import Twitter from "./tabs/Twitter";
import MacosTrafficController from "../../macos/MacosTrafficController";
import BrowserActions from "./BrowserActions";
import BrowserTabs from "./BrowserTabs";
import MediumPortfolio from "./tabs/Medium";
import RedditWebDev from "./tabs/Reddit";
import { AwwwardsPortfolios } from "./tabs/AwwardsPortfolios";
import { GitHubPortfolios } from "./tabs/Github";

type BrowserWindowProps = {
  activeWindow: string | null;
  totalTabSwitchDuration: number;
};

const BrowserWindow = ({
  activeWindow,
  totalTabSwitchDuration,
}: BrowserWindowProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [activeTab, setActiveTab] = useState(0);

  const browserRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const currentTab = useMemo(
    () => (activeTab >= 0 ? browserTabs[activeTab].id : null),
    [activeTab]
  );

  const tabSwitchTime = useRef(totalTabSwitchDuration / browserTabs.length);

  const simulateHumanScrolling = useCallback(() => {
    const scrollPauseDuration = tabSwitchTime.current * 0.5;
    const initPause = Math.floor(Math.random() * scrollPauseDuration);
    const contentElement = contentRef.current;
    if (!contentElement) return;

    const scrollHeight = contentElement.scrollHeight;
    const viewportHeight = contentElement.clientHeight;

    if (scrollHeight <= viewportHeight) return;

    let currentPosition = 0;
    const maxPosition = scrollHeight - viewportHeight;

    const performScroll = () => {
      const scrollDirection = Math.random() > 0.5 ? 1 : -1;

      const baseScrollAmount = Math.floor(Math.random() * 300) + 50;
      const scrollAmount = scrollDirection * baseScrollAmount;
      let newPosition = currentPosition + scrollAmount;
      newPosition = Math.max(0, Math.min(maxPosition, newPosition));

      contentElement.scrollTo({
        top: newPosition,
        behavior: "smooth",
      });

      currentPosition = newPosition;

      const pauseDuration = Math.floor(Math.random() * scrollPauseDuration);
      const continueScrolling = Math.random() > 0.2;

      if (continueScrolling) setTimeout(performScroll, pauseDuration);
    };

    setTimeout(performScroll, initPause);
  }, []);

  const goThroughAllTabs = useCallback(() => {
    let tabIndex = -1;
    const switchTab = () => {
      if (tabIndex >= 0 && tabIndex < browserTabs.length) {
        setActiveTab(tabIndex);

        const tabElement = document.getElementById(
          `tab-${browserTabs[tabIndex].id}`
        );
        if (tabElement) {
          tabElement.classList.add("tab-pulse-animation");
          setTimeout(() => {
            tabElement.classList.remove("tab-pulse-animation");
          }, 300);
        }

        // Trigger human-like scrolling after tab switch
        setTimeout(simulateHumanScrolling, 500);
      }

      if (tabIndex < browserTabs.length) {
        tabIndex++;
        setTimeout(switchTab, tabSwitchTime.current);
      }
    };
    switchTab();
  }, [simulateHumanScrolling]);

  useEffect(() => goThroughAllTabs, [goThroughAllTabs]);

  useEffect(() => {
    setIsLoading(true);
    setProgress(0);

    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          setIsLoading(false);
          return 100;
        }
        return prev + Math.floor(Math.random() * 20) + 10;
      });
    }, 100);

    return () => clearInterval(progressInterval);
  }, [activeTab]);

  return (
    <Card
      ref={browserRef}
      className={cn(
        "absolute top-[5%] left-[5%] w-[90%] h-[95%] shadow-2xl transition-all duration-300 z-10 overflow-hidden font-sans browser-appear-animation",
        "bg-[#202124] border-2 border-gray-700 rounded-xl"
      )}
    >
      <MacosTrafficController
        appIcon={<SiGooglechrome className="text-blue-400 w-4 h-4" />}
        appName={activeTab >= 0 ? browserTabs[activeTab].title : "New Tab"}
      />

      <BrowserTabs activeTab={activeTab} isLoading={isLoading} />

      <BrowserActions
        isPageLoading={isLoading}
        activeWindow={activeWindow}
        currentUrl={activeTab >= 0 ? browserTabs[activeTab].url : ""}
        loadProgress={progress}
      />

      {/* Content area */}
      <CardContent className="h-[calc(100%-31px-40px-48px)] p-0 overflow-hidden">
        {/* Browser content with dark theme */}
        <div
          ref={contentRef}
          className="bg-[#121212] text-gray-200 h-full overflow-y-auto scrollbar-thin scrollbar-thumb-[#3c4043] scrollbar-track-transparent"
        >
          {currentTab === "twitter" && <Twitter />}
          {currentTab === "medium-portfolio" && <MediumPortfolio />}
          {currentTab === "github-portfolio" && <GitHubPortfolios />}
          {currentTab === "awwwards-portfolios" && <AwwwardsPortfolios />}
          {currentTab === "reddit-webdev" && <RedditWebDev />}
        </div>
      </CardContent>
    </Card>
  );
};

export default BrowserWindow;
