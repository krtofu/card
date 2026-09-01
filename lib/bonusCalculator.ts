// src/lib/bonusCalculator.ts

// 🌟 성씨 무시, 오직 '이름(또는 버싱)' 단독 매칭 판독기!
const isTargetMember = (card: any, targetName: string) => {
  const target = targetName.toLowerCase().replace(/\s+/g, "");
  const cName = (card.character || "").toLowerCase().replace(/\s+/g, "");
  const cUnit = (card.unit || "").toLowerCase().replace(/[^a-z0-9가-힣]/g, "");

  const vsNames = ["미쿠", "린", "렌", "루카", "메이코", "카이토", "miku", "rin", "len", "luka", "meiko", "kaito"];
  
  // 1. 버싱(VS) 계열 처리
  if (vsNames.some(vs => target.includes(vs)) && (target.includes("레오니") || target.includes("모모점") || target.includes("비배스") || target.includes("원더쇼") || target.includes("니고") || target.includes("버싱"))) {
    
    const isCharMatch = vsNames.some(vs => target.includes(vs) && cName.includes(vs));
    
    if (isCharMatch) {
      if (target.includes("레오니") && (cUnit.includes("레오니") || cUnit.includes("leo") || cUnit === "l/n")) return true;
      if (target.includes("모모점") && (cUnit.includes("모모점") || cUnit.includes("mmj") || cUnit.includes("more"))) return true;
      if (target.includes("비배스") && (cUnit.includes("비배스") || cUnit.includes("vivid") || cUnit === "vbs")) return true;
      if (target.includes("원더쇼") && (cUnit.includes("원더쇼") || cUnit.includes("wonder") || cUnit === "wxs") || cUnit === "wds") return true;
      if (target.includes("니고") && (cUnit.includes("니고") || cUnit.includes("25") || cUnit.includes("niigo") || cUnit.includes("n25") || cUnit === "ng")) return true;
      if (target.includes("버싱") && (cUnit.includes("버싱") || cUnit === "vs" || cUnit.includes("virtual"))) return true;
    }
    return false; 
  }

  // 2. 오리지널 캐릭터 & 성 없는 버싱(KAITO, MEIKO 등) 처리
  // 카드 캐릭터 이름에서 성씨를 떼고 이름만 추출하거나, 전체 이름에 해당 이름 단어가 온전히 포함되는지 확인합니다.
  // 예: target이 "사키"일 때 cName에 "사키"가 들어가되, "요이사키"처럼 다른 글자에 파묻힌 건 제외합니다.
  
  // 등록된 캐릭터들의 허용 가능한 '이름' 목록
  const characterNames = [
    "이치카", "사키", "호나미", "시호",
    "미노리", "하루카", "아이리", "시즈쿠",
    "코하네", "안", "아키토", "토우야",
    "츠카사", "에무", "네네", "루이",
    "카나데", "마후유", "에나", "미즈키",
    "미쿠", "린", "렌", "루카", "메이코", "카이토",
    "meiko", "kaito", "miku", "rin", "len", "luka"
  ];

  // 만약 입력한 target이 위 이름 목록에 포함된다면, 카드 이름이 그 '이름'을 정확히 포함하는지 확인 (성씨 무시)
  // 단, '카나데'의 '사키(요이사키)' 같은 오인식을 막기 위해 정확한 경계 검사 수행
  for (const name of characterNames) {
    if (target === name) {
      // 카드의 이름 부분에 해당 이름이 포함되어 있는지 확인
      // 정규식을 이용해 독립된 단어로 포함되어 있는지 체크 (예: '사키'는 '요이사키'를 통과시키지 않음)
      const regex = new RegExp(name, "i");
      if (regex.test(cName)) {
        // 단, 요이사키 카나데 예외 방어
        if (name === "사키" && cName.includes("요이사키")) return false;
        return true;
      }
    }
  }

  return cName.includes(target) || target.includes(cName);
};

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

// 🌟 통합형 유닛 매칭 헬퍼 (wds, ng, mmj 완벽 대응!)
const matchUnit = (cardUnit: string, targetUnit: string) => {
  const c = (cardUnit || "").toLowerCase().replace(/[^a-z0-9가-힣]/g, "");
  const t = (targetUnit || "").toLowerCase().replace(/[^a-z0-9가-힣]/g, "");
  if (!c || !t) return false;
  
  if ((t.includes("leo") || t.includes("ln")) && (c.includes("leo") || c.includes("레오니") || c.includes("ln"))) return true;
  if ((t.includes("mmj") || t.includes("more")) && (c.includes("more") || c.includes("모모점") || c.includes("mmj"))) return true;
  if ((t.includes("vbs") || t.includes("vivid")) && (c.includes("vivid") || c.includes("비배스") || c.includes("vbs"))) return true;
  
  // 🌟 wxs, wds 무엇을 쓰든 원더쇼로 인식!
  if ((t.includes("wds") || t.includes("wxs")) && (c.includes("wonder") || c.includes("원더쇼") || c.includes("wxs") || c.includes("wds"))) return true;
  
  // 🌟 n25, ng 무엇을 쓰든 니고로 인식!
  if ((t.includes("ng") || t.includes("n25") || t.includes("niigo")) && (c.includes("25") || c.includes("니고") || c.includes("niigo") || c.includes("n25") || c.includes("ng"))) return true;
  
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
  
  // 1. 캐릭터 매칭 (🌟 서브유닛 버싱 완벽 판독기 연결 완료!)
  let isCharMatch = false;
  if (bonusInfo.members && bonusInfo.members.length > 0) {
    isCharMatch = bonusInfo.members.some((targetChar: string) => isTargetMember(card, targetChar));
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