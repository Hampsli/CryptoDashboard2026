export type CoinMarket = {
  readonly id:                            string;
  readonly symbol:                        string;
  readonly name:                          string;
  readonly image:                         string;
  readonly current_price:                 number;
  readonly market_cap:                    number;
  readonly market_cap_rank:               number;
  readonly price_change_percentage_24h:   number;
  readonly total_volume:                  number;
  readonly sparkline_in_7d:              { price: number[] };
};

export type CoinDetail = {
  readonly id:     string;
  readonly symbol: string;
  readonly name:   string;
  readonly image:  { large: string };
  readonly description: { en: string };
  readonly market_data: {
    readonly current_price:               Record<string, number>;
    readonly ath:                         Record<string, number>;
    readonly ath_date:                    Record<string, string>;
    readonly atl:                         Record<string, number>;
    readonly atl_date:                    Record<string, string>;
    readonly price_change_percentage_24h: number;
    readonly market_cap:                  Record<string, number>;
  };
};

export type priceChart = {
  prices: [number, number][];
};

export type SortKey =
  | 'market_cap_rank'
  | 'current_price'
  | 'price_change_percentage_24h'
  | 'market_cap';

export type SortDirection = 'asc' | 'desc';

export type ApiErrorCode =
  | 'RATE_LIMIT'
  | 'NOT_FOUND'
  | 'SERVER_ERROR'
  | 'NETWORK_ERROR';

export class ApiError extends Error {
  readonly code: ApiErrorCode
  readonly status?: number

  constructor(code: ApiErrorCode, status?: number) {
    super(`API Error: ${code}`)
    this.name = 'ApiError'
    this.code = code
    this.status = status
  }
}
