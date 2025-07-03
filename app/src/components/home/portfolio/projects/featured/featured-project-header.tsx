import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

/**
 * FeaturedHeader component displays the header for the featured project section.
 * It includes a title, an animated sparkles icon, a divider, and a button to toggle
 * the visibility of the featured project details.
 *
 * @param {boolean} isOpen - Indicates whether the featured project details are currently open.
 * @param {function} toggleOpen - Function to toggle the open state of the featured project details.
 *
 * @returns {JSX.Element} The rendered FeaturedHeader component.
 */
const FeaturedHeader: React.FC = () => {
  return (
    <div className="flex items-center gap-3 mb-6">
      <motion.div
        initial={{ rotate: -10, scale: 0.8, opacity: 0 }}
        animate={{ rotate: 0, scale: 1, opacity: 1 }}
        transition={{
          duration: 0.6,
          type: "spring",
          stiffness: 200,
        }}
      >
        <div className="p-2 bg-gradient-to-r from-ctp-peach to-ctp-yellow rounded-full">
          <Sparkles className="w-5 h-5 text-ctp-crust" />
        </div>
      </motion.div>

      <motion.h3
        className="text-xl font-bold bg-gradient-to-r from-ctp-peach to-ctp-yellow bg-clip-text text-transparent"
        initial={{ x: -20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        Featured Project
      </motion.h3>

      <motion.div
        className="h-px flex-grow"
        initial={{ scaleX: 0, opacity: 0 }}
        animate={{ scaleX: 1, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        style={{
          background:
            "linear-gradient(90deg, rgba(250,179,135,0.5) 0%, rgba(137,180,250,0) 100%)",
          transformOrigin: "left",
        }}
      />
    </div>
  );
};

export default FeaturedHeader;
