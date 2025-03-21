import React, { memo, useEffect } from "react";
import {
  motion,
  useAnimation,
  useMotionValue,
  useTransform,
} from "framer-motion";
import { useInView } from "react-intersection-observer";
import TechSkills from "./TechSkills";
import "./style.css";
import PersonalTitle from "./PersonalTitle";
import ProfileButtons from "./ProfileButtons";
import ProfilePicture from "./ProfilePicture";
import Terminal from "./Terminal";
import PersonalDescription from "./PersonalDescription";

/**
 * PersonalHeaderComponent is a functional React component that serves as the header section
 * of a personal portfolio or profile page. It utilizes Framer Motion for animations and
 * the Intersection Observer API to trigger animations when the component comes into view.
 *
 * The component includes various animated elements such as the user's name, bio, description,
 * avatar, terminal interface, and profile buttons. It also features a dynamic background
 * that responds to mouse movements.
 *
 * Key Features:
 * - Animations triggered when the component comes into view using the `useInView` hook.
 * - Multiple animation controls for different sections of the header, allowing for
 *   coordinated animations.
 * - Mouse movement tracking to create a glowing effect in the background.
 * - Responsive design with a grid layout for different screen sizes.
 *
 * @component
 * @returns {JSX.Element} The rendered PersonalHeaderComponent.
 */
const PersonalHeaderComponent: React.FC = () => {
  const [containerRef, inView] = useInView({
    threshold: 0.1, // Trigger when 10% of the component is visible
    triggerOnce: false, // Allow multiple triggers
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

  /**
   * It manages animations based on component visibility.
   *
   * When the component is in view, it triggers a sequence of animations
   * for various elements (container, name, bio, description, avatar, terminal, buttons).
   *
   * If the component is out of view, it resets the animations to their initial states.
   */
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

const PersonalHeader = memo(PersonalHeaderComponent);
export default PersonalHeader;
