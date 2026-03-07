import { Mail } from "lucide-react";

import Reveal from "@/components/animations/reveal/Reveal";
import { OutlineNode } from "@/components/home/editor/outline";
import { Button } from "@/components/ui/button";
import { useGitComponent } from "@/hooks/use-git-component";

import styles from "./contact.module.css";

export const EmailHighlight: React.FC = () => {
  const ref = useGitComponent("EmailHighlight");
  return (
    <OutlineNode
      label="Email Highlight"
      icon={<Mail className="w-3 h-3 text-ctp-pink" />}
    >
      <Reveal effect="slide-in" direction="up" duration={0.6} delay={0.3}>
        <div
          ref={ref}
          className="relative overflow-hidden bg-ctp-surface0/10 backdrop-blur-sm rounded-2xl p-6 sm:p-8 md:p-10 border border-ctp-surface0/50 hover:border-ctp-pink/30 transition-all duration-300 group flex flex-col md:flex-row items-center justify-between gap-6 md:gap-8 text-center md:text-left shadow-lg shadow-black/5"
        >
          <div className="relative z-10 flex-1">
            <h3 className="text-xl sm:text-2xl font-bold text-ctp-text mb-2">
              Have a project in mind?
            </h3>
            <p className="text-sm sm:text-base text-ctp-subtext0">
              Reach out directly at{" "}
              <span className="text-ctp-pink font-source select-all relative inline-block group/email cursor-pointer">
                utkarshpriyadarshi5026@gmail.com
                <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-ctp-pink transition-all duration-300 group-hover/email:w-full" />
              </span>
            </p>
          </div>

          <div className="relative z-10 w-full md:w-auto">
            <Button
              variant="default"
              className="group/btn relative overflow-hidden bg-ctp-pink text-ctp-crust hover:bg-ctp-pink/90 hover:text-ctp-crust font-semibold px-8 py-6 rounded-xl transition-all duration-300 shadow-lg shadow-ctp-pink/20 hover:shadow-ctp-pink/40 hover:-translate-y-1 hover:scale-[1.02] active:scale-[0.98] w-full md:w-auto text-sm sm:text-base border-none"
              onClick={() =>
                window.open("mailto:utkarshpriyadarshi5026@gmail.com", "_blank")
              }
            >
              <div className="flex items-center justify-center gap-2">
                <span className="font-bold">Say Hello</span>
                <span className={styles.mailBob}>
                  <Mail className="w-4 h-4" />
                </span>
              </div>
            </Button>
          </div>
        </div>
      </Reveal>
    </OutlineNode>
  );
};
