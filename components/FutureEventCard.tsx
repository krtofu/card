// src/components/FutureEventCard.tsx
"use client";

import { useState } from "react";
import Image from "next/image";
import { EventData } from "@/data/events/template";
import { ALL_CARDS } from "@/data/cards"; 
import CardItem from "@/components/CardItem"; 
import { UserCardState } from "@/app/cards/page";
import { FinalCardInfo } from "@/data/cards/template";
import { calculateCardEventBonus } from "@/lib/bonusCalculator";
import CostumePreviewCard from "@/components/CostumePreviewCard";

const PREMIUM_BADGE_STYLE: React.CSSProperties = {
  borderColor: "rgba(255,255,255,0.35)",
  backgroundImage: "linear-gradient(180deg, rgba(255,255,255,0.18), rgba(255,255,255,0) 55%)",
  textShadow: "0px 1px 2px rgba(24, 24, 27, 0.5), 0px 0px 3px rgba(24, 24, 27, 0.2)",
};

const PREMIUM_BADGE_CLASS = "inline-flex items-center justify-center rounded-full border px-3 py-1 text-[11px] font-bold text-white shadow-md";

const getGachaBadgeBg = (gachaType: string) => {
  switch (gachaType) {
    case "통상": return "bg-sky-500";
    case "한정": return "bg-pink-500";
    case "페스": return "bg-violet-500";
    case "월링": return "bg-emerald-500";
    case "콜라보": return "bg-amber-500";
    case "유료": return "bg-zinc-950 !text-amber-300 shadow-[0_0_12px_rgba(251,191,36,0.25)]";
    default: return "bg-zinc-600";
  }
};

const getEventTypeBadgeBg = (eventType?: string) => {
  switch (eventType) {
    case "하코": return "bg-rose-500";
    case "혼합": return "bg-indigo-500";
    case "월링": return "bg-emerald-500";
    default: return "bg-zinc-600";
  }
};

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

const getUnitLogo = (unitName: string) => {
  if (!unitName) return null;
  const u = unitName.toLowerCase().replace(/[^a-z0-9가-힣]/g, "");
  
  // 🌟 한글("레오니", "모모점")도 알아듣게 만들고, 파일명은 다시 _icon.png 로 원상복구!
  if (u.includes("leo") || u.includes("레오니") || u.includes("ln")) return "/icons/Leoneed_icon.png";
  if (u.includes("mmj") || u.includes("모모점") || u.includes("more")) return "/icons/MMJ_icon.png";
  if (u.includes("vbs") || u.includes("비배스") || u.includes("vivid")) return "/icons/VBS_icon.png";
  if (u.includes("wds") || u.includes("원더쇼") || u.includes("wonder")) return "/icons/Wds_icon.png";
  if (u.includes("niigo") || u.includes("니고") || u.includes("25") || u.includes("n25")) return "/icons/Niigo_icon.png";
  if (u.includes("vs") || u.includes("virtual") || u.includes("버싱")) return "/icons/VS_icon.png";
  
  return null;
};

// 🌟 멤버 이름만 보고 소속 유닛을 알아맞히는 마법의 함수!
const guessUnitByMember = (memberName: string) => {
  if (!memberName) return "";
  const m = memberName.replace(/\s+/g, "");

  // 🥇 1순위: 버싱 이름이 하나라도 포함되어 있으면 묻지도 따지지도 않고 '버싱' 로고 당첨! (예: "니고 미쿠")
  if (["미쿠", "린", "렌", "루카", "메이코", "카이토", "버싱"].some(n => m.includes(n))) return "버싱";

  // 🥈 2순위: 버싱이 아니라면 오리지널 캐릭터 소속 유닛 찾기
  if (["이치카", "사키", "호나미", "시호", "레오니"].some(n => m.includes(n))) return "레오니";
  if (["미노리", "하루카", "아이리", "시즈쿠", "모모점"].some(n => m.includes(n))) return "모모점";
  if (["코하네", "안", "아키토", "토우야", "비배스"].some(n => m.includes(n))) return "비배스";
  if (["츠카사", "에무", "네네", "루이", "원더쇼"].some(n => m.includes(n))) return "원더쇼";
  if (["카나데", "마후유", "에나", "미즈키", "니고"].some(n => m.includes(n))) return "니고";
  
  return "";
};

