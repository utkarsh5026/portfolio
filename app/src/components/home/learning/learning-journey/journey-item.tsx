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
      <div className="flex gap-6">
        {/* Icon */}
        <div className="flex-shrink-0 relative">
          <motion.div
            className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-300 ${
              isActive
                ? `bg-ctp-${item.color}/20 text-ctp-${item.color} border-2 border-ctp-${item.color}/40`
                : isCompleted
                ? `bg-ctp-${item.color}/10 text-ctp-${item.color}/80 border border-ctp-${item.color}/30`
                : "bg-ctp-surface0/30 text-ctp-subtext0 border border-ctp-surface1"
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
              className="absolute -bottom-1 -right-1 w-5 h-5 bg-ctp-green rounded-full flex items-center justify-center"
            >
              <svg
                className="w-3 h-3 text-ctp-base"
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
            <div className="absolute top-12 left-1/2 w-px h-8 -translate-x-px">
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
            className={`p-6 rounded-2xl border transition-all duration-300 ${
              isActive
                ? `bg-ctp-${item.color}/5 border-ctp-${item.color}/20`
                : isCompleted
                ? "bg-ctp-surface0/30 border-ctp-surface1/50"
                : "bg-ctp-surface0/20 border-ctp-surface1/30"
            }`}
          >
            <h3
              className={`text-lg font-semibold mb-3 ${
                isActive ? `text-ctp-${item.color}` : "text-ctp-text"
              }`}
            >
              {item.title}
            </h3>

            <div className="text-ctp-subtext0 leading-relaxed">
              {isActive ? (
                <>
                  {displayedText}
                  {isTyping && (
                    <motion.span
                      className={`inline-block w-0.5 h-4 bg-ctp-${item.color} ml-1`}
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
                className="mt-4"
              >
                <div className="w-full h-1 bg-ctp-surface1/30 rounded-full overflow-hidden">
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
