import React from "react";
import Section from "@/components/section/Section";
import ArticleCard from "./ArticleCard";
import { articles } from "./articlesdump";

const ArticlesComponent: React.FC = () => {
  return (
    <Section id="articles" label="Articles" glowAccent="pink" scanlines={true}>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 p-8 bg-ctp-base">
        {articles.map((article) => (
          <div className="h-full" key={article.title}>
            <ArticleCard {...article} />
          </div>
        ))}
      </div>
    </Section>
  );
};

const Articles = React.memo(ArticlesComponent);
export default Articles;
