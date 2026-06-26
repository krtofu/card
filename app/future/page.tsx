"use client";

import Image from "next/image";
import { FUTURE_EVENTS } from "@/data/events"; // 우리가 짠 뼈대 경로!

// 우리가 만든 영롱한 뱃지 스타일!
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
    // 여백이 넉넉한 레이아웃 유지!
    <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 w-full py-10 min-h-screen text-zinc-100">
      
      {/* 🌟 페이지 헤더 */}
      <div className="mb-12 border-b border-white/10 pb-6 text-center mt-6">
        <h1 className="text-3xl font-bold tracking-tight text-white mb-2">📅 미래시 타임라인</h1>
        <p className="text-zinc-400 text-sm">앞으로 다가올 가챠 일정과 픽업 멤버를 확인해보세요!</p>
      </div>

      {/* 🌟 타임라인 메인 컨테이너 */}
      <div className="relative">
        
        {/* 가운데 수직 기준선 (PC에서만 보임) */}
        <div className="absolute left-1/2 top-0 bottom-0 w-px bg-white/10 -translate-x-1/2 hidden md:block" />

        <div className="space-y-16">
          {FUTURE_EVENTS.map((event, index) => {
            
            // 핵심 로직: 홀수 번째는 왼쪽(isLeft = true), 짝수 번째는 오른쪽 교차 배치!
            const isLeft = index % 2 === 0;

            return (
              <div key={event.id} className={`flex flex-col md:flex-row items-center gap-8 ${isLeft ? '' : 'md:flex-row-reverse'}`}>
                
                {/* 1. 가챠 배너 영역 */}
                <div className="flex-1 w-full relative z-10 flex justify-center">
                  <div className={`w-full max-w-[500px] bg-zinc-900 border border-white/10 rounded-2xl overflow-hidden shadow-xl transition-transform hover:scale-[1.02] ${isLeft ? 'md:mr-auto' : 'md:ml-auto'}`}>
                    
                    <div className="relative aspect-[21/9] w-full bg-zinc-800 flex items-center justify-center border-b border-white/10">
                      {event.gacha.bannerPath ? (
                        <span className="text-zinc-500 text-xs">[이미지 자리] {event.gacha.bannerPath}</span>
                      ) : (
                        <span className="text-zinc-500 text-sm">No Banner Image</span>
                      )}
                      
                      {/* 우리 기능: 가챠 타입 다중 뱃지 */}
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

                {/* 가운데 시간 점 (PC에서만 보임) */}
                <div className="hidden md:flex flex-col items-center justify-center relative z-20">
                  <div className="w-4 h-4 rounded-full bg-white border-4 border-zinc-950 shadow-[0_0_15px_rgba(255,255,255,0.5)]" />
                </div>

                {/* 2. 픽업 캐릭터 썸네일 (우리 기능: 상태 연동 뼈대 적용) */}
                <div className="flex-1 w-full relative z-10">
                  <div className={`bg-zinc-900/30 border border-white/5 rounded-3xl p-6 w-full max-w-[500px] ${isLeft ? 'md:ml-auto' : 'md:mr-auto'}`}>
                    <h4 className="text-sm font-bold text-zinc-300 mb-4 pb-2 border-b border-white/10">✨ 픽업 멤버</h4>
                    
                    <div className="flex flex-wrap gap-4">
                      {event.gacha.featuredCardIds.map((cardId) => (
                        <div key={cardId} className="flex flex-col items-center gap-2 group">
                          {/* 썸네일 자리 */}
                          <div className="w-16 h-16 rounded-xl bg-zinc-800 border border-white/10 flex items-center justify-center text-[10px] text-zinc-500 break-all p-1 text-center shadow-inner transition-transform group-hover:scale-105 cursor-pointer">
                            {cardId}
                          </div>
                          
                          {/* 상태 연동 뱃지 자리 */}
                          <span className="rounded bg-zinc-800 px-2 py-0.5 text-[10px] font-bold text-zinc-400 border border-white/5">
                            미보유
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
}