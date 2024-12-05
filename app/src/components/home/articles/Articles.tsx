import React from "react";
import Section from "@/components/base/Section";
import ArticleCard from "./ArticleCard";
import { articles } from "./articlesdump";

const Articles: React.FC = () => {
  return (
    <Section id="articles" label="Articles">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 p-8">
        {articles.map((article) => (
          <div className="flex flex-col gap-4 h-64 m-2">
            <ArticleCard key={article.title} {...article} />
          </div>
        ))}
      </div>
    </Section>
  );
};

export default Articles;
