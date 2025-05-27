import { useState } from "react";

/**
 * 🧠 A handy hook that helps store and retrieve data from localStorage!
 *
 * This hook makes it super easy to persist user preferences and data
 * between browser sessions. It handles all the JSON parsing/stringifying
 * and error handling for you! ✨
 *
 * 💾 Automatically loads values from localStorage on initial render
 * 🔄 Syncs state changes to localStorage
 * 🛡️ Gracefully handles errors if localStorage is unavailable
 */
export const useLocalStorage = <T>(key: string, initialValue: T) => {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error("Error reading from localStorage:", error);
      return initialValue;
    }
  });

  const setValue = (value: T) => {
    try {
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;

      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error("Error writing to localStorage:", error);
    }
  };

  return { storedValue, setValue };
};
