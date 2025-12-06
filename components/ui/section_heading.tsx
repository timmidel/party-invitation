interface SectionHeadingProps {
  children: React.ReactNode;
  className?: string;
}

const SectionHeading = ({ children, className = "" }: SectionHeadingProps) => {
  return (
    <h2
      className={`text-5xl leading-[1.3] font-script mb-8 bg-linear-to-r from-yellow-400 via-amber-500 to-yellow-600 bg-clip-text text-transparent tracking-wide drop-shadow-[0_2px_8px_rgba(232,165,25,0.4)] ${className}`}
    >
      {children}
    </h2>
  );
};

export default SectionHeading;
