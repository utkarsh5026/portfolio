import { Sparkles } from "lucide-react";
import ProgressBar from "@/components/utils/ProgressBar";
import styles from "./css/Header.module.css";

interface HeaderProps {
  currentIndex: number;
  calculateProgress: () => number;
  accentColors: string[];
}

/**
 * Header Component
 *
 * This component displays the header section of the skills modal, including
 * an animated icon, a title, a subtitle, and a progress bar that indicates
 * the user's progress through their tech journey.
 *
 * Props:
 * - currentIndex (number): The index of the current skill being displayed.
 * - calculateProgress (function): A function that calculates the user's
 *   progress as a percentage.
 * - accentColors (string[]): An array of color strings used for the progress
 *   bar, corresponding to the current skill index.
 *
 * Usage:
 * <Header
 *   currentIndex={currentIndex}
 *   calculateProgress={calculateProgress}
 *   accentColors={accentColors}
 * />
 */
const Header: React.FC<HeaderProps> = ({
  currentIndex,
  calculateProgress,
  accentColors,
}) => {
  return (
    <>
      <div className="mb-8 flex items-center gap-3">
        <div className="relative">
          <div
            className={`${styles.sparkleIcon} rounded-full bg-gradient-to-r from-ctp-blue to-ctp-mauve p-3 text-ctp-base shadow-lg shadow-ctp-mantle`}
          >
            <Sparkles className="h-5 w-5" />
          </div>
        </div>

        <div>
          <h3 className="text-xl font-bold bg-gradient-to-r from-ctp-blue via-ctp-lavender to-ctp-mauve bg-clip-text text-transparent">
            My Tech Journey
          </h3>
          <p className="text-sm text-ctp-subtext0 mt-1">
            Skills & experiences I've gathered along the way
          </p>
        </div>
      </div>

      {/* Skills progress bar */}
      <div className="mb-8">
        <ProgressBar
          color={accentColors[currentIndex]}
          progress={calculateProgress()}
        />
      </div>
    </>
  );
};

export default Header;
