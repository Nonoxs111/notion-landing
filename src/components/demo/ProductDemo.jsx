import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Database, LayoutDashboard, Bot, Bell, Workflow, Sparkles, ArrowRight, Play, X, GripVertical, Table, BarChart3, MessageSquare, Clock, GitBranch } from 'lucide-react';

const PROMPT_TEXT = '创建一个项目管理系统';

const MODULES = [
  { icon: Database, label: 'Task Database', desc: '结构化任务数据存储', detail: { icon: Table, preview: ['Projects', 'Tasks', 'Subtasks', 'Assignees', 'Deadlines'], rows: 5 } },
  { icon: LayoutDashboard, label: 'Team Dashboard', desc: '实时团队协作看板', detail: { icon: BarChart3, preview: ['Overview', 'Progress', 'Workload', 'Timeline', 'Metrics'], rows: 4 } },
  { icon: Bot, label: 'AI Assistant', desc: '智能任务分配与建议', detail: { icon: MessageSquare, preview: ['Smart assign', 'Priority detect', 'Deadline predict', 'Daily summary'], rows: 3 } },
  { icon: Bell, label: 'Auto Reminder', desc: '自动化提醒与通知', detail: { icon: Clock, preview: ['Due date alert', 'Daily digest', 'Mention notify', 'Status change'], rows: 4 } },
  { icon: Workflow, label: 'Workflow Automation', desc: '可视化工作流编排', detail: { icon: GitBranch, preview: ['Triggers', 'Conditions', 'Actions', 'Templates', 'History'], rows: 5 } },
];

const BLOCK_TYPES = [
  { icon: Database, label: 'Database' },
  { icon: LayoutDashboard, label: 'Dashboard' },
  { icon: Bot, label: 'AI Agent' },
  { icon: Workflow, label: 'Workflow' },
];

