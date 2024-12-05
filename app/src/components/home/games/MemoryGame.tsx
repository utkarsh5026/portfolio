import React, { useState, useEffect, useMemo, useCallback } from "react";

interface Card {
  id: number;
  emoji: string;
  isFlipped: boolean;
  isMatched: boolean;
}

/**
 * It is a memory game component that allows the user to flip cards and match them.
 * It is a simple game that can be used to test the user's memory.
 */
const MemoryGame: React.FC = () => {
  const emojis: string[] = useMemo(() => {
    const allEmojis = [
      "🎮",
      "🎲",
      "🎯",
      "🎨",
      "🎭",
      "🎪",
      "🎟️",
      "🎫",
      "🎼",
      "🎵",
      "🎹",
      "🎷",
      "🎺",
      "🎸",
      "🪕",
      "🎻",
      "⚽",
      "⚾",
      "🏀",
      "🏐",
      "🏈",
      "🏉",
      "🎾",
      "🥏",
      "🎳",
      "🏏",
      "🏑",
      "🏒",
      "🥍",
      "🏓",
      "🏸",
      "🥊",
      "🌈",
      "🌟",
      "🚀",
      "🔥",
      "☀️",
      "🌙",
      "⛈️",
      "🌤️",
      "🌦️",
      "🌧️",
      "🌩️",
      "🌪️",
      "🌫️",
      "🌬️",
      "🌈",
      "🌊",
      "🦁",
      "🐯",
      "🐮",
      "🐷",
      "🐸",
      "🐙",
      "🦄",
      "🦊",
      "🐶",
      "🐱",
      "🐭",
      "🐹",
      "🐰",
      "🦒",
      "🐘",
      "🦚",
    ];
    // Randomly select 8 unique emojis from the array
    return allEmojis.sort(() => Math.random() - 0.5).slice(0, 8);
  }, []);
  const [cards, setCards] = useState<Card[]>([]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [moves, setMoves] = useState<number>(0);
  const [isComplete, setIsComplete] = useState<boolean>(false);

  useEffect(() => {
    const shuffledCards: Card[] = [...emojis, ...emojis]
      .sort(() => Math.random() - 0.5)
      .map((emoji, index) => ({
        id: index,
        emoji,
        isFlipped: false,
        isMatched: false,
      }));
    setCards(shuffledCards);
    setMoves(0);
    setIsComplete(false);
    setFlippedCards([]);
  }, [emojis]);

  const handleCardClick = (clickedId: number): void => {
    if (flippedCards.length === 2) return;
    if (cards[clickedId].isMatched || cards[clickedId].isFlipped) return;

    const newCards = [...cards];
    newCards[clickedId].isFlipped = true;
    setCards(newCards);
    setFlippedCards([...flippedCards, clickedId]);

    if (flippedCards.length === 1) {
      setMoves(moves + 1);
      const [firstCard] = flippedCards;

      if (cards[firstCard].emoji === cards[clickedId].emoji) {
        setTimeout(() => {
          const matchedCards = [...cards];
          matchedCards[firstCard].isMatched = true;
          matchedCards[clickedId].isMatched = true;
          setCards(matchedCards);
          setFlippedCards([]);

          if (matchedCards.every((card) => card.isMatched)) {
            setIsComplete(true);
          }
        }, 500);
      } else {
        setTimeout(() => {
          const resetCards = [...cards];
          resetCards[firstCard].isFlipped = false;
          resetCards[clickedId].isFlipped = false;
          setCards(resetCards);
          setFlippedCards([]);
        }, 1000);
      }
    }
  };

  const restartGame = useCallback(() => {
    const shuffledCards: Card[] = [...emojis, ...emojis]
      .sort(() => Math.random() - 0.5)
      .map((emoji, index) => ({
        id: index,
        emoji,
        isFlipped: false,
        isMatched: false,
      }));
    setCards(shuffledCards);
    setMoves(0);
    setIsComplete(false);
    setFlippedCards([]);
  }, [emojis]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 p-4 my-64">
      <div className="mb-4 text-white">
        <span className="text-xl">Moves: {moves}</span>
        {isComplete && <span className="ml-4 text-green-400">Complete!</span>}
      </div>

      {isComplete && (
        <button
          onClick={restartGame}
          className="mb-4 px-4 py-2 bg-green-500 text-white rounded"
        >
          Restart
        </button>
      )}

      <div className="grid grid-cols-4 gap-4 max-w-md">
        {cards.map((card) => (
          <div
            key={card.id}
            onClick={() => handleCardClick(card.id)}
            className="relative w-24 h-24 cursor-pointer preserve-3d"
          >
            <div
              className={`absolute w-full h-full transition-all duration-500 transform-style-preserve-3d ${
                card.isFlipped || card.isMatched ? "rotate-y-180" : ""
              }`}
            >
              <div className="absolute w-full h-full bg-blue-500 rounded-lg backface-hidden flex items-center justify-center"></div>

              {/* Back of card */}
              <div
                className={`absolute w-full h-full rounded-lg backface-hidden flex items-center justify-center transform rotate-y-180 ${
                  card.isMatched ? "bg-purple-600 opacity-50" : "bg-purple-600"
                }`}
              >
                <span className="text-4xl">{card.emoji}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <style>{`
        .preserve-3d {
          perspective: 1000px;
        }
        .transform-style-preserve-3d {
          transform-style: preserve-3d;
        }
        .backface-hidden {
          backface-visibility: hidden;
        }
        .rotate-y-180 {
          transform: rotateY(180deg);
        }
      `}</style>
    </div>
  );
};

export default MemoryGame;
