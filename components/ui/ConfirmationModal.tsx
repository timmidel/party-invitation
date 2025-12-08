"use client";

import { AnimatePresence, motion } from "framer-motion";

interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  isSubmitting?: boolean;
}

export default function ConfirmationModal({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  isSubmitting,
}: ConfirmationModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="bg-[#1a0f2e] border-2 border-red-500/30 rounded-2xl p-8 w-full max-w-md text-amber-100"
          >
            <h2 className="text-2xl font-script text-red-400 mb-4">{title}</h2>
            <p className="text-amber-100/80 mb-8">{message}</p>

            <div className="flex justify-end gap-4 mt-8">
              <button
                onClick={onClose}
                disabled={isSubmitting}
                className="px-6 py-2 rounded-xl font-semibold transition-all bg-white/5 text-amber-100 hover:bg-white/10 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={onConfirm}
                disabled={isSubmitting}
                className="px-6 py-2 rounded-xl font-semibold transition-all bg-gradient-to-r from-red-500 via-red-600 to-red-700 text-white disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
              >
                {isSubmitting ? "Deleting..." : "Confirm Delete"}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
