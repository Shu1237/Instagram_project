import React, { useState, useEffect } from "react";
import { X } from "lucide-react";
import { cn } from "../../lib/utils";

const Modal = ({
  isOpen,
  onClose,
  children,
  className,
  size = "default",
  showCloseButton = true,
}) => {
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsAnimating(true);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const handleClose = () => {
    setIsAnimating(false);
    setTimeout(() => {
      onClose();
    }, 150);
  };

  const sizeClasses = {
    sm: "max-w-md",
    default: "max-w-lg",
    lg: "max-w-2xl",
    xl: "max-w-4xl",
    full: "max-w-none w-full h-full",
  };

  if (!isOpen) return null;

  return (
    <div
      className={cn(
        "fixed inset-0 z-50 flex items-center justify-center p-4",
        "bg-black/50 backdrop-blur-sm",
        isAnimating ? "animate-fade-in" : "opacity-0"
      )}
      onClick={handleClose}
    >
      <div
        className={cn(
          "relative bg-white dark:bg-gray-900 rounded-xl shadow-xl",
          "transform transition-all duration-300",
          sizeClasses[size],
          isAnimating ? "scale-100 opacity-100" : "scale-95 opacity-0",
          className
        )}
        onClick={(e) => e.stopPropagation()}
      >
        {showCloseButton && (
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors z-10"
          >
            <X className="w-5 h-5" />
          </button>
        )}
        {children}
      </div>
    </div>
  );
};

export default Modal;
