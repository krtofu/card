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
            (i === active ? "bg-white/80" : "bg-white/20 hover:bg-white/35")
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
        "transition-colors duration-200",
        "active:scale-95",
        isFront
          ? "bg-zinc-950/70 text-white border-white/25"
          : "bg-white text-zinc-950 border-white/30",
      ].join(" ")}
    >
      <span
        className="
          inline-block
          text-lg leading-none
          transition-transform duration-200 ease-out
          active:scale-30
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

  // 🌟 [추가된 보너스 로직] 부모(모달)에서 넘어온 이름을 슬래시(/) 기준으로 쪼갭니다!
  const rawSubtitle = preview.subtitle ?? "[카드 이름] 의상 이름";
  const splitNames = rawSubtitle.split("/").map(s => s.trim());
  
  // 현재 보고 있는 의상 탭 번호 (0: 기본, 1: 어나더1, 2: 어나더2...)
  const activeTabIndex = sets.length > 0 ? (setIdx % sets.length) : 0;
  
  // 탭 번호에 맞는 이름이 배열에 있으면 그걸 쓰고, 없으면 무조건 첫 번째 이름을 씁니다.
  const dynamicSubtitle = splitNames[activeTabIndex] || splitNames[0];

  const subtitle =
    currentSet?.subtitle ??
    currentChar.subtitle ??
    dynamicSubtitle; // 👈 쪼개진 이름이 최종적으로 여기에 들어갑니다!

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
    <div className="p-4">
      {/* 헤더 */}
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <div className="text-xl font-semibold text-zinc-100">
            {preview.title ?? "의상 프리뷰"}
          </div>

          <div className="mt-3 tracking-[0.04em] inline-flex px-0 py-1 text-sm font-semibold text-zinc-200">
            {subtitle}
          </div>

          <div className="mt-0 truncate text-xs text-zinc-300">{currentChar.name}</div>
        </div>
      </div>

      {/* 이미지 + 화살표 */}
      <div className="mt-4 group relative">
        <div className="relative mx-auto aspect-[435/849] w-full max-h-[420px]">
          <Image
            src={currentSrc}
            alt={`${currentChar.name} ${side}`}
            fill
            className="object-contain"
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
              className="h-8 w-8 rounded-full border border-white/20 bg-black/40 text-white backdrop-blur-sm transition-all duration-150 hover:bg-white/15 hover:scale-105 hover:shadow-lg hover:shadow-white/10 active:scale-97"
            >
              <span className="inline-block transition-transform duration-75 ease-out active:-translate-x-0.5">⊲</span>
            </button>
            <button
              type="button"
              onClick={() => goChar(1)}
              aria-label="다음 캐릭터"
              className="h-8 w-8 rounded-full border border-white/20 bg-black/40 text-white backdrop-blur-sm transition-all duration-150 hover:bg-white/15 hover:scale-105 hover:shadow-lg hover:shadow-white/10 active:scale-97"
            >
              <span className="inline-block transition-transform duration-75 ease-out active:translate-x-0.5">⊳</span>
            </button>
          </div>
        ) : null}

        {/* 우측 하단: 정면/후면 토글 버튼 */}
        <div className="absolute bottom-42 right-0 translate-x-1.5">
          <FlipSideButton side={side} onToggle={toggleSide} />
        </div>

        {/* 우측 하단: 어나더 버튼 바 */}
        {sets.length > 1 ? (
          <div className="absolute bottom-0 right-0 translate-x-3">
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
                      "text-center whitespace-nowrap overflow-visible",
                      "border border-white/10 bg-white/5 hover:bg-white/10",
                      active ? "text-white shadow-[inset_0_0_0_1px_rgba(255,255,255,0.35)]" : "text-zinc-200",
                      showFull ? "w-17 text-right" : "w-12",
                    ].join(" ")}
                  >
                    {visibleLabel}
                    {/* 원본 우측 화살표 */}
                    {active ? (
                      <span className="pointer-events-none absolute left-full top-1/2 -translate-y-1/2 ml-2 text-white/80">⬅</span>
                    ) : null}
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