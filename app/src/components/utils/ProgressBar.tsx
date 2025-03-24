import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface ProgressBarProps {
  color: string;
  progress: number;
}

/**
 * ProgressBar Component
 *
 * A customizable progress bar component that utilizes Framer Motion for smooth animations.
 * It displays a visually appealing progress bar with a user-friendly interface.
 *
 * Props:
 * - color: string
 *   The color of the progress bar. This should match a color class in your CSS.
 * - progress: number
 *   The percentage of progress to display on the bar. This should be a value between 0 and 100.
 *
 * Usage:
 * <ProgressBar color="primary" progress={50} />
 *
 * Example:
 * const MyComponent = () => {
 *   return (
 *     <ProgressBar color="success" progress={75} />
 *   );
 * };
 */
const ProgressBar: React.FC<ProgressBarProps> = ({ color, progress }) => {
  return (
    <div className="relative mt-3 mx-6">
      <div className="h-2 bg-ctp-surface0/30 rounded-full">
        <motion.div
          className={cn(
            "h-2 rounded-full absolute top-0 left-0",
            `bg-ctp-${color}/20`
          )}
          initial={{ width: "0%" }}
          animate={{
            width: `${progress}%`,
          }}
          transition={{ ease: "linear" }}
        />
      </div>
    </div>
  );
};

export default ProgressBar;
