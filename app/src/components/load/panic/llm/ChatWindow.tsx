import React, { useEffect, useRef } from "react";
import { Card } from "@/components/ui/card";
import { AiFillOpenAI } from "react-icons/ai";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { FiSend, FiUser } from "react-icons/fi";
import { RxChatBubble } from "react-icons/rx";
import { FaRegThumbsUp, FaRegThumbsDown, FaRegCopy } from "react-icons/fa";
import { useWindowContext } from "../context/windowcontext";
import MacosTrafficController from "../../macos/MacosTrafficController";
import { SiOpenai } from "react-icons/si";
import ReactCodeLine from "@/components/load/utls/ReactCodeLine";

import "./ChatWindowAnimations.css";

interface ChatWindowProps {
  panicPhase: string;
}

const ChatWindow: React.FC<ChatWindowProps> = ({ panicPhase }) => {
  const { activeWindow } = useWindowContext();
  const chatWindowRef = useRef<HTMLDivElement>(null);

  const exampleCode = `useEffect(() => {
  const animate = () => {
    anime({
      targets: '.section-animate',
      opacity: [0, 1],
      translateY: [50, 0],
      duration: 800,
      easing: 'easeOutExpo',
      delay: anime.stagger(150)
    });
  };
  
  animate();
}, []);`;

  const codeLines = exampleCode.split("\n");

  useEffect(() => {
    chatWindowRef.current?.classList.add("llm-animate-card-appear");
  }, []);

  return (
    <Card
      ref={chatWindowRef}
      className={cn(
        "chat-window absolute w-[70%] h-[80%] z-10 shadow-xl transition-all duration-300  overflow-hidden font-serif text-sm top-[30%] left-[5%] rounded-lg",
        panicPhase === "assistance" && "opacity-100"
      )}
      style={{
        transform:
          activeWindow === "chat" ? "translateZ(0px)" : "translateZ(-50px)",
        backgroundColor: "#202123", // Dark background
        borderColor: "#343541", // Dark border
      }}
    >
      <MacosTrafficController
        appIcon={<AiFillOpenAI className="text-green-500 h-6 w-6" />}
        appName="ChatGPT"
      />
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
              <span className="w-1.5 h-1.5 bg-green-500 rounded-full mr-1.5"></span>
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
            New Chat
          </Button>
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

      {/* Chat messages area */}
      <div className="flex flex-col h-[calc(100%-56px-64px)] bg-[#343541]">
        {/* Welcome message at the top */}
        <div className="py-4 px-6 text-center border-b border-[#444654]">
          <h3 className="text-lg font-medium text-gray-200">
            Welcome to the AI Assistant
          </h3>
          <p className="text-sm text-gray-400 mt-1">
            Ask anything about building your portfolio
          </p>
        </div>

        <div
          className="chat-messages flex-grow p-0 overflow-y-auto space-y-0"
          style={{ height: "calc(100% - 74px)" }}
        >
          <div
            id="message-0"
            className="px-4 py-6 bg-[#343541] border-b border-[#444654] llm-animate-fade-in-up"
          >
            <div className="max-w-4xl mx-auto flex gap-4">
              <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center text-gray-300 flex-shrink-0">
                <FiUser size={16} />
              </div>
              <div className="text-gray-200 text-base leading-relaxed">
                Help! I need to add animations to my portfolio ASAP. A visitor
                is looking at it right now! Can you give me some code for smooth
                section entrance animations using AnimeJS?
              </div>
            </div>
          </div>

          <div
            id="message-1"
            className="px-4 py-6 bg-[#444654] llm-animate-fade-in-up-delayed"
          >
            <div className="max-w-4xl mx-auto flex gap-4">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-green-500 to-teal-500 flex items-center justify-center text-white flex-shrink-0">
                <RxChatBubble size={16} />
              </div>
              <div className="flex-1">
                <div className="text-gray-200 text-base leading-relaxed">
                  <p className="mb-4">
                    I'll help you implement smooth section entrance animations
                    with AnimeJS. Here's some code you can use immediately:
                  </p>
                  <div className="relative mb-4 group">
                    <div className="bg-[#1e1e2e] rounded-md overflow-hidden border border-gray-700">
                      <div className="flex items-center justify-between px-4 py-2 bg-[#2d2d3a] text-xs text-gray-200">
                        <span>JavaScript</span>
                        <span className="hover:bg-gray-700 p-1 rounded">
                          <FaRegCopy size={14} />
                        </span>
                      </div>
                      <pre className="!bg-[#1e1e2e] !m-0 !p-4 overflow-x-auto text-sm">
                        {/* Replace Prism with our custom ReactCodeLine component */}
                        <div className="font-mono">
                          {codeLines.map((line, index) => (
                            <div key={index} className="leading-6">
                              <ReactCodeLine line={line} />
                            </div>
                          ))}
                        </div>
                      </pre>
                    </div>
                    <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  </div>
                </div>

                <div className="flex items-center gap-3 mt-4 text-gray-400">
                  <button className="hover:bg-gray-600 p-1.5 rounded-md flex items-center text-xs gap-1.5">
                    <FaRegThumbsUp size={14} />
                    <span>Helpful</span>
                  </button>
                  <button className="hover:bg-gray-600 p-1.5 rounded-md flex items-center text-xs gap-1.5">
                    <FaRegThumbsDown size={14} />
                    <span>Not helpful</span>
                  </button>
                  <button className="hover:bg-gray-600 p-1.5 rounded-md flex items-center text-xs gap-1.5">
                    <FaRegCopy size={14} />
                    <span>Copy</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Input area */}
      <div className="chat-input h-16 px-4 border-t border-[#444654] flex items-center gap-3 bg-[#343541]">
        <div className="flex-grow relative">
          <div className="absolute inset-0 flex items-center pointer-events-none opacity-60">
            <input
              type="text"
              placeholder="Thanks for the code! Let me implement..."
              disabled
              className="w-full bg-transparent border-none outline-none text-gray-300 placeholder-gray-500 text-sm pl-4"
            />
          </div>
        </div>
        <Button className="chat-button send-button h-10 w-10 p-0 flex items-center justify-center rounded-full bg-gradient-to-r from-green-500 to-teal-500 text-white hover:opacity-90">
          <FiSend size={18} />
        </Button>
      </div>
    </Card>
  );
};

export default ChatWindow;
