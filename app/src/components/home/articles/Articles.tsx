import React from "react";
import Section from "@/components/section/Section";
import ArticleCard from "./ArticleCard";
import { articles } from "./articlesdump";
import OutlineNode from "../editor/outline/OutlineNode";
import { VscTriangleRight } from "react-icons/vsc";

const ArticlesComponent: React.FC = () => {
  return (
    <Section
      id="articles"
      label="Articles"
      icon="api"
      glowAccent="pink"
      scanlines={true}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 p-8">
        {articles.map((article) => (
          <OutlineNode
            level={1}
            key={article.title}
            parentId="articles"
            id={article.title}
            label={article.title}
            icon={<VscTriangleRight />}
          >
            <div className="h-full" key={article.title}>
              <ArticleCard {...article} />
            </div>
          </OutlineNode>
        ))}
      </div>
    </Section>
  );
};

const Articles = React.memo(ArticlesComponent);
export default Articles;
