import React from "react";
import { Button } from "@/components/ui/button";
import { FiDownload } from "react-icons/fi";
import { FaGithub } from "react-icons/fa";
import Logo from "./Logo";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const NavigationBar: React.FC = () => {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({ behavior: "smooth" });
  };

  const navigationItems = [
    "home",
    "about",
    "projects",
    "skills",
    "work",
    "articles",
    "contact",
  ];

  return (
    <div className="fixed top-0 w-full bg-slate-950/95 backdrop-blur-sm border-b border-slate-900 z-50">
      <div className="max-w-7xl p-6 flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-0">
        <Logo />
        <ul className="flex flex-wrap justify-center w-full sm:w-auto gap-2 sm:gap-4 md:gap-6 lg:gap-8">
          {navigationItems.map((item) => (
            <li key={item} className="w-1/3 sm:w-auto text-center">
              <button
                onClick={() => scrollToSection(item)}
                className="w-full sm:w-auto text-slate-300 hover:text-white font-semibold transition-colors duration-200 text-xs sm:text-sm  px-2 py-1 sm:px-3"
              >
                {item.charAt(0).toUpperCase() + item.slice(1)}
              </button>
            </li>
          ))}
        </ul>
        <div className="flex gap-2 w-full sm:w-auto">
          <Button
            onClick={() =>
              window.open(
                "https://ybyhphtolmvomxzjridt.supabase.co/storage/v1/object/public/Resume/Utkarsh_Priyadarshi_Resume.pdf?t=2025-01-03T20%3A37%3A04.739Z"
              )
            }
            className="w-full sm:w-auto rounded-full 
            px-4 sm:px-6 md:px-8 py-2.5
            bg-gradient-to-r from-violet-600 to-indigo-600
            hover:from-violet-500 hover:to-indigo-500
            text-white font-semibold text-xs sm:text-sm
            transition-all duration-300 ease-out
            shadow-lg shadow-indigo-500/30
            border border-indigo-400/30
            flex items-center justify-center gap-2"
          >
            <FiDownload className="h-4 w-4 text-slate-900" />
            <span className="hidden sm:inline text-slate-900">Download CV</span>
          </Button>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  onClick={() =>
                    window.open("https://github.com/utkarsh5026/Portfolio")
                  }
                  variant="ghost"
                  size="icon"
                  className="rounded-full"
                >
                  <FaGithub className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>View GitHub Repository</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>
    </div>
  );
};

export default NavigationBar;
