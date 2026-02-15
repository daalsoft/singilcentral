// api/fetchTrade.ts
import type { Trade } from "../types/trade";

export async function fetchTrade(
  month: string,
  lawdCd: string,
  page = 1 // 페이지 번호 기본값 1
): Promise<{ items: Trade[]; totalCount: number; numOfRows: number }> {

  const key = import.meta.env.VITE_MOLIT_API_KEY;

  const url =
    "https://apis.data.go.kr/1613000/RTMSDataSvcAptTrade/getRTMSDataSvcAptTrade";

  const params = new URLSearchParams({
    serviceKey: key ?? "",
    LAWD_CD: lawdCd,
    DEAL_YMD: month,
    _type: "json",
    pageNo: String(page),
  });

  const res = await fetch(`${url}?${params.toString()}`);

  if (!res.ok) {
    throw new Error(`API 요청 실패: ${res.status}`);
  }

  const json = await res.json();
  const body = json?.response?.body;

  if (!body?.items) {
    return { items: [], totalCount: 0, numOfRows: 10 }; // 기본 10건
  }

  let items = body.items.item;

  if (!Array.isArray(items)) {
    items = [items];
  }

  const safeData: Trade[] = items.map((item: any) => ({
    aptDong: item.aptDong ?? "",
    aptNm: item.aptNm ?? "",
    buildYear: Number(item.buildYear ?? 0),
    buyerGbn: item.buyerGbn ?? "",
    dealAmount: Number(String(item.dealAmount ?? "0").replace(/,/g, "").trim()),
    dealDay: Number(item.dealDay ?? 0),
    dealMonth: Number(item.dealMonth ?? 0),
    dealYear: Number(item.dealYear ?? 0),
    excluUseAr: Number(item.excluUseAr ?? 0),
    floor: Number(item.floor ?? 0),
    jibun: item.jibun ?? "",
    sggCd: item.sggCd ?? "",
    umdNm: item.umdNm ?? "",
  }));

  return {
    items: safeData,
    totalCount: Number(body.totalCount ?? safeData.length),
    numOfRows: Number(body.numOfRows ?? 10), // body.numOfRows가 없으면 기본 10
  };
}
