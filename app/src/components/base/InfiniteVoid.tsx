import React, { useEffect, useRef, memo } from "react";
import anime from "animejs";

interface DomainExpansionProps {
  onAnimationComplete?: () => void;
}

const VISUAL_EFFECTS = {
  sphereGradients: {
    red: `radial-gradient(circle, 
      rgba(180,20,20,1) 0%, 
      rgba(180,0,0,0.85) 35%,
      rgba(180,0,0,0.4) 65%,
      rgba(180,0,0,0) 100%
    )`,
    blue: `radial-gradient(circle, 
      rgba(0,100,200,1) 0%, 
      rgba(0,80,200,0.85) 35%,
      rgba(0,80,200,0.4) 65%,
      rgba(0,80,200,0) 100%
    )`,
  },
  
  hollowEffects: {
    // Initial background
    background: `radial-gradient(circle, 
      rgba(107,31,194,0.4) 0%,
      rgba(107,31,194,0.2) 40%,
      rgba(0,0,0,0.95) 70%,
      rgba(0,0,0,1) 100%
    )`,
    
    // Enhanced hollow sphere with brighter center
    hollow: `radial-gradient(circle, 
      rgba(255,255,255,1) 0%,
      rgba(107,31,194,1) 10%,
      rgba(107,31,194,0.8) 30%,
      rgba(107,31,194,0.4) 60%,
      rgba(107,31,194,0) 100%
    )`,
    
    // Final expansion with more intense purple
    expansion: `radial-gradient(circle, 
      rgba(255,255,255,1) 0%,
      rgba(107,31,194,1) 10%,
      rgba(107,31,194,0.8) 30%,
      rgba(107,31,194,0.5) 60%,
      rgba(0,0,0,1) 100%
    )`,
  },
  
  glowEffects: {
    red: "0 0 80px 40px rgba(180,20,20,0.4), 0 0 120px 80px rgba(180,20,20,0.1)",
    blue: "0 0 80px 40px rgba(0,80,200,0.4), 0 0 120px 80px rgba(0,80,200,0.1)",
    purple: "0 0 150px 75px rgba(107,31,194,0.6), 0 0 200px 100px rgba(107,31,194,0.2)",
  },
};

// Helper functions remain the same
const createElement = (className: string, styles: Partial<CSSStyleDeclaration>) => {
  const element = document.createElement("div");
  element.className = `${className} will-change-transform`;
  Object.assign(element.style, {
    backfaceVisibility: 'hidden',
    ...styles
  });
  return element;
};

const createEnergySphere = (position: string, isRed: boolean) => {
  const gradient = isRed ? VISUAL_EFFECTS.sphereGradients.red : VISUAL_EFFECTS.sphereGradients.blue;
  const glow = isRed ? VISUAL_EFFECTS.glowEffects.red : VISUAL_EFFECTS.glowEffects.blue;
  
  return createElement(
    `absolute ${position} top-1/2 rounded-full mix-blend-screen`,
    {
      width: "200px",
      height: "200px",
      background: gradient,
      filter: "blur(8px) brightness(1.5)",
      boxShadow: glow,
      transform: "translate(-50%, -50%) scale(0.9)",
      opacity: "0",
    }
  );
};

