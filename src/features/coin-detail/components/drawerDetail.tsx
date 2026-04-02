import { useEffect, useCallback } from 'react'
import { CoinChart } from './coinChart'
import { DetailDescription } from './detailDescription'
import { useCoinChart, useCoinDetail } from '../../market-dashboard/hooks/useDetailCoin'
import { SentimentVotes } from './sentimentDetail'

type Props = {
  coinId:  string | null
  onClose: () => void
}

const formatUSD = (n: number) =>
  new Intl.NumberFormat('en-US', {
    style:                 'currency',
    currency:              'USD',
    maximumFractionDigits: n < 1 ? 6 : 2,
  }).format(n)

const formatDate = (dateStr: string) =>
  new Intl.DateTimeFormat('en-US', {
    year:  'numeric',
    month: 'short',
    day:   'numeric',
  }).format(new Date(dateStr))

export const DetailDrawer = ({ coinId, onClose }: Props) => {
  const {
    data:      detail,
    isLoading: loadingDetail,
  } = useCoinDetail(coinId)

  const { data: chart, isLoading: loadingChart } = useCoinChart(coinId)

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape') onClose()
  }, [onClose])

  useEffect(() => {
    if (!coinId) return
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [coinId, handleKeyDown])

  useEffect(() => {
    document.body.style.overflow = coinId ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [coinId])

  if (!coinId) return null

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-[#1e1030]/20 backdrop-blur-sm z-40"
        aria-hidden="true"
        onClick={onClose}
      />

      {/* Drawer */}
      <aside
        role="dialog"
        aria-modal="true"
        aria-label={detail ? `${detail.name} detail` : 'Asset detail'}
        className="fixed right-0 top-0 h-full w-full max-w-md z-50
                   overflow-y-auto flex flex-col
                   bg-[var(--glass-drawer)] backdrop-blur-[32px]
                   border-l border-[var(--color-border-default)]"
      >
        {/* Header gradiente */}
        <div
          className="flex items-center justify-between px-6 py-4 sticky top-0"
          style={{ background: 'var(--gradient-drawer)' }}
        >
          <h2 className="text-base font-medium text-white">
            {detail ? detail.name : 'Loading...'}
          </h2>
          <button
            onClick={onClose}
            aria-label="Close detail panel"
            className="p-2 rounded-lg text-white/70 hover:bg-white/10
                       focus:outline-none focus:ring-2 focus:ring-white/50"
          >
            <svg
              className="w-5 h-5" fill="none" stroke="currentColor"
              strokeWidth={2} viewBox="0 0 24 24" aria-hidden="true"
            >
              <path d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 px-6 py-5 space-y-6">

          {/* {errorDetail && (
            <ErrorState error={detailError} onRetry={refetchDetail} />
          )} */}

          {loadingDetail && (
            <div className="animate-pulse space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full
                                bg-[var(--color-brand-200)]" />
                <div className="space-y-2">
                  <div className="w-32 h-4 rounded
                                  bg-[var(--color-brand-200)]" />
                  <div className="w-20 h-3 rounded
                                  bg-[var(--color-brand-200)]" />
                </div>
              </div>
              <div className="w-full h-48 rounded-xl
                              bg-[var(--color-brand-200)]" />
              <div className="space-y-2">
                <div className="w-full h-3 rounded
                                bg-[var(--color-brand-200)]" />
                <div className="w-3/4 h-3 rounded
                                bg-[var(--color-brand-200)]" />
              </div>
            </div>
          )}

          {detail && !loadingDetail && (
            <>
              {/* Coin header */}
              <div className="flex items-center gap-3">
                <img
                  src={detail.image.large}
                  alt={detail.name}
                  width={48}
                  height={48}
                  className="rounded-full"
                />
                <div>
                  <p className="font-medium text-lg
                                text-[var(--color-text-primary)]">
                    {detail.name}
                  </p>
                  <p className="text-sm uppercase
                                text-[var(--color-text-muted)]">
                    {detail.symbol}
                  </p>
                </div>
                <p className="ml-auto text-xl font-medium tabular-nums
                              text-[var(--color-text-primary)]">
                  {formatUSD(detail.market_data.current_price.usd)}
                </p>
              </div>

              {/* ATH / ATL */}
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-[var(--color-brand-100)]/50 rounded-xl p-3
                                border border-[var(--color-border-default)]">
                  <p className="text-xs mb-1
                                text-[var(--color-text-muted)]">
                    All-time high
                  </p>
                  <p className="text-sm font-medium tabular-nums
                                text-[var(--color-text-primary)]">
                    {formatUSD(detail.market_data.ath.usd)}
                  </p>
                  <p className="text-xs mt-0.5
                                text-[var(--color-text-muted)]">
                    {formatDate(detail.market_data.ath_date.usd)}
                  </p>
                </div>
                <div className="bg-[var(--color-brand-100)]/50 rounded-xl p-3
                                border border-[var(--color-border-default)]">
                  <p className="text-xs mb-1
                                text-[var(--color-text-muted)]">
                    All-time low
                  </p>
                  <p className="text-sm font-medium tabular-nums
                                text-[var(--color-text-primary)]">
                    {formatUSD(detail.market_data.atl.usd)}
                  </p>
                  <p className="text-xs mt-0.5
                                text-[var(--color-text-muted)]">
                    {formatDate(detail.market_data.atl_date.usd)}
                  </p>
                </div>
              </div>

              {/* Chart */}
              <div>
                <p className="text-xs font-medium mb-3 uppercase tracking-widest
                              text-[var(--color-text-muted)]">
                  Price — last 7 days
                </p>
                {loadingChart && (
                  <div className="h-48 rounded-xl animate-pulse
                                  bg-[var(--color-brand-100)]" />
                )}
                {chart && !loadingChart && (
                  <CoinChart data={chart} coinName={detail.name} />
                )}
              </div>

              {/* Description */}
              {detail.description.en && (
                <div>
                  <p className="text-xs font-medium mb-2 uppercase tracking-widest
                                text-[var(--color-text-muted)]">
                    About
                  </p>
                  <DetailDescription text={detail.description.en} />
                </div>
              )}
              {(detail.sentiment_votes_up_percentage > 0 ||
  detail.sentiment_votes_down_percentage > 0) && (
  <SentimentVotes
    up={detail.sentiment_votes_up_percentage}
    down={detail.sentiment_votes_down_percentage}
  />
)}
            </>
          )}
        </div>
      </aside>
    </>
  )
}