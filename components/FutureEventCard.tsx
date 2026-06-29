// src/components/FutureEventCard.tsx
"use client";

import Image from "next/image";
import { EventData } from "@/data/events";
import { ALL_CARDS } from "@/data/cards"; 
import CardItem from "@/components/CardItem"; 
import { UserCardState } from "@/app/cards/page";
import { FinalCardInfo } from "@/data/cards/template";

const getGachaBadgeStyle = (gachaType: string) => {
  switch (gachaType) {
    case "통상": return "border-sky-300/45 bg-sky-400/16 text-sky-100 shadow-[0_0_0_1px_rgba(56,189,248,0.18)]";
    case "한정": return "border-pink-300/45 bg-pink-400/16 text-pink-100 shadow-[0_0_0_1px_rgba(236,72,153,0.18)]";
    case "페스": return "border-violet-300/45 bg-violet-400/16 text-violet-100 shadow-[0_0_0_1px_rgba(167,139,250,0.20)]";
    case "월링": return "border-emerald-300/45 bg-emerald-400/16 text-emerald-100 shadow-[0_0_0_1px_rgba(16,185,129,0.18)]";
    case "콜라보": return "border-amber-300/45 bg-amber-400/16 text-amber-100 shadow-[0_0_0_1px_rgba(251,191,36,0.18)]";
    default: return "border-white/10 bg-zinc-800 text-zinc-400";
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
  event, index, userStates, onCardClick, showPostAwake, 
  isFilterActive, isEventMatched, matchedCardIds 
}: FutureEventCardProps) {
  // 🌟 교차 배치 여부
  const isLeft = index % 2 === 0;

  const pickupCards = event.gacha.featuredCardIds
    .map((cardId) => ALL_CARDS.find((c: any) => c.id === cardId || (c.info && c.info.id === cardId)))
    .filter((c) => c !== undefined) as any[];

  const fadeClass = isFilterActive && !isEventMatched 
    ? "opacity-30 grayscale hover:opacity-60 transition-opacity duration-300" 
    : "opacity-100 transition-opacity duration-300";

  return (
    <div className={`flex flex-col md:flex-row items-center gap-8 ${isLeft ? '' : 'md:flex-row-reverse'} ${fadeClass}`}>
      
      {/* 🌟 가챠 배너 영역 (중앙 정렬 밸런스 패치) */}
      <div className="flex-1 w-full relative z-10 flex justify-center group/banner">
        {/* 기존의 md:mr-auto, md:ml-auto 제거하여 flex-1 내에서 완벽한 중앙 정렬을 이룸 */}
        <div className="w-full max-w-[500px] bg-zinc-900 border border-white/10 rounded-2xl overflow-hidden shadow-xl transition-transform duration-500 hover:scale-[1.02]">
          
          <div className="relative aspect-[21/9] w-full bg-zinc-800 flex items-center justify-center border-b border-white/10 overflow-hidden">
            {event.gacha.bannerPath ? (
              <img 
                src={event.gacha.bannerPath} 
                alt={`${event.name} 배너`}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover/banner:scale-105 opacity-90 group-hover/banner:opacity-100"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                }}
              />
            ) : (
              <span className="text-zinc-600 text-sm font-bold tracking-widest">NO BANNER IMAGE</span>
            )}
            
            <div className="absolute top-3 left-3 flex gap-2 z-20">
              {event.gacha.types.map((type, idx) => (
                <span key={idx} className={`px-2 py-0.5 text-xs font-bold rounded shadow-md backdrop-blur-md ${getGachaBadgeStyle(type)}`}>
                  {type}
                </span>
              ))}
            </div>
            {event.eventType && event.eventType !== "없음" && (
              <div className="absolute top-3 right-3 flex z-20">
                <span className={`px-2 py-0.5 text-[10px] font-bold rounded border shadow-md backdrop-blur-md ${getEventTypeBadgeStyle(event.eventType)}`}>
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

      {/* 가운데 시간 점 */}
      <div className="hidden md:flex flex-col items-center justify-center relative z-20">
        <div className={`w-4 h-4 rounded-full border-4 border-zinc-950 shadow-[0_0_15px_rgba(255,255,255,0.5)] ${isFilterActive && !isEventMatched ? 'bg-zinc-600' : 'bg-white'}`} />
      </div>

      {/* 🌟 픽업 캐릭터 썸네일 영역 (중앙 정렬 밸런스 패치) */}
      <div className="flex-1 w-full relative z-10 flex justify-center">
        {/* 기존의 md:ml-auto, md:mr-auto 제거하여 flex-1 내에서 완벽한 중앙 정렬을 이룸 */}
        <div className="bg-zinc-900/30 border border-white/5 rounded-3xl p-6 w-full max-w-[500px]">
          <h4 className="text-sm font-bold text-zinc-300 mb-4 pb-2 border-b border-white/10">✨ 픽업 멤버</h4>
          
          <div className="flex flex-wrap gap-4">
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