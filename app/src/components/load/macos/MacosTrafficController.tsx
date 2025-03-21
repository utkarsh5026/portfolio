import React from "react";
import {
  VscChromeClose,
  VscChromeMinimize,
  VscChromeRestore,
} from "react-icons/vsc";

interface MacosTrafficControllerProps {
  appIcon: React.ReactNode;
  appName: string;
}

/**
 * MacosTrafficController is a React component that mimics the macOS traffic light buttons
 * and displays an app icon and name. It is designed to be user-friendly and visually appealing.
 *
 * @param {MacosTrafficControllerProps} props - The component props.
 * @param {React.ReactNode} props.appIcon - The icon of the app.
 * @param {string} props.appName - The name of the app.
 *
 * @returns {React.ReactElement} The MacosTrafficController component.
 */
const MacosTrafficController: React.FC<MacosTrafficControllerProps> = ({
  appIcon,
  appName,
}) => {
  return (
    <div className="h-11 bg-[#202124] px-3 flex items-center justify-between border-b border-[#3c4043]">
      <div className="flex items-center space-x-2">
        {/* macOS traffic light buttons */}
        <div className="flex space-x-2 mr-4">
          <button
            className="w-3 h-3 rounded-full bg-[#ff6059] hover:bg-[#ff443d] flex items-center justify-center group"
            title="Close"
          >
            <VscChromeClose className="opacity-0 group-hover:opacity-100 text-[8px] text-[#540000]" />
          </button>
          <button
            className="w-3 h-3 rounded-full bg-[#ffbd2e] hover:bg-[#ffb313] flex items-center justify-center group"
            title="Minimize"
          >
            <VscChromeMinimize className="opacity-0 group-hover:opacity-100 text-[8px] text-[#975500]" />
          </button>
          <button
            className="w-3 h-3 rounded-full bg-[#28c941] hover:bg-[#24b539] flex items-center justify-center group"
            title="Fullscreen"
          >
            <VscChromeRestore className="opacity-0 group-hover:opacity-100 text-[8px] text-[#006400]" />
          </button>
        </div>

        <span className="text-gray-300 text-xs mr-4">{appName}</span>
      </div>

      <div className="flex items-center">{appIcon}</div>
    </div>
  );
};

export default MacosTrafficController;
