import { useEffect, useState } from "react";

export function usePolling(url, intervalMs) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    let active = true;
    const controller = new AbortController();

    const load = async () => {
      try {
        const res = await fetch(url, { signal: controller.signal, cache: "no-store" });
        if (!res.ok) throw new Error(`status ${res.status}`);
        const payload = await res.json();
        if (!active) return;
        setData(payload);
        setError(false);
      } catch (err) {
        if (!active || controller.signal.aborted) return;
        setError(true);
      } finally {
        if (active) setLoading(false);
      }
    };

    load();
    const interval = setInterval(load, intervalMs);
    return () => {
      active = false;
      controller.abort();
      clearInterval(interval);
    };
  }, [url, intervalMs]);

  return { data, loading, error };
}
