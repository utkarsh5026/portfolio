import { FaGithub } from "react-icons/fa";
import { ExternalLink, Lock } from "lucide-react";
import { ProjectTheme } from "@/components/home/projects/context/ThemeContext";
import { Button } from "@/components/ui/button";

interface ActionButtonsProps {
  githubLink: string;
  liveLink?: string;
  theme: ProjectTheme;
}

const ActionButtons: React.FC<ActionButtonsProps> = ({
  githubLink,
  liveLink,
  theme,
}) => {
  return (
    <div className="p-6 border-t border-white/10 space-y-3">
      <Button
        onClick={() => window.open(githubLink, "_blank")}
        className={`w-full p-4 rounded-xl bg-gradient-to-r from-ctp-${theme.main}/60 to-ctp-${theme.secondary}/60 text-white font-medium flex items-center justify-center gap-3 hover:shadow-md hover:scale-105 hover:shadow-ctp-${theme.main}/50 transition-all duration-300`}
        disabled={githubLink === "private-repository"}
      >
        {githubLink === "private-repository" ? (
          <Lock className="w-4 h-4" />
        ) : (
          <FaGithub className="w-4 h-4" />
        )}
        {githubLink === "private-repository"
          ? "Private Repository"
          : "Go To Repository"}
      </Button>

      <div className="flex gap-3">
        {liveLink && (
          <Button
            onClick={() => window.open(liveLink, "_blank")}
            className="flex-1 p-3 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/20 transition-all duration-300 flex items-center justify-center gap-2"
          >
            <ExternalLink className="w-4 h-4" />
            Live
          </Button>
        )}
      </div>
    </div>
  );
};

export default ActionButtons;
