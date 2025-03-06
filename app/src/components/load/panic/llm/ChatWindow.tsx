import React, {
  useState,
  useEffect,
  useRef,
  useMemo,
  useCallback,
} from "react";
import { Card } from "@/components/ui/card";
import { AiFillOpenAI } from "react-icons/ai";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { FiSend } from "react-icons/fi";
import MacosTrafficController from "../../macos/MacosTrafficController";
import { SiOpenai } from "react-icons/si";
import { humanMessage, aiNormalResponse, aiCodeResponse } from "./content";
import UserMessage from "./UserMessage";
import AiMessage from "./AiMessage";

import "./ChatWindowAnimations.css";

type AiResponseStage = "thinking" | "typing" | "complete" | "waiting";
type UserInputStage = "typing" | "sent" | "waiting";

interface ChatWindowProps {
  totalAnimationTimeMS: number;
}

const ChatWindow: React.FC<ChatWindowProps> = ({ totalAnimationTimeMS }) => {
  const chatWindowRef = useRef<HTMLDivElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const [userInputStage, setUserInputStage] =
    useState<UserInputStage>("waiting");
  const [userInput, setUserInput] = useState("");

  const [aiResponseStage, setAiResponseStage] =
    useState<AiResponseStage>("waiting");
  const [aiResponse, setAiResponse] = useState("");

  const [showCode, setShowCode] = useState(false);
  const [codeTyping, setCodeTyping] = useState(false);
  const [codeLines, setCodeLines] = useState<string[]>([]);
  const [visibleCodeLines, setVisibleCodeLines] = useState<number>(0);

  const timings = useMemo(
    () => calculateTimings(totalAnimationTimeMS),
    [totalAnimationTimeMS]
  );

  const startCodeTypingAnimation = useCallback(() => {
    const lines = aiCodeResponse.split("\n");
    setCodeLines(lines);
    setCodeTyping(true);

    let currentLine = 0;
    const codeInterval = setInterval(() => {
      if (currentLine < lines.length) {
        setVisibleCodeLines(currentLine + 1);
        currentLine++;
      } else {
        clearInterval(codeInterval);
        setCodeTyping(false);
      }
    }, timings.codeTypingSpeed);
  }, [timings.codeTypingSpeed]);

  const startAiResponseAnimation = useCallback(() => {
    setAiResponseStage("thinking");

    const startTyping = () => {
      setAiResponseStage("typing");
      let currentIndex = 0;

      const typingInterval = setInterval(() => {
        if (currentIndex < aiNormalResponse.length) {
          setAiResponse(aiNormalResponse.slice(0, currentIndex + 1));
          currentIndex++;
          return;
        }

        clearInterval(typingInterval);
        setAiResponseStage("complete");
        setShowCode(true);
        startCodeTypingAnimation();
      }, timings.aiTypingSpeed);
    };

    setTimeout(startTyping, timings.aiThinkingTime);
  }, [timings.aiTypingSpeed, timings.aiThinkingTime, startCodeTypingAnimation]);

  const startUserTypingAnimation = useCallback(() => {
    setUserInputStage("typing");
    let currentIndex = 0;

    const typingInterval = setInterval(() => {
      if (currentIndex < humanMessage.length) {
        setUserInput(humanMessage.slice(0, currentIndex + 1));
        currentIndex++;
        return;
      }
      clearInterval(typingInterval);
      setUserInputStage("sent");
      startAiResponseAnimation();
    }, timings.userTypingSpeed);
  }, [timings.userTypingSpeed, startAiResponseAnimation]);

  useEffect(() => {
    chatWindowRef.current?.classList.add("llm-animate-card-appear");
    setTimeout(() => {
      startUserTypingAnimation();
    }, timings.windowAppearanceTime);
  }, [timings.windowAppearanceTime, startUserTypingAnimation]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ block: "end" });
  }, [userInput, aiResponse, visibleCodeLines]);

  return (
    <Card
      ref={chatWindowRef}
      className={cn(
        "chat-window absolute w-[70%] h-[80%] shadow-xl transition-all duration-300 z-10 overflow-hidden font-serif text-sm top-[15%] left-[5%] rounded-lg"
      )}
      style={{
        backgroundColor: "#202123", // Dark background
        borderColor: "#343541", // Dark border
      }}
    >
      <MacosTrafficController
        appIcon={<AiFillOpenAI className="text-green-500 h-6 w-6" />}
        appName="ChatGPT"
      />{" "}
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

        <div className="chat-messages flex-grow p-0 overflow-y-auto space-y-0 h-[calc(100%-24px)]">
          {userInputStage !== "waiting" && (
            <UserMessage
              userInput={userInput}
              isTyping={userInputStage === "typing"}
            />
          )}
          {aiResponseStage !== "waiting" && (
            <AiMessage
              aiResponse={aiResponse}
              aiResponseStage={aiResponseStage}
              showCode={showCode}
              codeLines={codeLines}
              visibleCodeLines={visibleCodeLines}
              codeTyping={codeTyping}
            />
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>
      {/* Input area */}
      <div className="chat-input h-16 px-4 border-t border-[#444654] flex items-center gap-3 bg-[#343541]">
        <div className="flex-grow relative">
          <div className="absolute inset-0 flex items-center pointer-events-none opacity-60">
            <input
              type="text"
              placeholder={
                userInputStage === "sent"
                  ? "Send a message..."
                  : "Thanks for the code! Let me implement..."
              }
              disabled
              className="w-full bg-transparent border-none outline-none text-gray-300 placeholder-gray-500 text-sm pl-4"
            />
          </div>
        </div>
        <Button
          className={`chat-button send-button h-10 w-10 p-0 flex items-center justify-center rounded-full bg-gradient-to-r from-green-500 to-teal-500 text-white hover:opacity-90 ${
            userInputStage === "sent" ? "" : "opacity-50"
          }`}
        >
          <FiSend size={18} />
        </Button>
      </div>
    </Card>
  );
};

const calculateTimings = (totalAnimationTimeMS: number) => {
  const userMessageLength = humanMessage.length;
  const aiResponseLength = aiNormalResponse.length;
  const codeLinesCount = aiCodeResponse.split("\n").length;

  const windowAppearanceTime = totalAnimationTimeMS * 0.05;
  const userTypingTime = totalAnimationTimeMS * 0.25;
  const aiThinkingTime = totalAnimationTimeMS * 0.1;
  const aiTypingTime = totalAnimationTimeMS * 0.3;
  const codeTypingTime = totalAnimationTimeMS * 0.3;

  // Calculate speeds
  const userTypingSpeed = userTypingTime / userMessageLength;
  const aiTypingSpeed = aiTypingTime / aiResponseLength;
  const codeTypingSpeed = codeTypingTime / codeLinesCount;

  return {
    windowAppearanceTime,
    userTypingSpeed,
    aiThinkingTime,
    aiTypingSpeed,
    codeTypingSpeed,
  };
};

export default ChatWindow;
