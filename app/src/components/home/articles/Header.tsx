import { Button } from "@/components/ui/button";
import { BookOpen } from "lucide-react";
import { cn } from "@/lib/utils";
import { articles } from "./articlesdump";
import React from "react";
import Reveal from "@/components/animations/reveal/Reveal";

interface HeaderProps {
  categories: string[];
  selectedCategory: string | null;
  setSelectedCategory: (category: string | null) => void;
}

const Header: React.FC<HeaderProps> = ({
  categories,
  selectedCategory,
  setSelectedCategory,
}) => {
  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 px-4 gap-4">
      <Reveal
        effect="slide-in"
        direction="left"
        duration={0.5}
        className="flex items-center gap-3"
      >
        <div className="p-2 rounded-lg bg-gradient-to-br from-ctp-pink to-ctp-mauve text-ctp-base shadow-lg shadow-ctp-pink/20">
          <BookOpen className="w-5 h-5" />
        </div>
        <div>
          <h2 className="text-xl font-semibold bg-gradient-to-r from-ctp-pink to-ctp-mauve text-transparent bg-clip-text">
            Published Articles
          </h2>
          <p className="text-sm text-ctp-subtext0">
            {articles.length} articles on database internals, web development,
            and more
          </p>
        </div>
      </Reveal>

      <Reveal
        effect="slide-in"
        direction="right"
        duration={0.5}
        delay={0.2}
        className="hidden md:flex gap-2 items-center flex-wrap"
      >
        {categories.map((category) => (
          <Button
            key={category}
            variant="outline"
            size="sm"
            className={cn(
              "border-ctp-surface0 hover:border-ctp-pink",
              selectedCategory === category
                ? "bg-ctp-pink/10 text-ctp-pink border-ctp-pink"
                : "bg-transparent"
            )}
            onClick={() =>
              setSelectedCategory(
                selectedCategory === category ? null : category
              )
            }
          >
            {category}
          </Button>
        ))}
        <Button
          variant="outline"
          size="sm"
          className={cn(
            "border-ctp-surface0 hover:border-ctp-pink",
            selectedCategory === null
              ? "bg-ctp-pink/10 text-ctp-pink border-ctp-pink"
              : "bg-transparent"
          )}
          onClick={() => setSelectedCategory(null)}
        >
          All
        </Button>
      </Reveal>
    </div>
  );
};

export default Header;
