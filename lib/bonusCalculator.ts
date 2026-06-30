// src/lib/bonusCalculator.ts
import { EventData } from "@/data/events/index";
import { FinalCardInfo } from "@/data/cards/template";
import { UserCardState } from "@/app/cards/page";

// 🌟 마스터 랭크 & 스킬 레벨 보너스 테이블
const MR_BONUS_GENERAL = [10, 12.5, 15, 17.5, 20, 25]; // 0~5마랭
const MR_BONUS_WL_SUPPORT = [0, 0.5, 1, 1.5, 2, 2.5]; // 0~5마랭
const SKILL_BONUS_WL_SUPPORT = [0, 0.25, 1, 2.5]; // 1~4스킬렙

// 🌟 2025-09-28 12:00 패치 기준점 체크 헬퍼
const isPostFesUpdate = (startDateStr: string) => {
  // "2025-09-28. 12:00" -> "2025-09-28T12:00:00" 변환
  const cleanDate = startDateStr.replace('.', '').replace(' ', 'T') + ':00';
  const eventDate = new Date(cleanDate).getTime();
  const patchDate = new Date("2025-09-28T12:00:00").getTime();
  return eventDate >= patchDate;
};

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

// 유닛 매칭 헬퍼
const matchUnit = (cardUnit: string, targetUnit: string) => {
  const c = (cardUnit || "").toLowerCase().replace(/[^a-z0-9가-힣]/g, "");
  const t = (targetUnit || "").toLowerCase().replace(/[^a-z0-9가-힣]/g, "");
  if (!c || !t) return false;
  if (t.includes("leo") && (c.includes("leo") || c.includes("레오니") || c.includes("ln"))) return true;
  if (t.includes("more") && (c.includes("more") || c.includes("모모점") || c.includes("mmj"))) return true;
  if (t.includes("vivid") && (c.includes("vivid") || c.includes("비배스") || c.includes("vbs"))) return true;
  if (t.includes("wonder") && (c.includes("wonder") || c.includes("원더쇼") || c.includes("wxs"))) return true;
  if (t.includes("25") && (c.includes("25") || c.includes("니고") || c.includes("niigo") || c.includes("n25"))) return true;
  return c.includes(t) || t.includes(c);
};

export const calculateCardEventBonus = (
  card: FinalCardInfo,
  userState: UserCardState | undefined,
  event: EventData
): number => {
  // 이벤트 보너스 정보가 없으면 0%
  if (!event.bonus) return 0;

  // 유저 보유 상태 파악 (없으면 기본값 0마랭, 1스킬렙)
  const isOwned = userState?.isOwned || false;
  const mr = isOwned ? (userState?.masterRank || 0) : 0;
  const skillLv = isOwned ? (userState?.skillLevel || 1) : 1;

  // 카드 기본 매칭 정보 파악
  const isCharMatch = 
    (event.bonus.characters && event.bonus.characters.includes(card.character)) ||
    (event.bonus.unit && matchUnit(card.unit || "", event.bonus.unit));
  
  const isAttrMatch = matchAttribute(card.attribute || "", event.bonus.attribute);
  const isPickup = event.gacha.featuredCardIds.includes(card.id);
  const isFesCard = card.gachaType === "페스";

  // ==========================================
  // 🎯 1-3. 월드링크 서포트 유닛 보너스 계산 로직
  // ==========================================
  // (임시로 wlOrder가 있으면 서포트 보너스를 구하는 것으로 구현 - 추후 UI에 따라 분리 가능)
  if (event.eventType === "월링" && event.wlOrder) {
    let supportBonus = 0;
    
    // 1-3-1. 챕터 캐릭터 보너스 (+5%)
    if (isCharMatch) supportBonus += 5;
    
    // 1-3-2. 4성 기본 보너스 (1차: 10%, 2차 이후: 7.5%)
    supportBonus += (event.wlOrder === 1) ? 10 : 7.5;
    
    // 1-3-3. 마랭 보너스
    supportBonus += MR_BONUS_WL_SUPPORT[Math.max(0, Math.min(5, mr))];
    
    // 1-3-4. 스킬 레벨 보너스
    supportBonus += SKILL_BONUS_WL_SUPPORT[Math.max(0, Math.min(3, skillLv - 1))];
    
    // 1-3-5. 월링 카드 보너스 (2차, 3차...) - 추후 카드 데이터에 월링 기수 식별값 추가 시 정교화 가능
    if (card.gachaType === "월링" && isCharMatch) {
      if (event.wlOrder === 2) supportBonus += 20; // 1차 월링카드일 경우 (일단 모든 월링카드 일괄 20% 부여)
      else if (event.wlOrder === 3) supportBonus += 20; 
    }

    return supportBonus;
  }

  // ==========================================
  // 🎯 1-1. 일반 이벤트 보너스 계산 로직
  // ==========================================
  let totalBonus = 0;

  // [대격변 패치] 2025-09-28 이후의 '페스 픽업' 카드인지 검사!
  const isPostUpdateFesPickup = 
    isPostFesUpdate(event.period.start) && 
    event.gacha.types.includes("페스") && 
    isPickup && 
    isFesCard;

  if (isPostUpdateFesPickup) {
    // 1-1-1 & 1-1-2. 캐릭터/속성 보너스 (0%)
    totalBonus += 0; 
    // 1-1-3. 신규 페스 픽업카드 보너스 (70%)
    totalBonus += 70;
  } else {
    // 기존 규칙 적용
    // 1-1-1. 캐릭터 일치 (25%)
    if (isCharMatch) totalBonus += 25;
    // 1-1-2. 속성 일치 (25%)
    if (isAttrMatch) totalBonus += 25;
    // 1-1-3. 신규 픽업카드 보너스 (20%)
    if (isPickup) totalBonus += 20;
  }

  // 1-1-4. 마스터 랭크 보너스 (공통)
  // 단, 매칭된 보너스 수치가 하나도 없으면 마랭 보너스도 안 받음 (조건 맞을 때만 적용)
  if (totalBonus > 0 || isPostUpdateFesPickup) {
    totalBonus += MR_BONUS_GENERAL[Math.max(0, Math.min(5, mr))];
  }

  return totalBonus;
};