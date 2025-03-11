import React, { useRef, useEffect } from "react";
import anime from "animejs";
import { FaTerminal, FaMagic, FaServer, FaDatabase } from "react-icons/fa";
import { VscDebugConsole, VscSymbolClass } from "react-icons/vsc";
import { RiCodeSSlashLine } from "react-icons/ri";
import { SiGraphql } from "react-icons/si";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
} from "../ui/tooltip";

interface SectionHeaderProps {
  icon: string;
  label: string;
  isActive: boolean;
  titleWidth: number;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  icon,
  label,
  isActive,
  titleWidth,
}) => {
  const titleRef = useRef<HTMLDivElement>(null);

  const iconMap = {
    terminal: <FaTerminal className="text-ctp-red" />,
    code: <RiCodeSSlashLine className="text-ctp-green" />,
    debug: <VscDebugConsole className="text-ctp-yellow" />,
    class: <VscSymbolClass className="text-ctp-blue" />,
    api: <SiGraphql className="text-ctp-mauve" />,
    database: <FaDatabase className="text-ctp-sapphire" />,
    server: <FaServer className="text-ctp-teal" />,
    magic: <FaMagic className="text-ctp-pink" />,
  };

  useEffect(() => {
    const title = titleRef.current;
    if (!title) return;

    const existingCursor = title.querySelector(".cursor-element");
    if (existingCursor) {
      existingCursor.remove();
    }

    if (isActive) {
      title.style.width = "0px";

      anime({
        targets: title,
        width: titleWidth,
        duration: label.length * 50,
        easing: "steps(" + label.length + ")",
        delay: 300,
        complete: () => {
          const cursor = document.createElement("span");
          cursor.className =
            "inline-block w-2 h-4 ml-1 bg-ctp-lavender cursor-element";
          cursor.style.verticalAlign = "middle";
          title.appendChild(cursor);

          anime({
            targets: cursor,
            opacity: [1, 0],
            duration: 800,
            easing: "steps(2)",
            loop: true,
          });
        },
      });
    } else {
      title.style.width = "0px";
    }
  }, [isActive, label, titleWidth]);

  return (
    <div className="bg-ctp-mantle border-b border-ctp-surface0 relative z-10">
      <div className="flex items-center border-b border-ctp-surface0">
        <div className="bg-ctp-crust px-4 py-2 flex items-center gap-2 border-r border-ctp-surface0">
          {iconMap[icon as keyof typeof iconMap]}
          <div
            ref={titleRef}
            className="text-ctp-text font-medium text-sm md:text-base whitespace-nowrap overflow-hidden"
          >
            {label}
          </div>
        </div>

        <TooltipProvider>
          <Tooltip delayDuration={0}>
            <TooltipTrigger className="ml-auto flex items-center pr-2">
              <div className="flex space-x-1.5 px-3">
                <div className="w-3 h-3 rounded-full bg-ctp-red"></div>
                <div className="w-3 h-3 rounded-full bg-ctp-yellow"></div>
                <div className="w-3 h-3 rounded-full bg-ctp-green"></div>
              </div>
            </TooltipTrigger>
            <TooltipContent
              side="bottom"
              className="z-[999999] bg-ctp-surface0 text-ctp-text border-ctp-overlay0"
            >
              <p>This is just for show 😊</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </div>
  );
};

export default SectionHeader;
