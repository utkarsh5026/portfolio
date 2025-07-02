import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface MobileFilterProps {
  categories: string[];
  selectedCategory: string | null;
  setSelectedCategory: (category: string | null) => void;
}

/**
 * MobileFilter component for displaying category filters on mobile devices.
 *
 * This component renders a set of buttons for each category provided in the
 * `categories` prop. It allows users to select a category or view all articles
 * by clicking the "All" button. The selected category is highlighted, and
 * clicking a category button will toggle the selection.
 *
 * @param {Object} props - The component props.
 * @param {string[]} props.categories - An array of category names to display.
 * @param {string | null} props.selectedCategory - The currently selected category, or null if no category is selected.
 * @param {function} props.setSelectedCategory - A function to update the selected category.
 *
 * @returns {JSX.Element} The rendered MobileFilter component.
 */
const MobileFilter: React.FC<MobileFilterProps> = ({
  categories,
  selectedCategory,
  setSelectedCategory,
}) => {
  return (
    <motion.div
      className="flex md:hidden gap-2 items-center overflow-x-auto pb-4 px-4 mb-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <Button
        variant="outline"
        size="sm"
        className={cn(
          "border-ctp-surface0 hover:border-ctp-pink whitespace-nowrap",
          selectedCategory === null
            ? "bg-ctp-pink/10 text-ctp-pink border-ctp-pink"
            : "bg-transparent"
        )}
        onClick={() => setSelectedCategory(null)}
      >
        All
      </Button>
      {categories.map((category) => (
        <Button
          key={category}
          variant="outline"
          size="sm"
          className={cn(
            "border-ctp-surface0 hover:border-ctp-pink whitespace-nowrap",
            selectedCategory === category
              ? "bg-ctp-pink/10 text-ctp-pink border-ctp-pink"
              : "bg-transparent"
          )}
          onClick={() =>
            setSelectedCategory(selectedCategory === category ? null : category)
          }
        >
          {category}
        </Button>
      ))}
    </motion.div>
  );
};

export default MobileFilter;
