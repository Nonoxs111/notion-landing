import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import SectionBadge from '../components/SectionBadge';
import { Layout, Blocks, Workflow, Share2 } from 'lucide-react';

const features = [
  {
    icon: Layout,
    title: 'Visual Editor',
    titleCN: '可视化编辑器',
    desc: 'Drag, drop, and arrange software modules on an infinite canvas. See your software take shape in real-time.',
    highlight: 'WYSIWYG creation — what you see is what runs.',
  },
  {
    icon: Blocks,
    title: 'Structured Content',
    titleCN: '结构化内容',
    desc: 'Turn information into composable, queryable data. Every piece of content becomes a building block for your software.',
    highlight: 'Information as LEGO bricks, not static documents.',
  },
  {
    icon: Workflow,
    title: 'LEGO for Software',
    titleCN: '积木式构建',
    desc: 'Combine databases, dashboards, forms, and automations like building blocks. No code, no limits.',
    highlight: 'Software assembly, not software development.',
  },
  {
    icon: Share2,
    title: 'Marketplace',
    titleCN: '模块市场',
    desc: 'Share your creations and reuse components built by the community. Stand on the shoulders of creators worldwide.',
    highlight: 'A thriving ecosystem of reusable software modules.',
  },
];

function FeatureCard({ feature, index }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.12 }}
      className="group relative p-8 rounded-2xl border border-border-light bg-white hover:border-border transition-all duration-500"
    >
      {/* Icon */}
      <div className="w-12 h-12 rounded-xl bg-coral/[0.06] flex items-center justify-center mb-6 group-hover:bg-coral/[0.1] transition-colors">
        <feature.icon className="w-6 h-6 text-coral" />
      </div>

      {/* Title */}
      <h3 className="text-xl font-semibold text-ink mb-1">
        {feature.title}
      </h3>
      <p className="text-sm text-ink-muted mb-4">{feature.titleCN}</p>

      {/* Description */}
      <p className="text-sm text-ink-secondary leading-relaxed mb-4">
        {feature.desc}
      </p>

      {/* Highlight */}
      <div className="pt-4 border-t border-border-light">
        <p className="text-xs font-medium text-coral">
          {feature.highlight}
        </p>
      </div>

      {/* Hover gradient */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-coral/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
    </motion.div>
  );
}

export default function Features() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section className="relative py-24 md:py-32 px-6 md:px-12">
      {/* Divider */}
      <div className="max-w-[1200px] mx-auto mb-24">
        <div className="w-full h-px bg-border-light" />
      </div>

      <div className="max-w-[1200px] mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="text-center mb-16"
        >
          <SectionBadge>Core Capabilities</SectionBadge>
          <h2 className="font-serif text-display-md md:text-[3rem] font-semibold text-ink leading-tight text-balance">
            Everything you need
            <br />
            to <span className="gradient-text">create software</span>
          </h2>
          <p className="mt-4 text-lg text-ink-secondary max-w-lg mx-auto text-balance">
            四个核心能力，让软件创造变得像搭积木一样简单。
          </p>
        </motion.div>

        {/* Feature grid */}
        <div className="grid md:grid-cols-2 gap-5">
          {features.map((f, i) => (
            <FeatureCard key={i} feature={f} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
