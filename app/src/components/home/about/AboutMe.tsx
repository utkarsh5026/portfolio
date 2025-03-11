import React from "react";
import Section from "@/components/section/Section";
import {
  FaLaptopCode,
  FaBook,
  FaCode,
  FaGraduationCap,
  FaBrain,
} from "react-icons/fa";
import { GiBullseye } from "react-icons/gi";
import Background from "./Background";
import Education from "./Education";
import OutlineNode from "../editor/outline/OutlineNode";
import Skills from "./Skills";
import Philosophy from "./Philosophy";
import InterestsHobbies from "./Intersests";
import CurrentFocus from "./CurrentFocus";

const ABOUT_SECTION = "about";

interface AboutMeSection {
  label: string;
  icon: React.ReactNode;
  content: React.ReactNode;
}

const AboutMeSection: React.FC<AboutMeSection> = ({ label, icon, content }) => {
  return (
    <OutlineNode
      label={label}
      id={label.toLowerCase()}
      level={1}
      parentId={ABOUT_SECTION}
      icon={icon}
    >
      {content}
    </OutlineNode>
  );
};

const AboutMe: React.FC = () => {
  return (
    <Section id={ABOUT_SECTION} label="About Me" icon="class">
      <div className="max-w-4xl mx-auto">
        <div className="border border-[#313244] bg-[#181825] rounded-lg overflow-hidden shadow-lg relative">
          <div className="absolute inset-0 bg-gradient-to-br from-[#cba6f7]/5 to-transparent pointer-events-none"></div>
          <div className="bg-[#1e1e2e] px-4 py-3 border-b border-[#313244] flex items-center">
            <div className="ml-auto text-[#6c7086] text-xs">
              <span className="px-2 py-1 rounded bg-[#313244]/40">
                Utkarsh Priyadarshi
              </span>
            </div>
          </div>

          <div className="p-6 relative">
            {/* Decorative code line numbers */}
            <div className="absolute left-2 top-6 bottom-6 w-6 text-[#6c7086] text-xs flex flex-col items-end">
              {Array.from({ length: 10 }).map((_, i) => (
                <div key={i} className="h-6 opacity-50">
                  {i + 1}
                </div>
              ))}
            </div>

            <div className="space-y-8 pl-8 flex flex-col gap-6">
              <AboutMeSection
                label="Background"
                icon={<FaCode />}
                content={<Background />}
              />
              <AboutMeSection
                label="Education"
                icon={<FaGraduationCap className="text-ctp-peach" />}
                content={<Education />}
              />
              <AboutMeSection
                label="Skills"
                icon={<FaLaptopCode className="text-ctp-red" />}
                content={<Skills />}
              />
              <AboutMeSection
                label="Philosophy"
                icon={<FaBrain className="text-ctp-blue" />}
                content={<Philosophy />}
              />
              <AboutMeSection
                label="Interests & Hobbies"
                icon={<FaBook className="text-ctp-green" />}
                content={<InterestsHobbies />}
              />
              <AboutMeSection
                label="Current Focus"
                icon={<GiBullseye className="text-ctp-pink" />}
                content={<CurrentFocus />}
              />
            </div>
          </div>

          <div className="bg-[#1e1e2e] py-2 px-4 border-t border-[#313244] flex items-center text-xs text-[#6c7086]">
            <div className="flex items-center">
              <span className="w-2 h-2 rounded-full bg-[#a6e3a1] mr-1"></span>
              <span>active</span>
            </div>
            <div className="mx-auto">about_me.jsx - 152 lines</div>
            <div>utf-8</div>
          </div>
        </div>
      </div>
    </Section>
  );
};

export default AboutMe;
