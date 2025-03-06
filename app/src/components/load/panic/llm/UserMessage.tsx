import React from "react";
import { FiUser } from "react-icons/fi";

interface UserMessageProps {
  userInput: string;
  isTyping: boolean;
}

const UserMessage: React.FC<UserMessageProps> = ({ userInput, isTyping }) => {
  return (
    <div className="px-4 py-6 bg-[#343541] border-b border-[#444654]">
      <div className="max-w-4xl mx-auto flex gap-4">
        <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center text-gray-300 flex-shrink-0">
          <FiUser size={16} />
        </div>
        <div className="text-gray-200 text-base leading-relaxed">
          {userInput}
          {isTyping && <span className="typing-cursor">|</span>}
        </div>
      </div>
    </div>
  );
};

export default UserMessage;
