import React, { useState } from "react";
import Logo from "./Logo";
import GithubRepoButton from "./GithubRepoButton";
import DownloadCvButton from "./DownloadCvButton";
import NavigationMenu from "./NavigationMenu";

const NavigationBar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="fixed top-0 w-full bg-slate-950/95 backdrop-blur-sm border-b border-slate-900 z-50">
      <div className="max-w-7xl p-6 flex flex-col sm:flex-row items-center gap-4 sm:gap-0">
        <div className="w-full sm:w-auto flex justify-between items-center self-start">
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

        <NavigationMenu isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
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
