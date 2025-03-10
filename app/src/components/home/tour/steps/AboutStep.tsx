import React from "react";
import TypeWriter from "../writer/TypeWriter";
import CodeTypeWriter from "../writer/JsTypeWriter";
import Step from "./Step";
import TourStepFinalMessage from "../utils/TourStepFinalMessage";
import { useSteps } from "./use-steps";

const codeBlock = `
const developer = {
  name: "Utkarsh Priyadarshi",
  role: "Full Stack Developer",
  passions: ["Web Development",
   "UI/UX Design", "Problem Solving"],
  values: ["Clean Code", "User Experience", "Continuous Learning"]
};
`;

const AboutStep: React.FC = () => {
  const { typingSteps, incrementTypingSteps, isFinalStep } = useSteps(3);

  return (
    <Step
      section="about"
      title="About Me"
      onTitleComplete={() => incrementTypingSteps()}
    >
      {typingSteps > 0 && (
        <>
          <div className="tour-about-message">
            <TypeWriter
              text="Let me tell you a bit about myself and my journey as a developer."
              speed={20}
              delay={300}
              onComplete={() => incrementTypingSteps()}
            />
          </div>

          {typingSteps > 1 && (
            <div className="my-4">
              <CodeTypeWriter
                code={codeBlock}
                speed={20}
                delay={300}
                onComplete={() => incrementTypingSteps()}
              />
            </div>
          )}
          {isFinalStep() && (
            <TourStepFinalMessage message="I'm passionate about creating intuitive, beautiful web experiences that solve real problems." />
          )}
        </>
      )}
    </Step>
  );
};

export default AboutStep;
