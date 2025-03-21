import React, { memo, useEffect } from "react";
import {
  motion,
  useAnimation,
  useMotionValue,
  useTransform,
  AnimationControls,
} from "framer-motion";
import { useInView } from "react-intersection-observer";
import TechSkills from "./TechSkills";
import "./style.css";
import PersonalTitle from "./PersonalTitle";
import ProfileButtons from "./ProfileButtons";
import ProfilePicture from "./ProfilePicture";
import Terminal from "./Terminal";

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
              <ProfileButtons buttonControls={buttonControls} />
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
