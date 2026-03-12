export interface CommitTypeConfig {
  color: string;
  bg: string;
  activeBg?: string;
}

export const COMMIT_TYPES: Record<string, CommitTypeConfig> = {
  feat: {
    color: "text-ctp-green",
    bg: "bg-ctp-green/10",
    activeBg: "bg-ctp-green/15 border-ctp-green/40",
  },
  fix: {
    color: "text-ctp-red",
    bg: "bg-ctp-red/10",
    activeBg: "bg-ctp-red/15 border-ctp-red/40",
  },
  refactor: {
    color: "text-ctp-mauve",
    bg: "bg-ctp-mauve/10",
    activeBg: "bg-ctp-mauve/15 border-ctp-mauve/40",
  },
  style: {
    color: "text-ctp-pink",
    bg: "bg-ctp-pink/10",
    activeBg: "bg-ctp-pink/15 border-ctp-pink/40",
  },
  chore: {
    color: "text-ctp-overlay1",
    bg: "bg-ctp-surface0/60",
    activeBg: "bg-ctp-surface1 border-ctp-overlay0/40",
  },
  docs: {
    color: "text-ctp-blue",
    bg: "bg-ctp-blue/10",
    activeBg: "bg-ctp-blue/15 border-ctp-blue/40",
  },
  build: {
    color: "text-ctp-peach",
    bg: "bg-ctp-peach/10",
    activeBg: "bg-ctp-peach/15 border-ctp-peach/40",
  },
  ci: {
    color: "text-ctp-teal",
    bg: "bg-ctp-teal/10",
    activeBg: "bg-ctp-teal/15 border-ctp-teal/40",
  },
  perf: {
    color: "text-ctp-yellow",
    bg: "bg-ctp-yellow/10",
    activeBg: "bg-ctp-yellow/15 border-ctp-yellow/40",
  },
  test: {
    color: "text-ctp-sapphire",
    bg: "bg-ctp-sapphire/10",
    activeBg: "bg-ctp-sapphire/15 border-ctp-sapphire/40",
  },
  revert: {
    color: "text-ctp-maroon",
    bg: "bg-ctp-maroon/10",
  },
  deps: {
    color: "text-ctp-lavender",
    bg: "bg-ctp-lavender/10",
  },
};

/** Returns the conventional-commit type prefix, or null if not matched. */
export function parseCommitType(message: string): string | null {
  const match = message.match(/^(\w+)(\(.+?\))?!?:\s/);
  if (match && COMMIT_TYPES[match[1]]) return match[1];
  return null;
}

/** Parses a conventional-commit message into type, scope, and body. */
export function parseCommit(message: string): {
  type: string | null;
  scope: string | null;
  body: string;
} {
  const match = message.match(/^(\w+)(\((.+?)\))?!?:\s*(.*)/);
  if (match && COMMIT_TYPES[match[1]]) {
    return {
      type: match[1],
      scope: match[3] ?? null,
      body: match[4] ?? message,
    };
  }
  return { type: null, scope: null, body: message };
}
