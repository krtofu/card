// src/components/CardItem.tsx
"use client";

import { FinalCardInfo } from "@/data/cards/template";
import { UserCardState } from "@/app/cards/page";

interface CardItemProps {
  card: FinalCardInfo;
  userState?: UserCardState;
  showPostAwake?: boolean;
  onClick: (card: FinalCardInfo) => void;
  // 🌟 추가된 정렬 데이터들
  sortOrder?: "newest" | "oldest" | "score" | "bonus";
  scoreBonus?: number;
  eventBonus?: number;
}

// 🌟 [복구 완료] 스킬 아이콘 찾는 함수
const getSkillIconPath = (skill: string) => {
  if (skill === "스업") return "/icons/skills/score_x.png";
  if (["퍼스업", "굿스업", "체스업", "블페", "팀스업"].includes(skill)) return "/icons/skills/condition_x.png";
  if (skill === "판강") return "/icons/skills/perfect_x.png";
  if (skill === "힐") return "/icons/skills/heal_x.png";
  return "";
};

// 🌟 [복구 완료] sortOrder, scoreBonus 등을 함수에서 제대로 받아옵니다!
export default function CardItem({ 
  card, 
  userState, 
  showPostAwake = false, 
  sortOrder = "newest",
  scoreBonus = 0,
  eventBonus = 0,
  onClick 
}: CardItemProps) {
  const isOwned = userState?.isOwned;
  const isTarget = userState?.isTarget;
  
  // 🇰🇷 그리드에도 출시 여부 판단 로직 (보존 완료!)
  const isReleased = card.releaseDate ? new Date(card.releaseDate) <= new Date() : false;

  // 🌟 썸네일 탐색기 (보존 완료!)
  const thumbPre = (card as any).media?.thumbPrePath || card.thumbPrePath || `/thumbnails/${card.id}.png`;
  const thumbPost = (card as any).media?.thumbPostPath || card.thumbPostPath || `/thumbnails/${card.id}.png`;

  return (
    <div onClick={() => onClick(card)} className="relative p-1 cursor-pointer transition-all hover:scale-[1.05] flex flex-col items-center text-center group min-w-0">
      
      {/* 🌟 각전/각후 썸네일 호버 애니메이션 (보존 완료!) */}
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
      
      {/* 🌟 [복구 완료] 정렬 상태에 따라 스업(%)이나 이벤포(%)를 띄워주는 UI 로직 부활! */}
      <div className="mt-2.5 h-[36px] flex flex-col items-center justify-start w-full px-1">
        {sortOrder === "score" ? (
          <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md shadow-sm mt-1 transition-all ${isOwned ? "bg-zinc-900/90 border border-[#00FFD1]/70 shadow-[0_0_8px_rgba(0,255,209,0.25)]" : isTarget ? "bg-amber-500/10 border border-amber-400/50 shadow-[0_0_8px_rgba(245,158,11,0.2)] text-amber-300" : "bg-zinc-900/80 border border-white/5"}`}>
            <img src={getSkillIconPath(card.skillType || "")} className="w-[14px] h-[14px] object-contain drop-shadow-sm" alt="스킬" />
            <span className={`text-[12px] font-bold tracking-tight ${isOwned ? 'text-sky-300' : isTarget ? 'text-amber-300' : 'text-zinc-400'}`}>{scoreBonus}%</span>
          </div>
        ) : sortOrder === "bonus" ? (
          <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md shadow-sm mt-1 transition-all ${isOwned ? "bg-amber-950/40 border border-[#00FFD1]/70 shadow-[0_0_8px_rgba(0,255,209,0.25)]" : isTarget ? "bg-amber-500/10 border border-amber-400/50 shadow-[0_0_8px_rgba(245,158,11,0.2)]" : "bg-zinc-900/80 border border-white/5"}`}>
            <span className="text-[11px] drop-shadow-sm">🌟</span>
            <span className={`text-[12px] font-bold tracking-tight ${isOwned ? 'text-pink-300' : isTarget ? 'text-amber-300' : 'text-zinc-400'}`}>{eventBonus}%</span>
          </div>
        ) : (
          /* 🌟 기존 노란색(amber-400) 타겟 통일 상태 보존 완료! */
          <>
            <p className={`text-[11px] font-semibold truncate w-full max-w-[100px] transition-colors flex items-center justify-center gap-0.5 ${isOwned ? "text-[#00FFD1]" : isTarget ? "text-amber-400" : "text-zinc-200 group-hover:text-white"}`}>
              <span className="truncate">{card.cardName}</span>
              {isReleased && <span className="text-[10px] shrink-0 drop-shadow-sm" title="한국 서버 출시됨">🇰🇷</span>}
            </p>
            <p className="text-[10px] text-zinc-500 mt-0.5 truncate w-full max-w-[100px]">{card.character}</p>
          </>
        )}
      </div>

    </div>
  );
}