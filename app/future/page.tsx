"use client";

import Image from "next/image";
import { FUTURE_EVENTS } from "@/data/events"; // 경로에 맞게 수정해주세요!

// 기존에 쓰시던 가챠 뱃지 스타일 재활용!
const getGachaBadgeStyle = (gachaType: string) => {
  switch (gachaType) {
    case "통상": return "border-sky-300/45 bg-sky-400/16 text-sky-100 shadow-[0_0_0_1px_rgba(56,189,248,0.18)]";
    case "한정": return "border-pink-300/45 bg-pink-400/16 text-pink-100 shadow-[0_0_0_1px_rgba(236,72,153,0.18)]";
    case "페스": return "border-violet-300/45 bg-violet-400/16 text-violet-100 shadow-[0_0_0_1px_rgba(167,139,250,0.20)]";
    default: return "border-white/10 bg-zinc-800 text-zinc-400";
  }
};

export default function FuturePage() {
  return (
    /* 🌟 핵심 해결 포인트: 유저님이 원하셨던 최대 너비(1440px), 중앙 정렬(mx-auto), 반응형 좌우 여백(px-4...)을 여기에 쏙 넣어줬습니다! */
    <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 w-full space-y-8 pb-20">
      
      <header className="space-y-1 mt-6">
        <h1 className="text-2xl font-extrabold tracking-tight">미래시</h1>
        <p className="text-sm text-zinc-400">앞으로 다가올 가챠 일정과 픽업 멤버를 확인해보세요.</p>
      </header>

      <div className="space-y-6">
        {FUTURE_EVENTS.map((event) => (
          <div key={event.id} className="overflow-hidden rounded-2xl border border-white/10 bg-zinc-900/40 backdrop-blur-md">
            
            {/* 1. 배너 이미지 영역 */}
            <div className="relative aspect-[21/9] w-full bg-zinc-800 border-b border-white/10 overflow-hidden">
              {/* 이미지 경로가 확실할 때 렌더링하도록 처리 */}
              {event.gacha.bannerPath ? (
                // 실제 이미지가 준비되면 아래 Image 태그의 주석을 풀고 사용하세요!
                // <Image src={event.gacha.bannerPath} alt={event.name} fill className="object-cover" />
                <div className="absolute inset-0 flex items-center justify-center text-xs text-zinc-500">
                  [이미지 자리] {event.gacha.bannerPath}
                </div>
              ) : null}
              
              {/* 가챠 타입 뱃지 (좌측 상단) */}
              <div className="absolute left-3 top-3 flex gap-2">
                {event.gacha.types.map((type, idx) => (
                  <span 
                    key={idx} 
                    className={`rounded px-2 py-[2px] text-xs font-bold ${getGachaBadgeStyle(type)}`}
                  >
                    {type}
                  </span>
                ))}
              </div>
            </div>

            {/* 2. 하단 상세 정보 영역 */}
            <div className="p-4 md:p-5">
              {/* 가챠 이름 & 기간 */}
              <div className="mb-5">
                <h2 className="text-lg font-bold text-white md:text-xl">{event.name}</h2>
                <p className="mt-1 text-xs text-zinc-400 font-medium">
                  🕒 {event.period.start} ~ {event.period.end}
                </p>
              </div>

              {/* 3. 픽업 캐릭터 썸네일 & 보유 상태 연동 (목업) */}
              <div className="space-y-2">
                <div className="text-xs font-bold text-zinc-500">픽업 멤버</div>
                <div className="flex flex-wrap gap-3">
                  {event.gacha.featuredCardIds.map((cardId) => (
                    <div key={cardId} className="flex flex-col items-center gap-1.5">
                      {/* 카드 썸네일 플레이스홀더 (나중에 실제 카드 썸네일로 교체) */}
                      <div className="h-14 w-14 rounded-lg bg-zinc-800 border border-white/5 flex items-center justify-center text-[9px] text-zinc-500 break-all p-1 text-center shadow-inner">
                        {cardId}
                      </div>
                      
                      {/* 상태 뱃지 (나중에 userState와 연동할 부분!) */}
                      <span className="rounded bg-zinc-800 px-1.5 py-0.5 text-[10px] font-bold text-zinc-400 border border-white/5">
                        미보유
                      </span>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>
        ))}
      </div>
    </div>
  );
}