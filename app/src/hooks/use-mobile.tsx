import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import { addListeners } from "@/lib/utils";

interface UseMobileOptions {
  phoneBreakpoint?: number;
  tabletBreakpoint?: number;
  debounceDelay?: number;
  detectTouch?: boolean;
  initialDevice?: string;
}

const useMobile = (options: UseMobileOptions = {}) => {
  const {
    phoneBreakpoint = 768,
    tabletBreakpoint = 1024,
    debounceDelay = 150,
    detectTouch = true,
    initialDevice = "desktop",
  } = options;

  const initialState = useMemo(
    () => ({
      isMobile: initialDevice !== "desktop",
      isPhone: initialDevice === "phone",
      isTablet: initialDevice === "tablet",
      deviceType: initialDevice,
      hasTouch: false,
      width: null as number | null,
    }),
    [initialDevice]
  );

  const [deviceInfo, setDeviceInfo] = useState(initialState);
  const resizeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const dimensionsRef = useRef({ width: 0, height: 0 });

  const detectDevice = useCallback(() => {
    if (typeof window === "undefined") {
      return initialState;
    }

    const width = window.innerWidth;
    const height = window.innerHeight;
    dimensionsRef.current = { width, height };

    const touchCapable = Boolean(
      "ontouchstart" in window || navigator.maxTouchPoints > 0
    );

    const hasCoarsePointer =
      window.matchMedia?.("(pointer: coarse)").matches ?? false;
    const hasFinePointer =
      window.matchMedia?.("(pointer: fine)").matches ?? false;
    const prefersMobile = window.matchMedia?.("(hover: none)").matches ?? false;

    let detectedDeviceType = "desktop";
    let isPhoneDetected = false;
    let isTabletDetected = false;

    if (width < phoneBreakpoint) {
      detectedDeviceType = "phone";
      isPhoneDetected = true;
    } else if (width < tabletBreakpoint) {
      if (detectTouch && (touchCapable || prefersMobile)) {
        if (!hasFinePointer || hasCoarsePointer || height > width) {
          detectedDeviceType = "tablet";
          isTabletDetected = true;
        }
      }
    }

    if (
      width >= tabletBreakpoint &&
      touchCapable &&
      hasCoarsePointer &&
      !hasFinePointer
    ) {
      detectedDeviceType = "tablet";
      isTabletDetected = true;
    }

    if (
      width >= phoneBreakpoint &&
      width < tabletBreakpoint &&
      height < phoneBreakpoint &&
      touchCapable &&
      hasCoarsePointer
    ) {
      detectedDeviceType = "phone";
      isPhoneDetected = true;
      isTabletDetected = false;
    }

    if (
      width >= tabletBreakpoint &&
      prefersMobile &&
      !hasFinePointer &&
      hasCoarsePointer
    ) {
      detectedDeviceType = "tablet";
      isTabletDetected = true;
    }

    return {
      isMobile: isPhoneDetected || isTabletDetected,
      isPhone: isPhoneDetected,
      isTablet: isTabletDetected,
      deviceType: detectedDeviceType,
      hasTouch: touchCapable,
      width,
    };
  }, [phoneBreakpoint, tabletBreakpoint, detectTouch, initialState]);

  useEffect(() => {
    if (typeof window === "undefined") return;

    setDeviceInfo(detectDevice());

    const handleResize = () => {
      if (
        window.innerWidth === dimensionsRef.current.width &&
        window.innerHeight === dimensionsRef.current.height
      ) {
        return;
      }

      if (resizeTimerRef.current) {
        clearTimeout(resizeTimerRef.current);
      }

      resizeTimerRef.current = setTimeout(() => {
        setDeviceInfo(detectDevice());
      }, debounceDelay);
    };

    const events: {
      resize: typeof handleResize;
      orientationchange?: typeof handleResize;
    } = { resize: handleResize };
    if (detectTouch) {
      events.orientationchange = handleResize;
      setTimeout(() => {
        handleResize();
      }, 300);
    }

    const cleanup = addListeners(window, events);

    return () => {
      cleanup();

      if (resizeTimerRef.current) {
        clearTimeout(resizeTimerRef.current);
      }
    };
  }, [detectDevice, debounceDelay, detectTouch]);

  return deviceInfo;
};

type MobileState = ReturnType<typeof useMobile>;
const MobileContext = createContext<MobileState | null>(null);

/**
 * MobileProvider Component
 *
 * Wraps components that need mobile detection with a shared context.
 * This ensures only ONE set of event listeners is created, preventing
 * duplicate resize/orientation handlers that cause performance issues.
 */
export const MobileProvider = ({ children }: { children: ReactNode }) => {
  const mobileState = useMobile();
  return (
    <MobileContext.Provider value={mobileState}>
      {children}
    </MobileContext.Provider>
  );
};

/**
 * useMobileContext Hook
 *
 * Use this instead of useMobile() when inside a MobileProvider.
 * Reads from shared context - no new event listeners created.
 */
// eslint-disable-next-line react-refresh/only-export-components
export const useMobileContext = (): MobileState => {
  const context = useContext(MobileContext);
  if (!context) {
    throw new Error("useMobileContext must be used within a MobileProvider");
  }
  return context;
};

// eslint-disable-next-line react-refresh/only-export-components
export default useMobile;
