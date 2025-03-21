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
import { humanMessage, aiNormalResponse, aiCodeResponse } from "./content";
import UserMessage from "./message/UserMessage";
import AiMessage from "./message/AiMessage";
import SideBar from "./SideBar";
import "./ChatWindowAnimations.css";
import ChatHeader from "./ChatHeader";

type AiResponseStage = "thinking" | "typing" | "complete" | "waiting";
type UserInputStage = "typing" | "sent" | "waiting";

interface ChatWindowProps {
  totalAnimationTimeMS: number;
}

/**
 * ChatWindow is a React component that simulates a chat interface with an AI assistant.
 * It animates the appearance of user messages, AI responses, and code snippets.
 *
 * @param {ChatWindowProps} props - The component props
 * @param {number} props.totalAnimationTimeMS - The total time in milliseconds for all animations to complete
 * @returns {React.ReactElement} The ChatWindow component
 */
const ChatWindow: React.FC<ChatWindowProps> = ({ totalAnimationTimeMS }) => {
  /**
   * Reference to the main chat window element
   */
  const chatWindowRef = useRef<HTMLDivElement>(null);

  /**
   * Reference to the end of messages for auto-scrolling
   */
  const messagesEndRef = useRef<HTMLDivElement>(null);

  /**
   * Reference to the chat messages container for scrolling
   */
  const chatMessagesRef = useRef<HTMLDivElement>(null);

  /**
   * State to track the current stage of user input (waiting, typing, or sent)
   */
  const [userInputStage, setUserInputStage] =
    useState<UserInputStage>("waiting");

  /**
   * State to store the current user input text
   */
  const [userInput, setUserInput] = useState("");

  /**
   * State to track the current stage of AI response (waiting, thinking, typing, or complete)
   */
  const [aiResponseStage, setAiResponseStage] =
    useState<AiResponseStage>("waiting");

  /**
   * State to store the current AI response text
   */
  const [aiResponse, setAiResponse] = useState("");

  /**
   * State to control whether to show code snippet
   */
  const [showCode, setShowCode] = useState(false);

  /**
   * State to track if code is currently being typed
   */
  const [codeTyping, setCodeTyping] = useState(false);

  /**
   * State to store all lines of code to be displayed
   */
  const [codeLines, setCodeLines] = useState<string[]>([]);

  /**
   * State to control how many lines of code are currently visible
   */
  const [visibleCodeLines, setVisibleCodeLines] = useState<number>(0);

  /**
   * Memoized timing calculations based on total animation time
   */
  const timings = useMemo(
    () => calculateTimings(totalAnimationTimeMS),
    [totalAnimationTimeMS]
  );

  /**
   * Starts the animation for typing out code line by line
   */
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

  /**
   * Starts the animation sequence for the AI response,
   * including thinking, typing text, and showing code
   */
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
  }, [timings.aiThinkingTime, timings.aiTypingSpeed, startCodeTypingAnimation]);

  /**
   * Starts the animation for typing out the user's message
   * and triggers the AI response animation when complete
   */
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

  /**
   * Effect to start the animation sequence when the component mounts
   */
  useEffect(() => {
    chatWindowRef.current?.classList.add("llm-animate-card-appear");
    setTimeout(() => {
      startUserTypingAnimation();
    }, timings.windowAppearanceTime);
  }, [timings.windowAppearanceTime, startUserTypingAnimation]);

  /**
   * Effect to auto-scroll to the bottom of the chat when new content appears
   */
  useEffect(() => {
    if (chatMessagesRef.current && messagesEndRef.current) {
      chatMessagesRef.current.scrollTop = chatMessagesRef.current.scrollHeight;
    }
  }, [userInput, aiResponse, visibleCodeLines]);

  return (
    <Card
      ref={chatWindowRef}
      className={cn(
        "chat-window absolute w-[80%] h-[80%] shadow-xl transition-all duration-300 z-10 overflow-hidden font-sans text-sm top-[15%] left-[5%] rounded-lg flex flex-col"
      )}
      style={{
        backgroundColor: "#202123",
        borderColor: "#343541",
      }}
    >
      <MacosTrafficController
        appIcon={<AiFillOpenAI className="text-green-500 h-6 w-6" />}
        appName="ChatGPT 🙂"
      />

      <div className="flex flex-1 overflow-hidden">
        <SideBar />

        <div className="flex-1 flex flex-col bg-[#343541] relative">
          <ChatHeader />

          <div className="flex flex-col flex-1 overflow-hidden bg-[#343541]">
            <div className="py-4 px-6 text-center border-b border-[#444654]">
              <h3 className="text-lg font-medium text-gray-200">
                Welcome to the AI Assistant
              </h3>
              <p className="text-sm text-gray-400 mt-1">
                Ask anything about building your portfolio
              </p>
            </div>

            <div
              ref={chatMessagesRef}
              className="chat-messages flex-grow p-0 overflow-y-auto space-y-0 h-full"
            >
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

          <div className="px-4 py-3 border-t border-[#444654] bg-[#343541]">
            <div className="max-w-3xl mx-auto">
              <div className="relative">
                <textarea
                  placeholder={
                    userInputStage === "sent"
                      ? "Send a message..."
                      : "Thanks for the code! Let me implement..."
                  }
                  disabled
                  className="w-full bg-[#40414f] border border-[#565869] rounded-xl py-3 pl-4 pr-12 text-gray-200 placeholder-gray-500 text-sm min-h-[48px] resize-none focus:outline-none focus:ring-1 focus:ring-blue-500"
                  rows={1}
                ></textarea>
                <Button
                  className={`absolute right-2 bottom-1.5 chat-button send-button h-8 w-8 p-0 flex items-center justify-center rounded-md bg-transparent text-gray-400 hover:text-gray-200 ${
                    userInputStage === "sent" ? "" : "opacity-50"
                  }`}
                >
                  <FiSend size={16} />
                </Button>
              </div>
              <div className="text-xs text-center text-gray-500 mt-2">
                <span>ChatGPT can make mistakes. </span>
                <span className="hover:underline cursor-pointer">
                  Consider checking important information.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

/**
 * Calculates timing values for various animations based on the total animation duration
 *
 * @param {number} totalAnimationTimeMS - The total time in milliseconds for all animations
 * @returns {Object} An object containing calculated timing values for different animation stages
 */
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
