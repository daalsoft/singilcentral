import type { Trade } from "../types/trade";

interface Props {
  data: Trade[];
}


export default function TradeTable({ data }: Props) {
    const sortedData = [...data].sort((a, b) => {
    // 거래일 비교 (연,월,일 합쳐서 숫자로)
    if (!a && !b) return 0;       // 둘 다 null이면 같음
    if (!a) return 1;             // a가 null이면 b가 위로
    if (!b) return -1;            // b가 null이면 a가 위로

    // dealYear, dealMonth, dealDay가 null이면 0으로 처리
    const dateA = (a.dealYear || 0) * 10000 + (a.dealMonth || 0) * 100 + (a.dealDay || 0);
    const dateB = (b.dealYear || 0) * 10000 + (b.dealMonth || 0) * 100 + (b.dealDay || 0);

    if (dateA !== dateB) {
        return dateB - dateA; // 최신 거래일이 위로
    }

    const nameA = a.aptNm || ""; // null이면 빈 문자열로 처리
    const nameB = b.aptNm || "";

    return nameA.localeCompare(nameB);
    // 거래일이 같으면 아파트명 오름차순
    });

  return (
    <table style={{ borderCollapse: "collapse", width: "100%" }}>
        <thead>
            <tr style={{ backgroundColor: "#c7c4c4", color: "black" }}>
            <th style={{ textAlign: "center", padding: "8px", border: "1px solid #888" }}>아파트</th>
            <th style={{ textAlign: "right", padding: "8px", border: "1px solid #888" }}>거래금액</th>
            <th style={{ textAlign: "right", padding: "8px", border: "1px solid #888" }}>전용면적</th>
            <th style={{ textAlign: "right", padding: "8px", border: "1px solid #888" }}>층</th>
            <th style={{ textAlign: "center", padding: "8px", border: "1px solid #888" }}>거래일</th>
            </tr>
        </thead>
        <tbody>
        {sortedData.map((item, idx) => (
            <tr
            key={idx}
            style={{
                backgroundColor: idx % 2 === 0 ?  "white": "#e8e8e8",
            }}
            >
            <td style={{ padding: "8px", border: "1px solid #888" }}>{item.aptNm}</td>
            <td style={{ textAlign: "right", padding: "8px", border: "1px solid #888" }}>
                {item.dealAmount.toFixed(2)}억
            </td>
            <td style={{ textAlign: "right", padding: "8px", border: "1px solid #888" }}>
                {item.excluUseAr}㎡
            </td>
            <td style={{ textAlign: "right", padding: "8px", border: "1px solid #888" }}>{item.floor}</td>
            <td style={{ textAlign: "center", padding: "8px", border: "1px solid #888" }}>
                {item.dealYear}.{item.dealMonth}.{item.dealDay}
            </td>
            </tr>
        ))}
        </tbody>
    </table>

  );
}
