"use client";

import { useState, useEffect } from "react"; 
import { ALL_CARDS } from "@/data/cards"; 
import { FinalCardInfo } from "@/data/cards/template"; 
import CardDetailModal from "@/components/CardDetailModal";

export type UserCardState = {
  isOwned: boolean;
  isTarget: boolean;
  masterRank: number;
  skillLevel: number;
};

export default function MyCardsPage() {
  const [cardStates, setCardStates] = useState<Record<string, UserCardState>>({});
  const [activeModalCard, setActiveModalCard] = useState<FinalCardInfo | null>(null);
  const [mounted, setMounted] = useState(false);

  // 글로벌 각전/각후 토글 상태 (false = 특훈 전, true = 특훈 후)
  const [showPostAwake, setShowPostAwake] = useState(false);

  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem("sekard_user_card_states");
    if (saved) {
      try { 
        setCardStates(JSON.parse(saved)); 
      } catch (e) { 
        console.error(e); 
      }
    }
  }, []);

  const handleUpdateCardState = (id: string, newState: Partial<UserCardState>) => {
    const defaultState: UserCardState = { isOwned: false, isTarget: false, masterRank: 0, skillLevel: 1 };
    const currentCardState = cardStates[id] || defaultState;
    
    const updated = {
      ...cardStates,
      [id]: { ...currentCardState, ...newState }
    };
    
    setCardStates(updated);
    localStorage.setItem("sekard_user_card_states", JSON.stringify(updated));
  };

  if (!mounted) return null;

  const currentModalState = activeModalCard
    ? cardStates[activeModalCard.id] || { isOwned: false, isTarget: false, masterRank: 0, skillLevel: 1 }
    : { isOwned: false, isTarget: false, masterRank: 0, skillLevel: 1 };

  return (
    <div className="flex flex-col md:flex-row gap-4 px-3 py-6 min-h-screen text-zinc-100">
      
      {/* 🧭 1. 왼편: 필터 및 검색 구역 */}
      <div className="w-full md:w-64 shrink-0 p-1 space-y-6">
        <div>
          <h2 className="text-xs font-bold text-zinc-400 tracking-wider uppercase">🔍 필터 및 검색</h2>
          <p className="text-[11px] text-zinc-500 mt-1">보유 여부 및 유닛 필터가 은은하게 자리 잡을 공간입니다.</p>
        </div>
        
        <div className="space-y-1 text-xs text-zinc-400">
          <div className="py-2.5 border-b border-white/5 text-zinc-500">유닛별 선택창...</div>
          <div className="py-2.5 border-b border-white/5 text-zinc-500">속성별 선택창...</div>
          <div className="py-2.5 border-b border-white/5 text-zinc-500">[보유 카드만 보기] 스위치...</div>
        </div>
      </div>

      {/* 🗂️ 2. 우측: 전체 카드 리스트 나열 구역 */}
      <div className="flex-1 flex flex-col min-w-0">
        
        {/* 타이틀 영역과 토글 버튼 우측 정렬 배치 */}
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-6">
          <div>
            <h1 className="text-xl font-bold tracking-tight">내 4성 체크리스트</h1>
            <p className="text-xs text-zinc-400 mt-1">카드를 클릭해 보유 상태 및 시뮬레이터 수치를 기록하세요.</p>
          </div>

          {/* 🌟 디자인 일관성을 지킨 이미지 아이콘 스위칭 버튼 */}
          <button
            onClick={() => setShowPostAwake(!showPostAwake)}
            className="self-start sm:self-auto flex items-center gap-2 p-1 text-[12px] font-bold rounded-full bg-zinc-900 hover:bg-zinc-800 transition-all shadow-sm active:scale-95 shrink-0"
            // aria-label을 추가해 시각 장애인용 스크린 리더도 이 버튼의 역할을 알 수 있게 합니다.
            aria-label={showPostAwake ? "특훈 전 썸네일로 전환" : "특훈 후 썸네일로 전환"}
          >
            {/* 🌟 구해두신 이미지 아이콘이 들어갈 공간입니다! */}
            <img 
              // 🌟 중요: 아래 두 경로를 실제 파일 이름과 경로로 반드시 고쳐주세요!
              src={showPostAwake ? "/icons/post_star.png" : "/icons/pre_star.png"} 
              // alt 속성에도 각 상태에 맞는 설명을 적어줍니다.
              alt={showPostAwake ? "현재: 특훈 후" : "현재: 특훈 전"}
              // 아이콘 크기를 적절하게 조절합니다 (예: h-8). 원하시는 대로 고쳐 쓰세요.
              className="h-8 w-auto object-contain block"
            />
          </button>
        </div>

        {/* grid-cols-[repeat(auto-fill,minmax(100px,1fr))]는 100px 크기의 카드가 우측 끝까지 공간을 채울 수 있는 만큼 자동으로 한 줄에 꽉꽉 채워주는 마법의 문법입니다. */}
        <div className="grid grid-cols-[repeat(auto-fill,minmax(100px,1fr))] gap-y-6 gap-x-4 w-full">
          {ALL_CARDS.map((card) => {
            return (
              <div 
                key={card.id} 
                onClick={() => setActiveModalCard(card)}
                className="relative p-1 cursor-pointer transition-all hover:scale-[1.05] flex flex-col items-center text-center group"
              >
                {/* 🖼️ 순정 원본 비율 보존형 썸네일 박스 */}
                <div className="relative w-fit shrink-0">
                  <img 
                    // 스위치 상태(showPostAwake)에 따라 각전/각후 주소 동적 분기 처리
                    src={showPostAwake ? card.thumbPostPath : card.thumbPrePath} 
                    alt="썸네일" 
                    className="h-25 w-auto object-contain transition-all ring-1 ring-white/10 group-hover:ring-white/25" 
                  />
                </div>
                
                {/* 텍스트 영역 */}
                <p className="text-[11px] font-semibold mt-2.5 text-zinc-200 truncate w-25 group-hover:text-white transition-colors">
                  {card.cardName}
                </p>
                <p className="text-[10px] text-zinc-500 mt-0.5">
                  {card.character}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* 팝업 모달창 장착 */}
      <CardDetailModal
        card={activeModalCard}
        userState={currentModalState}
        onUpdateState={handleUpdateCardState}
        onClose={() => setActiveModalCard(null)}
      />
    </div>
  );
}