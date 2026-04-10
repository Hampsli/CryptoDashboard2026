type Props = { rows?: number };

export const SkeletonTable = ({ rows = 20 }: Props) => (
  <div role="status" aria-label="Loading market data">
    <div className="animate-pulse space-y-3">
      {Array.from({ length: rows }).map((_, i) => (
        <div 
          key={i} 
          className="flex items-center gap-4 px-4 py-3 rounded-xl bg-[var(--color-surface-subtle)]"
        >
          <div className="w-6 h-4 bg-[var(--color-brand-200)] rounded opacity-40" />
          
          <div className="w-8 h-8 bg-[var(--color-brand-200)] rounded-full opacity-40" />
          
          <div className="flex-1 h-4 bg-[var(--color-brand-200)] rounded opacity-40" />
          
          <div className="w-24 h-4 bg-[var(--color-brand-200)] rounded opacity-40" />
          
          <div className="w-16 h-4 bg-[var(--color-brand-200)] rounded opacity-40" />
          
          <div className="w-24 h-4 bg-[var(--color-brand-200)] rounded opacity-40" />
          
          <div className="w-20 h-6 bg-[var(--color-brand-200)] rounded opacity-40" />
        </div>
      ))}
    </div>
    <span className="sr-only">Loading...</span>
  </div>
);