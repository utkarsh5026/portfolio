import { motion } from "framer-motion";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { HiOutlineDocumentDownload } from "react-icons/hi";
import { useEditorContext } from "../../editor/context/explorer-context";
import React from "react";
import { cn } from "@/lib/utils";
import useMobile from "@/hooks/use-mobile";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

/**
 * Minimal ProfileButtons component with clean coding theme.
 * Simple, focused, and elegant developer interactions.
 */
const ProfileButtons: React.FC = () => {
  const { setActiveSection } = useEditorContext();
  const { isPhone } = useMobile();

  return (
    <TooltipProvider delayDuration={300}>
      <div className="w-full">
        <div className="mt-6 space-y-4">
          {/* Primary Actions */}
          <div className="flex gap-3">
            <Tooltip>
              <TooltipTrigger asChild>
                <motion.button
                  onClick={() => setActiveSection("contact")}
                  className={cn(
                    "flex-1 group relative overflow-hidden rounded-lg",
                    "bg-gradient-to-r from-ctp-crust  to-ctp-green/10 border border-none shadow-xl shadow-ctp-crust",
                    "hover:border-ctp-green hover:bg-ctp-green/10 hover:scale-105 hover:shadow-md hover:shadow-ctp-crust transition-colors duration-200",
                    isPhone ? "p-3" : "p-4"
                  )}
                  whileHover={{ y: -1 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="flex items-center gap-2">
                    <span className="text-ctp-green font-mono text-sm">$</span>
                    <span className="text-ctp-blue font-mono text-sm">
                      connect
                    </span>
                    <span className="text-ctp-overlay1 font-mono text-sm">
                      --me
                    </span>
                  </div>
                </motion.button>
              </TooltipTrigger>
              <TooltipContent
                side="top"
                className="bg-ctp-surface0 border-ctp-surface1 text-ctp-text font-mono text-xs px-3 py-2 rounded-lg shadow-lg"
              >
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-ctp-green rounded-full animate-pulse" />
                  <span>Get in touch • Let's collaborate</span>
                </div>
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <motion.button
                  onClick={() => setActiveSection("projects")}
                  className={cn(
                    "flex-1 group relative overflow-hidden rounded-lg",
                    "bg-gradient-to-r from-ctp-crust  to-ctp-pink/10 border border-none shadow-xl shadow-ctp-crust",
                    "hover:border-ctp-pink hover:bg-ctp-pink/10 hover:scale-105 hover:shadow-md hover:shadow-ctp-crust transition-colors duration-200",
                    isPhone ? "p-3" : "p-4"
                  )}
                  whileHover={{ y: -1 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="flex items-center gap-2">
                    <span className="text-ctp-mauve font-mono text-sm">./</span>
                    <span className="text-ctp-text font-mono text-sm">
                      projects
                    </span>
                  </div>
                </motion.button>
              </TooltipTrigger>
              <TooltipContent
                side="top"
                className="bg-ctp-surface0 border-ctp-surface1 text-ctp-text font-mono text-xs px-3 py-2 rounded-lg shadow-lg"
              >
                <div className="flex items-center gap-2">
                  <span className="text-ctp-pink">📁</span>
                  <span>Browse my work • See what I've built</span>
                </div>
              </TooltipContent>
            </Tooltip>
          </div>

          {/* Social Links */}
          <div
            className={cn(
              "flex items-center justify-center gap-4",
              "py-3 rounded-lg bg-gradient-to-r from-ctp-crust  to-ctp-base border border-none shadow-xl shadow-ctp-crust"
            )}
          >
            {[
              {
                icon: FaGithub,
                href: "https://github.com/utkarsh5026",
                label: "GitHub",
                color: "text-ctp-text hover:text-ctp-blue",
                tooltip: {
                  title: "GitHub Profile",
                  description: "Check out my repositories & contributions",
                  emoji: "🐙",
                },
              },
              {
                icon: FaLinkedin,
                href: "https://www.linkedin.com/in/utkarsh-priyadarshi-8b5a731b9/",
                label: "LinkedIn",
                color: "text-ctp-text hover:text-ctp-blue",
                tooltip: {
                  title: "LinkedIn Profile",
                  description: "Connect with me professionally",
                  emoji: "💼",
                },
              },
              {
                icon: HiOutlineDocumentDownload,
                href: "https://drive.google.com/file/d/1Rrg_GQMiwn2FL58L93sztTihyffN2sq9/view",
                label: "Resume",
                color: "text-ctp-text hover:text-ctp-green",
                tooltip: {
                  title: "Download Resume",
                  description: "View my experience & qualifications",
                  emoji: "📄",
                },
              },
            ].map(({ icon: Icon, href, label, color, tooltip }) => (
              <Tooltip key={href}>
                <TooltipTrigger asChild>
                  <motion.a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className={cn(
                      "p-2 rounded-lg transition-colors duration-200",
                      color
                    )}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Icon className="w-5 h-5" />
                  </motion.a>
                </TooltipTrigger>
                <TooltipContent
                  side="top"
                  className="bg-ctp-surface0 border-ctp-surface1 text-ctp-text font-mono text-xs px-3 py-2 rounded-lg shadow-lg z-[100]"
                >
                  <div className="flex items-center gap-2">
                    <span>{tooltip.emoji}</span>
                    <div className="flex flex-col">
                      <span className="font-semibold text-ctp-blue">
                        {tooltip.title}
                      </span>
                      <span className="text-ctp-overlay1 text-[10px]">
                        {tooltip.description}
                      </span>
                    </div>
                  </div>
                </TooltipContent>
              </Tooltip>
            ))}
          </div>

          {/* Simple status indicator */}
          <div className="flex items-center justify-center gap-2 text-sm">
            <div className="w-2 h-2 bg-ctp-green rounded-full animate-pulse" />
            <span className="text-ctp-overlay1 font-mono">
              available for work
            </span>
          </div>
        </div>
      </div>
    </TooltipProvider>
  );
};

export default ProfileButtons;
