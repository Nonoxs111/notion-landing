import { useState, useCallback, useRef } from 'react';
import { motion, AnimatePresence, Reorder } from 'framer-motion';
import { Table2, Columns3, Calendar, FileText, ChartBar, Sparkles, X, GripVertical, Plus, Trash2, ArrowUpDown } from 'lucide-react';

// ── Block definitions with realistic Notion-style previews ──

const BLOCKS = [
  {
    id: 'table',
    icon: Table2,
    label: 'Table',
    desc: 'Database with rows & columns',
    preview: () => (
      <div className="border border-border-light rounded-lg overflow-hidden">
        {/* Toolbar */}
        <div className="flex items-center gap-3 px-3 py-1.5 bg-warm-gray/50 border-b border-border-light">
          <span className="text-[10px] font-semibold text-ink">Tasks</span>
          <span className="text-[9px] text-ink-muted bg-ink/5 px-1.5 py-0.5 rounded">5 fields</span>
          <span className="text-[9px] text-ink-muted ml-auto">12 rows</span>
        </div>
        {/* Table header */}
        <div className="grid grid-cols-4 gap-px bg-border-light text-[10px] font-semibold text-ink-secondary">
          {['Task name', 'Status', 'Assignee', 'Due date'].map((h) => (
            <div key={h} className="bg-warm-gray px-3 py-1.5">{h}</div>
          ))}
        </div>
        {/* Table rows */}
        {[
          ['Design system', 'Done', 'Li Wei', 'Jul 12'],
          ['User auth flow', 'In progress', 'Wang Fang', 'Jul 18'],
          ['API docs', 'Review', 'Zhang Yu', 'Jul 20'],
          ['Landing page', 'In progress', 'Li Wei', 'Jul 22'],
        ].map((row, i) => (
          <div key={i} className="grid grid-cols-4 gap-px bg-border-light text-[11px]">
            {row.map((cell, j) => (
              <div key={j} className={`bg-white px-3 py-1.5 ${j === 0 ? 'text-ink font-medium' : 'text-ink-secondary'}`}>{cell}</div>
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
    desc: 'Kanban view of any database',
    preview: () => (
      <div className="grid grid-cols-3 gap-3">
        {[
          { title: 'To Do', count: 3, cards: ['Research competitors', 'Draft wireframes', 'Setup CI/CD'] },
          { title: 'In Progress', count: 3, cards: ['Design system', 'API integration', 'User testing'] },
          { title: 'Done', count: 2, cards: ['Project kickoff', 'Tech stack doc'] },
        ].map((col) => (
          <div key={col.title} className="bg-warm-gray/70 rounded-xl p-2.5">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-semibold text-ink">{col.title}</span>
              <span className="text-[10px] text-ink-muted bg-white/70 px-1.5 py-0.5 rounded-full">{col.count}</span>
            </div>
            <div className="space-y-1.5">
              {col.cards.map((card, i) => (
                <div key={i} className="bg-white rounded-lg px-2.5 py-2 text-[10px] text-ink-secondary shadow-sm border border-border-light cursor-default hover:border-ink/10 transition-colors">
                  {card}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    ),
  },
  {
    id: 'calendar',
    icon: Calendar,
    label: 'Calendar',
    desc: 'Date-driven database view',
    preview: () => {
      const events = [3, 7, 14, 18, 22, 25];
      const dayNames = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
      return (
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-semibold text-ink">July 2026</span>
            <span className="text-[9px] text-ink-muted">6 events</span>
          </div>
          <div className="grid grid-cols-7 gap-0.5 mb-1">
            {dayNames.map((d) => (
              <div key={d} className="text-center text-[9px] text-ink-muted/60 font-medium py-0.5">{d}</div>
            ))}
          </div>
          <div className="grid grid-cols-7 gap-0.5">
            {[...Array(31)].map((_, i) => (
              <div
                key={i}
                className={`aspect-square rounded-sm flex items-center justify-center text-[10px] transition-colors ${
                  events.includes(i + 1)
                    ? 'bg-coral text-white font-semibold'
                    : 'text-ink-secondary hover:bg-warm-gray'
                }`}
              >
                {i + 1}
              </div>
            ))}
          </div>
        </div>
      );
    },
  },
  {
    id: 'doc',
    icon: FileText,
    label: 'Document',
    desc: 'Rich text pages & wikis',
    preview: () => (
      <div className="space-y-3">
        {/* Title */}
        <h3 className="text-base font-bold text-ink">Project Overview</h3>

        {/* Text paragraph */}
        <p className="text-[11px] text-ink-secondary leading-relaxed">
          This workspace tracks the Q3 product launch. All tasks, timelines, and documentation live here as connected blocks — not separate tools.
        </p>

        {/* H2 heading */}
        <h4 className="text-[13px] font-semibold text-ink mt-3">Key Objectives</h4>

        {/* Bullet list */}
        <ul className="space-y-1 ml-1">
          {['Ship the new dashboard by Aug 15', 'Complete user testing with 50 participants', 'Publish API documentation v2'].map((item, i) => (
            <li key={i} className="flex items-start gap-2 text-[11px] text-ink-secondary">
              <span className="mt-0.5 w-1 h-1 rounded-full bg-coral/60 flex-shrink-0" />
              {item}
            </li>
          ))}
        </ul>

        {/* Linked database reference */}
        <div className="flex items-center gap-2 mt-3 p-2.5 rounded-lg border border-coral/10 bg-coral/[0.02]">
          <Table2 className="w-3.5 h-3.5 text-coral/60" />
          <span className="text-[11px] text-ink-secondary font-medium">Tasks database</span>
          <span className="text-[10px] text-ink-muted">↗ linked inline</span>
        </div>
      </div>
    ),
  },
  {
    id: 'timeline',
    icon: ChartBar,
    label: 'Timeline',
    desc: 'Gantt charts & roadmaps',
    preview: () => (
      <div className="space-y-2">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-[11px] font-semibold text-ink">Q3 Roadmap</span>
          <span className="text-[9px] text-ink-muted">Jul — Sep</span>
        </div>
        <div className="flex text-[9px] text-ink-muted/50 border-b border-border-light pb-1 mb-1">
          <div className="w-24 flex-shrink-0">Task</div>
          <div className="flex-1 flex">
            {['Jul', 'Aug', 'Sep'].map((m) => (
              <div key={m} className="flex-1 text-center border-l border-border-light/50">{m}</div>
            ))}
          </div>
        </div>
        {[
          { label: 'Design system', start: 0, width: 35, color: 'bg-coral/30' },
          { label: 'Core features', start: 20, width: 50, color: 'bg-coral/50' },
          { label: 'User testing', start: 55, width: 25, color: 'bg-coral/40' },
          { label: 'Launch prep', start: 70, width: 25, color: 'bg-coral/60' },
        ].map((bar, i) => (
          <div key={i} className="flex items-center gap-2">
            <span className="text-[10px] text-ink-secondary w-24 flex-shrink-0 truncate">{bar.label}</span>
            <div className="flex-1 h-5 bg-warm-gray rounded-sm relative">
              <div
                className={`absolute top-0 h-full ${bar.color} rounded-sm`}
                style={{ left: `${bar.start}%`, width: `${bar.width}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    ),
  },
];

// ── Preset: what blocks form a complete workspace ──

const PRESETS = [
  {
    label: 'Project Management',
    desc: '项目管理套件',
    blocks: ['table', 'board', 'calendar', 'timeline'],
  },
  {
    label: 'Knowledge Base',
    desc: '知识库套件',
    blocks: ['doc', 'table', 'timeline'],
  },
];

// ── Component ──

export default function ProductDemo() {
  const [canvasBlocks, setCanvasBlocks] = useState([]);
  const [expandedBlock, setExpandedBlock] = useState(null);
  const [dragOver, setDragOver] = useState(false);
  const canvasRef = useRef(null);

  // Drag from palette → canvas — pass only id, look up full definition on drop
  const handleDragStart = useCallback((e, blockDef) => {
    e.dataTransfer.setData('text/plain', blockDef.id);
    e.dataTransfer.effectAllowed = 'copy';
  }, []);

  const handleDragOver = useCallback((e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'copy';
    setDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e) => {
    if (e.currentTarget.contains(e.relatedTarget)) return;
    setDragOver(false);
  }, []);

  const addBlockById = useCallback((blockId) => {
    const def = BLOCKS.find((b) => b.id === blockId);
    if (!def) return;
    const instanceId = `${def.id}-${Date.now()}`;
    setCanvasBlocks((prev) => [...prev, { ...def, instanceId }]);
  }, []);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    setDragOver(false);
    const blockId = e.dataTransfer.getData('text/plain');
    if (!blockId) return;
    addBlockById(blockId);
  }, [addBlockById]);

  // Click to add
  const addBlock = useCallback((blockDef) => {
    const instanceId = `${blockDef.id}-${Date.now()}`;
    setCanvasBlocks((prev) => [...prev, { ...blockDef, instanceId }]);
  }, []);

  const removeBlock = useCallback((instanceId) => {
    setCanvasBlocks((prev) => prev.filter((b) => b.instanceId !== instanceId));
    if (expandedBlock === instanceId) setExpandedBlock(null);
  }, [expandedBlock]);

  // Apply preset — fill entire canvas
  const applyPreset = useCallback((preset) => {
    const newBlocks = preset.blocks.map((blockId) => {
      const def = BLOCKS.find((b) => b.id === blockId);
      return { ...def, instanceId: `${def.id}-${Date.now()}-${Math.random().toString(36).slice(2, 6)}` };
    });
    setCanvasBlocks(newBlocks);
    setExpandedBlock(null);
  }, []);

  const clearCanvas = useCallback(() => {
    setCanvasBlocks([]);
    setExpandedBlock(null);
  }, []);

  return (
    <div className="w-full max-w-5xl mx-auto">
      {/* Demo Window */}
      <div className="relative bg-white rounded-2xl border border-border shadow-[0_8px_40px_-12px_rgba(0,0,0,0.06)] overflow-hidden">
        {/* ── Window Header ── */}
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
              <span className="text-[10px] text-ink-muted/40">· {canvasBlocks.length} blocks</span>
            )}
          </div>
          <div className="flex items-center gap-1">
            {canvasBlocks.length > 0 && (
              <motion.button
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={clearCanvas}
                className="flex items-center gap-1 px-2 py-1 text-[11px] text-ink-muted hover:text-ink rounded-md hover:bg-ink/5 transition-all"
              >
                <Trash2 className="w-3 h-3" />
              </motion.button>
            )}
          </div>
        </div>

        {/* ── Main area: Palette + Canvas ── */}
        <div className="flex flex-col md:flex-row">
          {/* ===== LEFT PALETTE ===== */}
          <div className="w-full md:w-[184px] border-b md:border-b-0 md:border-r border-border-light bg-warm-gray/20 p-3 flex md:flex-col gap-1.5 overflow-x-auto md:overflow-visible flex-shrink-0">
            <span className="text-[10px] font-semibold text-ink-muted/60 uppercase tracking-wider hidden md:block mb-0.5 px-1">
              Drag blocks ↓
            </span>

            {BLOCKS.map((block) => (
              <div
                key={block.id}
                draggable
                onDragStart={(e) => handleDragStart(e, block)}
                onClick={() => addBlock(block)}
                className="flex md:flex-row flex-col items-center gap-2 px-2.5 py-2 rounded-lg border border-border-light bg-white hover:border-coral/20 hover:bg-coral/[0.02] transition-all cursor-grab active:cursor-grabbing flex-shrink-0 group select-none"
                title={`Drag or click to add ${block.label}`}
              >
                <div className="w-7 h-7 rounded-md bg-coral/[0.06] flex items-center justify-center flex-shrink-0 group-hover:bg-coral/[0.1] transition-colors">
                  <block.icon className="w-3.5 h-3.5 text-coral/70" />
                </div>
                <div className="hidden md:block min-w-0">
                  <div className="text-[11px] font-semibold text-ink">{block.label}</div>
                  <div className="text-[9px] text-ink-muted/70 leading-tight">{block.desc}</div>
                </div>
                <GripVertical className="w-3 h-3 text-ink-muted/25 hidden md:block ml-auto flex-shrink-0" />
              </div>
            ))}

            {/* Divider */}
            <div className="w-px md:w-full h-auto md:h-px bg-border-light my-1 flex-shrink-0" />

            {/* AI presets */}
            <span className="text-[10px] font-semibold text-ink-muted/60 uppercase tracking-wider hidden md:block mb-0.5 px-1 mt-1">
              <Sparkles className="w-3 h-3 text-coral/50 inline mr-1" />
              AI Fill
            </span>
            {PRESETS.map((preset) => (
              <motion.button
                key={preset.label}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => applyPreset(preset)}
                className="flex items-center gap-2 px-2.5 py-2 rounded-lg border border-coral/10 bg-coral/[0.02] hover:bg-coral/[0.06] hover:border-coral/20 transition-all text-left flex-shrink-0 group w-full"
              >
                <Sparkles className="w-3.5 h-3.5 text-coral/50 group-hover:text-coral transition-colors flex-shrink-0" />
                <div className="min-w-0 hidden md:block">
                  <div className="text-[11px] font-medium text-ink">{preset.label}</div>
                  <div className="text-[9px] text-ink-muted/70">{preset.desc}</div>
                </div>
              </motion.button>
            ))}
          </div>

          {/* ===== RIGHT CANVAS ===== */}
          <div
            ref={canvasRef}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            className={`flex-1 p-4 md:p-6 relative transition-colors duration-200 ${
              dragOver ? 'bg-coral/[0.03]' : ''
            }`}
          >
            {/* Dotted grid */}
            <div
              className="absolute inset-0 opacity-[0.025] pointer-events-none"
              style={{
                backgroundImage: 'radial-gradient(circle, #1A1A1A 1px, transparent 1px)',
                backgroundSize: '20px 20px',
              }}
            />

            {/* Drag overlay hint */}
            <AnimatePresence>
              {dragOver && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-2 border-2 border-dashed border-coral/20 rounded-2xl flex items-center justify-center z-10 pointer-events-none"
                >
                  <span className="text-sm text-coral/60 font-medium">Drop block here</span>
                </motion.div>
              )}
            </AnimatePresence>

            {canvasBlocks.length === 0 ? (
              /* ===== EMPTY CANVAS ===== */
              <div className="flex flex-col items-center justify-center min-h-[380px]">
                <motion.div
                  animate={{ scale: [1, 1.04, 1] }}
                  transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                  className="w-14 h-14 rounded-2xl border-2 border-dashed border-border flex items-center justify-center mb-4"
                >
                  <Plus className="w-5 h-5 text-ink-muted/40" />
                </motion.div>
                <p className="text-sm text-ink font-medium">Build your workspace</p>
                <p className="text-xs text-ink-muted mt-1 mb-5 text-center max-w-xs">
                  Drag blocks from the left or click them — each block is a building block of your software
                </p>

                {/* Quick start */}
                <div className="flex gap-2.5 flex-wrap justify-center">
                  {PRESETS.map((preset) => (
                    <motion.button
                      key={preset.label}
                      whileHover={{ scale: 1.03, y: -1 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => applyPreset(preset)}
                      className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-coral/15 bg-coral/[0.03] hover:bg-coral/[0.07] transition-all group"
                    >
                      <Sparkles className="w-4 h-4 text-coral/60 group-hover:text-coral transition-colors" />
                      <div className="text-left">
                        <div className="text-xs font-semibold text-ink">{preset.label}</div>
                        <div className="text-[10px] text-ink-muted/70">{preset.desc}</div>
                      </div>
                    </motion.button>
                  ))}
                </div>

                <p className="text-[11px] text-ink-muted/50 mt-5">
                  拖拽或点击左侧模块，搭建属于你的工具
                </p>
              </div>
            ) : (
              /* ===== POPULATED CANVAS ===== */
              <div>
                {/* Page header */}
                <div className="mb-5 pb-3 border-b border-border-light/50">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-coral" />
                    <h3 className="text-base font-semibold text-ink">
                      {canvasBlocks.some(b => b.id === 'table') && canvasBlocks.some(b => b.id === 'board')
                        ? 'Project Management'
                        : canvasBlocks.some(b => b.id === 'doc')
                          ? 'Knowledge Base'
                          : 'My Workspace'}
                    </h3>
                  </div>
                  <p className="text-xs text-ink-muted mt-1.5 ml-6">
                    {canvasBlocks.length} blocks · Click a block to expand · Drag ↕ to reorder
                  </p>
                </div>

                {/* Reorderable block list */}
                <Reorder.Group
                  axis="y"
                  values={canvasBlocks}
                  onReorder={setCanvasBlocks}
                  className="space-y-3"
                >
                  <AnimatePresence mode="popLayout">
                    {canvasBlocks.map((block) => (
                      <Reorder.Item
                        key={block.instanceId}
                        value={block}
                        initial={{ opacity: 0, y: 12, scale: 0.97 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.15 } }}
                        whileDrag={{
                          scale: 1.02,
                          boxShadow: '0 12px 40px -12px rgba(0,0,0,0.12)',
                          zIndex: 50,
                        }}
                        transition={{ type: 'spring', stiffness: 400, damping: 28 }}
                        className="relative"
                      >
                        {/* Block card */}
                        <motion.div
                          whileHover={{ boxShadow: '0 4px 16px -6px rgba(0,0,0,0.06)' }}
                          className="bg-white rounded-xl border border-border-light overflow-hidden group cursor-pointer transition-shadow"
                          onClick={() => setExpandedBlock(expandedBlock === block.instanceId ? null : block.instanceId)}
                        >
                          {/* Header */}
                          <div className="flex items-center justify-between px-3.5 py-2 border-b border-border-light/50 bg-warm-gray/20">
                            <div className="flex items-center gap-2">
                              <div
                                className="w-5 h-5 rounded-md bg-coral/[0.06] flex items-center justify-center cursor-grab active:cursor-grabbing"
                                onPointerDown={(e) => {
                                  // Let Reorder.Item handle the drag
                                }}
                              >
                                <GripVertical className="w-3 h-3 text-ink-muted/30 group-hover:text-ink-muted/60 transition-colors" />
                              </div>
                              <div className="w-5 h-5 rounded bg-coral/[0.06] flex items-center justify-center">
                                <block.icon className="w-3 h-3 text-coral/70" />
                              </div>
                              <span className="text-[11px] font-semibold text-ink">{block.label}</span>
                            </div>
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={(e) => { e.stopPropagation(); removeBlock(block.instanceId); }}
                              className="p-1 rounded hover:bg-ink/5 opacity-0 group-hover:opacity-100 transition-all"
                            >
                              <X className="w-3 h-3 text-ink-muted/60" />
                            </motion.button>
                          </div>

                          {/* Preview */}
                          <div className="p-4">
                            <block.preview />
                          </div>
                        </motion.div>

                        {/* Expanded overlay */}
                        <AnimatePresence>
                          {expandedBlock === block.instanceId && (
                            <>
                              <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                onClick={() => setExpandedBlock(null)}
                                className="fixed inset-0 z-40 bg-ink/[0.02] backdrop-blur-[2px]"
                              />
                              <motion.div
                                initial={{ opacity: 0, scale: 0.96 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.96 }}
                                transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                                className="absolute top-0 left-0 right-0 z-50 bg-white rounded-2xl border border-border shadow-[0_20px_60px_-16px_rgba(0,0,0,0.12)] overflow-hidden"
                                style={{ minHeight: '300px' }}
                              >
                                <div className="flex items-center justify-between px-4 py-3 border-b border-border-light bg-warm-gray/20">
                                  <div className="flex items-center gap-2.5">
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
                                  <div className="flex items-start gap-2 mt-5 pt-4 border-t border-border-light">
                                    <Sparkles className="w-3.5 h-3.5 text-coral/60 mt-0.5 flex-shrink-0" />
                                    <div>
                                      <p className="text-[11px] text-ink-secondary font-medium">Fully editable block</p>
                                      <p className="text-[10px] text-ink-muted mt-0.5">
                                        In Notion, every block is a live component — edit data, change views, connect to other blocks. Your software, your way.
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              </motion.div>
                            </>
                          )}
                        </AnimatePresence>
                      </Reorder.Item>
                    ))}
                  </AnimatePresence>
                </Reorder.Group>

                {/* Add more hint */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="mt-4 flex items-center justify-center"
                >
                  <div className="border-2 border-dashed border-border rounded-xl px-5 py-3 flex items-center gap-2 text-xs text-ink-muted">
                    <Plus className="w-3.5 h-3.5" />
                    Drag more blocks here or click them in the left panel
                  </div>
                </motion.div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ── Caption ── */}
      <div className="mt-4 text-center">
        <p className="text-sm text-ink-muted">
          <span className="text-ink font-medium">Notion</span> lets you build software by combining blocks — like LEGO.
          <span className="mx-1.5">·</span>
          <span className="text-xs">像搭积木一样组合 Table、Board、Calendar、Timeline 来创造工具</span>
        </p>
      </div>
    </div>
  );
}
