import React from "react";

interface DesktopIconProps {
  icon: React.ReactNode;
  label: string;
}
/**
 * DesktopIcon is a React component that represents an icon on the desktop.
 * It displays an icon and a label underneath it, styled to fit a macOS-like interface.
 *
 * @param {DesktopIconProps} props - The component props.
 * @param {React.ReactNode} props.icon - The icon to be displayed.
 * @param {string} props.label - The label for the icon, which describes the application or file.
 *
 * @returns {React.ReactElement} The DesktopIcon component.
 */
const DesktopIcon: React.FC<DesktopIconProps> = ({ icon, label }) => {
  return (
    <div className="group flex flex-col items-center w-16">
      <div className="w-14 h-14 mb-1 flex items-center justify-center">
        {icon}
      </div>
      <div className="text-white text-xs px-1 py-0.5 rounded text-center group-hover:bg-white/20 max-w-full truncate">
        {label}
      </div>
    </div>
  );
};

export default DesktopIcon;
