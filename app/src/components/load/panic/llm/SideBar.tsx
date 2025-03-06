import React, { useState } from "react";
import {
  FiChevronRight,
  FiChevronLeft,
  FiPlus,
  FiEdit,
  FiTrash2,
} from "react-icons/fi";
import { BsChatLeftDots, BsChatLeft } from "react-icons/bs";
import { IoMdPerson } from "react-icons/io";
import { cn } from "@/lib/utils";
import { conversationHistory } from "./content";

const SideBar: React.FC = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  return (
    <div>
      <div
        className={cn(
          "bg-[#202123] transition-all duration-300 border-r border-[#343541] flex flex-col",
          sidebarCollapsed ? "w-0 overflow-hidden" : "w-64"
        )}
      >
        {/* New Chat Button */}
        <div className="p-3">
          <span className="w-full flex items-center gap-2 bg-[#343541] hover:bg-[#40414f] border border-gray-700 text-white">
            <FiPlus size={16} />
            <span>New chat</span>
          </span>
        </div>

        {/* Conversation History */}
        <div className="flex-1 overflow-y-auto px-2 py-3">
          <div className="text-xs text-gray-500 font-medium px-3 py-2 uppercase">
            Recent Conversations
          </div>
          <div className="space-y-1">
            {conversationHistory.map((conversation) => (
              <div
                key={conversation.id}
                className={cn(
                  "flex items-center gap-2 p-2 rounded-md cursor-pointer hover:bg-[#2e2e38] group",
                  conversation.isActive ? "bg-[#343541]" : "bg-transparent"
                )}
              >
                <div className="text-gray-400">
                  {conversation.isActive ? (
                    <BsChatLeftDots size={16} />
                  ) : (
                    <BsChatLeft size={16} />
                  )}
                </div>
                <div className="flex-1 truncate">
                  <div className="text-sm text-gray-300 truncate">
                    {conversation.title}
                  </div>
                  <div className="text-xs text-gray-500">
                    {conversation.date}
                  </div>
                </div>
                <div className="flex opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="p-1 text-gray-500 hover:text-gray-300">
                    <FiEdit size={14} />
                  </span>
                  <span className="p-1 text-gray-500 hover:text-gray-300">
                    <FiTrash2 size={14} />
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* User Profile */}
        <div className="border-t border-[#343541] p-3">
          <div className="flex items-center gap-2 rounded-md p-2 hover:bg-[#2e2e38] cursor-pointer">
            <div className="w-8 h-8 bg-gradient-to-tr from-purple-500 to-blue-600 rounded-full flex items-center justify-center text-white">
              <IoMdPerson />
            </div>
            <div className="flex-1">
              <div className="text-sm text-gray-300">Utkarsh Priyadarshi</div>
              <div className="text-xs text-gray-500">Free Plan</div>
            </div>
          </div>
        </div>
      </div>

      {/* Toggle Sidebar Button */}
      <button
        onClick={toggleSidebar}
        className={cn(
          "absolute left-0 top-1/2 transform -translate-y-1/2 z-20 bg-[#343541] text-gray-400 hover:text-white p-1 rounded-r-md border-y border-r border-[#444654]",
          sidebarCollapsed ? "left-0" : "left-64"
        )}
      >
        {sidebarCollapsed ? (
          <FiChevronRight size={16} />
        ) : (
          <FiChevronLeft size={16} />
        )}
      </button>
    </div>
  );
};

export default SideBar;
