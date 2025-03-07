import React, { useEffect, useState, useRef, useMemo } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { commands } from "../content";
import "./TerminalAnimations.css";

interface TerminalProps {
  activeWindow: string | null;
  panicPhase: string;
  totalAnimationTimeMS: number;
}

const Terminal: React.FC<TerminalProps> = ({
  activeWindow,
  panicPhase,
  totalAnimationTimeMS = 6000, // Default to 6 seconds if not provided
}) => {
  // State for command typing progress
  const [commandProgress, setCommandProgress] = useState<{
    [key: string]: number;
  }>({});

  // State for output appearance
  const [outputVisibility, setOutputVisibility] = useState<{
    [key: string]: boolean;
  }>({});

  // Track animation state
  const [animationState, setAnimationState] = useState<
    "idle" | "running" | "complete"
  >("idle");

  // Deployment progress animation
  const [deploymentProgress, setDeploymentProgress] = useState(0);

  // Reference to the terminal content for auto-scrolling
  const terminalContentRef = useRef<HTMLDivElement>(null);

  // Hold current animation timeouts for cleanup
  const animationTimeoutsRef = useRef<NodeJS.Timeout[]>([]);

  // Calculate timing distribution based on total animation time
  const timing = useMemo(() => {
    // Command typing gets 60% of total time
    const commandTypingTime = totalAnimationTimeMS * 0.6;
    // Each command gets equal portion of the typing time
    const timePerCommand = commandTypingTime / commands.length;

    // Feedback display gets 20% of total time
    const feedbackDisplayTime = totalAnimationTimeMS * 0.2;
    // Each feedback gets equal portion
    const timePerFeedback = feedbackDisplayTime / commands.length;

    // Deployment animation gets remaining 20%
    const deploymentAnimationTime = totalAnimationTimeMS * 0.2;

    // Calculate typing speed based on command length
    const typingSpeeds = commands.map((cmd) => {
      // Characters per millisecond
      return timePerCommand / cmd.length;
    });

    return {
      typingSpeeds,
      timePerCommand,
      timePerFeedback,
      deploymentAnimationTime,
    };
  }, [totalAnimationTimeMS]);

  // Start animations when terminal becomes active
  useEffect(() => {
    if (
      (activeWindow === "terminal" || panicPhase === "commands") &&
      animationState === "idle"
    ) {
      startAnimations();
    }

    return () => {
      // Clean up any pending timeouts on unmount
      animationTimeoutsRef.current.forEach((timeout) => clearTimeout(timeout));
    };
  }, [activeWindow, panicPhase]);

  // Auto-scroll terminal as content is added
  useEffect(() => {
    if (terminalContentRef.current) {
      terminalContentRef.current.scrollTop =
        terminalContentRef.current.scrollHeight;
    }
  }, [commandProgress, outputVisibility, deploymentProgress]);

  // Function to animate terminal commands and outputs
  const startAnimations = () => {
    setAnimationState("running");
    let currentTimeOffset = 0;

    // Clear any existing animation state
    setCommandProgress({});
    setOutputVisibility({});
    setDeploymentProgress(0);

    // Clean up any pending timeouts
    animationTimeoutsRef.current.forEach((timeout) => clearTimeout(timeout));
    animationTimeoutsRef.current = [];

    // Process each command sequentially with the right timing
    commands.forEach((command, cmdIndex) => {
      // Start typing each character of the command
      for (let charIndex = 1; charIndex <= command.length; charIndex++) {
        const timeout = setTimeout(() => {
          setCommandProgress((prev) => ({
            ...prev,
            [`cmd${cmdIndex}`]: charIndex,
          }));

          // Auto-scroll as we type
          if (terminalContentRef.current) {
            terminalContentRef.current.scrollTop =
              terminalContentRef.current.scrollHeight;
          }
        }, currentTimeOffset + timing.typingSpeeds[cmdIndex] * charIndex);

        animationTimeoutsRef.current.push(timeout);
      }

      // Show command output after typing is complete
      const outputTimeout = setTimeout(() => {
        setOutputVisibility((prev) => ({
          ...prev,
          [`output${cmdIndex}`]: true,
        }));
      }, currentTimeOffset + timing.timePerCommand + 100);

      animationTimeoutsRef.current.push(outputTimeout);

      // Advance time for next command
      currentTimeOffset += timing.timePerCommand + timing.timePerFeedback;
    });

    // Start deployment progress animation after all commands
    const deploymentStartTime = currentTimeOffset;
    const deploymentAnimationSteps = 50; // Divide animation into steps for smoother progress

    for (let step = 1; step <= deploymentAnimationSteps; step++) {
      const progressTimeout = setTimeout(() => {
        setDeploymentProgress((step / deploymentAnimationSteps) * 100);
      }, deploymentStartTime + (timing.deploymentAnimationTime * step) / deploymentAnimationSteps);

      animationTimeoutsRef.current.push(progressTimeout);
    }

    // Mark animation as complete
    const completionTimeout = setTimeout(() => {
      setAnimationState("complete");
    }, deploymentStartTime + timing.deploymentAnimationTime);

    animationTimeoutsRef.current.push(completionTimeout);
  };

  return (
    <Card
      className={cn(
        "terminal-window absolute bottom-[10%] left-[15%] w-[70%] h-[50%] shadow-xl transition-all duration-300 z-50 rounded-lg overflow-hidden border-0 terminal-appear",
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
      <div className="h-9 bg-gradient-to-b from-[#3a3a3a] to-[#2d2d2d] px-3 flex items-center border-b border-[#000000] group">
        <div className="flex gap-2 mr-4">
          <button className="w-3 h-3 rounded-full bg-[#ff5f57] flex items-center justify-center group-hover:brightness-90 transition-all">
            <span className="w-1.5 h-0.5 bg-[#930005] opacity-0 group-hover:opacity-100"></span>
          </button>
          <button className="w-3 h-3 rounded-full bg-[#febc2e] flex items-center justify-center group-hover:brightness-90 transition-all">
            <span className="w-1.5 h-1.5 bg-[#985700] opacity-0 group-hover:opacity-100">
              −
            </span>
          </button>
          <button className="w-3 h-3 rounded-full bg-[#28c840] flex items-center justify-center group-hover:brightness-90 transition-all">
            <span className="rotate-45 text-[#003c00] opacity-0 group-hover:opacity-100 text-[8px] font-bold leading-none">
              +
            </span>
          </button>
        </div>
        <div className="text-center text-sm text-[#cccccc] flex-1 font-medium flex items-center justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="mr-1.5"
          >
            <polyline points="4 17 10 11 4 5"></polyline>
            <line x1="12" y1="19" x2="20" y2="19"></line>
          </svg>
          bash — user@portfolio — 80×24
        </div>
      </div>

      {/* Terminal Content */}
      <CardContent
        ref={terminalContentRef}
        className="h-[calc(100%-36px)] bg-[#1e1e1e] p-3 overflow-y-auto font-mono text-sm leading-relaxed terminal-content"
      >
        <div className="terminal-lines">
          {/* Initial directory navigation */}
          <div className="mb-2 terminal-line-intro">
            <span className="text-[#0fd438]">➜</span>{" "}
            <span className="text-[#3b95d5]">portfolio</span>{" "}
            <span className="text-white">cd src</span>
          </div>
          <div className="mb-2 terminal-line-intro">
            <span className="text-[#0fd438]">➜</span>{" "}
            <span className="text-[#3b95d5]">portfolio/src</span>{" "}
            <span className="text-white">ls</span>
          </div>
          <div className="mb-2 terminal-line-intro">
            <span className="text-[#69c5fe]">components/</span>{" "}
            <span className="text-[#69c5fe]">pages/</span>{" "}
            <span className="text-[#69c5fe]">styles/</span>{" "}
            <span className="text-[#ddc475]">App.jsx</span>{" "}
            <span className="text-[#ddc475]">index.js</span>
          </div>

          {/* Animated commands */}
          {commands.map((command, i) => (
            <React.Fragment key={i}>
              {/* Command line */}
              <div
                className="command-line mb-2 flex terminal-line-appear"
                style={{ animationDelay: `${i * 200}ms` }}
              >
                <span className="text-[#0fd438]">➜</span>{" "}
                <span className="text-[#3b95d5]">portfolio/src</span>{" "}
                <span className="text-white flex-1">
                  {commandProgress[`cmd${i}`] > 0
                    ? command.substring(0, commandProgress[`cmd${i}`])
                    : ""}
                  {/* Show cursor only for the currently typing command */}
                  {commandProgress[`cmd${i}`] !== undefined &&
                    commandProgress[`cmd${i}`] < command.length && (
                      <span className="cursor-blink"></span>
                    )}
                </span>
              </div>

              {/* Command output */}
              {outputVisibility[`output${i}`] && (
                <div className={`mb-3 terminal-output-appear text-[#0fd438]`}>
                  {i === 0 && (
                    <div className="mb-1">
                      <span>Installing packages... </span>
                      <span className="inline-block">
                        <span className="loading-dots">
                          <span>.</span>
                          <span>.</span>
                          <span>.</span>
                        </span>
                        <span> done</span>
                      </span>
                    </div>
                  )}

                  {i === 1 && (
                    <div className="mb-1">Created component structure</div>
                  )}

                  {i === 2 && (
                    <div className="mb-1">Tailwind CSS configured</div>
                  )}

                  {i === 3 && (
                    <>
                      <div className="mb-1">
                        <span className="text-[#3b95d5]">
                          Building production bundle:{" "}
                        </span>
                        <span className="text-[#febc2e]">50%</span>...{" "}
                        <span className="text-[#febc2e]">75%</span>...{" "}
                        <span className="text-[#0fd438]">100%</span>
                      </div>
                      <div className="mb-2">
                        ✓ Portfolio successfully deployed!
                      </div>
                      <div
                        className="deployment-progress h-2 bg-gradient-to-r from-[#0fd438] to-[#28c840] rounded-full transition-all duration-300 mb-4"
                        style={{ width: `${deploymentProgress}%` }}
                      ></div>
                    </>
                  )}
                </div>
              )}
            </React.Fragment>
          ))}

          {/* Final prompt after completion */}
          {animationState === "complete" && (
            <div
              className="flex terminal-line-appear"
              style={{ animationDelay: "300ms" }}
            >
              <span className="text-[#0fd438]">➜</span>{" "}
              <span className="text-[#3b95d5]">portfolio/src</span>{" "}
              <span className="cursor-blink"></span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default Terminal;
