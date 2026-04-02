import { useQuery } from '@tanstack/react-query';
import { fetchCoins } from '../../../shared/api/coinGecko';

export const useCoins = () =>
  useQuery({
    queryKey:  ['coins'],
    queryFn:   fetchCoins,
    staleTime: 60_000,
    refetchInterval: 60_000,
    retry: (count, error: unknown) => {
      if (error instanceof Error && error.name === 'ApiError') return false;
      return count < 2;
    },
  });