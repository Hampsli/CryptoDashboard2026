import { useState, useEffect, useMemo, useCallback } from "react";
import type { SortDirection, SortKey } from "../../../shared/types";
import { useCoins } from "../hooks/useCoins";
import { CoinSearch } from "./search";
import { Table } from "./table";
import { RefreshIndicator } from "./refreshIndicator";
import { MarketSentimentBar } from "./tendenceBar";
import { SkeletonTable } from "../../../shared/components/skeletonTable";
import { ErrorPage } from "../../../shared/components/ErrorPage";

const getParam = (key: string, fallback: string): string =>
  new URLSearchParams(window.location.search).get(key) ?? fallback;

const setParam = (key: string, value: string): void => {
  const params = new URLSearchParams(window.location.search);
  params.set(key, value);
  window.history.pushState({}, "", `?${params.toString()}`);
};

export const DashboardScreen = ({
  onRowClick,
  isDetailOpen,
}: {
  onRowClick: (id: string) => void;
  isDetailOpen: boolean;
}) => {
  const [search, setSearch] = useState(() => getParam("search", ""));
  const [sortKey, setSortKey] = useState<SortKey>(
    () => getParam("sort", "market_cap_rank") as SortKey
  );
  const [sortDir, setSortDir] = useState<SortDirection>(
    () => getParam("dir", "asc") as SortDirection
  );

const { 
  data, 
  isLoading, 
  isError, 
  error, 
  refetch, 
  dataUpdatedAt
} = useCoins(!isDetailOpen);

  // 3. Sincronización de URL 
  useEffect(() => {
    const handler = () => {
      setSearch(getParam("search", ""));
      setSortKey(getParam("sort", "market_cap_rank") as SortKey);
      setSortDir(getParam("dir", "asc") as SortDirection);
    };
    window.addEventListener("popstate", handler);
    return () => window.removeEventListener("popstate", handler);
  }, []);

  /**
   * 4. Filtrado MEMOIZADO
   */
  const filteredCoins = useMemo(() => {
    if (!data) return [];
    const term = search.toLowerCase();
    return data.filter(
      (coin) =>
        coin.name.toLowerCase().includes(term) ||
        coin.symbol.toLowerCase().includes(term)
    );
  }, [data, search]);

  /**
   * 5. Handlers Optimizados
   */
  const handleSearch = useCallback((value: string) => {
    setSearch(value);
    setParam("search", value);
  }, []);

  const handleSort = useCallback((key: SortKey) => {
    setSortKey((prevKey) => {
      const newDir = prevKey === key && sortDir === "asc" ? "desc" : "asc";
      setSortDir(newDir);
      setParam("sort", key);
      setParam("dir", newDir);
      return key;
    });
  }, [sortDir]);

  return (
    <main
      aria-label="Crypto market dashboard"
      className="relative z-10 max-w-6xl mx-auto px-4 md:px-8 py-8 md:py-12"
    >
      <header className="flex items-start justify-between mb-1">
        <div>
          <h1 className="text-2xl font-light text-[var(--color-text-primary)] mb-1 tracking-tight">
            Crypto Dashboard
          </h1>
          <p className="text-xs text-[var(--color-text-muted)] uppercase tracking-widest mb-6">
            Top 20 by Market Cap
          </p>
        </div>

<RefreshIndicator
          lastUpdated={dataUpdatedAt}
          onRefresh={refetch}
          isLoading={isLoading}
          isEnabled={!isDetailOpen}
        />
      </header>

      {data && <MarketSentimentBar coins={data} />}

      <CoinSearch value={search} onChange={handleSearch} />

      <section aria-live="polite" className="mt-4">
        {isLoading && <SkeletonTable rows={20} />}
        
        {isError && !isLoading && (
          <ErrorPage error={error} onRetry={refetch} />
        )}

        {!isLoading && !isError && (
          <Table
            coins={filteredCoins}
            sortKey={sortKey}
            sortDir={sortDir}
            onSort={handleSort}
            onRowClick={onRowClick}
            search={search} 
          />
        )}
      </section>
    </main>
  );
};