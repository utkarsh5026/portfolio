import React from "react";

import { cn } from "@/lib/utils";

interface SectionLoaderProps {
  message?: string;
  className?: string;
}

const SectionLoader: React.FC<SectionLoaderProps> = ({
  message,
  className,
}) => (
  <div className={cn("flex items-center justify-center p-8", className)}>
    <div className="flex items-center gap-3">
      <div className="w-6 h-6 border-2 border-ctp-blue border-t-transparent rounded-full animate-spin" />
      {message && <span className="text-sm text-ctp-subtext0">{message}</span>}
    </div>
  </div>
);

export default SectionLoader;
