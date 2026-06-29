// src/components/FutureEventCard.tsx
"use client";

import Image from "next/image";
import { EventData } from "@/data/events";
import { ALL_CARDS } from "@/data/cards"; 
import CardItem from "@/components/CardItem"; 
import { UserCardState } from "@/app/cards/page";
import { FinalCardInfo } from "@/data/cards/template";

// 🌟 [프리미엄 뱃지 스타일] 유저님이 주신 메인 탭 유닛 뱃지의 '빛 반사 + 텍스트 음영' 스타일을 완벽 이식!
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
      
      {/* 가챠 배너 영역 */}
      <div className="flex-1 w-full relative z-10 flex justify-center md:px-4">
        <div className="w-full max-w-[520px] bg-zinc-900 border border-white/10 rounded-2xl overflow-hidden shadow-xl">
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
            
            {/* 🌟 좌측 상단: 가챠 타입 프리미엄 뱃지 */}
            <div className="absolute top-3 left-3 flex gap-2 z-20">
              {event.gacha.types.map((type, idx) => (
                <span 
                  key={idx} 
                  className={`${PREMIUM_BADGE_CLASS} ${getGachaBadgeBg(type)}`}
                  style={PREMIUM_BADGE_STYLE}
                >
                  {type}
                </span>
              ))}
            </div>

            {/* 🌟 우측 상단: 이벤트 타입 프리미엄 뱃지 */}
            {event.eventType && event.eventType !== "없음" && (
              <div className="absolute top-3 right-3 flex z-20">
                <span 
                  className={`${PREMIUM_BADGE_CLASS} ${getEventTypeBadgeBg(event.eventType)}`}
                  style={PREMIUM_BADGE_STYLE}
                >
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

      {/* 타임라인 중앙 점 */}
      <div className="hidden md:flex flex-col items-center justify-center relative z-20 w-6">
        <div className={`w-4 h-4 rounded-full border-4 border-zinc-950 shadow-[0_0_15px_rgba(255,255,255,0.5)] ${isFilterActive && !isEventMatched ? 'bg-zinc-600' : 'bg-white'}`} />
      </div>

      {/* 픽업 캐릭터 썸네일 영역 */}
      <div className="flex-1 w-full relative z-10 flex justify-center md:px-4">
        <div className="bg-zinc-900/30 border border-white/5 rounded-3xl p-6 w-full max-w-[520px]">
          <h4 className="text-sm font-bold text-zinc-300 mb-4 pb-2 border-b border-white/10 text-center md:text-left">✨ 픽업 멤버</h4>
          
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
                    showTextBadge={true} // 미래시에선 무조건 텍스트 뱃지 켜기!
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