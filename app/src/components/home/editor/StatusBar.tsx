import React from "react";

const StatusBarComponent: React.FC = () => {
  return (
    <div className="bg-[#181825] border-t border-[#313244] text-[#6c7086] text-xs px-4 py-1 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-1">
          <span className="w-2 h-2 rounded-full bg-[#a6e3a1]"></span>
          <span>main</span>
        </div>
        <span>UTF-8</span>
        <span>TypeScript React</span>
      </div>
      <div className="flex items-center gap-4">
        <span>Spaces: 2</span>
        <span>v1.0.0</span>
      </div>
    </div>
  );
};
const StatusBar = React.memo(StatusBarComponent);
export default StatusBar;
