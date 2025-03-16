import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface ProgressBarProps {
  color: string;
  progress: number;
}

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
