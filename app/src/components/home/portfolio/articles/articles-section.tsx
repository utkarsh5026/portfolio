import React, { useState } from "react";
import Section from "@/components/section/portfolio-section";
import { articles } from "./articles-dump";
import { OutlineNode } from "@/components/home/editor/outline";
import { Book, Search } from "lucide-react";
import ArticleCard from "./article-card";
import Reveal from "@/components/animations/reveal/Reveal";

const ArticlesComponent: React.FC = () => {
  /**
   * State for the current search query entered by the user
   */
  const [searchQuery, setSearchQuery] = useState<string>("");

  /**
   * State to track which article is currently expanded to show its full description
   */
  const [expandedArticleId, setExpandedArticleId] = useState<string | null>(
    null
  );

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
        {/* Search Bar */}
        <Reveal
          effect="fade-up"
          duration={0.5}
          delay={0.1}
          className="relative mb-8 mx-4"
        >
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-ctp-subtext0" />
          </div>
          <input
            type="text"
            placeholder="Search articles..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="block w-full pl-10 pr-4 py-2 border-none bg-ctp-surface0/10 backdrop-blur-sm rounded-lg focus:ring-1 focus:ring-ctp-pink/30 focus:bg-ctp-surface0/15 outline-none transition-all duration-200 text-ctp-text placeholder-ctp-subtext0"
          />
        </Reveal>

        {/* Articles Grid with improved styling */}
        <div className="px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {articles.map((article, index) => (
              <OutlineNode
                level={1}
                key={article.title}
                parentId="articles"
                id={article.title}
                label={article.title}
                icon={<Book className="w-3 h-3 text-ctp-pink" />}
              >
                <ArticleCard
                  key={`${article.title}-${index}`}
                  article={article}
                  index={index}
                  isExpanded={expandedArticleId === article.title}
                  toggleExpand={() =>
                    setExpandedArticleId(
                      expandedArticleId === article.title ? null : article.title
                    )
                  }
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
