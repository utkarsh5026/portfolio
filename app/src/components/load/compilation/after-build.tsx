import React from "react";
import Logo from "@/components/home/appbar/Logo";

const AfterBuild: React.FC = () => {
  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden w-full bg-gradient-to-b from-slate-900 to-black">
      {/* Main light hole at the top */}
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-20 h-10 sm:w-32 sm:h-16">
        <div className="w-full h-full bg-gradient-radial from-white via-[#89b4fa] to-transparent opacity-80 blur-sm"></div>
      </div>

      {/* Light rays emanating from the hole */}
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-full h-full">
        <div
          className="w-full h-full opacity-60"
          style={{
            background: `conic-gradient(from 180deg at 50% 0%, 
              transparent 0deg, 
              rgba(137, 180, 250, 0.3) 30deg, 
              rgba(137, 180, 250, 0.5) 60deg, 
              rgba(137, 180, 250, 0.3) 90deg, 
              transparent 120deg, 
              transparent 240deg, 
              rgba(137, 180, 250, 0.3) 270deg, 
              rgba(137, 180, 250, 0.5) 300deg, 
              rgba(137, 180, 250, 0.3) 330deg, 
              transparent 360deg)`,
          }}
        ></div>
      </div>

      {/* Secondary softer light rays */}
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-full h-full">
        <div
          className="w-full h-full opacity-30 animate-pulse"
          style={{
            background: `conic-gradient(from 200deg at 50% 0%, 
              transparent 0deg, 
              rgba(203, 166, 247, 0.2) 45deg, 
              rgba(116, 199, 236, 0.3) 90deg, 
              rgba(203, 166, 247, 0.2) 135deg, 
              transparent 180deg, 
              transparent 180deg, 
              rgba(203, 166, 247, 0.2) 225deg, 
              rgba(116, 199, 236, 0.3) 270deg, 
              rgba(203, 166, 247, 0.2) 315deg, 
              transparent 360deg)`,
          }}
        ></div>
      </div>

      {/* Subtle volumetric lighting */}
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-64 sm:w-96 h-full">
        <div className="w-full h-full bg-gradient-to-b from-[#89b4fa]/20 via-[#89b4fa]/5 to-transparent blur-xl"></div>
      </div>

      {/* Content with enhanced lighting */}
      <div className="relative z-10 flex flex-col items-center px-4">
        <div className="scale-125 sm:scale-2 mb-6 sm:mb-12 transition-all duration-1000 filter drop-shadow-[0_0_30px_rgba(137,180,250,0.8)]">
          <Logo />
        </div>
        <div className="text-lg sm:text-xl font-mono mt-4 sm:mt-8 w-full max-w-sm sm:max-w-none">
          <div className="px-4 py-3 sm:px-8 sm:py-4 rounded-lg backdrop-blur-sm bg-black/20 border border-[#89b4fa]/30 text-center">
            <span className="bg-gradient-to-r from-white via-[#89b4fa] to-[#cba6f7] bg-clip-text text-transparent font-semibold">
              Welcome to my portfolio ❤️
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AfterBuild;
