import React from "react";
import { motion } from "framer-motion";
import { SectionType } from "../context/explorerContext";
import {
  HomeLoading,
  AboutLoading,
  ProjectsLoading,
  ExperienceLoading,
  ContactLoading,
  LearningLoading,
  ArticlesLoading,
  SkillsLoading,
} from "../section-loading";

interface SectionLoadingScreenProps {
  section: SectionType;
}

const SectionLoadingScreen: React.FC<SectionLoadingScreenProps> = ({
  section,
}) => {
  const renderSectionLoading = () => {
    switch (section) {
      case "home":
        return <HomeLoading />;
      case "about":
        return <AboutLoading />;
      case "skills":
        return <SkillsLoading />;
      case "projects":
        return <ProjectsLoading />;
      case "experience":
        return <ExperienceLoading />;
      case "contact":
        return <ContactLoading />;
      case "learning":
        return <LearningLoading />;
      case "articles":
        return <ArticlesLoading />;
      default:
        return <HomeLoading />;
    }
  };

  return (
    <motion.div
      className="flex flex-col items-center justify-center px-4 py-8 min-h-[70vh] w-full"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      {renderSectionLoading()}
    </motion.div>
  );
};

export default SectionLoadingScreen;
