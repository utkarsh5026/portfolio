import { Button } from "@/components/ui/button";
import { FiEye } from "react-icons/fi";

const DownloadCvButton = () => {
  return (
    <Button
      onClick={() =>
        window.open(
          "https://drive.google.com/file/d/1Rrg_GQMiwn2FL58L93sztTihyffN2sq9/view?usp=sharing"
        )
      }
      className="rounded-md px-6 py-3 bg-[#3A10E5] hover:bg-[#2E0BB8] text-white font-medium text-sm transition-all duration-300 ease-out shadow-sm"
    >
      <FiEye className="h-4 w-4 mr-2" />
      <span>View Resume</span>
    </Button>
  );
};

export default DownloadCvButton;
