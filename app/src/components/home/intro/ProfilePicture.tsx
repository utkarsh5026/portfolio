import { AnimationControls, motion } from "framer-motion";
import React from "react";
import ProfileAvatar from "./ProfileAvatar";

interface ProfilePictureProps {
  avatarControls: AnimationControls;
}

/**
 * ProfilePicture component displays a profile picture with animations.
 * It includes a profile avatar, a shadow effect, and a hover animation.
 *
 * @component
 * @param {ProfilePictureProps} props - The properties for the component.
 * @param {AnimationControls} props.avatarControls - Animation controls for the avatar.
 * @returns {JSX.Element} The rendered ProfilePicture component.
 */
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

export default ProfilePicture;
