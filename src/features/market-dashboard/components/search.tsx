type Props = {
  value:    string
  onChange: (value: string) => void
}

export const CoinSearch = ({ value, onChange }: Props) => (
  <div className="relative mb-4">
    <svg
      className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4"
      fill="none"
      stroke="var(--color-text-subtle)"
      strokeWidth={2}
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.35-4.35" />
    </svg>
    <input
      id="coin-search"
      type="search"
      value={value}
      onChange={e => onChange(e.target.value)}
      placeholder="Search by name or symbol..."
      aria-label="Search cryptocurrencies"
      className="w-full pl-9 pr-4 py-2 text-sm
                 border border-[var(--color-border-default)]
                 rounded-xl bg-[var(--color-surface-input)]
                 text-[var(--color-text-primary)]
                 placeholder:text-[var(--color-text-subtle)]
                 focus:outline-none focus:ring-2 focus:ring-[#7c3aed]
                 focus:border-transparent transition-all"
    />
  </div>
)