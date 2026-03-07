import { Briefcase, Heart, Share2 } from "lucide-react";
import React from "react";

import { OutlineNode } from "@/components/home/editor/outline";
import Section from "@/components/home/editor/section/portfolio-section";
import { useGitComponent } from "@/hooks/use-git-component";

import AvailableForOpportunities from "./available-for-opportunities";
import { EmailHighlight } from "./email-highlight";
import SocialMediaLinks from "./social-media-links";

const ContactMe: React.FC = () => {
  const ref = useGitComponent(ContactMe);
  return (
    <Section
      id="contact"
      label="Contact"
      title="Let's Work Together"
      description="I'm always open to discussing new projects, creative ideas, or opportunities to be part of your visions. Feel free to reach out!"
      headerIcon={Heart}
      showHeader={true}
    >
      <div
        ref={ref}
        className="w-full max-w-5xl mx-auto flex flex-col gap-4 sm:gap-4 md:gap-5"
      >
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 sm:gap-4 md:gap-5">
          <div className="md:col-span-3">
            <OutlineNode
              label="Availability"
              icon={<Briefcase className="w-3 h-3 text-ctp-green" />}
            >
              <AvailableForOpportunities />
            </OutlineNode>
          </div>
          <div className="md:col-span-2">
            <OutlineNode
              label="Social Links"
              icon={<Share2 className="w-3 h-3 text-ctp-blue" />}
            >
              <SocialMediaLinks />
            </OutlineNode>
          </div>
        </div>
        <EmailHighlight />
      </div>
    </Section>
  );
};

export default ContactMe;
