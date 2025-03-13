import GhostButton from "@/components/utils/GhostButton";
import { Maximize2, Minimize2, TerminalIcon, Trash2, X } from "lucide-react";
import React from "react";

interface TerminalHeaderProps {
  clearOutput: () => void;
  toggleMaximize: () => void;
  isMaximized: boolean;
  setTerminalOpen: (open: boolean) => void;
}

const TerminalHeader: React.FC<TerminalHeaderProps> = ({
  clearOutput,
  toggleMaximize,
  isMaximized,
  setTerminalOpen,
}) => {
  return (
    <div
      className="flex items-center justify-between px-6 py-3 bg-gradient-to-r from-ctp-mantle to-ctp-crust border-b border-ctp-surface0"
      style={{
        backdropFilter: "blur(15px)",
        boxShadow: "0 1px 8px rgba(0, 0, 0, 0.1)",
      }}
    >
      <div className="flex items-center bg-ctp-surface0/30 px-4 py-1 rounded-full shadow-inner">
        <TerminalIcon size={14} className="text-ctp-sapphire mr-2" />
        <span className="text-ctp-sapphire font-semibold">utkarsh</span>
        <span className="text-ctp-subtext0 mx-1">@</span>
        <span className="text-ctp-green font-semibold">portfolio</span>
        <span className="text-ctp-subtext0 mr-1">:</span>
        <span className="text-ctp-mauve">~</span>
      </div>

      <div className="flex items-center space-x-3">
        <GhostButton
          icon={
            <Trash2
              size={16}
              className="text-ctp-subtext0 hover:text-ctp-red transition-colors"
            />
          }
          label="Clear Terminal"
          onClick={() => clearOutput()}
          labelDirection="left"
          className="hover:bg-ctp-surface0/30 rounded-lg p-1.5"
        />
        <GhostButton
          icon={
            isMaximized ? (
              <Minimize2
                size={16}
                className="text-ctp-subtext0 hover:text-ctp-blue transition-colors"
              />
            ) : (
              <Maximize2
                size={16}
                className="text-ctp-subtext0 hover:text-ctp-blue transition-colors"
              />
            )
          }
          label={isMaximized ? "Restore" : "Maximize"}
          onClick={() => toggleMaximize()}
          labelDirection="left"
          className="hover:bg-ctp-surface0/30 rounded-lg p-1.5"
        />
        <GhostButton
          icon={
            <X
              size={16}
              className="text-ctp-subtext0 hover:text-ctp-red transition-colors"
            />
          }
          onClick={() => setTerminalOpen(false)}
          label="Minimize"
          labelDirection="left"
          className="hover:bg-ctp-surface0/30 rounded-lg p-1.5"
        />
      </div>
    </div>
  );
};

export default TerminalHeader;
