import React, { useState, useEffect, useRef, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import BrowserWindow from "../browser/BrowserWindow";
import CodeEditors from "../vscode/CodeEditors";
import ChatWindow from "../llm/ChatWindow";
import Terminal from "../terminal/Terminal";
import MacOSContainer from "../../macos/MacosContainer";
import "./panic.css";
import usePanic from "../use-panic";
import {
  CHAT_TIMING,
  BROWSER_TIMING,
  CODING_TIMING,
  INITIAL_DELAY,
  TERMINAL_TIMING,
} from "../timings";
import { useWindowContext } from "../context/windowcontext";
import "./PanicAnimations.css";

const INIT_MESSAGE_TIME = 2000;

interface PanicSceneProps {
  onComplete: () => void;
}

// Enhanced narrative content with a more coherent story
const narrative = {
  intro: {
    title: "OH NO!",
    content:
      "Someone is viewing my unfinished portfolio right now! I need to get it ready ASAP.",
  },
  research: {
    title: "Research Phase",
    content: "Let me check what modern portfolios should look like...",
    followup: "I need animations to make this look professional!",
  },
  assistance: {
    title: "Getting Help",
    content: "Maybe an AI assistant can help me with some animation code?",
    followup: "Perfect! This code looks exactly what I need.",
  },
  coding: {
    title: "Implementation",
    content: "Time to implement these animations in my React components...",
    followup: "Almost there! Just need to integrate everything.",
  },
  commands: {
    title: "Deployment",
    content: "Let's install the dependencies and deploy this right away!",
    followup: "Success! Portfolio is now live with animations.",
  },
  complete: {
    title: "PHEW!",
    content:
      "Crisis averted! Portfolio is now live with professional animations.",
  },
};

const PanicScene: React.FC<PanicSceneProps> = ({ onComplete }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const visitorRef = useRef<HTMLDivElement>(null);
  const narrativeRef = useRef<HTMLDivElement>(null);
  const {
    panicPhase,
    setPanicPhase,
    stressLevel,
    stressLevelClass,
    timeLeft,
    timeLeftClass,
  } = usePanic();
  const { activeWindow, goToWindow, loadedWindows } = useWindowContext();
  const [showAlert, setShowAlert] = useState(false);
  const timeoutRefs = useRef<NodeJS.Timeout[]>([]);

  // Enhanced narrative state
  const [narrativePhase, setNarrativePhase] = useState("setup");
  const [narrativeVisible, setNarrativeVisible] = useState(false);
  const [narrativeContent, setNarrativeContent] = useState({
    title: "",
    content: "",
  });
  const [narrativeProgress, setNarrativeProgress] = useState(0);

  // Animation phase timing functions
  const waitForChatAnimation = useCallback(async () => {
    return new Promise<void>((resolve) => setTimeout(resolve, CHAT_TIMING));
  }, []);

  const waitForBrowserAnimation = useCallback(() => {
    return new Promise<void>((resolve) => {
      setShowAlert(true);
      setTimeout(() => {
        visitorRef.current?.classList.add("visitor-alert-animation");
      }, 600);
      setTimeout(resolve, BROWSER_TIMING);
    });
  }, []);

  const waitForCodeEditorsAnimation = useCallback(async () => {
    return new Promise<void>((resolve) => setTimeout(resolve, CODING_TIMING));
  }, []);

  const waitForTerminalAnimation = useCallback(() => {
    return new Promise<void>((resolve) => setTimeout(resolve, TERMINAL_TIMING));
  }, []);

  const showNarrative = useCallback(
    (phase: keyof typeof narrative, isFollowup = false) => {
      setNarrativeVisible(false);

      return new Promise<void>((resolveNarrative) => {
        setTimeout(() => {
          if (!narrative[phase]) {
            resolveNarrative();
            return;
          }

          const content = isFollowup
            ? {
                title: narrative[phase].title,
                content: narrative[phase]?.followup,
              }
            : {
                title: narrative[phase].title,
                content: narrative[phase].content,
              };

          setNarrativeContent(content);
          setNarrativeVisible(true);
          setNarrativePhase(phase);
          setNarrativeProgress(0);

          const text = content.content;
          const textLength = text.length;
          const typingInterval = Math.min(25, 1600 / textLength);

          const typingDuration = typingInterval * textLength;
          const displayDuration = isFollowup ? 2000 : 3000;
          const totalDuration = typingDuration + displayDuration;

          let progress = 0;
          const typingTimer = setInterval(() => {
            progress += 1;
            setNarrativeProgress(progress);

            if (progress >= textLength) {
              clearInterval(typingTimer);
            }
          }, typingInterval);

          // Schedule the hiding and resolution
          const hideTimer = setTimeout(() => {
            setNarrativeVisible(false);
            resolveNarrative();
          }, totalDuration);

          timeoutRefs.current.push(hideTimer);
        }, 100);
      });
    },
    []
  );

  const phaseSequence = useCallback(async () => {
    const startResearch = async () => {
      setPanicPhase("research");
      goToWindow("browser");

      await showNarrative("research");

      const browserAnimation = waitForBrowserAnimation();

      await new Promise((resolve) =>
        setTimeout(async () => {
          await showNarrative("research", true);
          resolve(null);
        }, BROWSER_TIMING * 0.7)
      );

      await browserAnimation;
    };

    const startChatWithLLM = async () => {
      setPanicPhase("assistance");
      goToWindow("chat");

      await showNarrative("assistance");

      const chatAnimation = waitForChatAnimation();

      await new Promise((resolve) =>
        setTimeout(async () => {
          await showNarrative("assistance", true);
          resolve(null);
        }, CHAT_TIMING * 0.2)
      );

      await chatAnimation;
    };

    const startCoding = async () => {
      setPanicPhase("coding");
      goToWindow("reactComponent");

      await showNarrative("coding");

      const codingAnimation = waitForCodeEditorsAnimation();

      await new Promise((resolve) =>
        setTimeout(async () => {
          await showNarrative("coding", true);
          resolve(null);
        }, CODING_TIMING * 0.85)
      );

      // Ensure coding animation completes
      await codingAnimation;
    };

    const startCommands = async () => {
      setPanicPhase("commands");
      goToWindow("terminal");

      // Show initial narrative and await its completion
      await showNarrative("commands");

      // Start terminal animation
      const terminalAnimation = waitForTerminalAnimation();

      // Show follow-up narrative
      await new Promise((resolve) =>
        setTimeout(async () => {
          await showNarrative("commands", true);
          resolve(null);
        }, TERMINAL_TIMING * 0.85)
      );

      // Ensure terminal animation completes
      await terminalAnimation;
    };

    const completeScene = async () => {
      await showNarrative("complete");

      setTimeout(() => {
        if (containerRef.current) {
          containerRef.current.classList.add("container-fade-out-animation");
          containerRef.current.addEventListener(
            "animationend",
            () => {
              onComplete();
            },
            { once: true }
          );
        }
      }, 1000);
    };

    await showNarrative("intro");

    await new Promise((resolve) => setTimeout(resolve, INIT_MESSAGE_TIME));

    await startResearch();
    await startChatWithLLM();
    await startCoding();
    await startCommands();
    await completeScene();
  }, [
    goToWindow,
    onComplete,
    showNarrative,
    waitForBrowserAnimation,
    waitForChatAnimation,
    waitForCodeEditorsAnimation,
    waitForTerminalAnimation,
    setPanicPhase,
  ]);

  // Initialize effect
  useEffect(() => {
    const setupTimeout = setTimeout(() => {
      phaseSequence();
    }, INITIAL_DELAY);

    return () => {
      clearTimeout(setupTimeout);
      timeoutRefs.current.forEach((timeout) => clearTimeout(timeout));
    };
  }, [phaseSequence]);

  const getActiveDockIcon = useCallback(() => {
    switch (activeWindow) {
      case "browser":
        return 0;
      case "reactComponent":
      case "cssStyles":
      case "animation":
        return 2;
      case "chat":
        return 1;
      case "terminal":
        return 3;
      default:
        return -1;
    }
  }, [activeWindow]);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full max-h-full overflow-hidden"
    >
      <MacOSContainer
        options={{
          wallpaper: "url('/images/macos/wallpaper.jpg')",
          showDock: true,
          showMenuBar: true,
          showDesktopIcons: true,
          title: "Utkarsh Imaginary Macbook",
          activeAppIndex: getActiveDockIcon(),
        }}
      >
        <div className="absolute inset-0 pointer-events-none z-10 opacity-30 bg-gradient-radial from-transparent to-black"></div>

        {narrativeVisible && (
          <div
            ref={narrativeRef}
            className={cn(
              "fixed top-[70%] left-[10%] z-[90] narrative-container",
              narrativePhase === "intro" || narrativePhase === "complete"
                ? "narrative-spotlight"
                : "narrative-bubble"
            )}
          >
            <div
              className={cn(
                "max-w-md rounded-2xl text-white shadow-2xl overflow-hidden transition-all duration-300 backdrop-blur-md",
                narrativePhase === "intro" || narrativePhase === "complete"
                  ? "bg-black/75 border-2 border-yellow-400"
                  : "bg-black/60 border border-purple-500"
              )}
            >
              {(narrativePhase === "intro" ||
                narrativePhase === "complete") && (
                <div className="bg-yellow-600/30 px-5 py-2 font-bold text-yellow-200">
                  {narrativeContent.title}
                </div>
              )}
              <div className="p-5 relative">
                {narrativePhase !== "intro" &&
                  narrativePhase !== "complete" && (
                    <div className="absolute -top-2 -left-2 text-xl">💭</div>
                  )}
                <div
                  className={cn(
                    "text-base leading-relaxed space-y-1",
                    narrativePhase === "intro" || narrativePhase === "complete"
                      ? "text-white font-medium"
                      : "text-pink-100"
                  )}
                >
                  {narrativeContent.content.substring(0, narrativeProgress)}
                  {narrativeProgress < narrativeContent.content.length && (
                    <span className="typing-cursor">|</span>
                  )}
                </div>
                {narrativePhase !== "intro" &&
                  narrativePhase !== "complete" && (
                    <div className="absolute -bottom-2 -right-2 text-xl">
                      ✨
                    </div>
                  )}
              </div>
            </div>
          </div>
        )}

        <div
          className={cn(
            "relative w-full h-[calc(100%-7px-64px)] mt-7 transition-all duration-300 ease-in-out"
          )}
        >
          {loadedWindows.has("browser") && (
            <BrowserWindow
              activeWindow={activeWindow}
              totalTabSwitchDuration={BROWSER_TIMING}
            />
          )}
          {loadedWindows.has("chat") && (
            <ChatWindow totalAnimationTimeMS={CHAT_TIMING} />
          )}
          {loadedWindows.has("reactComponent") && (
            <CodeEditors totalTimeForCodeInMS={CODING_TIMING} />
          )}
          {loadedWindows.has("terminal") && (
            <Terminal
              activeWindow={activeWindow}
              panicPhase={panicPhase}
              totalAnimationTimeMS={TERMINAL_TIMING}
            />
          )}
        </div>

        {/* Visitor alert notification */}
        {showAlert && (
          <div
            ref={visitorRef}
            className="visitor-alert fixed top-12 right-5 w-[300px] bg-red-500/20 rounded-lg border-2 border-red-500/50 overflow-hidden shadow-lg z-[700]"
          >
            <div className="flex items-center gap-2.5 p-3 bg-red-500/30 border-b border-red-500/50">
              <div className="text-lg animate-ping">⚠️</div>
              <div className="flex-grow font-bold text-sm text-red-500 uppercase tracking-wide">
                VISITOR DETECTED
              </div>
              <div className="text-lg cursor-pointer text-gray-400">×</div>
            </div>
            <div className="p-3 text-sm text-white leading-relaxed">
              <p className="font-bold">EMERGENCY ALERT:</p>
              <p className="mt-1">
                Someone is actively viewing your unfinished portfolio right now!
              </p>
            </div>
            <div className="p-2 bg-red-500/15 flex items-center justify-between">
              <div className="flex items-center">
                <span className="inline-block w-2 h-2 bg-red-500 rounded-full mr-2 animate-pulse"></span>
                <span className="text-xs text-red-500">LIVE</span>
              </div>
              <div className="text-xs text-red-500">
                Visitor IP: 178.32.xx.xx
              </div>
            </div>
            <div className="flex justify-end gap-2.5 px-3 py-3">
              <Button className="py-1.5 px-3 rounded bg-red-500 text-slate-900 text-sm cursor-pointer border-none">
                Emergency Deploy
              </Button>
              <Button
                variant="outline"
                className="py-1.5 px-3 rounded bg-slate-700 text-white text-sm cursor-pointer border-none"
              >
                Ignore
              </Button>
            </div>
          </div>
        )}

        {/* Time indicator */}
        <div className="fixed top-12 left-5 flex items-center gap-2 bg-red-500/20 backdrop-blur-md py-2 px-3 rounded-full z-50 border border-red-500/30">
          <div className="text-base animate-pulse">⏱️</div>
          <div
            className={cn(
              "font-mono text-sm font-bold countdown",
              timeLeftClass
            )}
          >
            {timeLeft}
          </div>
        </div>

        {/* Stress meter */}
        <div className="fixed bottom-24 right-5 z-50 flex flex-col gap-1">
          <div className="text-right text-xs text-red-500 mb-1 font-semibold uppercase tracking-wide">
            {stressLevel}
          </div>
          <div
            className={cn(
              "h-2 bg-gradient-to-r from-green-400 via-yellow-400 to-red-500 rounded-full transition-all duration-500",
              stressLevelClass,
              "w-32"
            )}
          ></div>
        </div>
      </MacOSContainer>
    </div>
  );
};

export default PanicScene;
