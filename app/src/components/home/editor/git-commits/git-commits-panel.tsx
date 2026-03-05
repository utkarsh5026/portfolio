import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { VscSourceControl } from "react-icons/vsc";
import { FiX, FiGitCommit, FiClock, FiRefreshCw } from "react-icons/fi";
import { useGitCommits, relativeTime } from "../use-git-commits";
import type { GitCommit } from "../use-git-commits";

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

interface CommitRowProps {
  commit: GitCommit;
  index: number;
}

// Created once outside the render to avoid re-creating the component on each render
const MotionAnchor = motion.create("a");

const CommitRow: React.FC<CommitRowProps> = ({ commit, index }) => {
  const [imgError, setImgError] = useState(false);
  const relTime = relativeTime(commit.date);

  const commitUrl = `https://github.com/utkarsh5026/portfolio/commit/${commit.hash}`;

  return (
    <MotionAnchor
      href={commitUrl}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2, delay: index * 0.03 }}
      className="group flex items-start gap-3 px-4 py-3 border-b border-ctp-surface0/40 hover:bg-ctp-surface0/30 transition-all duration-200 cursor-pointer"
    >
      {/* Avatar */}
      <div className="mt-0.5 flex-shrink-0 relative">
        {!imgError ? (
          <img
            src={commit.avatarUrl}
            alt={commit.author}
            width={24}
            height={24}
            onError={() => setImgError(true)}
            className="w-6 h-6 rounded-full ring-1 ring-ctp-surface1 object-cover group-hover:ring-ctp-lavender transition-all duration-200"
          />
        ) : (
          <div className="w-6 h-6 rounded-full bg-ctp-surface0 ring-1 ring-ctp-surface1 group-hover:ring-ctp-lavender flex items-center justify-center text-[10px] text-ctp-subtext0 font-medium uppercase select-none transition-all duration-200">
            {commit.author.charAt(0)}
          </div>
        )}
        {/* tiny git dot */}
        <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-ctp-mantle group-hover:bg-ctp-base flex items-center justify-center transition-colors">
          <FiGitCommit className="w-1.5 h-1.5 text-ctp-teal" />
        </span>
      </div>

      {/* Text */}
      <div className="flex-1 min-w-0">
        {/* commit message */}
        <p className="text-xs text-ctp-text font-medium leading-snug line-clamp-2 group-hover:text-ctp-lavender transition-colors duration-200">
          {commit.message}
        </p>
        {/* author + hash */}
        <div className="mt-1.5 flex items-center gap-2">
          <span className="text-[10px] text-ctp-subtext0 group-hover:text-ctp-subtext1 transition-colors truncate max-w-[110px]">
            {commit.author}
          </span>
          <span className="font-source text-[10px] text-ctp-peach bg-ctp-surface0/50 group-hover:bg-ctp-surface0/80 px-1.5 py-0.5 rounded transition-colors flex-shrink-0">
            {commit.shortHash}
          </span>
        </div>
        {/* diff stats */}
        {(commit.insertions > 0 ||
          commit.deletions > 0 ||
          commit.filesChanged > 0) && (
          <div className="mt-1 flex items-center gap-2.5">
            {commit.insertions > 0 && (
              <span className="text-[10px] text-ctp-green font-source">
                +{commit.insertions}
              </span>
            )}
            {commit.deletions > 0 && (
              <span className="text-[10px] text-ctp-red font-source">
                -{commit.deletions}
              </span>
            )}
            {commit.filesChanged > 0 && (
              <span className="text-[10px] text-ctp-overlay1">
                {commit.filesChanged} file{commit.filesChanged !== 1 ? "s" : ""}
              </span>
            )}
          </div>
        )}
      </div>

      {/* Relative time */}
      <div className="flex-shrink-0 flex items-center gap-1 mt-0.5">
        <FiClock className="w-2.5 h-2.5 text-ctp-overlay0 group-hover:text-ctp-overlay1 transition-colors" />
        <span className="text-[10px] text-ctp-overlay0 group-hover:text-ctp-overlay1 whitespace-nowrap transition-colors">
          {relTime}
        </span>
      </div>
    </MotionAnchor>
  );
};

interface GitCommitsPanelProps {
  open: boolean;
  onClose: () => void;
}

const GitCommitsPanel: React.FC<GitCommitsPanelProps> = ({ open, onClose }) => {
  const { commits, loading, generatedAt } = useGitCommits();

  const genTime = generatedAt ? relativeTime(generatedAt) : null;

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop (click-away to close) */}
          <motion.div
            key="scm-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="fixed inset-0 z-40"
            onClick={onClose}
          />

          {/* Panel */}
          <motion.div
            key="scm-panel"
            initial={{ x: -320, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -320, opacity: 0 }}
            transition={{ type: "spring", stiffness: 340, damping: 32 }}
            className="fixed top-0 left-14 h-full w-72 z-50 flex flex-col bg-ctp-mantle border-r border-ctp-surface0 shadow-2xl font-source"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-ctp-surface0 bg-ctp-base/80 flex-shrink-0">
              <div className="flex items-center gap-2">
                <VscSourceControl className="w-4 h-4 text-ctp-teal" />
                <span className="text-xs font-semibold text-ctp-text uppercase tracking-wider">
                  Source Control
                </span>
              </div>
              <button
                onClick={onClose}
                className="text-ctp-overlay1 hover:text-ctp-text transition-colors duration-150 rounded p-0.5 hover:bg-ctp-surface0"
                aria-label="Close source control panel"
              >
                <FiX className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Sub-header: commit count + generated time */}
            <div className="flex items-center justify-between px-4 py-2 border-b border-ctp-surface0/50 bg-ctp-mantle flex-shrink-0">
              <span className="text-[10px] text-ctp-subtext0 uppercase tracking-widest font-medium">
                {loading ? "Loading…" : `${commits.length} Recent Commits`}
              </span>
              {genTime && !loading && (
                <div className="flex items-center gap-1 text-[10px] text-ctp-overlay0">
                  <FiRefreshCw className="w-2.5 h-2.5" />
                  <span>{genTime}</span>
                </div>
              )}
            </div>

            {/* Commit list */}
            <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-ctp-surface0 scrollbar-track-transparent">
              {loading ? (
                Array.from({ length: 8 }).map((_, i) => (
                  <CommitSkeleton key={i} />
                ))
              ) : commits.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full gap-3 text-ctp-overlay0">
                  <VscSourceControl className="w-8 h-8" />
                  <p className="text-xs">No commits found</p>
                </div>
              ) : (
                commits.map((commit, i) => (
                  <CommitRow key={commit.hash} commit={commit} index={i} />
                ))
              )}
            </div>

            {/* Footer */}
            <div className="flex-shrink-0 px-4 py-2 border-t border-ctp-surface0 bg-ctp-base/60">
              <p className="text-[9px] text-ctp-overlay0 text-center tracking-wider uppercase">
                utkarsh5026/portfolio
              </p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default GitCommitsPanel;
