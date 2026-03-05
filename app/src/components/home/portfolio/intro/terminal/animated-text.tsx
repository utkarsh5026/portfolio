import React, { useEffect,useState } from "react";

import { cn } from "@/lib/utils";

import styles from "./statements-terminal.module.css";

const TYPING_SPEED = 50;
const DELETE_SPEED = 30;
const PAUSE_DURATION = 3000;

interface QAPair {
  question: string;
  answer: string;
  syntaxClass: string;
  icon: JSX.Element;
}

interface AnimatedTextProps {
  qaPairs: QAPair[];
}

const AnimatedText: React.FC<AnimatedTextProps> = ({ qaPairs }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [typedQuestion, setTypedQuestion] = useState("");
  const [step, setStep] = useState<"typing" | "answered" | "deleting">(
    "typing",
  );
  const [isDeletingFadeOut, setIsDeletingFadeOut] = useState(false);

  const currentPair = qaPairs[currentIndex];

  useEffect(() => {
    let timeout: NodeJS.Timeout;

    if (step === "typing") {
      if (typedQuestion.length < currentPair.question.length) {
        timeout = setTimeout(() => {
          setTypedQuestion(
            currentPair.question.slice(0, typedQuestion.length + 1),
          );
        }, TYPING_SPEED);
      } else {
        timeout = setTimeout(() => {
          setStep("answered");
        }, 300);
      }
    } else if (step === "answered") {
      timeout = setTimeout(() => {
        setIsDeletingFadeOut(true);
        setTimeout(() => {
          setStep("deleting");
          setIsDeletingFadeOut(false);
        }, 150); // Give fadeOut animation time to finish before actually un-rendering/deleting
      }, PAUSE_DURATION);
    } else if (step === "deleting") {
      if (typedQuestion.length > 0) {
        timeout = setTimeout(() => {
          setTypedQuestion(typedQuestion.slice(0, -1));
        }, DELETE_SPEED);
      } else {
        setStep("typing");
        setCurrentIndex((prev) => (prev + 1) % qaPairs.length);
      }
    }

    return () => clearTimeout(timeout);
  }, [typedQuestion, step, currentIndex, currentPair.question, qaPairs.length]);

  // Prevent answer from showing when we transition quickly
  const showAnswer = step === "answered" || isDeletingFadeOut;

  return (
    <div className="flex flex-col h-full z-10">
      {/* Command Line */}
      <div className="flex items-center flex-wrap gap-2 text-ctp-subtext1">
        <span className="text-ctp-green font-bold">➜</span>
        <span className="text-ctp-sky font-bold">~</span>
        <span className="text-ctp-text">
          {typedQuestion}
          <span
            className={cn(
              "inline-block w-[8px] h-[16px] ml-1 bg-ctp-overlay0 align-middle transition-opacity duration-300",
              step === "answered" ? "opacity-0" : styles.cursorBlink,
            )}
          />
        </span>
      </div>

      {/* Output */}
      <div className="mt-4 sm:mt-5 flex-1 w-full max-w-full overflow-hidden">
        {showAnswer && (
          <div
            key={currentPair.answer}
            className={cn(
              "flex items-start gap-3 w-full",
              isDeletingFadeOut ? styles.answerFadeOut : styles.answerFadeIn,
            )}
          >
            <div className="mt-0.5 opacity-90">{currentPair.icon}</div>
            <p
              className={cn(
                "leading-relaxed break-words",
                currentPair.syntaxClass,
              )}
            >
              {currentPair.answer}
            </p>
          </div>
        )}
      </div>

      {/* Navigation Indicators */}
      <div className="flex justify-start gap-1.5 mt-auto pb-1.5 pt-4">
        {qaPairs.map((_, idx) => (
          <div
            key={idx}
            className={cn(
              "h-1 rounded-full transition-all duration-300",
              idx === currentIndex
                ? "bg-ctp-overlay0 w-4"
                : "bg-ctp-surface0 w-1.5",
            )}
          />
        ))}
      </div>
    </div>
  );
};

export default AnimatedText;
