import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Formats a UTC ISO date string as a human-readable relative time string.
 *
 * @param isoDate - A UTC ISO 8601 date string (e.g. `"2024-01-15T10:30:00Z"`),
 *                  or `null`/`undefined` if the date is unavailable.
 * @returns A relative time string such as `"just now"`, `"5m ago"`, `"3h ago"`,
 *          `"2d ago"`, `"4mo ago"`, `"1y ago"`, or `"unknown"` if no date was provided.
 *
 * @example
 * relativeTime(new Date(Date.now() - 90_000).toISOString()) // "1m ago"
 * relativeTime(null) // "unknown"
 */
export function relativeTime(isoDate: string | null | undefined): string {
  if (!isoDate) {
    return "unknown";
  }

  const diff = Date.now() - new Date(isoDate).getTime();
  const seconds = Math.floor(diff / 1000);
  if (seconds < 60) {
    return "just now";
  }

  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) {
    return `${minutes}m ago`;
  }

  const hours = Math.floor(minutes / 60);
  if (hours < 24) {
    return `${hours}h ago`;
  }

  const days = Math.floor(hours / 24);
  if (days < 30) {
    return `${days}d ago`;
  }

  const months = Math.floor(days / 30);
  if (months < 12) {
    return `${months}mo ago`;
  }

  return `${Math.floor(months / 12)}y ago`;
}
