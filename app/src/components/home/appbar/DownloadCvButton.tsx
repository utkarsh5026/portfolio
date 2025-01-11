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
            px-3 sm:px-6 md:px-8 py-2 sm:py-2.5
            bg-gradient-to-r from-violet-600 to-indigo-600
            hover:from-violet-500 hover:to-indigo-500
            text-white font-semibold text-xs sm:text-sm
            transition-all duration-300 ease-out
            shadow-lg shadow-indigo-500/30
            border border-indigo-400/30
            flex items-center justify-center gap-1.5 sm:gap-2"
    >
      <FiDownload className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-slate-900" />
      <span className="text-slate-900">CV</span>
      <span className="hidden sm:inline text-slate-900">Download</span>
    </Button>
  );
};

export default DownloadCvButton;
