import { motion } from "framer-motion";

interface GoldenButtonProps {
  onClick?: () => void;
  children: React.ReactNode;
  className?: string;
}

const GoldenButton = ({
  onClick,
  children,
  className = "",
}: GoldenButtonProps) => {
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={`mt-2 md:mt-4 px-6 py-2.5 md:px-8 md:py-3 bg-gradient-to-r from-yellow-400 via-amber-500 to-yellow-600 rounded-full flex items-center gap-2 md:gap-3 font-bold text-base md:text-lg shadow-[0_0_20px_rgba(232,165,25,0.4),0_8px_24px_rgba(0,0,0,0.2)] hover:shadow-[0_0_25px_rgba(232,165,25,0.6),0_12px_28px_rgba(0,0,0,0.3)] transition-all duration-300 cursor-pointer text-primary font-playfair ${className}`}
    >
      {children}
    </motion.button>
  );
};

export default GoldenButton;
