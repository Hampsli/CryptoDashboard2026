import { useMemo } from 'react'
import type { CoinMarket, SortKey, SortDirection } from '../../../shared/types'
import { Row } from './row'
import { EmptyPage } from '../../../shared/components/EmptyPage'


type Props = {
  coins:      CoinMarket[]
  sortKey:    SortKey
  sortDir:    SortDirection
  onSort:     (key: SortKey) => void
  onRowClick: (id: string) => void
  search:     string
}

const COLUMNS: { label: string; key: SortKey | null }[] = [
  { label: '#',       key: 'market_cap_rank' },
  { label: 'Name',    key: null },
  { label: 'Price',   key: 'current_price' },
  { label: '24h %',   key: 'price_change_percentage_24h' },
  { label: 'Mkt Cap', key: 'market_cap' },
  { label: '7d',      key: null },
]

type SortIconProps = { active: boolean; direction: SortDirection }

const SortIcon = ({ active, direction }: SortIconProps) => (
  <svg
    className={`inline w-3 h-3 ml-1 ${
      active ? 'text-[#7c3aed]' : 'text-[var(--color-border-strong)]'
    }`}
    fill="none" stroke="currentColor" strokeWidth={2}
    viewBox="0 0 24 24" aria-hidden="true"
  >
    <path d={direction === 'asc' && active ? 'M5 15l7-7 7 7' : 'M19 9l-7 7-7-7'} />
  </svg>
)

export const Table = ({ coins, sortKey, sortDir, onSort, onRowClick,search }: Props) => {
  const sorted = useMemo(() => {
    return [...coins].sort((a, b) => {
      const av = a[sortKey] ?? 0
      const bv = b[sortKey] ?? 0
      return sortDir === 'asc' ? (av > bv ? 1 : -1) : (av < bv ? 1 : -1)
    })
  }, [coins, sortKey, sortDir])

  if (sorted.length === 0) return <EmptyPage search={search} />

  return (
    <div className="overflow-x-auto rounded-2xl border
                    border-[var(--color-border-default)]
                    bg-[var(--color-surface-card)]">
      <table
        className="w-full text-sm text-left"
        role="grid"
        aria-label="Cryptocurrency "
        aria-rowcount={sorted.length}
      >
        <thead className="bg-[var(--color-surface-subtle)]
                          border-b border-[var(--color-border-default)]">
          <tr>
            {COLUMNS.map(col => (
              <th
                key={col.label}
                scope="col"
                className="px-4 py-3 font-medium whitespace-nowrap
                           text-[10px] uppercase tracking-widest
                           text-[var(--color-text-muted)]"
                aria-sort={
                  col.key && sortKey === col.key
                    ? sortDir === 'asc' ? 'ascending' : 'descending'
                    : undefined
                }
              >
                {col.key ? (
                  <button
                    onClick={() => onSort(col.key!)}
                    className="flex items-center
                               hover:text-[var(--color-text-primary)]
                               focus:outline-none focus:underline"
                  >
                    {col.label}
                    <SortIcon
                      active={sortKey === col.key}
                      direction={sortDir}
                    />
                  </button>
                ) : col.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-[var(--color-border-default)]">
          {sorted.map((coin, index) => (
            <Row
              key={coin.id}
              coin={coin}
              index={index}
              onClick={() => onRowClick(coin.id)}
            />
          ))}
        </tbody>
      </table>
    </div>
  )
}