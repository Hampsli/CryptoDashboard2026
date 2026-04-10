import { useEffect, useState } from "react";

export const useRefreshTimer = (lastUpdated: number | undefined, isEnabled: boolean) => {
  const [secondsLeft, setSecondsLeft] = useState(60);

  useEffect(() => {
    if (!isEnabled || !lastUpdated) return;

    const interval = setInterval(() => {
      const now = Date.now();
      const nextUpdate = lastUpdated + 60_000;
      const remaining = Math.max(0, Math.ceil((nextUpdate - now) / 1000));
      setSecondsLeft(remaining);
    }, 1000);

    return () => clearInterval(interval);
  }, [lastUpdated, isEnabled]);

  return secondsLeft;
};