import React from "react";
import { Button } from "@/components/ui/button";

interface ArticleCardProps {
  title: string;
  description: string;
  link: string;
}

const ArticleCard: React.FC<ArticleCardProps> = ({
  title,
  description,
  link,
}) => {
  return (
    <div className="bg-transparent rounded-lg transition-all duration-300 flex flex-col justify-between border-4 border-ctp-surface1 p-4 sm:p-6 md:p-8 h-full">
      <div className="bg-ctp-mantle p-3 sm:p-4 rounded-lg">
        <h2 className="text-base sm:text-lg font-normal text-left text-ctp-mauve">
          {title}
        </h2>
        <p className="text-ctp-subtext0 text-xs sm:text-sm my-4 sm:my-6 text-left">
          {description}
        </p>
        <Button
          onClick={() => window.open(link, "_blank")}
          className="bg-transparent w-fit text-ctp-text hover:border-ctp-peach hover:bg-transparent hover:border-2 text-sm sm:text-base"
        >
          Read more
        </Button>
      </div>
    </div>
  );
};

export default ArticleCard;
