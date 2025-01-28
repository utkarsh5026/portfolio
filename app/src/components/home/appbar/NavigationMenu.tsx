import React, { useRef } from "react";
import navigationItems from "./navItems";

interface NavigationMenuProps {
  activeSection: string;
  onNavClick: (section: string) => void;
  isMenuOpen: boolean;
  setIsMenuOpen: (isMenuOpen: boolean) => void;
}

const NavigationMenu: React.FC<NavigationMenuProps> = ({
  activeSection,
  onNavClick,
  isMenuOpen,
  setIsMenuOpen,
}) => {
  const menuRef = useRef<HTMLUListElement>(null);

  return (
    <ul
      ref={menuRef}
      className={`${
        isMenuOpen ? "flex" : "hidden"
      } sm:flex flex-col sm:flex-row w-full sm:w-auto gap-2 sm:gap-4 md:gap-6 lg:gap-8`}
    >
      {navigationItems.map((item) => (
        <li key={item} className="w-full sm:w-auto text-center">
          <button
            onClick={() => {
              onNavClick(item);
              setIsMenuOpen(false);
            }}
            className={`w-full text-slate-300 hover:text-white font-semibold transition-colors duration-200 text-sm px-3 py-2 sm:py-1 
              ${
                activeSection === item
                  ? "text-white border-b-2 border-white"
                  : ""
              }`}
          >
            {item.charAt(0).toUpperCase() + item.slice(1)}
          </button>
        </li>
      ))}
    </ul>
  );
};

const NavigationMenuComponent = React.memo(NavigationMenu);
export default NavigationMenuComponent;
