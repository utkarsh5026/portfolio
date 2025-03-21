import React from "react";
import { Button } from "@/components/ui/button";
import { SiOpenai } from "react-icons/si";

/**
 * ChatHeader is a React component that displays the header section of a chat interface.
 * It includes the AI assistant's avatar, status, and a settings button.
 *
 * @returns {React.ReactElement} The ChatHeader component.
 */
const ChatHeader = React.memo(() => {
  return (
    <div className="h-14 bg-[#202123] px-4 flex items-center justify-between border-b border-[#343541]">
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-green-500 to-teal-500 flex items-center justify-center text-xl flex-shrink-0 text-white">
          <SiOpenai className="text-white h-8 w-8" />
        </div>
        <div>
          <div className="text-sm font-semibold text-gray-200">
            AI Assistant
          </div>
          <div className="text-xs text-green-400 flex items-center">
            <span className="w-1.5 h-1.5 bg-green-500 rounded-full mr-1.5"></span>{" "}
            Online
          </div>
        </div>
      </div>
      <div className="flex gap-3">
        <Button
          variant="outline"
          size="sm"
          className="h-8 border-gray-700 text-gray-300 hover:bg-gray-800 bg-[#343541]"
        >
          <span className="sr-only">Settings</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="3"></circle>
            <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
          </svg>
        </Button>
      </div>
    </div>
  );
});

export default ChatHeader;
