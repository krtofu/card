// src/data/eventCuts/index.ts

// 🌟 이벤컷 데이터 뼈대(인터페이스/타입)
export type EventCutInfo = {
  id: string;
  iteration: string; // 예: "1차 하코", "1주년", "혼합" 등
  unit: string;      // "ln", "mmj", "vbs", "wxs", "n25", "vs", "mixed"
  title: string;
  date: string;
  attribute: string; // "pure", "happy", "cute", "mysterious", "cool"
  gachaType: string; // "limited" (한정), "normal" (통상)
  banner: string;    // 이벤트 배너 이미지 경로
  tags: string[];    // 검색 및 필터용 태그
  cuts: {
    "1"?: number;
    "2"?: number;
    "3"?: number;
    "10"?: number;
    "50"?: number;
    "100"?: number;
    "500"?: number;
    "1000"?: number;
    "5000"?: number;
  };
};

// 🌟 각 연도별 파일 불러오기
import { EVENT_CUTS_2022 } from "./2022";
// import { EVENT_CUTS_2023 } from "./2023";
// import { EVENT_CUTS_2024 } from "./2024";
// import { EVENT_CUTS_2025 } from "./2025";
// import { EVENT_CUTS_2026 } from "./2026";
// import { EVENT_CUTS_2027 } from "./2027";

// 🌟 하나로 합쳐서 메인 페이지로 내보내기!
export const ALL_EVENT_CUTS: EventCutInfo[] = [
  ...EVENT_CUTS_2022,
  // ...EVENT_CUTS_2023,
  // ...EVENT_CUTS_2024,
  // ...EVENT_CUTS_2025,
  // ...EVENT_CUTS_2026,
  // ...EVENT_CUTS_2027,
];