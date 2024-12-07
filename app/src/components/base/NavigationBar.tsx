import React from "react";
import { Button } from "@/components/ui/button";
import { DownloadIcon } from "lucide-react";
import Logo from "./Logo";

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
                className="w-full sm:w-auto text-slate-300 hover:text-white transition-colors duration-200 text-xs sm:text-sm font-medium px-2 py-1 sm:px-3"
              >
                {item.charAt(0).toUpperCase() + item.slice(1)}
              </button>
            </li>
          ))}
        </ul>
        <Button className="w-full sm:w-auto rounded-full px-4 sm:px-6 md:px-8 py-2 bg-gradient-to-r from-purple-500 to-blue-500 hover:opacity-90 transition-opacity duration-200 text-xs sm:text-sm font-medium shadow-lg shadow-purple-500/20">
          <DownloadIcon className="mr-2 h-4 w-4" />
          Download CV
        </Button>
      </div>
    </div>
  );
};

export default NavigationBar;
