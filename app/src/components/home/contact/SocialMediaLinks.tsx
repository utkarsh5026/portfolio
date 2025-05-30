import { Card, CardContent } from "@/components/ui/card";
import Reveal from "@/components/animations/reveal/Reveal";
import { motion } from "framer-motion";
import { MdEmail } from "react-icons/md";
import {
  FaGithub,
  FaLinkedin,
  FaTwitter,
  FaRocket,
  FaHandshake,
} from "react-icons/fa";
import OutlineNode from "../editor/outline/OutlineNode";

const socialLinks = [
  {
    name: "Email",
    icon: <MdEmail className="w-5 h-5" />,
    href: "mailto:utkarshpriyadarshi5026@gmail.com",
    color: "blue",
    description: "Get in touch via email",
    outlineIcon: <MdEmail className="w-3 h-3 text-ctp-blue" />,
  },
  {
    name: "GitHub",
    icon: <FaGithub className="w-5 h-5" />,
    href: "https://github.com/utkarsh5026",
    color: "mauve",
    description: "Check out my repos",
    outlineIcon: <FaGithub className="w-3 h-3 text-ctp-mauve" />,
  },
  {
    name: "LinkedIn",
    icon: <FaLinkedin className="w-5 h-5" />,
    href: "https://www.linkedin.com/in/utkarsh-priyadarshi-8b5a731b9/",
    color: "sapphire",
    description: "Connect professionally",
    outlineIcon: <FaLinkedin className="w-3 h-3 text-ctp-sapphire" />,
  },
  {
    name: "Twitter",
    icon: <FaTwitter className="w-5 h-5" />,
    href: "https://x.com/UtkarshPriyad10",
    color: "sky",
    description: "Follow my updates",
    outlineIcon: <FaTwitter className="w-3 h-3 text-ctp-sky" />,
  },
];

const SocialMediaLinks = () => {
  return (
    <div className="space-y-6">
      <Reveal effect="fade-up" duration={0.7} delay={0.3}>
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-8 h-8 rounded-lg bg-ctp-green/20 flex items-center justify-center">
              <FaHandshake className="w-4 h-4 text-ctp-green" />
            </div>
            <h3 className="text-xl font-bold text-ctp-text">Let's Connect</h3>
            <div className="flex-1 h-px bg-gradient-to-r from-ctp-surface1/50 to-transparent max-w-20" />
          </div>
          <p className="text-ctp-subtext0 text-sm">
            Choose your preferred way to reach out
          </p>
        </div>
      </Reveal>

      <div className="grid grid-cols-1 sm:grid-cols-1 gap-4 auto-rows-fr">
        {socialLinks.map((link, index) => (
          <OutlineNode
            key={link.name}
            id={link.name}
            label={link.name}
            level={1}
            parentId="contact"
            icon={link.outlineIcon}
            className="h-full"
          >
            <Reveal
              effect="slide-in"
              direction="up"
              duration={0.6}
              delay={0.4 + index * 0.1}
              threshold={0.1}
              className="h-full"
            >
              <motion.div
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="h-full"
              >
                <Card
                  className={`h-full bg-ctp-surface0/30 border border-ctp-surface1/30 hover:border-ctp-${link.color}/30 hover:bg-ctp-surface0/50 transition-all duration-300 overflow-hidden group cursor-pointer backdrop-blur-sm`}
                >
                  <CardContent
                    className="p-5 h-full flex flex-col justify-between"
                    onClick={() => window.open(link.href, "_blank")}
                  >
                    <div className="flex items-start gap-4 flex-1">
                      <div
                        className={`w-12 h-12 flex-shrink-0 rounded-xl bg-ctp-${link.color}/20 flex items-center justify-center text-ctp-${link.color} group-hover:scale-110 transition-transform duration-300`}
                      >
                        {link.icon}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4
                          className={`font-semibold text-lg text-ctp-${link.color} mb-2 leading-tight`}
                        >
                          {link.name}
                        </h4>
                        <p className="text-xs text-ctp-subtext0 group-hover:text-ctp-subtext1 transition-colors leading-relaxed">
                          {link.description}
                        </p>
                      </div>
                      <motion.div
                        className="opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0"
                        whileHover={{ x: 2 }}
                      >
                        <FaRocket className="w-4 h-4 text-ctp-subtext0" />
                      </motion.div>
                    </div>

                    {/* Subtle URL display */}
                    <div className="mt-3 pt-2 border-t border-ctp-surface1/20">
                      <p className="text-[10px] text-ctp-subtext0/60 font-mono break-words group-hover:text-ctp-subtext0/80 transition-colors">
                        {link.href
                          .replace(/^https?:\/\//, "")
                          .replace(/^mailto:/, "")}
                      </p>
                    </div>

                    {/* Status indicator */}
                  </CardContent>
                </Card>
              </motion.div>
            </Reveal>
          </OutlineNode>
        ))}
      </div>
    </div>
  );
};

export default SocialMediaLinks;
