import React from "react";
import { cn } from "@/lib/utils";
import styles from "./FatalErrorAnimations.module.css";

interface FatalErrorProps {
  makeSkullLarge: boolean;
  onComplete: () => void;
}

/**
 * FatalError Component
 *
 * This component displays a fatal error message to the user, indicating that the system has encountered a critical error and cannot recover.
 * It includes a large skull icon, a title, a description of the error, an error code, a stack trace, and an emergency recovery button.
 *
 * @param {boolean} makeSkullLarge - Determines if the skull icon should be displayed in a larger size.
 * @param {Function} onComplete - A callback function to execute when the emergency recovery button is clicked.
 */
const FatalError: React.FC<FatalErrorProps> = ({
  makeSkullLarge,
  onComplete,
}) => {
  return (
    <div
      className={cn(
        "fixed inset-0 bg-red-900 bg-opacity-95 z-50 flex justify-center items-center",
        styles.container
      )}
    >
      <div
        className={cn(
          "w-96 bg-gray-800 border-2 border-red-600 rounded-lg p-8 text-center text-white shadow-2xl",
          styles.content
        )}
      >
        <div
          className={cn(
            "text-5xl mb-5 inline-block",
            styles.icon,
            makeSkullLarge && styles.skullLarge
          )}
        >
          💀
        </div>
        <h2
          className={cn("text-2xl font-bold mb-4 text-red-600", styles.title)}
        >
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
          className={cn(
            "bg-red-600 text-white border-none py-2.5 px-5 rounded font-bold text-base cursor-pointer",
            styles.button
          )}
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
