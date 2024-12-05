import React from "react";
import { Button } from "@/components/ui/button";
import { DownloadIcon } from "lucide-react";

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
    <div className="fixed top-0  bg-slate-950/95 backdrop-blur-sm border-b border-slate-900 px-4 py-4 sm:p-6 z-50 border-2 w-3/4 mx-auto">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-0">
        <ul className="flex flex-wrap justify-center gap-4 sm:space-x-8 sm:gap-0">
          {navigationItems.map((item) => (
            <li key={item}>
              <button
                onClick={() => scrollToSection(item)}
                className="text-slate-300 hover:text-white transition-colors duration-200 text-sm font-medium"
              >
                {item.charAt(0).toUpperCase() + item.slice(1)}
              </button>
            </li>
          ))}
        </ul>

        <Button className="w-full sm:w-auto rounded-full px-6 sm:px-8 py-2 bg-gradient-to-r from-purple-500 to-blue-500 hover:opacity-90 transition-opacity duration-200 text-sm font-medium shadow-lg shadow-purple-500/20">
          <DownloadIcon className="mr-2 h-4 w-4" />
          Download CV
        </Button>
      </div>
    </div>
  );
};

export default NavigationBar;
