import React, { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { cn } from "@/lib/utils";
import { X } from "lucide-react";

type ModalSize = "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl" | "full";

export interface ModalProps {
  /**
   * Controls whether the modal is displayed
   */
  isOpen: boolean;

  /**
   * Function to call when the modal should close
   */
  onClose: () => void;

  /**
   * The content to display in the modal
   */
  children: React.ReactNode;

  /**
   * Optional title for the modal
   */
  title?: React.ReactNode;

  /**
   * Whether to show the close button in the header (default: true)
   */
  showCloseButton?: boolean;

  /**
   * Whether to close the modal when clicking outside (default: true)
   */
  closeOnOutsideClick?: boolean;

  /**
   * Whether to close the modal when pressing Escape key (default: true)
   */
  closeOnEsc?: boolean;

  /**
   * Additional CSS class names for the modal container
   */
  className?: string;

  /**
   * Additional CSS class names for the modal content
   */
  contentClassName?: string;

  /**
   * ID for the modal for accessibility purposes
   */
  id?: string;

  /**
   * Container element to render the modal into (defaults to document.body)
   */
  container?: HTMLElement;

  /**
   * Whether the modal content should be centered (default: true)
   */
  centered?: boolean;

  /**
   * Optional custom animation class
   */
  animation?: "fade" | "scale" | "slide-up" | "slide-down" | "none";

  /**
   * Optional maximum width for the modal (e.g. 'sm', 'md', 'lg', 'xl', '2xl', 'full')
   */
  size?: ModalSize;

  /**
   * Whether to show the backdrop (default: true)
   */
  hasBackdrop?: boolean;

  /**
   * Optional custom component for the close button
   */
  closeButton?: React.ReactNode;

  /**
   * Optional ARIA description for accessibility
   */
  ariaDescription?: string;
}

const sizeClasses: Record<ModalSize, string> = {
  sm: "max-w-sm",
  md: "max-w-md",
  lg: "max-w-lg",
  xl: "max-w-xl",
  "2xl": "max-w-2xl",
  "3xl": "max-w-3xl",
  "4xl": "max-w-4xl",
  full: "max-w-full",
};

const sizeWidths: Record<ModalSize, string> = {
  sm: "384px",
  md: "448px",
  lg: "512px",
  xl: "576px",
  "2xl": "672px",
  "3xl": "768px",
  "4xl": "896px",
  full: "100%",
};

const animationClasses = {
  fade: "animate-fade",
  scale: "animate-scale",
  "slide-up": "animate-slide-up",
  "slide-down": "animate-slide-down",
  none: "",
};

/**
 * Modal component that renders its children in a portal,
 * with a backdrop that can be clicked to close the modal.
 */
export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  children,
  title,
  showCloseButton = true,
  closeOnOutsideClick = true,
  closeOnEsc = true,
  className,
  contentClassName,
  id,
  container,
  centered = true,
  animation = "scale",
  size = "md",
  hasBackdrop = true,
  closeButton,
  ariaDescription,
}) => {
  const [isAnimating, setIsAnimating] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

  const handleEscape = useCallback(() => {
    if (!closeOnEsc || !isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [closeOnEsc, isOpen, onClose]);

  const preventBodyScroll = useCallback(() => {
    if (!isOpen) return;

    const scrollY = window.scrollY;
    const scrollbarWidth =
      window.innerWidth - document.documentElement.clientWidth;

    document.body.style.position = "fixed";
    document.body.style.top = `-${scrollY}px`;
    document.body.style.width = "100%";
    document.body.style.paddingRight = `${scrollbarWidth}px`;

    return () => {
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.width = "";
      document.body.style.paddingRight = "";
      window.scrollTo(0, scrollY);
    };
  }, [isOpen]);

  const handleMount = useCallback(() => {
    if (!isMounted) {
      setIsMounted(true);
      requestAnimationFrame(() => setIsAnimating(true));
    }
  }, [isMounted]);

  const handleUnmount = useCallback(() => {
    if (isMounted) {
      setIsAnimating(false);
      const timer = setTimeout(() => setIsMounted(false), 300);
      return () => clearTimeout(timer);
    }
  }, [isMounted]);

  useEffect(() => {
    const cleanup = isOpen ? handleMount() : handleUnmount();
    return () => cleanup?.();
  }, [isOpen, handleMount, handleUnmount]);

  useEffect(() => {
    const clearEscape = handleEscape();
    return () => clearEscape?.();
  }, [handleEscape]);

  useEffect(() => {
    const preventScroll = preventBodyScroll();
    return () => preventScroll?.();
  }, [preventBodyScroll]);

  const handleOutsideClick = (e: React.MouseEvent) => {
    if (!closeOnOutsideClick) return;
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      onClose();
    }
  };

  if (!isMounted) return null;

  const modalIDForARIA =
    id ?? `modal-${Math.random().toString(36).slice(2, 9)}`;

  const sizeWidth = sizeWidths[size] || "448px";
  const sizeClass = sizeClasses[size] || "max-w-md";

  const modalContent = (
    <div
      className={cn(
        "fixed inset-0 z-[500] flex overflow-hidden",
        centered
          ? "items-center justify-center"
          : "items-start justify-center pt-16",
        className
      )}
    >
      {/* Modal backdrop */}
      {hasBackdrop && (
        <div
          className={cn(
            "absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-1000",
            isAnimating ? "opacity-100" : "opacity-0"
          )}
          onClick={handleOutsideClick}
          aria-hidden="true"
        />
      )}

      {/* Modal content */}
      <div
        ref={modalRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? `${modalIDForARIA}-title` : undefined}
        aria-describedby={
          ariaDescription ? `${modalIDForARIA}-description` : undefined
        }
        id={modalIDForARIA}
        className={cn(
          "relative bg-ctp-mantle border border-ctp-surface0 rounded-lg shadow-lg",
          "max-h-[90vh] flex flex-col",
          sizeClass,
          "m-4",
          animationClasses[animation],
          isAnimating
            ? "opacity-100 transition-all duration-600"
            : "opacity-0 transition-all duration-300",
          contentClassName
        )}
        style={{
          width: sizeWidth,
          transform: isAnimating ? "scale(1)" : "scale(0.95)",
          transformOrigin: "center",
        }}
      >
        {(title || showCloseButton) && (
          <div className="px-6 py-4 border-b border-ctp-surface0 flex items-center justify-between flex-shrink-0">
            {title && (
              <h2
                id={`${modalIDForARIA}-title`}
                className="text-lg font-medium text-ctp-text"
              >
                {title}
              </h2>
            )}

            {showCloseButton && (
              <button
                type="button"
                onClick={onClose}
                className="rounded-md p-1 text-ctp-overlay0 hover:text-ctp-text hover:bg-ctp-surface0 transition-colors"
                aria-label="Close"
              >
                {closeButton || <X className="w-5 h-5" />}
              </button>
            )}
          </div>
        )}

        <div className="p-6 overflow-y-auto">
          {ariaDescription && (
            <div id={`${modalIDForARIA}-description`} className="sr-only">
              {ariaDescription}
            </div>
          )}
          {children}
        </div>
      </div>
    </div>
  );

  return createPortal(modalContent, container || document.body);
};

export default Modal;
