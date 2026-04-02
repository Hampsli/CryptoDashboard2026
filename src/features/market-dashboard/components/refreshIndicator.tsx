import { useState, useEffect, useCallback, useRef } from 'react'

type Props = {
  intervalMs: number
  onRefresh:  () => void
  isLoading:  boolean
}

const TOTAL = 60

export const RefreshIndicator = ({ intervalMs, onRefresh, isLoading }: Props) => {
  const [seconds, setSeconds]         = useState(TOTAL)
  const [justRefreshed, setJustRefreshed] = useState(false)
  // eslint-disable-next-line react-hooks/purity
  const startRef = useRef(Date.now())

  // Countdown basado en tiempo real — sin setState síncrono en el effect
  useEffect(() => {
    startRef.current = Date.now()

    const tick = setInterval(() => {
      const elapsed = Math.floor((Date.now() - startRef.current) / 1000)
      const remaining = Math.max(TOTAL - elapsed, 0)
      setSeconds(remaining)
    }, 1000)

    return () => clearInterval(tick)
  }, [intervalMs])

  // Reset cuando React Query refresca
  useEffect(() => {
    if (!isLoading) return

    startRef.current = Date.now()
    setJustRefreshed(true)

    const t = setTimeout(() => setJustRefreshed(false), 2000)
    return () => clearTimeout(t)
  }, [isLoading])

  const handleRefresh = useCallback(() => {
    startRef.current = Date.now()
    onRefresh()
  }, [onRefresh])

  const progress = (seconds / TOTAL) * 100

  return (
    <div className="flex items-center gap-2">
      <div className="flex items-center gap-1.5">
        {justRefreshed ? (
          <span className="text-xs text-[var(--color-positive-text)]
                           font-medium flex items-center gap-1">
            <svg className="w-3 h-3" fill="none" stroke="currentColor"
                 strokeWidth={2.5} viewBox="0 0 24 24" aria-hidden="true">
              <path d="M5 13l4 4L19 7" />
            </svg>
            Data refreshed
          </span>
        ) : (
          <span className="text-xs text-[var(--color-text-subtle)]">
            Refreshing in
            <span className="ml-1 font-medium tabular-nums
                             text-[var(--color-text-muted)]">
              {seconds}s
            </span>
          </span>
        )}
      </div>

      <div
        className="w-16 h-1 rounded-full overflow-hidden
                   bg-[var(--color-border-default)]"
        role="progressbar"
        aria-valuenow={seconds}
        aria-valuemin={0}
        aria-valuemax={TOTAL}
        aria-label={`Auto-refresh in ${seconds} seconds`}
      >
        <div
          className="h-full rounded-full transition-all duration-1000
                     bg-[#7c3aed]"
          style={{ width: `${progress}%` }}
        />
      </div>

      <button
        onClick={handleRefresh}
        disabled={isLoading}
        aria-label="Refresh market data"
        className="p-1.5 rounded-lg transition-all
                   text-[var(--color-text-muted)]
                   hover:bg-[var(--color-surface-subtle)]
                   hover:text-[#7c3aed]
                   focus:outline-none focus:ring-2 focus:ring-[#7c3aed]
                   disabled:opacity-40 disabled:cursor-not-allowed"
      >
        <svg
          className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin' : ''}`}
          fill="none" stroke="currentColor"
          strokeWidth={2} viewBox="0 0 24 24" aria-hidden="true"
        >
          <path d="M21 12a9 9 0 11-6.219-8.56" />
        </svg>
      </button>
    </div>
  )
}