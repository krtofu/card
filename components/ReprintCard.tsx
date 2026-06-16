"use client";

import { useState } from "react";
import Image from "next/image";

export default function ReprintCard({
  title,
  items,
}: {
  title: string;
  items: { src: string; period?: string }[];
}) {
  const [idx, setIdx] = useState(0);

  const safeItems = items.length
    ? items
    : [{ src: "/reprints/01.jpg", period: undefined }];

  const current = safeItems[idx % safeItems.length];

  const prev = () => setIdx((v) => (v - 1 + safeItems.length) % safeItems.length);
  const next = () => setIdx((v) => (v + 1) % safeItems.length);

  // 기간 파싱 + 상태 계산 (시작 12:00 ~ 종료 11:59)
  const parsePeriod = (period: string) => {
    const [startRaw, endRaw] = period.split("~").map((s) => s.trim());
    if (!startRaw || !endRaw) return null;

    const parseDate = (raw: string, hour: number, minute: number) => {
      const [yy, mm, dd] = raw.split(".").map(Number);
      if (!yy || !mm || !dd) return null;

      const year = yy < 100 ? 2000 + yy : yy;
      return new Date(year, mm - 1, dd, hour, minute, 0, 0);
    };

    const startDate = parseDate(startRaw, 12, 0);
    const endDate = parseDate(endRaw, 11, 59);
    if (!startDate || !endDate) return null;

    const [yy, mm, dd] = endRaw.split(".").map(Number);
    const endYear = yy < 100 ? 2000 + yy : yy;

    return { startDate, endDate, endYear, endMonth: mm - 1, endDay: dd };
  };

  const periodInfo = current.period ? parsePeriod(current.period) : null;
  const now = new Date();

  const isActive =
    !!periodInfo && now >= periodInfo.startDate && now <= periodInfo.endDate;

  const isDeadlineToday =
    !!periodInfo &&
    isActive &&
    now.getFullYear() === periodInfo.endYear &&
    now.getMonth() === periodInfo.endMonth &&
    now.getDate() === periodInfo.endDay;

  return (
    <div>
      <div className="mb-2 text-sm font-semibold text-zinc-200">{title}</div>

      <div className="group relative overflow-hidden rounded-xl border border-white/10 bg-zinc-900/40">
        <div className="relative aspect-[2.35/1] w-full">
          <Image
            src={current.src}
            alt={title}
            fill
            className="object-cover transition-transform duration-300 ease-out group-hover:scale-[1.03]"
            sizes="(max-width: 1024px) 100vw, 50vw"
            priority={false}
          />
        </div>

        {/* 좌측 하단: 기간 뱃지 */}
        {current.period ? (
          <div className="absolute bottom-3 left-3">
            <div
              className={
                "rounded-full border px-3 py-1 text-xs font-semibold backdrop-blur-sm shadow-md " +
                (isDeadlineToday
                  ? "bg-red-600/60 border-red-500/80 text-rose-100"
                  : isActive
                  ? "bg-green-900/70 border-green-700/60 text-green-100"
                  : "bg-black/60 border-white/15 text-white/85")
              }
            >
              {isDeadlineToday ? (
                <span className="font-bold tracking-tight">
                  ⏱ 오늘 11:59 마감
                  <span className="ml-2 font-semibold text-rose-100/80">
                    ({current.period})
                  </span>
                </span>
              ) : (
                <span>⏱ {current.period}</span>
              )}
            </div>
          </div>
        ) : null}

        {/* 화살표 */}
        <button
          onClick={prev}
          aria-label="이전"
          className="
            absolute left-3 top-1/2 -translate-y-1/2
            h-10 w-10 rounded-full
            border border-white/15 bg-black/40 text-white
            backdrop-blur-sm
            opacity-0 pointer-events-none
            transition-all duration-200
            group-hover:opacity-100 group-hover:pointer-events-auto
            hover:bg-black/55
          "
        >
          ◀
        </button>

        <button
          onClick={next}
          aria-label="다음"
          className="
            absolute right-3 top-1/2 -translate-y-1/2
            h-10 w-10 rounded-full
            border border-white/15 bg-black/40 text-white
            backdrop-blur-sm
            opacity-0 pointer-events-none
            transition-all duration-200
            group-hover:opacity-100 group-hover:pointer-events-auto
            hover:bg-black/55
          "
        >
          ▶
        </button>
      </div>
    </div>
  );
}