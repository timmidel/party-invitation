import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, XCircle, X } from "lucide-react";
import { useCallback, useEffect } from "react";

interface ToastProps {
  message: string;
  type: "success" | "error";
  isVisible: boolean;
  onClose: () => void;
}

export const Toast = ({ message, type, isVisible, onClose }: ToastProps) => {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        onClose();
      }, 5000); // Auto-close after 5 seconds

      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: -50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -50, scale: 0.9 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="fixed top-6 left-1/2 -translate-x-1/2 z-[9999] w-[90%] max-w-md no-confetti"
        >
          <div
            className={`
              relative rounded-2xl p-4 pr-12 backdrop-blur-lg border-2 font-playfair
              shadow-[0_8px_32px_rgba(0,0,0,0.3)]
              ${
                type === "success"
                  ? "bg-gradient-to-r from-yellow-400/20 via-amber-500/20 to-yellow-600/20 border-amber-500/50 shadow-[0_0_24px_rgba(232,165,25,0.4)]"
                  : "bg-gradient-to-r from-red-500/20 via-red-600/20 to-red-700/20 border-red-500/50 shadow-[0_0_24px_rgba(239,68,68,0.4)]"
              }
            `}
          >
            <div className="flex items-center gap-3">
              {type === "success" ? (
                <CheckCircle className="w-6 h-6 text-secondary flex-shrink-0" />
              ) : (
                <XCircle className="w-6 h-6 text-red-300 flex-shrink-0" />
              )}
              <p
                className={`font-semibold text-base ${
                  type === "success" ? "text-amber-100" : "text-red-100"
                }`}
              >
                {message}
              </p>
            </div>

            {/* Close button */}
            <button
              onClick={onClose}
              className={`
                absolute top-3 right-3 p-1 rounded-full transition-all duration-200 cursor-pointer
                ${
                  type === "success"
                    ? "hover:bg-amber-500/30 text-amber-200"
                    : "hover:bg-red-500/30 text-red-200"
                }
              `}
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// Hook for using toast
import { useState } from "react";

export const useToast = () => {
  const [toast, setToast] = useState({
    isVisible: false,
    message: "",
    type: "success" as "success" | "error",
  });

  const showToast = (message: string, type: "success" | "error") => {
    setToast({ isVisible: true, message, type });
  };

  const hideToast = useCallback(() => {
    setToast((prev) => ({ ...prev, isVisible: false }));
  }, []);

  return { toast, showToast, hideToast };
};
