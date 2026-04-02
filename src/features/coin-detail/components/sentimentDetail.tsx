type Props = {
  up:   number
  down: number
}

export const SentimentVotes = ({ up, down }: Props) => {
  if (!up && !down) return null

  const total     = up + down
  const upPct     = Math.round((up / total) * 100)
  const downPct   = 100 - upPct
  const isBullish = upPct >= 50

  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <p className="text-xs font-medium uppercase tracking-widest
                      text-[var(--color-text-muted)]">
          Community sentiment
        </p>
        <span className={`text-xs font-medium ${
          isBullish
            ? 'text-[var(--color-positive-text)]'
            : 'text-[var(--color-negative-text)]'
        }`}>
          {isBullish ? 'Bullish' : 'Bearish'}
        </span>
      </div>

      {/* Barra combinada */}
      <div
        className="w-full h-2 rounded-full overflow-hidden flex"
        role="meter"
        aria-valuenow={upPct}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={`${upPct}% bullish sentiment`}
      >
        <div
          className="h-full transition-all duration-500
                     bg-[var(--color-positive-text)]"
          style={{ width: `${upPct}%` }}
        />
        <div
          className="h-full flex-1
                     bg-[var(--color-negative-text)]"
        />
      </div>

      {/* Labels */}
      <div className="flex justify-between mt-1.5">
        <span className="text-xs text-[var(--color-positive-text)]
                         font-medium tabular-nums">
          {upPct}% bullish
        </span>
        <span className="text-xs text-[var(--color-negative-text)]
                         font-medium tabular-nums">
          {downPct}% bearish
        </span>
      </div>
    </div>
  )
}