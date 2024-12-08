import React, { useEffect } from "react";
import anime from "animejs";

const CursorTrail: React.FC = () => {
  useEffect(() => {
    const createParticle = (x: number, y: number) => {
      // Array of gradient colors
      const colors = [
        "bg-gradient-to-r from-orange-500 to-pink-500",
        "bg-gradient-to-r from-pink-500 to-purple-500",
        "bg-gradient-to-r from-purple-500 to-orange-500",
      ];

      for (let i = 0; i < 3; i++) {
        const particle = document.createElement("div");
        // Apply random gradient from our colors array
        const randomGradient =
          colors[Math.floor(Math.random() * colors.length)];
        particle.className = `fixed w-1.5 h-1.5 rounded-full ${randomGradient} pointer-events-none`;
        particle.style.left = `${x}px`;
        particle.style.top = `${y}px`;
        document.body.appendChild(particle);

        anime({
          targets: particle,
          opacity: [1, 0],
          scale: [1, 0],
          translateX: anime.random(-100, 100),
          translateY: anime.random(-100, 100),
          duration: anime.random(1500, 2500),
          easing: "easeOutExpo",
          complete: () => particle.remove(),
        });
      }
    };

    let throttleTimer: number;
    const handleMouseMove = (e: MouseEvent) => {
      if (throttleTimer) return;

      throttleTimer = window.setTimeout(() => {
        createParticle(e.clientX, e.clientY);
        throttleTimer = 0;
      }, 20);
    };

    document.addEventListener("mousemove", handleMouseMove);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return null;
};

export default CursorTrail;
