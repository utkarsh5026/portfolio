import React, { useEffect, useRef } from "react";
import anime from "animejs";

const navigationItems = [
  "home",
  "about",
  "projects",
  "skills",
  "work",
  "articles",
  "contact",
];

interface NavigationMenuProps {
  isMenuOpen: boolean;
  setIsMenuOpen: (isMenuOpen: boolean) => void;
}

const NavigationMenu: React.FC<NavigationMenuProps> = ({
  isMenuOpen,
  setIsMenuOpen,
}) => {
  const menuRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    // Initial animation for all screen sizes
    anime({
      targets: ".nav-item",
      opacity: [0, 1],
      translateY: [20, 0],
      delay: anime.stagger(100),
      duration: 800,
      easing: "easeOutElastic(1, .5)",
    });

    // Mobile menu animation
    if (isMenuOpen) {
      anime({
        targets: ".nav-item.mobile-only",
        opacity: [0, 1],
        translateY: [20, 0],
        delay: anime.stagger(100),
        duration: 800,
        easing: "easeOutElastic(1, .5)",
      });
    }
  }, [isMenuOpen]);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({ behavior: "smooth" });
  };
  return (
    <ul
      ref={menuRef}
      className={`${
        isMenuOpen ? "flex" : "hidden"
      } sm:flex flex-col sm:flex-row w-full sm:w-auto gap-2 sm:gap-4 md:gap-6 lg:gap-8`}
    >
      {navigationItems.map((item) => (
        <li
          key={item}
          className={`w-full sm:w-auto text-center nav-item opacity-0 ${
            isMenuOpen ? "mobile-only" : ""
          }`}
        >
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
  );
};

export default NavigationMenu;
