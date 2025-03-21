import React from "react";
import { VscChromeClose } from "react-icons/vsc";
import { cn } from "@/lib/utils";
import { browserTabs } from "./tabs";

interface BrowserTabsProps {
  activeTab: number;
  isLoading: boolean;
}

/**
 * BrowserTabs Component
 *
 * This component renders a set of browser tabs similar to Chrome/Edge browser UI.
 * It displays tab titles, icons, loading indicators, and close buttons.
 *
 * @param {BrowserTabsProps} props - The component props
 * @param {number} props.activeTab - Index of the currently active tab
 * @param {boolean} props.isLoading - Whether the active tab is currently loading
 * @returns {React.ReactElement} The rendered browser tabs
 */
const BrowserTabs: React.FC<BrowserTabsProps> = ({ activeTab, isLoading }) => {
  return (
    <div className="h-10 bg-[#292a2d] px-2 flex items-center gap-1 overflow-x-auto scrollbar-hide">
      {browserTabs.map((tab, index) => (
        <div
          id={`tab-${tab.id}`}
          key={tab.id}
          className={cn(
            "flex items-center min-w-[180px] max-w-[240px] h-8 px-3 rounded-t-lg whitespace-nowrap overflow-hidden relative group browser-tab",
            activeTab === index
              ? "bg-[#202124] text-gray-200"
              : "bg-[#323639] text-gray-400 hover:bg-[#3c4043]"
          )}
        >
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-transparent group-hover:bg-gray-600">
            {activeTab === index && <div className="h-full bg-blue-500"></div>}
          </div>

          {activeTab === index && isLoading ? (
            <div className="w-4 h-4 mr-2 flex-shrink-0 animate-spin">
              <svg className="w-full h-full" viewBox="0 0 24 24">
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                  fill="none"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
            </div>
          ) : (
            <div className="w-4 h-4 bg-blue-500 rounded-full mr-2 flex-shrink-0 flex items-center justify-center text-white text-xs">
              {tab.icon}
            </div>
          )}

          <div className="flex-1 text-xs overflow-hidden text-ellipsis whitespace-nowrap">
            {tab.title}
          </div>

          <span className="ml-2 opacity-0 group-hover:opacity-100 hover:bg-gray-600 rounded-full p-0.5 transition-opacity">
            <VscChromeClose size={14} />
          </span>
        </div>
      ))}

      <button className="flex items-center justify-center w-8 h-8 text-gray-400 hover:bg-[#3c4043] rounded-full transition-colors">
        <span className="text-lg">+</span>
      </button>
    </div>
  );
};

export default BrowserTabs;
