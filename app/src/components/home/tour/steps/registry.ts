import WelcomeStep from "./WelcomeStep";
import AboutStep from "./AboutStep";
import SkillsStep from "./SkillsStep";
import ProjectsStep from "./ProjectsStep";
import ExperienceStep from "./ExperienceSetup";
import ContactStep from "./ContactSetup";
import ThankYouStep from "./ThankyouStep";
import LearningStep from "./LearningStep";
import ArticlesStep from "./ArticlesStep";
import { TourStepType, TourStep } from "../context/TourType";

export const tourStepComponents: Record<TourStep, React.ComponentType> = {
  [TourStepType.WELCOME]: WelcomeStep,
  [TourStepType.ABOUT]: AboutStep,
  [TourStepType.SKILLS]: SkillsStep,
  [TourStepType.PROJECTS]: ProjectsStep,
  [TourStepType.EXPERIENCE]: ExperienceStep,
  [TourStepType.CONTACT]: ContactStep,
  [TourStepType.THANK_YOU]: ThankYouStep,
  [TourStepType.ARTICLES]: ArticlesStep,
  [TourStepType.LEARNING]: LearningStep,
};

export const tourSteps = [
  {
    id: TourStepType.WELCOME,
    placement: "center",
    highlightSelector: null,
  },

  {
    id: TourStepType.ABOUT,
    placement: "bottom",
    highlightSelector: ".about-section",
  },
  {
    id: TourStepType.SKILLS,
    placement: "bottom",
    highlightSelector: ".skills-section",
  },
  {
    id: TourStepType.PROJECTS,
    placement: "top",
    highlightSelector: ".projects-section",
  },
  {
    id: TourStepType.EXPERIENCE,
    placement: "bottom",
    highlightSelector: ".experience-section",
  },
  {
    id: TourStepType.LEARNING,
    placement: "bottom",
    highlightSelector: ".learning-section",
  },
  {
    id: TourStepType.ARTICLES,
    placement: "bottom",
    highlightSelector: ".articles-section",
  },
  {
    id: TourStepType.CONTACT,
    placement: "top",
    highlightSelector: ".contact-section",
  },
  {
    id: TourStepType.THANK_YOU,
    placement: "center",
    highlightSelector: null,
  },
];
