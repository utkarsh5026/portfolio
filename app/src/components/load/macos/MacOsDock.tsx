import { cn } from "@/lib/utils";
import React from "react";
import { dockApps } from "./assets";

interface MacOsDockProps {
  activeAppIndex: number;
}

/**
 * MacOsDock is a React component that displays a macOS-style dock with app icons and folders.
 * It allows users to navigate between different apps and folders.
 *
 * @param {MacOsDockProps} props - The component props.
 * @param {number} props.activeAppIndex - The index of the currently active app.
 *
 * @returns {React.ReactElement} The MacOsDock component.
 */
const MacOsDock: React.FC<MacOsDockProps> = ({ activeAppIndex }) => {
  return (
    <div className="dock-container absolute bottom-4 left-1/2 transform -translate-x-1/2 h-16 px-4 py-1 bg-white/10 backdrop-blur-xl rounded-2xl z-50 flex items-center space-x-2 shadow-2xl">
      {/* App Icons */}
      {dockApps.map((app, index) => (
        <div
          key={`dock-${app.name}`}
          className={cn(
            "dock-icon group relative h-12 w-12 flex items-center justify-center bg-white/10 rounded-lg transition-all duration-200",
            activeAppIndex === index ? "bg-white/30" : "hover:bg-white/20",
            activeAppIndex === index && "animate-bounce-subtle"
          )}
        >
          <div className="text-white">{app.icon}</div>
          {activeAppIndex === index && (
            <div className="absolute -bottom-1 w-1 h-1 bg-white rounded-full"></div>
          )}
          <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 px-2 py-1 bg-black/70 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
            {app.name}
          </div>
        </div>
      ))}

      {/* Separator */}
      <div className="h-8 w-px bg-white/20 mx-1"></div>

      {/* Folders/Documents */}
      <div className="dock-icon group relative h-12 w-12 flex items-center justify-center bg-white/10 rounded-lg hover:bg-white/20 transition-all duration-200">
        <svg viewBox="0 0 24 24" width="28" height="28" fill="white">
          <path d="M10 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2h-8l-2-2z" />
        </svg>
        <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 px-2 py-1 bg-black/70 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity">
          Documents
        </div>
      </div>
    </div>
  );
};

export default MacOsDock;
