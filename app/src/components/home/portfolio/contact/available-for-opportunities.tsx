import Reveal from "@/components/animations/reveal/Reveal";
import { Card, CardContent } from "@/components/ui/card";
import { FaHeart, FaRocket, FaEnvelope } from "react-icons/fa";
import { MdLocationPin, MdWork, MdTrendingUp } from "react-icons/md";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

const opportunities = [
  {
    icon: <MdWork className="w-4 h-4 sm:w-5 sm:h-5" />,
    title: "Web Development",
    description: "Full-stack applications, modern frameworks",
    color: "green",
  },
  {
    icon: <MdTrendingUp className="w-4 h-4 sm:w-5 sm:h-5" />,
    title: "Automation",
    description: "DevOps, CI/CD, workflow optimization",
    color: "peach",
  },
];

const AvailableForOpportunities = () => {
  return (
    <div className="space-y-6 sm:space-y-8 w-full overflow-hidden">
      <Reveal effect="slide-in" direction="down" duration={0.6} delay={0.7}>
        <Card className="bg-ctp-surface0/30 backdrop-blur-sm border border-ctp-surface1/30 overflow-hidden relative w-full">
          {/* Dark animated background */}
          <div className="absolute inset-0 bg-gradient-to-r from-ctp-crust/50 via-ctp-mantle/30 to-ctp-crust/50 opacity-50" />

          {/* Subtle animated border */}
          <div className="absolute inset-0 rounded-xl opacity-10">
            <div
              className="absolute inset-0 rounded-xl"
              style={{
                background:
                  "linear-gradient(90deg, transparent, var(--ctp-lavender), transparent)",
                backgroundSize: "200% 100%",
                animation: "shimmer 3s infinite linear",
              }}
            />
          </div>

          <CardContent className="p-6 sm:p-6 md:p-8 lg:p-10 relative z-10 w-full min-w-0 border-none">
            {/* Header */}
            <div className="text-center mb-6 sm:mb-8 md:mb-10">
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mb-4 sm:mb-5">
                <motion.div
                  className="p-3 sm:p-3 md:p-4 rounded-full bg-ctp-lavender/20 relative flex-shrink-0"
                  animate={{ rotate: [0, 5, -5, 0] }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  {/* Ping effect */}
                  <div className="absolute inset-0 rounded-full bg-ctp-lavender/20 animate-ping opacity-75" />
                  <MdLocationPin className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 text-ctp-lavender relative z-10" />
                </motion.div>
                <h3 className="text-xl sm:text-2xl md:text-3xl font-bold bg-gradient-to-r from-ctp-lavender via-ctp-mauve to-ctp-pink bg-clip-text text-transparent text-center break-words leading-tight">
                  Available for Opportunities
                </h3>
              </div>
              <p className="text-ctp-subtext0 text-sm sm:text-base md:text-lg leading-relaxed max-w-2xl mx-auto break-words px-4">
                Currently open to exciting projects and collaborations. Let's
                create something amazing together!
              </p>
            </div>

            {/* Opportunity Cards */}
            <div className="grid grid-cols-1 gap-4 sm:gap-5 mb-6 sm:mb-8 md:mb-10 w-full">
              {opportunities.map((opportunity, index) => (
                <OpportunityCard
                  key={opportunity.title}
                  opportunity={opportunity}
                  index={index}
                />
              ))}
            </div>

            {/* Call to Action */}
            <Reveal effect="fade-up" duration={0.6} delay={1.0}>
              <div className="text-center">
                <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3 text-ctp-pink mb-4 sm:mb-5">
                  <motion.div
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="flex-shrink-0"
                  >
                    <FaHeart className="w-4 h-4 sm:w-5 sm:h-5" />
                  </motion.div>
                  <span className="text-sm sm:text-base font-medium text-center break-words">
                    Looking forward to collaborating with you
                  </span>
                </div>

                <Button
                  variant="default"
                  className="bg-ctp-lavender hover:bg-ctp-mauve text-ctp-base font-medium px-6 sm:px-7 md:px-8 py-4 sm:py-4 md:py-5 rounded-lg sm:rounded-xl shadow-lg shadow-ctp-lavender/20 hover:shadow-ctp-mauve/20 transition-all duration-300 border-none text-sm sm:text-base w-full max-w-xs sm:max-w-sm mx-auto"
                  onClick={() =>
                    window.open(
                      "mailto:utkarshpriyadarshi5026@gmail.com",
                      "_blank"
                    )
                  }
                >
                  <FaEnvelope className="w-4 h-4 sm:w-4 sm:h-4 mr-2 sm:mr-2 flex-shrink-0" />
                  <span className="truncate">Start a Conversation</span>
                  <FaRocket className="w-4 h-4 sm:w-4 sm:h-4 ml-2 sm:ml-2 flex-shrink-0" />
                </Button>
              </div>
            </Reveal>
          </CardContent>
        </Card>
      </Reveal>
    </div>
  );
};

interface OpportunityCardProps {
  opportunity: (typeof opportunities)[number];
  index: number;
}

const OpportunityCard = ({ opportunity, index }: OpportunityCardProps) => {
  return (
    <Reveal
      effect="fade-up"
      duration={0.6}
      delay={0.8 + index * 0.1}
      className="group w-full"
    >
      <Card
        className={`bg-ctp-base border-none  hover:bg-ctp-surface0/60 hover:scale-[1.02] transition-all duration-300 backdrop-blur-sm w-full overflow-hidden`}
      >
        <CardContent className="p-4 sm:p-5 md:p-6 w-full min-w-0">
          <div className="flex items-center gap-3 sm:gap-4 mb-3 sm:mb-4 min-w-0">
            <div
              className={`w-10 h-10 sm:w-11 sm:h-11 md:w-12 md:h-12 rounded-lg bg-ctp-${opportunity.color}/20 flex items-center justify-center text-ctp-${opportunity.color} group-hover:scale-110 transition-transform duration-300 flex-shrink-0`}
            >
              {opportunity.icon}
            </div>
            <div className="flex-1 min-w-0 overflow-hidden">
              <h4
                className={`font-semibold text-base sm:text-lg text-ctp-${opportunity.color} mb-2 leading-tight break-words`}
              >
                {opportunity.title}
              </h4>
              <p className="text-sm sm:text-base text-ctp-subtext0 group-hover:text-ctp-subtext1 break-words leading-relaxed">
                {opportunity.description}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </Reveal>
  );
};

export default AvailableForOpportunities;
