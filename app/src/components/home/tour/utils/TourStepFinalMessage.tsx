import React from "react";
import TypeWriter from "../writer/TypeWriter";

interface TourStepFinalMessageProps {
  message: string;
}

const TourStepFinalMessage: React.FC<TourStepFinalMessageProps> = ({
  message,
}) => {
  return (
    <div className="tour-message-highlight mt-4 p-2 rounded-lg border-l-2 border-ctp-lavender bg-ctp-surface0">
      <TypeWriter
        text={message}
        speed={25}
        delay={1500}
        className="text-ctp-pink italic font-serif"
      />
    </div>
  );
};

export default TourStepFinalMessage;
