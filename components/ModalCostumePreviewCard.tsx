"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import type { CostumePreview, CostumeSet } from "@/data/costumes";

// 모달 전용 Props (유저의 상태를 받음)
interface ModalCostumePreviewProps {
  preview: CostumePreview;
  userState?: { isOwned: boolean; masterRank: number };
}

function DotPager({ total, active, onPick }: { total: number; active: number; onPick?: (i: number) => void }) {
  if (total <= 1) return null;
  return (
    <div className="flex items-center gap-2">
      {Array.from({ length: total }).map((_, i) => (
        <button
          key={i}
          type="button"
          onClick={() => onPick?.(i)}
          aria-label={`${i + 1}번째로 이동`}
          className={"h-2 w-2 rounded-full transition " + (i === active ? "bg-white/80" : "bg-white/20 hover:bg-white/35")}
        />
      ))}
    </div>
  );
}

function FlipSideButton({ side, onToggle }: { side: "front" | "back"; onToggle: () => void }) {
  const isFront = side === "front";
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-label={isFront ? "후면 보기" : "정면 보기"}
      title={isFront ? "후면" : "정면"}
      className={[
        "h-7.5 w-7.5 rounded-full border grid place-items-center backdrop-blur-sm transition-colors duration-200 active:scale-95",
        isFront ? "bg-zinc-950/70 text-white border-white/25" : "bg-white text-zinc-950 border-white/30",
      ].join(" ")}
    >
      <span className="inline-block text-lg leading-none transition-transform duration-200 ease-out active:scale-30">
        {isFront ? "⤻" : "⤺"}
      </span>
    </button>
  );
}