const getSkillBonusPercentage = (skillType: string, level: number, unit: string, isAwakened: boolean, charRank: number = 1, isOwned: boolean = false) => {
  const safeLevel = Math.max(1, Math.min(4, level)); 
  const idx = safeLevel - 1;
  const skill = (skillType || "").replace(/\s+/g, "").toLowerCase();

  if (skill.includes("블페") || skill.includes("블룸")) {
    if (isAwakened) {
      const maxLimits = [140, 145, 150, 160];
      if (!isOwned) return maxLimits[idx];
      const bases = [90, 95, 100, 110];
      const bloomBonus = Math.floor(charRank / 2);
      return Math.min(maxLimits[idx], bases[idx] + bloomBonus);
    }
    const isVS = unit === "무소속 / VIRTUAL SINGER" || unit.includes("버싱") || unit.includes("VS") || unit.toLowerCase().includes("virtual");
    return isVS ? [130, 135, 140, 150][idx] : [120, 130, 140, 150][idx];
  }

  if (skill.includes("스업") && !skill.includes("퍼스업") && !skill.includes("굿스업") && !skill.includes("체스업") && !skill.includes("팀스업") && !skill.includes("조건부")) return [100, 105, 110, 120][idx];
  if (skill.includes("퍼스업")) return [110, 115, 120, 130][idx];
  if (skill.includes("굿스업")) return [120, 125, 130, 140][idx];
  if (skill.includes("체스업")) return [120, 125, 130, 140][idx];
  if (skill.includes("팀스업")) return [130, 135, 140, 150][idx];
  if (skill.includes("판강") || skill.includes("판정")) return [80, 85, 90, 100][idx];
  if (skill.includes("힐") || skill.includes("회복")) return [80, 85, 90, 100][idx];

  if (skill.includes("블랑") || skill.includes("초기페스")) {
    const isVS = unit === "무소속 / VIRTUAL SINGER" || unit.includes("버싱") || unit.includes("VS") || unit.toLowerCase().includes("virtual");
    return isVS ? [130, 135, 140, 150][idx] : [120, 130, 140, 150][idx];
  }
  return 0;
};

interface FutureEventCardProps {
  // 🌟 순정 EventData에 부모가 몰래 얹어준 데이터(name, eventType 등)를 합쳐서 허가증 발급!
  event: EventData & {
    name: string;
    eventName?: string;
    eventType?: string;
    eventBannerPath?: string;
    hakoTag?: string; // 🌟 추가! (예: "사키 1차 하코")
    gacha: EventData["gacha"] & {
      bannerPath?: string;
    };
  };
  index: number;
  userStates: Record<string, UserCardState>; 
  onCardClick: (card: FinalCardInfo) => void; 
  showPostAwake: boolean;
  isFilterActive: boolean; 
  isEventMatched: boolean; 
  matchedCardIds: string[]; 
  monthMarker?: string;
  daysLeft?: number; 
  isOngoing?: boolean;
  isEnded?: boolean;
}

