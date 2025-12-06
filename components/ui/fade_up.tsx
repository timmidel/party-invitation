import { motion } from "framer-motion";

interface FadeUpProps {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  className?: string;
}

const FadeUp = ({
  children,
  delay = 0,
  duration = 0.6,
  className = "",
}: FadeUpProps) => {
  const fadeUpVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration, delay }}
      variants={fadeUpVariants}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default FadeUp;
