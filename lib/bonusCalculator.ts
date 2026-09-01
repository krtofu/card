// src/lib/bonusCalculator.ts

// 🌟 1. 올바른 템플릿 파일에서 EventData를 가져오도록 수정!
import type { EventData } from "@/data/events/template";
import type { FinalCardInfo } from "@/data/cards/template";
import type { UserCardState } from "@/app/cards/page";

// 🌟 마스터 랭크 & 스킬 레벨 보너스 테이블
const MR_BONUS_GENERAL = [10, 12.5, 15, 17.5, 20, 25]; // 0~5마랭
const MR_BONUS_WL_SUPPORT = [0, 0.5, 1, 1.5, 2, 2.5]; // 0~5마랭
const SKILL_BONUS_WL_SUPPORT = [0, 0.25, 1, 2.5]; // 1~4스킬렙

// 속성 매칭 헬퍼
const matchAttribute = (cardAttr: string, targetAttr: string) => {
  const c = (cardAttr || "").toLowerCase();
  const t = (targetAttr || "").toLowerCase();
  if (c === t || c.includes(t)) return true;
  if (t === "pure" && c === "퓨어") return true;
  if (t === "happy" && c === "해피") return true;
  if (t === "cute" && c === "큐트") return true;
  if (t === "mysterious" && c === "미스테리어스") return true;
  if (t === "cool" && c === "쿨") return true;
  return false;
};

// 유닛 매칭 헬퍼 (🌟 최신형 철벽 방어 판독기 적용 완료)
const matchUnit = (cardUnit: string, targetUnit: string) => {
  const c = (cardUnit || "").toLowerCase().replace(/[^a-z0-9가-힣]/g, "");
  const t = (targetUnit || "").toLowerCase().replace(/[^a-z0-9가-힣]/g, "");
  if (!c || !t) return false;
  
  if (t.includes("leo") && (c.includes("leo") || c.includes("레오니") || c.includes("ln"))) return true;
  if (t.includes("mmj") && (c.includes("more") || c.includes("모모점") || c.includes("mmj"))) return true;
  if (t.includes("vbs") && (c.includes("vivid") || c.includes("비배스") || c.includes("vbs"))) return true;
  if (t.includes("wds") && (c.includes("wonder") || c.includes("원더쇼") || c.includes("wxs"))) return true;
  if (t.includes("niigo") && (c.includes("25") || c.includes("니고") || c.includes("niigo") || c.includes("n25"))) return true;
  if (t.includes("vs") && (c.includes("vs") || c.includes("virtual") || c.includes("버싱"))) return true;
  
  return c.includes(t) || t.includes(c);
};

