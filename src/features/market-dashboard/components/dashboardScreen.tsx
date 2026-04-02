import { useState, useEffect } from 'react'
import type { SortDirection, SortKey } from '../../../shared/types'
import { useCoins } from '../hooks/useCoins'
import { CoinSearch } from './search'
import { Table } from './table'
import { RefreshIndicator } from './refreshIndicator'
import { MarketSentimentBar } from './tendenceBar'


const getParam = (key: string, fallback: string): string =>
  new URLSearchParams(window.location.search).get(key) ?? fallback

const setParam = (key: string, value: string): void => {
  const params = new URLSearchParams(window.location.search)
  params.set(key, value)
  window.history.pushState({}, '', `?${params.toString()}`)
}

export const DashboardScreen = ({ onRowClick }: { onRowClick: (id: string) => void }) => {
  const [search, setSearch] = useState(
    () => getParam('search', '')
  )
  const [sortKey, setSortKey] = useState<SortKey>(
    () => getParam('sort', 'market_cap_rank') as SortKey
  )
  const [sortDir, setSortDir] = useState<SortDirection>(
    () => getParam('dir', 'asc') as SortDirection
  )

  useEffect(() => {
    const handler = () => {
      setSearch(getParam('search', ''))
      setSortKey(getParam('sort', 'market_cap_rank') as SortKey)
      setSortDir(getParam('dir', 'asc') as SortDirection)
    }
    window.addEventListener('popstate', handler)
    return () => window.removeEventListener('popstate', handler)
  }, [])

const { data, isLoading, isError, refetch } = useCoins()

  const filtered = (data ?? []).filter(coin =>
    coin.name.toLowerCase().includes(search.toLowerCase()) ||
    coin.symbol.toLowerCase().includes(search.toLowerCase())
  )

  const handleSearch = (value: string) => {
    setSearch(value)
    setParam('search', value)
  }

  const handleSort = (key: SortKey) => {
    const newDir: SortDirection =
      sortKey === key && sortDir === 'asc' ? 'desc' : 'asc'
    setSortKey(key)
    setSortDir(newDir)
    setParam('sort', key)
    setParam('dir', newDir)
  }

  return (
    <main aria-label="Crypto market dashboard"  className="relative z-10 max-w-6xl mx-auto px-4 md:px-8 py-8 md:py-12">
        <div className="flex items-start justify-between mb-1">
    <div>
      <h1 className="text-2xl font-light text-[var(--color-text-primary)] mb-1 tracking-tight">
       Crypto Dashboard
      </h1>

      <p className="text-xs text-[var(--color-text-muted)] uppercase tracking-widest mb-6">
        Top 20 by Crypto Dashboard
      </p>
    </div>
        <RefreshIndicator
      intervalMs={60_000}
      onRefresh={refetch}
      isLoading={isLoading}
    />
  </div>
    {data && <MarketSentimentBar coins={data} />}

      <CoinSearch
        value={search}
        onChange={handleSearch}
      />

      <div aria-live="polite" aria-atomic="true" className="mt-4">
        {!isLoading && !isError && (
          <Table
            coins={filtered}
            sortKey={sortKey}
            sortDir={sortDir}
            onSort={handleSort}
            onRowClick={onRowClick}
            search={search} 
          />
        )}
      </div>
    </main>
  )
}