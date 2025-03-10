import React from "react";
import TypeWriter from "../writer/TypeWriter";
import TourStepFinalMessage from "../utils/TourStepFinalMessage";
import CodeTypeWriter from "../writer/JsTypeWriter";
import Step from "./Step";
import { useSteps } from "./use-steps";
import { FaEnvelope, FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";

const codeText = `// Ways to connect
const contactOptions = {
  email: "utkarshpriyadarshi5026@gmail.com",
  github: "https://github.com/utkarsh5026",
  linkedin: "https://www.linkedin.com/in/utkarsh-priyadarshi5026/",
  twitter: "https://x.com/UtkarshPriyad10"
};
`;

const contactIcons = [
  {
    href: "mailto:utkarshpriyadarshi5026@gmail.com",
    icon: <FaEnvelope size={16} className="text-ctp-red" />,
    size: 16,
  },
  {
    href: "https://github.com/utkarsh5026",
    icon: <FaGithub size={16} className="text-ctp-sapphire" />,
  },
  {
    href: "https://www.linkedin.com/in/utkarsh-priyadarshi5026/",
    icon: <FaLinkedin size={16} className="text-ctp-blue" />,
  },
  {
    href: "https://x.com/UtkarshPriyad10",
    icon: <FaTwitter size={16} className="text-ctp-yellow" />,
  },
];

const ContactStep: React.FC = () => {
  const { typingSteps, incrementTypingSteps } = useSteps(3);

  return (
    <Step
      section="contact"
      title="Contact Me"
      onTitleComplete={incrementTypingSteps}
    >
      {typingSteps > 0 && (
        <>
          <div className="tour-message">
            <TypeWriter
              text="Want to get in touch? Feel free to reach out through this contact form or connect with me on social media."
              speed={20}
              delay={300}
              onComplete={incrementTypingSteps}
            />
          </div>

          {typingSteps > 1 && (
            <div className="code-block mt-4">
              <CodeTypeWriter
                code={codeText}
                speed={5}
                delay={1000}
                className="code-text"
                onComplete={incrementTypingSteps}
              />
            </div>
          )}

          <div className="flex justify-center items-center gap-6 mt-6 mb-6">
            {contactIcons.map((icon) => (
              <a
                href={icon.href}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-full bg-ctp-surface0 hover:bg-ctp-surface1 text-ctp-red transform hover:-translate-y-1 transition-all duration-300"
                aria-label="Email"
                key={icon.href}
              >
                {icon.icon}
              </a>
            ))}
          </div>

          <TourStepFinalMessage message="I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision. Fill out the form, and I'll respond as soon as possible!" />
        </>
      )}
    </Step>
  );
};

export default ContactStep;
