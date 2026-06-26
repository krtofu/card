// src/app/future/page.tsx
"use client";

import { useState, useEffect } from "react";
import { FUTURE_EVENTS } from "@/data/events";
import FutureEventCard from "@/components/FutureEventCard";
import CardDetailModal from "@/components/CardDetailModal";
import { FinalCardInfo } from "@/data/cards/template";
import { UserCardState } from "@/app/cards/page"; // 상태 타입 불러오기

export default function FuturePage() {
  const [cardStates, setCardStates] = useState<Record<string, UserCardState>>({});
  const [activeModalCard, setActiveModalCard] = useState<FinalCardInfo | null>(null);
  const [mounted, setMounted] = useState(false);

  // 🌟 토글 및 필터창 상태 추가
  const [showPostAwake, setShowPostAwake] = useState(false);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem("sekard_user_card_states");
    if (saved) try { setCardStates(JSON.parse(saved)); } catch (e) { console.error(e); }
  }, []);

  const handleUpdateCardState = (id: string, newState: Partial<UserCardState>) => {
    const updated = { 
      ...cardStates, 
      [id]: { ...(cardStates[id] || { isOwned: false, isTarget: false, masterRank: 0, skillLevel: 1 }), ...newState } 
    };
    setCardStates(updated);
    localStorage.setItem("sekard_user_card_states", JSON.stringify(updated)); // 실시간 동기화
  };

  if (!mounted) return null;

  return (
    // 🌟 내 카드 탭과 동일한 flex 레이아웃으로 변경!
    <div className="flex flex-col md:flex-row gap-6 px-4 md:px-8 py-6 min-h-screen text-zinc-100 max-w-[1920px] mx-auto w-full">
      
      {/* ========================================= */}
      {/* 👈 좌측 영역: 필터칸 (내 카드 탭과 동일한 껍데기 구조) */}
      {/* ========================================= */}
      <div className={`flex flex-col shrink-0 md:w-[280px] md:relative md:block md:bg-transparent md:p-0 md:h-auto md:z-0 ${isMobileFilterOpen ? 'fixed inset-0 z-[100] bg-zinc-950 p-6 overflow-y-auto' : 'hidden'}`}>
        <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-6 md:mb-0">
          <h2 className="text-lg md:text-sm font-bold text-zinc-300 tracking-wider uppercase">🔍 미래시 필터</h2>
          <div className="flex items-center gap-3">
            <button className="w-8 h-8 md:w-7 md:h-7 flex items-center justify-center rounded-full bg-zinc-900 border border-white/5 text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors text-sm md:text-sm shadow-sm" title="필터 초기화">
              <span className="leading-none -mt-[1px] inline-block">↺</span>
            </button>
            <button onClick={() => setIsMobileFilterOpen(false)} className="md:hidden w-8 h-8 flex items-center justify-center rounded-full bg-zinc-800 text-white font-bold">✕</button>
          </div>
        </div>

        {/* 필터 껍데기 (다음 스텝에서 실제 필터 기능과 연결할 구역!) */}
        <div className="space-y-6 md:mt-6 opacity-50 pointer-events-none">
          <div className="text-xs text-zinc-400 text-center py-10 bg-zinc-900/50 rounded-xl border border-white/5">
            🚧 타임라인 전용 스마트 필터 <br/> 다음 스텝에서 연결됩니다!
          </div>
        </div>
      </div>

      {/* ========================================= */}
      {/* 👉 우측 영역: 미래시 타임라인 본문 */}
      {/* ========================================= */}
      <div className="flex-1 flex flex-col min-w-0 bg-zinc-900/30 rounded-3xl p-4 md:p-6 border border-white/5 relative">
        
        {/* 🌟 헤더 & 우측 상단 토글 버튼 영역 */}
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-10 relative z-40">
          <div>
            <h1 className="text-xl font-bold tracking-tight text-white mb-1">📅 미래시 타임라인</h1>
            <p className="text-xs text-zinc-400">앞으로 다가올 가챠 일정과 픽업 멤버를 확인해보세요.</p>
          </div>

          <div className="flex flex-wrap items-center gap-2 self-start sm:self-auto relative w-full sm:w-auto">
            {/* 모바일용 필터 열기 버튼 */}
            <button onClick={() => setIsMobileFilterOpen(true)} className="md:hidden flex items-center justify-center gap-1.5 h-[34px] px-3 rounded-full bg-zinc-800/80 border border-white/10 text-[12px] font-bold text-zinc-300 hover:text-white transition-colors shadow-sm">
              🔍 필터
            </button>

            {/* 🌟 각전/각후 전환 버튼 (내 카드 탭과 동일!) */}
            <button onClick={() => setShowPostAwake(!showPostAwake)} className="p-1 rounded-full bg-zinc-900 border border-white/10 shrink-0 ml-auto sm:ml-0" aria-label="썸네일 전환">
              <img src={showPostAwake ? "/icons/post_star.png" : "/icons/pre_star.png"} alt="스위치" className="h-8 w-auto object-contain block" />
            </button>
          </div>
        </div>

        {/* 타임라인 메인 컨테이너 */}
        <div className="relative pt-4">
          <div className="absolute left-1/2 top-0 bottom-0 w-px bg-white/10 -translate-x-1/2 hidden md:block" />
          
          <div className="space-y-16">
            {FUTURE_EVENTS.map((event, index) => (
              <FutureEventCard 
                key={event.id} 
                event={event} 
                index={index} 
                userStates={cardStates} 
                onCardClick={setActiveModalCard} 
                showPostAwake={showPostAwake} // 🌟 버튼 상태 전달!
              />
            ))}
          </div>
        </div>
      </div>

      <CardDetailModal 
        card={activeModalCard} 
        userState={cardStates[activeModalCard?.id || ""] || { isOwned: false, isTarget: false, masterRank: 0, skillLevel: 1 }} 
        onUpdateState={handleUpdateCardState} 
        onClose={() => setActiveModalCard(null)} 
      />
      
    </div>
  );
}