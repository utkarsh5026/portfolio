import React from "react";

interface SkillItemProps {
  item: string;
}

const SkillItem = React.memo(function SkillItem({ item }: SkillItemProps) {
  return (
    <li className="text-sm sm:text-base text-muted-foreground/80 pl-4 sm:pl-6 relative before:absolute before:left-0 before:top-[0.4em] before:h-1.5 before:w-1.5 sm:before:h-2 sm:before:w-2 before:rounded-full before:bg-gradient-to-r before:from-purple-400 before:to-blue-400 hover:text-primary transition-colors duration-200">
      {item}
    </li>
  );
});

export default SkillItem;
