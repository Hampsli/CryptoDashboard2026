import { ApiError, type priceChart , type CoinDetail, type CoinMarket} from '../types';

const BASE = 'https://api.coingecko.com/api/v3';

const handle = async <T>(res: Response): Promise<T> => {
  if (res.status === 429) throw new ApiError('RATE_LIMIT', 429);
  if (res.status === 404) throw new ApiError('NOT_FOUND', 404);
  if (!res.ok)            throw new ApiError('SERVER_ERROR', res.status);
  return res.json();
};

export const fetchCoins = async (): Promise<CoinMarket[]> => {
  const params = new URLSearchParams({
    vs_currency: 'usd',
    order:       'market_cap_desc',
    per_page:    '20',
    page:        '1',
    sparkline:   'true',
  });
  const res = await fetch(`${BASE}/coins/markets?${params}`)
    .catch(() => { throw new ApiError('NETWORK_ERROR'); });
  return handle<CoinMarket[]>(res);
};

export const fetchCoinDetail = async (id: string): Promise<CoinDetail> => {
  const params = new URLSearchParams({
    localization:    'false',
    tickers:         'false',
    community_data:  'false',
    developer_data:  'false',
  });
  const res = await fetch(`${BASE}/coins/${id}?${params}`)
    .catch(() => { throw new ApiError('NETWORK_ERROR'); });
  return handle<CoinDetail>(res);
};

export const fetchCoinChart = async (id: string): Promise<priceChart > => {
  const params = new URLSearchParams({ vs_currency: 'usd', days: '7' });
  const res = await fetch(`${BASE}/coins/${id}/market_chart?${params}`)
    .catch(() => { throw new ApiError('NETWORK_ERROR'); });
  return handle<priceChart >(res);
};