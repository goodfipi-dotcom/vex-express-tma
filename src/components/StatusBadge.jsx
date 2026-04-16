export default function StatusBadge({ active }) {
  if (active) {
    return (
      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-lime/15 text-lime text-xs font-semibold border border-lime/30">
        <span className="relative flex w-1.5 h-1.5">
          <span className="absolute inline-flex h-full w-full rounded-full bg-lime opacity-70 animate-ping" />
          <span
            className="relative inline-flex rounded-full h-1.5 w-1.5 bg-lime"
            style={{ boxShadow: '0 0 6px rgba(57, 255, 20, 0.8)' }}
          />
        </span>
        Активна
      </span>
    )
  }

  return (
    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-surface-3 text-text-muted text-xs font-semibold border border-border">
      <span className="w-1.5 h-1.5 rounded-full bg-text-muted" />
      Не активна
    </span>
  )
}
