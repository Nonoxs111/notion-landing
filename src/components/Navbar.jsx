import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Button from './Button';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-warm-white/80 backdrop-blur-xl border-b border-border-light shadow-sm'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-[1200px] mx-auto px-6 md:px-12 h-16 flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="flex items-center gap-2.5 group">
          <div className="w-8 h-8 rounded-lg bg-ink flex items-center justify-center transition-colors group-hover:bg-coral">
            <span className="text-white font-semibold text-sm tracking-tight">N</span>
          </div>
          <span className="font-serif text-xl font-semibold tracking-tight text-ink">
            Notion
          </span>
        </a>

        {/* CTA */}
        <Button size="sm" onClick={() => document.getElementById('demo')?.scrollIntoView()}>
          Start Building
          <span className="text-white/60 text-xs font-normal ml-1 hidden sm:inline">开始创造</span>
        </Button>
      </div>
    </motion.nav>
  );
}
