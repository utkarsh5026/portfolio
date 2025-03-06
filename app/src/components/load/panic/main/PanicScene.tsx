import React, { useState, useEffect, useRef, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { thoughts } from "../content";
import BrowserWindow from "../browser/BrowserWindow";
import CodeEditors from "../vscode/CodeEditors";
import ChatWindow from "../llm/ChatWindow";
import Terminal from "../terminal/Terminal";
import MacOSContainer from "../../macos/MacosContainer";
import "./panic.css";
import usePanic from "../use-panic";
import {
  CHAT_TIMING,
  COMMANDS_TIMING,
  BROWSER_TIMING,
  CODING_TIMING,
  INITIAL_DELAY,
  TERMINAL_TIMING,
} from "../timings";
import { useWindowContext } from "../context/windowcontext";
import "./PanicAnimations.css";

interface PanicSceneProps {
  onComplete: () => void;
}

const PanicScene: React.FC<PanicSceneProps> = ({ onComplete }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const visiorRef = useRef<HTMLDivElement>(null);
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
  const [glitchEffect, setGlitchEffect] = useState(false);
  const [thoughtBubble, setThoughtBubble] = useState("");

  const setupContainerGlitch = useCallback(() => {
    if (panicPhase !== "setup") {
      const triggerRandomGlitch = () => {
        setGlitchEffect(true);
        setTimeout(() => setGlitchEffect(false), 100);

        if (containerRef.current && Math.random() > 0.2) {
          const intensity = Math.random() * 8;
          containerRef.current.style.setProperty(
            "--glitch-intensity",
            `${intensity}px`
          );
          containerRef.current.style.setProperty(
            "--glitch-intensity-y",
            `${intensity * 0.7}px`
          );
          containerRef.current.style.setProperty(
            "--glitch-intensity-y-neg",
            `${-intensity * 0.5}px`
          );
          containerRef.current.classList.add("container-glitch-animation");

          // Remove the class after animation completes
          containerRef.current.addEventListener(
            "animationend",
            () => {
              containerRef.current?.classList.remove(
                "container-glitch-animation"
              );
            },
            { once: true }
          );
        }
      };

      const glitchInterval = setInterval(triggerRandomGlitch, 800);
      return () => clearInterval(glitchInterval);
    }
  }, [panicPhase]);

  const waitForChatAnimation = useCallback(async () => {
    return new Promise<void>((resolve) => setTimeout(resolve, CHAT_TIMING));
  }, []);

  const waitForBrowserAnimation = useCallback(() => {
    return new Promise<void>((resolve) => {
      setShowAlert(true);
      setTimeout(() => {
        visiorRef.current?.classList.add("visitor-alert-animation");
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

  const phaseSequence = useCallback(async () => {
    const startResearch = async () => {
      setPanicPhase("research");
      goToWindow("browser");
      setThoughtBubble(thoughts[1]);
      setTimeout(() => setThoughtBubble(""), 2000);
      await waitForBrowserAnimation();
    };

    const startCoding = async () => {
      setPanicPhase("coding");
      goToWindow("reactComponent");
      setThoughtBubble(thoughts[2]);
      setTimeout(() => setThoughtBubble(""), 2000);
      await waitForCodeEditorsAnimation();
    };

    const startChatWithLLM = async () => {
      setPanicPhase("assistance");
      goToWindow("chat");
      setThoughtBubble(thoughts[3]);
      setTimeout(() => setThoughtBubble(""), CHAT_TIMING);
      await waitForChatAnimation();
    };

    const startCommands = async () => {
      setPanicPhase("commands");
      goToWindow("terminal");
      setThoughtBubble(thoughts[4]);
      setTimeout(() => setThoughtBubble(""), COMMANDS_TIMING);
      await waitForTerminalAnimation();
    };

    await startResearch();

    await startChatWithLLM();
    await startCoding();
    await startCommands();

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
  }, [
    goToWindow,
    onComplete,
    waitForBrowserAnimation,
    waitForCodeEditorsAnimation,
    waitForChatAnimation,
    waitForTerminalAnimation,
    setPanicPhase,
    setThoughtBubble,
  ]);

  useEffect(() => {
    const setupTimeout = setTimeout(() => {
      setThoughtBubble(thoughts[0]);
      setTimeout(() => setThoughtBubble(""), 2000);
      phaseSequence();
    }, INITIAL_DELAY);

    return () => {
      clearTimeout(setupTimeout);
      timeoutRefs.current.forEach((timeout) => clearTimeout(timeout));
    };
  }, [phaseSequence]);

  useEffect(() => setupContainerGlitch(), [setupContainerGlitch]);

  const getActiveDockIcon = useCallback(() => {
    switch (activeWindow) {
      case "browser":
        return 0;
      case "reactComponent":
      case "cssStyles":
      case "animation":
        return 1;
      case "chat":
        return 2;
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

        {thoughtBubble && (
          <div className="fixed top-[85%] left-[10%] thought-bubble-container animate-bounce-subtle">
            <div className="bg-black backdrop-blur-md p-5 rounded-3xl border-2 border-purple-500 max-w-[300px] z-50 shadow-[0_4px_15px_rgba(209,156,255,0.3)] relative thought-bubble">
              <div className="absolute -top-2 -left-2 text-xl">💭</div>
              <div className="text-pink-100 text-sm font-medium leading-relaxed">
                {thoughtBubble}
              </div>
              <div className="absolute -bottom-2 -right-2 text-xl">✨</div>
            </div>
          </div>
        )}

        <div
          className={cn(
            "relative w-full h-[calc(100%-7px-64px)] mt-7 transition-all duration-300 ease-in-out",
            glitchEffect && "animate-pulse"
          )}
        >
          {loadedWindows.has("browser") && (
            <BrowserWindow
              activeWindow={activeWindow}
              totalTabSwitchDuration={BROWSER_TIMING}
            />
          )}
          {loadedWindows.has("reactComponent") && (
            <CodeEditors totalTimeForCodeInMS={CODING_TIMING} />
          )}
          {loadedWindows.has("chat") && (
            <ChatWindow totalAnimationTimeMS={CHAT_TIMING} />
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
            ref={visiorRef}
            className="visitor-alert fixed top-12 right-5 w-[300px] bg-red-500/20 rounded-lg border-2 border-red-500/50 overflow-hidden shadow-lg z-50"
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
