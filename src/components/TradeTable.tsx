import type { Trade } from "../types/trade";

interface Props {
  data: Trade[];
  searchMonth: string; // 예: "2024.01"
}

// 🔥 화면 표시용 이름 변환 함수
const getDisplayAptNm = (aptNm: string) => {
  if (!aptNm) return "";
  if (aptNm === "래미안영등포프레비뉴") {
    return "래미안프레비뉴";
  }

  // 문자열 끝에 "아파트"가 있으면 제거
  return aptNm.replace(/아파트$/, "");
};

const formatSearchMonth = (yyyymm: string) => {
  if (!yyyymm || yyyymm.length !== 6) return yyyymm;

  const year = yyyymm.slice(0, 4);
  const month = yyyymm.slice(4, 6);

  return `${year}.${month}`;
};

export default function TradeTable({ data, searchMonth}: Props) {
  const sortedData = [...data].sort((a, b) => {
    const dateA =
      (a.dealYear || 0) * 10000 +
      (a.dealMonth || 0) * 100 +
      (a.dealDay || 0);
    const dateB =
      (b.dealYear || 0) * 10000 +
      (b.dealMonth || 0) * 100 +
      (b.dealDay || 0);

    if (dateA !== dateB) {
      return dateB - dateA; // 최신 거래일이 위로
    }

    const nameA = a.aptNm || "";
    const nameB = b.aptNm || "";

    return nameA.localeCompare(nameB);
  });

  return (
     <>
    <div style={{ marginBottom: "10px", fontWeight: "bold" }}>
      [ 거래 : {formatSearchMonth(searchMonth)} ]
    </div>    
    <table style={{ borderCollapse: "collapse", width: "100%" }}>
      <thead>
        <tr style={{ backgroundColor: "#c7c4c4", color: "black" }}>
          <th style={{ textAlign: "center", padding: "8px", border: "1px solid #888" }}>
            아파트
          </th>
          <th style={{ textAlign: "right", padding: "8px", border: "1px solid #888" }}>
            거래금액
          </th>
          <th style={{ textAlign: "right", padding: "8px", border: "1px solid #888" }}>
            전용면적
          </th>
          <th style={{ textAlign: "right", padding: "8px", border: "1px solid #888" }}>
            층
          </th>
          <th style={{ textAlign: "center", padding: "8px", border: "1px solid #888" }}>
            거래일
          </th>
        </tr>
      </thead>
      <tbody>
        {sortedData.map((item, idx) => (
          <tr
            key={idx}
            style={{
              backgroundColor: idx % 2 === 0 ? "white" : "#e8e8e8",
            }}
          >
            {/* 🔥 여기만 변경 */}
            <td style={{ padding: "8px", border: "1px solid #888" }}>
              {getDisplayAptNm(item.aptNm)}
            </td>

            <td style={{ textAlign: "right", padding: "8px", border: "1px solid #888" }}>
              {item.dealAmount.toFixed(2)}억
            </td>
            <td style={{ textAlign: "right", padding: "8px", border: "1px solid #888" }}>
              {item.excluUseAr}㎡
            </td>
            <td style={{ textAlign: "right", padding: "8px", border: "1px solid #888" }}>
              {item.floor}
            </td>
            <td style={{ textAlign: "center", padding: "8px", border: "1px solid #888" }}>
              {item.dealYear}.{item.dealMonth}.{item.dealDay}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
    </>
  );
}
