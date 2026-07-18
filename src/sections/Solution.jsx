import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import SectionBadge from '../components/SectionBadge';
import { FileText, Database, Workflow, Layout, Sparkles } from 'lucide-react';

const pillars = [
  { icon: FileText, label: 'Information', desc: '结构化信息管理', color: 'border-blue-200 bg-blue-50/50' },
  { icon: Database, label: 'Data', desc: '灵活数据建模', color: 'border-emerald-200 bg-emerald-50/50' },
  { icon: Workflow, label: 'Workflow', desc: '可视化工作流', color: 'border-violet-200 bg-violet-50/50' },
  { icon: Layout, label: 'Application', desc: '模块化应用组合', color: 'border-amber-200 bg-amber-50/50' },
  { icon: Sparkles, label: 'Intelligence', desc: 'AI 智能驱动', color: 'border-coral/20 bg-coral/5' },
];

export default function Solution() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section className="relative py-24 md:py-32 px-6 md:px-12 bg-white">
      <div className="max-w-[1200px] mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="text-center"
        >
          <SectionBadge>The Solution</SectionBadge>
          <h2 className="font-serif text-display-md md:text-display-lg font-semibold text-ink leading-tight text-balance">
            One unified space for
            <br />
            <span className="gradient-text">software creation</span>
          </h2>
          <p className="mt-4 text-lg text-ink-secondary max-w-lg mx-auto text-balance">
            将信息、数据、工作流与应用组合成一个完整的软件创造空间。
          </p>
        </motion.div>

        {/* Pillars visual */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-5 gap-3">
          {pillars.map((pillar, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: 0.3 + i * 0.1 }}
              whileHover={{ y: -4 }}
              className={`flex flex-col items-center gap-3 p-5 rounded-xl border ${pillar.color} transition-all duration-300 cursor-default`}
            >
              <pillar.icon className="w-6 h-6 text-ink-secondary" />
              <span className="text-sm font-semibold text-ink">{pillar.label}</span>
              <span className="text-xs text-ink-muted">{pillar.desc}</span>
            </motion.div>
          ))}
        </div>

        {/* Connecting lines visual */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 1 }}
          className="mt-10 text-center"
        >
          <p className="text-sm text-ink-muted max-w-md mx-auto leading-relaxed">
            Each piece is modular and interconnected. Change one, and the entire system adapts — powered by AI.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