const InfiniteVoid: React.FC<DomainExpansionProps> = memo(({ onAnimationComplete }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!containerRef.current) return;
    
    const container = containerRef.current;
    container.innerHTML = "";

    const setupAnimation = async () => {
      try {
        const elements = {
          // Dark overlay for background transition
          darkOverlay: createElement("absolute inset-0", {
            background: "black",
            opacity: "0",
          }),
          
          // Initial background
          background: createElement("absolute inset-0", {
            background: VISUAL_EFFECTS.hollowEffects.background,
            opacity: "0",
          }),
          
          // Energy spheres
          redSphere: createEnergySphere("left-1/3", true),
          blueSphere: createEnergySphere("left-2/3", false),
          
          // Gojo image
          gojoFlash: createElement("absolute inset-0", {
            backgroundImage: "url('/gojo.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            opacity: "0",
            filter: "brightness(1.3) contrast(1.2)",
            mixBlendMode: "screen",
            transform: "scale(1.1)",
          }),
          
          // Hollow sphere
          hollowSphere: createElement("absolute left-1/2 top-1/2 rounded-full", {
            width: "400px",
            height: "400px",
            background: VISUAL_EFFECTS.hollowEffects.hollow,
            filter: "blur(12px) brightness(1.2)",
            transform: "translate(-50%, -50%) scale(0)",
            opacity: "0",
            boxShadow: VISUAL_EFFECTS.glowEffects.purple,
          }),
          
          // Tiny point of light that remains
          voidPoint: createElement("absolute left-1/2 top-1/2 rounded-full", {
            width: "4px",
            height: "4px",
            background: "rgba(255,255,255,1)",
            filter: "blur(1px) brightness(2)",
            transform: "translate(-50%, -50%) scale(0)",
            opacity: "0",
            boxShadow: "0 0 10px 5px rgba(107,31,194,1)",
          }),
          
          // Final expansion element
          expansion: createElement("absolute left-1/2 top-1/2 rounded-full", {
            width: "100vh", // Using viewport height for consistent circular expansion
            height: "100vh",
            background: VISUAL_EFFECTS.hollowEffects.expansion,
            transform: "translate(-50%, -50%) scale(0)",
            opacity: "0",
            filter: "blur(2px)",
          }),
        };

        // Add elements to container
        const fragment = document.createDocumentFragment();
        Object.values(elements).forEach(el => fragment.appendChild(el));
        container.appendChild(fragment);

        // Create animation sequence
        const timeline = anime.timeline({
          easing: "easeOutExpo",
        });

        timeline
          // Initial fade in
          .add({
            targets: elements.background,
            opacity: [0, 1],
            duration: 800,
            easing: "easeInOutQuad",
          })
          // Energy spheres appear
          .add({
            targets: [elements.redSphere, elements.blueSphere],
            opacity: [0, 1],
            scale: [0.9, 1],
            duration: 800,
            delay: anime.stagger(150),
            easing: "easeOutElastic(1, 0.7)",
          })
          // Spheres move to center
          .add({
            targets: [elements.redSphere, elements.blueSphere],
            left: "50%",
            scale: [1, 2],
            duration: 900,
            easing: "easeInOutQuad",
          })
          // Gojo image flash
          .add({
            targets: elements.gojoFlash,
            opacity: [0, 0.8, 0],
            scale: [1.1, 1],
            duration: 700,
            easing: "easeInOutQuad",
          })
          // Show hollow sphere
          .add({
            targets: elements.hollowSphere,
            scale: [0, 2],
            opacity: 1,
            duration: 400,
            easing: "easeOutQuad",
          })
          // Simultaneous shrink and darkness
          .add({
            targets: [elements.hollowSphere, elements.darkOverlay],
            scale: [2, 0.01], // For hollow sphere
            opacity: {
              value: [1, { value: 1, duration: 100 }], // For dark overlay
            },
            duration: 300,
            easing: "easeInExpo",
          })
          // Show tiny point
          .add({
            targets: elements.voidPoint,
            scale: [0, 1],
            opacity: 1,
            duration: 200,
          })
          // Hold the pause
          .add({
            targets: elements.voidPoint,
            scale: 1,
            duration: 800,
            easing: "easeInOutQuad",
          })
          // Final expansion
          .add({
            targets: elements.expansion,
            scale: [0, 5],
            opacity: [0, 1],
            duration: 1500,
            easing: "easeInExpo",
            complete: onAnimationComplete,
          });

        // Preload Gojo image
        await new Promise((resolve, reject) => {
          const img = new Image();
          img.onload = resolve;
          img.onerror = reject;
          img.src = '/gojo.jpg';
        });

      } catch (error) {
        console.error('Animation setup failed:', error);
      }
    };

    setupAnimation();

    return () => {
      container.innerHTML = "";
    };
  }, [onAnimationComplete]);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 overflow-hidden bg-black"
      style={{
        perspective: "1000px",
        transformStyle: "preserve-3d",
        willChange: "transform",
        isolation: "isolate",
      }}
    />
  );
});

InfiniteVoid.displayName = "InfiniteVoid";

export default InfiniteVoid;