export const calculateCardEventBonus = (
  card: FinalCardInfo,
  userState: UserCardState | undefined,
  event: EventData
): number => {
  // 🌟 V3 구조 대응: 이벤트(event.event)가 없거나 보너스 정보가 없으면 0%
  if (!event.event || !event.event.bonus) return 0;

  const bonusInfo = event.event.bonus;

  // 유저 보유 상태 파악 (없으면 기본값 0마랭, 1스킬렙)
  const isOwned = userState?.isOwned || false;
  const mr = isOwned ? (userState?.masterRank || 0) : 0;
  const skillLv = isOwned ? (userState?.skillLevel || 1) : 1;

  // ==========================================
  // 🎯 V3 구조에 맞춘 다중 배열 매칭 시스템
  // ==========================================
  
  // 1. 캐릭터 매칭 (characters -> members로 변경됨)
  let isCharMatch = false;
  if (bonusInfo.members && bonusInfo.members.length > 0) {
    isCharMatch = bonusInfo.members.some((targetChar: string) => {
      const t = String(targetChar).toLowerCase();
      const cName = (card.character || "").toLowerCase();
      const cId = (card.id || "").toLowerCase();
      return cName.includes(t) || t.includes(cName) || cId.includes(t);
    });
  }
  
  // 2. 유닛 매칭 (V3부터 다중 선택 배열로 변경됨)
  if (!isCharMatch && bonusInfo.units && bonusInfo.units.length > 0) {
    isCharMatch = bonusInfo.units.some((u: string) => matchUnit(card.unit || "", u));
  }
  
  // 3. 속성 매칭 (V3부터 다중 선택 배열로 변경됨)
  const isAttrMatch = bonusInfo.attributes && bonusInfo.attributes.length > 0
    ? bonusInfo.attributes.some((a: string) => matchAttribute(card.attribute || "", a))
    : false;

  const isPickup = event.gacha.featuredCardIds.includes(card.id);
  const isFesCard = card.gachaType === "페스";

  // ==========================================
  // 🎯 월드링크 서포트 유닛 보너스 로직
  // ==========================================
  const isWorldLink = event.event.type === "월링";
  const wlOrder = (event.event as any).wlOrder; // 템플릿에 없더라도 에러 안 나게 안전 처리

  if (isWorldLink && wlOrder) {
    let supportBonus = 0;
    
    // 1-3-1. 챕터 캐릭터 보너스 (+5%)
    if (isCharMatch) supportBonus += 5;
    
    // 1-3-2. 4성 기본 보너스 (1차: 10%, 2차 이후: 7.5%)
    supportBonus += (wlOrder === 1) ? 10 : 7.5;
    
    // 1-3-3. 마랭 보너스
    supportBonus += MR_BONUS_WL_SUPPORT[Math.max(0, Math.min(5, mr))];
    
    // 1-3-4. 스킬 레벨 보너스
    supportBonus += SKILL_BONUS_WL_SUPPORT[Math.max(0, Math.min(3, skillLv - 1))];
    
    // 1-3-5. 월링 카드 보너스
    if (card.gachaType === "월링" && isCharMatch) {
      if (wlOrder === 2 || wlOrder === 3) supportBonus += 20; 
    }

    return supportBonus;
  }

  // ==========================================
  // 🎯 일반 이벤트 보너스 계산 로직 (V1 ~ V7 마스터 엔진)
  // ==========================================
  let totalBonus = 0;

  // 🌟 이벤트 시작일(YYYY-MM-DD) 추출 (V3 구조에 맞춤)
  const startDate = event.event.period.start.substring(0, 10); 
  
  const isVSWithoutSubunit = card.unit === "버싱";
  const isNewFesPickup = isPickup && isFesCard;
  
  // 마스터랭크 안전 처리 (0~5)
  const safeMR = Math.max(0, Math.min(5, mr));

  // ⏳ 버전 1 (2022-05-21 ~ 2022-09-24)
  if (startDate < "2022-09-26") {
    if (isCharMatch) totalBonus += 20;
    if (isAttrMatch) totalBonus += 20;
    if (isCharMatch && isAttrMatch) totalBonus += 10;
  }
  // ⏳ 버전 2 (2022-09-26 ~ 2023-02-05)
  else if (startDate < "2023-02-06") {
    if (isCharMatch) totalBonus += 20;
    if (isAttrMatch) totalBonus += 20;
    if (isCharMatch && isAttrMatch) totalBonus += 10;
    
    if (totalBonus > 0) totalBonus += [0, 2, 4, 6, 8, 10][safeMR];
  }
  // ⏳ 버전 3 (2023-02-06 ~ 2023-06-11)
  else if (startDate < "2023-06-12") {
    if (isCharMatch) totalBonus += isVSWithoutSubunit ? 15 : 25;
    if (isAttrMatch) totalBonus += 25;
    if (isPickup) totalBonus += 20;
    
    if (totalBonus > 0 || isPickup) totalBonus += [0, 2, 4, 6, 8, 10][safeMR];
  }
  // ⏳ 버전 4 (2023-06-12 ~ 2024-09-28)
  else if (startDate < "2024-09-30") {
    if (isCharMatch) totalBonus += isVSWithoutSubunit ? 15 : 25;
    if (isAttrMatch) totalBonus += 25;
    if (isPickup) totalBonus += 20;
    
    if (totalBonus > 0 || isPickup) totalBonus += [0, 10, 11, 12, 13, 15][safeMR];
  }
  // ⏳ 버전 5 (2024-09-30 ~ 2025-04-28)
  else if (startDate < "2025-04-30") {
    if (isCharMatch) totalBonus += isVSWithoutSubunit ? 15 : 25;
    if (isAttrMatch) totalBonus += 25;
    if (isPickup) totalBonus += 20;
    
    if (totalBonus > 0 || isPickup) totalBonus += [10, 12.5, 15, 17.5, 20, 25][safeMR];
  }
  // ⏳ 버전 6 (2025-04-30 ~ 2025-09-28)
  else if (startDate < "2025-09-30") {
    if (isCharMatch) totalBonus += 25; 
    if (isAttrMatch) totalBonus += 25;
    if (isPickup) totalBonus += 20;
    
    if (totalBonus > 0 || isPickup) totalBonus += [10, 12.5, 15, 17.5, 20, 25][safeMR];
  }
  // ⏳ 버전 7 (2025-09-30 ~ 현재)
  else {
    if (!isNewFesPickup) {
      if (isCharMatch) totalBonus += 25;
      if (isAttrMatch) totalBonus += 25;
    }
    
    if (isNewFesPickup) {
      totalBonus += 70;
    } else if (isPickup) {
      totalBonus += 20;
    }
    
    if (totalBonus > 0 || isNewFesPickup) {
      totalBonus += [10, 12.5, 15, 17.5, 20, 25][safeMR];
    }
  }

  return totalBonus;
};