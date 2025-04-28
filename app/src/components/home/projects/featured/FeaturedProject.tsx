import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { Project } from "@/types";
import { FaStar } from "react-icons/fa";
import { HiOutlineSparkles } from "react-icons/hi";
import ProjectContent from "./ProjectContent";
import Certificate from "./Certificate";
import FeaturedHeader from "./FeaturedHeader";

interface FeaturedProjectProps {
  featuredProject: Project;
  handleProjectSelect: (project: Project) => void;
}
type Tab = "overview" | "features";

/**
 * FeaturedProject component displays the details of a featured project.
 * It includes an animated header, project content, and a certificate.
 * The component allows users to toggle the visibility of the project details
 * and switch between different tabs (Overview and Key Features).
 *
 * @component
 * @param {FeaturedProjectProps} props - The properties for the FeaturedProject component.
 * @param {Project} props.featuredProject - The project object containing details of the featured project.
 * @param {function} props.handleProjectSelect - Function to handle the selection of the project.
 *
 * @returns {JSX.Element} A styled component that showcases the featured project with animations.
 *
 * @example
 * <FeaturedProject
 *   featuredProject={projectData}
 *   handleProjectSelect={selectProject}
 * />
 */
const FeaturedProject: React.FC<FeaturedProjectProps> = ({
  featuredProject,
  handleProjectSelect,
}) => {
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

      <FeaturedHeader />

      <AnimatePresence>
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
                    <ProjectContent
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
      </AnimatePresence>
    </div>
  );
};

interface TabNavigationProps {
  activeTab: Tab;
  setActiveTab: (tab: Tab) => void;
}

/**
 * TabNavigation component allows users to switch between different tabs
 * in the FeaturedProject section. It provides buttons for "Overview" and
 * "Key Features", highlighting the active tab for better user experience.
 *
 * @component
 * @param {TabNavigationProps} props - The properties for the TabNavigation component.
 * @param {Tab} props.activeTab - The currently active tab, either "overview" or "features".
 * @param {function} props.setActiveTab - Function to update the active tab state.
 *
 * @returns {JSX.Element} A navigation bar with buttons for tab selection.
 *
 * @example
 * <TabNavigation
 *   activeTab="overview"
 *   setActiveTab={setActiveTab}
 * />
 */
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
