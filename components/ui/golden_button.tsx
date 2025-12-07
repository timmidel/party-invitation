import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";

interface GoldenButtonProps {
  onClick?: () => void;
  children: React.ReactNode;
  className?: string;
  isLoading?: boolean;
  disabled?: boolean;
}

const GoldenButton = ({
  onClick,
  children,
  className = "",
  isLoading = false,
  disabled = false,
}: GoldenButtonProps) => {
  return (
    <motion.button
      whileHover={{ scale: !isLoading && !disabled ? 1.05 : 1 }}
      whileTap={{ scale: !isLoading && !disabled ? 0.95 : 1 }}
      onClick={onClick}
      disabled={isLoading || disabled}
      className={`mt-2 md:mt-4 px-6 py-2.5 md:px-8 md:py-3 bg-gradient-to-r from-yellow-400 via-amber-500 to-yellow-600 rounded-full flex items-center gap-2 md:gap-3 font-bold text-base md:text-lg shadow-[0_0_20px_rgba(232,165,25,0.4),0_8px_24px_rgba(0,0,0,0.2)] hover:shadow-[0_0_25px_rgba(232,165,25,0.6),0_12px_28px_rgba(0,0,0,0.3)] transition-all duration-300 cursor-pointer font-playfair justify-center text-primary ${
        isLoading || disabled
          ? "opacity-50 cursor-not-allowed"
          : "hover:shadow-[0_0_25px_rgba(232,165,25,0.6),0_12px_28px_rgba(0,0,0,0.3)]"
      } ${className}`}
    >
      {isLoading ? (
        <>
          <Loader2 className="animate-spin w-5 h-5" />
          <span>Confirming...</span>
        </>
      ) : (
        children
      )}
    </motion.button>
  );
};

export default GoldenButton;
