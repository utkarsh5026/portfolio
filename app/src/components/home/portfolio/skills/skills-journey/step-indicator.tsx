import { motion } from "framer-motion";

interface StepIndicatorProps {
  steps: { id: string; color: string }[];
  activeStep: number;
  onStepClick: (index: number) => void;
}

const StepIndicator: React.FC<StepIndicatorProps> = ({
  steps,
  activeStep,
  onStepClick,
}) => {
  return (
    <div className="flex items-center justify-center gap-3 mb-8">
      {steps.map((step, index) => (
        <button
          key={step.id}
          onClick={() => onStepClick(index)}
          className="relative group"
        >
          <motion.div
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === activeStep
                ? `bg-ctp-${step.color}`
                : index < activeStep
                ? `bg-ctp-${step.color}/50`
                : "bg-ctp-surface1"
            }`}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
          />

          {/* Progress line */}
          {index < steps.length - 1 && (
            <div className="absolute top-1/2 left-full w-8 h-0.5 bg-ctp-surface1 -translate-y-1/2">
              <motion.div
                className={`h-full bg-ctp-${
                  steps[index + 1].color
                }/30 origin-left`}
                initial={{ scaleX: 0 }}
                animate={{
                  scaleX: index < activeStep ? 1 : 0,
                }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              />
            </div>
          )}
        </button>
      ))}
    </div>
  );
};

export default StepIndicator;
