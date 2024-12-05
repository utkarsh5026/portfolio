import React from "react";
import Section from "@/components/base/Section";
import ArticleCard from "./ArticleCard";
import { articles } from "./articlesdump";

const Articles: React.FC = () => {
  return (
    <Section id="articles" label="Articles">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 p-8">
        {articles.map((article) => (
          <div className="h-full" key={article.title}>
            <ArticleCard {...article} />
          </div>
        ))}
      </div>
    </Section>
  );
};

export default Articles;
