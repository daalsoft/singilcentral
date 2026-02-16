// pages/Home.tsx
import { useState, useEffect } from "react";
import { useTrade } from "../hooks/useTrade";
import MonthSelector from "../components/MonthSelector";
import TradeTable from "../components/TradeTable";

export default function Home() {
  const now = new Date();
  const currentMonth = `${now.getFullYear()}${(now.getMonth() + 1)
    .toString()
    .padStart(2, "0")}`; // YYYYMM

  const [searchMonth, setMonth] = useState(currentMonth);    
  const { data, loading, error, loadTrade } = useTrade();

  // 🔥 searchMonth 변경될 때마다 자동 조회
  useEffect(() => {
    loadTrade(searchMonth, "11560");
  }, [searchMonth]);

  return (
    <div style={{ padding: "20px" }}>
      <h1>신길뉴타운 아파트 국토부 실거래가</h1>

      {/* 🔹 MonthSelector만 사용, 버튼 제거 */}
      <MonthSelector value={searchMonth} onChange={setMonth} />

      {loading && <p>로딩중...</p>}

      {error && <p style={{ color: "red" }}>{error}</p>}

      {!loading && !error && data.length > 0 && (
        <TradeTable data={data} searchMonth={searchMonth} />
      )}

      {!loading && !error && data.length === 0 && <p>데이터가 없습니다.</p>}
    </div>
  );
}
