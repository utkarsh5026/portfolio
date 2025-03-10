import React, { useState } from "react";
import TypeWriter from "../writer/TypeWriter";
import Step from "./Step";
import { articles } from "@/components/home/articles/articlesdump";
import CodeTypeWriter from "../writer/JsTypeWriter";
import TourStepFinalMessage from "../utils/TourStepFinalMessage";

const articleCodeText = `const articleCategories = {
  series: ['Mastering Data Structures for Databases', 'Node.js Concepts'],
  topics: ['Skiplists', 'Bloom Filters', 'LSM Trees', 'B Trees', 'process.nextTick()', 'Web Hooks'],
  platforms: ['Medium']
};`;

const ArticlesStep: React.FC = () => {
  const [highlightedArticle, setHighlightedArticle] = useState<number | null>(
    null
  );
  const [typingSteps, setTypingSteps] = useState<number>(0);

  // Function to highlight a specific article
  const handleArticleHighlight = (index: number) => {
    // First, remove any existing highlights
    if (highlightedArticle !== null) {
      const prevElement = document.querySelector(
        `.article-${highlightedArticle}`
      );
      if (prevElement) {
        prevElement.classList.remove("article-highlight");
      }
    }

    // Then highlight the selected article
    setHighlightedArticle(index);
    setTimeout(() => {
      const articleElement = document.querySelector(`.article-${index}`);
      if (articleElement) {
        articleElement.classList.add("article-highlight");

        // Scroll the element into view if needed
        articleElement.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    }, 100);
  };

  const incrementTypingSteps = () => {
    setTypingSteps((prev) => prev + 1);
  };

  // Group articles by series
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
          <div className="tour-message">
            <TypeWriter
              text="Here you'll find technical articles I've written about various topics in software development, sharing insights and solutions from my experience."
              speed={20}
              delay={300}
              onComplete={incrementTypingSteps}
            />
          </div>

          {typingSteps > 1 && (
            <div className="code-block mt-4">
              <CodeTypeWriter
                code={articleCodeText}
                speed={5}
                delay={1500}
                className="code-text"
              />
            </div>
          )}

          <div className="tour-interactive mt-4">
            <p>Browse through my article collections:</p>
            <div className="tour-interactive-buttons">
              <button
                className="tour-demo-button font-mono"
                onClick={() => handleArticleHighlight(0)}
              >
                Data Structures Series
              </button>
              <button
                className="tour-demo-button"
                onClick={() => handleArticleHighlight(1)}
              >
                Node.js Articles
              </button>
            </div>
          </div>

          {highlightedArticle !== null && (
            <div className="tour-article-preview mt-4 p-4 border rounded shadow-sm">
              <h4 className="text-lg font-semibold mb-3 pb-2 border-b">
                {highlightedArticle === 0
                  ? "Data Structures Series"
                  : "Node.js Articles"}
              </h4>
              <div className="mt-2 space-y-4 max-h-[400px] overflow-y-auto pr-1">
                {(highlightedArticle === 0
                  ? dataDatabaseArticles
                  : nodeJsArticles
                ).map((article, idx) => (
                  <li key={idx} className="list-none">
                    <strong className="block text-md mb-1">
                      {article.title}
                    </strong>
                    <p className="text-sm text-gray-600 mb-2 line-clamp-2">
                      {article.description}
                    </p>
                    <a
                      href={article.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block text-blue-500 hover:underline text-sm font-medium"
                    >
                      Read on Medium →
                    </a>
                  </li>
                ))}
              </div>
            </div>
          )}

          {typingSteps > 2 && (
            <TourStepFinalMessage message="I regularly write about complex technical topics and break them down into understandable concepts. Check out these articles to see my thinking process and technical knowledge." />
          )}
        </>
      )}
    </Step>
  );
};

export default ArticlesStep;
