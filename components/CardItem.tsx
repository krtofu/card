// src/components/CardItem.tsx
"use client";

import { FinalCardInfo } from "@/data/cards/template";
import { UserCardState } from "@/app/cards/page";

interface CardItemProps {
  card: FinalCardInfo;
  userState?: UserCardState;
  showPostAwake?: boolean;
  onClick: (card: FinalCardInfo) => void;
  sortOrder?: "newest" | "oldest" | "score" | "bonus";
  scoreBonus?: number;
  eventBonus?: number;
}

const getSkillIconPath = (skill: string) => {
  if (skill === "스업") return "/icons/skills/score_x.png";
  if (["퍼스업", "굿스업", "체스업", "블페", "팀스업"].includes(skill)) return "/icons/skills/condition_x.png";
  if (skill === "판강") return "/icons/skills/perfect_x.png";
  if (skill === "힐") return "/icons/skills/heal_x.png";
  return "";
};

// 🌟 원래 처음 구조에 있었던 하단 뱃지 스타일 엔진 복구!
const getStateBadgeStyle = (isOwned: boolean, isTarget: boolean) => {
  if (isOwned) return "bg-emerald-500/20 text-emerald-300 border-emerald-500/40"; // 영롱한 초록
  if (isTarget) return "bg-amber-500/20 text-amber-300 border-amber-500/40"; // 반짝이는 노란색
  return "bg-zinc-800 text-zinc-400 border-white/5"; // 미보유 (회색)
};

export default function CardItem({ 
  card, 
  userState, 
  showPostAwake = false, 
  sortOrder = "newest",
  scoreBonus = 0,
  eventBonus = 0,
  onClick 
}: CardItemProps) {
  const isOwned = userState?.isOwned || false;
  const isTarget = userState?.isTarget || false;
  
  const isReleased = card.releaseDate ? new Date(card.releaseDate) <= new Date() : false;

  const thumbPre = (card as any).media?.thumbPrePath || card.thumbPrePath || `/thumbnails/${card.id}.png`;
  const thumbPost = (card as any).media?.thumbPostPath || card.thumbPostPath || `/thumbnails/${card.id}.png`;

  return (
    <div onClick={() => onClick(card)} className="relative p-1 cursor-pointer transition-all hover:scale-[1.05] flex flex-col items-center text-center group min-w-0">
      
      {/* 썸네일 구역 */}
      <div className="relative h-[100px] w-fit flex justify-center bg-zinc-900 rounded-lg overflow-hidden">
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

        {/* 🌟 [기획 2 & 2-1 반영] 보유는 숨기고 '목표만 부각하는 우측 상단 모서리 사선 책갈피' */}
        {isTarget && !isOwned && (
          <div className="absolute top-0 right-0 w-8 h-8 z-30 pointer-events-none overflow-hidden">
            <div className="absolute transform rotate-45 bg-amber-500 text-amber-950 font-black text-[9px] text-center w-[45px] py-0.5 -right-[13px] -top-[1px] shadow-sm border-b border-amber-400">
              ★
            </div>
          </div>
        )}
      </div>
      
      {/* 정보 텍스트 및 오리지널 뱃지 구역 */}
      <div className="mt-2.5 h-[58px] flex flex-col items-center justify-start w-full px-1">
        {sortOrder === "score" ? (
          <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md shadow-sm mt-1 transition-all ${isOwned ? "bg-zinc-900/90 border border-[#00FFD1]/70 shadow-[0_0_8px_rgba(0,255,209,0.25)]" : isTarget ? "bg-amber-500/10 border border-amber-400/50 shadow-[0_0_8px_rgba(245,158,11,0.2)] text-amber-300" : "bg-zinc-900/80 border border-white/5"}`}>
            <img src={getSkillIconPath(card.skillType || "")} className="w-[14px] h-[14px] object-contain drop-shadow-sm" alt="스킬" />
            <span className={`text-[12px] font-bold tracking-tight ${isOwned ? 'text-sky-300' : isTarget ? 'text-amber-300' : 'text-zinc-400'}`}>{scoreBonus}%</span>
          </div>
        ) : sortOrder === "bonus" ? (
          <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md shadow-sm mt-1 transition-all ${isOwned ? "bg-amber-950/40 border border-[#00FFD1]/70 shadow-[0_0_8px_rgba(0,255,209,0.25)]" : isTarget ? "bg-amber-500/10 border border-amber-400/50 shadow-[0_0_8px_rgba(245,158,11,0.2)] text-amber-300" : "bg-zinc-900/80 border border-white/5"}`}>
            <span className="text-[11px] drop-shadow-sm">🌟</span>
            <span className={`text-[12px] font-bold tracking-tight ${isOwned ? 'text-pink-300' : isTarget ? 'text-amber-300' : 'text-zinc-400'}`}>{eventBonus}%</span>
          </div>
        ) : (
          <>
            <p className={`text-[11px] font-semibold truncate w-full max-w-[100px] transition-colors flex items-center justify-center gap-0.5 ${isOwned ? "text-[#00FFD1]" : isTarget ? "text-amber-400" : "text-zinc-200 group-hover:text-white"}`}>
              <span className="truncate">{card.cardName}</span>
              {isReleased && <span className="text-[10px] shrink-0 drop-shadow-sm" title="한국 서버 출시됨">🇰🇷</span>}
            </p>
            
            {/* 🌟 [기획 1 반영] 이름 아래쪽에 복구된 미보유/보유/목표 상태 미니 뱃지 구역! */}
            <span className={`mt-1 rounded px-1.5 py-0.5 text-[9px] font-extrabold border tracking-tight ${getStateBadgeStyle(isOwned, isTarget)}`}>
              {isOwned ? "✓ 보유" : isTarget ? "⭐ 목표" : "미보유"}
            </span>

            <p className="text-[10px] text-zinc-500 mt-0.5 truncate w-full max-w-[100px]">{card.character}</p>
          </>
        )}
      </div>

    </div>
  );
}