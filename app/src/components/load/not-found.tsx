import { motion } from "framer-motion";
import { AlertCircle,Home } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(3);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          navigate("/", { replace: true });
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen bg-ctp-base flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center max-w-md"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          className="mb-6 flex justify-center"
        >
          <div className="relative">
            <AlertCircle className="w-24 h-24 text-ctp-red" />
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.5, 0.8, 0.5],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute inset-0 bg-ctp-red rounded-full blur-xl opacity-50"
            />
          </div>
        </motion.div>

        <h1 className="text-4xl md:text-5xl font-bold text-ctp-text mb-4">
          Oops!
        </h1>

        <p className="text-lg text-ctp-subtext0 mb-2">
          This page doesn't exist
        </p>

        <p className="text-sm text-ctp-subtext1 mb-8">
          Taking you to the home page in{" "}
          <span className="text-ctp-peach font-bold text-xl">{countdown}</span>{" "}
          seconds...
        </p>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate("/", { replace: true })}
          className="inline-flex items-center gap-2 bg-ctp-mauve text-ctp-base px-6 py-3 rounded-lg font-medium hover:bg-ctp-mauve/90 transition-colors"
        >
          <Home className="w-5 h-5" />
          Go Home Now
        </motion.button>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-8 text-xs text-ctp-subtext1"
        >
          Looking for something specific? Try the navigation menu.
        </motion.div>
      </motion.div>
    </div>
  );
};

export default NotFound;
