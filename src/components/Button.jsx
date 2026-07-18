import { motion } from 'framer-motion';

export default function Button({ children, variant = 'primary', size = 'md', className = '', ...props }) {
  const baseStyles = 'inline-flex items-center justify-center font-medium transition-all duration-300 rounded-full cursor-pointer';

  const variants = {
    primary: 'bg-coral hover:bg-coral-dark text-white shadow-sm hover:shadow-md',
    secondary: 'bg-ink hover:bg-ink/90 text-white',
    outline: 'border border-border hover:border-ink/20 hover:bg-warm-gray text-ink',
    ghost: 'text-ink-secondary hover:text-ink hover:bg-warm-gray',
  };

  const sizes = {
    sm: 'px-5 py-2 text-sm gap-1.5',
    md: 'px-7 py-3 text-base gap-2',
    lg: 'px-9 py-4 text-lg gap-2.5',
  };

  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </motion.button>
  );
}
