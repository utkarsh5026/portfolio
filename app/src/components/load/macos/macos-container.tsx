import React, { useState, useEffect, useRef, useCallback } from "react";
import { cn } from "@/lib/utils";
import { formatDate, formatTime } from "./utils";
import { desktopIcons } from "./assets";
import DesktopIcon from "./desktop-icon";
import "./macos.css";
import MacOsDock from "./macos-dock";

type MacosAppOptions = {
  wallpaper?: string;
  showDock?: boolean;
  showMenuBar?: boolean;
  showDesktopIcons?: boolean;
  title?: string;
  activeAppIndex?: number;
  statusBarExtras?: React.ReactNode;
};

interface MacOSContainerProps {
  children: React.ReactNode;
  options: MacosAppOptions;
}

const MacOSContainer: React.FC<MacOSContainerProps> = ({
  children,
  options = {},
}) => {
  const {
    wallpaper = "macos-black.jpg",
    showDock = true,
    showMenuBar = true,
    showDesktopIcons = true,
    title = "macOS",
    activeAppIndex = -1,
    statusBarExtras,
  } = options;

  const [currentTime, setCurrentTime] = useState(new Date());
  const [batteryLevel, setBatteryLevel] = useState(100);
  const containerRef = useRef(null);

  const updateBatteryLevel = useCallback(() => {
    const intervalId = setInterval(() => {
      setBatteryLevel((prev) => (prev > 0 ? prev - 10 : 0));
    }, 1000);
    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    const clear = updateBatteryLevel();
    return () => clear();
  }, [updateBatteryLevel]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div
      ref={containerRef}
      className="macos-container max-h-screen w-full h-full overflow-hidden font-sans"
      style={{
        backgroundImage: wallpaper
          ? wallpaper.startsWith("url") || wallpaper.includes("gradient")
            ? wallpaper
            : `url(${wallpaper})`
          : undefined,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Only show default wallpaper if no wallpaper is provided */}
      {!wallpaper && (
        <div
          className="absolute inset-0 bg-gradient-to-br from-blue-900 via-purple-800 to-pink-800 z-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='2000' height='1000' xmlns='http://www.w3.org/2000/svg'%3E%3Cdefs%3E%3ClinearGradient id='a' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' stop-color='%23111827'/%3E%3Cstop offset='100%25' stop-color='%232e1065'/%3E%3C/linearGradient%3E%3CradialGradient id='b' cx='50%25' cy='50%25' r='50%25'%3E%3Cstop offset='0%25' stop-color='%235b21b6' stop-opacity='.5'/%3E%3Cstop offset='100%25' stop-color='%23000' stop-opacity='0'/%3E%3C/radialGradient%3E%3C/defs%3E%3Crect width='100%25' height='100%25' fill='url(%23a)'/%3E%3Ccircle cx='50%25' cy='50%25' r='80%25' fill='url(%23b)'/%3E%3C/svg%3E")`,
            backgroundSize: "cover",
          }}
        />
      )}

      {/* Spotlight effect */}
      <div className="spotlight"></div>

      {/* MacOS Top Menu Bar */}
      {showMenuBar && (
        <div className="macos-menubar absolute top-0 left-0 right-0 h-7 bg-black/20 backdrop-blur-md z-50 px-4 flex items-center justify-between text-white text-sm">
          {/* Left side - Apple logo and app menu */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-3">
              <svg
                viewBox="0 0 24 24"
                width="16"
                height="16"
                fill="currentColor"
              >
                <path d="M17.05,15.24c-.295.55-.646,1.056-1.053,1.516-.557.636-1.142.959-1.754.959-.611,0-1.149-.2-1.613-.6-.464-.4-.892-.6-1.283-.6-.408,0-.844.2-1.308.6-.464.4-1.01.6-1.638.6-.626,0-1.225-.339-1.797-1.018-.607-.714-1.101-1.54-1.483-2.479C5.363,12.62,5.1,11.245,5.1,9.928c0-1.158.271-2.159.814-3.003.543-.844,1.336-1.266,2.379-1.266.509,0,.969.132,1.378.396.409.264.736.396.985.396.28,0,.627-.146,1.042-.44.415-.293.906-.44,1.475-.44.95,0,1.71.385,2.278,1.155-.844.526-1.266,1.262-1.266,2.207,0,.9.331,1.646.991,2.238.33.296.699.526,1.107.688-.089.259-.192.518-.309.777l-.023.1ZM16.366,4.2c0,.072-.2.136-.59.193-.4.058-.8.1-.118.123-.49.04-.128.083-.237.129-.109.046-.211.076-.306.091-.095.015-.204.028-.328.04-.124.011-.235.016-.334.016-.015-.135-.023-.306-.023-.511,0-.485.123-.935.371-1.347.247-.413.577-.723.99-.929.413-.206.799-.311,1.158-.316.01.155.021.307.032.457.01.149.016.318.016.505,0,.187-.5.334-.18.443-.12.108-.33.214-.63.318-.31.104-.71.206-.121.307-.51.1-.85.185-.102.255-.17.07-.39.143-.066.22l-.32.006Z" />
              </svg>
              <span className="font-semibold">{title}</span>
              <span>File</span>
              <span>Edit</span>
              <span>View</span>
              <span>Go</span>
              <span>Window</span>
              <span>Help</span>
            </div>
          </div>

          {/* Right side - System indicators */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              {statusBarExtras && statusBarExtras}
              <svg
                viewBox="0 0 24 24"
                width="16"
                height="16"
                fill="currentColor"
              >
                <path d="M12 5.5a6.5 6.5 0 0 0-6.5 6.5c0 3.591 2.909 6.5 6.5 6.5s6.5-2.909 6.5-6.5-2.909-6.5-6.5-6.5zm0 11.25a4.75 4.75 0 1 1 0-9.5 4.75 4.75 0 0 1 0 9.5z" />
                <path d="M12 3.5a8.5 8.5 0 1 0 0 17 8.5 8.5 0 0 0 0-17zm0 15.25a6.75 6.75 0 1 1 0-13.5 6.75 6.75 0 0 1 0 13.5z" />
              </svg>
              <svg
                viewBox="0 0 24 24"
                width="16"
                height="16"
                fill="currentColor"
              >
                <path d="M6.343 6.343a8 8 0 0 1 11.314 0l-1.414 1.414a6 6 0 0 0-8.486 0L6.343 6.343zm-2.828 2.828a12 12 0 0 1 16.97 0l-1.414 1.414a10 10 0 0 0-14.142 0L3.515 9.17zm5.656 5.656a4 4 0 0 1 5.657 0l-1.414 1.414a2 2 0 0 0-2.829 0l-1.414-1.414zM12 21l4-4h-8l4 4z" />
              </svg>
              <span>{formatDate(currentTime)}</span>
              <span>{formatTime(currentTime)}</span>
              <div className="flex items-center">
                <span className="mr-1">{batteryLevel}%</span>
                <div className="battery-indicator">
                  <div
                    className={cn(
                      "battery-level",
                      batteryLevel > 50
                        ? "battery-high"
                        : batteryLevel > 20
                        ? "battery-medium"
                        : "battery-low"
                    )}
                    style={{ width: `${(batteryLevel / 100) * 5}px` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main content area - this is where children will be rendered */}
      <div
        className={cn(
          "relative w-full transition-all duration-300 ease-in-out h-full",
          showMenuBar && "mt-7",
          showDock && "mb-16"
        )}
      >
        {children}
      </div>

      {showDesktopIcons && (
        <div className="absolute top-10 right-6 flex flex-col gap-5">
          {desktopIcons.map((icon) => (
            <DesktopIcon
              key={`desktop-icon-${icon.label}`}
              icon={icon.icon}
              label={icon.label}
            />
          ))}
        </div>
      )}

      {/* Finder icon */}
      {showDesktopIcons && (
        <div className="absolute bottom-24 left-5 z-10">
          <div className="group p-3 bg-white/5 backdrop-blur-sm rounded-lg hover:bg-white/10 transition-colors cursor-pointer">
            <svg
              width="48"
              height="48"
              viewBox="0 0 24 24"
              fill="white"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M12 2L6.5 11H17.5L12 2ZM12 5.84L13.93 9H10.06L12 5.84ZM17.5 13C15.01 13 13 15.01 13 17.5C13 19.99 15.01 22 17.5 22C19.99 22 22 19.99 22 17.5C22 15.01 19.99 13 17.5 13ZM17.5 20C16.12 20 15 18.88 15 17.5C15 16.12 16.12 15 17.5 15C18.88 15 20 16.12 20 17.5C20 18.88 18.88 20 17.5 20ZM3 13.5H11V15.5H3V13.5ZM3 17.5H11V19.5H3V17.5Z" />
            </svg>
            <div className="absolute mt-2 left-1/2 transform -translate-x-1/2 px-2 py-1 bg-black/70 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
              Finder
            </div>
          </div>
        </div>
      )}

      {/* MacOS Dock */}
      {showDock && <MacOsDock activeAppIndex={activeAppIndex} />}
    </div>
  );
};

export default MacOSContainer;
