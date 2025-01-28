import React, { useState } from "react";
import Logo from "./Logo";
import GithubRepoButton from "./GithubRepoButton";
import DownloadCvButton from "./DownloadCvButton";
import NavigationMenu from "./NavigationMenu";
import MobileMenu from "./MobileMenu";

interface NavigationBarProps {
  activeSection: string;
  onNavClick: (section: string) => void;
}

const NavigationBar: React.FC<NavigationBarProps> = ({
  activeSection,
  onNavClick,
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="fixed top-0 w-full bg-slate-950/95 backdrop-blur-sm border-b border-slate-900 z-50">
      <div className="w-full mx-auto px-12 py-3 sm:py-4 flex flex-col sm:flex-row items-center gap-4 sm:gap-0">
        <div className="w-full sm:w-auto flex justify-between items-center">
          <Logo />
          <MobileMenu isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
        </div>

        <div className="hidden sm:flex flex-1 justify-center items-center">
          <div className="flex-1 max-w-[200px]" />
          <NavigationMenu
            activeSection={activeSection}
            onNavClick={onNavClick}
            isMenuOpen={isMenuOpen}
            setIsMenuOpen={setIsMenuOpen}
          />
          <div className="flex-1 flex justify-end gap-2 items-center">
            <DownloadCvButton />
            <GithubRepoButton />
          </div>
        </div>

        <div className="sm:hidden w-full">
          {isMenuOpen && (
            <>
              <NavigationMenu
                activeSection={activeSection}
                onNavClick={onNavClick}
                isMenuOpen={isMenuOpen}
                setIsMenuOpen={setIsMenuOpen}
              />
              <div className="flex flex-col gap-2 justify-center mt-4">
                <DownloadCvButton />
                <GithubRepoButton />
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default NavigationBar;
