"use client";

import { FinalCardInfo } from "@/data/cards/template";
import { UserCardState } from "@/app/cards/page"; // 상태 타입 불러오기

interface CardItemProps {
  card: FinalCardInfo;
  userState?: UserCardState;
  showPostAwake?: boolean; // 상단의 전체 토글(각전/각후) 상태
  onClick: (card: FinalCardInfo) => void; // 클릭 시 모달 띄우는 함수
  sortOrder?: "newest" | "oldest" | "score" | "bonus";
  scoreBonus?: number;
  eventBonus?: number;
}

export default function CardItem({ card, userState, showPostAwake = false, onClick }: CardItemProps) {
  const isOwned = userState?.isOwned;
  const isTarget = userState?.isTarget;
  
  // 🇰🇷 그리드에도 출시 여부 판단 로직
  const isReleased = card.releaseDate ? new Date(card.releaseDate) <= new Date() : false;

  // 썸네일 탐색기
  const thumbPre = (card as any).media?.thumbPrePath || card.thumbPrePath || `/thumbnails/${card.id}.png`;
  const thumbPost = (card as any).media?.thumbPostPath || card.thumbPostPath || `/thumbnails/${card.id}.png`;

  return (
    <div onClick={() => onClick(card)} className="relative p-1 cursor-pointer transition-all hover:scale-[1.05] flex flex-col items-center text-center group min-w-0">
      
      {/* 🌟 각전/각후 썸네일 호버 애니메이션 (완벽 복제!) */}
      <div className="relative h-[100px] w-fit flex justify-center bg-zinc-900 rounded-lg">
        <img 
          src={showPostAwake ? thumbPost : thumbPre} 
          alt={card.cardName} 
          className="relative h-[100px] w-auto max-w-full object-contain transition-opacity duration-300 ease-in-out opacity-100 group-hover:opacity-0 rounded-lg border border-white/10 group-hover:border-white/30 z-10" 
          onError={(e) => { e.currentTarget.style.display = 'none'; }}
        />
        <img 
          src={showPostAwake ? thumbPre : thumbPost} 
          alt={card.cardName + " hover"} 
          className="absolute top-0 h-[100px] w-auto max-w-full object-contain transition-opacity duration-300 ease-in-out opacity-0 group-hover:opacity-100 rounded-lg border border-white/10 group-hover:border-white/30 z-20" 
          onError={(e) => { e.currentTarget.style.display = 'none'; }}
        />
      </div>
      
      <div className="mt-2.5 h-[36px] flex flex-col items-center justify-start w-full px-1">
        {/* 🌟 기존 핑크색 타겟을 우리가 만든 영롱한 노란색(amber-400)으로 통일! */}
        <p className={`text-[11px] font-semibold truncate w-full max-w-[100px] transition-colors flex items-center justify-center gap-0.5 ${isOwned ? "text-[#00FFD1]" : isTarget ? "text-amber-400" : "text-zinc-200 group-hover:text-white"}`}>
          <span className="truncate">{card.cardName}</span>
          {isReleased && <span className="text-[10px] shrink-0 drop-shadow-sm" title="한국 서버 출시됨">🇰🇷</span>}
        </p>
        <p className="text-[10px] text-zinc-500 mt-0.5 truncate w-full max-w-[100px]">{card.character}</p>
      </div>
    </div>
  );
}