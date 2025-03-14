import React, { useState, useEffect, memo } from "react";
import {
  ArrowRight,
  Sparkles,
  ChevronDown,
  ChevronUp,
  ExternalLink,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import type { Project } from "@/types";
import TechBadge from "@/components/base/TechBadge";
import { Button } from "@/components/ui/button";
import { FaGithub, FaStar } from "react-icons/fa";
import { HiOutlineSparkles } from "react-icons/hi";

interface FeaturedProjectProps {
  featuredProject: Project;
  handleProjectSelect: (project: Project) => void;
}
type Tab = "overview" | "features";

const FeaturedProject: React.FC<FeaturedProjectProps> = ({
  featuredProject,
  handleProjectSelect,
}) => {
  const [isOpen, setIsOpen] = useState(true);
  const [activeTab, setActiveTab] = useState<Tab>("overview");
  const [isAnimated, setIsAnimated] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsAnimated(true), 200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="mb-16 max-w-6xl mx-auto relative">
      <div className="absolute -left-10 -top-10 w-20 h-20 text-ctp-peach/10 animate-spin-slow pointer-events-none">
        <HiOutlineSparkles className="w-full h-full" />
      </div>
      <div className="absolute -right-5 -bottom-5 w-16 h-16 text-ctp-lavender/10 animate-float pointer-events-none">
        <HiOutlineSparkles className="w-full h-full" />
      </div>

      {/* Header section */}
      <div className="flex items-center gap-3 mb-6">
        <motion.div
          initial={{ rotate: -10, scale: 0.8, opacity: 0 }}
          animate={{ rotate: 0, scale: 1, opacity: 1 }}
          transition={{
            duration: 0.6,
            type: "spring",
            stiffness: 200,
          }}
        >
          <div className="p-2 bg-gradient-to-r from-ctp-peach to-ctp-yellow rounded-full">
            <Sparkles className="w-5 h-5 text-ctp-crust" />
          </div>
        </motion.div>

        <motion.h3
          className="text-xl font-bold bg-gradient-to-r from-ctp-peach to-ctp-yellow bg-clip-text text-transparent"
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          Featured Project
        </motion.h3>

        <motion.div
          className="h-px flex-grow"
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          style={{
            background:
              "linear-gradient(90deg, rgba(250,179,135,0.5) 0%, rgba(137,180,250,0) 100%)",
            transformOrigin: "left",
          }}
        />

        <Button
          variant="ghost"
          size="sm"
          className="p-0 h-8 w-8"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? (
            <ChevronUp className="h-4 w-4 text-ctp-subtext0" />
          ) : (
            <ChevronDown className="h-4 w-4 text-ctp-subtext0" />
          )}
          <span className="sr-only">Toggle featured project</span>
        </Button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.5 }}
            className="overflow-hidden"
          >
            <div className="relative">
              {/* Spotlight glow effect */}
              <div className="absolute -inset-2 bg-gradient-radial from-ctp-peach/20 via-transparent to-transparent rounded-full blur-2xl opacity-70 -z-10 animate-pulse-slow" />

              {/* Main content card */}
              <motion.div
                className="relative rounded-xl overflow-hidden"
                initial={{ y: 40, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                {/* Gradient border */}
                <div className="absolute inset-0 p-1 rounded-xl bg-gradient-to-br from-ctp-peach via-ctp-maroon to-ctp-blue motion-safe:animate-border">
                  <div className="w-full h-full rounded-lg bg-ctp-crust" />
                </div>

                <div className="relative rounded-xl overflow-hidden shadow-xl">
                  {/* Project card header with featured badge */}
                  <div className="relative px-8 pt-8 pb-4 bg-gradient-to-br from-ctp-mantle to-ctp-crust">
                    <div className="absolute top-4 right-4 flex items-center gap-1.5 px-3 py-1 rounded-full bg-ctp-peach/20 text-ctp-peach border border-ctp-peach/10 text-xs font-semibold">
                      <FaStar className="text-ctp-peach" />
                      Featured
                    </div>

                    <motion.h2
                      className="text-3xl font-bold bg-gradient-to-r from-ctp-peach via-ctp-maroon to-ctp-peach bg-clip-text text-transparent"
                      initial={{ y: -20, opacity: 0 }}
                      animate={isAnimated ? { y: 0, opacity: 1 } : {}}
                      transition={{ duration: 0.6 }}
                    >
                      {featuredProject.name}
                    </motion.h2>
                  </div>

                  {/* Tab navigation */}
                  <TabNavigation
                    activeTab={activeTab}
                    setActiveTab={setActiveTab}
                  />

                  <div className="bg-gradient-to-br from-ctp-crust to-ctp-mantle p-8">
                    <div className="flex flex-col xl:flex-row gap-10 items-center">
                      <Content
                        activeTab={activeTab}
                        featuredProject={featuredProject}
                        handleProjectSelect={handleProjectSelect}
                      />
                      <Certificate name={featuredProject.name} />
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

interface CertificateProps {
  name: string;
}

const Certificate: React.FC<CertificateProps> = memo(({ name }) => {
  return (
    <div className="xl:w-1/2">
      <motion.div
        className="relative mx-auto max-w-md"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.7, delay: 0.4 }}
      >
        <div className="absolute -inset-0.5 bg-gradient-to-r from-ctp-peach to-ctp-blue opacity-50 rounded-xl blur-sm" />
        <div className="absolute -inset-1 bg-ctp-crust rounded-xl" />

        <div className="relative rounded-lg overflow-hidden border-2 border-ctp-surface0">
          <img
            src="skoda-certificate.jpg"
            alt={`${name} Certificate`}
            className="w-full h-auto object-cover z-10 relative"
          />

          <div className="absolute inset-0 bg-gradient-to-tr from-ctp-peach/5 via-white/5 to-ctp-blue/5 z-20" />
          <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,_var(--ctp-blue),_transparent_70%)]" />
        </div>

        <div className="absolute -bottom-3 -right-3 z-30">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-ctp-peach to-ctp-blue rounded-full blur-sm" />
            <div className="relative p-2 bg-ctp-crust rounded-full border border-ctp-surface0">
              <FaStar className="w-5 h-5 text-ctp-yellow" />
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
});

