// pages/Home.tsx
import { useState } from "react";
import { useTrade } from "../hooks/useTrade";
import MonthSelector from "../components/MonthSelector";
import TradeTable from "../components/TradeTable";

export default function Home() {
  const now = new Date();
  const currentMonth = `${now.getFullYear()}${(now.getMonth() + 1)
    .toString()
    .padStart(2, "0")}`; // 월은 0~11이므로 +1, 2자리로 맞춤

  const [month, setMonth] = useState(currentMonth);    
  const { data, loading, error, loadTrade } = useTrade();

  return (
    <div style={{ padding: "20px" }}>
      <h1>신길뉴타운 아파트 국토부 실거래가</h1>

      <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "20px" }}>
        <MonthSelector value={month} onChange={setMonth} />
        <button onClick={() => loadTrade(month, "11560")}>조회</button>
      </div>

      {loading && <p>로딩중...</p>}

      {error && <p style={{ color: "red" }}>{error}</p>}

      {!loading && !error && data.length > 0 && <TradeTable data={data} />}

      {!loading && !error && data.length === 0 && <p>데이터가 없습니다.</p>}
    </div>
  );
}
