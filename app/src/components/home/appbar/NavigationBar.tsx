import React, { useState } from "react";
import Logo from "../../base/Logo";
import GithubRepoButton from "./GithubRepoButton";
import DownloadCvButton from "./DownloadCvButton";

const NavigationBar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
        <div className="w-full sm:w-auto flex justify-between items-center">
          <Logo />
          <button
            className="sm:hidden text-slate-300 hover:text-white"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle navigation menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        <ul
          className={`${
            isMenuOpen ? "flex" : "hidden"
          } sm:flex flex-col sm:flex-row w-full sm:w-auto gap-2 sm:gap-4 md:gap-6 lg:gap-8`}
        >
          {navigationItems.map((item) => (
            <li key={item} className="w-full sm:w-auto text-center">
              <button
                onClick={() => {
                  scrollToSection(item);
                  setIsMenuOpen(false);
                }}
                className="w-full text-slate-300 hover:text-white font-semibold transition-colors duration-200 text-sm px-3 py-2 sm:py-1"
              >
                {item.charAt(0).toUpperCase() + item.slice(1)}
              </button>
            </li>
          ))}
        </ul>

        <div
          className={`${
            isMenuOpen ? "flex" : "hidden"
          } sm:flex gap-2 w-full sm:w-auto justify-center`}
        >
          <DownloadCvButton />
          <GithubRepoButton />
        </div>
      </div>
    </div>
  );
};

export default NavigationBar;
