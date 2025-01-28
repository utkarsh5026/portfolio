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
    hollow: `radial-gradient(circle, 
      rgba(255,255,255, 0.1) 0%,
      rgba(88,31,140,1) 20%,    /* Darker purple */
      rgba(88,31,140,0.8) 40%,
      rgba(88,31,140,0.4) 70%,
      transparent 100%
    )`,

    expansion: `radial-gradient(circle, 
      rgba(255,255,255, 0.1) 0%,
      rgba(88,31,140,1) 10%,    /* Darker purple */
      rgba(48,16,75,0.9) 30%,   /* Even darker purple */
      rgba(120,45,150,0.7) 40%, /* Lighter purple */
      rgba(0,0,0,0.98) 60%,
      rgba(0,0,0,1) 100%
    )`,
  },
};

const createElement = (
  className: string,
  styles: Partial<CSSStyleDeclaration>,
  zIndex = 0
) => {
  const element = document.createElement("div");
  element.className = `${className} will-change-transform`;
  Object.assign(element.style, {
    backfaceVisibility: "hidden",
    zIndex: String(zIndex),
    ...styles,
  });
  return element;
};

const createEnergySphere = (position: string, isRed: boolean) => {
  const color = isRed ? "180,20,20" : "0,80,200";
  return createElement(
    `absolute ${position} top-1/2 rounded-full mix-blend-screen`,
    {
      width: "200px",
      height: "200px",
      background: isRed
        ? VISUAL_EFFECTS.sphereGradients.red
        : VISUAL_EFFECTS.sphereGradients.blue,
      filter: "blur(8px) brightness(1.5)",
      boxShadow: `0 0 80px 40px rgba(${color},0.4), 0 0 120px 80px rgba(${color},0.1)`,
      transform: "translate(-50%, -50%) scale(0.9)",
      opacity: "0",
    },
    2
  );
};

const InfiniteVoid: React.FC<DomainExpansionProps> = memo(
  ({ onAnimationComplete }) => {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
      if (!containerRef.current) return;

      const container = containerRef.current;
      container.innerHTML = "";

      const setupAnimation = async () => {
        try {
          const elements = {
            baseBackground: createElement(
              "absolute inset-0",
              {
                background: "black",
                opacity: "1",
              },
              0
            ),

            redSphere: createEnergySphere("left-1/3", true),
            blueSphere: createEnergySphere("left-2/3", false),

            gojoFlash: createElement(
              "absolute inset-0",
              {
                backgroundImage: "url('/gojo.jpg')",
                backgroundSize: "cover",
                backgroundPosition: "center",
                opacity: "0",
                filter: "brightness(1.3) contrast(1.2)",
                mixBlendMode: "screen",
                transform: "scale(1.1)",
              },
              3
            ),

            hollowContainer: createElement(
              "absolute inset-0",
              {
                perspective: "1000px",
                transformStyle: "preserve-3d",
              },
              4
            ),

            hollowSphere: createElement(
              "absolute left-1/2 top-1/2 rounded-full",
              {
                width: "400px",
                height: "400px",
                background: VISUAL_EFFECTS.hollowEffects.hollow,
                filter: "blur(12px) brightness(1.2)",
                transform: "translate(-50%, -50%) scale(0)",
                opacity: "0",
                mixBlendMode: "screen",
              },
              5
            ),

            voidPoint: createElement(
              "absolute left-1/2 top-1/2 rounded-full",
              {
                width: "4px",
                height: "4px",
                background: "rgb(255,255,255)",
                filter: "blur(1px) brightness(2)",
                transform: "translate(-50%, -50%) scale(0)",
                opacity: "0",
                boxShadow: "0 0 10px 5px rgba(88,31,140,1)",
              },
              6
            ),

            expansion: createElement(
              "absolute left-1/2 top-1/2 rounded-full",
              {
                width: "100vh",
                height: "100vh",
                background: VISUAL_EFFECTS.hollowEffects.expansion,
                transform: "translate(-50%, -50%) scale(0)",
                opacity: "0",
                filter: "blur(2px)",
              },
              7
            ),
          };

          const fragment = document.createDocumentFragment();
          Object.values(elements).forEach((el) => fragment.appendChild(el));
          container.appendChild(fragment);

          const timeline = anime.timeline({
            easing: "easeOutExpo",
          });

          timeline
            .add({
              targets: [elements.redSphere, elements.blueSphere],
              opacity: [0, 1],
              scale: [0.9, 1],
              duration: 800,
              delay: anime.stagger(150),
              easing: "easeOutElastic(1, 0.7)",
            })
            .add({
              targets: [elements.redSphere, elements.blueSphere],
              left: "50%",
              scale: [1, 2],
              duration: 900,
              easing: "easeInOutQuad",
            })
            .add({
              targets: elements.gojoFlash,
              opacity: [0, 0.8, 0],
              scale: [1.1, 1],
              duration: 700,
              easing: "easeInOutQuad",
            })
            .add({
              targets: elements.hollowSphere,
              scale: [0, 2],
              opacity: 1,
              duration: 400,
              easing: "easeOutQuad",
            })
            .add({
              targets: [
                elements.redSphere,
                elements.blueSphere,
                elements.hollowSphere,
              ],
              opacity: [1, 0],
              scale: [2, 0.01],
              duration: 300,
              easing: "easeInExpo",
            })
            .add({
              targets: elements.voidPoint,
              scale: [0, 1],
              opacity: 1,
              duration: 200,
            })
            .add({
              targets: elements.voidPoint,
              scale: 1,
              duration: 800,
              easing: "easeInOutQuad",
            })
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

          await new Promise((resolve, reject) => {
            const img = new Image();
            img.onload = resolve;
            img.onerror = reject;
            img.src = "/gojo.jpg";
          });
        } catch (error) {
          console.error("Animation setup failed:", error);
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
        className="infinite-void absolute inset-0 overflow-hidden bg-black"
      />
    );
  }
);

InfiniteVoid.displayName = "InfiniteVoid";

export default InfiniteVoid;
