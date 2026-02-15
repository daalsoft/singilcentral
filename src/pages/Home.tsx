// pages/Home.tsx
import { useState } from "react";
import { useTrade } from "../hooks/useTrade";
import MonthSelector from "../components/MonthSelector";
import TradeTable from "../components/TradeTable";

export default function Home() {
  const [month, setMonth] = useState("202601"); // 초기 월
  const { data, loading, error, loadTrade } = useTrade();

  return (
    <div style={{ padding: "20px" }}>
      <h1>신길동 아파트 실거래가</h1>

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
