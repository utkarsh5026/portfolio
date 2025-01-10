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
            className="rounded-full"
          >
            <FaGithub className="h-4 w-4" />
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>View GitHub Repository</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default GithubRepoButton;
