import Reveal from "@/components/animations/reveal/Reveal";
import { MdEmail } from "react-icons/md";
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";
import { ArrowUpRight } from "lucide-react";
import { OutlineNode } from "@/components/home/editor/outline";
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
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-4 md:gap-5 h-full w-full">
      {socialLinks.map((link, index) => (
        <OutlineNode
          key={link.name}
          id={link.name}
          label={link.name}
          level={1}
          parentId="contact"
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
              className="group relative flex flex-col items-center justify-center p-6 bg-ctp-surface0/10 hover:bg-ctp-surface0/30 backdrop-blur-sm rounded-2xl border border-ctp-surface0/50 hover:border-ctp-surface1 transition-all duration-300 cursor-pointer overflow-hidden h-full aspect-square sm:aspect-auto"
            >
              <div
                className={`relative z-10 text-ctp-${link.color} w-8 h-8 sm:w-10 sm:h-10 mb-3 ${link.iconClass}`}
              >
                {link.icon}
              </div>

              <span className="relative z-10 text-xs sm:text-sm font-semibold text-ctp-subtext1 group-hover:text-ctp-text transition-colors duration-300">
                {link.name}
              </span>

              <ArrowUpRight
                className={`absolute top-4 right-4 w-4 h-4 opacity-0 -translate-x-2 translate-y-2 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0 transition-all duration-300 text-ctp-${link.color}`}
              />
            </div>
          </Reveal>
        </OutlineNode>
      ))}
    </div>
  );
};

export default SocialMediaLinks;
