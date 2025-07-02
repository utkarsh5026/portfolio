import React, { useRef, useEffect } from "react";

interface LayeredCard3DProps {
  children: React.ReactNode;
  depth?: number;
  gap?: number;
  className?: string;
  rotateXDeg?: number;
  rotateYDeg?: number;
  threeDPerspective?: number;
}

/**
 * LayeredCard3D Component
 *
 * This component creates a 3D layered card effect using CSS transformations and mouse events.
 * It allows for a visually appealing presentation of child components with depth and perspective.
 *
 * Props:
 * - children: React.ReactNode
 *   The content to be displayed inside the layered card.
 *
 * - depth: number (optional)
 *   The number of layers to create in the 3D effect. Default is 3.
 *
 * - gap: number (optional)
 *   The distance between each layer in pixels. Default is 4.
 *
 * - className: string (optional)
 *   Additional CSS classes to apply to the container div.
 *
 * - rotateXDeg: number (optional)
 *   The degree of rotation around the X-axis based on mouse movement. Default is 3.
 *
 * - rotateYDeg: number (optional)
 *   The degree of rotation around the Y-axis based on mouse movement. Default is 3.
 *
 * - threeDPerspective: number (optional)
 *   The perspective value for the 3D effect in pixels. Default is 200.
 *
 * Usage:
 * Wrap any content you want to display in a 3D layered card within the LayeredCard3D component.
 * Example:
 *
 * <LayeredCard3D depth={5} gap={10} rotateXDeg={5} rotateYDeg={5}>
 *   <YourContent />
 * </LayeredCard3D>
 */
const LayeredCard3D: React.FC<LayeredCard3DProps> = ({
  children,
  depth = 3,
  gap = 4,
  className = "",
  rotateXDeg = 3,
  rotateYDeg = 3,
  threeDPerspective = 200,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const layersRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;

    if (layersRef.current.length === 0) {
      container.querySelectorAll(".shadow-layer").forEach((layer) => {
        container.removeChild(layer);
      });

      for (let i = 0; i < depth; i++) {
        const layer = document.createElement("div");
        layer.className = `shadow-layer absolute inset-0 rounded-xl border border-ctp-surface0 pointer-events-none`;
        layer.style.zIndex = (-1 - i).toString();
        layer.style.transform = `translateZ(-${(i + 1) * gap}px)`;
        layer.style.opacity = (1 - i * 0.2).toString();
        layer.style.backgroundColor = "var(--ctp-mantle)";

        container.appendChild(layer);
        layersRef.current.push(layer);
      }
    }

    const handleMouseMove = (e: MouseEvent) => {
      const { left, top, width, height } = container.getBoundingClientRect();

      const x = ((e.clientX - left) / width) * 2 - 1;
      const y = ((e.clientY - top) / height) * 2 - 1;

      const rotateX = y * -rotateXDeg;
      const rotateY = x * rotateYDeg;

      container.style.transform = `
        perspective(${threeDPerspective}px) 
        rotateX(${rotateX}deg) 
        rotateY(${rotateY}deg)
      `;

      layersRef.current.forEach((layer, index) => {
        const layerDepth = (index + 1) * gap;
        const offsetX = x * layerDepth * 0.5;
        const offsetY = y * layerDepth * 0.5;

        layer.style.transform = `
          translateZ(-${layerDepth}px)
          translateX(${offsetX}px)
          translateY(${offsetY}px)
        `;
      });
    };

    const handleMouseLeave = () => {
      container.style.transition = "transform 0.5s ease-out";
      container.style.transform =
        "perspective(1000px) rotateX(0deg) rotateY(0deg)";

      layersRef.current.forEach((layer, index) => {
        const layerDepth = (index + 1) * gap;
        layer.style.transition = "transform 0.5s ease-out";
        layer.style.transform = `translateZ(-${layerDepth}px)`;
      });

      setTimeout(() => {
        container.style.transition = "";
        layersRef.current.forEach((layer) => {
          layer.style.transition = "";
        });
      }, 500);
    };

    container.addEventListener("mousemove", handleMouseMove);
    container.addEventListener("mouseleave", handleMouseLeave);

    container.style.transform =
      "perspective(1000px) rotateX(0deg) rotateY(0deg)";

    return () => {
      container.removeEventListener("mousemove", handleMouseMove);
      container.removeEventListener("mouseleave", handleMouseLeave);

      // Remove shadow layers
      layersRef.current.forEach((layer) => {
        if (layer.parentNode === container) {
          container.removeChild(layer);
        }
      });

      layersRef.current = [];
    };
  }, [depth, gap, rotateXDeg, rotateYDeg]);

  return (
    <div
      ref={containerRef}
      className={`relative ${className}`}
      style={{
        transformStyle: "preserve-3d",
        backfaceVisibility: "hidden",
        willChange: "transform",
        transform: "perspective(1000px)",
        zIndex: 1,
      }}
    >
      {children}
    </div>
  );
};

export default LayeredCard3D;
