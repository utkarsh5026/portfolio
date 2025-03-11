import React, { useState } from "react";
import { ArrowRight, Sparkles, ChevronDown, ChevronUp } from "lucide-react";
import { motion } from "framer-motion";
import type { Project } from "@/types";
import GradientText from "@/components/utils/GradientText";
import TechBadge from "@/components/base/TechBadge";
import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

interface FeaturedProjectProps {
  featuredProject: Project;
  handleProjectSelect: (project: Project) => void;
}

const FeaturedProject: React.FC<FeaturedProjectProps> = ({
  featuredProject,
  handleProjectSelect,
}) => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="mb-12 max-w-6xl mx-auto">
      <Collapsible open={isOpen} onOpenChange={setIsOpen} className="w-full">
        <div className="flex items-center gap-3 mb-6">
          <Sparkles className="w-5 h-5 text-ctp-peach" />
          <h3 className="text-xl text-ctp-peach font-medium">
            Featured Project
          </h3>
          <div className="h-px flex-grow bg-gradient-to-r from-ctp-peach/40 to-transparent" />
          <CollapsibleTrigger asChild>
            <Button variant="ghost" size="sm" className="p-0 h-8 w-8">
              {isOpen ? (
                <ChevronUp className="h-4 w-4 text-ctp-subtext0" />
              ) : (
                <ChevronDown className="h-4 w-4 text-ctp-subtext0" />
              )}
              <span className="sr-only">Toggle featured project</span>
            </Button>
          </CollapsibleTrigger>
        </div>

        <CollapsibleContent>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="p-2 bg-gradient-to-r from-ctp-peach/50 via-ctp-mauve/30 to-ctp-blue/30 rounded-xl"
          >
            <div className="bg-gradient-to-r from-ctp-crust to-ctp-mantle p-12 rounded-lg">
              <div className="flex flex-col md:flex-row gap-6 items-center">
                <div className="md:w-1/2 flex flex-col gap-4">
                  <h4 className="text-2xl font-bold text-ctp-text mb-3">
                    <GradientText>{featuredProject.name}</GradientText>
                  </h4>
                  <p className="text-ctp-subtext0 mb-4">
                    {featuredProject.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {featuredProject.technologies.slice(0, 4).map((tech) => (
                      <TechBadge key={tech.name} tech={tech.name} />
                    ))}
                  </div>
                  <Button
                    className="flex items-center gap-2 px-4 py-2 rounded-lg bg-ctp-surface0 text-ctp-blue hover:bg-ctp-surface1 transition-colors w-1/3"
                    onClick={() => handleProjectSelect(featuredProject)}
                  >
                    <span>View Details</span>
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </div>

                {/* Certificate image on the right side */}
                <div className="md:w-1/2 flex justify-center">
                  <div className="relative overflow-hidden rounded-lg shadow-xl">
                    <img
                      src="skoda-certificate.jpg"
                      alt={`${featuredProject.name} Certificate`}
                      className="w-full h-auto object-contain rounded-lg border-2 border-ctp-blue/20"
                    />
                    <div className="absolute inset-0 bg-gradient-to-tr from-ctp-peach/5 to-ctp-blue/5 pointer-events-none"></div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
};

export default FeaturedProject;
