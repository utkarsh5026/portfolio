import React, { useState } from "react";
import TypeWriter from "../writer/TypeWriter";
import { useTour } from "../context/TourContext";
import JSTypeWriter from "../writer/JsTypeWriter";
import Step from "./Step";

const welcomeText =
  "Hi there! ✨ Welcome to my little corner of the web! I've crafted this VS Code-themed portfolio with lots of love and caffeine. Feel free to click around and make yourself at home!";

const welcomeCodeText = `
    function sendWarmWelcome() {
      const visitor = "wonderful person";
      const emoji = ["🌟", "🎉", "💖", "✨", "🚀"];
      const randomEmoji = emoji[Math.floor(Math.random() * emoji.length)];
      
      return \`\${randomEmoji} Thanks for stopping by, \${visitor}! \${randomEmoji}\`;
    }
`;

const WelcomeStep = React.memo(() => {
  const [typingComplete, setTypingComplete] = useState(false);
  const { nextStep } = useTour();

  return (
    <Step
      section={null}
      title="Welcome to My Portfolio! 😊"
      onTitleComplete={() => setTypingComplete(true)}
    >
      {typingComplete && (
        <>
          <div className="tour-welcome-message">
            <TypeWriter
              text={welcomeText}
              speed={20}
              delay={300}
              className="tour-welcome-text"
            />
          </div>

          <div className="code-block mt-4">
            <JSTypeWriter
              code={welcomeCodeText}
              speed={10}
              delay={1500}
              className="code-text"
            />
          </div>

          <div className="tour-welcome-cta">
            <TypeWriter text="Ready to explore?" speed={30} delay={3000} />
            <button
              className="tour-button tour-button-glow ml-4 font-mono"
              onClick={nextStep}
            >
              Let's Go →
            </button>
          </div>
        </>
      )}
    </Step>
  );
});

export default WelcomeStep;
