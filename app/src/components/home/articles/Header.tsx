import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { BookOpen } from "lucide-react";
import { cn } from "@/lib/utils";
import { articles } from "./articlesdump";
import React from "react";

interface HeaderProps {
  categories: string[];
  selectedCategory: string | null;
  setSelectedCategory: (category: string | null) => void;
}

/**
 * Header component for displaying the title and category filters for articles.
 *
 * This component renders a header section that includes:
 * - A title indicating the number of published articles.
 * - A list of category buttons that allow users to filter articles by category.
 * - An "All" button to reset the category filter.
 *
 * Props:
 * @param {string[]} categories - An array of category names to display as filter buttons.
 * @param {string | null} selectedCategory - The currently selected category, or null if no category is selected.
 * @param {function} setSelectedCategory - A function to update the selected category when a button is clicked.
 *
 * Usage:
 * <Header
 *   categories={['Web Development', 'Databases', 'JavaScript']}
 *   selectedCategory={selectedCategory}
 *   setSelectedCategory={setSelectedCategory}
 * />
 */
const Header: React.FC<HeaderProps> = ({
  categories,
  selectedCategory,
  setSelectedCategory,
}) => {
  return (
    <div className="flex justify-between items-center mb-8 px-4">
      <motion.div
        className="flex items-center gap-3"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="p-2 rounded-lg bg-gradient-to-br from-ctp-pink to-ctp-mauve text-ctp-base shadow-lg shadow-ctp-pink/20">
          <BookOpen className="w-5 h-5" />
        </div>
        <div>
          <h2 className="text-xl font-semibold bg-gradient-to-r from-ctp-pink to-ctp-mauve text-transparent bg-clip-text">
            Published Articles
          </h2>
          <p className="text-sm text-ctp-subtext0">
            {articles.length} articles on database internals, web development,
            and more
          </p>
        </div>
      </motion.div>

      <motion.div
        className="hidden md:flex gap-2 items-center"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        {categories.map((category) => (
          <Button
            key={category}
            variant="outline"
            size="sm"
            className={cn(
              "border-ctp-surface0 hover:border-ctp-pink",
              selectedCategory === category
                ? "bg-ctp-pink/10 text-ctp-pink border-ctp-pink"
                : "bg-transparent"
            )}
            onClick={() =>
              setSelectedCategory(
                selectedCategory === category ? null : category
              )
            }
          >
            {category}
          </Button>
        ))}
        <Button
          variant="outline"
          size="sm"
          className={cn(
            "border-ctp-surface0 hover:border-ctp-pink",
            selectedCategory === null
              ? "bg-ctp-pink/10 text-ctp-pink border-ctp-pink"
              : "bg-transparent"
          )}
          onClick={() => setSelectedCategory(null)}
        >
          All
        </Button>
      </motion.div>
    </div>
  );
};

export default Header;
