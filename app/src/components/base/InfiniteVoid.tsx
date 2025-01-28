import React, { useEffect, useRef } from "react";
import anime from "animejs";

interface DomainExpansionProps {
  onAnimationComplete?: () => void;
}

const InfiniteVoid: React.FC<DomainExpansionProps> = ({
  onAnimationComplete,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    container.innerHTML = "";

    // Create intense energy spheres
    const redSphere = document.createElement("div");
    redSphere.className =
      "absolute left-1/3 top-1/2 rounded-full mix-blend-screen";
    redSphere.style.width = "200px";
    redSphere.style.height = "200px";
    redSphere.style.background = `
      radial-gradient(circle, 
        rgba(255,50,50,1) 0%, 
        rgba(255,0,0,0.8) 40%,
        rgba(255,0,0,0.4) 70%,
        rgba(255,0,0,0) 100%)
    `;
    redSphere.style.filter = "blur(8px) brightness(2)";
    redSphere.style.boxShadow = "0 0 80px 40px rgba(255,0,0,0.4)";
    redSphere.style.transform = "translate(-50%, -50%)";
    container.appendChild(redSphere);

    const blueSphere = document.createElement("div");
    blueSphere.className =
      "absolute left-2/3 top-1/2 rounded-full mix-blend-screen";
    blueSphere.style.width = "200px";
    blueSphere.style.height = "200px";
    blueSphere.style.background = `
      radial-gradient(circle, 
        rgba(0,150,255,1) 0%, 
        rgba(0,100,255,0.8) 40%,
        rgba(0,100,255,0.4) 70%,
        rgba(0,100,255,0) 100%)
    `;
    blueSphere.style.filter = "blur(8px) brightness(2)";
    blueSphere.style.boxShadow = "0 0 80px 40px rgba(0,100,255,0.4)";
    blueSphere.style.transform = "translate(-50%, -50%)";
    container.appendChild(blueSphere);

    // Create explosion effect at collision point
    const explosion = document.createElement("div");
    explosion.className = "absolute left-1/2 top-1/2 rounded-full opacity-0";
    explosion.style.width = "300px";
    explosion.style.height = "300px";
    explosion.style.background = `
      radial-gradient(circle, 
        rgba(255,255,255,1) 0%,
        rgba(147,51,234,0.9) 30%,
        rgba(147,51,234,0.5) 60%,
        rgba(147,51,234,0) 100%)
    `;
    explosion.style.filter = "blur(20px) brightness(2)";
    explosion.style.transform = "translate(-50%, -50%) scale(0)";
    container.appendChild(explosion);

    const hollowPurple = document.createElement("div");
    hollowPurple.className = "absolute left-1/2 top-1/2 rounded-full opacity-0";
    hollowPurple.style.width = "400px";
    hollowPurple.style.height = "400px";
    hollowPurple.style.background = `
      radial-gradient(circle, 
        rgba(0,0,0,1) 0%,
        rgba(147,51,234,1) 20%,
        rgba(147,51,234,0.7) 40%,
        rgba(147,51,234,0.3) 70%,
        rgba(147,51,234,0) 100%)
    `;
    hollowPurple.style.filter = "blur(15px) brightness(1.5)";
    hollowPurple.style.boxShadow = "0 0 150px 75px rgba(147,51,234,0.4)";
    hollowPurple.style.transform = "translate(-50%, -50%) scale(0)";
    container.appendChild(hollowPurple);

    const createVoidRings = () => {
      const rings = [];
      for (let i = 0; i < 8; i++) {
        const ring = document.createElement("div");
        ring.className = "absolute left-1/2 top-1/2 rounded-full opacity-0";
        ring.style.width = "400px";
        ring.style.height = "400px";
        ring.style.border = "4px solid rgba(147, 51, 234, 0.3)";
        ring.style.transform = "translate(-50%, -50%) scale(0)";
        container.appendChild(ring);
        rings.push(ring);
      }
      return rings;
    };

    const voidRings = createVoidRings();
    const voidContainer = document.createElement("div");
    voidContainer.className = "absolute inset-0 opacity-0";
    voidContainer.style.background = `
      radial-gradient(circle at center,
        rgba(0,0,0,1) 0%,
        rgba(147,51,234,0.4) 30%,
        rgba(0,0,0,0.95) 60%,
        rgba(0,0,0,1) 100%)
    `;
    container.appendChild(voidContainer);

    const gojoFlash = document.createElement("div");
    gojoFlash.className = "absolute inset-0 opacity-0";
    gojoFlash.style.backgroundImage = "url('/gojo.jpg')";
    gojoFlash.style.backgroundSize = "cover";
    gojoFlash.style.backgroundPosition = "center";
    gojoFlash.style.mixBlendMode = "screen";
    container.appendChild(gojoFlash);

    // Animation timeline
    const timeline = anime.timeline({
      easing: "easeOutExpo",
    });

    timeline
      .add({
        targets: [redSphere, blueSphere],
        left: "50%",
        scale: [1, 2.2],
        duration: 1000,
        easing: "easeInOutQuad",
      })
      .add(
        {
          targets: gojoFlash,
          opacity: [0, 0.3, 0],
          scale: [0.2, 1.5],
          duration: 1000,
          easing: "easeInOutQuad",
        },
        "-=200"
      )
      .add(
        {
          targets: hollowPurple,
          scale: [0, 2],
          opacity: [0, 1],
          duration: 600,
          easing: "easeOutElastic(1, 0.5)",
        },
        "-=600"
      )
      .add(
        {
          targets: voidRings,
          scale: [0, 16],
          opacity: [0.8, 0],
          duration: 1000,
          delay: anime.stagger(50),
          easing: "easeOutExpo",
        },
        "-=400"
      )
      .add(
        {
          targets: voidContainer,
          opacity: [0, 1],
          duration: 600,
          easing: "easeInOutQuad",
        },
        "-=800"
      )
      .add({
        targets: [hollowPurple, voidContainer],
        scale: [1, 100],
        duration: 1200,
        easing: "easeInExpo",
        complete: () => {
          if (onAnimationComplete) {
            onAnimationComplete();
          }
        },
      });

    return () => {
      timeline.pause();
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
      }}
    />
  );
};

export default InfiniteVoid;
