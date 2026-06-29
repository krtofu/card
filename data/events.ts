export interface EventData {
  id: string;
  name: string; // 가챠/이벤트 이름
  eventName?: string; // 연결된 이벤트 (오픈 가챠처럼 없는 경우도 있으므로 선택적 속성)
  eventType?: "하코" | "혼합" | "월링" | "없음";
  period: { start: string; end: string };
  gacha: {
    bannerPath: string;
    types: string[]; // ["통상"], ["한정"], ["페스"] 등
    featuredCardIds: string[]; // 카드 ID로 상태 연동
  };
}

export const FUTURE_EVENTS: EventData[] = [
  {
    id: "gacha_open_001", // 첫 번째 배너 고유 ID
    name: "서비스 시작 기념 뽑기",
    eventName: "", // 이벤트 없음
    eventType: "없음",
    period: { start: "2022-05-20. 12:00", end: "2022-05-29. 14:59" },
    gacha: {
      bannerPath: "/gachas/22y/banner_22_01.png",
      types: ["통상"],
      featuredCardIds: [
        "ln_Ichika_001",
        "VS_MIKU_001",
        "VS_RIN_001",
        "VS_LEN_001"
      ]
    }
  }
];