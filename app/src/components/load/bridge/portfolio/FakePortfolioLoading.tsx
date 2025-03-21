import React, { useState, useEffect, useMemo } from "react";
import { cn } from "@/lib/utils";
import styles from "./FakePortfolio.module.css";

const loadingMessages = [
  "Preparing portfolio...",
  "Loading projects...",
  "Optimizing images...",
  "Finalizing layout...",
  "Launching rocket...",
  "Almost ready...",
];

interface FakePortfolioLoadingProps {
  onComplete: () => void;
  duration: number;
}

/**
 * FakePortfolioLoading Component
 *
 * An enhanced dark-themed loading component that displays a professional portfolio
 * loading screen with improved animations and a rocket launch effect.
 *
 * Features:
 * - Animated progress bar with gradient effects
 * - Dynamic loading messages that change over time
 * - Rocket animation that launches when loading is nearly complete
 * - Particle and glow effects that increase in intensity as loading progresses
 * - Portfolio preview elements with animations
 *
 * @param {Function} onComplete - Callback function to execute when loading completes
 * @param {number} duration - Total duration of the loading animation in milliseconds
 */
const FakePortfolioLoading: React.FC<FakePortfolioLoadingProps> = React.memo(
  ({ onComplete, duration }) => {
    /**
     * State to track the current progress percentage (0-100)
     */
    const [progress, setProgress] = useState(0);

    /**
     * State to track the current loading message displayed to the user
     */
    const [loadingText, setLoadingText] = useState("Preparing portfolio...");

    /**
     * State to track whether the rocket has been launched
     * Controls the rocket animation transition
     */
    const [rocketLaunched, setRocketLaunched] = useState(false);

    /**
     * Memoized value that determines the color of the progress text
     * Changes color based on the current progress percentage
     */
    const progressText = useMemo(() => {
      if (progress < 20) return "text-gray-500";
      else if (progress < 50) return "text-blue-400";
      else if (progress < 70) return "text-purple-400";
      else return "text-cyan-300";
    }, [progress]);

    /**
     * Effect to handle the loading animation sequence
     *
     * - Increments the progress bar at varying speeds
     * - Cycles through loading messages at timed intervals
     * - Triggers the rocket launch animation
     * - Calls onComplete callback when loading finishes
     */
    useEffect(() => {
      const messageTimeouts: NodeJS.Timeout[] = [];
      const progressInterval = setInterval(() => {
        setProgress((prev) => {
          let increment;
          if (prev < 40) increment = 1.5;
          else if (prev < 70) increment = 0.8;
          else if (prev < 85) increment = 0.2;
          else if (prev < 95) increment = 0.7;
          else increment = 1.2;

          return Math.min(100, prev + increment);
        });
      }, duration / 100);

      loadingMessages.forEach((message, index) => {
        const randomOffset = Math.random() * 200 - 100;
        const messageTime =
          (duration / loadingMessages.length) * index + randomOffset;

        const timeout = setTimeout(() => {
          setLoadingText(message);
          if (message === "Launching rocket...") {
            setRocketLaunched(true);
          }
        }, messageTime);

        messageTimeouts.push(timeout);
      });

      const completionTimeout = setTimeout(() => {
        if (onComplete) onComplete();
      }, duration);

      messageTimeouts.push(completionTimeout);

      return () => {
        clearInterval(progressInterval);
        messageTimeouts.forEach((timeout) => clearTimeout(timeout));
      };
    }, [duration, onComplete]);

    return (
      <div className="fixed inset-0 bg-gray-900 flex flex-col items-center justify-center z-50 overflow-hidden">
        {/* Woosh effect elements that move across the screen */}
        {progress > 50 && (
          <>
            <div
              className={`absolute w-20 h-3 bg-cyan-500 opacity-30 rounded-full blur-md ${styles.wooshLeft} top-[30%] left-[60%]`}
            ></div>
            <div
              className={`absolute w-32 h-2 bg-purple-500 opacity-20 rounded-full blur-md ${styles.wooshRight} top-[40%] right-[55%]`}
            ></div>
            <div
              className={`absolute w-16 h-4 bg-blue-500 opacity-25 rounded-full blur-md ${styles.wooshLeft} top-[65%] left-[40%]`}
            ></div>
          </>
        )}

        {/* Portfolio logo/icon with enhanced glow and motion effects */}
        <div className="mb-8 relative">
          <div className="w-32 h-32 bg-gradient-to-r from-blue-600 to-purple-700 rounded-lg shadow-lg flex items-center justify-center relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-700 opacity-50 animate-pulse"></div>
            <span className="text-white text-2xl font-bold relative z-10">
              u.me
            </span>
          </div>
          <div className="absolute inset-0 bg-blue-500 rounded-lg filter blur-xl opacity-30 animate-pulse"></div>
        </div>

        {/* Loading text with fade effect */}
        <h2 className="text-gray-100 text-xl font-medium mb-6 transition-opacity duration-300">
          {loadingText}
        </h2>

        {/* Progress bar with enhanced gradient, glow and particles */}
        <div className="w-64 h-3 bg-gray-800 rounded-full overflow-hidden mb-8 relative">
          <div
            className="h-full bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-600 transition-all duration-300 ease-out relative"
            style={{ width: `${progress}%` }}
          ></div>

          {/* Enhanced glow effect */}
          <div
            className={cn(
              "absolute top-0 h-full bg-white opacity-30 transition-all duration-300 blur-sm",
              `w-[${progress - 7.5}%]`,
              {
                hidden: progress < 7.5,
                block: progress >= 7.5,
              }
            )}
          ></div>

          {/* Secondary glow effect */}
          <div
            className="absolute top-0 h-full bg-cyan-300 opacity-20 transition-all duration-700 blur-md w-[25px]"
            style={{
              left: `${progress - 12.5}%`,
              display: progress < 12.5 ? "none" : "block",
            }}
          ></div>
        </div>

        {/* Rocket animation */}
        <div className="relative h-32 w-32 mb-4">
          <div
            className={`absolute left-1/2 transform -translate-x-1/2 transition-all duration-1000 ease-out 
             ${!rocketLaunched ? styles.rocketVibrate : ""}`}
            style={{
              transitionTimingFunction: rocketLaunched
                ? "cubic-bezier(0.5, 0, 0.75, 0)"
                : "ease",
              transitionDuration: rocketLaunched ? "1.5s" : "0.3s",
            }}
          >
            <div className="text-6xl">🚀</div>
          </div>
        </div>

        {/* Portfolio preview elements with more dynamic animations */}
        <div className="flex space-x-6 mb-8">
          {["horizontal-bars", "simple-chart", "image-placeholder"].map(
            (name, i) => (
              <div
                key={`preview-${name}`}
                className="relative w-16 h-16 rounded-md bg-gradient-to-br from-gray-800 to-gray-700 overflow-hidden"
              >
                {/* Animated background */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br from-blue-500 to-purple-600 opacity-0 ${styles.fadeInOut}`}
                  style={{
                    animationDelay: `${i * 0.7}s`,
                  }}
                ></div>

                {/* Inner content with floating effect */}
                <div
                  className={`w-full h-full flex items-center justify-center relative ${styles.floatUpDown}`}
                  style={{
                    animationDelay: `${i * 0.3}s`,
                  }}
                >
                  {/* Content shape */}
                  {i === 1 && (
                    // First preview: horizontal bars
                    <div className="space-y-2 w-3/4">
                      <div className="h-1.5 bg-gray-300 rounded-full w-full opacity-60"></div>
                      <div className="h-1.5 bg-gray-300 rounded-full w-2/3 opacity-60"></div>
                      <div className="h-1.5 bg-gray-300 rounded-full w-1/2 opacity-60"></div>
                    </div>
                  )}
                  {i === 2 && (
                    <div className="flex items-end space-x-1 h-8">
                      {[40, 70, 50, 90, 60].map((h) => (
                        <div
                          key={h}
                          className={cn(
                            "w-1.5 bg-cyan-400 opacity-70 rounded-t",
                            `h-[${h}%]`
                          )}
                        ></div>
                      ))}
                    </div>
                  )}
                  {i === 0 && (
                    <div className="relative w-10 h-10 rounded bg-gray-600 overflow-hidden">
                      <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-br from-gray-500 to-transparent opacity-40"></div>
                      <div className="absolute bottom-1 right-1 w-2 h-2 bg-gray-400 rounded-full opacity-70"></div>
                    </div>
                  )}
                </div>
                <div
                  className={`absolute inset-0 border border-cyan-500 rounded-md opacity-0 ${styles.glowPulse}`}
                  style={{
                    animationDelay: `${i * 0.5}s`,
                  }}
                ></div>
              </div>
            )
          )}
        </div>
        {/* Loading details with dynamic styles and effects */}
        <div className="relative">
          <p
            className={cn(
              "text-lg font-mono transition-all duration-300",
              progressText
            )}
            style={{
              textShadow:
                progress > 70 ? "0 0 8px rgba(34, 211, 238, 0.4)" : "none",
              transform: `scale(${progress > 95 ? 1.1 : 1})`,
              letterSpacing: progress > 90 ? "0.05em" : "normal",
            }}
          >
            {progress < 100 ? `${Math.round(progress)}% complete` : "Ready!"}
          </p>
        </div>
      </div>
    );
  }
);

export default FakePortfolioLoading;
