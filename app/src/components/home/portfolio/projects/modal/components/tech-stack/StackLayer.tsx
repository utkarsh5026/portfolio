import useMobile from "@/hooks/use-mobile";
import { motion, PanInfo } from "framer-motion";
import { memo } from "react";

interface StackLayerProps {
  itemIndex: number;
  activeItemIndex: number;
  totalCards: number;
  handleDragEnd: (
    event: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo
  ) => void;
  goToCard: (index: number) => void;
  children: React.ReactNode;
}

const StackLayer: React.FC<StackLayerProps> = memo(
  ({
    itemIndex,
    activeItemIndex,
    totalCards,
    handleDragEnd,
    goToCard,
    children,
  }) => {
    const { isMobile } = useMobile();

    const isActive = itemIndex === activeItemIndex;
    const stackOffset = itemIndex - activeItemIndex;
    const absOffset = Math.abs(stackOffset);

    // Responsive spacing and positioning
    const translateX = isMobile ? stackOffset * 20 : stackOffset * 36;
    const translateY = isMobile ? absOffset * 8 : absOffset * 12;
    const scale = isActive
      ? 1
      : Math.max(
          isMobile ? 0.94 : 0.92,
          1 - absOffset * (isMobile ? 0.03 : 0.04)
        );
    const zIndex = totalCards - absOffset;

    const rotate = isActive ? 0 : stackOffset * (isMobile ? 2 : 3.5);

    // Responsive dimensions
    const cardWidth = isMobile ? "300px" : "420px";
    const cardHeight = isMobile ? "400px" : "480px";

    return (
      <motion.div
        className="absolute cursor-grab active:cursor-grabbing"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{
          opacity: absOffset > (isMobile ? 3 : 4) ? 0 : 1,
          scale,
          x: translateX,
          y: translateY,
          rotate,
          zIndex,
        }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{
          type: "spring",
          stiffness: isMobile ? 180 : 200,
          damping: isMobile ? 25 : 20,
          opacity: { duration: 0.2 },
        }}
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={isMobile ? 0.15 : 0.1}
        onDragEnd={handleDragEnd}
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
