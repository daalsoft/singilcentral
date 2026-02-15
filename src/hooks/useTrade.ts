import { useState } from "react";
import type { Trade } from "../types/trade";
import { fetchTrade } from "../api/fetchTrade";

const TARGET_APTS = [
  "신길센트럴아이파크",
  "프레비뉴", // "래미안영등포프레비뉴"
  "신길센트럴자이",
  "힐스테이트클래시안", // "힐스테이트클래시안"
  "신길파크자이",
  "보라매에스케이뷰", // "보라매에스케이뷰",
  "래미안에스티움",
];

export function useTrade() {
  const [data, setData] = useState<Trade[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadTrade = async (month: string, lawdCd: string) => {
    if (!month || !lawdCd) return;

    try {
      setLoading(true);
      setError(null);

      let allData: Trade[] = [];
      let page = 1;
      let totalPages = 1;

      do {
        // fetchTrade(page 파라미터 포함)
        const { items, totalCount, numOfRows } = await fetchTrade(month, lawdCd, page);

        const safeData: Trade[] = (items ?? []).map((item: any) => ({
          aptDong: item.aptDong ?? "",
          aptNm: item.aptNm ?? "",
          buildYear: Number(item.buildYear ?? 0),
          buyerGbn: item.buyerGbn ?? "",
          //dealAmount: Number(String(item.dealAmount ?? 0).replace(/,/g, "").trim()),
          dealAmount: Number(String(item.dealAmount ?? "0").replace(/,/g, "").trim()) / 10000, // 억 단위
          dealDay: Number(item.dealDay ?? 0),
          dealMonth: Number(item.dealMonth ?? 0),
          dealYear: Number(item.dealYear ?? 0),
          excluUseAr: Number(item.excluUseAr ?? 0),
          floor: Number(item.floor ?? 0),
          jibun: item.jibun ?? "",
          sggCd: item.sggCd ?? "",
          umdNm: item.umdNm ?? "",
        }));

        allData = allData.concat(safeData);

        totalPages = Math.ceil(totalCount / numOfRows);
        page++;
      } while (page <= totalPages);

      console.log("totalPages=", totalPages)
      // 🔹 부분 문자열 매칭으로 아파트 필터
      const filtered = allData.filter(item =>
        TARGET_APTS.some(target => item.aptNm.includes(target))
      );

      console.log("allData=", allData)
      console.log("filtered=", filtered)

      setData(filtered); // 🔹 filtered 사용     
    } catch (err) {
      console.error(err);
      setError("데이터를 불러오지 못했습니다.");
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, loadTrade };
}
