import React, { useEffect } from "react";
import anime from "animejs";

const NewtonCradle = () => {
  const ballCount = 3;
  const gap = 9;
  useEffect(() => {
    const swingAngle = 30;
    const swingDuration = 1200;

    const tl = anime.timeline({
      loop: true,
      easing: "easeInOutSine",
    });

    tl.add({
      targets: ".pendulum-0",
      rotate: swingAngle,
      duration: swingDuration / 2,
      easing: "easeInOutSine",
    })
      .add({
        targets: ".pendulum-0",
        rotate: 0,
        duration: swingDuration / 2,
        easing: "easeInOutSine",
      })
      .add({
        targets: ".pendulum-2",
        rotate: -swingAngle,
        duration: swingDuration / 2,
        offset: "-=500",
      })
      .add({
        targets: ".pendulum-2",
        rotate: 0,
        duration: swingDuration / 2,
      });

    return () => tl.pause();
  }, []);

  return (
    <div className="relative w-12 h-12 flex items-center justify-center">
      <div className="absolute top-1 w-8 h-0.5 bg-gray-800 rounded-full" />

      <div className="relative w-6 h-8">
        {[...Array(ballCount)].map((_, index) => (
          <div
            key={index}
            className={`pendulum-${index} absolute left-1/2 top-0 origin-top`}
            style={{
              transform: `translateX(${(index - 1) * gap}px)`,
              transformOrigin: "top center",
            }}
          >
            <div className="w-px h-6 bg-gray-400/30 ml-[-1px]" />

            <div
              className={`absolute top-6 w-2 h-2 -ml-1 rounded-full 
              bg-gradient-to-r from-purple-500 to-blue-500 text-transparent shadow-sm
              ${index === 1 ? "opacity-75" : ""}`}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default NewtonCradle;
