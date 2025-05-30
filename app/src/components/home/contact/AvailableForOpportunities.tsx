import Reveal from "@/components/animations/reveal/Reveal";
import { Card, CardContent } from "@/components/ui/card";
import { FaHeart, FaRocket, FaEnvelope } from "react-icons/fa";
import { MdLocationPin, MdWork, MdTrendingUp } from "react-icons/md";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

const AvailableForOpportunities = () => {
  const opportunities = [
    {
      icon: <MdWork className="w-5 h-5" />,
      title: "Web Development",
      description: "Full-stack applications, modern frameworks",
      color: "green",
    },
    {
      icon: <MdTrendingUp className="w-5 h-5" />,
      title: "Automation",
      description: "DevOps, CI/CD, workflow optimization",
      color: "peach",
    },
  ];

  return (
    <div className="space-y-6">
      <Reveal effect="slide-in" direction="down" duration={0.6} delay={0.7}>
        <Card className="bg-ctp-surface0/30 backdrop-blur-sm border border-ctp-surface1/30 overflow-hidden relative">
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

          <CardContent className="p-6 sm:p-8 relative z-10">
            {/* Header */}
            <div className="text-center mb-8">
              <div className="flex items-center justify-center gap-3 mb-4">
                <motion.div
                  className="p-3 rounded-full bg-ctp-lavender/20 relative"
                  animate={{ rotate: [0, 5, -5, 0] }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  {/* Ping effect */}
                  <div className="absolute inset-0 rounded-full bg-ctp-lavender/20 animate-ping opacity-75" />
                  <MdLocationPin className="w-6 h-6 text-ctp-lavender relative z-10" />
                </motion.div>
                <h3 className="text-2xl font-bold bg-gradient-to-r from-ctp-lavender via-ctp-mauve to-ctp-pink bg-clip-text text-transparent">
                  Available for Opportunities
                </h3>
              </div>
              <p className="text-ctp-subtext0 text-base leading-relaxed max-w-2xl mx-auto">
                Currently open to exciting projects and collaborations. Let's
                create something amazing together!
              </p>
            </div>

            {/* Opportunity Cards */}
            <div className="grid grid-cols-1  gap-4 mb-8">
              {opportunities.map((opportunity, index) => (
                <motion.div
                  key={opportunity.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 + index * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                  className="group"
                >
                  <Card
                    className={`bg-ctp-surface0/40 border border-ctp-${opportunity.color}/20 hover:border-ctp-${opportunity.color}/40 hover:bg-ctp-surface0/60 transition-all duration-300 backdrop-blur-sm`}
                  >
                    <CardContent className="p-5">
                      <div className="flex items-center gap-3 mb-3">
                        <div
                          className={`w-10 h-10 rounded-lg bg-ctp-${opportunity.color}/20 flex items-center justify-center text-ctp-${opportunity.color} group-hover:scale-110 transition-transform duration-300`}
                        >
                          {opportunity.icon}
                        </div>
                        <div>
                          <h4
                            className={`font-semibold text-ctp-${opportunity.color} mb-1`}
                          >
                            {opportunity.title}
                          </h4>
                          <p className="text-xs text-ctp-subtext0 group-hover:text-ctp-subtext1">
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
                <div className="flex items-center justify-center gap-2 text-ctp-pink mb-4">
                  <motion.div
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <FaHeart className="w-5 h-5" />
                  </motion.div>
                  <span className="text-sm font-medium">
                    Looking forward to collaborating with you
                  </span>
                </div>

                <Button
                  variant="default"
                  className="bg-ctp-lavender hover:bg-ctp-mauve text-ctp-base font-medium px-6 py-3 rounded-xl shadow-lg shadow-ctp-lavender/20 hover:shadow-ctp-mauve/20 transition-all duration-300 border-none"
                  onClick={() =>
                    window.open(
                      "mailto:utkarshpriyadarshi5026@gmail.com",
                      "_blank"
                    )
                  }
                >
                  <FaEnvelope className="w-4 h-4 mr-2" />
                  Start a Conversation
                  <FaRocket className="w-4 h-4 ml-2" />
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
