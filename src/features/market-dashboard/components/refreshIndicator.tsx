import { useCallback } from "react";
import { useRefreshTimer } from "../hooks/useRefreshTimer";

type Props = {
 lastUpdated: number;
  onRefresh: () => void;
  isLoading: boolean;
  isEnabled: boolean;
};

const TOTAL = 60;

export const RefreshIndicator = ({
  lastUpdated,
  onRefresh,
  isLoading,
  isEnabled
}: Props) => {
    const seconds = useRefreshTimer(lastUpdated, isEnabled);
    
  const handleRefresh = useCallback(() => {
    onRefresh();
  }, [onRefresh]);

const progress = ((60 - seconds) / 60) * 100;
  return (
    <div className="flex items-center gap-2">
      <div className="flex items-center gap-1.5">
        {" "}
        <span className="text-xs text-[var(--color-text-subtle)]">
          Refreshing in
          <p
            className="ml-1 font-medium tabular-nums
                             text-[var(--color-text-muted)]"
          >
            {seconds}s
          </p>
        </span>
      </div>

      <progress
        className="w-16 h-1 appearance-none overflow-hidden rounded-full
             [&::-webkit-progress-bar]:bg-[var(--color-border-default)]
             [&::-webkit-progress-bar]:rounded-full
             [&::-webkit-progress-value]:bg-[#7c3aed]
             [&::-webkit-progress-value]:transition-all
             [&::-webkit-progress-value]:duration-1000
             [&::-moz-progress-bar]:bg-[#7c3aed]"
        value={seconds}
        max={TOTAL}
        aria-label={`Auto-refresh in ${seconds} seconds`}
      >
        <div
          className="h-full rounded-full transition-all duration-1000

bg-[#7c3aed]"
          style={{ width: `${progress}%` }}
        />
      </progress>
      <button
        onClick={handleRefresh}
        disabled={isLoading}
        aria-label="Refresh market data"
        className="p-1.5 rounded-lg transition-all
                   text-[var(--color-text-muted)]
                   hover:bg-[var(--color-surface-subtle)]
             hover:text-[#6d28d9] 
             hover:brightness-90
             focus:outline-none focus:ring-2 focus:ring-[#7c3aed]
                   disabled:opacity-40 disabled:cursor-not-allowed"
      >
        <svg
          className={`w-3.5 h-3.5 ${isLoading ? "animate-spin" : ""}`}
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path d="M21 12a9 9 0 11-6.219-8.56" />
        </svg>
      </button>
    </div>
  );
};
