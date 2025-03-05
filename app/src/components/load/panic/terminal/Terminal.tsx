import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { commands } from "../content";

interface TerminalProps {
  activeWindow: string | null;
  panicPhase: string;
  typingProgress: { [key: string]: number };
}

const Terminal: React.FC<TerminalProps> = ({
  activeWindow,
  panicPhase,
  typingProgress,
}) => {
  return (
    <Card
      className={cn(
        "terminal-window absolute bottom-[10%] left-[15%] w-[70%] h-[50%] shadow-lg transition-all duration-300 z-50 rounded-lg overflow-hidden border-0",
        activeWindow === "terminal" ? "opacity-100" : "opacity-0",
        panicPhase === "commands" && "opacity-100"
      )}
      style={{
        transform:
          activeWindow === "terminal"
            ? "translateZ(0px) rotate(-0.5deg)"
            : "translateZ(-50px) rotate(-0.5deg)",
      }}
    >
      {/* macOS Terminal Header */}
      <div className="h-9 bg-gradient-to-b from-[#e4e4e4] to-[#d1d1d1] px-4 flex items-center border-b border-[#b1b1b1]">
        <div className="flex gap-2 mr-4">
          <span className="w-3 h-3 rounded-full bg-[#ff5f57] flex items-center justify-center">
            <span className="w-2 h-px bg-[#be3c39] opacity-0 group-hover:opacity-100"></span>
          </span>
          <span className="w-3 h-3 rounded-full bg-[#febc2e] flex items-center justify-center">
            <span className="w-2 h-2 bg-[#b3831c] opacity-0 group-hover:opacity-100"></span>
          </span>
          <span className="w-3 h-3 rounded-full bg-[#28c840] flex items-center justify-center">
            <span className="rotate-45 w-2 h-px bg-[#1a8a2c] opacity-0 group-hover:opacity-100"></span>
          </span>
        </div>
        <div className="text-center text-sm text-[#4d4d4d] flex-1 font-medium">
          user@portfolio — bash — 80×24
        </div>
      </div>

      {/* Terminal Content */}
      <CardContent className="h-[calc(100%-36px)] bg-[#1e1e1e] p-3 overflow-y-auto font-mono text-sm leading-relaxed">
        <div className="terminal-lines">
          <div className="mb-2">
            <span className="text-[#0fd438]">➜</span>{" "}
            <span className="text-[#3b95d5]">portfolio</span>{" "}
            <span className="text-white">cd src</span>
          </div>
          <div className="mb-2">
            <span className="text-[#0fd438]">➜</span>{" "}
            <span className="text-[#3b95d5]">portfolio/src</span>{" "}
            <span className="text-white">ls</span>
          </div>
          <div className="mb-2">
            <span className="text-[#69c5fe]">components/</span>{" "}
            <span className="text-[#69c5fe]">pages/</span>{" "}
            <span className="text-[#69c5fe]">styles/</span>{" "}
            <span className="text-[#ddc475]">App.jsx</span>{" "}
            <span className="text-[#ddc475]">index.js</span>
          </div>

          {commands.map((command, i) => (
            <div key={i} className="command-line mb-2">
              <span className="text-[#0fd438]">➜</span>{" "}
              <span className="text-[#3b95d5]">portfolio/src</span>{" "}
              <span className="text-white">
                {typingProgress[`cmd${i}`] > 0
                  ? command.substring(0, typingProgress[`cmd${i}`])
                  : ""}
              </span>
              {i === commands.length - 1 &&
                typingProgress[`cmd${i}`] === command.length && (
                  <span className="cursor-blink inline-block w-2 h-4 bg-[#ffffff] ml-0.5 animate-pulse"></span>
                )}
            </div>
          ))}

          {typingProgress[`cmd0`] === commands[0].length && (
            <div className="mb-2 text-[#0fd438]">
              Installing packages... done
            </div>
          )}

          {typingProgress[`cmd1`] === commands[1].length && (
            <div className="mb-2 text-[#0fd438]">
              Created component structure
            </div>
          )}

          {typingProgress[`cmd2`] === commands[2].length && (
            <div className="mb-2 text-[#0fd438]">Tailwind CSS configured</div>
          )}

          {typingProgress[`cmd3`] === commands[3].length && (
            <>
              <div className="mb-2">
                <span className="text-[#3b95d5]">
                  Building production bundle:{" "}
                </span>
                <span className="text-[#febc2e]">50%</span>...{" "}
                <span className="text-[#febc2e]">75%</span>...{" "}
                <span className="text-[#0fd438]">100%</span>
              </div>
              <div className="mb-2 text-[#0fd438]">
                ✓ Portfolio successfully deployed!
              </div>
              <div className="deployment-progress h-2 bg-[#0fd438] rounded-full w-0"></div>
            </>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default Terminal;
