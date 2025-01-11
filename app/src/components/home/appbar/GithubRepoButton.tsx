import React from "react";
import { FaGithub } from "react-icons/fa";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";

const GithubRepoButton: React.FC = () => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            onClick={() =>
              window.open("https://github.com/utkarsh5026/Portfolio")
            }
            variant="ghost"
            size="icon"
            className="rounded-full hidden sm:flex"
          >
            <FaGithub className="h-4 w-4" />
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>View GitHub Repository</p>
        </TooltipContent>
      </Tooltip>

      <Button
        onClick={() => window.open("https://github.com/utkarsh5026/Portfolio")}
        variant="ghost"
        className="sm:hidden flex items-center gap-2"
      >
        <FaGithub className="h-4 w-4" />
        <span>Go to Repo</span>
      </Button>
    </TooltipProvider>
  );
};

export default GithubRepoButton;
