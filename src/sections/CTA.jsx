import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Button from '../components/Button';
import { ArrowRight, Sparkles } from 'lucide-react';
import Footer from '../components/Footer';

export default function CTA() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section className="relative">
      {/* CTA Section */}
      <div className="py-24 md:py-32 px-6 md:px-12">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="max-w-[1200px] mx-auto text-center"
        >
          {/* Subtle divider */}
          <div className="w-full max-w-[200px] mx-auto h-px bg-border-light mb-16" />

          <h2 className="font-serif text-display-md md:text-display-lg font-semibold text-ink leading-tight text-balance">
            Ready to create
            <br />
            <span className="gradient-text">your own software</span>?
          </h2>
          <p className="mt-4 text-lg text-ink-secondary max-w-md mx-auto text-balance">
            开始创造属于你自己的软件工具。
          </p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-10 flex items-center gap-3 justify-center"
          >
            <Button size="lg" onClick={() => document.getElementById('demo')?.scrollIntoView()}>
              <Sparkles className="w-4 h-4" />
              Start Building
              <span className="text-white/60 text-sm font-normal ml-1">开始创造</span>
              <ArrowRight className="w-4 h-4" />
            </Button>
          </motion.div>

          <p className="mt-6 text-xs text-ink-muted">
            No credit card required · Free to start
            <span className="mx-2">·</span>
            免费开始，无需信用卡
          </p>
        </motion.div>
      </div>

      {/* Footer */}
      <Footer />
    </section>
  );
}
