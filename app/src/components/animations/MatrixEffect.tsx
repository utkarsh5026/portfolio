import React, { useRef, useEffect } from "react";

interface MatrixEffectProps {
  isActive: boolean;
  glowAccent: string;
  icon: string;
}

const CHARACTERS =
  "abcdefghijklmnopqrstuvwxyz0123456789$><{}[]()=+-*/|&%#@!;:,.";

export const MatrixEffect: React.FC<MatrixEffectProps> = ({
  isActive,
  glowAccent,
  icon,
}) => {
  const matrixCanvasRef = useRef<HTMLCanvasElement>(null);

  // Draw the matrix effect
  useEffect(() => {
    if (!matrixCanvasRef.current || !isActive) return;

    const canvas = matrixCanvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas dimensions
    const resizeCanvas = () => {
      const parent = canvas.parentElement;
      if (parent) {
        canvas.width = parent.offsetWidth;
        canvas.height = parent.offsetHeight;
      }
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Matrix effect variables
    const fontSize = 12;
    const columns = Math.floor(canvas.width / fontSize);
    const drops: number[] = Array(columns).fill(0);

    // Define color based on theme
    const getGlowColor = () => {
      switch (glowAccent) {
        case "green":
          return "rgba(166, 227, 161, 0.9)";
        case "blue":
          return "rgba(137, 180, 250, 0.9)";
        case "red":
          return "rgba(243, 139, 168, 0.9)";
        case "yellow":
          return "rgba(249, 226, 175, 0.9)";
        case "pink":
          return "rgba(245, 194, 231, 0.9)";
        case "mauve":
          return "rgba(203, 166, 247, 0.9)";
        default:
          return "rgba(166, 227, 161, 0.9)";
      }
    };

    // Set the speed based on section type
    const speed = icon === "terminal" ? 1.5 : 1;

    // Draw matrix effect
    const draw = () => {
      // Semi-transparent overlay to create trail effect
      ctx.fillStyle = "rgba(30, 30, 46, 0.1)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.font = `${fontSize}px monospace`;
      ctx.fillStyle = getGlowColor();

      for (let i = 0; i < drops.length; i++) {
        // Random character
        const char = CHARACTERS[Math.floor(Math.random() * CHARACTERS.length)];

        // Draw character
        ctx.fillText(char, i * fontSize, drops[i] * fontSize);

        // Move rain drop
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i] += speed;
      }
    };

    // Animation loop
    let animId: number;
    const animate = () => {
      draw();
      animId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      cancelAnimationFrame(animId);
    };
  }, [isActive, glowAccent, icon]);

  return (
    <canvas
      ref={matrixCanvasRef}
      className="absolute inset-0 z-0 opacity-10 pointer-events-none"
    />
  );
};

export default MatrixEffect;
