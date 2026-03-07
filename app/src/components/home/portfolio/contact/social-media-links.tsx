import { ArrowUpRight } from "lucide-react";
import { FaGithub, FaLinkedin, FaShareAlt, FaTwitter } from "react-icons/fa";
import { MdEmail } from "react-icons/md";

import Reveal from "@/components/animations/reveal/Reveal";
import { OutlineNode } from "@/components/home/editor/outline";
import { useGitComponent } from "@/hooks/use-git-component";

import styles from "./contact.module.css";

const socialLinks = [
  {
    name: "Email",
    icon: <MdEmail className="w-full h-full" />,
    href: "mailto:utkarshpriyadarshi5026@gmail.com",
    color: "blue",
    outlineIcon: <MdEmail className="w-3 h-3 text-ctp-blue" />,
    iconClass: styles.iconFloat,
  },
  {
    name: "GitHub",
    icon: <FaGithub className="w-full h-full" />,
    href: "https://github.com/utkarsh5026",
    color: "mauve",
    outlineIcon: <FaGithub className="w-3 h-3 text-ctp-mauve" />,
    iconClass: styles.iconPulse,
  },
  {
    name: "LinkedIn",
    icon: <FaLinkedin className="w-full h-full" />,
    href: "https://www.linkedin.com/in/utkarsh-priyadarshi-8b5a731b9/",
    color: "sapphire",
    outlineIcon: <FaLinkedin className="w-3 h-3 text-ctp-sapphire" />,
    iconClass: styles.iconSwing,
  },
  {
    name: "Twitter",
    icon: <FaTwitter className="w-full h-full" />,
    href: "https://x.com/UtkarshPriyad10",
    color: "sky",
    outlineIcon: <FaTwitter className="w-3 h-3 text-ctp-sky" />,
    iconClass: styles.iconHop,
  },
];

const SocialMediaLinks = () => {
  const ref = useGitComponent(SocialMediaLinks);
  return (
    <OutlineNode
      label="Social Media Links"
      icon={<FaShareAlt className="w-3 h-3 text-ctp-lavender" />}
      className="h-full w-full"
    >
      <div
        ref={ref}
        className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 md:gap-5 h-full w-full"
      >
        {socialLinks.map((link, index) => (
          <OutlineNode
            key={link.name}
            label={link.name}
            icon={link.outlineIcon}
            className="h-full w-full"
          >
            <Reveal
              effect="slide-in"
              direction="up"
              duration={0.6}
              delay={0.2 + index * 0.1}
              className="h-full w-full"
            >
              <div
                onClick={() => window.open(link.href, "_blank")}
                className="group relative flex flex-row sm:flex-col items-center sm:justify-center p-4 sm:p-6 bg-ctp-surface0/10 hover:bg-ctp-surface0/30 backdrop-blur-sm rounded-xl sm:rounded-2xl border border-ctp-surface0/50 hover:border-ctp-surface1 transition-all duration-300 cursor-pointer overflow-hidden h-full sm:aspect-auto"
              >
                <div className="flex flex-row items-center gap-4 sm:flex-col sm:gap-0 sm:items-center">
                  <div
                    className={`relative z-10 text-ctp-${link.color} w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 sm:mb-3 flex-shrink-0 ${link.iconClass}`}
                  >
                    {link.icon}
                  </div>

                  <span className="relative z-10 text-sm sm:text-xs md:text-sm font-semibold text-ctp-subtext1 group-hover:text-ctp-text transition-colors duration-300">
                    {link.name}
                  </span>
                </div>

                <ArrowUpRight
                  className={`absolute top-1/2 -translate-y-1/2 sm:top-4 sm:translate-y-0 right-4 w-4 h-4 opacity-0 -translate-x-2 sm:translate-x-0 group-hover:opacity-100 group-hover:-translate-x-1 group-hover:-translate-y-1/2 sm:group-hover:translate-x-1 sm:group-hover:-translate-y-1 transition-all duration-300 text-ctp-${link.color}`}
                />
              </div>
            </Reveal>
          </OutlineNode>
        ))}
      </div>
    </OutlineNode>
  );
};

export default SocialMediaLinks;
