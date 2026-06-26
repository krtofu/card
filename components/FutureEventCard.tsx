// src/components/FutureEventCard.tsx
"use client";

import Image from "next/image";
import { EventData } from "@/data/events";
import { ALL_CARDS } from "@/data/cards"; 

// 1. 가챠 타입 뱃지 스타일
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

// 🌟 2. [NEW] 내 카드 상태별 뱃지 색상 엔진!
const getStateBadgeStyle = (status: string) => {
  switch (status) {
    case "보유": return "bg-emerald-500/20 text-emerald-300 border-emerald-500/50"; // 영롱한 초록색
    case "목표": return "bg-amber-500/20 text-amber-300 border-amber-500/50"; // 반짝이는 노란색
    default: return "bg-zinc-800 text-zinc-400 border-white/5"; // 미보유 (회색)
  }
};

interface FutureEventCardProps {
  event: EventData;
  index: number;
}

export default function FutureEventCard({ event, index }: FutureEventCardProps) {
  const isLeft = index % 2 === 0;

  // 마법의 강철 연동 코드
  const pickupCards = event.gacha.featuredCardIds
    .map((cardId) => 
      ALL_CARDS.find((c: any) => c.id === cardId || (c.info && c.info.id === cardId))
    )
    .filter((c) => c !== undefined) as any[];

  // 🌟 [임시 테스트용] 가짜 유저 상태 데이터
  // 나중에 전역 상태(Context, Zustand 등)나 LocalStorage에서 진짜 상태를 불러와서 교체할 부분입니다!
  const mockUserState: Record<string, string> = {
    "ln_Ichika_001": "보유", // 이치카는 뽑았다!
    "VS_MIKU_001": "목표",   // 미쿠는 목표 중!
    // 나머지는 자동으로 '미보유' 처리됨
  };

  return (
    <div className={`flex flex-col md:flex-row items-center gap-8 ${isLeft ? '' : 'md:flex-row-reverse'}`}>
      
      {/* 가챠 배너 영역 */}
      <div className="flex-1 w-full relative z-10 flex justify-center">
        <div className={`w-full max-w-[500px] bg-zinc-900 border border-white/10 rounded-2xl overflow-hidden shadow-xl transition-transform hover:scale-[1.02] ${isLeft ? 'md:mr-auto' : 'md:ml-auto'}`}>
          <div className="relative aspect-[21/9] w-full bg-zinc-800 flex items-center justify-center border-b border-white/10">
            {event.gacha.bannerPath ? (
              <span className="text-zinc-500 text-xs">[이미지 자리] {event.gacha.bannerPath}</span>
            ) : (
              <span className="text-zinc-500 text-sm">No Banner Image</span>
            )}
            
            <div className="absolute top-3 left-3 flex gap-2 z-20">
              {event.gacha.types.map((type, idx) => (
                <span key={idx} className={`px-2 py-0.5 text-xs font-bold rounded shadow-md backdrop-blur-md ${getGachaBadgeStyle(type)}`}>
                  {type}
                </span>
              ))}
            </div>
          </div>
          
          <div className="p-4 bg-zinc-950/80 backdrop-blur-sm">
            <h3 className="text-lg font-bold text-white mb-1 truncate">{event.name}</h3>
            <p className="text-sm font-medium text-zinc-400">
              🕒 {event.period.start} ~ {event.period.end}
            </p>
          </div>
        </div>
      </div>

      {/* 가운데 시간 점 */}
      <div className="hidden md:flex flex-col items-center justify-center relative z-20">
        <div className="w-4 h-4 rounded-full bg-white border-4 border-zinc-950 shadow-[0_0_15px_rgba(255,255,255,0.5)]" />
      </div>

      {/* 픽업 캐릭터 썸네일 영역 */}
      <div className="flex-1 w-full relative z-10">
        <div className={`bg-zinc-900/30 border border-white/5 rounded-3xl p-6 w-full max-w-[500px] ${isLeft ? 'md:ml-auto' : 'md:mr-auto'}`}>
          <h4 className="text-sm font-bold text-zinc-300 mb-4 pb-2 border-b border-white/10">✨ 픽업 멤버</h4>
          
          <div className="flex flex-wrap gap-4">
            {pickupCards.map((card, idx) => {
              // 1. 진짜 ID와 이름 추출
              const realId = card.info ? card.info.id : card.id;
              const realName = card.info ? card.info.cardName : card.cardName;
              
              // 🌟 2. 썸네일 이미지 경로 추출! (데이터 구조에 맞게 유연하게 처리)
              // 만약 유저님 데이터에 썸네일 경로가 다르다면 이 부분을 수정하면 됩니다!
              const thumbPath = card.media?.thumbPrePath || `/thumbnails/${realId}.png`;

              // 🌟 3. 현재 카드의 내 상태 확인 (보유/목표/미보유)
              const myStatus = mockUserState[realId] || "미보유";

              return (
                <div key={realId || idx} className="flex flex-col items-center gap-2 group cursor-pointer">
                  
                  {/* 🌟 드디어 개방된 진짜 썸네일 영역! */}
                  <div className="relative w-16 h-16 rounded-xl overflow-hidden border border-white/10 shadow-inner transition-transform group-hover:scale-105 bg-zinc-800">
                    {/* 👇 이미지가 깨질 때를 대비해 진짜 이름도 깔아둡니다. */}
                    <div className="absolute inset-0 flex items-center justify-center text-[9px] text-zinc-500 p-1 text-center z-0">
                      {realName}
                    </div>
                    {/* 👇 진짜 썸네일 렌더링! */}
                    <img 
                      src={thumbPath} 
                      alt={realName} 
                      className="absolute inset-0 w-full h-full object-cover z-10"
                      onError={(e) => { e.currentTarget.style.display = 'none'; }} // 이미지 없으면 텍스트 보이게 스르륵 숨김
                    />
                  </div>
                  
                  {/* 🌟 상태 연동 뱃지 (보유/목표/미보유 색상 자동 변경) */}
                  <span className={`rounded px-2 py-0.5 text-[10px] font-bold border ${getStateBadgeStyle(myStatus)}`}>
                    {myStatus === "보유" ? "✓ 보유" : myStatus === "목표" ? "⭐ 목표" : "미보유"}
                  </span>

                </div>
              );
            })}
          </div>
        </div>
      </div>

    </div>
  );
}