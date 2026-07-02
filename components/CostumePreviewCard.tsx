// src/components/CostumePreviewCard.tsx
"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import type { CostumePreview, CostumeSet } from "@/data/costumes";

function DotPager({
  total,
  active,
  onPick,
}: {
  total: number;
  active: number;
  onPick?: (i: number) => void;
}) {
  if (total <= 1) return null;

  return (
    <div className="flex items-center gap-2">
      {Array.from({ length: total }).map((_, i) => (
        <button
          key={i}
          type="button"
          onClick={() => onPick?.(i)}
          aria-label={`${i + 1}번째로 이동`}
          className={
            "h-2 w-2 rounded-full transition " +
            // 🌟 라이트/다크 대응
            (i === active ? "bg-zinc-800 dark:bg-white/80" : "bg-zinc-300 dark:bg-white/20 hover:bg-zinc-400 dark:hover:bg-white/35")
          }
        />
      ))}
    </div>
  );
}

function FlipSideButton({
  side,
  onToggle,
}: {
  side: "front" | "back";
  onToggle: () => void;
}) {
  const isFront = side === "front";

  return (
    <button
      type="button"
      onClick={onToggle}
      aria-label={isFront ? "후면 보기" : "정면 보기"}
      title={isFront ? "후면" : "정면"}
      className={[
        "h-7.5 w-7.5 rounded-full border",
        "grid place-items-center",
        "backdrop-blur-sm",
        "transition-colors duration-200 shadow-sm",
        "active:scale-95",
        // 🌟 라이트/다크 대응
        isFront
          ? "bg-zinc-800/80 dark:bg-zinc-950/70 text-white border-zinc-700 dark:border-white/25"
          : "bg-white/90 dark:bg-white text-zinc-900 border-zinc-200 dark:border-white/30",
      ].join(" ")}
    >
      <span
        className="
          inline-block
          text-lg leading-none
          transition-transform duration-200 ease-out
          active:scale-90
        "
      >
        {isFront ? "⤻" : "⤺"}
      </span>
    </button>
  );
}

