import React, { useEffect } from "react";
import anime from "animejs";

const collisionEffect = (selector: string) => ({
  targets: selector,
  scale: [
    { value: 1, duration: 0 },
    { value: 0.8, duration: 100 },
    { value: 1, duration: 100 },
  ],
  boxShadow: [
    { value: "0 0 8px rgba(139,92,246,0.4)", duration: 0 },
    { value: "0 0 12px rgba(139,92,246,0.7)", duration: 100 },
    { value: "0 0 8px rgba(139,92,246,0.4)", duration: 100 },
  ],
  easing: "easeOutElastic(2, .8)",
});

const NewtonCradle: React.FC = () => {
  const ballCount = 5;
  const gap = 10;
  useEffect(() => {
    const swingAngle = 35;
    const swingDuration = 800;

    const tl = anime.timeline({
      loop: true,
      easing: "cubicBezier(.45,.05,.55,.95)",
    });

    tl.add({
      targets: ".pendulum-0",
      rotate: swingAngle,
      duration: swingDuration / 2,
      easing: "cubicBezier(.35,0,.25,1)",
    })
      .add({
        targets: ".pendulum-0",
        rotate: 0,
        duration: swingDuration / 2,
        easing: "cubicBezier(.5,.05,.65,1)",
      })
      .add(collisionEffect(".pendulum-1 .ball"), "-=100")
      .add(collisionEffect(".pendulum-2 .ball"), "-=50")
      .add(collisionEffect(".pendulum-3 .ball"), "-=50")
      .add({
        targets: ".pendulum-4",
        rotate: -swingAngle,
        duration: swingDuration / 2,
        offset: "-=300",
        easing: "cubicBezier(.35,0,.25,1)",
      })
      .add({
        targets: ".pendulum-4",
        rotate: 0,
        duration: swingDuration / 2,
        easing: "cubicBezier(.5,.05,.65,1)",
      })
      .add(collisionEffect(".pendulum-3 .ball"), "-=100")
      .add(collisionEffect(".pendulum-2 .ball"), "-=50")
      .add(collisionEffect(".pendulum-1 .ball"), "-=50");

    return () => tl.pause();
  }, []);

  return (
    <div className="relative w-16 h-12 flex items-center justify-center">
      <div className="absolute top-1 w-12 h-0.5 rounded-full bg-gradient-to-r from-purple-600/80 via-blue-500/80 to-purple-600/80 shadow-[0_0_8px_rgba(139,92,246,0.3)]" />

      <div className="relative w-10 h-8">
        {[...Array(ballCount)].map((_, index) => (
          <div
            key={index}
            className={`pendulum-${index} absolute left-1/2 top-0 origin-top`}
            style={{
              transform: `translateX(${
                (index - Math.floor(ballCount / 2)) * gap
              }px)`,
              transformOrigin: "top center",
            }}
          >
            <div className="w-px h-6 bg-gradient-to-b from-gray-400/50 to-gray-400/20 ml-[-1px]" />

            <div
              className={`ball absolute top-6 w-2 h-2 -ml-1 rounded-full 
              bg-gradient-to-br from-purple-400 via-purple-500 to-blue-500
              shadow-[0_0_8px_rgba(139,92,246,0.4)]
              before:absolute before:inset-0 before:rounded-full
              before:bg-gradient-to-tr before:from-white/5 before:to-transparent
              after:absolute after:inset-0 after:rounded-full
              after:bg-gradient-to-bl after:from-transparent after:to-black/20
              ${index === Math.floor(ballCount / 2) ? "opacity-90" : ""}`}
            >
              <div className="absolute top-0.5 left-0.5 w-0.5 h-0.5 rounded-full bg-white/40" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const MemoizedNewtonCradle = React.memo(NewtonCradle);
export default MemoizedNewtonCradle;
