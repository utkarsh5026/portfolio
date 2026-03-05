import { Book } from "lucide-react";
import React from "react";

import { OutlineNode } from "@/components/home/editor/outline";
import Section from "@/components/section/portfolio-section";

import ArticleCard from "./article-card";
import { articles } from "./articles-dump";

const ArticlesComponent: React.FC = () => {
  return (
    <Section
      id="articles"
      label="Articles"
      title="Published Articles"
      description={`${articles.length} articles on database internals, web development, and more`}
      headerIcon={Book}
      icon="api"
      scanlines={true}
      showHeader={true}
    >
      <div className="mb-8 max-w-6xl mx-auto">
        <div className="px-2 sm:px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            {articles.map((article, index) => (
              <OutlineNode
                key={article.title}
                label={article.title}
                icon={<Book className="w-3 h-3 text-ctp-pink" />}
              >
                <ArticleCard
                  key={`${article.title}-${index}`}
                  article={article}
                  index={index}
                />
              </OutlineNode>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
};

export default ArticlesComponent;
