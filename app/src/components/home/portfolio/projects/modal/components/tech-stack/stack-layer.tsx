import useMobile from "@/hooks/use-mobile";
import { motion } from "framer-motion";
import { memo } from "react";

interface StackLayerProps {
  itemIndex: number;
  activeItemIndex: number;
  totalCards: number;
  goToCard: (index: number) => void;
  children: React.ReactNode;
}

const StackLayer: React.FC<StackLayerProps> = memo(
  ({ itemIndex, activeItemIndex, totalCards, goToCard, children }) => {
    const { isMobile } = useMobile();

    const isActive = itemIndex === activeItemIndex;
    const stackOffset = itemIndex - activeItemIndex;
    const absOffset = Math.abs(stackOffset);

    // Responsive spacing and positioning
    const translateX = isMobile ? stackOffset * 15 : stackOffset * 36;
    const translateY = isMobile ? absOffset * 6 : absOffset * 12;
    const scale = isActive
      ? 1
      : Math.max(
          isMobile ? 0.95 : 0.92,
          1 - absOffset * (isMobile ? 0.025 : 0.04)
        );
    const zIndex = totalCards - absOffset;

    const rotate = isActive ? 0 : stackOffset * (isMobile ? 1.5 : 3.5);

    // Responsive dimensions - smaller for mobile
    const cardWidth = isMobile ? "280px" : "420px";
    const cardHeight = isMobile ? "360px" : "480px";

    return (
      <motion.div
        className="absolute cursor-pointer select-none"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{
          opacity: absOffset > (isMobile ? 2 : 4) ? 0 : 1,
          scale,
          x: translateX,
          y: translateY,
          rotate,
          zIndex,
        }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{
          type: "spring",
          stiffness: isMobile ? 200 : 200,
          damping: isMobile ? 28 : 20,
          opacity: { duration: 0.2 },
        }}
        onClick={() => !isActive && goToCard(itemIndex)}
        style={{
          width: cardWidth,
          height: cardHeight,
        }}
      >
        {children}
      </motion.div>
    );
  }
);

export default StackLayer;