export default function FutureEventCard({ 
  event, index, userStates, onCardClick, showPostAwake, 
  isFilterActive, isEventMatched, matchedCardIds, monthMarker, daysLeft, isOngoing, isEnded
}: FutureEventCardProps) {
  
  const [isEventMode, setIsEventMode] = useState(false);
  const [showCostumes, setShowCostumes] = useState(false);
  const [sortMode, setSortMode] = useState<"bonus" | "score">("bonus");
  const [refMasterRank, setRefMasterRank] = useState<number>(0);
  const [refSkillLevel, setRefSkillLevel] = useState<number>(1);

  // 🌟 철벽 방어: featuredCardIds가 혹시 스니펫에서 누락되더라도 에러 없이 빈 배열로 처리!
  const pickupCards = (event.gacha?.featuredCardIds || [])
    .map((cardId) => ALL_CARDS.find((c: any) => c.id === cardId || ((c as any).info && (c as any).info.id === cardId)))
    .filter((c) => c !== undefined)
    .map(card => {
      const realId = (card as any).info ? (card as any).info.id : (card as any).id;
      const myState = userStates[realId];
      
      const fakeState = myState?.isOwned ? myState : { 
        isOwned: true, 
        masterRank: refMasterRank, 
        skillLevel: refSkillLevel, 
        isTarget: myState?.isTarget 
      };
      
      const bonus = calculateCardEventBonus(card as any, fakeState, event);
      const score = getSkillBonusPercentage((card as any).skillType || "", fakeState.skillLevel, (card as any).unit || "", showPostAwake, 1, fakeState.isOwned);

      return { card, myState, bonus, score };
    });

  const getBonusCards = () => {
    // 🌟 이벤트가 없거나 보너스 정보가 없으면 빈 배열 반환
    if (!event.event?.bonus) return [];

    // 🌟 1. 해당 이벤트 시작일 기준으로 이미 출시된 모든 카드 가져오기
    const releasedCards = ALL_CARDS.filter(card => {
      if (card.releaseDate) {
        const startStr = event.gacha?.period?.start || "";
        const eventDateNum = parseInt(startStr.replace(/[^0-9]/g, "").substring(0, 8) || "99999999", 10);
        const cardDateNum = parseInt(card.releaseDate.replace(/[^0-9]/g, "").substring(0, 8), 10);
        
        if (cardDateNum > eventDateNum) return false; // 미래의 카드는 제외!
      }
      return true;
    });

    // 🌟 2. 가상 상태(마랭/스킬렙)를 입혀서 보너스 계산기를 돌리고, 0% 초과만 싹 남기기!
    const cardsWithValues = releasedCards.map(card => {
      const realId = (card as any).info ? (card as any).info.id : (card as any).id;
      const myState = userStates[realId];
      
      const fakeState = myState?.isOwned ? myState : { 
        isOwned: true, 
        masterRank: refMasterRank, 
        skillLevel: refSkillLevel, 
        isTarget: myState?.isTarget 
      };
      
      const bonus = calculateCardEventBonus(card as any, fakeState, event);
      const score = getSkillBonusPercentage((card as any).skillType || "", fakeState.skillLevel, (card as any).unit || "", showPostAwake, 1, fakeState.isOwned);
      
      return { card, myState, bonus, score };
    }).filter(item => item.bonus > 0); // 💡 핵심: 20%든 50%든 보너스가 0%만 아니면 전부 합격!

    // 🌟 3. 정렬 기준(이벤포순 or 스코어순)에 따라 나열하기
    return cardsWithValues.sort((a, b) => {
      if (sortMode === "score") {
        if (b.score !== a.score) return b.score - a.score;
      } else {
        if (b.bonus !== a.bonus) return b.bonus - a.bonus;
      }
      
      // 내가 보유한 카드 > 타겟 카드 > 미보유 카드 순으로 정렬
      const valA = a.myState?.isOwned ? 2 : (a.myState?.isTarget ? 1 : 0);
      const valB = b.myState?.isOwned ? 2 : (b.myState?.isTarget ? 1 : 0);
      if (valA !== valB) return valB - valA;
      
      // 동일하면 출시일 최신순 정렬
      return ((b.card as any).releaseDate || "").localeCompare((a.card as any).releaseDate || "");
    });
  };

  const bonusCards = getBonusCards();
  const displayItems = isEventMode ? bonusCards : pickupCards;
  
  // 🌟 (event.gacha as any) 를 써서 타입스크립트의 잔소리 완벽 차단!
  const displayBanner = isEventMode && (event as any).eventBannerPath 
    ? (event as any).eventBannerPath 
    : (event.gacha as any)?.bannerPath;

  // 🌟 units가 비어있어도 당황하지 않고, 첫 번째 멤버 이름을 보고 유닛 로고를 찾아옵니다!
  const unitLogo = isEventMode && event.eventType?.trim() === "하코"
    ? getUnitLogo(event.event?.bonus?.units?.[0] || guessUnitByMember(event.event?.bonus?.members?.[0] || ""))
    : null;

  const fadeClass = isFilterActive && !isEventMatched 
    ? "opacity-30 grayscale hover:opacity-60 transition-opacity duration-300" 
    : "opacity-100 transition-opacity duration-300";

  const combinedCostumeData = () => {
    const charsWithCostumes = pickupCards
      .map(p => (p.card as any).info || p.card)
      .filter(c => c.costume)
      .map(c => ({
        name: c.character,
        title: c.cardName, 
        subtitle: `${c.cardName} ${c.costume.name}`, 
        // 🌟 철벽 방어: 의상 세트가 없을 경우를 대비
        sets: (c.costume.sets || []).map((set: any) => ({
          key: set.key, label: set.label, front: [set.front], back: [set.back]
        }))
      }));

    if (charsWithCostumes.length === 0) return null;

    return {
      title: "", 
      subtitle: "", 
      characters: charsWithCostumes
    };
  };

  const costumePreviewPayload = combinedCostumeData();

  return (
    <div className={`flex flex-col xl:flex-row items-stretch gap-4 xl:gap-8 ${fadeClass}`}>
      
      {/* 🌟 ================= 모바일 전용 타임라인 ================= */}
      <div className="xl:hidden relative flex flex-col items-center justify-center w-full mt-2 mb-2">
        {index > 0 && (
          <div className="absolute -top-[52px] bottom-1/2 w-px bg-zinc-200 dark:bg-white/10 -z-10" />
        )}
        
        <div className="relative flex justify-center items-center">
          {monthMarker && (
            <div className="absolute right-full mr-3 px-2 py-0.5 rounded-full bg-white dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 text-[10px] font-bold border border-zinc-200 dark:border-white/10 shadow-sm whitespace-nowrap z-30">
              {monthMarker}월
            </div>
          )}
          
          {isEventMode && unitLogo ? (
            <div className="w-8 h-8 rounded-full bg-white dark:bg-zinc-900 border-2 border-zinc-200 dark:border-white/20 shadow-md flex items-center justify-center overflow-hidden p-1 z-20">
              <img src={unitLogo} alt="Unit Logo" className="w-full h-full object-contain drop-shadow-sm" />
            </div>
          ) : (
            <div className={`w-3.5 h-3.5 rounded-full border-[3px] border-zinc-200 dark:border-zinc-800 z-20 shadow-sm ${isFilterActive && !isEventMatched ? 'bg-zinc-300 dark:bg-zinc-600' : 'bg-primary dark:bg-white'}`} />
          )}
        </div>

        <div className="absolute top-1/2 -bottom-2 w-px bg-zinc-200 dark:bg-white/10 -z-10" />
      </div>

      {/* ================= 좌측: 배너 영역 ================= */}
      <div className="flex-1 w-full relative z-10 flex flex-col justify-center xl:px-4 py-2 shrink-0">
        <div className="w-full max-w-[520px] mx-auto bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-white/10 rounded-2xl overflow-visible shadow-xl flex flex-col relative h-fit transition-colors">
          
          {/* 🌟 잔당 처치: 이벤트 모드 토글 버튼 노출 조건을 V3에 맞게 event.event?.bonus로 교체! */}
          {event.event?.bonus && (
             <div className="absolute -left-6 sm:-left-12 md:-left-[70px] top-1/2 -translate-y-1/2 flex items-center z-50">
               <button
                onClick={() => { setIsEventMode(!isEventMode); setShowCostumes(false); }}
                className="w-10 h-10 rounded-full bg-white dark:bg-zinc-800 border-[3px] border-zinc-200 dark:border-zinc-950 shadow-[0_0_15px_rgba(0,0,0,0.1)] dark:shadow-[0_0_15px_rgba(0,0,0,0.5)] flex items-center justify-center hover:bg-zinc-100 dark:hover:bg-zinc-700 hover:scale-110 transition-all z-10 relative"
                title={isEventMode ? "가챠 배너로 돌아가기" : "이벤트 배너 보기"}
              > 
                <img 
                 src={isEventMode ? "/icons/Can.png" : "/icons/Crystal.png"} 
                 alt="모드 전환" 
                 className="w-[22px] h-[22px] object-contain drop-shadow-sm transition-transform active:scale-95" 
                />
              </button>
             <div className="w-6 sm:w-10 md:w-[46px] h-[3px] bg-zinc-300 dark:bg-zinc-600 absolute left-5 top-1/2 -translate-y-1/2 -z-10 shadow-sm transition-colors" />
            </div>
          )}

          <div className="relative aspect-[21/9] w-full bg-zinc-100 dark:bg-zinc-950/40 flex items-center justify-center border-b border-zinc-200 dark:border-white/10 overflow-hidden rounded-t-2xl shrink-0 transition-colors">
            {displayBanner ? (
              <img 
                key={displayBanner}
                src={displayBanner} 
                alt={`${event.name} 배너`}
                className="absolute inset-0 w-full h-full animate-fade-in object-cover"
                onError={(e) => { e.currentTarget.style.display = 'none'; }}
              />
            ) : (
              <span className="text-zinc-400 dark:text-zinc-600 text-sm font-bold tracking-widest transition-colors">NO BANNER IMAGE</span>
            )}
            
            {!isEventMode && (
              <div className="absolute top-3 left-3 flex gap-2 z-20">
                {/* 🌟 철벽 방어: types 배열이 없더라도 에러 없이 렌더링 통과! */}
                {(event.gacha?.types || []).map((type, idx) => (
                  <span key={idx} className={`${PREMIUM_BADGE_CLASS} ${getGachaBadgeBg(type)}`} style={PREMIUM_BADGE_STYLE}>{type}</span>
                ))}
              </div>
            )}

            {event.eventType && event.eventType !== "없음" && (
              <div className="absolute top-3 right-3 flex z-20">
                {/* 🌟 N차 하코 뱃지는 지우고, 원래 있던 이벤트 타입(하코/혼합) 뱃지만 남깁니다! */}
                <span className={`${PREMIUM_BADGE_CLASS} ${getEventTypeBadgeBg(event.eventType)}`} style={PREMIUM_BADGE_STYLE}>
                  {event.eventType}
                </span>
              </div>
            )}
          </div>
          
          <div className="p-4 bg-white/90 dark:bg-zinc-950/90 backdrop-blur-sm relative z-20 flex justify-between items-start flex-1 rounded-b-2xl transition-colors">
            <div className="min-w-0 pr-2">
              <h3 className="text-lg font-bold text-zinc-900 dark:text-white mb-1 truncate transition-colors">
                {isEventMode ? (event.eventName || event.name) : event.name}
              </h3>
              {/* 🌟 이벤트 모드일 땐 이벤트 기간, 가챠 모드일 땐 가챠 기간 표시! */}
              {(() => {
                const displayPeriod = isEventMode && event.event?.period ? event.event.period : event.gacha?.period;
                const startStr = displayPeriod?.start?.replace(/-/g, '.') || "미정";
                const endStr = (displayPeriod?.end || displayPeriod?.start || "").replace(/-/g, '.') || "미정";
                return (
                  <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400 transition-colors tracking-wide">
                    🕒 {startStr} ~ {endStr}
                  </p>
                );
              })()}
            </div>
            
            {daysLeft !== undefined && !isNaN(daysLeft) && (
              <div className="shrink-0 flex items-center pt-0.5">
                {isEnded ? (
                  <span className="bg-zinc-700 dark:bg-zinc-800 text-zinc-300 dark:text-zinc-400 text-[10px] px-2.5 py-0.5 rounded-full border border-zinc-600 dark:border-zinc-900 font-bold whitespace-nowrap shadow-inner transition-colors">
                    종료됨
                  </span>
                ) : isOngoing ? (
                  <span className="bg-emerald-50 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-300 text-[10px] px-2.5 py-0.5 rounded-full border border-emerald-300 dark:border-amber-400/50 font-bold whitespace-nowrap shadow-sm transition-colors">
                    ✨ 진행 중
                  </span>
                ) : daysLeft === 0 ? (
                  <span className="bg-red-50 dark:bg-red-500/20 text-red-600 dark:text-red-400 text-[10px] px-2.5 py-0.5 rounded-full border border-red-300 dark:border-red-500/30 font-bold whitespace-nowrap shadow-sm animate-pulse transition-colors">
                    🔥 D-Day
                  </span>
                ) : (
                  <span className="bg-sky-50 dark:bg-sky-500/20 text-sky-600 dark:text-sky-400 text-[10px] px-2.5 py-0.5 rounded-full border border-sky-300 dark:border-sky-500/30 font-bold whitespace-nowrap shadow-sm transition-colors">
                    ⏳ D-{daysLeft}
                  </span>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ================= 중앙 타임라인 선 (데스크톱 전용) ================= */}
      <div className="hidden xl:flex flex-col items-center justify-center relative z-20 w-10 shrink-0">
        <div className="relative flex flex-col justify-center items-center">
          {monthMarker && (
            <div className="absolute bottom-full mb-4 px-2.5 py-0.5 rounded-full bg-white dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 text-[11px] font-bold border border-zinc-200 dark:border-white/10 shadow-sm z-30 whitespace-nowrap transition-colors">
              {monthMarker}월
            </div>
          )}

          {isEventMode && unitLogo ? (
            <div className="w-9 h-9 rounded-full bg-white dark:bg-zinc-900 border-2 border-zinc-200 dark:border-white/20 shadow-md dark:shadow-[0_0_15px_rgba(255,255,255,0.3)] z-20 flex items-center justify-center overflow-hidden p-1 transition-all">
               <img src={unitLogo} alt="Unit Logo" className="w-full h-full object-contain drop-shadow-sm dark:drop-shadow-md" />
            </div>
          ) : (
            <div className={`w-4 h-4 rounded-full border-4 border-zinc-200 dark:border-zinc-950 shadow-md dark:shadow-[0_0_15px_rgba(255,255,255,0.5)] transition-all ${isFilterActive && !isEventMatched ? 'bg-zinc-300 dark:bg-zinc-600' : 'bg-primary dark:bg-white'}`} />
          )}
        </div>
      </div>

      {/* ================= 우측: 카드 목록 ================= */}
      <div className="flex-1 w-full relative z-10 flex flex-col justify-center xl:px-4 py-2 shrink-0">
        <div className="bg-white/50 dark:bg-zinc-900/30 border border-zinc-200 dark:border-white/5 rounded-3xl p-6 w-full max-w-[520px] mx-auto flex flex-col h-fit transition-colors">
          
          <div className="flex flex-wrap items-center justify-start sm:justify-between gap-3 mb-4 pb-3 border-b border-zinc-200 dark:border-white/10 shrink-0 transition-colors">
            <div className="flex items-center gap-1.5 font-bold text-zinc-700 dark:text-zinc-300 text-sm transition-colors shrink-0">
              {isEventMode ? <><span className="text-amber-500 dark:text-amber-400">🎁</span> 이벤트 보너스 멤버</> : <><span className="text-primary dark:text-sky-400">✨</span> 가챠 픽업 멤버</>}
            </div>
            
            <div className="flex flex-wrap items-center gap-2 shrink-0">
               {isEventMode ? (
                 <>
                   <button
                     onClick={() => setSortMode(prev => prev === "bonus" ? "score" : "bonus")}
                     className="w-7 h-7 flex items-center justify-center rounded-full bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-white/10 text-zinc-500 dark:text-zinc-400 hover:text-primary dark:hover:text-white hover:bg-zinc-50 dark:hover:bg-zinc-700 transition-colors shadow-sm"
                     title={sortMode === "bonus" ? "이벤포순 정렬 중 (클릭 시 스업 수치순)" : "스업 수치순 정렬 중 (클릭 시 이벤포순)"}
                   >
                     {sortMode === "bonus" ? "✦" : "⇪"}
                   </button>

                   {sortMode === "bonus" ? (
                     <div className="flex items-center bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-white/10 rounded-full p-1 shadow-sm animate-fade-in transition-colors">
                        <span className="text-[10px] text-zinc-500 dark:text-zinc-400 font-bold px-2 whitespace-nowrap hidden sm:inline-block">미보유 기준 마랭</span>
                        <span className="text-[10px] text-zinc-500 dark:text-zinc-400 font-bold pl-2 pr-1 whitespace-nowrap sm:hidden">마랭</span>
                        <div className="flex gap-0.5 pr-0.5">
                          {[0, 1, 2, 3, 4, 5].map(lv => (
                            <button key={lv} onClick={() => setRefMasterRank(lv)}
                              className={`w-[20px] h-[20px] flex items-center justify-center rounded-full text-[10px] font-bold transition-all ${refMasterRank === lv ? 'bg-amber-100 dark:bg-amber-500/20 text-amber-600 dark:text-amber-300 border border-amber-300 dark:border-amber-400/50 scale-105' : 'text-zinc-500 hover:bg-zinc-100 dark:hover:bg-zinc-700 hover:text-zinc-800 dark:hover:text-zinc-200'}`}>
                              {lv}
                            </button>
                          ))}
                        </div>
                     </div>
                   ) : (
                     <div className="flex items-center bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-white/10 rounded-full p-1 shadow-sm animate-fade-in transition-colors">
                        <span className="text-[10px] text-zinc-500 dark:text-zinc-400 font-bold px-2 whitespace-nowrap hidden sm:inline-block">미보유 기준 Lv</span>
                        <span className="text-[10px] text-zinc-500 dark:text-zinc-400 font-bold pl-2 pr-1 whitespace-nowrap sm:hidden">Lv</span>
                        <div className="flex gap-0.5 pr-0.5">
                          {[1, 2, 3, 4].map(lv => (
                            <button key={lv} onClick={() => setRefSkillLevel(lv)}
                              className={`w-[20px] h-[20px] flex items-center justify-center rounded-full text-[10px] font-bold transition-all ${refSkillLevel === lv ? 'bg-primary/20 text-primary border border-primary/50 scale-105' : 'text-zinc-500 hover:bg-zinc-100 dark:hover:bg-zinc-700 hover:text-zinc-800 dark:hover:text-zinc-200'}`}>
                              {lv}
                            </button>
                          ))}
                        </div>
                     </div>
                   )}
                 </>
               ) : (
                 <div className="flex items-center gap-1.5">
                    {costumePreviewPayload && (
                      <button 
                        onClick={() => setShowCostumes(!showCostumes)} 
                        className={`w-[30px] h-[30px] rounded-full flex items-center justify-center transition-all shadow-md text-[14px] ${
                          showCostumes 
                            ? 'bg-pink-100 dark:bg-pink-500/20 border border-pink-300 dark:border-pink-500/50 shadow-[0_0_10px_rgba(236,72,153,0.3)]' 
                            : 'bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-white/10 hover:bg-zinc-50 dark:hover:bg-zinc-700'
                        }`}
                        title={showCostumes ? "카드 보기" : "의상 프리뷰 보기"}
                      >
                        🛍️
                      </button>
                    )}

                    {/* 🌟 철벽 방어: 배열이 비어있어도 통과! */}
                    {(event.gacha?.types || []).map(t => {
                      if (t === "통상") return <img key={t} src="/icons/status/normal.png" className="w-[30px] h-[30px] rounded-full shadow-md" alt="통상" title="통상" />;
                      if (["한정", "페스", "월링"].includes(t)) return <img key={t} src="/icons/status/limited.png" className="w-[30px] h-[30px] rounded-full shadow-md" alt={t} title={t} />;
                      return null;
                    })}
                 </div>
               )}
            </div>
          </div>
          
          {showCostumes && !isEventMode && costumePreviewPayload ? (
            <div className="w-full shadow-2xl rounded-2xl bg-white/90 dark:bg-zinc-950/80 border border-zinc-200 dark:border-white/10 overflow-hidden animate-fade-in transition-colors">
              <CostumePreviewCard preview={costumePreviewPayload as any} />
            </div>
          ) : (
            <div className="flex flex-wrap justify-center xl:justify-start gap-4">
              {displayItems.length > 0 ? displayItems.map(({ card, myState, bonus, score }, idx) => {
                const realId = (card as any).info ? (card as any).info.id : (card as any).id;
                const isCardMatched = !isFilterActive || matchedCardIds.includes(realId);

                return (
                  <div key={realId || idx} className={`w-[100px] shrink-0 transition-all duration-300 ${!isCardMatched ? 'opacity-30 grayscale-[80%]' : ''}`}>
                    <CardItem 
                      card={card as any} 
                      userState={myState} 
                      onClick={onCardClick} 
                      showPostAwake={showPostAwake} 
                      showTextBadge={true}
                      sortOrder={isEventMode ? sortMode : undefined}
                      eventBonus={bonus}
                      scoreBonus={score}
                    />
                  </div>
                );
              }) : (
                <div className="w-full py-10 flex justify-center text-zinc-500 text-xs font-bold">
                  {isEventMode ? "보너스 조건에 맞는 멤버가 없습니다." : "데이터를 입력해 주세요."}
                </div>
              )}
            </div>
          )}
          
        </div>
      </div>

    </div>
  );
}