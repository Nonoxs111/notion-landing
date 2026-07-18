export default function SectionBadge({ children }) {
  return (
    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-border-light bg-white/60 text-xs font-medium text-ink-secondary tracking-wider uppercase mb-6">
      <span className="w-1.5 h-1.5 rounded-full bg-coral"></span>
      {children}
    </div>
  );
}
