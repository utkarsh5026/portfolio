import { FaHeart, FaRocket } from "react-icons/fa";
import { MdTrendingUp, MdWork } from "react-icons/md";

import Reveal from "@/components/animations/reveal/Reveal";
import { OutlineNode } from "@/components/home/editor/outline";
import { Button } from "@/components/ui/button";
import { useGitComponent } from "@/hooks/use-git-component";

import styles from "./contact.module.css";

const opportunities = [
  {
    icon: <MdWork className="w-3.5 h-3.5 sm:w-4 sm:h-4" />,
    title: "Web Development",
    color: "green",
    chipClass: styles.chipIn0,
  },
  {
    icon: <MdTrendingUp className="w-3.5 h-3.5 sm:w-4 sm:h-4" />,
    title: "Automation & DevOps",
    color: "peach",
    chipClass: styles.chipIn1,
  },
];

const AvailableForOpportunities = () => {
  const ref = useGitComponent("AvailableForOpportunities");
  return (
    <OutlineNode
      label="Available for Opportunities"
      icon={<MdWork className="w-3 h-3 text-ctp-green" />}
      className="h-full w-full"
    >
      <Reveal
        effect="slide-in"
        direction="up"
        duration={0.6}
        delay={0.1}
        className="h-full w-full"
      >
        <div
          ref={ref}
          className="h-full w-full bg-ctp-surface0/10 backdrop-blur-sm rounded-2xl p-6 sm:p-8 md:p-10 flex flex-col justify-between border border-ctp-surface0/50 hover:border-ctp-surface1/50 transition-colors relative overflow-hidden group"
        >
          {/* Decorative background element */}
          <div className="absolute top-0 right-0 w-64 h-64 sm:w-80 sm:h-80 bg-ctp-lavender/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 group-hover:bg-ctp-lavender/10 transition-colors duration-500 pointer-events-none" />

          <div className="relative z-10 flex flex-col items-start">
            {/* Availability badge */}
            <div
              className={`flex items-center gap-3 mb-6 sm:mb-8 ${styles.badgePop}`}
            >
              <span className="relative flex h-2.5 w-2.5 sm:h-3 sm:w-3 items-center justify-center">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-ctp-green opacity-75" />
                <span className="relative inline-flex rounded-full h-full w-full bg-ctp-green" />
              </span>
              <span className="text-[10px] sm:text-xs font-semibold text-ctp-green border border-ctp-green/20 bg-ctp-green/10 px-3 py-1 sm:py-1.5 rounded-full uppercase tracking-wider shadow-sm">
                Available for work
              </span>
            </div>

            <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-ctp-text mb-4 sm:mb-6 leading-tight">
              Let's build something <br className="hidden sm:block" />
              <span className="text-ctp-lavender relative inline-block">
                amazing together.
                <span className="absolute -bottom-1 left-0 w-full h-1 bg-ctp-lavender/30 rounded-full overflow-hidden">
                  <span
                    className={`absolute top-0 left-0 h-full bg-ctp-lavender ${styles.underlineFill}`}
                  />
                </span>
              </span>
            </h3>

            <p className="text-xs sm:text-sm md:text-base text-ctp-subtext0 leading-relaxed max-w-sm sm:max-w-md mb-8 sm:mb-10">
              Currently open to exciting projects and collaborations. I
              specialize in crafting modern web applications and optimizing
              developer workflows.
            </p>
          </div>

          {/* Opportunity chips */}
          <div className="relative z-10 flex flex-wrap gap-2 sm:gap-3 mb-8">
            {opportunities.map((opp) => (
              <div
                key={opp.title}
                className={`flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl bg-ctp-${opp.color}/10 border border-ctp-${opp.color}/20 text-ctp-${opp.color} hover:bg-ctp-${opp.color}/20 hover:shadow-lg hover:shadow-ctp-${opp.color}/10 transition-colors cursor-default ${opp.chipClass}`}
              >
                {opp.icon}
                <span className="text-[10px] sm:text-xs font-semibold">
                  {opp.title}
                </span>
              </div>
            ))}
          </div>

          {/* Call to Action */}
          <Reveal effect="fade-up" duration={0.6} delay={0.6}>
            <div className="relative z-10 flex flex-col sm:flex-row items-center justify-between gap-4 mt-auto border-t border-ctp-surface1/30 pt-6">
              <div className="flex items-center gap-2 text-ctp-pink pt-2">
                <span className={styles.heartbeat}>
                  <FaHeart className="w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0" />
                </span>
                <span className="text-xs sm:text-sm font-medium">
                  Looking forward to collaborating
                </span>
              </div>

              <Button
                variant="outline"
                className="bg-ctp-lavender/15 text-ctp-lavender hover:bg-ctp-lavender/25 hover:text-ctp-lavender border-none font-medium px-4 sm:px-5 py-2 sm:py-2.5 rounded-lg sm:rounded-xl transition-all duration-300 w-full sm:w-auto h-auto group/btn shadow-sm hover:scale-[1.02] active:scale-[0.98]"
                onClick={() =>
                  window.open(
                    "mailto:utkarshpriyadarshi5026@gmail.com",
                    "_blank"
                  )
                }
              >
                <div className="flex items-center justify-center gap-2">
                  <span className="text-xs sm:text-sm">
                    Start a Conversation
                  </span>
                  <span className={styles.rocketBob}>
                    <FaRocket className="w-3 h-3 sm:w-3.5 sm:h-3.5 flex-shrink-0 group-hover/btn:text-ctp-pink transition-colors" />
                  </span>
                </div>
              </Button>
            </div>
          </Reveal>
        </div>
      </Reveal>
    </OutlineNode>
  );
};

export default AvailableForOpportunities;
