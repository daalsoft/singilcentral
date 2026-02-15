import { useEffect, useState } from "react";
import { fetchTrade } from "../api/fetchTrade";
import type { Trade } from "../types/trade";

export function useTrade(month: string, lawdCd: string) {
  const [data, setData] = useState<Trade[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function load() {
      setLoading(true);
      const result = await fetchTrade(month, lawdCd);
      setData(result);
      setLoading(false);
    }

    load();
  }, [month, lawdCd]);

  return { data, loading };
}
