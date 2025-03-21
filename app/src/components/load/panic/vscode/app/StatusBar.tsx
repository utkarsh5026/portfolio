import React from "react";
import { VscError, VscInfo } from "react-icons/vsc";

interface StatusBarProps {
  problems: number;
  language: string;
  typingProgress?: number;
  totalLines?: number;
  timeRemaining?: boolean;
}

/**
 * StatusBar is a React component that displays the status of a file being edited.
 * It shows the number of problems, typing progress, language, and encoding information.
 *
 * @param {StatusBarProps} props - The component props.
 * @param {number} props.problems - The number of problems in the file.
 * @param {string} props.language - The programming language of the file.
 * @param {number} [props.typingProgress=0] - The number of lines typed so far.
 * @param {number} [props.totalLines=0] - The total number of lines in the file.
 * @param {boolean} [props.timeRemaining=false] - Indicates if time is running out.
 *
 * @returns {React.ReactElement} The StatusBar component.
 */
const StatusBar: React.FC<StatusBarProps> = ({
  problems,
  language,
  typingProgress = 0,
  totalLines = 0,
  timeRemaining = false,
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
            <span className="flex items-center">
              <span
                className={
                  timeRemaining
                    ? "text-yellow-200 mr-1"
                    : "text-yellow-200 mr-1 progress-pulse"
                }
              >
                Writing
              </span>
              <span>{progressPercentage}%</span>
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
