"use client";

import Image from "next/image";
import { useMemo } from "react";
import TimerBadge from "@/components/TimerBadge";

/* ---------- Types ---------- */

type Attr = "cute" | "mysterious" | "cool" | "happy" | "pure";

type GachaInfo = {
  type: "통상" | "한정" | "페스" | "월링" | "콜라보";
  title: string;
  period: string;
  status: string;
  image: string;
  note?: string;
  start?: string;
  end?: string;
};

/* ---------- Helpers ---------- */

function parseAttrsFromNote(note?: string): { attrs: Attr[]; rest: string } {
  if (!note) return { attrs: [], rest: "" };

  const normalized = note.replace(/\s+/g, " ").trim();

  // "속성 - 쿨 / 26.01..." 이런 형태에서 속성만 뽑기
  const idx = normalized.indexOf("속성");
  if (idx === -1) return { attrs: [], rest: normalized };

  const after = normalized.slice(idx);
  const dashPos = after.indexOf("-");
  if (dashPos === -1) return { attrs: [], rest: normalized };

  const tail = after.slice(dashPos + 1).trim();

  // 속성 구분자를 넉넉하게: · / , | 등
  const parts = tail
    .split(/[·/,|]/g)
    .map((s) => s.trim())
    .filter(Boolean);

  const known: Attr[] = [];
  const unknownBits: string[] = [];

  for (const p of parts) {
    if (
      p === "cute" ||
      p === "mysterious" ||
      p === "cool" ||
      p === "happy" ||
      p === "pure"
    ) {
      known.push(p);
    } else {
      unknownBits.push(p);
    }
  }

  // note에서 "속성 - ..." 부분 제거하고 나머지를 rest로
  let rest = normalized;
  rest = rest
    .replace(
      /(빈\s*)?속성\s*-\s*[^/|,·]+(\s*[·/,|]\s*[^/|,·]+)*/g,
      ""
    )
    .trim();

  rest = rest.replace(/^[·/,|]\s*/g, "").replace(/\s*[·/,|]\s*$/g, "").trim();

  // 속성 이후에 붙은 날짜/문구가 parts에서 unknownBits로 튀었으면 합쳐서 rest에 붙여줌
  const extra = unknownBits.join(" · ").trim();
  if (extra) rest = rest ? `${rest} · ${extra}` : extra;

  const uniqAttrs = Array.from(new Set(known));
  return { attrs: uniqAttrs, rest };
}

function attrBadgeClass(attr: Attr) {
  switch (attr) {
    case "cute":
      return "bg-pink-900/70 border-pink-700/60 text-pink-100";
    case "mysterious":
      return "bg-violet-900/70 border-violet-700/60 text-violet-100";
    case "cool":
      return "bg-sky-900/70 border-sky-700/60 text-sky-100";
    case "happy":
      return "bg-orange-900/70 border-orange-700/60 text-orange-100";
    case "pure":
      return "bg-emerald-900/70 border-emerald-700/60 text-emerald-100";
  }
}

/* ---------- Component ---------- */

export default function GachaCard({ gacha }: { gacha: GachaInfo }) {
  const { attrs: gachaAttrs, rest: gachaNoteRest } = useMemo(
    () => parseAttrsFromNote(gacha.note),
    [gacha.note]
  );

  return (
    <div className="relative mt-4 rounded-2xl p-5">
      {/* ✅ 이미지(크게) + hover 오버레이 */}
      <div className="group relative -mx-5 overflow-hidden">
        {/* 사진 자체를 더 크게: 카드 padding 밖으로 살짝 확장(-mx-5) */}
        <div className="relative aspect-[2.35/1] w-full">
          <Image
            src={gacha.image}
            alt={`${gacha.period} 대표 이미지`}
            fill
            sizes="(max-width: 1024px) 100vw, 420px"
            className="object-cover transition-transform duration-300 ease-out group-hover:scale-[1.03]"
            priority={false}
          />
        </div>

        {/* hover 시 어두워짐 */}
        <div className="pointer-events-none absolute inset-0 bg-black/0 transition-colors duration-200 group-hover:bg-black/35" />

        {/* hover 시 첫 줄(타이틀)만 뜨기 */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 p-4 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
          <div className="text-2xl font-semibold tracking-[0.01em] text-white [ text-shadow: 0_1px_2px_rgba(0,0,0,0.6) ]">
            {gacha.title}
          </div>
        </div>
      </div>

      {/* 캐릭터 라인: Sekard | 두부도감 스타일 + 우측 타이머 */}
      <div className="mt-2 flex items-baseline justify-between gap-3">
        {/* 왼쪽 묶음 */}
        <div className="min-w-0 flex items-baseline gap-2">
          <div className="truncate text-lg font-semibold tracking-tight text-zinc-100">
            {gacha.period}
          </div>

          {gacha.status?.trim() ? (
            <>
              <span className="shrink-0 text-sm text-zinc-500">|</span>
              <div className="min-w-0 truncate text-sm font-medium text-zinc-300">
                {gacha.status}
              </div>
            </>
          ) : null}
        </div>

        {/* 오른쪽: 타이머 뱃지 */}
        {gacha.start && gacha.end ? (
          <TimerBadge start={gacha.start} end={gacha.end} />
        ) : null}
      </div>

        {gachaNoteRest ? (
          <div className="mt-15 text-xs text-zinc-500 text-right">
            {gachaNoteRest}
          </div>
        ) : null}
      </div>
  );
}