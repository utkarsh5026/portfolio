import React, { memo, useEffect } from "react";
import {
  motion,
  useAnimation,
  useMotionValue,
  useTransform,
  AnimationControls,
} from "framer-motion";
import { useInView } from "react-intersection-observer";
import ProfileAvatar from "./ProfileAvatar";
import AnimatedText from "./AnimatedText";
import { FaTerminal, FaGithub, FaLinkedin } from "react-icons/fa";
import { HiOutlineDocumentDownload } from "react-icons/hi";
import TechSkills from "./TechSkills";
import "./style.css";
import { useEditorContext } from "@/components/home/editor/context/explorerContext";
import PersonalTitle from "./PersonalTitle";

const statements = [
  "I build things for the web",
  "I love creating user interfaces",
  "I speak JavaScript, Python & Go",
  "I want to write code that humans can read",
  "I am currently exploring databases and LLMs",
];

const PersonalHeaderComponent: React.FC = () => {
  const [containerRef, inView] = useInView({
    threshold: 0.1,
    triggerOnce: false,
  });

  const containerControls = useAnimation();
  const nameControls = useAnimation();
  const bioControls = useAnimation();
  const descriptionControls = useAnimation();
  const avatarControls = useAnimation();
  const terminalControls = useAnimation();
  const buttonControls = useAnimation();

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const glowX = useTransform(mouseX, [0, 300], [0, 300]);
  const glowY = useTransform(mouseY, [0, 300], [0, 300]);

  useEffect(() => {
    if (inView) {
      const sequence = async () => {
        await containerControls.start({
          opacity: 1,
          y: 0,
          transition: { duration: 0.7, ease: "easeOut" },
        });

        await nameControls.start({
          opacity: 1,
          y: 0,
          transition: {
            duration: 0.2,
            type: "spring",
            stiffness: 100,
            damping: 12,
          },
        });

        await Promise.all([
          bioControls.start({
            opacity: 1,
            y: 0,
            transition: {
              duration: 0.2,
              type: "spring",
              stiffness: 100,
              damping: 15,
            },
          }),
          descriptionControls.start({
            opacity: 1,
            x: 0,
            transition: {
              duration: 0.2,
              type: "spring",
              stiffness: 50,
              damping: 15,
            },
          }),
          avatarControls.start({
            opacity: 1,
            scale: 1,
            rotate: 0,
            transition: {
              duration: 0.2,
              type: "spring",
              stiffness: 100,
              damping: 15,
            },
          }),
        ]);

        await terminalControls.start({
          opacity: 1,
          y: 0,
          transition: {
            duration: 0.2,
            type: "spring",
            stiffness: 50,
            damping: 12,
          },
        });

        await buttonControls.start({
          opacity: 1,
          y: 0,
          transition: {
            duration: 0.1,
            staggerChildren: 0.1,
          },
        });
      };

      sequence();
    } else {
      // Reset animations when out of view for re-entry
      containerControls.start({ opacity: 0, y: 50 });
      nameControls.start({ opacity: 0, y: 30 });
      bioControls.start({ opacity: 0, y: 30 });
      descriptionControls.start({ opacity: 0, x: -30 });
      avatarControls.start({ opacity: 0, scale: 0.8, rotate: -10 });
      terminalControls.start({ opacity: 0, y: 30 });
      buttonControls.start({ opacity: 0, y: 30 });
    }
  }, [
    inView,
    containerControls,
    nameControls,
    bioControls,
    descriptionControls,
    avatarControls,
    terminalControls,
    buttonControls,
  ]);

  return (
    <motion.div
      ref={containerRef}
      className="relative isolate  min-h-screen overflow-hidden"
      initial={{ opacity: 0, y: 50 }}
      animate={containerControls}
    >
      <div className="absolute inset-0 pointer-events-none"></div>

      {/* Enhanced background with animated particles */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#1e1e2e] via-[#181825] to-[#11111b] -z-20"></div>
      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-6 md:py-12">
        <motion.div
          style={{
            perspective: "100px",
            transformStyle: "preserve-3d",
          }}
          className="relative backdrop-blur-md bg-[#1e1e2e]/70 border border-[#313244] rounded-xl p-6 md:p-10 shadow-2xl mb-10 overflow-hidden"
        >
          <motion.div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: `radial-gradient(circle at ${glowX.get()}px ${glowY.get()}px, rgba(180, 190, 254, 0.15), rgba(30, 30, 46, 0) 60%)`,
              mixBlendMode: "screen",
            }}
          ></motion.div>

          <div className="absolute inset-0 bg-gradient-to-r from-[#1e1e2e]/20 to-transparent"></div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 items-center relative z-10">
            <div className="lg:col-span-3 order-2 lg:order-1">
              <PersonalTitle
                nameControls={nameControls}
                bioControls={bioControls}
              />
              <PersonalDescription descriptionControls={descriptionControls} />
              <Terminal terminalControls={terminalControls} />
              <Buttons buttonControls={buttonControls} />
            </div>

            <ProfilePicture avatarControls={avatarControls} />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.8 }}
        >
          <TechSkills />
        </motion.div>
      </div>
    </motion.div>
  );
};

