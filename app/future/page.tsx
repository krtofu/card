// src/app/future/page.tsx
"use client";

import { useState, useEffect } from "react";
import { FUTURE_EVENTS } from "@/data/events";
import FutureEventCard from "@/components/FutureEventCard";
import CardDetailModal from "@/components/CardDetailModal";
import { FinalCardInfo } from "@/data/cards/template";
import { UserCardState } from "@/app/cards/page"; // 상태 타입 불러오기

export default function FuturePage() {
  // 🌟 내 카드첩 상태와 모달창 관리를 똑같이 가져옵니다!
  const [cardStates, setCardStates] = useState<Record<string, UserCardState>>({});
  const [activeModalCard, setActiveModalCard] = useState<FinalCardInfo | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // 내 카드 페이지와 완전히 동일한 저장소(LocalStorage)를 씁니다!
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
    <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 w-full py-10 min-h-screen text-zinc-100">
      
      <div className="mb-12 border-b border-white/10 pb-6 text-center mt-6">
        <h1 className="text-3xl font-bold tracking-tight text-white mb-2">📅 미래시 타임라인</h1>
        <p className="text-zinc-400 text-sm">앞으로 다가올 가챠 일정과 픽업 멤버를 확인해보세요!</p>
      </div>

      <div className="relative">
        <div className="absolute left-1/2 top-0 bottom-0 w-px bg-white/10 -translate-x-1/2 hidden md:block" />
        
        <div className="space-y-16">
          {FUTURE_EVENTS.map((event, index) => (
             // 🌟 데이터와 상태, 모달 오픈 함수를 이벤트 배너로 넘겨줍니다.
             <FutureEventCard 
                key={event.id} 
                event={event} 
                index={index} 
                userStates={cardStates} 
                onCardClick={setActiveModalCard} 
             />
          ))}
        </div>
      </div>

      {/* 🌟 카드 썸네일을 누르면 스르륵 뜨는 위대하고 영롱한 모달창! */}
      <CardDetailModal 
        card={activeModalCard} 
        userState={cardStates[activeModalCard?.id || ""] || { isOwned: false, isTarget: false, masterRank: 0, skillLevel: 1 }} 
        onUpdateState={handleUpdateCardState} 
        onClose={() => setActiveModalCard(null)} 
      />
      
    </div>
  );
}