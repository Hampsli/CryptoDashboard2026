import { useQuery } from '@tanstack/react-query'
import { fetchCoinDetail, fetchCoinChart } from '../../../shared/api/coinGecko'

export const useDetailCoin = (id: string | null) =>
  useQuery({
    queryKey:  ['coin', id],
    queryFn:   () => fetchCoinDetail(id!),
    enabled:   !!id,
    staleTime: 60_000,
    retry: (count, error: unknown) => {
      if (error instanceof Error && error.name === 'ApiError') return false
      return count < 2
    },
  })

export const useCoinChart = (id: string | null) =>
  useQuery({
    queryKey:  ['coin-chart', id],
    queryFn:   () => fetchCoinChart(id!),
    enabled:   !!id,
    staleTime: 60_000,
    retry: (count, error: unknown) => {
      if (error instanceof Error && error.name === 'ApiError') return false
      return count < 2
    },
  })