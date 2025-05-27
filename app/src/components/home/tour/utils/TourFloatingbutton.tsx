import React, { useState } from "react";
import { useTour } from "../context/TourContext";
import { motion, AnimatePresence } from "framer-motion";
import { Lightbulb, Sparkles, PanelRightOpen } from "lucide-react";
import { generateArrayWithUniqueIds } from "@/utils/unique-ids";

const lightRays = generateArrayWithUniqueIds(4);

const TourFloatingButton: React.FC = () => {
  const { active, startTour } = useTour();
  const [hovered, setHovered] = useState(false);

  return (
    <motion.button
      className="fixed bottom-6 right-6 flex items-center gap-2 py-3 px-4 rounded-full font-mono text-sm font-bold shadow-xl z-[999999999]"
      style={{
        background: hovered
          ? "linear-gradient(135deg, #fab387, #f9e2af)"
          : "linear-gradient(135deg, #f9e2af, #fab387)",
        color: "#11111b",
        border: "1px solid rgba(49, 50, 68, 0.2)",
        boxShadow: hovered
          ? "0 8px 16px rgba(137, 180, 250, 0.3), 0 0 0 2px rgba(249, 226, 175, 0.3)"
          : "0 4px 12px rgba(0, 0, 0, 0.15)",
      }}
      onClick={startTour}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      disabled={active}
      aria-label="Take a guided tour"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", damping: 15 }}
    >
      {/* Animated lighthouse/lightbulb icon */}
      <motion.div
        className="relative"
        animate={
          hovered
            ? {
                rotate: [-5, 5, -5],
              }
            : { rotate: 0 }
        }
        transition={{ duration: 2, repeat: hovered ? Infinity : 0 }}
      >
        {hovered ? (
          <Lightbulb className="text-lg" />
        ) : (
          <PanelRightOpen className="text-lg" />
        )}

        <AnimatePresence>
          {hovered && (
            <motion.div
              className="absolute inset-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {lightRays.map((ray, i) => (
                <motion.div
                  key={ray}
                  className="absolute left-1/2 top-1/2 w-px bg-yellow-500 origin-bottom"
                  style={{
                    height: 8 + i * 2,
                    transformOrigin: "center bottom",
                    transform: `rotate(${i * 45}deg) translateX(-50%)`,
                    opacity: 0.6,
                  }}
                  animate={{ opacity: [0.3, 0.6, 0.3] }}
                  transition={{
                    duration: 1,
                    repeat: Infinity,
                    delay: i * 0.1,
                  }}
                />
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      <span className="tour-button-text">Take a Tour</span>

      {/* Sparkle effect */}
      <AnimatePresence>
        {hovered && (
          <motion.div
            className="absolute right-2 text-amber-600/40"
            initial={{ opacity: 0, scale: 0.5, rotate: -20 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            exit={{ opacity: 0, scale: 0.5, rotate: 20 }}
            transition={{ duration: 0.3 }}
          >
            <Sparkles size={14} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Pulsing background effect */}
      <motion.div
        className="absolute inset-0 rounded-full opacity-80"
        animate={{
          boxShadow: [
            "0 0 0 0 rgba(249, 226, 175, 0)",
            "0 0 0 4px rgba(249, 226, 175, 0.3)",
            "0 0 0 8px rgba(249, 226, 175, 0)",
          ],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          repeatType: "loop",
          ease: "easeInOut",
        }}
      />
    </motion.button>
  );
};

export default TourFloatingButton;
