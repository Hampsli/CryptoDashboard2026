import type { CoinMarket } from '../../../shared/types'

type Props = {
  coins: CoinMarket[]
}

export const MarketSentimentBar = ({ coins }: Props) => {
  if (!coins.length) return null

  const positive = coins.filter(c => c.price_change_percentage_24h > 0)
  const negative = coins.filter(c => c.price_change_percentage_24h < 0)
  const isBullish = positive.length >= negative.length

  const topMover = [...coins].sort(
    (a, b) => b.price_change_percentage_24h - a.price_change_percentage_24h
  )[0]

  const biggestDrop = [...coins].sort(
    (a, b) => a.price_change_percentage_24h - b.price_change_percentage_24h
  )[0]

  return (
    <div className="flex flex-wrap items-center gap-x-6 gap-y-2 mb-4">
      {/* Tendencia global */}
      <div className="flex items-center gap-2">
        <span className={`inline-block w-1.5 h-1.5 rounded-full ${
          isBullish ? 'bg-[var(--color-positive-text)]' : 'bg-[var(--color-negative-text)]'
        }`} />
        <span className="text-xs text-[var(--color-text-muted)]">
          Market trending
          <span className={`ml-1 font-medium ${
            isBullish
              ? 'text-[var(--color-positive-text)]'
              : 'text-[var(--color-negative-text)]'
          }`}>
            {isBullish ? 'UP' : 'DOWN'}
          </span>
          <span className="ml-1 text-[var(--color-text-subtle)]">
            · {positive.length} of {coins.length} assets positive
          </span>
        </span>
      </div>

      {/* Divider */}
      <span className="hidden sm:block w-px h-3
                        bg-[var(--color-border-default)]" />

      {/* Top mover */}
      <div className="flex items-center gap-1.5 text-xs
                      text-[var(--color-text-muted)]">
        <span>Top mover</span>
        <img
          src={topMover.image}
          alt={topMover.name}
          width={14}
          height={14}
          className="rounded-full"
        />
        <span className="font-medium text-[var(--color-text-primary)]">
          {topMover.symbol.toUpperCase()}
        </span>
        <span className="text-[var(--color-positive-text)] font-medium">
          +{topMover.price_change_percentage_24h.toFixed(2)}%
        </span>
      </div>

      {/* Divider */}
      <span className="hidden sm:block w-px h-3
                        bg-[var(--color-border-default)]" />

      {/* Biggest drop */}
      <div className="flex items-center gap-1.5 text-xs
                      text-[var(--color-text-muted)]">
        <span>Biggest drop</span>
        <img
          src={biggestDrop.image}
          alt={biggestDrop.name}
          width={14}
          height={14}
          className="rounded-full"
        />
        <span className="font-medium text-[var(--color-text-primary)]">
          {biggestDrop.symbol.toUpperCase()}
        </span>
        <span className="text-[var(--color-negative-text)] font-medium">
          {biggestDrop.price_change_percentage_24h.toFixed(2)}%
        </span>
      </div>
    </div>
  )
}