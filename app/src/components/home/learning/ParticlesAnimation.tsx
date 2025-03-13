import { useEffect, useState, memo } from "react";

type Particle = {
  x: number;
  y: number;
  size: number;
  color: string;
  speed: number;
};

interface ParticlesAnimationProps {
  particlesCount: number;
}

const ParticlesAnimation: React.FC<ParticlesAnimationProps> = memo(
  ({ particlesCount }) => {
    const [particles, setParticles] = useState<Particle[]>([]);

    useEffect(() => {
      const newParticles = Array.from({ length: particlesCount }, () => {
        const colors = [
          "rgba(137, 220, 235, 0.5)", // blue
          "rgba(202, 158, 230, 0.5)", // mauve
          "rgba(244, 184, 228, 0.5)", // pink
          "rgba(231, 130, 132, 0.5)", // red
          "rgba(129, 200, 190, 0.5)", // teal
        ];

        return {
          x: Math.random() * 100,
          y: Math.random() * 100,
          size: Math.random() * 3 + 1,
          color: colors[Math.floor(Math.random() * colors.length)],
          speed: Math.random() * 0.2 + 0.1,
        };
      });

      setParticles(newParticles);

      const interval = setInterval(() => {
        setParticles((prev) =>
          prev.map((particle) => ({
            ...particle,
            y: (particle.y + particle.speed) % 100,
          }))
        );
      }, 50);

      return () => clearInterval(interval);
    }, [particlesCount]);

    return (
      <div className="absolute inset-0 overflow-hidden z-0">
        {particles.map((particle, i) => (
          <div
            key={i}
            className="absolute rounded-full"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              backgroundColor: particle.color,
              boxShadow: `0 0 ${particle.size * 2}px ${particle.color}`,
            }}
          />
        ))}
      </div>
    );
  }
);

export default ParticlesAnimation;