export default function ProductDemo() {
  const [stage, setStage] = useState('idle');
  const [typedText, setTypedText] = useState('');
  const [typingIndex, setTypingIndex] = useState(0);
  const [visibleModules, setVisibleModules] = useState([]);
  const [expandedCard, setExpandedCard] = useState(null);
  const [manualBlocks, setManualBlocks] = useState([]);

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
      MODULES.forEach((_, i) => {
        const timer = setTimeout(() => {
          setVisibleModules((prev) => [...prev, i]);
          if (i === MODULES.length - 1) {
            setTimeout(() => setStage('complete'), 600);
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
    setExpandedCard(null);
    setManualBlocks([]);
  }, []);

  const resetDemo = useCallback(() => {
    setStage('idle');
    setTypedText('');
    setTypingIndex(0);
    setVisibleModules([]);
    setExpandedCard(null);
    setManualBlocks([]);
  }, []);

  const addManualBlock = useCallback((block) => {
    if (manualBlocks.length >= 4) return;
    setManualBlocks((prev) => {
      if (prev.find((b) => b.label === block.label)) return prev;
      return [...prev, block];
    });
  }, [manualBlocks]);

  const removeManualBlock = useCallback((label) => {
    setManualBlocks((prev) => prev.filter((b) => b.label !== label));
  }, []);

  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* Demo Window */}
      <div className="relative bg-white rounded-2xl border border-border shadow-[0_8px_40px_-12px_rgba(0,0,0,0.06)] overflow-hidden">
        {/* Window Header */}
        <div className="flex items-center gap-2 px-5 py-3.5 border-b border-border-light bg-warm-gray/50">
          <div className="flex gap-1.5">
            <motion.button
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              onClick={resetDemo}
              className="w-3 h-3 rounded-full bg-[#FF5F57] hover:bg-[#FF3B30] transition-colors cursor-pointer"
              title="Close workspace"
            />
            <div className="w-3 h-3 rounded-full bg-[#FFBD2E] cursor-default" />
            <div className="w-3 h-3 rounded-full bg-[#28C840] cursor-default" />
          </div>
          <div className="flex-1 text-center">
            <span className="text-xs text-ink-muted font-medium">Notion Workspace</span>
          </div>
          <div className="w-14"></div>
        </div>

        {/* Demo Content */}
        <div className="p-6 md:p-8 min-h-[440px] flex flex-col">
          {/* AI Input Area */}
          <div className="mb-6">
            <div className="relative">
              <div className={`flex items-center gap-3 p-3.5 rounded-xl border transition-all duration-300 ${
                stage === 'processing' ? 'border-coral/30 bg-coral/[0.03]' :
                stage === 'generating' || stage === 'complete' ? 'border-coral/15 bg-coral/[0.02]' :
                'border-border bg-warm-gray/50'
              }`}>
                <Sparkles className={`w-4 h-4 flex-shrink-0 transition-colors duration-300 ${
                  stage === 'processing' ? 'text-coral' :
                  stage === 'generating' || stage === 'complete' ? 'text-coral' :
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
                    <span className="text-sm text-ink font-medium">
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
            </div>
          </div>

          {/* Canvas Area */}
          <div className="flex-1 relative">
            <AnimatePresence mode="wait">
              {/* ===== IDLE STATE ===== */}
              {stage === 'idle' && (
                <motion.div
                  key="idle"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="min-h-[300px]"
                >
                  {/* Dotted grid */}
                  <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
                    style={{
                      backgroundImage: 'radial-gradient(circle, #1A1A1A 1px, transparent 1px)',
                      backgroundSize: '20px 20px',
                    }}
                  />

                  {/* Manually added blocks */}
                  {manualBlocks.length > 0 && (
                    <div className="flex gap-3 flex-wrap mb-6">
                      <AnimatePresence>
                        {manualBlocks.map((block) => (
                          <motion.div
                            key={block.label}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-border bg-white shadow-sm group"
                          >
                            <GripVertical className="w-3.5 h-3.5 text-ink-muted/40 cursor-grab" />
                            <block.icon className="w-4 h-4 text-coral" />
                            <span className="text-sm font-medium text-ink">{block.label}</span>
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={() => removeManualBlock(block.label)}
                              className="ml-1 opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                              <X className="w-3.5 h-3.5 text-ink-muted hover:text-ink" />
                            </motion.button>
                          </motion.div>
                        ))}
                      </AnimatePresence>
                    </div>
                  )}

                  {/* Center CTA */}
                  <div className="flex flex-col items-center justify-center py-10">
                    <motion.div
                      animate={{ scale: [1, 1.05, 1] }}
                      transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                      className="w-16 h-16 rounded-2xl border-2 border-dashed border-border flex items-center justify-center"
                    >
                      <Plus className="w-6 h-6 text-ink-muted" />
                    </motion.div>
                    <p className="text-sm text-ink-muted mt-4">Add Block</p>

                    {/* Clickable block suggestions */}
                    <div className="flex gap-3 flex-wrap justify-center mt-3">
                      {BLOCK_TYPES.map((block, i) => (
                        <motion.button
                          key={block.label}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.5 + i * 0.1 }}
                          whileHover={{ scale: 1.05, borderColor: 'rgba(255,75,74,0.3)' }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => addManualBlock(block)}
                          disabled={manualBlocks.some((b) => b.label === block.label)}
                          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs transition-all cursor-pointer ${
                            manualBlocks.some((b) => b.label === block.label)
                              ? 'border-coral/20 bg-coral/[0.04] text-coral'
                              : 'border-border-light bg-white/80 text-ink-secondary hover:text-coral'
                          }`}
                        >
                          <block.icon className="w-3 h-3" />
                          {block.label}
                        </motion.button>
                      ))}
                    </div>

                    {manualBlocks.length > 0 && (
                      <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-xs text-ink-muted mt-3"
                      >
                        Blocks placed — click <span className="text-coral font-medium">Generate</span> or keep building
                      </motion.p>
                    )}
                  </div>
                </motion.div>
              )}

              {/* ===== GENERATED MODULES ===== */}
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
                            layout
                          >
                            {/* Collapsed card */}
                            {expandedCard !== i && (
                              <motion.div
                                whileHover={{
                                  y: -2,
                                  boxShadow: '0 8px 24px -8px rgba(0,0,0,0.08)',
                                }}
                                onClick={() => setExpandedCard(i)}
                                className="relative flex items-start gap-3 p-4 rounded-xl border border-border-light bg-white cursor-pointer overflow-hidden group transition-shadow"
                              >
                                {/* Hover gradient */}
                                <div className="absolute inset-0 bg-gradient-to-br from-coral/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                                <div className="relative w-9 h-9 rounded-lg flex items-center justify-center bg-coral/[0.06] border border-border-light flex-shrink-0">
                                  <mod.icon className="w-4.5 h-4.5 text-coral" />
                                </div>
                                <div className="relative flex-1 min-w-0">
                                  <h4 className="text-sm font-semibold text-ink">{mod.label}</h4>
                                  <p className="text-xs text-ink-muted mt-0.5">{mod.desc}</p>
                                </div>
                                <div className="relative opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0 self-center">
                                  <ArrowRight className="w-3.5 h-3.5 text-coral/60" />
                                </div>
                              </motion.div>
                            )}

                            {/* Expanded card */}
                            {expandedCard === i && (
                              <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="relative rounded-xl border border-coral/20 bg-white overflow-hidden shadow-[0_4px_20px_-8px_rgba(255,75,74,0.1)]"
                              >
                                {/* Expanded header */}
                                <div className="flex items-center justify-between p-4 border-b border-border-light bg-coral/[0.02]">
                                  <div className="flex items-center gap-3">
                                    <div className="w-9 h-9 rounded-lg flex items-center justify-center bg-coral/[0.08]">
                                      <mod.icon className="w-4.5 h-4.5 text-coral" />
                                    </div>
                                    <div>
                                      <h4 className="text-sm font-semibold text-ink">{mod.label}</h4>
                                      <p className="text-xs text-ink-muted">{mod.desc}</p>
                                    </div>
                                  </div>
                                  <motion.button
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                    onClick={() => setExpandedCard(null)}
                                    className="p-1 rounded-md hover:bg-warm-gray transition-colors"
                                  >
                                    <X className="w-4 h-4 text-ink-muted" />
                                  </motion.button>
                                </div>

                                {/* Expanded body — mini preview */}
                                <div className="p-4">
                                  <div className="flex items-center gap-2 mb-3">
                                    <mod.detail.icon className="w-4 h-4 text-coral/60" />
                                    <span className="text-xs font-medium text-ink-muted uppercase tracking-wider">Schema Preview</span>
                                  </div>
                                  <div className="rounded-lg border border-border-light overflow-hidden">
                                    <div className="grid grid-cols-2 bg-warm-gray/50 px-3 py-2 text-[10px] font-semibold text-ink-muted uppercase tracking-wider border-b border-border-light">
                                      <span>Field</span>
                                      <span>Type</span>
                                    </div>
                                    {mod.detail.preview.map((field, fi) => (
                                      <div
                                        key={fi}
                                        className={`grid grid-cols-2 px-3 py-1.5 text-xs border-b border-border-light/50 ${
                                          fi % 2 === 0 ? 'bg-white' : 'bg-warm-gray/[0.3]'
                                        }`}
                                      >
                                        <span className="text-ink font-medium">{field}</span>
                                        <span className="text-ink-muted">
                                          {['Text', 'Number', 'Relation', 'Date', 'Formula'][fi % 5]}
                                        </span>
                                      </div>
                                    ))}
                                  </div>
                                  <div className="flex items-center gap-1.5 mt-2.5">
                                    <div className="w-1.5 h-1.5 rounded-full bg-coral/40"></div>
                                    <span className="text-[10px] text-ink-muted">
                                      {mod.detail.rows} tables · AI-generated schema · Editable
                                    </span>
                                  </div>
                                </div>
                              </motion.div>
                            )}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    ))}
                  </div>

                  {/* Hint for interactivity */}
                  {stage === 'complete' && !expandedCard && (
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.5 }}
                      className="text-center text-xs text-ink-muted pt-2"
                    >
                      Click any card to inspect its schema
                    </motion.p>
                  )}
                </motion.div>
              )}

              {/* ===== PROCESSING STATE ===== */}
              {stage === 'processing' && (
                <motion.div
                  key="processing"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 flex flex-col items-center justify-center gap-6"
                >
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
                    <p className="text-sm text-ink-secondary">Analyzing requirements...</p>
                    <p className="text-xs text-ink-muted mt-1">正在分析需求，生成软件架构</p>
                  </div>
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
          {stage === 'idle' ? (
            <>
              Click blocks to add them, or <span className="text-coral font-medium">Generate</span> to see AI create software
              <span className="mx-1.5">·</span>
              <span className="text-xs">点击模块手动添加，或点击生成观看 AI 创造</span>
            </>
          ) : (
            <>
              Click any card to inspect details
              <span className="mx-1.5">·</span>
              <span className="text-xs">点击卡片查看详情</span>
            </>
          )}
        </p>
      </div>
    </div>
  );
}
