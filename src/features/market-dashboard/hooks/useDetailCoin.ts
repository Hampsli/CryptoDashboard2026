import { useQuery } from '@tanstack/react-query';
import { fetchCoinDetail, fetchCoinChart } from '../../../shared/api/coinGecko';

export const useCoinDetail = (id: string | null) =>
  useQuery({
    queryKey:  ['coin', id],
    queryFn:   () => fetchCoinDetail(id!),
    enabled:   !!id,
    staleTime: 60_000,
  });

export const useCoinChart = (id: string | null) =>
  useQuery({
    queryKey:  ['coin-chart', id],
    queryFn:   () => fetchCoinChart(id!),
    enabled:   !!id,
    staleTime: 60_000,
  });