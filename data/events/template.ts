// 🌟 1. 다중 선택이 가능한 타입들
export type GachaType = "통상" | "한정" | "페스" | "월링" | "콜라보" | "복각" | "뾱각";
export type EventType = "하코" | "혼합" | "월링"; 

// 🌟 2. 안전한 이벤트 데이터 뼈대 (?가 붙은 건 지워도 안 터집니다!)
export interface EventData {
  id: string;                      // 간추린 ID (예: "001")
  
  // 🎯 가챠 정보 (필수)
  gacha: {
    types: GachaType[];            // 여러 개 선택 가능 (예: ["통상", "한정"])
    period: { start: string; end: string; }; // 가챠 기간
    featuredCardIds: string[];     // 이 ID로 카드DB를 뒤져서 이미지/이름을 자동 추출할 겁니다!
  };
  
  // 🎯 이벤트 정보 (가챠만 있는 경우 통째로 지워도 됨!)
  event?: {
    type: EventType;               // 하코, 혼합 등
    isCheerful?: boolean;          // 치어풀 여부 (지우면 일반 이벤트로 간주)
    period: { start: string; end: string; }; // 이벤트 기간
    bonus?: {
      attributes?: string[];       // 속성 다중 선택 (월링 대비)
      units?: string[];            // 유닛 보너스
      members?: string[];          // 캐릭터 보너스 (예: "Saki", "LUKA_0")
    };
  };
}

export const defineEvent = (data: EventData): EventData => data;