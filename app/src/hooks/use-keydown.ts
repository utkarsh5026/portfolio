import { useEffect } from "react";

/**
 * Registers a keydown listener on window for the given key.
 * Cleans up the listener on unmount or when key/handler change.
 */
function useKeydown(
  key: string,
  handler: (event: KeyboardEvent) => void
): void {
  useEffect(() => {
    const listener = (event: KeyboardEvent) => {
      if (event.key === key) {
        handler(event);
      }
    };
    window.addEventListener("keydown", listener);
    return () => window.removeEventListener("keydown", listener);
  }, [key, handler]);
}

export default useKeydown;
