import { Card, CardContent } from "@/components/ui/card";
import { browserTabs } from "./tabs";
import { cn } from "@/lib/utils";
import { useEffect, useState, useCallback, useMemo, useRef } from "react";
import { SiGooglechrome } from "react-icons/si";
import "./BrowserWindow.css";
import Twitter from "./tabs/Twitter";
import MacosTrafficController from "../../macos/macos-traffic-controller";
import BrowserActions from "./BrowserActions";
import BrowserTabs from "./BrowserTabs";
import MediumPortfolio from "./tabs/Medium";
import RedditWebDev from "./tabs/Reddit";
import { AwwwardsPortfolios } from "./tabs/AwwardsPortfolios";
import { GitHubPortfolios } from "./tabs/Github";

interface BrowserWindowProps {
  activeWindow: string | null;
  totalTabSwitchDuration: number;
}

/**
 * BrowserWindow Component
 *
 * This component simulates a web browser interface with tab switching, loading animations,
 * and human-like scrolling behavior.
 *
 * @param {BrowserWindowProps} props - The component props
 * @param {string | null} props.activeWindow - The currently active window in the application
 * @param {number} props.totalTabSwitchDuration - Total time in milliseconds to cycle through all tabs
 * @returns {React.ReactElement} The rendered browser window component
 */
const BrowserWindow: React.FC<BrowserWindowProps> = ({
  activeWindow,
  totalTabSwitchDuration,
}) => {
  /**
   * State to track if a page is currently loading
   */
  const [isLoading, setIsLoading] = useState(false);

  /**
   * State to track the loading progress (0-100)
   */
  const [progress, setProgress] = useState(0);

  /**
   * State to track the index of the currently active browser tab
   */
  const [activeTab, setActiveTab] = useState(0);

  /**
   * Reference to the main browser window element
   */
  const browserRef = useRef<HTMLDivElement>(null);

  /**
   * Reference to the content area for scrolling operations
   */
  const contentRef = useRef<HTMLDivElement>(null);

  /**
   * Memoized value of the current tab ID based on the active tab index
   */
  const currentTab = useMemo(
    () => (activeTab >= 0 ? browserTabs[activeTab].id : null),
    [activeTab]
  );

  /**
   * Reference to store the time to spend on each tab during auto-cycling
   */
  const tabSwitchTime = useRef(totalTabSwitchDuration / browserTabs.length);

  /**
   * Simulates realistic human-like scrolling behavior with random pauses and scroll amounts
   */
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

  /**
   * Automatically cycles through all browser tabs with visual feedback
   */
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

  /**
   * Start the tab cycling animation when component mounts
   */
  useEffect(() => {
    goThroughAllTabs();
  }, [goThroughAllTabs]);

  /**
   * Simulate page loading progress whenever the active tab changes
   */
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
