// src/components/FutureEventCard.tsx
"use client";

import { useState } from "react";
import Image from "next/image";
import { EventData } from "@/data/events/index";
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

const matchUnit = (cardUnit: string, targetUnit: string) => {
  const c = (cardUnit || "").toLowerCase();
  const t = (targetUnit || "").toLowerCase();
  if (!c || !t) return false;
  
  if (t.includes("leo") && c.includes("leo")) return true;
  if (t.includes("mmj") && c.includes("mmj")) return true;
  if (t.includes("vbs") && c.includes("vbs")) return true;
  if (t.includes("wds") && c.includes("wds")) return true;
  if (t.includes("niigo") && c.includes("niigo")) return true;
  if (t.includes("vs") && (c.includes("vs") || c.includes("virtual"))) return true;
  
  return c.includes(t) || t.includes(c);
};

const getUnitLogo = (unitName: string) => {
  if (!unitName) return null;
  const u = unitName.toLowerCase();
  if (u.includes("leo")) return "/icons/Leoneed_icon.png";
  if (u.includes("mmj")) return "/icons/MMJ_icon.png";
  if (u.includes("vbs")) return "/icons/VBS_icon.png";
  if (u.includes("wds")) return "/icons/Wds_icon.png";
  if (u.includes("niigo")) return "/icons/Niigo_icon.png";
  if (u.includes("vs") || u.includes("virtual")) return "/icons/VS_icon.png";
  return null;
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
  event: EventData;
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

  const pickupCards = event.gacha.featuredCardIds
    .map((cardId) => ALL_CARDS.find((c: any) => c.id === cardId || ((c as any).info && (c as any).info.id === cardId)))
    .filter((c) => c !== undefined)
    .map(card => {
      const realId = (card as any).info ? (card as any).info.id : (card as any).id;
      const myState = userStates[realId];
      return { card, myState, bonus: 0, score: 0 };
    });

  const getBonusCards = () => {
    if (!event.bonus) return [];
    
    const eventStartClean = event.period.start.split(".")[0].trim();
    const eventStartDate = new Date(eventStartClean);

    const matchingCards = ALL_CARDS.filter(card => {
      if (card.releaseDate) {
        const cardReleaseDate = new Date(card.releaseDate);
        if (cardReleaseDate > eventStartDate) return false;
      }
      if (!matchAttribute(card.attribute || "", event.bonus!.attribute)) return false;
      const matchesUnit = event.bonus!.unit && matchUnit(card.unit || "", event.bonus!.unit);
      const matchesChar = event.bonus!.characters && event.bonus!.characters.includes(card.character || "");
      return matchesUnit || matchesChar;
    });

    const cardsWithValues = matchingCards.map(card => {
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

    return cardsWithValues.sort((a, b) => {
      if (sortMode === "score") {
        if (b.score !== a.score) return b.score - a.score;
      } else {
        if (b.bonus !== a.bonus) return b.bonus - a.bonus;
      }
      const valA = a.myState?.isOwned ? 2 : (a.myState?.isTarget ? 1 : 0);
      const valB = b.myState?.isOwned ? 2 : (b.myState?.isTarget ? 1 : 0);
      if (valA !== valB) return valB - valA;
      return ((b.card as any).releaseDate || "").localeCompare((a.card as any).releaseDate || "");
    });
  };

  const bonusCards = getBonusCards();
  const displayItems = isEventMode ? bonusCards : pickupCards;
  const displayBanner = isEventMode && event.eventBannerPath ? event.eventBannerPath : event.gacha.bannerPath;
  const unitLogo = isEventMode && event.eventType === "하코" && event.bonus?.unit ? getUnitLogo(event.bonus?.unit) : null;

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
        sets: c.costume.sets.map((set: any) => ({
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
      
      {/* 🌟 ================= 모바일 전용 타임라인 (배너 위쪽) ================= */}
      <div className="xl:hidden relative flex flex-col items-center justify-center w-full mt-2 mb-2">
        {/* 윗 배너에서 동그라미로 내려오는 연결선 (맨 위 index 0 이면 선 없음!) */}
        {index > 0 && (
          <div className="absolute -top-[52px] bottom-1/2 w-px bg-zinc-200 dark:bg-white/10 -z-10" />
        )}
        
        <div className="relative flex justify-center items-center">
          {monthMarker && (
            <div className="absolute right-full mr-3 px-2 py-0.5 rounded-full bg-white dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 text-[10px] font-bold border border-zinc-200 dark:border-white/10 shadow-sm whitespace-nowrap z-30">
              {monthMarker}월
            </div>
          )}
          
          {/* 🌟 이벤트 모드일 때만 유닛 로고 렌더링! 뽑기 모드일 땐 작은 점! */}
          {isEventMode && unitLogo ? (
            <div className="w-8 h-8 rounded-full bg-white dark:bg-zinc-900 border-2 border-zinc-200 dark:border-white/20 shadow-md flex items-center justify-center overflow-hidden p-1 z-20">
              <img src={unitLogo} alt="Unit Logo" className="w-full h-full object-contain drop-shadow-sm" />
            </div>
          ) : (
            <div className={`w-3.5 h-3.5 rounded-full border-[3px] border-zinc-200 dark:border-zinc-800 z-20 shadow-sm ${isFilterActive && !isEventMatched ? 'bg-zinc-300 dark:bg-zinc-600' : 'bg-primary dark:bg-white'}`} />
          )}
        </div>

        {/* 동그라미에서 배너(아래)로 향해 내려가는 짧은 연결선 */}
        <div className="absolute top-1/2 -bottom-2 w-px bg-zinc-200 dark:bg-white/10 -z-10" />
      </div>

      {/* ================= 좌측: 배너 영역 ================= */}
      <div className="flex-1 w-full relative z-10 flex flex-col justify-center xl:px-4 py-2 shrink-0">
        {/* 🌟 다크/라이트모드 배경 대응 */}
        <div className="w-full max-w-[520px] mx-auto bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-white/10 rounded-2xl overflow-visible shadow-xl flex flex-col relative h-fit transition-colors">
          
          {event.bonus && (
             <div className="absolute -left-6 sm:-left-12 md:-left-[70px] top-1/2 -translate-y-1/2 flex items-center z-50">
               <button
                 onClick={() => { setIsEventMode(!isEventMode); setShowCostumes(false); }}
                 className="w-10 h-10 rounded-full bg-white dark:bg-zinc-800 border-[3px] border-zinc-200 dark:border-zinc-950 shadow-[0_0_15px_rgba(0,0,0,0.1)] dark:shadow-[0_0_15px_rgba(0,0,0,0.5)] flex items-center justify-center text-[18px] hover:bg-zinc-100 dark:hover:bg-zinc-700 hover:scale-110 transition-all z-10 relative"
                 title={isEventMode ? "가챠 배너로 돌아가기" : "이벤트 배너 보기"}
               >
                 {isEventMode ? '🎪' : '🎰'}
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
                {event.gacha.types.map((type, idx) => (
                  <span key={idx} className={`${PREMIUM_BADGE_CLASS} ${getGachaBadgeBg(type)}`} style={PREMIUM_BADGE_STYLE}>{type}</span>
                ))}
              </div>
            )}

            {event.eventType && event.eventType !== "없음" && (
              <div className="absolute top-3 right-3 flex z-20">
                <span className={`${PREMIUM_BADGE_CLASS} ${getEventTypeBadgeBg(event.eventType)}`} style={PREMIUM_BADGE_STYLE}>{event.eventType}</span>
              </div>
            )}
          </div>
          
          <div className="p-4 bg-white/90 dark:bg-zinc-950/90 backdrop-blur-sm relative z-20 flex justify-between items-start flex-1 rounded-b-2xl transition-colors">
            <div className="min-w-0 pr-2">
              <h3 className="text-lg font-bold text-zinc-900 dark:text-white mb-1 truncate transition-colors">
                {isEventMode ? (event.eventName || event.name) : event.name}
              </h3>
              <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400 transition-colors tracking-wide">
                🕒 {event.period.start.replace(/-/g, '.')} ~ {event.period.end.replace(/-/g, '.')}
              </p>
            </div>
            
            {/* 🌟 xl:hidden을 제거하여 데스크톱/모바일 전체 뷰 공통으로 이름 우측 박스에 안착시킵니다! */}
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

          {/* 🌟 데스크톱 뷰에서도 이벤트 모드일 때만 조건부로 유닛 로고 노출, 뽑기 모드일 땐 깔끔한 점 표시! */}
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
          
          {/* 🎯 한 줄이 뭉개지기 전에 우측 뱃지 그룹 전체가 아랫줄 좌측 정렬로 떨어지도록 유연한 flex-wrap 마감 처리 */}
          <div className="flex flex-wrap items-center justify-start sm:justify-between gap-3 mb-4 pb-3 border-b border-zinc-200 dark:border-white/10 shrink-0 transition-colors">
            {/* 왼쪽 타이틀 구역 */}
            <div className="flex items-center gap-1.5 font-bold text-zinc-700 dark:text-zinc-300 text-sm transition-colors shrink-0">
              {isEventMode ? <><span className="text-amber-500 dark:text-amber-400">🎁</span> 이벤트 보너스 멤버</> : <><span className="text-primary dark:text-sky-400">✨</span> 가챠 픽업 멤버</>}
            </div>
            
            {/* 오른쪽 뱃지 및 정렬 버튼 그룹 (덩어리로 묶어서 탈락하게 만듦) */}
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

                    {event.gacha.types.map(t => {
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
                  보너스 조건에 맞는 멤버가 없습니다.
                </div>
              )}
            </div>
          )}
          
        </div>
      </div>

    </div>
  );
}