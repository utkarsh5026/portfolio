import React from "react";

/**
 * StatusBarComponent component renders the status bar at the bottom of the editor.
 * It displays information about the current file, encoding, and language.
 *
 * @component
 * @returns {JSX.Element} The rendered StatusBarComponent component.
 */
const StatusBarComponent: React.FC = () => {
  return (
    <div className="bg-ctp-base border-t border-ctp-surface0 text-ctp-text text-xs px-4 py-1 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-1">
          <span className="w-2 h-2 rounded-full bg-ctp-green"></span>
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
