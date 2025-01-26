import AnimatedText from "./AnimatedText";
import React, { useMemo } from "react";
import ProfileAvatar from "./ProfileAvatar";

const PersonalHeaderComponent: React.FC = () => {
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

  return (
    <div className="relative bg-slate-950 min-h-[450px] sm:min-h-[550px] lg:min-h-[650px] flex items-center pt-8 sm:pt-16 md:pt-0 overflow-hidden rounded-2xl bg-gradient-border mt-8">
      <div className="absolute inset-0 opacity-10">
        <div className="smoke-1 absolute inset-0 bg-gradient-to-r from-purple-900/20 to-blue-900/20 animate-smoke-1" />
        <div className="smoke-2 absolute inset-0 bg-gradient-to-l from-indigo-900/20 to-slate-900/20 animate-smoke-2" />
      </div>

      <div className="container relative mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 md:gap-6 lg:gap-8">
          <div className="w-full space-y-8 sm:space-y-5 flex flex-col justify-start items-start md:order-1">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold order-1">
              Hello, I'm{" "}
              <span className="bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent">
                Utkarsh Priyadarshi
              </span>
            </h1>

            <div className="w-full md:hidden order-2 flex justify-center mb-8">
              <ProfileAvatar />
            </div>

            <div className="order-3 px-2 sm:px-4">
              <AnimatedText statements={statements} />
            </div>

            <p className="text-slate-400 max-w-[600px] text-base sm:text-lg lg:text-xl order-4 px-2 sm:px-4 mt-4">
              I'm a software engineer with a passion for creating user-friendly
              and efficient web applications. I'm a quick learner and I'm always
              looking to expand my skills. I develop mostly full-stack web
              applications and currently, I am looking for opportunities to work
              with a team of passionate developers.
            </p>
          </div>

          <div className="hidden md:flex w-full md:w-auto justify-center md:justify-start md:order-2">
            <ProfileAvatar />
          </div>
        </div>
      </div>
    </div>
  );
};

const PersonalHeader = React.memo(PersonalHeaderComponent);
export default PersonalHeader;
