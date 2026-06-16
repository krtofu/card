"use client";

import { type Notice } from "@/lib/types";

export default function NoticePanel({ notices }: { notices: Notice[] }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
      <div className="flex items-end justify-between">
        <div className="text-lg font-bold">공지사항</div>
        <div className="text-xs text-zinc-500">Sekard / 두부도감</div>
      </div>

      <ul className="mt-3 space-y-2 text-sm text-zinc-300">
        {notices.map((n) => (
          <li
            key={n.id}
            className="flex items-center justify-between rounded-xl border border-white/10 bg-zinc-900/30 p-3"
          >
            <span className="truncate">{n.title}</span>
            <span className="ml-3 shrink-0 text-xs text-zinc-500">{n.date}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}