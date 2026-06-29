// src/components/FutureEventCard.tsx
"use client";

import Image from "next/image";
import { EventData } from "@/data/events";
import { ALL_CARDS } from "@/data/cards"; 
import CardItem from "@/components/CardItem"; 
import { UserCardState } from "@/app/cards/page";
import { FinalCardInfo } from "@/data/cards/template";

// 🌟 [수정됨] 색상이 칙칙했던 문제 해결! 모달/필터와 동일한 '영롱한 네온 컬러'로 통일했습니다.
const getGachaBadgeStyle = (gachaType: string) => {
  switch (gachaType) {
    case "통상": return "bg-sky-500/20 text-sky-300 border-sky-400/50";
    case "한정": return "bg-pink-500/20 text-pink-300 border-pink-400/50";
    case "페스": return "bg-violet-500/20 text-violet-300 border-violet-400/50";
    case "월링": return "bg-emerald-500/20 text-emerald-300 border-emerald-400/50";
    case "콜라보": return "bg-amber-500/20 text-amber-300 border-amber-400/50";
    default: return "bg-zinc-800 text-zinc-400 border-white/10";
  }
};

const getEventTypeBadgeStyle = (eventType?: string) => {
  switch (eventType) {
    case "하코": return "bg-rose-500/20 text-rose-300 border-rose-400/50";
    case "혼합": return "bg-indigo-500/20 text-indigo-300 border-indigo-400/50";
    case "월링": return "bg-emerald-500/20 text-emerald-300 border-emerald-400/50";
    default: return "bg-zinc-800 text-zinc-400 border-white/10";
  }
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

  const pickupCards = event.gacha.featuredCardIds
    .map((cardId) => ALL_CARDS.find((c: any) => c.id === cardId || ((c as any).info && (c as any).info.id === cardId)))
    .filter((c) => c !== undefined) as any[];

  const fadeClass = isFilterActive && !isEventMatched 
    ? "opacity-30 grayscale hover:opacity-60 transition-opacity duration-300" 
    : "opacity-100 transition-opacity duration-300";

  return (
    <div className={`flex flex-col md:flex-row items-center gap-8 ${fadeClass}`}>
      
      {/* 🌟 좌측 구역: 가챠 배너 영역 */}
      <div className="flex-1 w-full relative z-10 flex justify-center md:px-4">
        <div className="w-full max-w-[480px] bg-zinc-900 border border-white/10 rounded-2xl overflow-hidden shadow-xl">
          <div className="relative aspect-[21/9] w-full bg-zinc-800 flex items-center justify-center border-b border-white/10 overflow-hidden">
            {event.gacha.bannerPath ? (
              <img 
                src={event.gacha.bannerPath} 
                alt={`${event.name} 배너`}
                className="absolute inset-0 w-full h-full object-cover"
                onError={(e) => { e.currentTarget.style.display = 'none'; }}
              />
            ) : (
              <span className="text-zinc-600 text-sm font-bold tracking-widest">NO BANNER IMAGE</span>
            )}
            
            {/* 🌟 뱃지에 테두리(border)를 추가해서 훨씬 선명하게 보이게 패치! */}
            <div className="absolute top-3 left-3 flex gap-2 z-20">
              {event.gacha.types.map((type, idx) => (
                <span key={idx} className={`px-2 py-0.5 text-xs rounded border shadow-sm backdrop-blur-md ${getGachaBadgeStyle(type)}`}>
                  {type}
                </span>
              ))}
            </div>
            {event.eventType && event.eventType !== "없음" && (
              <div className="absolute top-3 right-3 flex z-20">
                <span className={`px-2 py-0.5 text-[10px] rounded border shadow-sm backdrop-blur-md ${getEventTypeBadgeStyle(event.eventType)}`}>
                  {event.eventType}
                </span>
              </div>
            )}
          </div>
          
          <div className="p-4 bg-zinc-950/90 backdrop-blur-sm relative z-20 flex justify-between items-end">
            <div className="min-w-0">
              <h3 className="text-lg font-bold text-white mb-1 truncate pr-2">{event.name}</h3>
              <p className="text-sm font-medium text-zinc-400">
                🕒 {event.period.start} ~ {event.period.end}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 가운데: 타임라인 중앙 점 */}
      <div className="hidden md:flex flex-col items-center justify-center relative z-20 w-6">
        <div className={`w-4 h-4 rounded-full border-4 border-zinc-950 shadow-[0_0_15px_rgba(255,255,255,0.5)] ${isFilterActive && !isEventMatched ? 'bg-zinc-600' : 'bg-white'}`} />
      </div>

      {/* 🌟 우측 구역: 픽업 캐릭터 썸네일 영역 */}
      <div className="flex-1 w-full relative z-10 flex justify-center md:px-4">
        {/* 픽업 멤버 텍스트 부분은 타이틀로서 꽉 찬 폭(w-full) 유지 */}
        <div className="bg-zinc-900/30 border border-white/5 rounded-3xl p-6 w-full max-w-[480px]">
          <h4 className="text-sm font-bold text-zinc-300 mb-4 pb-2 border-b border-white/10 text-center md:text-left">✨ 픽업 멤버</h4>
          
          {/* 🌟 [핵심 수정] justify-center 추가! 카드가 5개면 아래 1개가 예쁘게 중앙으로 정렬됩니다! */}
          <div className="flex flex-wrap justify-center md:justify-start gap-4">
            {pickupCards.map((card, idx) => {
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
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>

    </div>
  );
}