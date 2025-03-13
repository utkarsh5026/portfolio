import React from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface GhostButtonProps {
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
  isActive?: boolean;
  className?: string;
  labelDirection?: "left" | "right" | "top" | "bottom";
}

/**
 * GhostButton component renders a button with a ghost style.
 * It can display an icon and a label, with the label appearing on hover.
 *
 * Props:
 * - icon: ReactNode - The icon to display on the button.
 * - label: string - The text label to show on hover.
 * - onClick: () => void - Function to call when the button is clicked.
 * - isActive: boolean (optional) - Indicates if the button is in an active state.
 * - className: string (optional) - Additional classes to apply to the button.
 * - labelDirection: "left" | "right" | "top" | "bottom" (optional) - Position of the label relative to the button.
 */
const GhostButton: React.FC<GhostButtonProps> = ({
  icon,
  label,
  onClick,
  isActive = false,
  className = "",
  labelDirection = "left",
}) => {
  return (
    <Button
      variant="ghost"
      className={cn(
        "p-3 relative transition-colors duration-200 group/button",
        isActive ? "text-ctp-red" : "text-ctp-text hover:text-ctp-red",
        "hover:bg-ctp-overlay2",
        className
      )}
      onClick={onClick}
    >
      {icon}
      <span
        className={cn(
          "absolute px-2 py-1 bg-[#313244] rounded text-xs invisible opacity-0 group-hover/button:visible group-hover/button:opacity-100 transition-opacity whitespace-nowrap",
          labelDirection === "left" && "left-14",
          labelDirection === "right" && "right-14",
          labelDirection === "top" && "top-14",
          labelDirection === "bottom" && "bottom-14"
        )}
      >
        {label}
      </span>
    </Button>
  );
};

export default GhostButton;
