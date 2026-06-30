// src/data/events/index.ts

// 🌟 이벤트 데이터 뼈대(인터페이스)
export interface EventData {
  id: string;
  name: string;
  eventName?: string;
  eventType?: "하코" | "혼합" | "월링" | "없음";
  period: { start: string; end: string };
  bonus?: {
    attribute: string;
    unit?: string;
    characters?: string[];
  };
  gacha: {
    bannerPath: string;
    types: string[];
    featuredCardIds: string[];
  };
  eventBannerPath?: string; 
}

// 🌟 각 연도별 파일 불러오기
import { EVENTS_2022 } from "./2022";
import { EVENTS_2023 } from "./2023";
import { EVENTS_2024 } from "./2024";
//import { EVENTS_2025 } from "./2025";
//import { EVENTS_2026 } from "./2026";
//import { EVENTS_2027 } from "./2027";

// 🌟 하나로 합쳐서 내보내기!
export const FUTURE_EVENTS: EventData[] = [
  ...EVENTS_2022,
  ...EVENTS_2023,
  ...EVENTS_2024,
  //...EVENTS_2025,
  //...EVENTS_2026,
  //...EVENTS_2027
];