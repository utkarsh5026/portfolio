import React from "react";
import { VscError, VscInfo } from "react-icons/vsc";

interface StatusBarProps {
  problems: number;
  language: string;
  typingProgress?: number;
  totalLines?: number;
}

const StatusBar: React.FC<StatusBarProps> = ({
  problems,
  language,
  typingProgress = 0,
  totalLines = 0,
}) => {
  const progressPercentage =
    totalLines > 0 ? Math.round((typingProgress / totalLines) * 100) : 0;
  const isComplete = typingProgress >= totalLines;

  return (
    <div className="h-6 bg-[#007acc] text-white text-xs flex items-center justify-between px-3 status-bar-appear">
      <div className="flex items-center space-x-4">
        {problems > 0 ? (
          <span className="flex items-center">
            <VscError className="mr-1" />
            {problems} {problems === 1 ? "problem" : "problems"}
          </span>
        ) : (
          <span className="flex items-center">
            <VscInfo className="mr-1" />
            No problems
          </span>
        )}

        <span className="flex items-center">
          {isComplete ? (
            <span className="text-green-200">File Complete</span>
          ) : (
            <span>
              <span className="text-yellow-200">Writing</span>{" "}
              {progressPercentage}%
            </span>
          )}
        </span>
      </div>

      <div className="flex items-center space-x-4">
        <span>Ln {typingProgress}, Col 1</span>
        <span>{language}</span>
        <span>UTF-8</span>
        <span>LF</span>
      </div>
    </div>
  );
};

export default StatusBar;
