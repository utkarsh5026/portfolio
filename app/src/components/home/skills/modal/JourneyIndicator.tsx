import { motion } from "framer-motion";
import { journeySteps } from "../data";

interface JourneyCardProps {
  step: (typeof journeySteps)[number];
  index: number;
}

const JourneyCard: React.FC<JourneyCardProps> = ({ step, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className="relative w-full overflow-hidden"
    >
      {/* Background gradient */}
      <div
        className={`absolute inset-0 bg-gradient-to-br from-ctp-${step.color}/5 to-transparent rounded-xl sm:rounded-2xl`}
      />

      <div className="relative p-3 sm:p-4 md:p-6 lg:p-8">
        {/* Header */}
        <div className="flex items-center gap-2 sm:gap-3 md:gap-4 mb-3 sm:mb-4 md:mb-6">
          <motion.div
            className={`p-2 sm:p-2.5 md:p-3 rounded-xl sm:rounded-2xl bg-ctp-${step.color}/20 flex-shrink-0`}
            whileHover={{ scale: 1.05, rotate: 5 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <div
              className={`text-ctp-${step.color} w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6`}
            >
              {step.icon}
            </div>
          </motion.div>

          <div className="min-w-0 flex-1">
            <h3
              className={`text-base sm:text-lg md:text-xl lg:text-2xl font-bold text-ctp-${step.color} mb-0.5 sm:mb-1 leading-tight break-words`}
            >
              {step.title}
            </h3>
            <div className="flex items-center gap-1 sm:gap-2">
              <div
                className={`w-1 h-1 rounded-full bg-ctp-${step.color} flex-shrink-0`}
              />
              <span className="text-xs sm:text-sm text-ctp-subtext0">
                Step {index + 1} of {journeySteps.length}
              </span>
            </div>
          </div>
        </div>

        {/* Description */}
        <motion.p
          className="text-ctp-text leading-relaxed mb-3 sm:mb-4 md:mb-6 text-sm sm:text-base md:text-lg break-words"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          {step.description}
        </motion.p>

        {/* Highlights */}
        <motion.div
          className="space-y-2 sm:space-y-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          <p className="text-xs sm:text-sm font-medium text-ctp-subtext0 mb-2 sm:mb-3">
            Key highlights:
          </p>
          <div className="flex flex-wrap gap-1.5 sm:gap-2">
            {step.highlights.map((highlight, hIndex) => (
              <motion.div
                key={highlight}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 + hIndex * 0.1, duration: 0.3 }}
                className={`px-2 sm:px-2.5 md:px-3 py-1 sm:py-1.5 rounded-full bg-ctp-${step.color}/10 border border-ctp-${step.color}/20 max-w-full`}
              >
                <span
                  className={`text-xs sm:text-sm font-medium text-ctp-${step.color} break-words`}
                >
                  {highlight}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default JourneyCard;
