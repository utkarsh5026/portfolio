import React, { useState } from "react";
import TypeWriter from "../writer/TypeWriter";
import Step from "./Step";
import CodeTypeWriter from "../writer/JsTypeWriter";
import { experiences } from "@/components/home/work/experienceDump";

const experience = experiences[0];

const codeText = `const experience = [
  {
    company: "${experience.company}",
    role: "${experience.position}",
    period: "${experience.duration}",
    focus: "${experience.achievements
      .map((achievement) => achievement.title)
      .join(", ")}"
  },
`;
const ExperienceStep: React.FC = () => {
  const [typingComplete, setTypingComplete] = useState(false);

  return (
    <Step
      section="experience"
      title="Work Experience"
      onTitleComplete={() => setTypingComplete(true)}
    >
      {typingComplete && (
        <>
          <div className="tour-message">
            <TypeWriter
              text="Here's my professional journey so far. Each role has contributed to my growth as a developer and problem solver."
              speed={20}
              delay={300}
            />
          </div>

          <div className="code-block mt-4">
            <CodeTypeWriter code={codeText} speed={10} delay={1000} />
          </div>

          <div className="tour-message-highlight mt-4">
            <TypeWriter
              text="My professional experience has helped me develop strong collaboration skills and a deep understanding of development workflows."
              speed={25}
              delay={500}
              className="tour-highlight-text"
            />
          </div>
        </>
      )}
    </Step>
  );
};

export default ExperienceStep;
