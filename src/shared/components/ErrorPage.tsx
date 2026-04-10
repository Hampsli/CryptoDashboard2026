import { ApiError } from '../types';

type Props = {
  error:   unknown;
  onRetry: () => void;
};

const getMessage = (error: unknown): string => {
  if (error instanceof ApiError) {
    if (error.code === 'RATE_LIMIT')
      return 'Too many requests. CoinGecko free tier limit reached.';
    if (error.code === 'NETWORK_ERROR')
      return 'Network error. Check your connection.';
  }
  return 'Something went wrong.';
};

export const ErrorPage = ({ error, onRetry }: Props) => (
  <div
    role="alert"
    className="flex flex-col items-center justify-center py-16 gap-4"
  >
    <p className="text-slate-700 text-sm">{getMessage(error)}</p>
    <button
      onClick={onRetry}
      className="px-4 py-2 text-sm font-medium text-white bg-slate-900
                 rounded-lg hover:bg-slate-700 transition-colors
                 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:ring-offset-2"
    >
      Try again
    </button>
  </div>
);