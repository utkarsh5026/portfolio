import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";

import { Heading, Text } from "@/components/ui/text";
import { useLocalStorage } from "@/hooks/use-local-storage";
import useMobile from "@/hooks/use-mobile";

const MobileSwipeHint: React.FC = () => {
  const { isMobile } = useMobile();
  const { storedValue: acknowledged, setValue: setAcknowledged } =
    useLocalStorage("swipe-hint-acknowledged", false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (isMobile && !acknowledged) {
      const showTimer = setTimeout(() => setVisible(true), 800);
      return () => clearTimeout(showTimer);
    }
  }, [isMobile, acknowledged]);

  const acknowledge = () => {
    setVisible(false);
    setAcknowledged(true);
  };

  if (!isMobile || acknowledged || !visible) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center pb-12 px-6 pointer-events-none font-source"
      aria-live="polite"
    >
      <div
        className="pointer-events-auto w-full max-w-sm rounded-2xl bg-ctp-surface0 border border-ctp-surface1 shadow-2xl px-6 py-5 flex flex-col items-center gap-4 animate-[fadeInUp_0.35s_ease_both]"
        style={{
          animation: "fadeInUp 0.35s ease both",
        }}
      >
        <div className="flex items-center gap-4 text-ctp-overlay1">
          <ChevronLeft className="w-7 h-7 text-ctp-blue" />
          <div className="flex gap-1.5">
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                className={`block w-1.5 h-1.5 rounded-full ${i === 1 ? "bg-ctp-blue" : "bg-ctp-surface2"}`}
              />
            ))}
          </div>
          <ChevronRight className="w-7 h-7 text-ctp-blue" />
        </div>

        <div className="text-center space-y-1">
          <Heading as="h6" className="text-ctp-text">
            Swipe to Navigate
          </Heading>
          <Text variant="caption" className="text-ctp-subtext0">
            Swipe left or right to move between sections and projects.
          </Text>
        </div>

        <button
          onClick={acknowledge}
          className="mt-1 px-5 py-1.5 rounded-lg bg-ctp-blue/20 hover:bg-ctp-blue/30 text-ctp-blue text-xs font-medium transition-colors"
        >
          Got it
        </button>
      </div>

      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};

export default MobileSwipeHint;
