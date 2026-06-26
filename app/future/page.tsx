// src/app/future/page.tsx
"use client";

import { FUTURE_EVENTS } from "@/data/events";
import FutureEventCard from "@/components/FutureEventCard"; // ★ 방금 만든 컴포넌트 불러오기

export default function FuturePage() {
  return (
    <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 w-full py-10 min-h-screen text-zinc-100">
      
      {/* 페이지 헤더 */}
      <div className="mb-12 border-b border-white/10 pb-6 text-center mt-6">
        <h1 className="text-3xl font-bold tracking-tight text-white mb-2">📅 미래시 타임라인</h1>
        <p className="text-zinc-400 text-sm">앞으로 다가올 가챠 일정과 픽업 멤버를 확인해보세요!</p>
      </div>

      {/* 타임라인 메인 컨테이너 */}
      <div className="relative">
        {/* 가운데 수직 기준선 */}
        <div className="absolute left-1/2 top-0 bottom-0 w-px bg-white/10 -translate-x-1/2 hidden md:block" />

        {/* 🌟 분리한 컴포넌트를 배열(Map)로 쫙 뿌려주는 역할만 합니다! */}
        <div className="space-y-16">
          {FUTURE_EVENTS.map((event, index) => (
             <FutureEventCard key={event.id} event={event} index={index} />
          ))}
        </div>
      </div>
      
    </div>
  );
}