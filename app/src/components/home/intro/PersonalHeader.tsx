import AnimatedText from "./AnimatedText";
import React, { useMemo } from "react";
import ProfileAvatar from "./ProfileAvatar";

const PersonalHeader: React.FC = () => {
  const statements = useMemo(
    () => [
      "I build things for the web",
      "I love creating user interfaces",
      "I transform ideas into code",
      "I'm passionate about web development",
    ],
    []
  );

  return (
    <div className="bg-slate-950 min-h-[500px] flex items-center">
      <div className="container mx-auto px-4 py-16">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <div className=" space-y-6  p-4 flex flex-col justify-start items-start gap-4">
            <h1 className="text-4xl md:text-5xl font-bold">
              Hello, I'm{" "}
              <span className="bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent">
                Utkarsh Priyadarshi
              </span>
            </h1>

            <AnimatedText statements={statements} />

            <p className="text-slate-400 max-w-[500px] text-lg">
              Former digital-marketing specialist, seeking to apply competent
              development skills with focus on collaboration, communication, and
              passion
            </p>
          </div>

          <ProfileAvatar />
        </div>
      </div>
    </div>
  );
};

export default PersonalHeader;
