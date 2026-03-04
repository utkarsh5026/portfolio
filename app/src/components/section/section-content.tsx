import { sectionColorSchemes } from "./sec-utils";
import { LucideIcon } from "lucide-react";
import { forwardRef, useCallback } from "react";
import { cn } from "@/lib/utils";
import SectionHeader from "./section-header";
import styles from "./section-content.module.css";

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

const LINE_NUMBERS = Array.from({ length: 500 }, (_, i) => i + 1);

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
    ref,
  ) => {
    const setRefs = useCallback(
      (node: HTMLDivElement | null) => {
        if (typeof ref === "function") ref(node);
        else if (ref)
          (ref as React.MutableRefObject<HTMLDivElement | null>).current = node;
      },
      [ref],
    );

    return (
      <div className="relative w-full flex font-source">
        {/* Line Numbers Column — absolutely positioned so content determines height */}
        <div className="hidden sm:block relative shrink-0 w-12 border-r border-ctp-surface0/50">
          <div className="absolute inset-0 flex flex-col items-end pr-4 py-6 sm:py-8 md:py-10 lg:py-12 xl:py-14 text-ctp-surface2 text-sm select-none overflow-hidden">
            {LINE_NUMBERS.map((n) => (
              <div
                key={n}
                className="leading-relaxed sm:leading-relaxed lg:leading-loose h-[min-content]"
              >
                {n}
              </div>
            ))}
          </div>
        </div>

        {/* Content wrapper */}
        <div
          ref={setRefs}
          className={cn(
            `flex-1
            px-4 py-6
            sm:px-6 sm:py-8
            md:px-8 md:py-10
            lg:px-10 lg:py-12
            xl:px-12 xl:py-14
            bg-ctp-crust
            w-full max-w-full
            overflow-x-hidden overflow-y-auto
            overscroll-behavior-y-contain
            focus-within:outline-none focus-within:ring-2 focus-within:ring-${colorScheme.primary}/20 focus-within:ring-offset-2`,
            styles.contentWrapper,
            isInView && styles.visible,
          )}
        >
          {/* Section Header */}
          <SectionHeader
            title={title}
            description={description}
            icon={HeaderIcon}
            colorScheme={colorScheme}
            showHeader={showHeader}
          />

          <div
            className={cn(
              `space-y-6
              sm:space-y-8
              lg:space-y-10
              text-sm
              sm:text-base
              lg:text-lg
              leading-relaxed
              sm:leading-relaxed
              lg:leading-loose`,
              styles.innerContent,
              isInView && styles.visible,
              showHeader ? styles.withHeader : styles.withoutHeader,
            )}
          >
            {/* Mock React Code Start */}
            <div className="font-source text-sm sm:text-base mb-4 sm:mb-6">
              <span className="text-ctp-mauve">export default function</span>{" "}
              <span className={`text-${colorScheme.primary}`}>
                {title ? title.replace(/\s+/g, "") : "Section"}
              </span>
              <span className="text-ctp-text">()</span>{" "}
              <span className="text-ctp-text">{"{"}</span>
              <br />
              <span className="text-ctp-mauve ml-4 sm:ml-8">return</span>{" "}
              <span className="text-ctp-text">(</span>
            </div>

            {/* Actual Content Wrapper with Editor Indentation */}
            <div className=" sm:pl-8  border-ctp-surface0/50 ml-2 sm:ml-4">
              {children}
            </div>

            {/* Mock React Code End */}
            <div className="font-source text-sm sm:text-base mt-4 sm:mb-6">
              <span className="text-ctp-text ml-4 sm:ml-8">);</span>
              <br />
              <span className="text-ctp-text">{"}"}</span>
            </div>
          </div>

          {/* Mobile-friendly bottom spacing */}
          <div className="h-4 sm:h-6 lg:h-8" />
        </div>
      </div>
    );
  },
);

export default SectionContent;
