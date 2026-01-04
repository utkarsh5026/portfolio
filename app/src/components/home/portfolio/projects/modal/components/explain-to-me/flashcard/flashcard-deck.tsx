import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { Flashcard as FlashcardType } from "@/types";
import type { Phase } from "../config";
import Flashcard from "./flashcard";

interface FlashcardDeckProps {
  cards: FlashcardType[];
  phase: Phase;
  currentIndex: number;
  direction: number;
}

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 200 : -200,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    x: direction < 0 ? 200 : -200,
    opacity: 0,
  }),
};

const FlashcardDeck: React.FC<FlashcardDeckProps> = ({
  cards,
  phase,
  currentIndex,
  direction,
}) => {
  if (!cards.length) return null;

  const currentCard = cards[currentIndex];

  return (
    <div className="relative w-full h-44 sm:h-52">
      <AnimatePresence mode="wait" custom={direction}>
        <motion.div
          key={`${phase}-${currentIndex}`}
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { type: "spring", stiffness: 300, damping: 30 },
            opacity: { duration: 0.15 },
          }}
          className="absolute inset-0"
        >
          <Flashcard
            card={currentCard}
            phase={phase}
            index={currentIndex}
            total={cards.length}
          />
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default FlashcardDeck;