interface ContentProps {
  activeTab: Tab;
  featuredProject: Project;
  handleProjectSelect: (project: Project) => void;
}

const Content: React.FC<ContentProps> = ({
  activeTab,
  featuredProject,
  handleProjectSelect,
}) => {
  return (
    <div className="xl:w-1/2 space-y-6">
      {activeTab === "overview" ? (
        <motion.p
          className="text-ctp-text leading-relaxed"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
        >
          {featuredProject.description}
        </motion.p>
      ) : (
        <motion.ul
          className="space-y-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
        >
          {featuredProject.features.map((feature, index) => (
            <motion.li
              key={feature}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                delay: index * 0.1,
                duration: 0.3,
              }}
              className="flex items-start gap-2"
            >
              <span className="text-ctp-peach mt-1">•</span>
              <span className="text-ctp-text">{feature}</span>
            </motion.li>
          ))}
        </motion.ul>
      )}

      <div className="pt-2">
        <h4 className="text-sm text-ctp-subtext0 mb-3">TECHNOLOGIES</h4>
        <div className="flex flex-wrap gap-2">
          {featuredProject.technologies.map((tech, index) => (
            <motion.div
              key={tech.name}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + index * 0.1 }}
            >
              <TechBadge tech={tech.name} />
            </motion.div>
          ))}
        </div>
      </div>

      <div className="flex flex-wrap gap-4 pt-4">
        <Button
          onClick={() => handleProjectSelect(featuredProject)}
          className="relative overflow-hidden group bg-gradient-to-r from-ctp-peach to-ctp-maroon text-ctp-crust hover:from-ctp-maroon hover:to-ctp-peach transition-all duration-300"
        >
          <span className="relative z-10 flex items-center gap-2">
            Explore Project
            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
          </span>
          <span className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
        </Button>

        {featuredProject.githubLink !== "private-repository" && (
          <Button
            variant="outline"
            className="border-ctp-surface0 hover:border-ctp-blue bg-transparent"
            onClick={() => window.open(featuredProject.githubLink, "_blank")}
          >
            <FaGithub className="mr-2" />
            Source Code
          </Button>
        )}

        {featuredProject.liveLink && (
          <Button
            variant="outline"
            className="border-ctp-surface0 hover:border-ctp-green bg-transparent"
            onClick={() => window.open(featuredProject.liveLink, "_blank")}
          >
            <ExternalLink className="mr-2 w-4 h-4" />
            Live Demo
          </Button>
        )}
      </div>
    </div>
  );
};

interface TabNavigationProps {
  activeTab: Tab;
  setActiveTab: (tab: Tab) => void;
}

const TabNavigation: React.FC<TabNavigationProps> = ({
  activeTab,
  setActiveTab,
}) => {
  return (
    <div className="flex bg-ctp-crust border-b border-ctp-surface0">
      <button
        className={`px-6 py-2.5 text-sm font-medium transition-colors relative ${
          activeTab === "overview"
            ? "text-ctp-peach"
            : "text-ctp-subtext0 hover:text-ctp-text"
        }`}
        onClick={() => setActiveTab("overview")}
      >
        Overview
        {activeTab === "overview" && (
          <motion.div
            className="absolute bottom-0 left-0 right-0 h-0.5 bg-ctp-peach"
            layoutId="activeTab"
          />
        )}
      </button>
      <button
        className={`px-6 py-2.5 text-sm font-medium transition-colors relative ${
          activeTab === "features"
            ? "text-ctp-peach"
            : "text-ctp-subtext0 hover:text-ctp-text"
        }`}
        onClick={() => setActiveTab("features")}
      >
        Key Features
        {activeTab === "features" && (
          <motion.div
            className="absolute bottom-0 left-0 right-0 h-0.5 bg-ctp-peach"
            layoutId="activeTab"
          />
        )}
      </button>
    </div>
  );
};

export default FeaturedProject;
