"use client";

function parseAnyDate(s: string) {
  // 허용: "2026-01-21" / "26.01.21" / "2026.01.21"
  const v = s.trim();

  // YYYY-MM-DD
  if (/^\d{4}-\d{2}-\d{2}$/.test(v)) {
    const [y, m, d] = v.split("-").map(Number);
    return new Date(y, m - 1, d);
  }

  // YY.MM.DD or YYYY.MM.DD
  if (/^\d{2,4}\.\d{2}\.\d{2}$/.test(v)) {
    const [yy, mm, dd] = v.split(".").map(Number);
    const y = yy < 100 ? 2000 + yy : yy;
    return new Date(y, mm - 1, dd);
  }

  // fallback (가능하면 위 포맷 쓰세요)
  return new Date(v);
}

export default function TimerBadge({ start, end }: { start: string; end: string }) {
  const today = new Date();
  const startDate = parseAnyDate(start);
  const endDate = parseAnyDate(end);

  // 날짜만 비교
  today.setHours(0, 0, 0, 0);
  startDate.setHours(0, 0, 0, 0);
  endDate.setHours(0, 0, 0, 0);

  const msDay = 1000 * 60 * 60 * 24;

  // 아직 시작 전: 시작일까지 남은 일수
  if (today < startDate) {
    const diffToStart = Math.ceil((startDate.getTime() - today.getTime()) / msDay);
    return (
      <span className="shrink-0 rounded-full bg-zinc-600 px-3 py-1 text-xs font-semibold text-zinc-100">
        {diffToStart}일 남음
      </span>
    );
  }

  // 종료 후
  if (today > endDate) {
    return (
      <span className="shrink-0 rounded-full bg-zinc-800 px-3 py-1 text-xs font-semibold text-zinc-300">
        종료됨
      </span>
    );
  }

  // 종료일 당일
  if (today.getTime() === endDate.getTime()) {
    return (
      <span className="shrink-0 rounded-full bg-red-600 px-3 py-1 text-xs font-semibold text-white">
        금일 종료
      </span>
    );
  }

  // 진행중(종료 전날까지)
  return (
    <span className="shrink-0 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-zinc-900">
      진행중
    </span>
  );
}