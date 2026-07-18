import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import SectionBadge from '../components/SectionBadge';
import { Lock, Repeat, Users } from 'lucide-react';

const problems = [
  {
    icon: Repeat,
    title: 'Reinventing the wheel',
    desc: 'Developers spend 60% of their time rebuilding software that already exists in different forms.',
  },
  {
    icon: Lock,
    title: 'Locked out of creation',
    desc: 'Non-developers have no way to create the tools they need. They are limited to what the app store gives them.',
  },
  {
    icon: Users,
    title: 'One size fits none',
    desc: 'Generic software cannot meet everyone\'s unique workflows and requirements.',
  },
];

function ProblemCard({ problem, index }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.15 }}
      className="flex items-start gap-4 p-6 rounded-xl border border-border-light bg-white/60"
    >
      <div className="w-10 h-10 rounded-lg bg-coral/[0.06] flex items-center justify-center flex-shrink-0">
        <problem.icon className="w-5 h-5 text-coral" />
      </div>
      <div>
        <h3 className="text-base font-semibold text-ink mb-1.5">{problem.title}</h3>
        <p className="text-sm text-ink-secondary leading-relaxed">{problem.desc}</p>
      </div>
    </motion.div>
  );
}

export default function Problem() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section className="relative py-24 md:py-32 px-6 md:px-12">
      <div className="max-w-[1200px] mx-auto">
        <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">
          {/* Left: Statement */}
          <motion.div
            ref={ref}
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, ease: 'easeOut' }}
          >
            <SectionBadge>The Problem</SectionBadge>
            <h2 className="font-serif text-display-md md:text-display-lg font-semibold text-ink leading-tight text-balance">
              Every day, developers rebuild the same software.
            </h2>
            <p className="mt-4 text-lg text-ink-secondary leading-relaxed max-w-md">
              The rest of us can only use what we&apos;re given.
            </p>
            <p className="mt-2 text-sm text-ink-muted leading-relaxed max-w-md">
              软件创造的门槛从未真正降低。开发者重复劳动，普通人被限制在固定应用中。
            </p>

            {/* Simple visual: locked → unlocked */}
            <div className="flex items-center gap-4 mt-8 p-4 rounded-xl bg-warm-gray/50 border border-border-light">
              <div className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-white border border-border shadow-sm">
                <Lock className="w-4 h-4 text-ink-muted" />
                <span className="text-xs font-medium text-ink-muted">Fixed App</span>
              </div>
              <span className="text-ink-muted">→</span>
              <div className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-white border border-coral/20 shadow-sm">
                <div className="flex gap-0.5">
                  <div className="w-1.5 h-4 rounded-sm bg-coral/40"></div>
                  <div className="w-1.5 h-3 rounded-sm bg-coral/30"></div>
                  <div className="w-1.5 h-5 rounded-sm bg-coral/50"></div>
                </div>
                <span className="text-xs font-medium text-coral">Modular Blocks</span>
              </div>
            </div>
          </motion.div>

          {/* Right: Problem cards */}
          <div className="space-y-4">
            {problems.map((p, i) => (
              <ProblemCard key={i} problem={p} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
