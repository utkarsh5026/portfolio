import { PlayCircle } from "lucide-react";

const DemoVideoNotAvailable: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center h-[60vh] text-center">
      <div className="relative mb-8">
        <div className="w-24 h-24 rounded-full bg-gradient-to-br from-ctp-surface0 to-ctp-surface1 flex items-center justify-center">
          <PlayCircle className="w-12 h-12 text-ctp-subtext0" />
        </div>
        <div className="absolute -inset-4 rounded-full bg-ctp-surface0/20 animate-ping" />
      </div>
      <h3 className="text-xl font-semibold text-white mb-2">
        No Demo Video Available
      </h3>
      <p className="text-white/60 max-w-md">
        This project doesn't have a demo video yet. Check back later or explore
        other sections!
      </p>
    </div>
  );
};

export default DemoVideoNotAvailable;
