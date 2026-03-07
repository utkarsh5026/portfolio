"use client";

import { Maximize2, Minus, Terminal, X } from "lucide-react";
import { useEffect, useState } from "react";

import styles from "./section-loading.module.css";

interface TerminalCommand {
  cmd: string;
  output?: string;
  delay?: number;
}

interface BaseTerminalLoadingProps {
  terminalTitle: string;
  commands: TerminalCommand[];
  promptColor: string;
  footerText: string;
  footerExtra?: React.ReactNode;
  interval?: number;
}

type CommandState = "typing" | "executing" | "done";

const BaseTerminalLoading: React.FC<BaseTerminalLoadingProps> = ({
  terminalTitle,
  commands,
  promptColor,
  footerText,
  footerExtra,
  interval = 800,
}) => {
  const [currentCmdIndex, setCurrentCmdIndex] = useState(0);
  const [typedChars, setTypedChars] = useState(0);
  const [cmdState, setCmdState] = useState<CommandState>("typing");
  const [loopCount, setLoopCount] = useState(0);

  useEffect(() => {
    if (commands.length === 0) return;

    let timeout: ReturnType<typeof setTimeout>;
    const currentCommand = commands[currentCmdIndex];

    if (cmdState === "typing") {
      if (typedChars < currentCommand.cmd.length) {
        // Typing effect
        const typeSpeed = Math.random() * 30 + 20;
        timeout = setTimeout(() => {
          setTypedChars((prev) => prev + 1);
        }, typeSpeed);
      } else {
        // Finished typing command
        timeout = setTimeout(() => {
          setCmdState("executing");
        }, 150);
      }
    } else if (cmdState === "executing") {
      // Executing command
      const executionTime = currentCommand.output
        ? Math.random() * 200 + 300
        : 100;
      timeout = setTimeout(() => {
        setCmdState("done");
      }, executionTime);
    } else if (cmdState === "done") {
      // Waiting before next command
      const delayBeforeNext = currentCommand.delay || interval;
      timeout = setTimeout(() => {
        if (currentCmdIndex === commands.length - 1) {
          // Restart loop
          setCurrentCmdIndex(0);
          setTypedChars(0);
          setCmdState("typing");
          setLoopCount((prev) => prev + 1);
        } else {
          setCurrentCmdIndex((prev) => prev + 1);
          setTypedChars(0);
          setCmdState("typing");
        }
      }, delayBeforeNext);
    }

    return () => clearTimeout(timeout);
  }, [cmdState, typedChars, currentCmdIndex, commands, interval]);

  const dotColorClass = promptColor.startsWith("text-")
    ? promptColor.replace("text-", "bg-")
    : "bg-ctp-green";

  return (
    <div className="flex items-center justify-center min-h-[400px] w-full p-4">
      <div className="w-full max-w-2xl mx-auto shadow-2xl shadow-ctp-crust/50 rounded-xl overflow-hidden group">
        <div className="bg-ctp-base/90 backdrop-blur-xl border border-ctp-surface1/50 transition-colors duration-300">
          {/* Header */}
          <div className="bg-ctp-mantle/50 px-4 py-3 flex items-center justify-between border-b border-ctp-surface0">
            <div className="flex items-center gap-2 group-hover:opacity-100 opacity-80 transition-opacity">
              <div className="w-3.5 h-3.5 rounded-full bg-ctp-red border border-ctp-red/20 shadow-sm flex items-center justify-center relative overflow-hidden">
                <X className="w-2.5 h-2.5 text-ctp-crust opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <div className="w-3.5 h-3.5 rounded-full bg-ctp-yellow border border-ctp-yellow/20 shadow-sm flex items-center justify-center relative overflow-hidden">
                <Minus className="w-2.5 h-2.5 text-ctp-crust opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <div className="w-3.5 h-3.5 rounded-full bg-ctp-green border border-ctp-green/20 shadow-sm flex items-center justify-center relative overflow-hidden">
                <Maximize2 className="w-2.5 h-2.5 text-ctp-crust opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </div>
            <div className="flex items-center gap-2 text-ctp-subtext0 text-sm font-medium font-source select-none">
              <Terminal className="w-4 h-4" />
              {terminalTitle}
            </div>
            <div className="w-16" /> {/* Spacer */}
          </div>

          {/* Terminal Content Box */}
          <div className="p-6 space-y-3 font-source text-[15px] min-h-[220px]">
            {commands.map((command, index) => {
              if (index > currentCmdIndex) return null;

              const isCurrent = index === currentCmdIndex;
              const isDone = isCurrent ? cmdState === "done" : true;
              const displayCmd = isCurrent
                ? command.cmd.substring(0, typedChars)
                : command.cmd;

              return (
                <div
                  key={`${loopCount}-${index}`}
                  className={styles.commandRow}
                >
                  <div className="flex items-center mb-1 flex-wrap">
                    <span className={`${promptColor} mr-2.5 font-bold`}>❯</span>
                    <span className="text-ctp-text whitespace-pre-wrap break-words">
                      {displayCmd}
                    </span>
                    {isCurrent && cmdState !== "done" && (
                      <span
                        className={`inline-block w-2.5 h-[1.1em] bg-ctp-subtext0 ml-1 rounded-[1px] align-middle shadow-[0_0_8px_rgba(255,255,255,0.1)] ${styles.cursor}`}
                      />
                    )}
                  </div>
                  {isDone && command.output && (
                    <div
                      className={`ml-6 text-ctp-subtext1 text-sm leading-relaxed py-1 ${styles.outputLine}`}
                    >
                      {command.output}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Footer (Loading details) */}
          <div className="bg-ctp-surface0/30 px-6 py-4 border-t border-ctp-surface0 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-ctp-subtext0">
            <div className="flex items-center gap-3 font-medium">
              <span className="relative flex h-2.5 w-2.5">
                <span
                  className={`animate-ping absolute inline-flex h-full w-full rounded-full ${dotColorClass} opacity-75`}
                ></span>
                <span
                  className={`relative inline-flex rounded-full h-2.5 w-2.5 ${dotColorClass}`}
                ></span>
              </span>
              {footerText}
            </div>
            {footerExtra && (
              <div className="w-full sm:w-auto opacity-90 transition-opacity">
                {footerExtra}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BaseTerminalLoading;
