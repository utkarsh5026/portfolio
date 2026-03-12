import { useCallback, useState } from "react";

interface ImageLoadState {
  /** True once the image's `onload` fires */
  loaded: boolean;
  /** True if the image's `onerror` fires */
  error: boolean;
  /** Spread these onto your `<img>` tag */
  imgProps: {
    onLoad: () => void;
    onError: () => void;
  };
}

/**
 * Tracks image load / error state and provides callback props to spread onto `<img>`.
 *
 * @example
 * const { loaded, error, imgProps } = useImageLoad();
 * <img src={url} {...imgProps} className={loaded ? "opacity-100" : "opacity-0"} />
 */
export function useImageLoad(): ImageLoadState {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  const onLoad = useCallback(() => setLoaded(true), []);
  const onError = useCallback(() => setError(true), []);

  return { loaded, error, imgProps: { onLoad, onError } };
}
