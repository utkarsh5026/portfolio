import { MdEmail } from "react-icons/md";
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";
import { RevealEffect } from "@/components/animations/reveal/effects";
import Reveal from "@/components/animations/reveal/Reveal";
import OutlineNode from "../editor/outline/OutlineNode";
import { Button } from "@/components/ui/button";

const socialLinks = [
  {
    name: "Email",
    icon: <MdEmail className="w-6 h-6 text-ctp-blue" />,
    href: "mailto:utkarshpriyadarshi5026@gmail.com",
    color: "hover:text-ctp-blue",
    outlineIcon: <MdEmail className="w-3 h-3 text-ctp-blue" />,
    revealEffect: "slide-in",
    direction: "up" as const,
  },
  {
    name: "GitHub",
    icon: <FaGithub className="w-6 h-6 text-ctp-mauve" />,
    href: "https://github.com/utkarsh5026",
    color: "hover:text-ctp-mauve",
    outlineIcon: <FaGithub className="w-3 h-3 text-ctp-mauve" />,
    revealEffect: "slide-in",
    direction: "up" as const,
  },
  {
    name: "LinkedIn",
    icon: <FaLinkedin className="w-6 h-6 text-ctp-sapphire" />,
    href: "https://www.linkedin.com/in/utkarsh-priyadarshi-8b5a731b9/",
    color: "hover:text-ctp-sapphire",
    outlineIcon: <FaLinkedin className="w-3 h-3 text-ctp-sapphire" />,
    revealEffect: "slide-in",
    direction: "up" as const,
  },
  {
    name: "Twitter",
    icon: <FaTwitter className="w-6 h-6 text-ctp-sky" />,
    href: "https://x.com/UtkarshPriyad10",
    color: "hover:text-ctp-sky",
    outlineIcon: <FaTwitter className="w-3 h-3 text-ctp-sky" />,
    revealEffect: "slide-in",
    direction: "up" as const,
  },
];

const SocialMediaLinks = () => {
  return (
    <>
      {socialLinks.map((link, index) => (
        <OutlineNode
          key={link.name}
          id={link.name}
          label={link.name}
          level={1}
          parentId="contact"
          icon={link.outlineIcon}
        >
          <Reveal
            effect={link.revealEffect as RevealEffect}
            direction={link.direction}
            duration={0.6}
            delay={0.4 + index * 0.1}
            threshold={0.1}
          >
            <Button
              variant="ghost"
              size="default"
              className={`w-full sm:w-[calc(50%-0.5rem)] md:w-auto px-4 py-3 rounded-lg group relative overflow-hidden transition-all duration-300 ${link.color} hover:bg-ctp-base`}
              onClick={() => window.open(link.href, "_blank")}
            >
              <div className="relative flex items-center justify-center gap-3 text-ctp-text">
                <span className="text-xl">{link.icon}</span>
                <span className="font-medium">{link.name}</span>
              </div>
            </Button>
          </Reveal>
        </OutlineNode>
      ))}
    </>
  );
};

export default SocialMediaLinks;
