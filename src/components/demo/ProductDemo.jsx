import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Database, LayoutDashboard, Bot, Bell, Workflow, Sparkles, ArrowRight, Play } from 'lucide-react';

const PROMPT_TEXT = '创建一个项目管理系统';
const PROMPT_EN = 'Create a project management system';

const MODULES = [
  { icon: Database, label: 'Task Database', desc: '结构化任务数据存储', color: 'from-blue-500/10 to-blue-600/5', iconColor: 'text-blue-600', delay: 0 },
  { icon: LayoutDashboard, label: 'Team Dashboard', desc: '实时团队协作看板', color: 'from-emerald-500/10 to-emerald-600/5', iconColor: 'text-emerald-600', delay: 0.1 },
  { icon: Bot, label: 'AI Assistant', desc: '智能任务分配与建议', color: 'from-violet-500/10 to-violet-600/5', iconColor: 'text-violet-600', delay: 0.2 },
  { icon: Bell, label: 'Auto Reminder', desc: '自动化提醒与通知', color: 'from-amber-500/10 to-amber-600/5', iconColor: 'text-amber-600', delay: 0.3 },
  { icon: Workflow, label: 'Workflow Automation', desc: '可视化工作流编排', color: 'from-rose-500/10 to-rose-600/5', iconColor: 'text-rose-600', delay: 0.4 },
];

const BLOCK_TYPES = [
  { icon: Database, label: 'Database' },
  { icon: LayoutDashboard, label: 'Dashboard' },
  { icon: Bot, label: 'AI Agent' },
  { icon: Workflow, label: 'Workflow' },
];

