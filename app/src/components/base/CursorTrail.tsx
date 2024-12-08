import React, { useEffect } from "react";
import anime from "animejs";

const CursorTrail: React.FC = () => {
  useEffect(() => {
    const createParticle = (x: number, y: number) => {
      // Softer gradient colors
      const colors = [
        'bg-gradient-to-r from-orange-400/60 to-pink-400/60',
        'bg-gradient-to-r from-pink-400/60 to-purple-400/60',
        'bg-gradient-to-r from-purple-400/60 to-orange-400/60'
      ];

      // Create more particles but make them smaller
      for (let i = 0; i < 5; i++) {
        const particle = document.createElement("div");
        const randomGradient = colors[Math.floor(Math.random() * colors.length)];
        // Smaller particles with blur effect
        particle.className = `fixed w-1 h-1 rounded-full ${randomGradient} pointer-events-none blur-[0.5px]`;
        particle.style.left = `${x}px`;
        particle.style.top = `${y}px`;
        document.body.appendChild(particle);

        anime({
          targets: particle,
          opacity: [0.8, 0], // Start with lower opacity
          scale: [1.2, 0], // Slightly larger start for more "bloom" effect
          translateX: () => {
            const spread = anime.random(-60, 60);
            // Add slight curve to movement
            return spread + Math.sign(spread) * 20;
          },
          translateY: () => {
            // Particles tend to float upwards slightly
            return anime.random(-80, 30);
          },
          duration: anime.random(2000, 3000), // Longer duration for smoother feel
          easing: 'easeOutCubic', // Smoother easing
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
      }, 30); // Slightly longer throttle for more intentional trails
    };

    document.addEventListener("mousemove", handleMouseMove);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return null;
};

export default CursorTrail;