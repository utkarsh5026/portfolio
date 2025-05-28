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
    const isActive = itemIndex === activeItemIndex;
    const stackOffset = itemIndex - activeItemIndex;
    const absOffset = Math.abs(stackOffset);

    const translateX = stackOffset * 36;
    const translateY = absOffset * 12;
    const scale = isActive ? 1 : Math.max(0.92, 1 - absOffset * 0.04);
    const zIndex = totalCards - absOffset;

    const rotate = isActive ? 0 : stackOffset * 3.5;
    return (
      <motion.div
        className="absolute cursor-grab active:cursor-grabbing"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{
          opacity: absOffset > 4 ? 0 : 1,
          scale,
          x: translateX,
          y: translateY,
          rotate,
          zIndex,
        }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{
          type: "spring",
          stiffness: 200,
          damping: 20,
          opacity: { duration: 0.2 },
        }}
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0.1}
        onDragEnd={handleDragEnd}
        onClick={() => !isActive && goToCard(itemIndex)}
        style={{
          width: "420px",
          height: "480px",
        }}
      >
        {children}
      </motion.div>
    );
  }
);

export default StackLayer;
