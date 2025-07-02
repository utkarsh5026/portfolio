import { motion } from "framer-motion";
import { sectionColorSchemes } from "./sec-utils";
import { LucideIcon } from "lucide-react";
import { forwardRef } from "react";
import SectionHeader from "./section-header";

type SectionColorScheme =
  (typeof sectionColorSchemes)[keyof typeof sectionColorSchemes];

interface SectionContentProps {
  title: string;
  description: string;
  icon: LucideIcon;
  colorScheme: SectionColorScheme;
  showHeader: boolean;
  children: React.ReactNode;
  isInView: boolean;
}

const SectionContent = forwardRef<HTMLDivElement, SectionContentProps>(
  (
    {
      title,
      description,
      icon: HeaderIcon,
      colorScheme,
      showHeader,
      children,
      isInView,
    },
    ref
  ) => {
    return (
      <div className="relative w-full">
        {/* Mobile-optimized content wrapper */}
        <motion.div
          ref={ref}
          className={`
                px-4 py-6
                sm:px-6 sm:py-8
                md:px-8 md:py-10
                lg:px-10 lg:py-12
                xl:px-12 xl:py-14
                
                w-full max-w-full
                
                overflow-x-hidden overflow-y-auto
                
                overscroll-behavior-y-contain
                
                focus-within:outline-none focus-within:ring-2 focus-within:ring-${colorScheme.primary}/20 focus-within:ring-offset-2
                
                transition-all duration-300 ease-out
              `}
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          {/* Section Header */}
          <SectionHeader
            title={title}
            description={description}
            icon={HeaderIcon}
            colorScheme={colorScheme}
            showHeader={showHeader}
          />

          <motion.div
            className={`
                  space-y-6
                  sm:space-y-8
                  lg:space-y-10
                  
                  text-sm
                  sm:text-base
                  lg:text-lg
                  
                  leading-relaxed
                  sm:leading-relaxed
                  lg:leading-loose
                `}
            initial={{ opacity: 0, y: 15 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
            transition={{ duration: 0.6, delay: showHeader ? 0.6 : 0.3 }}
          >
            {children}
          </motion.div>

          {/* Mobile-friendly bottom spacing */}
          <div className="h-4 sm:h-6 lg:h-8" />
        </motion.div>
      </div>
    );
  }
);

export default SectionContent;
