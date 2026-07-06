"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import type { CostumePreview, CostumeSet } from "@/data/costumes";

// 모달 전용 Props (유저의 상태를 받음)
interface ModalCostumePreviewProps {
  preview: CostumePreview;
  userState?: { isOwned: boolean; masterRank: number };
}

// 🌟 [하단 점 페이저] 배경색 테마에 맞춰 점 색상 자동 변경
function DotPager({ total, active, onPick, customBg }: { total: number; active: number; onPick?: (i: number) => void; customBg: "auto" | "light" | "dark" }) {
  if (total <= 1) return null;
  return (
    <div className="flex items-center gap-2">
      {Array.from({ length: total }).map((_, i) => {
        let colorClass = "";
        if (customBg === 'light') {
           colorClass = i === active ? "bg-zinc-800" : "bg-zinc-300 hover:bg-zinc-400";
        } else if (customBg === 'dark') {
           colorClass = i === active ? "bg-white/90" : "bg-white/20 hover:bg-white/35";
        } else {
           colorClass = i === active ? "bg-zinc-800 dark:bg-white/90" : "bg-zinc-300 dark:bg-white/20 hover:bg-zinc-400 dark:hover:bg-white/35";
        }
        return (
          <button
            key={i}
            type="button"
            onClick={() => onPick?.(i)}
            aria-label={`${i + 1}번째로 이동`}
            className={`h-2 w-2 rounded-full transition-colors ${colorClass}`}
          />
        );
      })}
    </div>
  );
}

