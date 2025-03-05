import { Card, CardContent } from "@/components/ui/card";
import { browserTabs } from "../content";
import { cn } from "@/lib/utils";
import { useEffect, useState, useCallback, useMemo, useRef } from "react";
import { FiDownload } from "react-icons/fi";
import { SiGooglechrome } from "react-icons/si";
import "./BrowserWindow.css";
import Twitter from "./Twitter";
import MacosTrafficController from "../../macos/MacosTrafficController";
import BrowserActions from "./BrowserActions";
import BrowserTabs from "./BrowserTabs";

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
  const [activeTab, setActiveTab] = useState(-1);
  const browserRef = useRef<HTMLDivElement>(null);

  const tabSwitchTime = useMemo(
    () => totalTabSwitchDuration / (browserTabs.length + 1),
    [totalTabSwitchDuration]
  );

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
      }

      if (tabIndex < browserTabs.length) {
        tabIndex++;
        setTimeout(switchTab, tabSwitchTime);
      }
    };
    switchTab();
  }, [tabSwitchTime]);

  useEffect(() => {
    if (activeWindow === "browser") goThroughAllTabs();
  }, [activeWindow, goThroughAllTabs]);

  useEffect(() => {
    if (activeWindow === "browser" && activeTab >= 0) {
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
    }
  }, [activeTab, activeWindow]);

  useEffect(() => {
    if (browserRef.current) {
      browserRef.current.classList.add("browser-appear-animation");
      browserRef.current.style.animationDuration = `${totalTabSwitchDuration}ms`;
    }
  }, [totalTabSwitchDuration]);

  return (
    <Card
      ref={browserRef}
      className={cn(
        "absolute top-[5%] left-[5%] w-[90%] h-[95%] shadow-2xl transition-all duration-300 z-10 overflow-hidden font-sans",
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
        <div className="bg-[#121212] text-gray-200 h-full overflow-y-auto scrollbar-thin scrollbar-thumb-[#3c4043] scrollbar-track-transparent">
          {activeTab == -1 && <Twitter />}
          {activeTab >= 0 && (
            <div className="w-full max-w-5xl mx-auto px-6 py-8">
              {/* Article header */}
              <div className="mb-8">
                <h1 className="text-3xl font-bold mb-3 text-white">
                  {browserTabs[activeTab].content.heading}
                </h1>
                <div className="flex items-center text-sm text-gray-400 mb-6">
                  <span className="px-3 py-1 rounded-full bg-[#2d2e32] text-blue-400 mr-4 text-xs">
                    {activeTab === 0
                      ? "TUTORIAL"
                      : activeTab === 1
                      ? "SHOWCASE"
                      : "OPTIMIZATION"}
                  </span>
                  <span>6 min read</span>
                  <span className="mx-2">•</span>
                  <span>Updated 2 days ago</span>
                </div>
                <div className="h-1 w-full bg-[#2d2e32] rounded-full overflow-hidden">
                  <div className="h-full w-1/3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
                </div>
              </div>

              {/* Main content with improved typography and spacing */}
              <div className="leading-relaxed space-y-6">
                <p className="text-gray-300">
                  {browserTabs[activeTab].content.text}
                </p>

                {/* Code sample with syntax highlighting */}
                {browserTabs[activeTab].content.code && (
                  <div className="mt-6 mb-8 rounded-lg overflow-hidden">
                    <div className="bg-[#1e1e2e] flex items-center justify-between px-4 py-2 text-xs border-b border-[#313244]">
                      <div className="text-gray-400">JavaScript</div>
                      <div className="flex gap-3">
                        <span className="text-gray-400 hover:text-white">
                          <FiDownload size={14} />
                        </span>
                        <span className="text-gray-400 hover:text-white">
                          <svg
                            width="14"
                            height="14"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M20 2H10C8.897 2 8 2.897 8 4V16C8 17.103 8.897 18 10 18H20C21.103 18 22 17.103 22 16V4C22 2.897 21.103 2 20 2ZM10 16V4H20L20.002 16H10Z"
                              fill="currentColor"
                            />
                            <path
                              d="M4 8H2V20C2 21.103 2.897 22 4 22H16V20H4V8Z"
                              fill="currentColor"
                            />
                          </svg>
                        </span>
                      </div>
                    </div>
                    <div className="bg-[#1e1e2e] p-5 font-mono text-sm text-gray-300 overflow-x-auto">
                      <pre
                        className="whitespace-pre-wrap"
                        style={{
                          color: "#abb2bf",
                          textShadow: "0 1px 1px rgba(0,0,0,0.3)",
                        }}
                      >
                        {browserTabs[activeTab].content.code
                          .replace(
                            /(const|let|var|function|return|import|from|=>)/g,
                            (match) =>
                              `<span style="color: #c678dd;">${match}</span>`
                          )
                          .replace(
                            /(["'`].*?["'`])/g,
                            (match) =>
                              `<span style="color: #98c379;">${match}</span>`
                          )
                          .replace(
                            /(\{|\}|\(|\)|\[|\]|,|;)/g,
                            (match) =>
                              `<span style="color: #abb2bf;">${match}</span>`
                          )
                          .replace(
                            /(\btrue\b|\bfalse\b|\bnull\b|\bundefined\b|\bNaN\b|\bInfinity\b)/g,
                            (match) =>
                              `<span style="color: #d19a66;">${match}</span>`
                          )}
                      </pre>
                    </div>
                  </div>
                )}

                {/* Examples with improved styling */}
                {browserTabs[activeTab].content.examples && (
                  <div className="mt-8 mb-8">
                    <h3 className="text-xl font-semibold mb-4 text-white flex items-center">
                      <span className="w-6 h-6 rounded-full bg-blue-500 text-white flex items-center justify-center mr-2 text-xs">
                        <svg
                          width="12"
                          height="12"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M20.2955 8.54248L8.80504 19.9366C8.08238 20.6574 6.92822 20.6548 6.2089 19.9311L3.70647 17.4175C2.98863 16.6963 2.99149 15.5368 3.71276 14.8191C4.435 14.1001 5.59681 14.1026 6.31705 14.8247L7.51386 16.0274L17.6944 5.86386C18.4161 5.14385 19.5769 5.14633 20.2955 5.86912C21.0174 6.59451 21.0174 7.81729 20.2955 8.54248Z"
                            fill="currentColor"
                          />
                        </svg>
                      </span>
                      Stand-out Features
                    </h3>
                    <div className="bg-[#1a1a1a] rounded-lg p-5">
                      <ul className="space-y-3">
                        {browserTabs[activeTab].content.examples.map(
                          (example, i) => (
                            <li key={i} className="flex items-start">
                              <div className="w-5 h-5 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center mt-0.5 mr-3 text-xs">
                                {i + 1}
                              </div>
                              <span className="text-gray-300">{example}</span>
                            </li>
                          )
                        )}
                      </ul>
                    </div>
                  </div>
                )}

                {/* Notes section with better styling */}
                <div className="mt-8 bg-[#332700] border-l-4 border-[#e9b949] p-5 rounded-r-lg">
                  <div className="flex items-center text-[#e9b949] mb-2">
                    <svg
                      className="w-5 h-5 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <div className="font-semibold">Personal Notes</div>
                  </div>
                  <div className="text-[#e9d18c] italic">
                    {browserTabs[activeTab].content.note}
                  </div>
                </div>

                {/* Read more section */}
                <div className="mt-10 pt-6 border-t border-[#3c4043]">
                  <h4 className="text-gray-200 font-medium mb-4">
                    Related Articles
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[
                      "Advanced Animation Techniques",
                      "Building Interactive Portfolio Pages",
                    ].map((title, i) => (
                      <div
                        key={i}
                        className="bg-[#1a1a1a] p-4 rounded-lg hover:bg-[#252525] transition-colors cursor-pointer"
                      >
                        <span className="text-blue-400 text-sm">{title}</span>
                        <div className="flex items-center mt-2 text-xs text-gray-400">
                          <span>
                            {Math.floor(Math.random() * 10) + 2} min read
                          </span>
                          <span className="mx-2">•</span>
                          <span>
                            {Math.floor(Math.random() * 7) + 1} days ago
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default BrowserWindow;
