import React from "react";

import { type AppColor, ctpColorClass } from "@/lib/ctp-colors";
import { cn } from "@/lib/utils";

interface GradientTextProps {
  from: AppColor;
  to: AppColor;
  via?: AppColor;
  children: React.ReactNode;
  className?: string;
}

const GradientText: React.FC<GradientTextProps> = ({
  from,
  to,
  via,
  children,
  className,
}) => {
  const fromClass = ctpColorClass("from", from);
  const toClass = ctpColorClass("to", to);
  const gradientClass = via
    ? `bg-gradient-to-r ${fromClass} ${ctpColorClass("to", via)} ${toClass}`
    : `bg-gradient-to-r ${fromClass} ${toClass}`;

  return (
    <span
      className={cn(gradientClass, "bg-clip-text text-transparent", className)}
    >
      {children}
    </span>
  );
};

export default GradientText;