export default function CostumePreviewCard({ preview }: { preview: CostumePreview }) {
  const [side, setSide] = useState<"front" | "back">("front");
  const [charIdx, setCharIdx] = useState(0);
  const [setIdx, setSetIdx] = useState(0);
  const [hoverSetIdx, setHoverSetIdx] = useState<number | null>(null);

  const safeChars = preview.characters?.length
    ? preview.characters
    : [{ name: "미등록", sets: [] }];

  const currentChar = safeChars[charIdx % safeChars.length];

  const sets: CostumeSet[] = useMemo(() => {
    return currentChar.sets?.length ? currentChar.sets : [];
  }, [currentChar]);

  const currentSet = useMemo(() => {
    if (!sets.length) return null;
    return sets[setIdx % sets.length];
  }, [sets, setIdx]);

  const images = useMemo(() => {
    if (!currentSet) return [];
    const arr = side === "front" ? currentSet.front : currentSet.back;
    return arr?.length ? arr : [];
  }, [side, currentSet]);

  const currentSrc = images[0] ?? "/costumes/placeholder.png";

  const rawSubtitle = preview.subtitle ?? "[카드 이름] 의상 이름";
  const splitNames = rawSubtitle.split("/").map(s => s.trim());
  
  const activeTabIndex = sets.length > 0 ? (setIdx % sets.length) : 0;
  const dynamicSubtitle = splitNames[activeTabIndex] || splitNames[0];

  const subtitle =
    currentSet?.subtitle ??
    currentChar.subtitle ??
    dynamicSubtitle; 

  const goChar = (dir: -1 | 1) => {
    const next = (charIdx + dir + safeChars.length) % safeChars.length;
    setCharIdx(next);
  };

  const pickSet = (idx: number) => {
    setSetIdx(idx);
  };

  const toggleSide = () => {
    setSide((prev) => (prev === "front" ? "back" : "front"));
  };

  return (
    <div className="p-4 transition-colors">
      {/* 헤더 */}
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <div className="text-xl font-semibold text-zinc-900 dark:text-zinc-100 transition-colors">
            {preview.title ?? "의상 프리뷰"}
          </div>

          <div className="mt-3 tracking-[0.04em] inline-flex px-0 py-1 text-sm font-semibold text-zinc-700 dark:text-zinc-200 transition-colors">
            {subtitle}
          </div>

          <div className="mt-0 truncate text-xs text-zinc-500 dark:text-zinc-300 transition-colors">{currentChar.name}</div>
        </div>
      </div>

      {/* 이미지 + 화살표 */}
      <div className="mt-4 group relative">
        <div className="relative mx-auto aspect-[435/849] w-full max-h-[420px]">
          <Image
            src={currentSrc}
            alt={`${currentChar.name} ${side}`}
            fill
            className="object-contain drop-shadow-md"
            sizes="(max-width: 1024px) 100vw, 360px"
          />
        </div>

        {/* 캐릭터 좌우 화살표 */}
        {safeChars.length > 1 ? (
          <div className="absolute right-0 -top-7 flex items-center gap-2">
            <button
              type="button"
              onClick={() => goChar(-1)}
              aria-label="이전 캐릭터"
              // 🌟 라이트/다크 대응
              className="h-8 w-8 rounded-full border border-zinc-200 dark:border-white/20 bg-white/80 dark:bg-black/40 text-zinc-600 dark:text-white backdrop-blur-sm transition-all duration-150 hover:bg-zinc-100 dark:hover:bg-white/15 hover:scale-105 active:scale-95 shadow-sm"
            >
              <span className="inline-block transition-transform duration-75 ease-out active:-translate-x-0.5">⊲</span>
            </button>
            <button
              type="button"
              onClick={() => goChar(1)}
              aria-label="다음 캐릭터"
              // 🌟 라이트/다크 대응
              className="h-8 w-8 rounded-full border border-zinc-200 dark:border-white/20 bg-white/80 dark:bg-black/40 text-zinc-600 dark:text-white backdrop-blur-sm transition-all duration-150 hover:bg-zinc-100 dark:hover:bg-white/15 hover:scale-105 active:scale-95 shadow-sm"
            >
              <span className="inline-block transition-transform duration-75 ease-out active:translate-x-0.5">⊳</span>
            </button>
          </div>
        ) : null}

        {/* 우측 하단: 정면/후면 토글 버튼 */}
        <div className="absolute bottom-42 right-0 translate-x-1.5 z-10">
          <FlipSideButton side={side} onToggle={toggleSide} />
        </div>

        {/* 우측 하단: 어나더 버튼 바 */}
        {sets.length > 1 ? (
          <div className="absolute bottom-0 right-0 translate-x-3 z-10">
            <div className="flex flex-col items-end gap-1 p-1 overflow-visible">
              {sets.map((s, i) => {
                const active = i === (setIdx % sets.length);
                const hovered = hoverSetIdx === i;
                const isBase = s.label === "기본";

                const shortLabel = s.label === "기본" ? "기본" : s.label.replace("어나더", "").trim();
                const showFull = !isBase && (active || hovered);
                const visibleLabel = hovered || active ? s.label : shortLabel;

                return (
                  <button
                    key={s.key}
                    type="button"
                    onClick={() => pickSet(i)}
                    onMouseEnter={() => setHoverSetIdx(i)}
                    onMouseLeave={() => setHoverSetIdx(null)}
                    className={[
                      "relative",
                      "rounded-xl px-3 py-2 text-xs font-semibold transition-all duration-200",
                      "text-center whitespace-nowrap overflow-visible shadow-sm",
                      // 🌟 라이트/다크 대응 (활성화 시 Primary 테두리 효과)
                      "border border-zinc-200 dark:border-white/10 bg-white/90 dark:bg-white/5 hover:bg-zinc-50 dark:hover:bg-white/10 backdrop-blur-sm",
                      active ? "text-zinc-900 dark:text-white shadow-[inset_0_0_0_2px_var(--color-primary)] dark:shadow-[inset_0_0_0_1px_rgba(255,255,255,0.35)]" : "text-zinc-500 dark:text-zinc-300",
                      showFull ? "w-17 text-right" : "w-12",
                    ].join(" ")}
                  >
                    {/* 🌟 [복원 완료] 기획자님 오리지널 ➡ 모양 유지 & 파란색(sky-400) 제거! 
                        다크 모드에선 하얀색(white/90), 라이트 모드에선 먹색(zinc-800)으로 반응합니다. */}
                    {active ? (
                      <span className="pointer-events-none absolute right-full top-1/2 -translate-y-1/2 mr-2 text-zinc-800 dark:text-white/90 text-[10px]">➡</span>
                    ) : null}
                    
                    {visibleLabel}
                  </button>
                );
              })}
            </div>
          </div>
        ) : null}
      </div>

      <div className="mt-6 flex items-center justify-center">
        <DotPager
          total={safeChars.length}
          active={charIdx % safeChars.length}
          onPick={(i) => {
            setCharIdx(i);
            setSide("front");
          }}
        />
      </div>
    </div>
  );
}