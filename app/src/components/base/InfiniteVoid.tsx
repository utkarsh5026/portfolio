import React, { useEffect, useRef, memo } from "react";
import anime from "animejs";

interface DomainExpansionProps {
  onAnimationComplete?: () => void;
}

// Enhanced visual effects with proper layering
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
    // Initial background (will be completely hidden during shrink)
    background: `radial-gradient(circle, 
      rgba(107,31,194,0.4) 0%,
      rgba(107,31,194,0.2) 40%,
      rgba(0,0,0,0.95) 70%,
      rgba(0,0,0,1) 100%
    )`,
    
    // Hollow sphere with intense center for better shrinking effect
    hollow: `radial-gradient(circle, 
      rgb(255,255,255) 0%,
      rgba(147,51,234,1) 20%,
      rgba(147,51,234,0.8) 40%,
      rgba(147,51,234,0.4) 70%,
      transparent 100%
    )`,
    
    // Expansion effect with smooth gradient
    expansion: `radial-gradient(circle, 
      rgb(255,255,255) 0%,
      rgba(147,51,234,1) 10%,
      rgba(147,51,234,0.8) 40%,
      rgba(0,0,0,0.95) 70%,
      rgba(0,0,0,1) 100%
    )`,
  },
};

// Helper function for element creation with z-index support
const createElement = (className: string, styles: Partial<CSSStyleDeclaration>, zIndex = 0) => {
  const element = document.createElement("div");
  element.className = `${className} will-change-transform`;
  Object.assign(element.style, {
    backfaceVisibility: 'hidden',
    zIndex: String(zIndex),
    ...styles
  });
  return element;
};

// Create energy spheres with proper z-indexing
const createEnergySphere = (position: string, isRed: boolean) => {
  const color = isRed ? "180,20,20" : "0,80,200";
  return createElement(
    `absolute ${position} top-1/2 rounded-full mix-blend-screen`,
    {
      width: "200px",
      height: "200px",
      background: isRed ? VISUAL_EFFECTS.sphereGradients.red : VISUAL_EFFECTS.sphereGradients.blue,
      filter: "blur(8px) brightness(1.5)",
      boxShadow: `0 0 80px 40px rgba(${color},0.4), 0 0 120px 80px rgba(${color},0.1)`,
      transform: "translate(-50%, -50%) scale(0.9)",
      opacity: "0",
    },
    2
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
        // Create elements with proper layering
        const elements = {
          // Base black background (always present)
          baseBackground: createElement("absolute inset-0", {
            background: "black",
            opacity: "1",
          }, 0),

          // Initial purple background (fades with shrink)
          purpleBackground: createElement("absolute inset-0", {
            background: VISUAL_EFFECTS.hollowEffects.background,
            opacity: "0",
          }, 1),
          
          // Energy spheres
          redSphere: createEnergySphere("left-1/3", true),
          blueSphere: createEnergySphere("left-2/3", false),
          
          // Gojo image effect
          gojoFlash: createElement("absolute inset-0", {
            backgroundImage: "url('/gojo.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            opacity: "0",
            filter: "brightness(1.3) contrast(1.2)",
            mixBlendMode: "screen",
            transform: "scale(1.1)",
          }, 3),
          
          // Main hollow sphere container
          hollowContainer: createElement("absolute inset-0", {
            perspective: "1000px",
            transformStyle: "preserve-3d",
          }, 4),
          
          // The actual hollow sphere effect
          hollowSphere: createElement("absolute left-1/2 top-1/2 rounded-full", {
            width: "400px",
            height: "400px",
            background: VISUAL_EFFECTS.hollowEffects.hollow,
            filter: "blur(12px) brightness(1.2)",
            transform: "translate(-50%, -50%) scale(0)",
            opacity: "0",
            mixBlendMode: "screen",
          }, 5),
          
          // Point of light for the pause
          voidPoint: createElement("absolute left-1/2 top-1/2 rounded-full", {
            width: "4px",
            height: "4px",
            background: "rgb(255,255,255)",
            filter: "blur(1px) brightness(2)",
            transform: "translate(-50%, -50%) scale(0)",
            opacity: "0",
            boxShadow: "0 0 10px 5px rgba(147,51,234,1)",
          }, 6),
          
          // Final expansion effect
          expansion: createElement("absolute left-1/2 top-1/2 rounded-full", {
            width: "100vh",
            height: "100vh",
            background: VISUAL_EFFECTS.hollowEffects.expansion,
            transform: "translate(-50%, -50%) scale(0)",
            opacity: "0",
            filter: "blur(2px)",
          }, 7),
        };

        // Add all elements to the container
        const fragment = document.createDocumentFragment();
        Object.values(elements).forEach(el => fragment.appendChild(el));
        container.appendChild(fragment);

        // Create the animation sequence
        const timeline = anime.timeline({
          easing: "easeOutExpo",
        });

        timeline
          // Initial background fade in
          .add({
            targets: elements.purpleBackground,
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
          // Coordinated shrink of all elements
          .add({
            targets: [
              elements.purpleBackground,
              elements.redSphere,
              elements.blueSphere,
              elements.hollowSphere,
            ],
            opacity: [1, 0],
            scale: function(target: Element) {
              // Different scale for background vs spheres
              return target === elements.purpleBackground ? [1, 0] : [2, 0.01];
            },
            duration: 300,
            easing: "easeInExpo",
          })
          // Show point of light
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
            opacity: {
              value: [0, 1],
              duration: 400,
            },
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