import {
  useState,
  useEffect,
  useCallback,
  useRef,
  useMemo,
  createContext,
  useContext,
  ReactNode,
} from "react";

interface UseMobileOptions {
  phoneBreakpoint?: number;
  tabletBreakpoint?: number;
  debounceDelay?: number;
  detectTouch?: boolean;
  initialDevice?: string;
}

/**
 * ✨ useMobile ✨
 *
 * A smart little hook that figures out what kind of device your users are on! 📱💻
 *
 * This hook is your friendly device detective that works behind the scenes to:
 *
 * 🔍 Identify if someone is browsing on a phone, tablet, or desktop
 * 👆 Detect touch capabilities for better interaction design
 * 📏 Track screen dimensions as users resize their browsers
 * 🔄 Smoothly handle orientation changes on mobile devices
 * 🧠 Use multiple detection strategies for super accurate results
 * 🚀 Work seamlessly with server-side rendering
 *
 * Perfect for creating responsive experiences that feel just right on any device!
 * Let this hook do the heavy lifting while you focus on building amazing UIs. 😊
 */
const useMobile = (options: UseMobileOptions = {}) => {
  const {
    phoneBreakpoint = 768,
    tabletBreakpoint = 1024,
    debounceDelay = 150,
    detectTouch = true,
    initialDevice = "desktop",
  } = options;

  /**
   * 🏠 initialState
   *
   * Creates a cozy starting point for our device detection!
   * Handles server-side rendering with a smile. 😌
   */
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

  /**
   * 🕵️‍♀️ detectDevice
   *
   * Our clever detective function that examines all the clues to figure out
   * what device is being used! Considers screen size, touch capabilities,
   * pointer types, and even special edge cases. 🔎
   */
  const detectDevice = useCallback(() => {
    if (typeof window === "undefined") {
      return initialState;
    }

    // Get current viewport dimensions
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

    // 1. Large tablets (iPad Pro, etc.)
    if (
      width >= tabletBreakpoint &&
      touchCapable &&
      hasCoarsePointer &&
      !hasFinePointer
    ) {
      detectedDeviceType = "tablet";
      isTabletDetected = true;
    }

    // 2. Phone in landscape mode
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

    // 3. Mobile browsers in "desktop mode" often still have mobile signals
    if (
      width >= tabletBreakpoint &&
      prefersMobile &&
      !hasFinePointer &&
      hasCoarsePointer
    ) {
      detectedDeviceType = "tablet";
      isTabletDetected = true;
    }

    // Prepare the result
    const isMobileDetected = isPhoneDetected || isTabletDetected;

    return {
      isMobile: isMobileDetected,
      isPhone: isPhoneDetected,
      isTablet: isTabletDetected,
      deviceType: detectedDeviceType,
      hasTouch: touchCapable,
      width,
    };
  }, [phoneBreakpoint, tabletBreakpoint, detectTouch, initialState]);

  /**
   * 📱 Device Watcher
   *
   * Keeps an eye on your device as it changes! Watches for resizes,
   * orientation flips, and all sorts of device gymnastics. 🤸‍♀️
   * Smart enough to avoid unnecessary updates with debouncing magic! ✨
   */
  useEffect(() => {
    if (typeof window === "undefined") return;

    setDeviceInfo(detectDevice());

    /**
     * 📐 handleResize
     *
     * Our size-watching friend that notices when your screen changes
     * and updates everything accordingly! Uses clever debouncing to
     * stay efficient. 🧠
     */
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

    window.addEventListener("resize", handleResize);

    if (detectTouch) {
      window.addEventListener("orientationchange", handleResize);

      // Some mobile browsers need a slight delay to report correct dimensions
      // after orientation changes
      setTimeout(() => {
        handleResize();
      }, 300);
    }

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("orientationchange", handleResize);

      if (resizeTimerRef.current) {
        clearTimeout(resizeTimerRef.current);
      }
    };
  }, [detectDevice, debounceDelay, detectTouch]);

  return deviceInfo;
};

// Context for sharing mobile state across components
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
