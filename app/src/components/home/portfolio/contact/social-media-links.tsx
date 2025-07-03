import Reveal from "@/components/animations/reveal/Reveal";
import { motion } from "framer-motion";
import { MdEmail } from "react-icons/md";
import { FaGithub, FaLinkedin, FaTwitter, FaRocket } from "react-icons/fa";
import { OutlineNode } from "@/components/home/editor/outline";

const socialLinks = [
  {
    name: "Email",
    icon: <MdEmail className="w-5 h-5 sm:w-6 sm:h-6" />,
    href: "mailto:utkarshpriyadarshi5026@gmail.com",
    color: "blue",
    description: "Get in touch via email",
    outlineIcon: <MdEmail className="w-3 h-3 text-ctp-blue" />,
  },
  {
    name: "GitHub",
    icon: <FaGithub className="w-5 h-5 sm:w-6 sm:h-6" />,
    href: "https://github.com/utkarsh5026",
    color: "mauve",
    description: "Check out my repos",
    outlineIcon: <FaGithub className="w-3 h-3 text-ctp-mauve" />,
  },
  {
    name: "LinkedIn",
    icon: <FaLinkedin className="w-5 h-5 sm:w-6 sm:h-6" />,
    href: "https://www.linkedin.com/in/utkarsh-priyadarshi-8b5a731b9/",
    color: "sapphire",
    description: "Connect professionally",
    outlineIcon: <FaLinkedin className="w-3 h-3 text-ctp-sapphire" />,
  },
  {
    name: "Twitter",
    icon: <FaTwitter className="w-5 h-5 sm:w-6 sm:h-6" />,
    href: "https://x.com/UtkarshPriyad10",
    color: "sky",
    description: "Follow my updates",
    outlineIcon: <FaTwitter className="w-3 h-3 text-ctp-sky" />,
  },
];

const SocialMediaLinks = () => {
  return (
    <div className="flex flex-col gap-6 sm:gap-8 w-full overflow-hidden">
      <div className="grid grid-cols-1 gap-4 sm:gap-5 auto-rows-fr w-full">
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
              delay={0.4 + index * 0.1}
              threshold={0.1}
              className="h-full w-full"
            >
              <SocialMediaCard link={link} />
            </Reveal>
          </OutlineNode>
        ))}
      </div>
    </div>
  );
};

interface SocialMediaCardProps {
  link: (typeof socialLinks)[number];
}

const SocialMediaCard = ({ link }: SocialMediaCardProps) => {
  return (
    <motion.div
      whileTap={{ scale: 0.98 }}
      className={`h-full w-full bg-gradient-to-br from-ctp-surface0/30 to-ctp-mantle border-none hover:border-ctp-${link.color}/30 hover:bg-ctp-surface0/50 transition-all duration-300 overflow-hidden group cursor-pointer backdrop-blur-sm rounded-xl sm:rounded-2xl`}
    >
      <div
        className="p-5 sm:p-6 md:p-7 h-full flex flex-col justify-between w-full min-h-0"
        onClick={() => window.open(link.href, "_blank")}
      >
        <div className="flex items-start gap-4 sm:gap-5 md:gap-6 flex-1 min-w-0">
          <div
            className={`w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 flex-shrink-0 rounded-lg sm:rounded-xl bg-ctp-${link.color}/20 flex items-center justify-center text-ctp-${link.color} group-hover:scale-110 transition-transform duration-300`}
          >
            {link.icon}
          </div>
          <div className="flex-1 min-w-0 overflow-hidden">
            <h4
              className={`font-semibold text-base sm:text-lg md:text-xl text-ctp-${link.color} mb-2 sm:mb-3 leading-tight break-words`}
            >
              {link.name}
            </h4>
            <p className="text-sm sm:text-base text-ctp-subtext0 group-hover:text-ctp-subtext1 transition-colors leading-relaxed break-words">
              {link.description}
            </p>
          </div>
          <motion.div
            className="opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0"
            whileHover={{ x: 2 }}
          >
            <FaRocket className="w-4 h-4 sm:w-5 sm:h-5 text-ctp-subtext0" />
          </motion.div>
        </div>

        <div className="mt-4 sm:mt-5 pt-3 sm:pt-4 border-t border-ctp-surface1/20">
          <p className="text-xs sm:text-sm text-ctp-subtext0/60 font-mono break-all group-hover:text-ctp-subtext0/80 transition-colors leading-tight">
            {link.href
              .replace(/^https?:\/\//, "")
              .replace(/^mailto:/, "")
              .replace(/^www./, "")}
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default SocialMediaLinks;
