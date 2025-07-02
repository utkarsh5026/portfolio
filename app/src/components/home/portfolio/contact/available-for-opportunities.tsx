import Reveal from "@/components/animations/reveal/Reveal";
import { Card, CardContent } from "@/components/ui/card";
import { FaHeart, FaRocket, FaEnvelope } from "react-icons/fa";
import { MdLocationPin, MdWork, MdTrendingUp } from "react-icons/md";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

const AvailableForOpportunities = () => {
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

  return (
    <div className="space-y-4 sm:space-y-6 w-full overflow-hidden">
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

          <CardContent className="p-3 sm:p-4 md:p-6 lg:p-8 relative z-10 w-full min-w-0">
            {/* Header */}
            <div className="text-center mb-4 sm:mb-6 md:mb-8">
              <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                <motion.div
                  className="p-2 sm:p-2.5 md:p-3 rounded-full bg-ctp-lavender/20 relative flex-shrink-0"
                  animate={{ rotate: [0, 5, -5, 0] }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  {/* Ping effect */}
                  <div className="absolute inset-0 rounded-full bg-ctp-lavender/20 animate-ping opacity-75" />
                  <MdLocationPin className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-ctp-lavender relative z-10" />
                </motion.div>
                <h3 className="text-lg sm:text-xl md:text-2xl font-bold bg-gradient-to-r from-ctp-lavender via-ctp-mauve to-ctp-pink bg-clip-text text-transparent text-center break-words leading-tight">
                  Available for Opportunities
                </h3>
              </div>
              <p className="text-ctp-subtext0 text-xs sm:text-sm md:text-base leading-relaxed max-w-2xl mx-auto break-words px-2">
                Currently open to exciting projects and collaborations. Let's
                create something amazing together!
              </p>
            </div>

            {/* Opportunity Cards */}
            <div className="grid grid-cols-1 gap-3 sm:gap-4 mb-4 sm:mb-6 md:mb-8 w-full">
              {opportunities.map((opportunity, index) => (
                <motion.div
                  key={opportunity.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 + index * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                  className="group w-full"
                >
                  <Card
                    className={`bg-ctp-surface0/40 border border-ctp-${opportunity.color}/20 hover:border-ctp-${opportunity.color}/40 hover:bg-ctp-surface0/60 transition-all duration-300 backdrop-blur-sm w-full overflow-hidden`}
                  >
                    <CardContent className="p-3 sm:p-4 md:p-5 w-full min-w-0">
                      <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3 min-w-0">
                        <div
                          className={`w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 rounded-lg bg-ctp-${opportunity.color}/20 flex items-center justify-center text-ctp-${opportunity.color} group-hover:scale-110 transition-transform duration-300 flex-shrink-0`}
                        >
                          {opportunity.icon}
                        </div>
                        <div className="flex-1 min-w-0 overflow-hidden">
                          <h4
                            className={`font-semibold text-sm sm:text-base text-ctp-${opportunity.color} mb-1 leading-tight break-words`}
                          >
                            {opportunity.title}
                          </h4>
                          <p className="text-xs sm:text-sm text-ctp-subtext0 group-hover:text-ctp-subtext1 break-words leading-relaxed">
                            {opportunity.description}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            {/* Call to Action */}
            <Reveal effect="fade-up" duration={0.6} delay={1.0}>
              <div className="text-center">
                <div className="flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-2 text-ctp-pink mb-3 sm:mb-4">
                  <motion.div
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="flex-shrink-0"
                  >
                    <FaHeart className="w-4 h-4 sm:w-5 sm:h-5" />
                  </motion.div>
                  <span className="text-xs sm:text-sm font-medium text-center break-words">
                    Looking forward to collaborating with you
                  </span>
                </div>

                <Button
                  variant="default"
                  className="bg-ctp-lavender hover:bg-ctp-mauve text-ctp-base font-medium px-4 sm:px-5 md:px-6 py-2.5 sm:py-3 rounded-lg sm:rounded-xl shadow-lg shadow-ctp-lavender/20 hover:shadow-ctp-mauve/20 transition-all duration-300 border-none text-sm sm:text-base w-full max-w-xs sm:max-w-sm mx-auto"
                  onClick={() =>
                    window.open(
                      "mailto:utkarshpriyadarshi5026@gmail.com",
                      "_blank"
                    )
                  }
                >
                  <FaEnvelope className="w-3 h-3 sm:w-4 sm:h-4 mr-1.5 sm:mr-2 flex-shrink-0" />
                  <span className="truncate">Start a Conversation</span>
                  <FaRocket className="w-3 h-3 sm:w-4 sm:h-4 ml-1.5 sm:ml-2 flex-shrink-0" />
                </Button>
              </div>
            </Reveal>
          </CardContent>
        </Card>
      </Reveal>
    </div>
  );
};

export default AvailableForOpportunities;
