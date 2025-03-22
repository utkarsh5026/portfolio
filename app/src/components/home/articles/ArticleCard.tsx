import { motion } from "framer-motion";
import { Book, ExternalLink, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { articles } from "./articlesdump";

interface ArticleCardProps {
  article: (typeof articles)[0];
  index: number;
  isExpanded: boolean;
  toggleExpand: () => void;
}

const determineCategory = (article: (typeof articles)[0]) => {
  if (article.title.split(" ").includes("Data")) return "Databases";
  if (article.title.includes("Filters")) return "Databases";
  if (article.title.includes("NodeJS")) return "JavaScript";
  return "Web Development";
};

/**
 * ArticleCard component displays a single article with its title, description,
 * and category. It also provides functionality to expand/collapse the article
 * description and a button to read the full article.
 *
 * @param {Object} props - The properties for the ArticleCard component.
 * @param {Object} props.article - The article object containing title, description, and link.
 * @param {number} props.index - The index of the article in the list, used for animation delay.
 * @param {boolean} props.isExpanded - Indicates whether the article description is expanded.
 * @param {function} props.toggleExpand - Function to toggle the expanded state of the article.
 *
 * @returns {JSX.Element} The rendered ArticleCard component.
 */
const ArticleCard: React.FC<ArticleCardProps> = ({
  article,
  index,
  isExpanded,
  toggleExpand,
}) => {
  const category = determineCategory(article);
  const categoryColors = {
    Databases: "blue",
    JavaScript: "yellow",
    "Web Development": "green",
  };

  const color = categoryColors[category] || "mauve";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="h-full"
    >
      <motion.div
        className={cn(
          "group flex flex-col h-full rounded-xl overflow-hidden transition-all duration-300 relative",
          "border border-ctp-surface0 hover:border-ctp-pink/50",
          "bg-gradient-to-br from-ctp-mantle to-ctp-base",
          "shadow-md hover:shadow-xl"
        )}
        whileHover={{ y: -4 }}
      >
        <div className="p-5 pb-3 flex-grow">
          <div className="flex justify-between items-start mb-4">
            <div
              className={cn(
                "p-2.5 rounded-lg flex-shrink-0",
                `bg-ctp-${color}/10 text-ctp-${color}`
              )}
            >
              <Book className="w-4 h-4" />
            </div>

            <span
              className={cn(
                "px-2.5 py-1 rounded-full text-xs font-medium",
                `bg-ctp-${color}/20 text-ctp-${color} border border-ctp-${color}/30`
              )}
            >
              {category}
            </span>
          </div>

          <h3
            className={cn(
              "text-lg font-semibold group-hover:text-ctp-pink transition-colors duration-300 mb-3",
              "line-clamp-2"
            )}
          >
            {article.title}
          </h3>

          <div className="relative mb-4">
            <p
              className={cn(
                "text-ctp-subtext0 text-sm transition-all duration-300",
                isExpanded ? "" : "line-clamp-3"
              )}
            >
              {article.description}
            </p>

            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                toggleExpand();
              }}
              className={cn(
                "text-xs text-ctp-pink flex items-center mt-2",
                "hover:underline focus:outline-none"
              )}
            >
              {isExpanded ? "Show less" : "Read more"}
              <ChevronRight
                className={cn(
                  "w-3 h-3 ml-1 transition-transform",
                  isExpanded ? "rotate-90" : ""
                )}
              />
            </button>
          </div>
        </div>

        <div className="mt-auto px-5 py-4 border-t border-ctp-surface0">
          <Button
            onClick={() => window.open(article.link, "_blank")}
            className="w-full bg-ctp-surface0 hover:bg-ctp-surface1 text-ctp-text group"
            size="sm"
          >
            <span className="group-hover:text-ctp-pink transition-colors">
              Read Article
            </span>
            <ExternalLink className="w-3.5 h-3.5 ml-1.5 text-ctp-subtext0 group-hover:text-ctp-pink transition-colors" />
          </Button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ArticleCard;
