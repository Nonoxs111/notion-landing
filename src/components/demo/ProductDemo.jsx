import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Table2, Columns3, Calendar, FileText, ChartBar, Image, Sparkles, X, GripHorizontal, Plus, Trash2 } from 'lucide-react';

const BLOCKS = [
  {
    id: 'table',
    icon: Table2,
    label: 'Table',
    desc: 'Structured data with rows & columns',
    color: 'border-ink/10 bg-warm-white hover:border-ink/20',
    preview: () => (
      <div className="space-y-0">
        <div className="grid grid-cols-3 gap-px bg-border-light rounded-t overflow-hidden">
          {['Task', 'Status', 'Assignee'].map((h) => (
            <div key={h} className="bg-warm-gray px-2 py-1 text-[10px] font-semibold text-ink-secondary">{h}</div>
          ))}
        </div>
        {[
          ['Design system', 'Done', 'Li'],
          ['API integration', 'In progress', 'Wang'],
          ['User testing', 'Review', 'Zhang'],
        ].map((row, ri) => (
          <div key={ri} className="grid grid-cols-3 gap-px bg-border-light">
            {row.map((cell, ci) => (
              <div key={ci} className={`bg-white px-2 py-1 text-[10px] ${ci === 0 ? 'text-ink font-medium' : 'text-ink-secondary'}`}>{cell}</div>
            ))}
          </div>
        ))}
      </div>
    ),
  },
  {
    id: 'board',
    icon: Columns3,
    label: 'Board',
    desc: 'Kanban view for visual workflows',
    color: 'border-ink/10 bg-warm-white hover:border-ink/20',
    preview: () => (
      <div className="grid grid-cols-3 gap-2">
        {[
          { title: 'To Do', count: 3, color: 'bg-ink/5' },
          { title: 'In Progress', count: 2, color: 'bg-coral/5' },
          { title: 'Done', count: 4, color: 'bg-ink/5' },
        ].map((col) => (
          <div key={col.title} className={`${col.color} rounded-lg p-2`}>
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[10px] font-semibold text-ink">{col.title}</span>
              <span className="text-[9px] text-ink-muted bg-white/60 px-1 rounded">{col.count}</span>
            </div>
            {[...Array(col.count)].map((_, i) => (
              <div key={i} className="bg-white rounded-md px-2 py-1 mb-1 text-[9px] text-ink-secondary shadow-sm border border-border-light">
                {['Research', 'Design', 'Build', 'Test'][i]}
              </div>
            ))}
          </div>
        ))}
      </div>
    ),
  },
  {
    id: 'calendar',
    icon: Calendar,
    label: 'Calendar',
    desc: 'Date-driven views & timelines',
    color: 'border-ink/10 bg-warm-white hover:border-ink/20',
    preview: () => (
      <div>
        <div className="grid grid-cols-7 gap-0.5 mb-1">
          {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((d) => (
            <div key={d} className="text-center text-[9px] text-ink-muted font-medium">{d}</div>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-0.5">
          {[...Array(28)].map((_, i) => (
            <div
              key={i}
              className={`aspect-square rounded-sm flex items-center justify-center text-[9px] ${
                [3, 10, 17, 24].includes(i) ? 'bg-coral text-white font-medium' : 'text-ink-secondary hover:bg-warm-gray'
              }`}
            >
              {i + 1}
            </div>
          ))}
        </div>
      </div>
    ),
  },
  {
    id: 'doc',
    icon: FileText,
    label: 'Document',
    desc: 'Rich text pages & wikis',
    color: 'border-ink/10 bg-warm-white hover:border-ink/20',
    preview: () => (
      <div className="space-y-2">
        <div className="w-3/4 h-3 bg-ink/80 rounded" />
        <div className="space-y-1">
          <div className="w-full h-1.5 bg-ink/8 rounded" />
          <div className="w-5/6 h-1.5 bg-ink/8 rounded" />
          <div className="w-4/6 h-1.5 bg-ink/8 rounded" />
        </div>
        <div className="w-1/2 h-3 bg-ink/60 rounded mt-2" />
        <div className="space-y-1">
          <div className="w-full h-1.5 bg-ink/8 rounded" />
          <div className="w-3/4 h-1.5 bg-ink/8 rounded" />
        </div>
      </div>
    ),
  },
  {
    id: 'timeline',
    icon: ChartBar,
    label: 'Timeline',
    desc: 'Gantt charts & project roadmaps',
    color: 'border-ink/10 bg-warm-white hover:border-ink/20',
    preview: () => (
      <div className="space-y-2">
        {[
          { label: 'Research', start: 0, width: 30 },
          { label: 'Design', start: 15, width: 45 },
          { label: 'Development', start: 35, width: 55 },
          { label: 'Testing', start: 65, width: 30 },
        ].map((bar) => (
          <div key={bar.label} className="flex items-center gap-2">
            <span className="text-[10px] text-ink-secondary w-16 truncate">{bar.label}</span>
            <div className="flex-1 h-4 bg-warm-gray rounded-sm relative">
              <div
                className="absolute top-0 h-full bg-coral/70 rounded-sm"
                style={{ left: `${bar.start}%`, width: `${bar.width}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    ),
  },
  {
    id: 'gallery',
    icon: Image,
    label: 'Gallery',
    desc: 'Visual content & media cards',
    color: 'border-ink/10 bg-warm-white hover:border-ink/20',
    preview: () => (
      <div className="grid grid-cols-3 gap-2">
        {[
          { title: 'Design mockup', bg: 'bg-ink/5' },
          { title: 'User flow', bg: 'bg-coral/5' },
          { title: 'Wireframe', bg: 'bg-ink/5' },
        ].map((img) => (
          <div key={img.title} className="space-y-1">
            <div className={`aspect-[4/3] ${img.bg} rounded-lg flex items-center justify-center`}>
              <Image className="w-3 h-3 text-ink-muted/40" />
            </div>
            <span className="text-[9px] text-ink-secondary">{img.title}</span>
          </div>
        ))}
      </div>
    ),
  },
];

const PRESETS = [
  {
    label: 'Project Management',
    blocks: ['table', 'board', 'calendar', 'timeline'],
    desc: '项目管理套件',
  },
  {
    label: 'Knowledge Base',
    blocks: ['doc', 'table', 'gallery'],
    desc: '知识库套件',
  },
];

export default function ProductDemo() {
  const [canvasBlocks, setCanvasBlocks] = useState([]);
  const [expandedBlock, setExpandedBlock] = useState(null);
  const [aiFillKey, setAiFillKey] = useState(0);
  const [showAITip, setShowAITip] = useState(true);

  const addBlock = useCallback((blockDef) => {
    const id = `${blockDef.id}-${Date.now()}`;
    setCanvasBlocks((prev) => [...prev, { ...blockDef, instanceId: id }]);
    setShowAITip(false);
  }, []);

  const removeBlock = useCallback((instanceId) => {
    setCanvasBlocks((prev) => prev.filter((b) => b.instanceId !== instanceId));
    if (expandedBlock === instanceId) setExpandedBlock(null);
  }, [expandedBlock]);

  const applyPreset = useCallback((preset) => {
    const newBlocks = preset.blocks.map((blockId) => {
      const def = BLOCKS.find((b) => b.id === blockId);
      return { ...def, instanceId: `${def.id}-${Date.now()}-${Math.random()}` };
    });
    setCanvasBlocks(newBlocks);
    setAiFillKey((k) => k + 1);
    setShowAITip(false);
  }, []);

  const clearCanvas = useCallback(() => {
    setCanvasBlocks([]);
    setExpandedBlock(null);
    setShowAITip(true);
  }, []);

  return (
    <div className="w-full max-w-5xl mx-auto">
      {/* Demo Window */}
      <div className="relative bg-white rounded-2xl border border-border shadow-[0_8px_40px_-12px_rgba(0,0,0,0.06)] overflow-hidden">
        {/* Window Header */}
        <div className="flex items-center gap-2 px-5 py-3 border-b border-border-light bg-warm-gray/50">
          <div className="flex gap-1.5">
            <motion.button
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              onClick={clearCanvas}
              className="w-3 h-3 rounded-full bg-[#FF5F57] hover:bg-[#FF3B30] transition-colors cursor-pointer"
              title="Clear canvas"
            />
            <div className="w-3 h-3 rounded-full bg-[#FFBD2E] cursor-default" />
            <div className="w-3 h-3 rounded-full bg-[#28C840] cursor-default" />
          </div>
          <div className="flex-1 text-center flex items-center justify-center gap-2">
            <span className="text-xs text-ink-muted font-medium">
              {canvasBlocks.length > 0 ? 'My Workspace' : 'Empty Workspace'}
            </span>
            {canvasBlocks.length > 0 && (
              <span className="text-[10px] text-ink-muted/50">{canvasBlocks.length} blocks</span>
            )}
          </div>
          <div className="flex items-center gap-2">
            {canvasBlocks.length > 0 && (
              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={clearCanvas}
                className="flex items-center gap-1 text-[11px] text-ink-muted hover:text-ink transition-colors"
              >
                <Trash2 className="w-3 h-3" />
                Clear
              </motion.button>
            )}
          </div>
        </div>

        <div className="flex flex-col md:flex-row min-h-[460px]">
          {/* ===== LEFT: Block Palette ===== */}
          <div className="w-full md:w-[200px] border-b md:border-b-0 md:border-r border-border-light bg-warm-gray/30 p-4 flex md:flex-col gap-2 overflow-x-auto md:overflow-visible flex-shrink-0">
            <span className="text-[10px] font-semibold text-ink-muted uppercase tracking-wider hidden md:block mb-1">
              Blocks
            </span>

            {/* Block type buttons */}
            {BLOCKS.map((block) => (
              <motion.button
                key={block.id}
                whileHover={{ scale: 1.03, y: -1 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => addBlock(block)}
                className="flex md:flex-row flex-col items-center gap-2 px-3 py-2.5 rounded-xl border border-border-light bg-white hover:border-ink/15 transition-all text-left flex-shrink-0 group"
              >
                <div className="w-7 h-7 rounded-md bg-coral/[0.06] flex items-center justify-center flex-shrink-0">
                  <block.icon className="w-3.5 h-3.5 text-coral/70" />
                </div>
                <div className="hidden md:block min-w-0">
                  <div className="text-xs font-semibold text-ink">{block.label}</div>
                  <div className="text-[10px] text-ink-muted truncate">{block.desc.split(' ').slice(0, 2).join(' ')}</div>
                </div>
              </motion.button>
            ))}

            {/* Divider */}
            <div className="w-px md:w-full h-auto md:h-px bg-border-light my-1 flex-shrink-0" />

            {/* AI Suggest */}
            <div className="hidden md:block">
              <span className="text-[10px] font-semibold text-ink-muted uppercase tracking-wider mb-2 block">
                AI Suggest
              </span>
              <div className="space-y-1.5">
                {PRESETS.map((preset) => (
                  <motion.button
                    key={preset.label}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => applyPreset(preset)}
                    className="w-full flex items-center gap-2 px-3 py-2 rounded-lg border border-coral/10 bg-coral/[0.02] hover:bg-coral/[0.06] hover:border-coral/20 transition-all text-left group"
                  >
                    <Sparkles className="w-3 h-3 text-coral/60 group-hover:text-coral transition-colors flex-shrink-0" />
                    <div className="min-w-0">
                      <div className="text-[11px] font-medium text-ink">{preset.label}</div>
                      <div className="text-[10px] text-ink-muted">{preset.desc}</div>
                    </div>
                  </motion.button>
                ))}
              </div>
            </div>
          </div>

          {/* ===== RIGHT: Canvas ===== */}
          <div className="flex-1 p-5 md:p-6 relative">
            {/* Dotted grid */}
            <div
              className="absolute inset-0 opacity-[0.025] pointer-events-none"
              style={{
                backgroundImage: 'radial-gradient(circle, #1A1A1A 1px, transparent 1px)',
                backgroundSize: '20px 20px',
              }}
            />

            <AnimatePresence mode="wait">
              {canvasBlocks.length === 0 ? (
                /* ===== EMPTY CANVAS ===== */
                <motion.div
                  key="empty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 flex flex-col items-center justify-center"
                >
                  <motion.div
                    animate={{ scale: [1, 1.04, 1] }}
                    transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                    className="w-14 h-14 rounded-2xl border-2 border-dashed border-border flex items-center justify-center mb-4"
                  >
                    <Plus className="w-5 h-5 text-ink-muted/50" />
                  </motion.div>
                  <p className="text-sm text-ink-muted font-medium">
                    Build your workspace
                  </p>
                  <p className="text-xs text-ink-muted/60 mt-1 mb-4">
                    从左侧添加 Block，组合成你需要的工具
                  </p>

                  {/* Quick start presets */}
                  <div className="flex gap-2 flex-wrap justify-center">
                    {PRESETS.map((preset) => (
                      <motion.button
                        key={preset.label}
                        whileHover={{ scale: 1.03, y: -1 }}
                        whileTap={{ scale: 0.97 }}
                        onClick={() => applyPreset(preset)}
                        className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-coral/15 bg-coral/[0.03] hover:bg-coral/[0.06] transition-all group"
                      >
                        <Sparkles className="w-3.5 h-3.5 text-coral/60 group-hover:text-coral transition-colors" />
                        <span className="text-xs font-medium text-ink">{preset.label}</span>
                      </motion.button>
                    ))}
                  </div>
                </motion.div>
              ) : (
                /* ===== POPULATED CANVAS ===== */
                <motion.div
                  key="filled"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  {/* Mobile AI bar */}
                  <div className="flex md:hidden items-center gap-2 mb-4">
                    <Sparkles className="w-3 h-3 text-coral/60" />
                    <span className="text-[11px] font-medium text-ink-muted">AI Suggest:</span>
                    {PRESETS.map((preset) => (
                      <button
                        key={preset.label}
                        onClick={() => applyPreset(preset)}
                        className="text-[11px] px-2 py-1 rounded-md border border-coral/15 bg-coral/[0.03] text-ink-secondary hover:text-coral transition-colors"
                      >
                        {preset.label}
                      </button>
                    ))}
                  </div>

                  {/* Block grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    <AnimatePresence>
                      {canvasBlocks.map((block, i) => (
                        <motion.div
                          key={block.instanceId}
                          initial={{ opacity: 0, y: 16, scale: 0.94 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
                          transition={{
                            type: 'spring',
                            stiffness: 350,
                            damping: 26,
                            delay: i * 0.06,
                          }}
                          layout
                          className="relative"
                        >
                          {/* Block card */}
                          <motion.div
                            whileHover={{ y: -2, boxShadow: '0 6px 20px -8px rgba(0,0,0,0.08)' }}
                            className="bg-white rounded-xl border border-border-light overflow-hidden group cursor-pointer"
                            onClick={() => setExpandedBlock(expandedBlock === block.instanceId ? null : block.instanceId)}
                          >
                            {/* Block header */}
                            <div className="flex items-center justify-between px-3.5 py-2.5 border-b border-border-light/50 bg-warm-gray/30">
                              <div className="flex items-center gap-2">
                                <div className="w-6 h-6 rounded-md bg-coral/[0.06] flex items-center justify-center">
                                  <block.icon className="w-3 h-3 text-coral/70" />
                                </div>
                                <span className="text-[11px] font-semibold text-ink">{block.label}</span>
                              </div>
                              <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                <GripHorizontal className="w-3 h-3 text-ink-muted/40" />
                                <motion.button
                                  whileHover={{ scale: 1.1 }}
                                  whileTap={{ scale: 0.9 }}
                                  onClick={(e) => { e.stopPropagation(); removeBlock(block.instanceId); }}
                                  className="p-0.5 rounded hover:bg-ink/5 transition-colors"
                                >
                                  <X className="w-3 h-3 text-ink-muted/60" />
                                </motion.button>
                              </div>
                            </div>

                            {/* Block preview */}
                            <div className="p-3.5">
                              <block.preview />
                            </div>
                          </motion.div>

                          {/* Expanded overlay — doesn't affect layout */}
                          <AnimatePresence>
                            {expandedBlock === block.instanceId && (
                              <>
                                {/* Backdrop */}
                                <motion.div
                                  initial={{ opacity: 0 }}
                                  animate={{ opacity: 1 }}
                                  exit={{ opacity: 0 }}
                                  onClick={() => setExpandedBlock(null)}
                                  className="fixed inset-0 z-40 bg-ink/5 backdrop-blur-sm"
                                />
                                {/* Expanded pane */}
                                <motion.div
                                  initial={{ opacity: 0, scale: 0.95 }}
                                  animate={{ opacity: 1, scale: 1 }}
                                  exit={{ opacity: 0, scale: 0.95 }}
                                  transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                                  className="absolute top-0 left-0 right-0 z-50 bg-white rounded-2xl border border-border shadow-[0_20px_60px_-16px_rgba(0,0,0,0.12)] overflow-hidden"
                                  style={{ minHeight: '280px' }}
                                >
                                  <div className="flex items-center justify-between px-4 py-3 border-b border-border-light bg-warm-gray/30">
                                    <div className="flex items-center gap-2">
                                      <div className="w-7 h-7 rounded-lg bg-coral/[0.08] flex items-center justify-center">
                                        <block.icon className="w-4 h-4 text-coral/70" />
                                      </div>
                                      <div>
                                        <h4 className="text-sm font-semibold text-ink">{block.label}</h4>
                                        <p className="text-[11px] text-ink-muted">{block.desc}</p>
                                      </div>
                                    </div>
                                    <motion.button
                                      whileHover={{ scale: 1.1 }}
                                      whileTap={{ scale: 0.9 }}
                                      onClick={(e) => { e.stopPropagation(); setExpandedBlock(null); }}
                                      className="p-1.5 rounded-lg hover:bg-ink/5 transition-colors"
                                    >
                                      <X className="w-4 h-4 text-ink-muted" />
                                    </motion.button>
                                  </div>
                                  <div className="p-5">
                                    <div className="scale-110 origin-top">
                                      <block.preview />
                                    </div>
                                    <div className="flex items-center gap-2 mt-4 pt-4 border-t border-border-light">
                                      <Sparkles className="w-3 h-3 text-coral/60" />
                                      <span className="text-[11px] text-ink-muted">
                                        This block is fully editable — drag fields, add rows, customize views
                                      </span>
                                    </div>
                                  </div>
                                </motion.div>
                              </>
                            )}
                          </AnimatePresence>
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Caption */}
      <div className="mt-4 text-center">
        <p className="text-sm text-ink-muted">
          {canvasBlocks.length === 0 ? (
            <>
              Add blocks from the left, or try <Sparkles className="w-3 h-3 text-coral/60 inline" /> <span className="text-coral font-medium">AI Suggest</span> to auto-build a workspace
              <span className="mx-1.5">·</span>
              <span className="text-xs">点击左侧 Block 搭建工作台</span>
            </>
          ) : (
            <>
              Click any block to expand · Add more from the left palette · Drag to rearrange (coming soon)
              <span className="mx-1.5">·</span>
              <span className="text-xs">点击卡片展开详情</span>
            </>
          )}
        </p>
      </div>
    </div>
  );
}
