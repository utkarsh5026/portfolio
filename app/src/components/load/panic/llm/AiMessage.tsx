import React from "react";
import { FaRegThumbsDown, FaRegThumbsUp, FaRegCopy } from "react-icons/fa";
import { RxChatBubble } from "react-icons/rx";
import ReactCodeLine from "@/components/load/utls/ReactCodeLine";

interface AiMessageProps {
  aiResponse: string;
  aiResponseStage: "thinking" | "typing" | "complete";
  showCode: boolean;
  codeLines: string[];
  visibleCodeLines: number;
  codeTyping: boolean;
}

const AiMessage: React.FC<AiMessageProps> = ({
  aiResponse,
  aiResponseStage,
  showCode,
  codeLines,
  visibleCodeLines,
  codeTyping,
}) => {
  return (
    <div className="px-4 py-6 bg-[#444654]">
      <div className="max-w-4xl mx-auto flex gap-4">
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-green-500 to-teal-500 flex items-center justify-center text-white flex-shrink-0">
          <RxChatBubble size={16} />
        </div>
        <div className="flex-1">
          {aiResponseStage === "thinking" ? (
            <div className="typing-indicator">
              <span></span>
              <span></span>
              <span></span>
            </div>
          ) : (
            <div className="text-gray-200 text-base leading-relaxed">
              <p>
                {aiResponse}
                {aiResponseStage === "typing" && (
                  <span className="typing-cursor">|</span>
                )}
              </p>

              {showCode && (
                <div className="relative mt-4 group">
                  <div className="bg-[#1e1e2e] rounded-md overflow-hidden border border-gray-700">
                    <div className="flex items-center justify-between px-4 py-2 bg-[#2d2d3a] text-xs text-gray-200">
                      <span>JavaScript</span>
                      <span className="hover:bg-gray-700 p-1 rounded cursor-pointer">
                        <FaRegCopy size={14} />
                      </span>
                    </div>
                    <pre className="!bg-[#1e1e2e] !m-0 !p-4 overflow-x-auto text-sm">
                      <div className="font-mono">
                        {codeLines
                          .slice(0, visibleCodeLines)
                          .map((line, index) => (
                            <div
                              key={index}
                              className="leading-6 code-line-appear"
                              style={{ animationDelay: `${index * 25}ms` }}
                            >
                              <ReactCodeLine line={line} />
                              {codeTyping && index === visibleCodeLines - 1 && (
                                <span className="typing-cursor">|</span>
                              )}
                            </div>
                          ))}
                      </div>
                    </pre>
                  </div>
                </div>
              )}

              {!codeTyping && showCode && (
                <div className="flex items-center gap-3 mt-4 text-gray-400 response-controls-appear">
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
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AiMessage;
