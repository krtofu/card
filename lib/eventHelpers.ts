import type { FinalCardInfo } from "@/data/cards/template"; // 🌟 완벽한 카드 최종 뼈대
import type { EventData } from "@/data/events/template";    // 🌟 이벤트 타입 가져오기

// 🎯 이벤트 시각 정보를 자동으로 채워주는 마법의 함수
export const getEventDisplayInfo = (
  event: EventData, 
  allCards: FinalCardInfo[]
) => {
  // 열쇠: 첫 번째 픽업 카드 ID (안전하게 첫 번째 값이 있는지 확인)
  const targetCardId = event.gacha?.featuredCardIds?.[0]; 
  
  // 1. 전체 카드 DB에서 열쇠랑 똑같은 ID를 가진 카드 찾기 
  // (이제 info.id가 아니라 쫙 펴진 card.id 로 바로 검색합니다!)
  const targetCard = allCards.find((card) => card.id === targetCardId);

  // 2. 카드를 못 찾았을 때의 기본값 (안전 장치)
  if (!targetCard) {
    return {
      gachaName: "알 수 없는 뽑기",
      eventName: event.event ? "알 수 없는 이벤트" : undefined,
      gachaBanner: "/gachas/default_banner.png",
      eventBanner: "/events/default_banner.png",
    };
  }

  // 3. 카드를 찾았다면? 평평하게 쫙 펴진 FinalCardInfo에서 바로 쏙쏙 빼오기!
  return {
    gachaName: targetCard.gachaPoolName || "이름 없는 뽑기",
    eventName: targetCard.eventName,
    gachaBanner: targetCard.gachaBannerPath,
    eventBanner: targetCard.eventBannerPath,
  };
};