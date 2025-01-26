import { Button } from "@/components/ui/button";
import { FiDownload } from "react-icons/fi";

const DownloadCvButton = () => {
  return (
    <Button
      onClick={() =>
        window.open(
          "https://ybyhphtolmvomxzjridt.supabase.co/storage/v1/object/public/Resume/Utkarsh_Priyadarshi_Resume.pdf?t=2025-01-03T20%3A37%3A04.739Z"
        )
      }
      className="w-full sm:w-auto rounded-full 
            px-3 sm:px-6 md:px-8 py-2.5 sm:py-3
            bg-gradient-to-r from-purple-700 to-blue-700
            hover:from-purple-800 hover:to-blue-800
            text-white font-medium text-xs sm:text-sm
            transition-all duration-300 ease-out
            shadow-[0_4px_12px_rgba(255,255,255,0.15),0_2px_4px_rgba(255,255,255,0.05),inset_0_1px_1px_rgba(255,255,255,0.1)]
            hover:shadow-[0_8px_20px_rgba(255,255,255,0.2),0_4px_8px_rgba(255,255,255,0.1),inset_0_1px_1px_rgba(255,255,255,0.15)]
            backdrop-blur-sm
            hover:scale-[1.02]
            flex items-center justify-center gap-1.5 sm:gap-2
            relative overflow-hidden
            hover:ring-1 hover:ring-white/20"
    >
      <FiDownload className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-zinc-300" />
      <span className="text-zinc-200">Download</span>
      <span className="hidden sm:inline text-zinc-300">CV</span>
    </Button>
  );
};

export default DownloadCvButton;