interface ProfilePictureProps {
  avatarControls: AnimationControls;
}

const ProfilePicture: React.FC<ProfilePictureProps> = ({ avatarControls }) => {
  return (
    <motion.div
      className="lg:col-span-2 order-1 lg:order-2 flex justify-center"
      initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
      animate={avatarControls}
    >
      <motion.div
        className="relative"
        whileHover={{ scale: 1.05, transition: { duration: 0.3 } }}
      >
        <div className="absolute inset-0 bg-[#1e1e2e] rounded-full blur-sm opacity-10"></div>
        <motion.div
          whileHover={{ rotate: 5 }}
          transition={{ type: "spring", stiffness: 200, damping: 10 }}
        >
          <ProfileAvatar />
        </motion.div>
        <motion.div
          className="absolute -bottom-2 -right-2 w-12 h-12 bg-[#1e1e2e] rounded-full border-2 border-[#a6e3a1] flex items-center justify-center"
          animate={{
            boxShadow: [
              "0 0 0px rgba(166, 227, 161, 0)",
              "0 0 15px rgba(166, 227, 161, 0.5)",
              "0 0 0px rgba(166, 227, 161, 0)",
            ],
          }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <motion.div
            className="w-4 h-4 rounded-full bg-[#a6e3a1]"
            animate={{ scale: [0.1, 1.2, 0.1] }}
            transition={{ duration: 6, repeat: Infinity }}
          ></motion.div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

interface ButtonsProps {
  buttonControls: AnimationControls;
}
const Buttons: React.FC<ButtonsProps> = ({ buttonControls }) => {
  const { setActiveSection } = useEditorContext();
  return (
    <motion.div
      className="mt-8 flex flex-wrap gap-4"
      initial={{ opacity: 0, y: 30 }}
      animate={buttonControls}
    >
      <motion.button
        onClick={() => setActiveSection("contact")}
        className="group relative inline-flex items-center gap-x-2 rounded-lg bg-gradient-to-r from-[#89b4fa] to-[#cba6f7] px-6 py-3 text-sm font-semibold text-[#1e1e2e] overflow-hidden"
        whileHover={{
          scale: 1.05,
          boxShadow: "0 0 25px 0 rgba(137, 180, 250, 0.5)",
        }}
        whileTap={{ scale: 0.98 }}
      >
        <motion.span
          className="absolute inset-0 bg-gradient-to-r from-[#89b4fa] to-[#cba6f7] opacity-0 group-hover:opacity-100"
          animate={{
            backgroundPosition: ["0% 0%", "100% 100%"],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            repeatType: "mirror",
          }}
        ></motion.span>
        <span className="relative z-10">Let's Connect</span>
        <FaTerminal className="relative z-10" />
      </motion.button>

      <motion.button
        onClick={() => setActiveSection("projects")}
        className="group relative inline-flex items-center gap-x-2 rounded-lg border border-[#cba6f7] bg-transparent px-6 py-3 text-sm font-semibold text-[#cba6f7] overflow-hidden"
        whileHover={{
          scale: 1.05,
          boxShadow: "0 0 20px 0 rgba(203, 166, 247, 0.3)",
        }}
        whileTap={{ scale: 0.98 }}
      >
        <motion.span
          className="absolute inset-0 bg-[#cba6f7]/10 opacity-0 group-hover:opacity-100"
          initial={{ y: "100%" }}
          whileHover={{ y: "0%" }}
          transition={{ duration: 0.3 }}
        ></motion.span>
        <span className="relative z-10">View Projects</span>
      </motion.button>

      {/* Additional Social Buttons */}
      <motion.div className="flex gap-2">
        <motion.a
          href="https://github.com/utkarsh5026"
          target="_blank"
          rel="noopener noreferrer"
          className="p-3 rounded-full bg-[#1e1e2e] border border-[#313244] text-[#cdd6f4]"
          whileHover={{
            scale: 1.1,
            backgroundColor: "#313244",
            boxShadow: "0 0 15px 0 rgba(203, 166, 247, 0.3)",
          }}
          whileTap={{ scale: 0.95 }}
        >
          <FaGithub />
        </motion.a>

        <motion.a
          href="https://www.linkedin.com/in/utkarsh-priyadarshi-8b5a731b9/"
          target="_blank"
          rel="noopener noreferrer"
          className="p-3 rounded-full bg-[#1e1e2e] border border-[#313244] text-[#cdd6f4]"
          whileHover={{
            scale: 1.1,
            backgroundColor: "#313244",
            boxShadow: "0 0 15px 0 rgba(137, 180, 250, 0.3)",
          }}
          whileTap={{ scale: 0.95 }}
        >
          <FaLinkedin />
        </motion.a>

        <motion.a
          href="https://drive.google.com/file/d/1Rrg_GQMiwn2FL58L93sztTihyffN2sq9/view"
          target="_blank"
          rel="noopener noreferrer"
          className="p-3 rounded-full bg-[#1e1e2e] border border-[#313244] text-[#cdd6f4]"
          whileHover={{
            scale: 1.1,
            backgroundColor: "#313244",
            boxShadow: "0 0 15px 0 rgba(166, 227, 161, 0.3)",
          }}
          whileTap={{ scale: 0.95 }}
        >
          <HiOutlineDocumentDownload />
        </motion.a>
      </motion.div>
    </motion.div>
  );
};

interface TerminalProps {
  terminalControls: AnimationControls;
}

const Terminal: React.FC<TerminalProps> = ({ terminalControls }) => {
  return (
    <motion.div
      className="bg-[#11111b]/80 backdrop-blur-md rounded-md border border-[#313244] p-5 shadow-lg hover:shadow-xl transition-all"
      initial={{ opacity: 0, y: 30 }}
      animate={terminalControls}
      whileHover={{
        borderColor: "#89b4fa",
        boxShadow: "0 0 20px 0 rgba(137, 180, 250, 0.2)",
        transition: { duration: 0.3 },
      }}
    >
      <div className="flex items-center mb-3 border-b border-[#313244]/80 pb-2">
        <motion.div
          className="w-2 h-2 rounded-full bg-[#f38ba8] mr-2"
          whileHover={{ scale: 1.5 }}
        ></motion.div>
        <motion.div
          className="w-2 h-2 rounded-full bg-[#f9e2af] mr-2"
          whileHover={{ scale: 1.5 }}
        ></motion.div>
        <motion.div
          className="w-2 h-2 rounded-full bg-[#a6e3a1] mr-2"
          whileHover={{ scale: 1.5 }}
        ></motion.div>
        <motion.span
          className="text-xs text-[#6c7086]"
          animate={{
            color: ["#6c7086", "#cdd6f4", "#6c7086"],
          }}
          transition={{ duration: 4, repeat: Infinity }}
        >
          terminal@utkarsh:~$
        </motion.span>
      </div>
      <AnimatedText statements={statements} />
    </motion.div>
  );
};

interface PersonalDescriptionProps {
  descriptionControls: AnimationControls;
}

const PersonalDescription: React.FC<PersonalDescriptionProps> = ({
  descriptionControls,
}) => {
  return (
    <motion.div
      className="mb-6 text-[#bac2de] p-4 border-l-2 border-ctp-peach bg-[#1e1e2e]/60 rounded-md shadow-lg hover:shadow-xl transition-all"
      initial={{ opacity: 0, x: -30 }}
      animate={descriptionControls}
    >
      <p className="mb-2">
        Passionate developer with a knack for crafting elegant solutions to
        complex problems.
      </p>
      <p className="mb-2">
        I specialize in building scalable web applications and robust
        infrastructure systems that deliver exceptional user experiences.
      </p>
      <p>
        With expertise spanning front-end aesthetics to back-end architecture, I
        bridge the gap between user needs and technical implementation.
      </p>
    </motion.div>
  );
};

const PersonalHeader = memo(PersonalHeaderComponent);
export default PersonalHeader;
