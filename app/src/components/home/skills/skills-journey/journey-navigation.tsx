import { journeySteps } from "../data";

type JourneyStep = (typeof journeySteps)[number];

interface JourneyNavigationProps {
  isAutoPlaying: boolean;
  setIsAutoPlaying: (isAutoPlaying: boolean) => void;
  activeStep: number;
  journeySteps: JourneyStep[];
  prevStep: () => void;
  nextStep: () => void;
}

const JourneyNavigation = ({
  isAutoPlaying,
  setIsAutoPlaying,
  activeStep,
  journeySteps,
  prevStep,
  nextStep,
}: JourneyNavigationProps) => {
  return (
    <div className="border-t border-ctp-surface1/50 mt-auto">
      <div className="max-w-4xl mx-auto px-6 sm:px-8 py-3 sm:py-4 md:py-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4">
          {/* Mobile: Stack navigation vertically */}
          <div className="flex sm:hidden w-full flex-col gap-2">
            {/* Auto-play toggle */}
            <div className="flex justify-center">
              <button
                onClick={() => setIsAutoPlaying(!isAutoPlaying)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 ${
                  isAutoPlaying
                    ? "bg-ctp-green/20 text-ctp-green"
                    : "bg-ctp-surface0/50 text-ctp-subtext0"
                }`}
              >
                {isAutoPlaying ? "Auto-playing" : "Paused"}
              </button>
            </div>

            {/* Navigation buttons */}
            <div className="flex justify-between w-full">
              <button
                onClick={prevStep}
                disabled={activeStep === 0}
                className="px-4 py-2 rounded-lg bg-ctp-surface0/50 hover:bg-ctp-surface1/50 text-ctp-subtext1 hover:text-ctp-text transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed text-sm"
              >
                Previous
              </button>

              <button
                onClick={nextStep}
                disabled={activeStep === journeySteps.length - 1}
                className="px-4 py-2 rounded-lg bg-ctp-surface0/50 hover:bg-ctp-surface1/50 text-ctp-subtext1 hover:text-ctp-text transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed text-sm"
              >
                Next
              </button>
            </div>
          </div>

          {/* Desktop: Horizontal layout */}
          <div className="hidden sm:contents">
            <button
              onClick={prevStep}
              disabled={activeStep === 0}
              className="px-4 py-2 rounded-xl bg-ctp-surface0/50 hover:bg-ctp-surface1/50 text-ctp-subtext1 hover:text-ctp-text transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsAutoPlaying(!isAutoPlaying)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 ${
                  isAutoPlaying
                    ? "bg-ctp-green/20 text-ctp-green"
                    : "bg-ctp-surface0/50 text-ctp-subtext0"
                }`}
              >
                {isAutoPlaying ? "Auto-playing" : "Paused"}
              </button>
            </div>

            <button
              onClick={nextStep}
              disabled={activeStep === journeySteps.length - 1}
              className="px-4 py-2 rounded-xl bg-ctp-surface0/50 hover:bg-ctp-surface1/50 text-ctp-subtext1 hover:text-ctp-text transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JourneyNavigation;
