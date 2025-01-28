import React, { useEffect, useRef, useMemo, memo } from "react";
import ProfileAvatar from "./ProfileAvatar";
import AnimatedText from "./AnimatedText";
import anime from "animejs";

const PersonalHeaderComponent: React.FC = () => {
  const headerRef = useRef<HTMLHeadingElement>(null);
  const nameRef = useRef<HTMLSpanElement>(null);
  const bioRef = useRef<HTMLParagraphElement>(null);
  const avatarRef = useRef<HTMLDivElement>(null);
  const bgDecorationRef = useRef<HTMLDivElement>(null);

  const statements = useMemo(
    () => [
      "I build things for the web",
      "I love creating user interfaces",
      "I speak JavaScript, Python & Go",
      "I want to write code that humans can read",
      "I am currently exploring databases and LLMs",
    ],
    []
  );

  useEffect(() => {
    const headerElement = headerRef.current;
    const nameElement = nameRef.current;
    const bioElement = bioRef.current;
    const avatarElement = avatarRef.current;
    const bgDecorationElement = bgDecorationRef.current;

    const timeline = anime.timeline({
      easing: "easeOutExpo",
    });

    timeline.add({
      targets: bgDecorationElement,
      opacity: [0, 0.2],
      scale: [0.8, 1],
      duration: 1200,
    });

    timeline.add(
      {
        targets: headerElement,
        opacity: [0, 1],
        translateY: [20, 0],
        duration: 800,
      },
      "-=800"
    );

    timeline.add(
      {
        targets: nameElement,
        opacity: [0, 1],
        duration: 800,
      },
      "-=400"
    );

    timeline.add(
      {
        targets: avatarElement,
        opacity: [0, 1],
        scale: [0.8, 1],
        duration: 1000,
        easing: "spring(1, 80, 10, 0)",
      },
      "-=600"
    );

    timeline.add(
      {
        targets: bioElement,
        opacity: [0, 1],
        translateY: [20, 0],
        duration: 800,
      },
      "-=400"
    );

    anime({
      targets: ".avatar-glow",
      scale: [1, 1.1],
      opacity: [0.2, 0.3],
      duration: 2000,
      loop: true,
      direction: "alternate",
      easing: "easeInOutSine",
    });

    return () => {
      anime.remove([
        headerElement,
        nameElement,
        bioElement,
        avatarElement,
        bgDecorationElement,
      ]);
    };
  }, []);

  return (
    <div className="relative bg-gradient-to-b from-slate-950 to-slate-900 flex-1 flex items-center pt-8 sm:pt-16 md:pt-0 overflow-hidden rounded-2xl shadow-2xl mt-12">
      <div
        ref={bgDecorationRef}
        className="absolute inset-0 overflow-hidden opacity-0"
      >
        <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-to-r from-purple-500 to-blue-500 rotate-12 transform scale-150 blur-3xl" />
        <div className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-gradient-to-l from-purple-500 to-blue-500 -rotate-12 transform scale-150 blur-3xl" />
      </div>

      <div className="container relative mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20 h-full">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 md:gap-12 lg:gap-16 h-full">
          <div className="w-full space-y-8 sm:space-y-6 flex flex-col justify-start items-start md:order-1">
            <h1
              ref={headerRef}
              className="opacity-0 text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight"
            >
              Hello, I'm{" "}
              <span
                ref={nameRef}
                className="bg-gradient-to-r from-purple-500 via-blue-500 to-purple-500 bg-clip-text text-transparent bg-size-200 animate-gradient opacity-0"
              >
                Utkarsh Priyadarshi
              </span>
            </h1>

            <div className="w-full md:hidden order-2 flex justify-center mb-8">
              <div ref={avatarRef} className="opacity-0">
                <div className="relative">
                  <div className="avatar-glow absolute inset-0 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full blur-2xl opacity-20" />
                  <ProfileAvatar />
                </div>
              </div>
            </div>

            <div className="order-3 px-2 sm:px-4 w-full">
              <AnimatedText statements={statements} />
            </div>

            {/* Bio text */}
            <p
              ref={bioRef}
              className="opacity-0 text-slate-300 max-w-[600px] text-lg sm:text-xl lg:text-2xl order-4 px-2 sm:px-4 leading-relaxed"
            >
              I'm a software engineer with a passion for creating user-friendly
              and efficient web applications. I'm a quick learner and I'm always
              looking to expand my skills. I develop mostly full-stack web
              applications and currently, I am looking for opportunities to work
              with a team of passionate developers.
            </p>
          </div>

          <div
            ref={avatarRef}
            className="hidden md:flex w-full md:w-auto justify-center md:justify-start md:order-2 opacity-0"
          >
            <div className="relative">
              <div className="avatar-glow absolute inset-0 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full blur-2xl opacity-20" />
              <ProfileAvatar />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const PersonalHeader = memo(PersonalHeaderComponent);
export default PersonalHeader;
