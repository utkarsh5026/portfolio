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
      className="relative"
    >
      {/* Background gradient */}
      <div
        className={`absolute inset-0 bg-gradient-to-br from-ctp-${step.color}/5 to-transparent rounded-2xl`}
      />

      <div className="relative p-6 sm:p-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <motion.div
            className={`p-3 rounded-2xl bg-ctp-${step.color}/20`}
            whileHover={{ scale: 1.05, rotate: 5 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <div className={`text-ctp-${step.color}`}>{step.icon}</div>
          </motion.div>

          <div>
            <h3
              className={`text-xl sm:text-2xl font-bold text-ctp-${step.color} mb-1`}
            >
              {step.title}
            </h3>
            <div className="flex items-center gap-2">
              <div className={`w-1 h-1 rounded-full bg-ctp-${step.color}`} />
              <span className="text-sm text-ctp-subtext0">
                Step {index + 1} of {journeySteps.length}
              </span>
            </div>
          </div>
        </div>

        {/* Description */}
        <motion.p
          className="text-ctp-text leading-relaxed mb-6 text-base sm:text-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          {step.description}
        </motion.p>

        {/* Highlights */}
        <motion.div
          className="space-y-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          <p className="text-sm font-medium text-ctp-subtext0 mb-3">
            Key highlights:
          </p>
          <div className="flex flex-wrap gap-2">
            {step.highlights.map((highlight, hIndex) => (
              <motion.div
                key={highlight}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 + hIndex * 0.1, duration: 0.3 }}
                className={`px-3 py-1.5 rounded-full bg-ctp-${step.color}/10 border border-ctp-${step.color}/20`}
              >
                <span className={`text-sm font-medium text-ctp-${step.color}`}>
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
