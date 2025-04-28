import React from "react";

interface SkillItemProps {
  item: string;
  accentColor?: string;
}

/**
 * SkillItem Component
 *
 * This component renders an individual skill item with a bullet point and text.
 * It includes hover effects and subtle animations for user engagement.
 *
 * @param {SkillItemProps} props - The component props
 * @param {string} props.item - The skill text to display
 * @param {string} props.accentColor - The accent color for the bullet point (defaults to "lavender")
 *
 * @returns {React.ReactElement} The rendered skill item
 */
const SkillItem = React.memo(function SkillItem({
  item,
  accentColor = "lavender",
}: SkillItemProps) {
  return (
    <li
      className={`text-sm sm:text-base font-medium text-ctp-subtext1 pl-4 sm:pl-6 relative before:absolute before:left-0 before:top-[0.4em] before:h-1.5 before:w-1.5 sm:before:h-2 sm:before:w-2 before:rounded-full before:bg-gradient-to-r before:from-ctp-${accentColor} before:to-ctp-${
        accentColor === "blue" ? "lavender" : "blue"
      } hover:text-ctp-text hover:translate-x-0.5 transition-all duration-200`}
    >
      {item}
    </li>
  );
});

export default SkillItem;
