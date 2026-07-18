import { motion } from 'framer-motion';
import ProductDemo from '../components/demo/ProductDemo';
import Button from '../components/Button';
import { ArrowRight } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-6 md:px-12 pt-24 pb-16 md:pb-24 overflow-hidden">
      {/* Subtle background texture */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute inset-0 opacity-[0.015]"
          style={{
            backgroundImage: 'radial-gradient(circle, #1A1A1A 0.5px, transparent 0.5px)',
            backgroundSize: '24px 24px',
          }}
        />
        {/* Top right accent glow */}
        <div className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full bg-coral/[0.03] blur-3xl" />
        {/* Bottom left accent glow */}
        <div className="absolute -bottom-20 -left-20 w-[400px] h-[400px] rounded-full bg-coral/[0.02] blur-3xl" />
      </div>

      <div className="relative z-10 w-full max-w-[1200px] mx-auto flex flex-col items-center">
        {/* Hero Text */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="text-center max-w-3xl"
        >
          <h1 className="font-serif text-display-xl md:text-[4.5rem] font-semibold text-ink leading-[1.08] tracking-[-0.025em] text-balance">
            Software should be
            <br />
            <span className="gradient-text">created</span>
            {', '}
            not coded<span className="text-coral">.</span>
          </h1>

          <p className="mt-8 text-lg md:text-xl text-ink-secondary leading-relaxed max-w-xl mx-auto text-balance">
            一个 AI 驱动的软件创造空间，让任何人通过自然语言和模块组合创建工具和应用。
          </p>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-10 flex items-center gap-3 justify-center"
          >
            <Button size="lg" onClick={() => document.getElementById('demo')?.scrollIntoView({ behavior: 'smooth' })}>
              Start Building
              <span className="text-white/60 text-sm font-normal ml-1">开始创造</span>
              <ArrowRight className="w-4 h-4 ml-1" />
            </Button>
          </motion.div>
        </motion.div>

        {/* Product Demo */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5, ease: 'easeOut' }}
          className="w-full mt-16 md:mt-20 scroll-mt-24"
          id="demo"
        >
          <ProductDemo />
        </motion.div>
      </div>
    </section>
  );
}
