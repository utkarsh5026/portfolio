import React, { useState, useEffect, useRef, useCallback } from "react";
import anime from "animejs";
import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { messages } from "./content";
import {
  MESSAGE_APPEAR_INTERVAL,
  CURTAIN_DURATION,
  VISITOR_INIT_DELAY,
} from "./timings";

interface VisitorAlertProps {
  stage: "working" | "notice" | "alarm" | "panic";
  onTransitionToPanic: () => void;
}

const VisitorAlert: React.FC<VisitorAlertProps> = ({
  stage,
  onTransitionToPanic,
}) => {
  const alertRef = useRef<HTMLDivElement>(null);
  const [currentMessageIndex, setCurrentMessageIndex] = useState<number>(0);
  const [showCurtain, setShowCurtain] = useState<boolean>(false);
  const [visitorData, setVisitorData] = useState({
    ip: "178.32.xx.xx",
    location: "Unknown Location",
    device: "Desktop",
    browser: getBrowserInfo(),
    visits: 1,
    timeSpent: "00:12",
    screenSize: `${window.screen.width}x${window.screen.height}`,
    language: navigator.language,
    timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    colorDepth: window.screen.colorDepth,
  });

  const handlePanicState = useCallback(() => {
    const timer = setInterval(() => {
      setVisitorData((prev) => ({
        ...prev,
        timeSpent: `00:${parseInt(prev.timeSpent.split(":")[1]) + 1}`,
        visits: prev.visits + (Math.random() > 0.7 ? 1 : 0),
      }));
    }, 1000);

    // Trigger curtain reveal transition after a delay
    const curtainTimer = setTimeout(() => {
      setShowCurtain(true);
      anime({
        targets: ".curtain-left, .curtain-right",
        translateX: function (el: HTMLElement) {
          return el.classList.contains("curtain-left") ? "-100%" : "100%";
        },
        easing: "easeInOutExpo",
        duration: CURTAIN_DURATION,
        complete: onTransitionToPanic,
      });
    }, 100);

    return () => {
      clearTimeout(curtainTimer);
      clearInterval(timer);
    };
  }, [onTransitionToPanic]);

  useEffect(() => {
    const i = currentMessageIndex;

    if (stage === "notice" && i < 1) setCurrentMessageIndex(1);
    else if (stage === "alarm" && i < 3) setCurrentMessageIndex(3);
    else if (stage === "panic") {
      setCurrentMessageIndex(messages.length);
      const clearInterval = handlePanicState();
      return () => clearInterval();
    }
  }, [stage, currentMessageIndex, onTransitionToPanic, handlePanicState]);

  // Auto-progress messages
  useEffect(() => {
    if (stage !== "working" && currentMessageIndex < messages.length) {
      const timer = setTimeout(() => {
        setCurrentMessageIndex((prev) => Math.min(prev + 1, messages.length));
      }, MESSAGE_APPEAR_INTERVAL);
      return () => clearTimeout(timer);
    }
  }, [currentMessageIndex, stage]);

  // Initial appear animation
  useEffect(() => {
    if (alertRef.current && stage !== "working") {
      anime({
        targets: alertRef.current,
        translateY: [30, 0],
        opacity: [0, 1],
        duration: VISITOR_INIT_DELAY,
        easing: "easeOutQuad",
      });
    }
  }, [stage]);

  // Helper function to get browser info

  if (stage === "working") return null;

  return (
    <>
      <Card
        ref={alertRef}
        className={cn(
          "fixed z-40 top-1/4 left-1/3 transform -translate-x-1/2 -translate-y-1/2",
          "max-w-xl w-full rounded-xl border-2 shadow-2xl",
          stage === "notice" &&
            "bg-[rgba(30,30,46,0.85)] backdrop-blur-md border-[rgba(137,180,250,0.3)]",
          stage === "alarm" &&
            "bg-[rgba(30,30,46,0.9)] backdrop-blur-md border-[rgba(243,139,168,0.4)]",
          stage === "panic" &&
            "bg-[rgba(30,30,46,0.95)] backdrop-blur-md border-[rgba(235,50,80,0.6)]"
        )}
      >
        <div
          className={cn(
            "p-1 border-b",
            stage === "notice" &&
              "border-[rgba(137,180,250,0.3)] bg-[rgba(137,180,250,0.1)]",
            stage === "alarm" &&
              "border-[rgba(243,139,168,0.4)] bg-[rgba(243,139,168,0.1)]",
            stage === "panic" &&
              "border-[rgba(235,50,80,0.6)] bg-[rgba(235,50,80,0.2)]"
          )}
        >
          <div className="flex items-center justify-between px-4 py-2">
            <div className="flex items-center gap-2">
              <div
                className={cn(
                  "h-3 w-3 rounded-full",
                  stage === "notice" && "bg-[#89b4fa] animate-pulse",
                  stage === "alarm" && "bg-[#f38ba8] animate-pulse",
                  stage === "panic" && "bg-[#eb3250] animate-ping"
                )}
              />
              <div
                className={cn(
                  "font-bold text-sm uppercase tracking-wide",
                  stage === "notice" && "text-[#89b4fa]",
                  stage === "alarm" && "text-[#f38ba8]",
                  stage === "panic" && "text-[#eb3250]"
                )}
              >
                {stage === "notice" && "Visitor Detected"}
                {stage === "alarm" && "Warning: Unfinished Portfolio"}
                {stage === "panic" && "Critical Alert"}
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span
                className={cn(
                  "text-xs font-mono px-2 py-0.5 rounded",
                  stage === "notice" &&
                    "bg-[rgba(137,180,250,0.2)] text-[#89b4fa]",
                  stage === "alarm" &&
                    "bg-[rgba(243,139,168,0.2)] text-[#f38ba8]",
                  stage === "panic" &&
                    "bg-[rgba(235,50,80,0.3)] text-[#eb3250] animate-pulse"
                )}
              >
                LIVE
              </span>
              <button className="text-[#6c7086] hover:text-[#cdd6f4] transition-colors">
                ×
              </button>
            </div>
          </div>
        </div>

        <CardContent className="p-6">
          <div className="messages-container space-y-4">
            {messages.slice(0, currentMessageIndex).map((message, index) => (
              <div
                key={message}
                className={cn(
                  "message-bubble p-4 rounded-lg animate-fadeIn border border-opacity-30 transition-all duration-500",
                  index % 2 === 0
                    ? "bg-[rgba(137,180,250,0.1)] border-[#89b4fa] border-opacity-30"
                    : "bg-[rgba(243,139,168,0.1)] border-[#f38ba8] border-opacity-30 ml-auto max-w-[85%]"
                )}
                style={{
                  animationDelay: `${index * 0.15}s`,
                }}
              >
                <p
                  className={cn(
                    "text-lg font-medium",
                    index % 2 === 0 ? "text-[#cdd6f4]" : "text-[#f5c2e7]",
                    stage === "panic" &&
                      index === messages.length - 1 &&
                      "font-bold animate-pulse"
                  )}
                >
                  {message}
                </p>
              </div>
            ))}
          </div>

          {/* Visitor analytics panel */}
          {(stage === "alarm" || stage === "panic") && (
            <div className="visitor-analytics mt-6 border rounded-lg overflow-hidden">
              <div
                className={cn(
                  "py-2 px-4 text-sm font-semibold",
                  stage === "alarm"
                    ? "bg-[rgba(243,139,168,0.1)] border-b border-[rgba(243,139,168,0.2)]"
                    : "bg-[rgba(235,50,80,0.2)] border-b border-[rgba(235,50,80,0.3)]"
                )}
              >
                <div className="flex justify-between items-center">
                  <span className="text-[#cdd6f4]">Visitor Analytics</span>
                  <span
                    className={cn(
                      "text-xs px-2 py-0.5 rounded-full",
                      stage === "alarm"
                        ? "bg-[rgba(243,139,168,0.2)] text-[#f38ba8]"
                        : "bg-[rgba(235,50,80,0.3)] text-[#eb3250] animate-pulse"
                    )}
                  >
                    {stage === "alarm" ? "Watching" : "Active"}
                  </span>
                </div>
              </div>

              <div className="bg-[rgba(30,30,46,0.5)] p-4 grid grid-cols-2 gap-4">
                <div className="visitor-stat">
                  <div className="text-xs text-[#a6adc8]">IP Address</div>
                  <div className="text-sm text-[#cdd6f4] font-mono">
                    {visitorData.ip}
                  </div>
                </div>
                <div className="visitor-stat">
                  <div className="text-xs text-[#a6adc8]">Location</div>
                  <div className="text-sm text-[#cdd6f4]">
                    {visitorData.location}
                  </div>
                </div>
                <div className="visitor-stat">
                  <div className="text-xs text-[#a6adc8]">Device</div>
                  <div className="text-sm text-[#cdd6f4]">
                    {visitorData.device}
                  </div>
                </div>
                <div className="visitor-stat">
                  <div className="text-xs text-[#a6adc8]">Browser</div>
                  <div className="text-sm text-[#cdd6f4]">
                    {visitorData.browser}
                  </div>
                </div>
                <div className="visitor-stat">
                  <div className="text-xs text-[#a6adc8]">Screen Size</div>
                  <div className="text-sm text-[#cdd6f4]">
                    {visitorData.screenSize}
                  </div>
                </div>
                <div className="visitor-stat">
                  <div className="text-xs text-[#a6adc8]">Language</div>
                  <div className="text-sm text-[#cdd6f4]">
                    {visitorData.language}
                  </div>
                </div>
                <div className="visitor-stat">
                  <div className="text-xs text-[#a6adc8]">Time Zone</div>
                  <div className="text-sm text-[#cdd6f4]">
                    {visitorData.timeZone}
                  </div>
                </div>
                <div className="visitor-stat">
                  <div className="text-xs text-[#a6adc8]">Color Depth</div>
                  <div className="text-sm text-[#cdd6f4]">
                    {visitorData.colorDepth}
                  </div>
                </div>
                <div className="visitor-stat col-span-2">
                  <div className="flex justify-between">
                    <div>
                      <div className="text-xs text-[#a6adc8]">Time Spent</div>
                      <div
                        className={cn(
                          "text-sm font-mono",
                          stage === "panic"
                            ? "text-[#eb3250]"
                            : "text-[#f38ba8]"
                        )}
                      >
                        {visitorData.timeSpent}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-xs text-[#a6adc8]">Page Views</div>
                      <div
                        className={cn(
                          "text-sm font-mono",
                          stage === "panic"
                            ? "text-[#eb3250]"
                            : "text-[#f38ba8]"
                        )}
                      >
                        {visitorData.visits}
                      </div>
                    </div>
                  </div>

                  {/* Progress bar for time spent */}
                  <div className="mt-2 h-1.5 bg-[#313244] rounded-full overflow-hidden">
                    <div
                      className={cn(
                        "h-full transition-all duration-300 ease-out rounded-full",
                        stage === "alarm" ? "bg-[#f38ba8]" : "bg-[#eb3250]"
                      )}
                      style={{
                        width: `${Math.min(
                          (parseInt(visitorData.timeSpent.split(":")[1]) / 60) *
                            100,
                          100
                        )}%`,
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {stage === "panic" && (
            <div className="panic-actions mt-6 flex flex-col gap-3">
              <div className="text-center py-2 px-4 bg-[rgba(235,50,80,0.2)] rounded-lg border border-[rgba(235,50,80,0.3)] animate-pulse">
                <span className="text-[#eb3250] font-bold">
                  EMERGENCY RESPONSE REQUIRED
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <Button
                  className="bg-[#eb3250] hover:bg-[#d21f3c] text-white border-none"
                  onClick={() => {
                    // Call the event to transition to PanicScene
                    anime({
                      targets: ".panic-button-active",
                      scale: [1, 1.05, 1],
                      backgroundColor: [
                        "rgb(235, 50, 80)",
                        "rgb(255, 100, 130)",
                        "rgb(235, 50, 80)",
                      ],
                      duration: 500,
                    });

                    setTimeout(() => setShowCurtain(true), 800);
                  }}
                >
                  <span className="panic-button-active">
                    Deploy Emergency Fix
                  </span>
                </Button>

                <Button
                  variant="outline"
                  className="border-[#6c7086] text-[#cdd6f4] hover:bg-[rgba(108,112,134,0.2)]"
                >
                  Close (Not Recommended)
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Realtime typing animation at the bottom when in alarm state */}
      {(stage === "alarm" || stage === "panic") && (
        <div className="fixed bottom-5 left-1/4 transform -translate-x-1/2 z-30 bg-[rgba(30,30,46,0.8)] backdrop-blur-sm p-3 rounded-lg border border-[rgba(243,139,168,0.3)] max-w-md w-full">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-[#313244] flex items-center justify-center text-lg">
              👤
            </div>
            <div className="flex-1">
              <div className="typing-indicator flex">
                <span
                  className="h-2 w-2 bg-[#f38ba8] rounded-full animate-bounce"
                  style={{ animationDelay: "0ms" }}
                ></span>
                <span
                  className="h-2 w-2 bg-[#f38ba8] rounded-full animate-bounce ml-1"
                  style={{ animationDelay: "200ms" }}
                ></span>
                <span
                  className="h-2 w-2 bg-[#f38ba8] rounded-full animate-bounce ml-1"
                  style={{ animationDelay: "400ms" }}
                ></span>
              </div>
              <div className="text-xs text-[#a6adc8] mt-1">
                Visitor is Waiting...
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Curtain reveal transition */}
      {showCurtain && (
        <div className="curtain-container fixed inset-0 z-50 pointer-events-none overflow-hidden">
          <div className="curtain-left absolute top-0 bottom-0 left-0 w-1/2 bg-[#eb3250] transform"></div>
          <div className="curtain-right absolute top-0 bottom-0 right-0 w-1/2 bg-[#eb3250] transform"></div>

          {/* Center text that appears during transition */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white font-bold text-3xl z-60 text-center whitespace-nowrap">
            PANIC MODE ACTIVATED
          </div>
        </div>
      )}
    </>
  );
};

function getBrowserInfo() {
  const ua = navigator.userAgent;
  let browserName = "Unknown";

  if (ua.indexOf("Chrome") > -1) browserName = "Chrome";
  else if (ua.indexOf("Safari") > -1) browserName = "Safari";
  else if (ua.indexOf("Firefox") > -1) browserName = "Firefox";
  else if (ua.indexOf("MSIE") > -1 || ua.indexOf("Trident") > -1)
    browserName = "IE";
  else if (ua.indexOf("Edge") > -1) browserName = "Edge";

  return browserName;
}

export default VisitorAlert;
