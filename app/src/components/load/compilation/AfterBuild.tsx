import React from "react";
import Logo from "@/components/home/appbar/Logo";

const AfterBuild: React.FC = () => {
  return (
    <div className="flex flex-col items-center">
      <div className="scale-2 mb-12 transition-all duration-1000 animate-pulse filter drop-shadow-[0_0_10px_rgba(137,180,250,0.5)]">
        <Logo />
      </div>
      <div className="text-[#cdd6f4] text-xl font-mono mt-8">
        <div className="flex items-center gap-2">
          <span>Welcome to my portfolio ❤️</span>
        </div>
      </div>
    </div>
  );
};

export default AfterBuild;
