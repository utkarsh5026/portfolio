import React from "react";
import TypeWriter from "../writer/TypeWriter";
import CodeTypeWriter from "../writer/JsTypeWriter";
import { useTour } from "../context/TourContext";
import Step from "./Step";
import { useSteps } from "./use-steps";

const thanksCodeText = `// Thank You for Visiting! 
const thanksMessage = {
  title: "Thank You for Visiting! ❤️",
  message: "I appreciate you taking the time to explore my portfolio. I hope you enjoyed the guided tour and got a good sense of my skills and experience. 😊"
};
`;

const ThankYouStep: React.FC = () => {
  const { typingSteps, incrementTypingSteps } = useSteps(3);
  const { endTour } = useTour();

  return (
    <Step
      section={null}
      title="Thank You!"
      onTitleComplete={incrementTypingSteps}
    >
      {typingSteps > 2 && (
        <>
          <div className="tour-thank-you-message">
            <TypeWriter
              text="I appreciate you taking the time to explore my portfolio. I hope you enjoyed the guided tour and got a good sense of my skills and experience."
              speed={20}
              delay={300}
            />
          </div>

          <CodeTypeWriter code={thanksCodeText} speed={20} delay={300} />

          <div className="tour-final-cta mt-4">
            <TypeWriter
              text="Feel free to continue exploring my portfolio. You can restart the tour anytime using the 'Take a Tour' button."
              speed={25}
              delay={3000}
            />

            <button
              className="tour-button tour-button-glow mt-4 font-mono"
              onClick={endTour}
            >
              Close Tour
            </button>
          </div>
        </>
      )}
    </Step>
  );
};

export default ThankYouStep;
