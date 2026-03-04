import React from "react";
import ProfileAvatar from "./profile-avatar";
import styles from "./profile.module.css";

/**
 * ProfilePicture component displays a profile picture with animations.
 * It includes a profile avatar, a shadow effect, and a hover animation.
 *
 * @component
 * @returns {JSX.Element} The rendered ProfilePicture component.
 */
const ProfilePicture: React.FC = () => {
  return (
    <div className="lg:col-span-2 order-1 lg:order-2 flex justify-center">
      <div className={`relative ${styles.pictureContainer}`}>
        <div className="absolute inset-0 bg-ctp-crust rounded-full blur-sm opacity-10"></div>
        <div className={styles.avatarWrapper}>
          <ProfileAvatar />
        </div>
        <div
          className={`absolute -bottom-2 -right-2 w-12 h-12 bg-ctp-crust rounded-full border-2 border-ctp-green flex items-center justify-center z-50 ${styles.statusIndicator}`}
        >
          <div
            className={`w-4 h-4 rounded-full bg-ctp-green ${styles.statusDot}`}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePicture;
