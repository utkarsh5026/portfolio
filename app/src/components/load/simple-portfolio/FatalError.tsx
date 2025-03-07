import React from "react";
import { cn } from "@/lib/utils";

interface FatalErrorProps {
  makeSkullLarge: boolean;
  onComplete: () => void;
}

const FatalError: React.FC<FatalErrorProps> = ({
  makeSkullLarge,
  onComplete,
}) => {
  return (
    <div className="fixed inset-0 bg-red-900 bg-opacity-95 z-50 flex justify-center items-center animate-fadeIn">
      <div className="w-96 bg-gray-800 border-2 border-red-600 rounded-lg p-8 text-center text-white shadow-2xl">
        <div
          className={cn(
            "text-5xl mb-5 inline-block fatal-error-icon",
            makeSkullLarge && "skull-large-pulse"
          )}
        >
          💀
        </div>
        <h2 className="text-2xl font-bold mb-4 text-red-600 fatal-error-title">
          FATAL ERROR
        </h2>
        <p className="text-gray-300 mb-5">
          System has encountered a critical error and cannot recover
        </p>
        <div className="inline-block bg-red-900 bg-opacity-20 px-2.5 py-1 rounded text-sm font-mono text-red-400 mb-5">
          ERR_PORTFOLIO_CRASH
        </div>

        <div className="text-left font-mono text-xs text-gray-500 bg-black bg-opacity-50 p-2.5 rounded mb-5 overflow-auto max-h-24">
          <div className="mb-1">at renderPortfolio (portfolio.js:42)</div>
          <div className="mb-1">at loadStylesheets (styles.js:17)</div>
          <div className="mb-1">at Object.initializeApp (index.js:23)</div>
          <div className="mb-1">
            at performReactRefresh (react-refresh.js:63)
          </div>
        </div>

        <button
          className="bg-red-600 text-white border-none py-2.5 px-5 rounded font-bold text-base cursor-pointer"
          onClick={() => {
            if (onComplete) onComplete();
          }}
        >
          EMERGENCY RECOVERY
        </button>
      </div>
    </div>
  );
};

export default FatalError;