export default function ModalCostumePreviewCard({ preview, userState }: ModalCostumePreviewProps) {
  const [side, setSide] = useState<"front" | "back">("front");
  const [charIdx, setCharIdx] = useState(0);
  const [setIdx, setSetIdx] = useState(0);
  const [hoverSetIdx, setHoverSetIdx] = useState<number | null>(null);

  const safeChars = preview.characters?.length ? preview.characters : [{ name: "미등록", sets: [] }];
  const currentChar = safeChars[charIdx % safeChars.length];
  const sets: CostumeSet[] = useMemo(() => currentChar.sets?.length ? currentChar.sets : [], [currentChar]);
  const currentSet = useMemo(() => (!sets.length ? null : sets[setIdx % sets.length]), [sets, setIdx]);
  const images = useMemo(() => {
    if (!currentSet) return [];
    const arr = side === "front" ? currentSet.front : currentSet.back;
    return arr?.length ? arr : [];
  }, [side, currentSet]);

  const currentSrc = images[0] ?? "/costumes/placeholder.png";
  
  const rawSubtitle = preview.subtitle ?? "의상 이름 미등록";
  const splitNames = rawSubtitle.split("/").map(s => s.trim());
  const activeTabIndex = sets.length > 0 ? (setIdx % sets.length) : 0;
  const dynamicSubtitle = splitNames[activeTabIndex] || splitNames[0];

  const subtitle = currentSet?.subtitle ?? currentChar.subtitle ?? dynamicSubtitle;

  const isUnlocked = useMemo(() => {
    if (!userState?.isOwned) return false; // 카드가 없으면 무조건 미개방
    if (!currentSet) return false;
    
    const mr = userState.masterRank || 0;
    const label = currentSet.label; 
    
    // 🌟 [수정됨] 마스터 랭크 기반 일반 의상 개방 로직
    if (label === "기본") return true;
    if (label.includes("1") && mr >= 1) return true;
    if (label.includes("2") && mr >= 3) return true;
    if (label.includes("3") && mr >= 5) return true;

    // 🌟 [핵심 로직] "닫힌 창", "열린 창" 처럼 이름에 1, 2, 3 숫자가 안 들어가는 특수 극장판 라벨은
    // 카드를 보유(isOwned === true)하기만 하면 마랭 상관없이 무조건 개방!
    if (!label.includes("1") && !label.includes("2") && !label.includes("3")) return true;

    return false;
  }, [userState, currentSet]);

  const goChar = (dir: -1 | 1) => setCharIdx((charIdx + dir + safeChars.length) % safeChars.length);
  const pickSet = (idx: number) => setSetIdx(idx);
  const toggleSide = () => setSide((prev) => (prev === "front" ? "back" : "front"));

  return (
    <div className="p-4">
      <div className="flex items-start justify-between gap-3 pb-2 border-b border-white/5">
        <div className="min-w-0 flex-1 flex items-baseline gap-2.5 truncate">
          <span className="text-[15px] font-bold text-zinc-100 tracking-wide whitespace-nowrap">+ 관련 의상</span>
          <span className="text-zinc-600 font-normal self-center text-sm">|</span>
          <span className="text-xs font-medium text-zinc-400 truncate">{subtitle}</span>
        </div>
        {userState && (
          <div
            className={
              "shrink-0 inline-flex items-center px-3 py-1 rounded-full text-xs font-bold border tracking-tight transition-all shadow-sm " +
              (!userState.isOwned
                ? "bg-zinc-900 border-zinc-700 text-zinc-500" 
                : isUnlocked
                ? "bg-emerald-950 border-emerald-400 text-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.15)]" 
                : "bg-zinc-900 border-zinc-400 text-zinc-300") 
            }
          >
            {!userState.isOwned ? "미보유" : isUnlocked ? "개방" : "미개방"}
          </div>
        )}
      </div>

      <div className="mt-4 group relative">
        <div className="relative mx-auto aspect-[435/849] w-full max-h-[420px]">
          <Image src={currentSrc} alt={`${currentChar.name} ${side}`} fill className="object-contain" sizes="(max-width: 1024px) 100vw, 360px" />
        </div>

        {safeChars.length > 1 ? (
          <div className="absolute right-0 -top-7 flex items-center gap-2">
            <button onClick={() => goChar(-1)} className="h-8 w-8 rounded-full border border-white/20 bg-black/40 text-white backdrop-blur-sm hover:bg-white/15 hover:scale-105 active:scale-97">⊲</button>
            <button onClick={() => goChar(1)} className="h-8 w-8 rounded-full border border-white/20 bg-black/40 text-white backdrop-blur-sm hover:bg-white/15 hover:scale-105 active:scale-97">⊳</button>
          </div>
        ) : null}

        <div className="absolute bottom-42 right-0 translate-x-1.5">
          <FlipSideButton side={side} onToggle={toggleSide} />
        </div>

        {sets.length > 1 ? (
          <div className="absolute bottom-0 right-0 translate-x-3">
            <div className="flex flex-col items-end gap-1 p-1 overflow-visible">
              {sets.map((s, i) => {
                const active = i === (setIdx % sets.length);
                const hovered = hoverSetIdx === i;
                
                const isAnother = s.label.includes("어나더");
                const shortLabel = isAnother ? s.label.replace("어나더", "").trim() : s.label;
                const showFull = !isAnother || active || hovered;
                const visibleLabel = showFull ? s.label : shortLabel;

                return (
                  <button
                    key={s.key}
                    type="button"
                    onClick={() => pickSet(i)}
                    onMouseEnter={() => setHoverSetIdx(i)}
                    onMouseLeave={() => setHoverSetIdx(null)}
                    className={[
                      "relative", 
                      "rounded-xl py-2 text-xs font-semibold transition-all duration-200", 
                      "text-center whitespace-nowrap overflow-visible", 
                      "border border-white/10 bg-white/5 hover:bg-white/10", 
                      active ? "text-white shadow-[inset_0_0_0_1px_rgba(255,255,255,0.35)]" : "text-zinc-200", 
                      showFull ? "px-3 w-auto min-w-[68px]" : "w-12 px-0"
                    ].join(" ")}
                  >
                    {visibleLabel}
                    {active ? <span className="pointer-events-none absolute right-full top-1/2 -translate-y-1/2 mr-1.5 text-white/90 text-sm">➡</span> : null}
                  </button>
                );
              })}
            </div>
          </div>
        ) : null}
      </div>
      
      <div className="mt-6 flex items-center justify-center">
        <DotPager total={safeChars.length} active={charIdx % safeChars.length} onPick={(i) => { setCharIdx(i); setSide("front"); }} />
      </div>
    </div>
  );
}