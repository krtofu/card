// src/components/ModalCostumePreviewCard.tsx

import Image from "next/image";
import { useMemo, useState, useEffect } from "react";
import type { CostumePreview, CostumeSet } from "@/data/costumes";
import { useThemeColor } from "@/app/providers";

// 🌟 1. 카드 ID를 받아올 수 있도록 Props에 cardId 추가!
interface ModalCostumePreviewProps {
  preview: CostumePreview;
  userState?: { isOwned: boolean; masterRank: number };
  cardId?: string;
  hasHair?: boolean;
  isMovieStyle?: boolean;
}

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

export default function ModalCostumePreviewCard({ preview, userState, cardId, hasHair, isMovieStyle }: ModalCostumePreviewProps) {
  const { themeColor } = useThemeColor();
  const [side, setSide] = useState<"front" | "back">("front");
  const [charIdx, setCharIdx] = useState(0);
  const [setIdx, setSetIdx] = useState(0);
  const [hoverSetIdx, setHoverSetIdx] = useState<number | null>(null);
  const [customBg, setCustomBg] = useState<"auto" | "light" | "dark">("auto");

  // 🌟 2. 픽토그램 아이콘 상태 관리 (옷 -> 악세 -> 전용악세)
  const [iconType, setIconType] = useState<"cos" | "acc" | "only">("cos");
  const [isIconError, setIsIconError] = useState(false);

  const [hairType, setHairType] = useState<"normal" | "after">("normal");
  const [isHairError, setIsHairError] = useState(false);

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

  // 🌟 3. 마법의 자동 경로 조립기! (ex: /cards/Wds/Emu/Wds_Emu_001/pv_cos_0.png)
  const [unit, char] = (cardId || "").split("_");
  const currentIconPath = cardId ? `/cards/${unit}/${char}/${cardId}/pv_${iconType}_${activeTabIndex}.png` : "";
  const currentHairPath = cardId ? `/cards/${unit}/${char}/${cardId}/pv_hair${hairType === "after" ? "_after" : ""}.png` : "";

  useEffect(() => {
    setIsIconError(false);
  }, [currentIconPath]);

  useEffect(() => {
    setIsHairError(false);
  }, [currentHairPath]);

  useEffect(() => {
    if (activeTabIndex === 0) setHairType("normal");
  }, [activeTabIndex]);

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
            className={
              "shrink-0 inline-flex items-center px-3 py-1 rounded-full text-xs font-bold border tracking-tight transition-all shadow-sm " +
              (!userState.isOwned
                ? "bg-zinc-100 dark:bg-zinc-900 border-zinc-300 dark:border-zinc-700 text-zinc-500" 
                : isUnlocked
                ? "bg-emerald-50 dark:bg-emerald-950 border-emerald-500 dark:border-emerald-400 text-emerald-600 dark:text-emerald-400 shadow-[0_0_8px_rgba(16,185,129,0.2)] dark:shadow-[0_0_8px_rgba(52,211,153,0.15)]" 
                : "bg-zinc-200 dark:bg-zinc-900 border-zinc-400 dark:border-zinc-400 text-zinc-600 dark:text-zinc-300") 
            }
          >
            {!userState.isOwned ? "미보유" : isUnlocked ? "개방" : "미개방"}
          </div>
        )}
      </div>

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

        {/* 🌟 우측 상단 UI 묶음 (화살표 & 의상/헤어 아이콘) */}
        <div className="absolute top-4 right-4 z-20 flex flex-col items-end gap-3 pointer-events-none">
          
          {/* 캐릭터 전환 화살표 */}
          {safeChars.length > 1 && (
            <div className="flex items-center gap-2 pointer-events-auto">
              <button onClick={() => goChar(-1)} className="h-8 w-8 rounded-full border border-white/20 bg-black/40 text-white backdrop-blur-sm hover:bg-black/60 hover:scale-105 active:scale-97 transition-all">⊲</button>
              <button onClick={() => goChar(1)} className="h-8 w-8 rounded-full border border-white/20 bg-black/40 text-white backdrop-blur-sm hover:bg-black/60 hover:scale-105 active:scale-97 transition-all">⊳</button>
            </div>
          )}

          {/* 🌟 아이콘들을 세로로 예쁘게 정렬하는 스택 컨테이너 */}
          <div className="flex flex-col gap-2.5 mt-1">
            
            {/* 1. 마법의 의상/악세 토글 버튼 (🤖 자동 파일 감지 시스템 탑재!) */}
            {cardId && (
              <div className="relative group pointer-events-auto">
                <button
                  type="button"
                  onClick={() => setIconType(p => p === "cos" ? "acc" : p === "acc" ? "only" : "cos")}
                  className="w-16 h-16 md:w-[72px] md:h-[72px] rounded-[14px] border-[2.5px] border-white/90 shadow-[0_4px_12px_rgba(0,0,0,0.3)] bg-zinc-200/50 dark:bg-black/30 backdrop-blur-md transition-all hover:scale-105 active:scale-95 flex items-center justify-center overflow-hidden"
                >
                  {/* 🌟 마법의 분기: 컴퓨터가 파일을 못 찾아서 에러가 났다면 알아서 [없음] 띄움! */}
                  {isIconError ? (
                    <div className="w-full h-full flex flex-col items-center justify-center bg-black/40 text-white/60 animate-fade-in">
                      <span className="text-xl md:text-2xl opacity-70">✖</span>
                      <span className="text-[9px] md:text-[10px] font-bold mt-0.5 tracking-wider">없음</span>
                    </div>
                  ) : (
                    <img
                      src={currentIconPath}
                      alt="Costume Icon"
                      className="w-full h-full object-cover transition-opacity duration-300"
                      // 👇 마법의 주문: 이미지 로딩에 실패하면 즉시 에러 감지기를 발동시킨다!
                      onError={() => setIsIconError(true)} 
                      onLoad={(e) => { (e.currentTarget as HTMLImageElement).style.opacity = '1'; }}
                    />
                  )}
                </button>

                <div className="absolute top-full right-0 mt-2.5 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-50">
                  <div className="bg-white dark:bg-zinc-900 text-zinc-800 dark:text-white text-[11px] font-bold pl-2 pr-2 py-1 rounded-md shadow-xl border border-zinc-200 dark:border-zinc-700 flex items-center gap-1.5 transition-colors">
                    <img src="/icons/cos.png" alt="아이콘" className="w-3 h-3 object-contain invert dark:invert-0" />
                    <span className={`tracking-wide ${iconType === "only" ? "pr-3" : ""}`}>
                      {iconType === "cos" ? "의상" : iconType === "acc" ? "악세" : "전용악세"}
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* 2. 💇‍♀️ 헤어 썸네일 아이콘 (오리지널 흑백 잠금 + 극장판 전용 토글!) */}
            {cardId && hasHair && (
              <div className="relative group pointer-events-auto animate-fade-in-up">
                <button
                  type="button"
                  // 🌟 마법의 조건: isMovieStyle이고, 어나더 탭(>0)일 때만 헤어 토글이 작동함!
                  onClick={() => {
                    if (isMovieStyle && activeTabIndex > 0) {
                      setHairType(p => p === "normal" ? "after" : "normal");
                    }
                  }}
                  // 오리지널(0번 탭)이거나 일반 캐릭터면 클릭할 수 없게 마우스 커서를 기본(default)으로 둡니다.
                  className={`w-16 h-16 md:w-[72px] md:h-[72px] rounded-[14px] border-[2.5px] border-white/90 shadow-[0_4px_12px_rgba(0,0,0,0.3)] bg-zinc-200/50 dark:bg-black/30 flex items-center justify-center overflow-hidden transition-colors 
                    ${isMovieStyle && activeTabIndex > 0 ? "hover:bg-zinc-300/50 dark:hover:bg-black/50 cursor-pointer" : "cursor-default"}`}
                >
                  {isHairError ? (
                    <div className="w-full h-full flex flex-col items-center justify-center bg-black/40 text-white/60 animate-fade-in">
                      <span className="text-xl md:text-2xl opacity-70">✖</span>
                    </div>
                  ) : (
                    <img
                      src={currentHairPath}
                      alt="Hair Icon"
                      // 🌟 대망의 오리지널 탭 미해방 연출! (흑백으로 죽이고 + 오퍼시티 40%로 반투명화 + 대비 살짝 낮춤)
                      className={`w-full h-full object-cover transition-all duration-300 ${activeTabIndex === 0 ? "grayscale opacity-40 contrast-75" : ""}`}
                      onError={() => setIsHairError(true)}
                    />
                  )}
                </button>

                <div className="absolute top-full right-0 mt-2.5 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-50">
                  <div className="bg-white dark:bg-zinc-900 text-zinc-800 dark:text-white text-[11px] font-bold pl-2 pr-2 py-1 rounded-md shadow-xl border border-zinc-200 dark:border-zinc-700 flex items-center gap-1.5 transition-colors">
                    <img src="/icons/cos.png" alt="아이콘" className="w-3 h-3 object-contain invert dark:invert-0" />
                    <span className="tracking-wide">
                      {/* 🌟 툴팁도 상황에 맞게 스마트하게 변신! */}
                      {activeTabIndex === 0 ? "헤어 (미해방)" : (hairType === "after" ? "헤어 (어나더)" : "헤어")}
                    </span>
                  </div>
                </div>
              </div>
            )}

          </div>
        </div>

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

                const inactiveLightClass = "bg-zinc-100/90 border-zinc-300 text-zinc-500 hover:bg-zinc-200 hover:text-zinc-800";
                const inactiveDarkClass = "bg-white/5 border-white/10 text-zinc-400 hover:bg-white/10 hover:text-zinc-200";
                const inactiveAutoClass = "bg-zinc-100/90 dark:bg-white/5 border-zinc-300 dark:border-white/10 text-zinc-500 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-white/10";
                const inactiveClass = customBg === 'light' ? inactiveLightClass : customBg === 'dark' ? inactiveDarkClass : inactiveAutoClass;

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
                      "--mix-bg": "color-mix(in srgb, var(--color-primary) 15%, transparent)",
                      "--mix-border": "var(--color-primary)",
                      "--mix-text-light": "color-mix(in srgb, var(--color-primary) 40%, black)",
                      "--mix-text-dark": "color-mix(in srgb, var(--color-primary) 40%, white)",
                      "--mix-glow": "color-mix(in srgb, var(--color-primary) 30%, transparent)",
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