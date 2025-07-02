import { motion } from "framer-motion";
import { learningJourneyItems } from "../data";

interface JourneyItemProps {
  item: (typeof learningJourneyItems)[0];
  index: number;
  currentIndex: number;
  completedItems: number[];
  displayedText: string;
  isTyping: boolean;
  progress: number;
}

const JourneyItem: React.FC<JourneyItemProps> = ({
  item,
  index,
  currentIndex,
  completedItems,
  displayedText,
  isTyping,
  progress,
}) => {
  const isActive = index === currentIndex;
  const isCompleted = completedItems.includes(index);
  const isUpcoming = index > currentIndex && !isCompleted;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{
        opacity: isUpcoming ? 0.4 : 1,
        y: 0,
      }}
      className={`relative transition-all duration-500 ${
        isUpcoming ? "pointer-events-none" : ""
      }`}
    >
      <div className="flex gap-3 sm:gap-4 md:gap-6">
        {/* Icon */}
        <div className="flex-shrink-0 relative">
          <motion.div
            className={`w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-xl sm:rounded-2xl flex items-center justify-center transition-all duration-300 border-none text-sm sm:text-base ${
              isActive
                ? `bg-ctp-${item.color}/20 text-ctp-${item.color} border-none`
                : isCompleted
                ? `bg-ctp-${item.color}/10 text-ctp-${item.color}/80 border-none`
                : "bg-ctp-surface0/30 text-ctp-subtext0 border-none"
            }`}
            animate={isActive ? { scale: [1, 1.05, 1] } : {}}
            transition={{ duration: 2, repeat: Infinity }}
          >
            {item.icon}
          </motion.div>

          {/* Status Indicator */}
          {isCompleted && (
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="absolute -bottom-0.5 -right-0.5 sm:-bottom-1 sm:-right-1 w-4 h-4 sm:w-5 sm:h-5 bg-ctp-green rounded-full flex items-center justify-center"
            >
              <svg
                className="w-2 h-2 sm:w-3 sm:h-3 text-ctp-base"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={3}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m4.5 12.75 6 6 9-13.5"
                />
              </svg>
            </motion.div>
          )}

          {/* Connection Line */}
          {index < learningJourneyItems.length - 1 && (
            <div className="absolute top-8 sm:top-10 md:top-12 left-1/2 w-px h-4 sm:h-6 md:h-8 -translate-x-px">
              <motion.div
                className={`w-full h-full ${
                  isCompleted ? `bg-ctp-${item.color}/40` : "bg-ctp-surface1/50"
                }`}
                initial={{ scaleY: 0 }}
                animate={{ scaleY: isCompleted ? 1 : 0 }}
                style={{ transformOrigin: "top" }}
                transition={{ duration: 0.5 }}
              />
            </div>
          )}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <motion.div
            className={`p-3 sm:p-4 md:p-6 rounded-xl sm:rounded-2xl border transition-all duration-300 ${
              isActive
                ? `bg-ctp-${item.color}/5 border-ctp-${item.color}/20`
                : isCompleted
                ? "bg-ctp-surface0/30 border-ctp-surface1/50"
                : "bg-ctp-surface0/20 border-ctp-surface1/30"
            }`}
          >
            <h3
              className={`text-base sm:text-lg font-semibold mb-2 sm:mb-3 ${
                isActive ? `text-ctp-${item.color}` : "text-ctp-text"
              }`}
            >
              {item.title}
            </h3>

            <div className="text-sm sm:text-base text-ctp-subtext0 leading-relaxed">
              {isActive ? (
                <>
                  {displayedText}
                  {isTyping && (
                    <motion.span
                      className={`inline-block w-0.5 h-3 sm:h-4 bg-ctp-${item.color} ml-1`}
                      animate={{ opacity: [0, 1, 0] }}
                      transition={{ duration: 1, repeat: Infinity }}
                    />
                  )}
                </>
              ) : (
                item.description
              )}
            </div>

            {/* Progress Bar for Active Item */}
            {isActive && isTyping && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mt-3 sm:mt-4"
              >
                <div className="w-full h-0.5 sm:h-1 bg-ctp-surface1/30 rounded-full overflow-hidden">
                  <motion.div
                    className={`h-full bg-ctp-${item.color} rounded-full`}
                    style={{ width: `${progress}%` }}
                    transition={{ duration: 0.1 }}
                  />
                </div>
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default JourneyItem;