// 🌟 [앞/뒷면 회전 버튼] 배경색 테마에 맞춰 버튼 색상 자동 변경
function FlipSideButton({ side, onToggle, customBg }: { side: "front" | "back"; onToggle: () => void; customBg: "auto" | "light" | "dark" }) {
  const isFront = side === "front";
  
  const frontClass = customBg === 'auto' 
    ? "bg-zinc-800/90 dark:bg-zinc-950/70 text-white border-zinc-600 dark:border-white/25"
    : customBg === 'light' ? "bg-zinc-800/90 text-white border-zinc-600"
    : "bg-zinc-950/70 text-white border-white/25";

  const backClass = customBg === 'auto'
    ? "bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 border-zinc-300 dark:border-zinc-600"
    : customBg === 'light' ? "bg-white text-zinc-900 border-zinc-300"
    : "bg-zinc-800 text-zinc-100 border-zinc-600";

  return (
    <button
      type="button"
      onClick={onToggle}
      aria-label={isFront ? "후면 보기" : "정면 보기"}
      title={isFront ? "후면" : "정면"}
      className={`h-7.5 w-7.5 rounded-full border grid place-items-center backdrop-blur-sm transition-colors duration-200 active:scale-95 shadow-sm ${isFront ? frontClass : backClass}`}
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
  const [customBg, setCustomBg] = useState<"auto" | "light" | "dark">("auto");

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
    if (!userState?.isOwned) return false;
    if (!currentSet) return false;
    
    const mr = userState.masterRank || 0;
    const label = currentSet.label; 
    
    if (label === "기본") return true;
    if (label.includes("1") && mr >= 1) return true;
    if (label.includes("2") && mr >= 3) return true;
    if (label.includes("3") && mr >= 5) return true;
    if (!label.includes("1") && !label.includes("2") && !label.includes("3")) return true;

    return false;
  }, [userState, currentSet]);

  const goChar = (dir: -1 | 1) => setCharIdx((charIdx + dir + safeChars.length) % safeChars.length);
  const pickSet = (idx: number) => setSetIdx(idx);
  const toggleSide = () => setSide((prev) => (prev === "front" ? "back" : "front"));

  return (
    <div className="p-4 flex flex-col h-full">
      
      {/* 📝 상단 헤더 영역 (+ 관련 의상) */}
      <div className="flex items-start justify-between gap-3 pb-3 border-b border-zinc-300 dark:border-zinc-700 transition-colors shrink-0">
        <div className="min-w-0 flex-1 flex items-baseline gap-2.5 truncate">
          <span className="text-[15px] font-bold text-zinc-900 dark:text-zinc-100 tracking-wide whitespace-nowrap transition-colors">+ 관련 의상</span>
          <span className="text-zinc-300 dark:text-zinc-700 font-normal self-center text-sm transition-colors">|</span>
          <span className="text-xs font-medium text-zinc-500 dark:text-zinc-400 truncate transition-colors">{subtitle}</span>
        </div>
        {userState && (
          <div
            // 🌟 불필요한 style 속성(토널 팔레트 엔진)은 완전히 삭제했습니다!
            className={
              "shrink-0 inline-flex items-center px-3 py-1 rounded-full text-xs font-bold border tracking-tight transition-all shadow-sm " +
              (!userState.isOwned
                // 1. 미보유
                ? "bg-zinc-100 dark:bg-zinc-900 border-zinc-300 dark:border-zinc-700 text-zinc-500" 
                : isUnlocked
                // 2. 개방 (🌟 기획자님의 오리지널 에메랄드 고정!)
                ? "bg-emerald-50 dark:bg-emerald-950 border-emerald-500 dark:border-emerald-400 text-emerald-600 dark:text-emerald-400 shadow-[0_0_8px_rgba(16,185,129,0.2)] dark:shadow-[0_0_8px_rgba(52,211,153,0.15)]" 
                // 3. 미개방
                : "bg-zinc-200 dark:bg-zinc-900 border-zinc-400 dark:border-zinc-400 text-zinc-600 dark:text-zinc-300") 
            }
          >
            {!userState.isOwned ? "미보유" : isUnlocked ? "개방" : "미개방"}
          </div>
        )}
      </div>

      {/* 🌟 여기서부터 마법 시작! 박스를 없애고, 구분선 아래 전체 구역(-mx-4 -mb-4)이 물들게 만듭니다! */}
      <div className={`relative -mx-4 -mb-4 mt-0 p-4 pt-14 rounded-b-2xl transition-colors duration-500 flex-1 flex flex-col ${
        customBg === 'light' ? 'bg-white' 
        : customBg === 'dark' ? 'bg-zinc-950' 
        : '' 
      }`}>
        
        {/* 🌟 툴바 (좌측 상단 안착) */}
        <div className="absolute top-4 left-4 z-20 flex items-center gap-2 p-1.5 bg-zinc-200/50 dark:bg-zinc-800/50 backdrop-blur-md rounded-lg border border-zinc-300/50 dark:border-zinc-700/50 transition-colors">
          <button 
            onClick={() => setCustomBg(customBg === 'light' ? 'auto' : 'light')}
            title="하얀색 배경으로 보기"
            className={`w-5 h-5 rounded bg-white shadow-sm transition-all ${
              customBg === 'light' 
                ? 'ring-2 ring-[var(--color-primary, #10b981)] scale-110' 
                : 'border border-zinc-300 hover:scale-110'
            }`}
          />
          <button 
            onClick={() => setCustomBg(customBg === 'dark' ? 'auto' : 'dark')}
            title="검은색 배경으로 보기"
            className={`w-5 h-5 rounded bg-zinc-950 shadow-sm transition-all ${
              customBg === 'dark' 
                ? 'ring-2 ring-[var(--color-primary, #10b981)] scale-110' 
                : 'border border-zinc-700 hover:scale-110'
            }`}
          />
        </div>

        {/* 좌우 화살표 (우측 상단 안착) */}
        {safeChars.length > 1 ? (
          <div className="absolute top-4 right-4 z-20 flex items-center gap-2">
            <button onClick={() => goChar(-1)} className="h-8 w-8 rounded-full border border-white/20 bg-black/40 text-white backdrop-blur-sm hover:bg-black/60 hover:scale-105 active:scale-97 transition-all">⊲</button>
            <button onClick={() => goChar(1)} className="h-8 w-8 rounded-full border border-white/20 bg-black/40 text-white backdrop-blur-sm hover:bg-black/60 hover:scale-105 active:scale-97 transition-all">⊳</button>
          </div>
        ) : null}

        {/* 🖼️ 의상 뷰어 (박스 테두리 제거) */}
        <div className="relative mx-auto aspect-[435/849] w-full max-h-[400px] flex-1">
          <Image src={currentSrc} alt={`${currentChar.name} ${side}`} fill className="object-contain" sizes="(max-width: 1024px) 100vw, 360px" />
        </div>

        {/* 🌟 하단 조작부 (앞뒷면 회전 + 의상 탭) */}
        <div className="absolute bottom-10 right-4 z-10 flex flex-col items-end gap-3 pointer-events-none">
          <div className="pointer-events-auto mr-1">
            <FlipSideButton side={side} onToggle={toggleSide} customBg={customBg} />
          </div>
          
          {sets.length > 1 ? (
            <div className="flex flex-col items-end gap-1.5 pointer-events-auto overflow-visible">
              {sets.map((s, i) => {
                const active = i === (setIdx % sets.length);
                const hovered = hoverSetIdx === i;
                
                const isAnother = s.label.includes("어나더");
                const shortLabel = isAnother ? s.label.replace("어나더", "").trim() : s.label;
                const showFull = !isAnother || active || hovered;
                const visibleLabel = showFull ? s.label : shortLabel;

                // 🌟 [배경색 반응형] 비활성 탭 디자인 지능형 변환
                const inactiveLightClass = "bg-zinc-100/90 border-zinc-300 text-zinc-500 hover:bg-zinc-200 hover:text-zinc-800";
                const inactiveDarkClass = "bg-white/5 border-white/10 text-zinc-400 hover:bg-white/10 hover:text-zinc-200";
                const inactiveAutoClass = "bg-zinc-100/90 dark:bg-white/5 border-zinc-300 dark:border-white/10 text-zinc-500 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-white/10";
                const inactiveClass = customBg === 'light' ? inactiveLightClass : customBg === 'dark' ? inactiveDarkClass : inactiveAutoClass;

                // 🌟 [배경색 반응형] 활성 탭 텍스트 색상 지능형 변환
                const activeTextClass = customBg === 'light' ? "text-[var(--mix-text-light)]" : customBg === 'dark' ? "text-[var(--mix-text-dark)]" : "text-[var(--mix-text-light)] dark:text-[var(--mix-text-dark)]";
                const activeClass = `bg-[var(--mix-bg)] border-[var(--mix-border)] ${activeTextClass} shadow-[0_0_8px_var(--mix-glow)]`;

                return (
                  <button
                    key={s.key}
                    type="button"
                    onClick={() => pickSet(i)}
                    onMouseEnter={() => setHoverSetIdx(i)}
                    onMouseLeave={() => setHoverSetIdx(null)}
                    style={active ? {
                      "--mix-bg": "color-mix(in srgb, var(--color-primary, #10b981) 15%, transparent)",
                      "--mix-border": "var(--color-primary, #10b981)",
                      "--mix-text-light": "color-mix(in srgb, var(--color-primary, #10b981) 40%, black)",
                      "--mix-text-dark": "color-mix(in srgb, var(--color-primary, #10b981) 40%, white)",
                      "--mix-glow": "color-mix(in srgb, var(--color-primary, #10b981) 30%, transparent)",
                    } as React.CSSProperties : {}}
                    className={[
                      "relative", 
                      "rounded-xl py-1.5 text-xs font-semibold transition-all duration-200 shadow-sm", 
                      "text-center whitespace-nowrap overflow-visible border backdrop-blur-md", 
                      active ? activeClass : inactiveClass, 
                      showFull ? "px-3 w-auto min-w-[68px]" : "w-12 px-0"
                    ].join(" ")}
                  >
                    {visibleLabel}
                    {active ? <span className={`pointer-events-none absolute right-full top-1/2 -translate-y-1/2 mr-1.5 text-sm transition-colors ${activeTextClass}`}>➡</span> : null}
                  </button>
                );
              })}
            </div>
          ) : null}
        </div>

        {/* 🌟 하단 점 페이저 */}
        <div className="mt-4 flex items-center justify-center shrink-0">
          <DotPager total={safeChars.length} active={charIdx % safeChars.length} onPick={(i) => { setCharIdx(i); setSide("front"); }} customBg={customBg} />
        </div>
      </div>

    </div>
  );
}