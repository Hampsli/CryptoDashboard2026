import { useCallback } from 'react'
import type { CoinMarket } from '../../../shared/types'
import { Sparkline } from '../../../shared/components/sparkline'

type Props = {
  coin:    CoinMarket
  index:   number
  onClick: () => void
}

const formatUSD = (n: number): string =>
  new Intl.NumberFormat('en-US', {
    style:                 'currency',
    currency:              'USD',
    maximumFractionDigits: n < 1 ? 6 : 2,
  }).format(n)

const formatMarketCap = (n: number): string => {
  if (n >= 1e12) return `$${(n / 1e12).toFixed(2)}T`
  if (n >= 1e9)  return `$${(n / 1e9).toFixed(1)}B`
  if (n >= 1e6)  return `$${(n / 1e6).toFixed(1)}M`
  return `$${n.toLocaleString()}`
}

export const Row = ({ coin, index, onClick }: Props) => {
  const isPositive = coin.price_change_percentage_24h >= 0

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      onClick()
    }
  }, [onClick])

  return (
    <tr
      role="row"
      aria-rowindex={index + 1}
      tabIndex={0}
      onClick={onClick}
      onKeyDown={handleKeyDown}
      className="cursor-pointer transition-colors
                 hover:bg-[var(--color-surface-subtle)]
                 focus:outline-none focus:bg-[var(--color-surface-subtle)]
                 focus:ring-inset focus:ring-2 focus:ring-[#7c3aed]"
    >
      <td className="px-4 py-3 tabular-nums font-light
                     text-[var(--color-text-muted)]">
        {coin.market_cap_rank}
      </td>

      <td className="px-4 py-3">
        <div className="flex items-center gap-2">
          <img
            src={coin.image}
            alt={coin.name}
            width={24}
            height={24}
            className="rounded-full"
          />
          <span className="font-medium text-[var(--color-text-primary)]">
            {coin.name}
          </span>
          <span className="text-[var(--color-text-muted)] uppercase text-xs">
            {coin.symbol}
          </span>
        </div>
      </td>

      <td className="px-4 py-3 tabular-nums
                     text-[var(--color-text-primary)]">
        {formatUSD(coin.current_price)}
      </td>

      <td className="px-4 py-3">
        <span className={`inline-block px-2 py-0.5 rounded-full
                          text-xs font-medium tabular-nums ${
          isPositive
            ? 'text-[var(--color-positive-text)] bg-[var(--color-positive-bg)]'
            : 'text-[var(--color-negative-text)] bg-[var(--color-negative-bg)]'
        }`}>
          {isPositive ? '+' : ''}
          {coin.price_change_percentage_24h.toFixed(2)}%
        </span>
      </td>

      <td className="px-4 py-3 tabular-nums
                     text-[var(--color-text-secondary)]">
        {formatMarketCap(coin.market_cap)}
      </td>

      <td className="px-4 py-3">
        <Sparkline
          data={coin.sparkline_in_7d.price}
          positive={isPositive}
        />
      </td>
    </tr>
  )
}