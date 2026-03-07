import { useSwipeable } from "react-swipeable";

interface UseSwipeOptions {
  onSwipeLeft?: () => void;
  onSwipeRight?: () => void;
  delta?: number;
  disabled?: boolean;
}

export function useSwipe({
  onSwipeLeft,
  onSwipeRight,
  delta = 50,
  disabled = false,
}: UseSwipeOptions) {
  return useSwipeable({
    onSwipedLeft: disabled ? undefined : onSwipeLeft,
    onSwipedRight: disabled ? undefined : onSwipeRight,
    delta,
    trackTouch: true,
    preventScrollOnSwipe: false,
    swipeDuration: 500,
  });
}
