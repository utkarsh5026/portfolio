import React, { useEffect, useRef, useMemo, memo } from "react";
import { motion } from "framer-motion";
import ProfileAvatar from "./ProfileAvatar";
import AnimatedText from "./AnimatedText";
import anime from "animejs";
import { FaTerminal } from "react-icons/fa";
import TechSkills from "./TechSkills";
import "./style.css";

const PersonalHeaderComponent: React.FC = () => {
  const headerRef = useRef<HTMLHeadingElement>(null);
  const nameRef = useRef<HTMLSpanElement>(null);
  const bioRef = useRef<HTMLParagraphElement>(null);
  const avatarRef = useRef<HTMLDivElement>(null);
  const descriptionRef = useRef<HTMLDivElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);
  const macDotsRef = useRef<HTMLDivElement>(null);

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
    const nameElement = nameRef.current;
    const bioElement = bioRef.current;
    const avatarElement = avatarRef.current;
    const descriptionElement = descriptionRef.current;
    const terminalElement = terminalRef.current;
    const macDotsElement = macDotsRef.current;

    const timeline = anime.timeline({
      easing: "easeOutExpo",
    });

    timeline
      .add({
        targets: macDotsElement,
        opacity: [0, 1],
        duration: 600,
      })
      .add(
        {
          targets: nameElement,
          opacity: [0, 1],
          translateY: [20, 0],
          duration: 800,
        },
        "-=400"
      )
      .add(
        {
          targets: bioElement,
          opacity: [0, 1],
          translateY: [20, 0],
          duration: 800,
        },
        "-=400"
      )
      .add(
        {
          targets: descriptionElement,
          opacity: [0, 1],
          translateY: [20, 0],
          duration: 800,
        },
        "-=600"
      )
      .add(
        {
          targets: avatarElement,
          opacity: [0, 1],
          translateY: [20, 0],
          duration: 800,
        },
        "-=600"
      )
      .add(
        {
          targets: terminalElement,
          opacity: [0, 1],
          translateY: [20, 0],
          duration: 800,
        },
        "-=600"
      );

    return () => {
      timeline.pause();
    };
  }, []);

  return (
    <div className="relative isolate pt-14 min-h-screen bg-gradient-to-br from-[#1e1e2e] via-[#181825] to-[#11111b]">
      {/* Colorful accent shapes */}
      <div className="absolute inset-0 overflow-hidden -z-10">
        <div className="absolute top-1/4 left-1/6 w-72 h-72 bg-[#89b4fa]/10 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-1/3 right-1/6 w-80 h-80 bg-[#cba6f7]/10 rounded-full filter blur-3xl"></div>
        <div className="absolute top-2/3 left-1/3 w-64 h-64 bg-[#a6e3a1]/10 rounded-full filter blur-3xl"></div>
        <div className="absolute top-1/2 right-1/4 w-60 h-60 bg-[#f38ba8]/10 rounded-full filter blur-3xl"></div>
      </div>

      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-10 md:py-16">
        <div
          ref={macDotsRef}
          className="absolute top-6 left-6 z-10 flex space-x-2 opacity-0"
        >
          <div className="w-3 h-3 rounded-full bg-[#ff5f56] shadow-glow-red"></div>
          <div className="w-3 h-3 rounded-full bg-[#ffbd2e] shadow-glow-yellow"></div>
          <div className="w-3 h-3 rounded-full bg-[#27c93f] shadow-glow-green"></div>
        </div>

        <div className="relative backdrop-blur-sm bg-[#1e1e2e]/60 border border-[#313244] rounded-xl p-6 shadow-2xl mb-10 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-[#1e1e2e]/10 to-transparent"></div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 items-center relative z-10">
            {/* Left column with name, title, and animated text terminal */}
            <div className="lg:col-span-3 order-2 lg:order-1">
              <motion.h1
                ref={headerRef}
                className="text-3xl sm:text-5xl font-bold mb-3 text-white flex flex-col"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <span className="flex items-center whitespace-nowrap">
                  <span className="text-white">Hi, I'm </span>{" "}
                  <span
                    ref={nameRef}
                    className="ml-6 bg-gradient-to-r from-[#89b4fa] to-[#cba6f7] text-transparent bg-clip-text"
                  >
                    Utkarsh Priyadarshi
                  </span>
                </span>
              </motion.h1>

              <motion.p
                ref={bioRef}
                className="text-lg sm:text-xl text-[#cdd6f4] mb-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                Full-Stack Developer & DevOps Engineer
              </motion.p>

              {/* Personal description */}
              <motion.div
                ref={descriptionRef}
                className="mb-6 text-[#bac2de] p-4 border-l-2 border-[#cba6f7] bg-[#1e1e2e]/40 rounded-r-md"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <p className="mb-2">
                  Passionate developer with a knack for crafting elegant
                  solutions to complex problems.
                </p>
                <p className="mb-2">
                  I specialize in building scalable web applications and robust
                  infrastructure systems that deliver exceptional user
                  experiences.
                </p>
                <p>
                  With expertise spanning front-end aesthetics to back-end
                  architecture, I bridge the gap between user needs and
                  technical implementation.
                </p>
              </motion.div>

              {/* Terminal-like animated text with enhanced styling */}
              <div
                ref={terminalRef}
                className="opacity-0 bg-[#11111b]/70 rounded-md border border-[#313244] p-4 shadow-inner"
              >
                <div className="flex items-center mb-2 border-b border-[#313244]/80 pb-2">
                  <div className="w-2 h-2 rounded-full bg-[#f38ba8] mr-2"></div>
                  <div className="w-2 h-2 rounded-full bg-[#f9e2af] mr-2"></div>
                  <div className="w-2 h-2 rounded-full bg-[#a6e3a1] mr-2"></div>
                  <span className="text-xs text-[#6c7086]">
                    terminal@utkarsh:~$
                  </span>
                </div>
                <AnimatedText statements={statements} />
              </div>

              {/* Call to action button with enhanced styling */}
              <motion.div
                className="mt-8 flex gap-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
              >
                <a
                  href="#contact"
                  className="group relative inline-flex items-center gap-x-2 rounded-lg bg-[#89b4fa] hover:bg-[#b4befe] px-6 py-3 text-sm font-semibold text-[#1e1e2e] shadow-md shadow-[#89b4fa]/20 transition-all duration-200 overflow-hidden"
                >
                  <span className="relative z-10">Let's Connect</span>
                  <FaTerminal className="relative z-10" />
                </a>
                <a
                  href="#projects"
                  className="group relative inline-flex items-center gap-x-2 rounded-lg border border-[#cba6f7] bg-transparent hover:bg-[#cba6f7]/10 px-6 py-3 text-sm font-semibold text-[#cba6f7] transition-all duration-200"
                >
                  <span>View Projects</span>
                </a>
              </motion.div>
            </div>

            <div
              ref={avatarRef}
              className="lg:col-span-2 order-1 lg:order-2 flex justify-center"
            >
              <div className="relative">
                <div className="absolute -inset-1 bg-gradient-to-r from-[#89b4fa] via-[#cba6f7] to-[#f38ba8] rounded-full blur opacity-75 animate-pulse"></div>
                <div className="absolute inset-0 bg-[#1e1e2e] rounded-full blur-sm opacity-10"></div>
                <ProfileAvatar />
                <div className="absolute -bottom-2 -right-2 w-12 h-12 bg-[#1e1e2e] rounded-full border-2 border-[#a6e3a1] flex items-center justify-center">
                  <div className="w-4 h-4 rounded-full bg-[#a6e3a1]"></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <TechSkills />
      </div>
    </div>
  );
};

const PersonalHeader = memo(PersonalHeaderComponent);
export default PersonalHeader;
