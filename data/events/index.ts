// src/data/events/index.ts

// 🌟 1. 템플릿 파일에서 새로 만든 완벽한 뼈대(인터페이스) 불러오기!
// (이제 여기서 인터페이스를 길게 적을 필요가 없습니다!)
import type { EventData } from "./template";

// 🌟 2. 각 연도별 파일 불러오기
import { EVENTS_2022 } from "./2022";
import { EVENTS_2023 } from "./2023";
import { EVENTS_2024 } from "./2024";
import { EVENTS_2025 } from "./2025";
import { EVENTS_2026 } from "./2026";
import { EVENTS_2027 } from "./2027";

// 🌟 3. 하나로 합쳐서 내보내기!
export const FUTURE_EVENTS: EventData[] = [
  ...EVENTS_2022,
  ...EVENTS_2023,
  ...EVENTS_2024,
  ...EVENTS_2025,
  ...EVENTS_2026,
  ...EVENTS_2027
];