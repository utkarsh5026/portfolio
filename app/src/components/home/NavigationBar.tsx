import React from "react";
import { Button } from "@/components/ui/button";
import { DownloadIcon } from "lucide-react";

const NavigationBar: React.FC = () => {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="fixed top-0  bg-slate-950/95 backdrop-blur-sm border-b border-slate-900 px-4 py-4 sm:p-6 z-50 border-2 w-3/4 mx-auto">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-0">
        <ul className="flex flex-wrap justify-center gap-4 sm:space-x-8 sm:gap-0">
          <li>
            <button
              onClick={() => scrollToSection("home")}
              className="text-slate-300 hover:text-white transition-colors duration-200 text-sm font-medium"
            >
              Home
            </button>
          </li>
          <li>
            <button
              onClick={() => scrollToSection("about")}
              className="text-slate-300 hover:text-white transition-colors duration-200 text-sm font-medium"
            >
              About
            </button>
          </li>
          <li>
            <button
              onClick={() => scrollToSection("projects")}
              className="text-slate-300 hover:text-white transition-colors duration-200 text-sm font-medium"
            >
              Projects
            </button>
          </li>
          <li>
            <button
              onClick={() => scrollToSection("skills")}
              className="text-slate-300 hover:text-white transition-colors duration-200 text-sm font-medium"
            >
              Skills
            </button>
          </li>
          <li>
            <button
              onClick={() => scrollToSection("work")}
              className="text-slate-300 hover:text-white transition-colors duration-200 text-sm font-medium"
            >
              Work
            </button>
          </li>
          <li>
            <button
              onClick={() => scrollToSection("contact")}
              className="text-slate-300 hover:text-white transition-colors duration-200 text-sm font-medium"
            >
              Contact
            </button>
          </li>
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
