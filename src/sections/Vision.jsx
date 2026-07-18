import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const statements = [
  {
    en: 'The ability to create software should belong to everyone.',
    cn: '创造软件的能力，应当属于每一个人。',
  },
  {
    en: 'No more barriers between ideas and implementation.',
    cn: '从想法到实现，不再有门槛。',
  },
  {
    en: 'Software is the most powerful creative medium of our time — and it should be accessible to all.',
    cn: '软件是我们这个时代最强大的创造媒介——它应该对所有人开放。',
  },
];

export default function Vision() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section className="relative py-24 md:py-32 px-6 md:px-12 bg-ink overflow-hidden">
      {/* Subtle background texture */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: 'radial-gradient(circle, #FFFFFF 0.5px, transparent 0.5px)',
            backgroundSize: '32px 32px',
          }}
        />
        <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-coral/[0.04] blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-coral/[0.03] blur-3xl" />
      </div>

      <div className="relative z-10 max-w-[1200px] mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="max-w-3xl"
        >
          {/* Label */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 text-xs font-medium text-white/40 tracking-wider uppercase mb-12">
            <span className="w-1.5 h-1.5 rounded-full bg-coral"></span>
            Our Vision
          </div>

          {/* Main statement */}
          <h2 className="font-serif text-display-md md:text-display-lg lg:text-[3.2rem] font-medium text-white leading-[1.2] tracking-[-0.01em] text-balance">
            {statements[0].en}
          </h2>
          <p className="mt-4 text-lg text-white/35 leading-relaxed">
            {statements[0].cn}
          </p>

          {/* Supporting statements */}
          <div className="mt-16 space-y-10">
            {statements.slice(1).map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.3 + i * 0.2 }}
                className="border-l-2 border-white/[0.08] pl-6"
              >
                <p className="text-lg md:text-xl text-white/60 leading-relaxed">
                  {s.en}
                </p>
                <p className="mt-1.5 text-sm text-white/25">
                  {s.cn}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Bottom quote */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="mt-16 pt-10 border-t border-white/[0.06]"
          >
            <p className="font-serif text-xl italic text-white/25">
              &ldquo;Democratize Software.&rdquo;
            </p>
            <p className="mt-2 text-sm text-white/15">
              Inspired by Notion, 2013
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
