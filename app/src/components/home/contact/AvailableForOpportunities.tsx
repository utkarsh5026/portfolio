import Reveal from "@/components/animations/reveal/Reveal";
import { FaHeart } from "react-icons/fa";
import { MdLocationPin } from "react-icons/md";

const AvailableForOpportunities = () => {
  return (
    <div className="p-6 sm:p-8 md:p-10 rounded-xl backdrop-blur-sm relative overflow-hidden">
      {/* Background with gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-ctp-crust via-ctp-mantle to-ctp-crust opacity-90 z-0"></div>

      {/* Border glow */}
      <div
        className="absolute inset-0 rounded-xl z-0 opacity-20"
        style={{
          background:
            "linear-gradient(90deg, transparent, var(--ctp-lavender), transparent)",
          backgroundSize: "200% 100%",
          animation: "shimmer 3s infinite linear",
        }}
      ></div>
      <div className="relative z-10">
        <Reveal effect="slide-in" direction="down" duration={0.6} delay={0.8}>
          <div className="flex items-center gap-4 mb-6">
            <div className="p-3 rounded-full bg-gradient-to-br from-ctp-lavender/30 to-ctp-mauve/20 shadow-inner shadow-ctp-lavender/10">
              <div className="relative">
                {/* Animated ping effect */}
                <div className="absolute inset-0 rounded-full bg-ctp-lavender/30 animate-ping opacity-75"></div>
                <MdLocationPin className="w-6 h-6 text-ctp-lavender relative z-10" />
              </div>
            </div>
            <h4 className="text-xl sm:text-2xl md:text-2xl font-semibold bg-gradient-to-r from-ctp-lavender to-ctp-mauve text-transparent bg-clip-text bg-size-200 animate-gradient-x">
              Available for Opportunities
            </h4>
          </div>
        </Reveal>

        <Reveal effect="fade-up" duration={0.7} delay={0.9}>
          <p className="text-sm sm:text-base md:text-lg text-ctp-text ml-0 md:ml-12 leading-relaxed">
            Currently open to{" "}
            <span className="font-medium relative inline-block group/span">
              <span className="text-ctp-green">Web Development</span>
              <span className="absolute bottom-0 left-0 h-0.5 w-0 bg-ctp-green group-hover/span:w-full transition-all duration-300"></span>
            </span>{" "}
            and{" "}
            <span className="font-medium relative inline-block group/span">
              <span className="text-ctp-peach">Automation</span>
              <span className="absolute bottom-0 left-0 h-0.5 w-0 bg-ctp-peach group-hover/span:w-full transition-all duration-300"></span>
            </span>{" "}
            opportunities. Let's create something amazing together!
          </p>
        </Reveal>

        <Reveal effect="fade-up" duration={0.6} delay={1.0}>
          <div className="flex items-center justify-center mt-6 text-ctp-pink">
            <div className="relative">
              <div className="absolute inset-0 rounded-full bg-ctp-pink/20 animate-ping opacity-50"></div>
              <FaHeart className="w-5 h-5 mr-2 relative z-10 animate-pulse" />
            </div>
            <span className="text-sm opacity-80">
              Looking forward to collaborating with you
            </span>
          </div>
        </Reveal>
      </div>
    </div>
  );
};

export default AvailableForOpportunities;
