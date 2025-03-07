import React, { useState, useEffect, useRef, useCallback } from "react";
import anime from "animejs";
import { cn } from "@/lib/utils";
import VisitorAlert from "./VisitorAlert";
import useRealization from "./use-realization";
import { codeLines } from "./content";
import CodeEditor from "./CodeEditor";
import {
  CODE_TYPING_INTERVAL,
  GLITCH_INTERVAL,
  SWITCH_TO_NOTICE_STAGE,
  SWITCH_TO_ALARM_STAGE,
  SWITCH_TO_PANIC_STAGE,
} from "./timings";
import "./visitor.css";
import "./style.css";

interface RealizationSceneProps {
  onComplete: () => void;
}

const RealizationScene: React.FC<RealizationSceneProps> = ({ onComplete }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const characterRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  const { stage, setStage, sceneBackgroundColor, emojiClass, emoji } =
    useRealization();
  const [glitchEffect, setGlitchEffect] = useState(false);
  const [showCodeWindow, setShowCodeWindow] = useState(true);
  const [codeProgress, setCodeProgress] = useState(0);

  const onInit = useCallback(() => {
    if (!containerRef.current) return;
    const loadScreen = () =>
      anime({
        targets: containerRef.current,
        opacity: [0, 1],
        duration: 400,
        easing: "easeInOutQuad",
      });

    loadScreen();
  }, []);

  const onAlarm = useCallback(() => {
    if (overlayRef.current) {
      anime({
        targets: overlayRef.current,
        opacity: [0.3, 0.5, 0.3, 0.5, 0.3],
        backgroundColor: [
          "rgba(243, 139, 168, 0.2)",
          "rgba(243, 139, 168, 0.4)",
          "rgba(243, 139, 168, 0.2)",
        ],
        duration: 1200,
        loop: 2,
        easing: "easeInOutSine",
      });
    }

    anime({
      targets: characterRef.current,
      rotate: [-8, 8, -6, 6, 0],
      scale: [1, 1.4, 1.2],
      duration: 800,
      boxShadow: [
        "0 0 5px rgba(249, 226, 175, 0.3)",
        "0 0 20px rgba(243, 139, 168, 0.7)",
        "0 0 10px rgba(243, 139, 168, 0.5)",
      ],
      easing: "easeInOutQuad",
    });

    // Stronger screen shake
    anime({
      targets: containerRef.current,
      translateX: [0, -8, 8, -6, 6, -4, 4, 0],
      translateY: [0, 5, -5, 4, -4, 3, -3, 0],
      duration: 800,
      easing: "easeInOutSine",
      loop: 2,
    });

    // Code window starts glitching
    anime({
      targets: ".code-window",
      translateX: [0, -3, 3, -2, 2, 0],
      translateY: [0, 2, -2, 1, -1, 0],
      duration: 400,
      easing: "easeInOutSine",
      loop: 3,
    });
  }, []);

  const onNotice = useCallback(() => {
    anime({
      targets: containerRef.current,
      translateX: [0, -5, 5, -3, 3, 0],
      translateY: [0, 3, -3, 2, -2, 0],
      duration: 600,
      easing: "easeInOutSine",
      loop: 2,
    });

    // Glow effect on character
    anime({
      targets: characterRef.current,
      boxShadow: [
        "0 0 0 rgba(249, 226, 175, 0)",
        "0 0 15px rgba(249, 226, 175, 0.7)",
        "0 0 5px rgba(249, 226, 175, 0.3)",
      ],
      duration: 800,
      easing: "easeInOutQuad",
    });

    // Animate background to show concern
    if (overlayRef.current) {
      anime({
        targets: overlayRef.current,
        opacity: [0, 0.3],
        duration: 800,
        easing: "easeInOutQuad",
      });
    }
  }, []);

  const onPanic = useCallback(() => {
    setShowCodeWindow(false);

    anime({
      targets: containerRef.current,
      translateX: [0, -15, 15, -12, 12, -8, 8, 0],
      translateY: [0, 8, -8, 6, -6, 4, -4, 0],
      duration: 800,
      easing: "easeInOutQuad",
    });

    if (overlayRef.current) {
      anime({
        targets: overlayRef.current,
        opacity: [0.5, 0.7, 0.5, 0.7, 0.5],
        backgroundColor: [
          "rgba(243, 139, 168, 0.4)",
          "rgba(235, 50, 80, 0.5)",
          "rgba(243, 139, 168, 0.4)",
        ],
        duration: 600,
        loop: 2,
        easing: "easeInOutSine",
      });
    }

    anime({
      targets: characterRef.current,
      rotate: [-12, 12, -10, 10, -8, 8, 0],
      scale: [1.2, 1.6, 1.4, 1.6, 1.4, 4.8],
      translateY: [0, 10, -10, 8, -8, 6, -6, -20],
      translateX: [0, 5, -5, 4, -4, 3, -3, 20],
      duration: 1000,
      easing: "easeInOutQuad",
      boxShadow: [
        "0 0 10px rgba(243, 139, 168, 0.5)",
        "0 0 30px rgba(235, 50, 80, 0.8)",
        "0 0 20px rgba(235, 50, 80, 0.7)",
      ],
    });

    setGlitchEffect(true);
    setTimeout(() => setGlitchEffect(false), 300);
  }, []);

  useEffect(() => {
    if (!containerRef.current) return;
    onInit();

    const typingInterval = setInterval(() => {
      setCodeProgress((prev) => {
        if (prev < codeLines.length - 1) return prev + 1;
        clearInterval(typingInterval);
        return prev;
      });
    }, CODE_TYPING_INTERVAL);

    const glitchInterval = setInterval(() => {
      if (Math.random() > 0.7) {
        setGlitchEffect(true);
        setTimeout(() => setGlitchEffect(false), 150);
      }
    }, GLITCH_INTERVAL);

    const timer = setTimeout(() => {
      setStage("notice");
    }, SWITCH_TO_NOTICE_STAGE);

    return () => {
      clearTimeout(timer);
      clearInterval(glitchInterval);
      clearInterval(typingInterval);
    };
  }, [setStage, onInit]);

  useEffect(() => {
    let timer: NodeJS.Timeout;

    switch (stage) {
      case "notice":
        onNotice();
        timer = setTimeout(() => setStage("alarm"), SWITCH_TO_ALARM_STAGE);
        break;

      case "alarm":
        onAlarm();
        timer = setTimeout(() => setStage("panic"), SWITCH_TO_PANIC_STAGE);
        break;

      case "panic":
        onPanic();
        // timer = setTimeout(() => {
        //   const transitionFlash = document.createElement("div");
        //   transitionFlash.className =
        //     "transition-flash fixed inset-0 z-50 bg-white";
        //   document.body.appendChild(transitionFlash);

        //   anime({
        //     targets: transitionFlash,
        //     opacity: [0, 0.95, 0],
        //     duration: 800,
        //     easing: "easeInOutQuad",
        //     complete: () => {
        //       document.body.removeChild(transitionFlash);
        //       anime({
        //         targets: containerRef.current,
        //         opacity: [1, 0],
        //         duration: 600,
        //         easing: "easeInOutQuad",
        //       });
        //     },
        //   });
        // }, SWITCH_TO_COMPLETE_STAGE);
        break;
    }

    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [stage, onComplete, setStage, onNotice, onAlarm, onPanic]);

  const handleTransitionToPanic = () => {
    anime({
      targets: containerRef.current,
      opacity: [1, 0],
      duration: 600,
      easing: "easeInOutQuad",
      complete: onComplete,
    });
  };

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative w-full h-full overflow-hidden transition-all duration-500 ease-in-out",
        sceneBackgroundColor,
        glitchEffect && "glitch-effect"
      )}
    >
      {/* Background color overlay */}
      <div
        ref={overlayRef}
        className="absolute inset-0 z-0 opacity-0 transition-all duration-300 ease-in-out bg-[rgba(243,139,168,0.2)]"
      />

      {/* Ambient grid background */}
      <div className="absolute inset-0 bg-grid opacity-20 z-0"></div>
      <div className="absolute inset-0 pointer-events-none z-10 opacity-60 bg-gradient-radial from-transparent to-black"></div>

      {/* Particle effects */}
      <div className="absolute inset-0 z-5">
        {[...Array(20)].map((_, i) => (
          <div
            key={`particle-${i}`}
            className={cn(
              "absolute rounded-full",
              stage === "working" && "bg-[rgba(137,180,250,0.3)]",
              stage === "notice" && "bg-[rgba(249,226,175,0.3)]",
              stage === "alarm" && "bg-[rgba(243,139,168,0.3)]",
              stage === "panic" && "bg-[rgba(235,50,80,0.4)]"
            )}
            style={{
              width: `${Math.random() * 6 + 2}px`,
              height: `${Math.random() * 6 + 2}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              opacity: Math.random() * 0.7 + 0.3,
              animationDuration: `${Math.random() * 10 + 10}s`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          />
        ))}
      </div>

      {/* Character emoji */}
      <div
        ref={characterRef}
        className={cn(
          "fixed bottom-7 left-7 text-6xl z-20 transition-all duration-300",
          "filter drop-shadow-lg rounded-full p-2",
          emojiClass
        )}
      >
        {emoji}
      </div>

      {/* Code editor window */}
      {showCodeWindow && <CodeEditor codeProgress={codeProgress} />}

      {/* Visitor alert component */}
      <VisitorAlert
        stage={stage}
        onTransitionToPanic={handleTransitionToPanic}
      />

      {/* Status indicators based on stage */}
      {stage !== "working" && (
        <div
          className={cn(
            "fixed top-5 right-5 z-30 flex items-center gap-3 px-4 py-2 rounded-full",
            stage === "notice" &&
              "bg-[rgba(249,226,175,0.2)] border border-[#f9e2af] text-[#f9e2af]",
            stage === "alarm" &&
              "bg-[rgba(243,139,168,0.2)] border border-[#f38ba8] text-[#f38ba8] animate-pulse",
            stage === "panic" &&
              "bg-[rgba(235,50,80,0.3)] border border-[#eb3250] text-[#eb3250] animate-bounce"
          )}
        >
          <div
            className={cn(
              "w-2 h-2 rounded-full",
              stage === "notice" && "bg-[#f9e2af]",
              stage === "alarm" && "bg-[#f38ba8]",
              stage === "panic" && "bg-[#eb3250]"
            )}
          ></div>
          <div className="text-sm font-bold tracking-wider">
            {stage === "notice" && "VISITOR DETECTED"}
            {stage === "alarm" && "ALERT: PORTFOLIO INCOMPLETE"}
            {stage === "panic" && "CRITICAL: URGENT ACTION REQUIRED"}
          </div>
        </div>
      )}

      {/* Progress indicator */}
      {stage !== "working" && (
        <div className="fixed bottom-5 right-5 z-30 w-32">
          <div className="text-xs text-right mb-1 font-semibold text-[#cdd6f4]">
            {stage === "notice" && "CONCERN LEVEL: 33%"}
            {stage === "alarm" && "CONCERN LEVEL: 66%"}
            {stage === "panic" && "CONCERN LEVEL: 100%"}
          </div>
          <div className="h-2 bg-[#313244] rounded-full overflow-hidden">
            <div
              className={cn(
                "h-full transition-all duration-1000 ease-in-out rounded-full",
                stage === "notice" && "w-1/3 bg-[#f9e2af]",
                stage === "alarm" && "w-2/3 bg-[#f38ba8]",
                stage === "panic" && "w-full bg-[#eb3250]"
              )}
            ></div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RealizationScene;
