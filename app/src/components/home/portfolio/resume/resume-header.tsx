import { Download, Github, Linkedin, Mail, Twitter } from "lucide-react";
import React from "react";

import { Heading, Text } from "@/components/ui/text";
import { cn } from "@/lib/utils";

const contacts = [
  {
    icon: Mail,
    label: "utkarshpriyadarshi5026@gmail.com",
    href: "mailto:utkarshpriyadarshi5026@gmail.com",
  },
  {
    icon: Github,
    label: "github.com/utkarsh5026",
    href: "https://github.com/utkarsh5026",
  },
  {
    icon: Linkedin,
    label: "linkedin.com/in/utkarsh-priyadarshi",
    href: "https://www.linkedin.com/in/utkarsh-priyadarshi-8b5a731b9/",
  },
  {
    icon: Twitter,
    label: "x.com/UtkarshPriyad10",
    href: "https://x.com/UtkarshPriyad10",
  },
];

const ResumeHeader: React.FC = () => {
  return (
    <div className="border-b border-ctp-surface1 pb-6 mb-6 animate-fadeIn">
      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
        <div>
          <Heading
            as="h1"
            className="text-3xl md:text-4xl font-extrabold text-ctp-text tracking-tight"
          >
            Utkarsh Priyadarshi
          </Heading>
          <Text variant="lead" className="mt-1 text-ctp-subtext0  text-base">
            Full-Stack Developer &amp; DevOps Engineer
          </Text>
        </div>

        <a
          href="/resume.pdf"
          download
          className={cn(
            "inline-flex items-center gap-2 self-start px-4 py-2 rounded-md",
            "bg-transparent border border-ctp-surface2",
            "text-ctp-text hover:bg-ctp-surface0 hover:border-ctp-overlay0 transition-all duration-200",
            "text-sm  font-medium"
          )}
        >
          <Download className="w-4 h-4" />
          Download PDF
        </a>
      </div>

      <div className="flex flex-wrap gap-x-6 gap-y-2 mt-6">
        {contacts.map(({ icon: Icon, label, href }) => (
          <a
            key={href}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-ctp-subtext0 hover:text-ctp-text transition-colors group"
          >
            <Icon className="w-3.5 h-3.5 text-ctp-overlay0 group-hover:text-ctp-text transition-colors" />
            <Text
              as="span"
              variant="caption"
              className=" text-xs group-hover:text-ctp-text transition-colors"
            >
              {label}
            </Text>
          </a>
        ))}
      </div>
    </div>
  );
};

export default ResumeHeader;
