// src/components/FutureEventCard.tsx
"use client";

import { useState } from "react";
import Image from "next/image";
import { EventData } from "@/data/events/index";
import { ALL_CARDS } from "@/data/cards"; 
import CardItem from "@/components/CardItem"; 
import { UserCardState } from "@/app/cards/page";
import { FinalCardInfo } from "@/data/cards/template";

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

interface FutureEventCardProps {
  event: EventData;
  index: number;
  userStates: Record<string, UserCardState>; 
  onCardClick: (card: FinalCardInfo) => void; 
  showPostAwake: boolean;
  isFilterActive: boolean; 
  isEventMatched: boolean; 
  matchedCardIds: string[]; 
}

export default function FutureEventCard({ 
  event, userStates, onCardClick, showPostAwake, 
  isFilterActive, isEventMatched, matchedCardIds 
}: FutureEventCardProps) {
  
  // 🌟 [핵심] 가챠 모드 vs 이벤트 보너스 모드 스위치
  const [isEventMode, setIsEventMode] = useState(false);

  // 1. 가챠 픽업 멤버 계산
  const pickupCards = event.gacha.featuredCardIds
    .map((cardId) => ALL_CARDS.find((c: any) => c.id === cardId || ((c as any).info && (c as any).info.id === cardId)))
    .filter((c) => c !== undefined) as any[];

  // 2. 이벤트 보너스 멤버 계산 (전체 카드 풀에서 검색 후 정렬)
  const getBonusCards = () => {
    if (!event.bonus) return [];
    
    const matchingCards = ALL_CARDS.filter(card => {
      // 1) 속성 매치
      if (!matchAttribute(card.attribute || "", event.bonus!.attribute)) return false;
      
      // 2) 유닛 또는 캐릭터 매치
      const matchesUnit = event.bonus!.unit && matchUnit(card.unit || "", event.bonus!.unit);
      const matchesChar = event.bonus!.characters && event.bonus!.characters.includes(card.character || "");
      
      return matchesUnit || matchesChar;
    });

    // 🌟 완벽한 덱 편성을 위한 정렬: [보유중] -> [목표중] -> [미보유] -> 최신순
    return matchingCards.sort((a, b) => {
      const stateA = userStates[(a as any).info ? (a as any).info.id : a.id];
      const stateB = userStates[(b as any).info ? (b as any).info.id : b.id];
      const valA = stateA?.isOwned ? 2 : (stateA?.isTarget ? 1 : 0);
      const valB = stateB?.isOwned ? 2 : (stateB?.isTarget ? 1 : 0);
      
      if (valA !== valB) return valB - valA;
      return (b.releaseDate || "").localeCompare(a.releaseDate || "");
    });
  };

  const bonusCards = getBonusCards();
  
  // 현재 모드에 따라 보여줄 카드와 배너 결정
  const displayCards = isEventMode ? bonusCards : pickupCards;
  const displayBanner = isEventMode && event.eventBannerPath ? event.eventBannerPath : event.gacha.bannerPath;

  const fadeClass = isFilterActive && !isEventMatched 
    ? "opacity-30 grayscale hover:opacity-60 transition-opacity duration-300" 
    : "opacity-100 transition-opacity duration-300";

  return (
    <div className={`flex flex-col md:flex-row items-stretch gap-8 ${fadeClass}`}>
      
      {/* ================= 좌측: 배너 영역 ================= */}
      <div className="flex-1 w-full relative z-10 flex justify-center md:px-4">
        <div className="w-full max-w-[520px] bg-zinc-900 border border-white/10 rounded-2xl overflow-hidden shadow-xl flex flex-col">
          <div className="relative aspect-[21/9] w-full bg-zinc-800 flex items-center justify-center border-b border-white/10 overflow-hidden shrink-0 transition-all duration-500">
            {displayBanner ? (
              <img 
                src={displayBanner} 
                alt={`${event.name} 배너`}
                className="absolute inset-0 w-full h-full object-cover animate-fade-in"
                onError={(e) => { e.currentTarget.style.display = 'none'; }}
              />
            ) : (
              <span className="text-zinc-600 text-sm font-bold tracking-widest">NO BANNER IMAGE</span>
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
          
          <div className="p-4 bg-zinc-950/90 backdrop-blur-sm relative z-20 flex justify-between items-end flex-1">
            <div className="min-w-0">
              <h3 className="text-lg font-bold text-white mb-1 truncate pr-2">
                {isEventMode ? (event.eventName || event.name) : event.name}
              </h3>
              <p className="text-sm font-medium text-zinc-400">
                🕒 {event.period.start} ~ {event.period.end}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 중앙 타임라인 선 */}
      <div className="hidden md:flex flex-col items-center justify-center relative z-20 w-6">
        <div className={`w-4 h-4 rounded-full border-4 border-zinc-950 shadow-[0_0_15px_rgba(255,255,255,0.5)] ${isFilterActive && !isEventMatched ? 'bg-zinc-600' : 'bg-white'}`} />
      </div>

      {/* ================= 우측: 카드 목록 및 토글 ================= */}
      <div className="flex-1 w-full relative z-10 flex justify-center md:px-4">
        <div className="bg-zinc-900/30 border border-white/5 rounded-3xl p-6 w-full max-w-[520px] flex flex-col">
          
          {/* 상단 헤더 & 모드 스위치 */}
          <div className="flex items-center justify-between mb-4 pb-3 border-b border-white/10 shrink-0">
            <h4 className="text-sm font-bold text-zinc-300">
              {isEventMode ? (
                <span className="flex items-center gap-1.5"><span className="text-amber-400">🎁</span> 이벤트 보너스 멤버</span>
              ) : (
                <span className="flex items-center gap-1.5"><span className="text-sky-400">✨</span> 가챠 픽업 멤버</span>
              )}
            </h4>
            
            {/* 🌟 이벤트 데이터가 있을 때만 토글 버튼 노출! */}
            {event.bonus && (
              <div className="flex bg-zinc-950 rounded-lg p-1 shadow-inner border border-white/5">
                 <button 
                   onClick={() => setIsEventMode(false)} 
                   className={`px-3 py-1 text-[11px] font-bold rounded-md transition-all ${!isEventMode ? 'bg-sky-500 text-white shadow-md' : 'text-zinc-500 hover:text-zinc-300'}`}
                 >
                   🎰 가챠
                 </button>
                 <button 
                   onClick={() => setIsEventMode(true)} 
                   className={`px-3 py-1 text-[11px] font-bold rounded-md transition-all ${isEventMode ? 'bg-pink-500 text-white shadow-md' : 'text-zinc-500 hover:text-zinc-300'}`}
                 >
                   🎪 이벤트
                 </button>
              </div>
            )}
          </div>
          
          {/* 카드 목록 영역 (보너스 멤버가 많아질 경우를 대비해 스크롤 적용!) */}
          <div className="flex flex-wrap justify-center md:justify-start gap-4 max-h-[320px] overflow-y-auto pr-2 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-zinc-800/50 [&::-webkit-scrollbar-thumb]:bg-zinc-600 [&::-webkit-scrollbar-thumb]:rounded-full hover:[&::-webkit-scrollbar-thumb]:bg-zinc-500">
            {displayCards.length > 0 ? displayCards.map((card, idx) => {
              const realId = card.info ? card.info.id : card.id;
              const myState = userStates[realId]; 
              const isCardMatched = !isFilterActive || matchedCardIds.includes(realId);

              return (
                <div key={realId || idx} className={`w-[100px] shrink-0 transition-all duration-300 ${!isCardMatched ? 'opacity-30 grayscale-[80%]' : ''}`}>
                  <CardItem 
                    card={card} 
                    userState={myState} 
                    onClick={onCardClick} 
                    showPostAwake={showPostAwake} 
                    showTextBadge={true}
                  />
                </div>
              );
            }) : (
              <div className="w-full py-10 flex justify-center text-zinc-500 text-xs font-bold">
                보너스 조건에 맞는 멤버가 없습니다.
              </div>
            )}
          </div>
        </div>
      </div>

    </div>
  );
}