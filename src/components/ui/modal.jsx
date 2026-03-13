import { X } from "lucide-react";
import { useRef, useEffect } from "react";

export const Modal = ({
  isOpen,
  onClose,
  children,
  className = "",
  showCloseButton = true,
  isFullscreen = false,
  size = "md", // sm | md | lg
  scrollable = false,
}) => {
  const modalRef = useRef(null);

  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === "Escape") onClose();
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen, onClose]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  // Modal sizes similar to Bootstrap
  const sizeClasses = {
    sm: "max-w-md",
    md: "max-w-2xl",
    lg: "max-w-4xl",
  };

  const contentClasses = isFullscreen
    ? "w-full h-full"
    : `relative w-full ${sizeClasses[size]} rounded-3xl bg-white dark:bg-gray-900`;

  return (
    <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4">
      {/* backdrop */}
      {!isFullscreen && (
        <div
          className="fixed inset-0 bg-gray-400/50 backdrop-blur-[32px]"
          onClick={onClose}
        />
      )}

      {/* modal */}
      <div
        ref={modalRef}
        className={`${contentClasses} ${className}`}
        onClick={(e) => e.stopPropagation()}
      >
        {showCloseButton && (
          <button
            onClick={onClose}
            className="absolute right-3 top-3 z-[99999] flex h-9 w-9 items-center justify-center rounded-full bg-gray-100 text-gray-400 hover:bg-gray-200 hover:text-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700 dark:hover:text-white"
          >
            <X />
          </button>
        )}

        {/* scrollable body */}
        <div
          className={
            scrollable
              ? "max-h-[80vh] overflow-y-auto overflow-x-hidden"
              : "overflow-visible"
          }
        >
          {children}
        </div>
      </div>
    </div>
  );
};
