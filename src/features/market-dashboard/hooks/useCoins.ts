import { useQuery } from "@tanstack/react-query";
import { fetchCoins } from "../../../shared/api/coinGecko";

export const useCoins = (isEnabled: boolean = true) => {
  return useQuery({
    queryKey: ['coins'],
    queryFn: fetchCoins,
    staleTime: 60_000,
    refetchInterval: isEnabled ? 60_000 : false, 
    refetchOnWindowFocus: false,
    enabled: true, 
  });
};