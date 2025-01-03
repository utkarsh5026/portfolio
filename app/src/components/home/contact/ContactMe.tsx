/* 
    This is the Contact Me section of the home page.
    It contains a card with a form to send an email to the user.    
    It also contains a list of social media links.
*/

import React from "react";
import Section from "@/components/base/Section";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MdEmail } from "react-icons/md";
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";

const ContactMe: React.FC = () => {
  const socialLinks = [
    {
      name: "Email",
      icon: <MdEmail className="w-6 h-6" />,
      href: "mailto:utkarshpriyadarshi5026@gmail.com",
      color: "hover:text-blue-500",
    },
    {
      name: "GitHub",
      icon: <FaGithub className="w-6 h-6" />,
      href: "https://github.com/utkarsh5026",
      color: "hover:text-purple-500",
    },
    {
      name: "LinkedIn",
      icon: <FaLinkedin className="w-6 h-6" />,
      href: "https://www.linkedin.com/in/utkarsh-priyadarshi-8b5a731b9/",
      color: "hover:text-blue-600",
    },
    {
      name: "Twitter",
      icon: <FaTwitter className="w-6 h-6" />,
      href: "https://x.com/UtkarshPriyad10",
      color: "hover:text-blue-400",
    },
  ];

  return (
    <Section id="contact" label="Contact">
      <div className="max-w-4xl mx-auto">
        <Card className="border-2 border-muted bg-background/60 backdrop-blur-sm hover:border-primary/20 transition-all duration-500">
          <CardContent className="p-8">
            <div className="text-center space-y-6">
              <h3 className="text-2xl font-bold text-primary">
                Let's Work Together!
              </h3>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                I'm always open to discussing new projects, creative ideas, or
                opportunities to be part of your visions. Feel free to reach out
                through any of the following channels. If you have any
                questions, email me at{" "}
                <span className="border-b-2 border-primary hover:border-primary/50 transition-all duration-300">
                  utkarshpriyadarshi5026@gmail.com
                </span>
              </p>

              <div className="flex flex-wrap justify-center gap-4 mt-8">
                {socialLinks.map((link) => (
                  <Button
                    key={link.name}
                    variant="outline"
                    size="lg"
                    className={`group relative overflow-hidden transition-all duration-300 ${link.color}`}
                    onClick={() => window.open(link.href, "_blank")}
                  >
                    <div className="relative flex items-center gap-2">
                      {link.icon}
                      <span>{link.name}</span>
                    </div>
                    <div className="absolute inset-0 translate-y-[100%] bg-gradient-to-r from-primary/5 to-primary/10 transition-transform duration-300 group-hover:translate-y-0" />
                  </Button>
                ))}
              </div>

              <div className="mt-12 p-6 bg-muted/30 rounded-lg">
                <h4 className="text-lg font-semibold mb-2">
                  Available for Opportunities
                </h4>
                <p className="text-muted-foreground">
                  Currently open to Web Development and Automation
                  opportunities. Let's create something amazing together!
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </Section>
  );
};

export default ContactMe;
