import { User } from "lucide-react";
import React from "react";

import Reveal from "@/components/animations/reveal/Reveal";
import { Heading, Text } from "@/components/ui/text";

import { background } from "../data/data";
import SectionHeader from "./about-header";

const Background: React.FC = () => {
  return (
    <div className="relative w-full overflow-hidden">
      <div className="relative bg-ctp-surface0/10 rounded-2xl sm:rounded-3xl border border-none overflow-hidden w-full">
        <div className="p-3 sm:p-4 md:p-6 lg:p-8">
          <SectionHeader
            icon={User}
            color="blue"
            title="My Background"
            subtitle="The journey so far"
          />

          {/* Flashcards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
            {background.map((item, index) => (
              <Reveal
                key={item.question}
                effect="fade-up"
                delay={0.2 + index * 0.1}
                duration={0.5}
              >
                <FlashCard question={item.question} answer={item.answer} />
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

interface FlashCardProps {
  question: string;
  answer: string;
}

const FlashCard: React.FC<FlashCardProps> = ({ question, answer }) => {
  return (
    <div className="relative group w-full h-full">
      <div className="relative p-4 sm:p-5 md:p-6 bg-ctp-mantle/80 hover:bg-ctp-surface0/40 rounded-xl sm:rounded-2xl border-none hover:border-ctp-blue/40 transition-all duration-300 h-full flex flex-col">
        {/* Question */}
        <div className="flex items-start gap-2 mb-3">
          <div className="flex-shrink-0 w-5 h-5 sm:w-6 sm:h-6 rounded-md bg-gradient-to-br from-ctp-blue/20 to-ctp-mauve/20 flex items-center justify-center">
            <span className="text-ctp-blue text-xs sm:text-sm font-bold">
              Q
            </span>
          </div>
          <Heading as="h4" className="leading-snug">
            {question}
          </Heading>
        </div>

        {/* Answer */}
        <div className="flex items-start gap-2 flex-1">
          <div className="flex-shrink-0 w-5 h-5 sm:w-6 sm:h-6 rounded-md bg-gradient-to-br from-ctp-green/20 to-ctp-teal/20 flex items-center justify-center">
            <span className="text-ctp-green text-xs sm:text-sm font-bold">
              A
            </span>
          </div>
          <Text variant="body">{answer}</Text>
        </div>
      </div>
    </div>
  );
};

export default Background;
