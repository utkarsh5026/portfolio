import React from "react";

const CommitSkeleton: React.FC = () => (
  <div className="flex items-start gap-3 px-4 py-3 border-b border-ctp-surface0/60 animate-pulse">
    <div className="mt-0.5 w-6 h-6 rounded-full bg-ctp-surface0 flex-shrink-0" />
    <div className="flex-1 min-w-0 space-y-2">
      <div className="h-3 bg-ctp-surface0 rounded w-4/5" />
      <div className="h-2.5 bg-ctp-surface0 rounded w-2/5" />
    </div>
    <div className="h-2 bg-ctp-surface0 rounded w-10 flex-shrink-0 mt-1" />
  </div>
);

export default CommitSkeleton;
