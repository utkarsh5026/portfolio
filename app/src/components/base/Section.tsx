import React, { useEffect, useRef, useMemo } from "react";
import anime from "animejs";
import NewtonCradle from "./NewtonCradle";

interface SectionProps {
  id: string;
  label: string;
  className?: string;
  children: React.ReactNode;
}

const Section: React.FC<SectionProps> = ({
  id,
  label,
  className,
  children,
}) => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const particlesRef = useRef<HTMLDivElement[]>([]);

  const mouseEffectRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const section = sectionRef.current;
    const title = titleRef.current;
    const particles = particlesRef.current;

    anime({
      targets: section,
      opacity: [0, 1],
      translateY: [50, 0],
      duration: 1200,
      easing: "easeOutExpo",
      delay: 300,
    });

    anime({
      targets: title,
      translateY: [0, -10],
      duration: 2000,
      direction: "alternate",
      loop: true,
      easing: "easeInOutSine",
    });

    particles.forEach((particle, index) => {
      const radius = anime.random(50, 150);
      const startAngle = anime.random(0, 360);

      anime({
        targets: particle,
        translateX: [
          {
            value: radius * Math.cos((startAngle * Math.PI) / 180),
            duration: 4000,
            delay: index * 100,
          },
          {
            value: radius * Math.cos(((startAngle + 120) * Math.PI) / 180),
            duration: 4000,
          },
          {
            value: radius * Math.cos(((startAngle + 240) * Math.PI) / 180),
            duration: 4000,
          },
          {
            value: radius * Math.cos((startAngle * Math.PI) / 180),
            duration: 4000,
          },
        ],
        translateY: [
          {
            value: radius * Math.sin((startAngle * Math.PI) / 180),
            duration: 4000,
            delay: index * 100,
          },
          {
            value: radius * Math.sin(((startAngle + 120) * Math.PI) / 180),
            duration: 4000,
          },
          {
            value: radius * Math.sin(((startAngle + 240) * Math.PI) / 180),
            duration: 4000,
          },
          {
            value: radius * Math.sin((startAngle * Math.PI) / 180),
            duration: 4000,
          },
        ],
        scale: [
          { value: 0, duration: 0, delay: index * 100 },
          { value: 1, duration: 1000 },
          { value: 0.5, duration: 2000 },
          { value: 1, duration: 1000 },
        ],
        opacity: [
          { value: 0, duration: 0, delay: index * 100 },
          { value: 0.8, duration: 1000 },
          { value: 0.2, duration: 2000 },
          { value: 0.8, duration: 1000 },
        ],
        easing: "easeInOutSine",
        loop: true,
      });
    });

    return () => {
      anime.remove(section);
      anime.remove(title);
      anime.remove(particles);
    };
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseEffectRef.current = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };

    anime({
      targets: mouseEffectRef.current,
      duration: 300,
      easing: "easeOutSine",
      update: () => {
        const gradient = document.querySelector(
          ".mouse-gradient"
        ) as HTMLElement;
        if (gradient) {
          gradient.style.background = `radial-gradient(
            circle 400px at ${mouseEffectRef.current.x}px ${mouseEffectRef.current.y}px,
            rgba(139, 92, 246, 0.3),
            transparent
          )`;
        }
      },
    });
  };

  const particles = useMemo(
    () =>
      [...Array(40)].map((_, i) => (
        <div
          key={`particle-${Math.random().toString(36).slice(2, 9)}`}
          ref={(el) => el && (particlesRef.current[i] = el)}
          className="absolute rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            width: `${Math.random() * 4 + 2}px`,
            height: `${Math.random() * 4 + 2}px`,
            background:
              i % 3 === 0
                ? "linear-gradient(to right, rgba(139, 92, 246, 0.3), rgba(59, 130, 246, 0.3))"
                : i % 3 === 1
                ? "rgba(255, 255, 255, 0.15)"
                : "rgba(147, 197, 253, 0.2)",
          }}
        />
      )),
    []
  );

  return (
    <div
      ref={sectionRef}
      id={id}
      className={`${className} relative group overflow-hidden rounded-3xl opacity-0`}
      onMouseMove={handleMouseMove}
    >
      <div className="absolute inset-0 p-0.5 rounded-3xl bg-gradient-to-r from-purple-500/50 via-blue-500/50 to-purple-500/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      <div className="relative bg-slate-950 rounded-2xl overflow-hidden">
        <div className="mouse-gradient absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

        <div className="absolute inset-0 overflow-hidden">{particles}</div>

        <div className="relative p-8 md:p-12 lg:p-16">
          <div className="relative">
            <div
              ref={titleRef}
              className="text-4xl md:text-6xl lg:text-7xl font-bold text-right tracking-tight"
            >
              <span className="bg-gradient-to-r from-purple-500 to-blue-500 text-transparent bg-clip-text">
                {label}
              </span>
            </div>

            <div className="absolute -top-12 left-0">
              <NewtonCradle />
            </div>
          </div>

          <div className="relative my-8 md:my-12">
            <div className="h-px bg-gradient-to-r from-transparent via-gray-200/10 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/0 via-blue-500/10 to-purple-500/0 blur" />
          </div>

          {/* Main content */}
          <div className="relative z-10 backdrop-blur-sm">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default Section;
