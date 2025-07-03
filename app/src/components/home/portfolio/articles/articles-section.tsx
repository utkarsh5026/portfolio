import React, { useMemo, useState } from "react";
import Section from "@/components/section/portfolio-section";
import { articles } from "./articles-dump";
import { OutlineNode } from "@/components/home/editor/outline";
import { Book, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import ArticleCard from "./article-card";
import MobileFilter from "./mobile-filter";
import Reveal from "@/components/animations/reveal/Reveal";

/**
 * ArticlesComponent - A React component that displays a collection of articles with filtering and search capabilities.
 *
 * This component provides a comprehensive article browsing experience with the following features:
 * - Search functionality to filter articles by title or description
 * - Category filtering to view articles by topic
 * - Expandable article cards for better readability
 * - Responsive grid layout for different screen sizes
 * - Empty state handling when no articles match the current filters
 *
 * @returns {JSX.Element} The rendered ArticlesComponent
 */
const ArticlesComponent: React.FC = () => {
  /**
   * State for the current search query entered by the user
   */
  const [searchQuery, setSearchQuery] = useState<string>("");

  /**
   * State for the currently selected category filter
   */
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  /**
   * State to track which article is currently expanded to show its full description
   */
  const [expandedArticleId, setExpandedArticleId] = useState<string | null>(
    null
  );

  /**
   * Memoized computation of unique categories from article data
   * Extracts categories based on article title keywords
   */
  const categories = useMemo(() => {
    const uniqueCategories = new Set<string>();
    articles.forEach((article) => {
      const titleWords = article.title.split(" ");
      let category = "Web Development";

      if (
        titleWords[titleWords.length - 1] === "Filters" ||
        titleWords.includes("Data")
      ) {
        category = "Databases";
      } else if (titleWords.includes("NodeJS")) {
        category = "JavaScript";
      }

      uniqueCategories.add(category);
    });

    return Array.from(uniqueCategories);
  }, []);

  /**
   * Memoized filtering of articles based on search query and selected category
   * returns  Filtered array of articles that match both search and category criteria
   */
  const filteredArticles = useMemo(
    () =>
      articles.filter((article) => {
        const matchesSearch =
          searchQuery === "" ||
          article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          article.description.toLowerCase().includes(searchQuery.toLowerCase());

        const categoryToCheck =
          selectedCategory === null ||
          (article.title.includes("Filters") &&
            selectedCategory === "Databases") ||
          (article.title.includes("Data") &&
            selectedCategory === "Databases") ||
          (article.title.includes("NodeJS") &&
            selectedCategory === "JavaScript") ||
          (selectedCategory === "Web Development" &&
            !article.title.includes("Filters") &&
            !article.title.includes("Data") &&
            !article.title.includes("NodeJS"));

        return matchesSearch && categoryToCheck;
      }),
    [searchQuery, selectedCategory]
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
            className="block w-full pl-10 pr-4 py-2 border border-ctp-surface0 bg-ctp-mantle rounded-lg focus:ring-ctp-pink focus:border-ctp-pink outline-none transition-colors duration-200 text-ctp-text placeholder-ctp-subtext0"
          />
        </Reveal>

        {/* Mobile Category Filter */}
        <MobileFilter
          categories={categories}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />

        {/* Articles Grid with improved styling */}
        <div className="px-4">
          {filteredArticles.length === 0 ? (
            <Reveal
              effect="fade-through"
              duration={0.5}
              className="flex flex-col items-center justify-center py-20 text-center"
            >
              <Book className="w-12 h-12 text-ctp-surface0 mb-4" />
              <h3 className="text-xl font-medium text-ctp-text mb-2">
                No articles found
              </h3>
              <p className="text-ctp-subtext0 max-w-md">
                No articles match your current search criteria. Try adjusting
                your search or clearing filters.
              </p>
              {searchQuery && (
                <Button
                  variant="outline"
                  className="mt-4 border-ctp-pink text-ctp-pink hover:bg-ctp-pink/10"
                  onClick={() => setSearchQuery("")}
                >
                  Clear search
                </Button>
              )}
            </Reveal>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredArticles.map((article, index) => (
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
                        expandedArticleId === article.title
                          ? null
                          : article.title
                      )
                    }
                  />
                </OutlineNode>
              ))}
            </div>
          )}
        </div>
      </div>
    </Section>
  );
};

export default ArticlesComponent;
