import React, { useState } from "react";
import TypeWriter from "../writer/TypeWriter";
import Step from "./Step";
import { articles } from "@/components/home/portfolio/articles/articles-dump";
import CodeTypeWriter from "../writer/JsTypeWriter";
import TourStepFinalMessage from "../utils/TourStepFinalMessage";
import {
  BookOpen,
  Database,
  Server,
  ExternalLink,
  Search,
  BookMarked,
  Info,
} from "lucide-react";

const articleCodeText = `const articleCategories = {
  series: ['Mastering Data Structures for Databases', 'Node.js Concepts'],
  topics: ['Skiplists', 'Bloom Filters', 'LSM Trees', 'B Trees', 'process.nextTick()', 'Web Hooks'],
  platforms: ['Medium']
};`;

const ArticlesStep: React.FC = () => {
  const [highlightedArticle, setHighlightedArticle] = useState<number | null>(
    null
  );
  const [typingSteps, setTypingSteps] = useState(0);
  const [expandedArticle, setExpandedArticle] = useState<number | null>(null);
  const [isExplaining, setIsExplaining] = useState(false);

  const handleArticleHighlight = (index: number) => {
    setExpandedArticle(null);
    setIsExplaining(false);
    setHighlightedArticle(index);
  };

  const incrementTypingSteps = () => {
    setTypingSteps((prev) => prev + 1);
  };

  const toggleArticleExpansion = (index: number) => {
    if (expandedArticle === index) {
      setExpandedArticle(null);
      setIsExplaining(false);
    } else {
      setExpandedArticle(index);
      setIsExplaining(true);
    }
  };

  const dataDatabaseArticles = articles.filter((article) =>
    article.title.includes("Mastering Data Structures for Databases")
  );
  const nodeJsArticles = articles.filter(
    (article) =>
      !article.title.includes("Mastering Data Structures for Databases")
  );

  return (
    <Step
      section="articles"
      title="Technical Articles"
      onTitleComplete={incrementTypingSteps}
    >
      {typingSteps > 0 && (
        <>
          <div className="tour-message text-ctp-text">
            <TypeWriter
              text="Here you'll find technical articles I've written about various topics in software development."
              speed={20}
              delay={300}
              onComplete={incrementTypingSteps}
            />
          </div>

          {typingSteps > 1 && (
            <div className="code-block mt-3 p-3 rounded text-xs bg-ctp-crust text-ctp-text shadow-md overflow-auto border border-ctp-surface0">
              <CodeTypeWriter
                code={articleCodeText}
                speed={5}
                delay={1500}
                className="code-text font-mono"
              />
            </div>
          )}

          <div className="tour-interactive mt-3">
            <p className="text-xs font-medium mb-1.5 flex items-center text-ctp-subtext0">
              <BookMarked className="w-3.5 h-3.5 mr-1.5 text-ctp-sapphire" />
              Article collections:
            </p>
            <div className="tour-interactive-buttons flex gap-2 mt-1.5">
              <button
                className={`flex items-center px-3 py-1.5 rounded-lg shadow-sm transition-all duration-300 text-xs ${
                  highlightedArticle === 0
                    ? "bg-ctp-blue text-ctp-crust"
                    : "bg-ctp-surface0 border border-ctp-surface1 hover:bg-ctp-surface1 text-ctp-subtext0"
                }`}
                onClick={() => handleArticleHighlight(0)}
              >
                <Database
                  className={`w-3.5 h-3.5 mr-1.5 ${
                    highlightedArticle === 0
                      ? "text-ctp-crust"
                      : "text-ctp-blue"
                  }`}
                />
                <span className="font-medium">Data Structures</span>
              </button>
              <button
                className={`flex items-center px-3 py-1.5 rounded-lg shadow-sm transition-all duration-300 text-xs ${
                  highlightedArticle === 1
                    ? "bg-ctp-green text-ctp-crust"
                    : "bg-ctp-surface0 border border-ctp-surface1 hover:bg-ctp-surface1 text-ctp-subtext0"
                }`}
                onClick={() => handleArticleHighlight(1)}
              >
                <Server
                  className={`w-3.5 h-3.5 mr-1.5 ${
                    highlightedArticle === 1
                      ? "text-ctp-crust"
                      : "text-ctp-green"
                  }`}
                />
                <span className="font-medium">Node.js</span>
              </button>
            </div>
          </div>

          {highlightedArticle !== null && (
            <div className="tour-article-preview mt-3 p-2.5 rounded-lg shadow-sm bg-ctp-mantle border border-ctp-surface0">
              <h4
                className={`text-sm font-semibold mb-2 pb-1.5 border-b border-ctp-surface1 flex items-center ${
                  highlightedArticle === 0 ? "text-ctp-blue" : "text-ctp-green"
                }`}
              >
                {highlightedArticle === 0 ? (
                  <>
                    <Database className="w-4 h-4 mr-1.5" />
                    Data Structures Series
                  </>
                ) : (
                  <>
                    <Server className="w-4 h-4 mr-1.5" />
                    Node.js Articles
                  </>
                )}
              </h4>
              <div className="mt-1.5 space-y-1.5 max-h-[240px] overflow-y-auto pr-1 custom-scrollbar">
                {(highlightedArticle === 0
                  ? dataDatabaseArticles
                  : nodeJsArticles
                ).map((article, idx) => (
                  <div
                    key={idx}
                    className={`rounded-lg transition-all duration-200 ${
                      expandedArticle === idx
                        ? "bg-ctp-surface0"
                        : "hover:bg-ctp-surface0"
                    }`}
                  >
                    {/* Article header - compact version */}
                    <div className="p-1.5 flex items-center justify-between">
                      <div className="flex items-start">
                        <BookOpen
                          className={`w-4 h-4 mr-2 mt-0.5 flex-shrink-0 ${
                            highlightedArticle === 0
                              ? "text-ctp-blue"
                              : "text-ctp-green"
                          }`}
                        />
                        <strong className="block text-xs text-ctp-text truncate max-w-[180px]">
                          {article.title
                            .replace(
                              "Mastering Data Structures for Databases: ",
                              ""
                            )
                            .replace("Node.js Concepts: ", "")}
                        </strong>
                      </div>
                      <button
                        onClick={() => toggleArticleExpansion(idx)}
                        className="text-ctp-subtext1 hover:text-ctp-text transition-colors rounded-full p-1 hover:bg-ctp-surface1"
                        title="Expand article"
                      >
                        <Info className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    {/* Expandable article section */}
                    {expandedArticle === idx && (
                      <div className="px-2 pb-2 pt-0.5">
                        <div className="pl-6 pr-1 border-l border-ctp-surface1">
                          {isExplaining && (
                            <TypeWriter
                              text={article.description}
                              speed={10}
                              className="text-xs text-ctp-subtext0"
                            />
                          )}
                          <a
                            href={article.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`mt-2 inline-flex items-center text-xs font-medium transition-colors ${
                              highlightedArticle === 0
                                ? "text-ctp-sapphire hover:text-ctp-blue"
                                : "text-ctp-teal hover:text-ctp-green"
                            }`}
                          >
                            <ExternalLink className="w-3 h-3 mr-1" />
                            Read on Medium
                          </a>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
              <div
                className={`mt-2 pt-1.5 text-xs flex items-center justify-end ${
                  highlightedArticle === 0
                    ? "text-ctp-sapphire"
                    : "text-ctp-teal"
                }`}
              >
                <Search className="w-3 h-3 mr-1" />
                <span>
                  {highlightedArticle === 0
                    ? dataDatabaseArticles.length
                    : nodeJsArticles.length}{" "}
                  articles found
                </span>
              </div>
            </div>
          )}

          {typingSteps > 2 && (
            <TourStepFinalMessage
              message="I regularly write about complex technical topics and break them
                down into understandable concepts."
            />
          )}
        </>
      )}
    </Step>
  );
};

export default ArticlesStep;