export default function ProductDemo() {
  const [stage, setStage] = useState('idle'); // idle | typing | processing | generating | complete
  const [typedText, setTypedText] = useState('');
  const [typingIndex, setTypingIndex] = useState(0);
  const [visibleModules, setVisibleModules] = useState([]);
  const [showReset, setShowReset] = useState(false);

  // Typewriter effect
  useEffect(() => {
    if (stage === 'typing' && typingIndex < PROMPT_TEXT.length) {
      const timer = setTimeout(() => {
        setTypedText(PROMPT_TEXT.slice(0, typingIndex + 1));
        setTypingIndex(typingIndex + 1);
      }, 80 + Math.random() * 40);
      return () => clearTimeout(timer);
    } else if (stage === 'typing' && typingIndex >= PROMPT_TEXT.length) {
      const timer = setTimeout(() => setStage('processing'), 500);
      return () => clearTimeout(timer);
    }
  }, [stage, typingIndex]);

  // Processing → generating
  useEffect(() => {
    if (stage === 'processing') {
      const timer = setTimeout(() => setStage('generating'), 1800);
      return () => clearTimeout(timer);
    }
  }, [stage]);

  // Generate modules one by one
  useEffect(() => {
    if (stage === 'generating') {
      MODULES.forEach((mod, i) => {
        const timer = setTimeout(() => {
          setVisibleModules((prev) => [...prev, i]);
          if (i === MODULES.length - 1) {
            setTimeout(() => {
              setStage('complete');
              setShowReset(true);
            }, 600);
          }
        }, i * 350);
        return () => clearTimeout(timer);
      });
      return () => {
        MODULES.forEach((_, i) => clearTimeout(i));
      };
    }
  }, [stage]);

  const startDemo = useCallback(() => {
    setStage('typing');
    setTypedText('');
    setTypingIndex(0);
    setVisibleModules([]);
    setShowReset(false);
  }, []);

  const resetDemo = useCallback(() => {
    setStage('idle');
    setTypedText('');
    setTypingIndex(0);
    setVisibleModules([]);
    setShowReset(false);
  }, []);

  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* Demo Window */}
      <div className="relative bg-white rounded-2xl border border-border shadow-[0_8px_40px_-12px_rgba(0,0,0,0.06)] overflow-hidden">
        {/* Window Header */}
        <div className="flex items-center gap-2 px-5 py-3.5 border-b border-border-light bg-warm-gray/50">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-[#FF5F57]"></div>
            <div className="w-3 h-3 rounded-full bg-[#FFBD2E]"></div>
            <div className="w-3 h-3 rounded-full bg-[#28C840]"></div>
          </div>
          <div className="flex-1 text-center">
            <span className="text-xs text-ink-muted font-medium">Notion Workspace</span>
          </div>
          <div className="w-14"></div>
        </div>

        {/* Demo Content */}
        <div className="p-6 md:p-8 min-h-[420px] flex flex-col">
          {/* AI Input Area */}
          <div className="mb-6">
            <div className="relative">
              {/* Prompt bar */}
              <div className={`flex items-center gap-3 p-3.5 rounded-xl border transition-all duration-300 ${
                stage === 'processing' ? 'border-coral/30 bg-coral/[0.03]' :
                stage === 'generating' || stage === 'complete' ? 'border-emerald-200 bg-emerald-50/50' :
                'border-border bg-warm-gray/50'
              }`}>
                <Sparkles className={`w-4 h-4 flex-shrink-0 transition-colors duration-300 ${
                  stage === 'processing' ? 'text-coral' :
                  stage === 'generating' || stage === 'complete' ? 'text-emerald-600' :
                  'text-ink-muted'
                }`} />

                <div className="flex-1 min-w-0">
                  {stage === 'idle' && (
                    <span className="text-sm text-ink-muted">
                      Describe the software you want to create...
                      <span className="ml-2 text-xs text-ink-muted/60">描述你想要创造的软件</span>
                    </span>
                  )}
                  {(stage === 'typing' || stage === 'processing') && (
                    <span className="text-sm text-ink font-medium">
                      {typedText}
                      {stage === 'typing' && (
                        <span className="inline-block w-0.5 h-4 bg-coral ml-0.5 animate-pulse align-middle"></span>
                      )}
                    </span>
                  )}
                  {(stage === 'generating' || stage === 'complete') && (
                    <span className="text-sm text-emerald-700 font-medium">
                      {PROMPT_TEXT}
                    </span>
                  )}
                </div>

                {/* Action button */}
                {stage === 'idle' && (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={startDemo}
                    className="flex items-center gap-1.5 px-4 py-1.5 bg-coral text-white text-sm font-medium rounded-lg hover:bg-coral-dark transition-colors flex-shrink-0"
                  >
                    <Play className="w-3.5 h-3.5" />
                    Generate
                  </motion.button>
                )}
                {stage === 'processing' && (
                  <div className="flex items-center gap-2 px-3 py-1 flex-shrink-0">
                    <div className="flex gap-1">
                      {[0, 1, 2].map((i) => (
                        <motion.div
                          key={i}
                          className="w-1.5 h-1.5 rounded-full bg-coral"
                          animate={{ opacity: [0.3, 1, 0.3], scale: [1, 1.2, 1] }}
                          transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.15 }}
                        />
                      ))}
                    </div>
                    <span className="text-xs text-coral font-medium">Creating...</span>
                  </div>
                )}
                {(stage === 'generating' || stage === 'complete') && (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={resetDemo}
                    className="text-xs text-ink-muted hover:text-ink transition-colors flex-shrink-0 px-2"
                  >
                    Reset
                  </motion.button>
                )}
              </div>

              {/* AI suggestion indicator */}
              <AnimatePresence>
                {stage === 'processing' && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                    className="absolute -bottom-7 left-0 right-0 text-center"
                  >
                    <span className="text-xs text-ink-muted">
                      AI is analyzing requirements and generating software architecture...
                    </span>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Canvas Area */}
          <div className="flex-1 relative">
            {/* Empty canvas state */}
            <AnimatePresence mode="wait">
              {stage === 'idle' && (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 flex flex-col items-center justify-center"
                >
                  <div className="relative">
                    {/* Dotted grid background */}
                    <div className="absolute inset-0 opacity-[0.03]"
                      style={{
                        backgroundImage: 'radial-gradient(circle, #1A1A1A 1px, transparent 1px)',
                        backgroundSize: '20px 20px',
                      }}
                    />
                    <div className="relative flex flex-col items-center gap-4 p-12">
                      <motion.div
                        animate={{ scale: [1, 1.05, 1] }}
                        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                        className="w-16 h-16 rounded-2xl border-2 border-dashed border-border flex items-center justify-center"
                      >
                        <Plus className="w-6 h-6 text-ink-muted" />
                      </motion.div>
                      <p className="text-sm text-ink-muted">Add Block</p>

                      {/* Floating block suggestion */}
                      <div className="flex gap-3 flex-wrap justify-center mt-2">
                        {BLOCK_TYPES.map((block, i) => (
                          <motion.div
                            key={block.label}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5 + i * 0.1 }}
                            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border-light bg-white/80 text-xs text-ink-secondary hover:border-coral/20 hover:text-coral transition-colors cursor-default"
                          >
                            <block.icon className="w-3 h-3" />
                            {block.label}
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Generated modules */}
              {(stage === 'generating' || stage === 'complete') && (
                <motion.div
                  key="modules"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="space-y-3"
                >
                  {/* Title */}
                  <AnimatePresence>
                    {visibleModules.length >= 1 && (
                      <motion.div
                        initial={{ opacity: 0, y: -8 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex items-center gap-2 pb-2"
                      >
                        <Sparkles className="w-4 h-4 text-coral" />
                        <span className="text-sm font-semibold text-ink">
                          Project Management Workspace
                        </span>
                        <span className="text-xs text-ink-muted">项目管理空间</span>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Module cards grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {MODULES.map((mod, i) => (
                      <AnimatePresence key={i}>
                        {visibleModules.includes(i) && (
                          <motion.div
                            initial={{ opacity: 0, y: 20, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            transition={{
                              type: 'spring',
                              stiffness: 300,
                              damping: 24,
                            }}
                            whileHover={{
                              y: -2,
                              boxShadow: '0 8px 24px -8px rgba(0,0,0,0.08)',
                            }}
                            className={`relative flex items-start gap-3 p-4 rounded-xl border border-border-light bg-white cursor-default overflow-hidden group`}
                          >
                            {/* Subtle gradient bg */}
                            <div className={`absolute inset-0 bg-gradient-to-br ${mod.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />

                            <div className={`relative w-9 h-9 rounded-lg flex items-center justify-center bg-gradient-to-br ${mod.color} border border-border-light flex-shrink-0`}>
                              <mod.icon className={`w-4.5 h-4.5 ${mod.iconColor}`} />
                            </div>
                            <div className="relative flex-1 min-w-0">
                              <h4 className="text-sm font-semibold text-ink">{mod.label}</h4>
                              <p className="text-xs text-ink-muted mt-0.5">{mod.desc}</p>
                            </div>

                            {/* Hover indicator */}
                            <div className="relative opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0 self-center">
                              <ArrowRight className="w-3.5 h-3.5 text-ink-muted" />
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Processing state */}
              {stage === 'processing' && (
                <motion.div
                  key="processing"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 flex flex-col items-center justify-center gap-6"
                >
                  {/* Animated thinking rings */}
                  <div className="relative w-20 h-20">
                    {[0, 1, 2].map((i) => (
                      <motion.div
                        key={i}
                        className="absolute inset-0 rounded-full border-2 border-coral/20"
                        animate={{
                          scale: [1, 1.5, 1.8],
                          opacity: [0.6, 0.2, 0],
                        }}
                        transition={{
                          duration: 1.5,
                          repeat: Infinity,
                          delay: i * 0.4,
                          ease: 'easeOut',
                        }}
                      />
                    ))}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Sparkles className="w-6 h-6 text-coral" />
                    </div>
                  </div>

                  <div className="text-center">
                    <p className="text-sm text-ink-secondary">
                      Analyzing requirements...
                    </p>
                    <p className="text-xs text-ink-muted mt-1">
                      正在分析需求，生成软件架构
                    </p>
                  </div>

                  {/* Module name previews */}
                  <div className="flex gap-2 flex-wrap justify-center">
                    {MODULES.map((mod, i) => (
                      <motion.span
                        key={i}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: [0, 0.7, 0.4] }}
                        transition={{ duration: 2, delay: i * 0.2, repeat: Infinity }}
                        className="text-xs text-ink-muted/60 px-2 py-1 rounded-md bg-warm-gray"
                      >
                        {mod.label}
                      </motion.span>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Demo caption */}
      <div className="mt-4 text-center">
        <p className="text-sm text-ink-muted">
          Click <span className="text-coral font-medium">Generate</span> to see how AI creates software
          <span className="mx-1.5">·</span>
          <span className="text-xs">点击生成，观看 AI 如何创造软件</span>
        </p>
      </div>
    </div>
  );
}
