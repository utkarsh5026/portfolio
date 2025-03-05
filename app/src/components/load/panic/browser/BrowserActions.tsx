import React from "react";
import { cn } from "@/lib/utils";
import { FiMoreVertical, FiStar } from "react-icons/fi";
import { VscRefresh, VscChevronRight, VscChevronLeft } from "react-icons/vsc";

interface BrowserActionsProps {
  isPageLoading: boolean;
  activeWindow: string | null;
  currentUrl: string;
  loadProgress: number;
}

const BrowserActions: React.FC<BrowserActionsProps> = ({
  isPageLoading,
  activeWindow,
  currentUrl,
  loadProgress,
}) => {
  return (
    <div className="h-12 bg-[#202124] px-2 flex items-center gap-1 border-b border-[#3c4043]">
      <div className="flex space-x-1">
        <button
          className="w-9 h-9 flex items-center justify-center rounded-full text-gray-400 hover:bg-[#3c4043] transition-colors"
          title="Back"
        >
          <VscChevronLeft size={20} />
        </button>
        <button
          className="w-9 h-9 flex items-center justify-center rounded-full text-gray-400 hover:bg-[#3c4043] transition-colors"
          title="Forward"
        >
          <VscChevronRight size={20} />
        </button>
        <button
          className="w-9 h-9 flex items-center justify-center rounded-full text-gray-400 hover:bg-[#3c4043] transition-colors"
          title="Refresh"
        >
          <VscRefresh
            size={18}
            className={isPageLoading ? "animate-spin" : ""}
          />
        </button>
      </div>

      {/* Address bar - more rounded for macOS */}
      <div className="flex-grow mx-2 relative">
        <div
          className={cn(
            "h-9 bg-[#2b2c30] border border-transparent hover:border-[#3c4043] focus-within:border-[#3c4043] rounded-lg overflow-hidden px-4 flex items-center group transition-all",
            activeWindow === "browser" && "focus-within:bg-[#202124]"
          )}
          style={{
            borderRadius: "9px", // More rounded for macOS style
          }}
        >
          <div className="flex-grow flex items-center text-xs">
            {formatUrl(currentUrl)}
          </div>
          <div className="flex space-x-2 text-gray-400">
            <span className="opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:bg-[#3c4043] rounded-full">
              <FiStar size={14} />
            </span>
          </div>
        </div>

        {/* Loading progress bar */}
        {isPageLoading && (
          <div
            className="absolute bottom-0 left-0 h-0.5 bg-blue-500 transition-all duration-150"
            style={{ width: `${loadProgress}%` }}
          ></div>
        )}
      </div>
      <div className="flex space-x-1">
        <button className="w-9 h-9 flex items-center justify-center rounded-full text-gray-400 hover:bg-[#3c4043] transition-colors relative">
          <span className="w-4 h-4 text-center grid place-items-center text-[10px] absolute top-1 right-1 bg-gray-600 rounded-full">
            3
          </span>
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M12 8V16"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M8 12H16"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
        <span
          className="w-9 h-9 flex items-center justify-center rounded-full text-gray-400 hover:bg-[#3c4043] transition-colors"
          title="More"
        >
          <FiMoreVertical size={18} />
        </span>
        <div className="w-9 h-9 rounded-full overflow-hidden bg-blue-600 text-white grid place-items-center text-sm font-medium">
          U
        </div>
      </div>
    </div>
  );
};

const formatUrl = (url: string) => {
  // Extract domain from URL
  const domainMatch = /^(?:https?:\/\/)?([^/]+)/i.exec(url);
  if (!domainMatch) return url;

  const domain = domainMatch[1];
  const remaining = url.substring(domainMatch[0].length);

  return (
    <div className="flex items-center">
      {/* HTTPS lock icon */}
      <svg
        className="w-3 h-3 mr-1 text-green-500"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
        />
      </svg>

      {/* Domain in darker text */}
      <span className="text-white font-medium">{domain}</span>

      {/* Rest of URL in lighter text */}
      <span className="text-gray-400">{remaining}</span>
    </div>
  );
};

export default BrowserActions;
