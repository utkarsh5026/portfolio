import React from "react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import {
  HiOutlineCode,
  HiOutlineDocumentDownload,
  HiOutlineMail,
} from "react-icons/hi";

import { useEditorContext } from "@/components/home/editor";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import useMobile from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";

import styles from "./profile.module.css";

type Section = "contact" | "projects";

interface PrimaryButton {
  label: string;
  icon: React.ElementType;
  section: Section;
  iconColor: string;
  borderHover: string;
  textHover: string;
  shadowHover: string;
  gradient: string;
  buttonClass: string;
}

const primaryButtons: PrimaryButton[] = [
  {
    label: "Contact",
    icon: HiOutlineMail,
    section: "contact",
    iconColor: "text-ctp-green",
    borderHover: "hover:border-ctp-green/40",
    textHover: "group-hover:text-ctp-green",
    shadowHover: "hover:shadow-ctp-green/5",
    gradient: "from-ctp-green/0 via-ctp-green/5 to-ctp-green/0",
    buttonClass: styles.contactButton,
  },
  {
    label: "Projects",
    icon: HiOutlineCode,
    section: "projects",
    iconColor: "text-ctp-mauve",
    borderHover: "hover:border-ctp-mauve/40",
    textHover: "group-hover:text-ctp-mauve",
    shadowHover: "hover:shadow-ctp-mauve/5",
    gradient: "from-ctp-mauve/0 via-ctp-mauve/5 to-ctp-mauve/0",
    buttonClass: styles.projectsButton,
  },
];

const socialLinks = [
  {
    icon: FaGithub,
    href: "https://github.com/utkarsh5026",
    label: "GitHub",
    color: "text-ctp-overlay1 hover:text-ctp-text",
    hoverBg:
      "hover:bg-ctp-surface1/80 hover:shadow-sm hover:shadow-ctp-surface2/20",
    linkClass: styles.githubLink,
    tooltip: {
      title: "GitHub Profile",
      description: "Explore my open-source code",
      emoji: "💻",
    },
  },
  {
    icon: FaLinkedin,
    href: "https://www.linkedin.com/in/utkarsh-priyadarshi-8b5a731b9/",
    label: "LinkedIn",
    color: "text-ctp-overlay1 hover:text-[#0A66C2]",
    hoverBg:
      "hover:bg-ctp-surface1/80 hover:shadow-sm hover:shadow-[#0A66C2]/10",
    linkClass: styles.linkedinLink,
    tooltip: {
      title: "LinkedIn",
      description: "Professional network",
      emoji: "🤝",
    },
  },
  {
    icon: HiOutlineDocumentDownload,
    href: "https://drive.google.com/file/d/1Rrg_GQMiwn2FL58L93sztTihyffN2sq9/view",
    label: "Resume",
    color: "text-ctp-overlay1 hover:text-ctp-green",
    hoverBg:
      "hover:bg-ctp-surface1/80 hover:shadow-sm hover:shadow-ctp-green/10",
    linkClass: styles.resumeLink,
    tooltip: {
      title: "Resume",
      description: "Download my CV",
      emoji: "📄",
    },
  },
];

const ProfileButtons: React.FC = () => {
  const { setActiveSection } = useEditorContext();
  const { isPhone } = useMobile();

  return (
    <TooltipProvider delayDuration={300}>
      <div className="w-full">
        <div className="mt-6 flex flex-col gap-4">
          <div className="flex gap-3 min-w-0">
            {primaryButtons.map(
              ({
                label,
                icon: Icon,
                section,
                iconColor,
                borderHover,
                textHover,
                shadowHover,
                gradient,
                buttonClass,
              }) => (
                <button
                  key={section}
                  onClick={() => setActiveSection(section)}
                  className={cn(
                    "flex-1 min-w-0 group relative flex items-center justify-center gap-2 overflow-hidden rounded-xl",
                    "bg-ctp-surface0/60 backdrop-blur-md border border-ctp-surface1/60",
                    "hover:bg-ctp-surface1/80 transition-all duration-300",
                    borderHover,
                    "shadow-lg shadow-ctp-crust/10 font-source",
                    shadowHover,
                    isPhone ? "py-3 px-4" : "py-3 px-5",
                    styles.buttonAction,
                    buttonClass
                  )}
                >
                  <div
                    className={cn(
                      "absolute inset-0 bg-gradient-to-r opacity-0 group-hover:opacity-100 transition-opacity duration-500",
                      gradient
                    )}
                  />
                  <div className="flex items-center gap-2.5 relative z-10">
                    <Icon className={cn("w-4.5 h-4.5", iconColor)} />
                    <span
                      className={cn(
                        "text-ctp-text font-medium text-sm tracking-wide transition-colors",
                        textHover
                      )}
                    >
                      {label}
                    </span>
                  </div>
                </button>
              )
            )}
          </div>

          <div
            className={cn(
              "flex items-center justify-center gap-3",
              "py-3 rounded-xl bg-ctp-surface0/30 backdrop-blur-sm border border-ctp-surface1/40"
            )}
          >
            {socialLinks.map(
              ({
                icon: Icon,
                href,
                label,
                color,
                hoverBg,
                linkClass,
                tooltip,
              }) => (
                <Tooltip key={href}>
                  <TooltipTrigger asChild>
                    <a
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={label}
                      className={cn(
                        "p-2.5 rounded-lg transition-all duration-300",
                        hoverBg,
                        styles.socialIcon,
                        linkClass
                      )}
                    >
                      <Icon
                        className={cn("w-5 h-5 transition-colors", color)}
                      />
                    </a>
                  </TooltipTrigger>
                  <TooltipContent
                    side="top"
                    className="bg-ctp-surface0/95 backdrop-blur-md border border-ctp-surface1/50 text-ctp-text px-3 py-2.5 rounded-xl shadow-xl z-[100] font-source"
                  >
                    <div className="flex items-center gap-2.5">
                      <span className="text-base">{tooltip.emoji}</span>
                      <div className="flex flex-col gap-0.5">
                        <span className="font-medium text-ctp-text text-xs">
                          {tooltip.title}
                        </span>
                        <span className="text-ctp-overlay1 text-[10px]">
                          {tooltip.description}
                        </span>
                      </div>
                    </div>
                  </TooltipContent>
                </Tooltip>
              )
            )}
          </div>
        </div>
      </div>
    </TooltipProvider>
  );
};

export default ProfileButtons;
