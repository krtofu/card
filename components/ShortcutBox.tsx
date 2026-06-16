"use client";

import { Globe, Youtube, Twitter } from "lucide-react";

import { type Region } from "@/lib/types";

export default function ShortcutBox({
  region,
  onToggle,
}: {
  region: Region;
  onToggle: () => void;
}) {
  type LinkKind = "yt" | "x" | "web";

  const LINKS: Record<
    Region,
    { label: string; href: string; Icon: any; kind: LinkKind }[]
  > = {
    한섭: [
      {
        label: "공식 유튜브",
        href: "https://www.youtube.com/@kr_pjsekai",
        Icon: Youtube,
        kind: "yt",
      },
      {
        label: "공식 X",
        href: "https://x.com/kr_pjsekai?s=20",
        Icon: Twitter,
        kind: "x",
      },
      {
        label: "공홈",
        href: "https://www.kr-pjsekai.com/",
        Icon: Globe,
        kind: "web",
      },
    ],
    일섭: [
      {
        label: "공식 유튜브",
        href: "https://www.youtube.com/@pj_sekai_colorfulstage",
        Icon: Youtube,
        kind: "yt",
      },
      {
        label: "공식 X",
        href: "https://x.com/pj_sekai?s=20",
        Icon: Twitter,
        kind: "x",
      },
      {
        label: "공홈",
        href: "https://pjsekai.sega.jp/",
        Icon: Globe,
        kind: "web",
      },
    ],
  };

  const items = LINKS[region];

  return (
    <>
      <div
        key={region}
        className="mt-2 mt-auto flex flex-col items-end gap-2 self-end pr-0 animate-[fadeIn_220ms_ease-out]"
      >
        <button
          type="button"
          onClick={onToggle}
          className={
            "mb-3 -translate-y-1 self-end rounded-full border px-3 py-1 text-xs font-semibold " +
            "transition-colors duration-300 ease-out " +
            (region === "한섭"
              ? "border-sky-400/40 bg-sky-400/15 text-sky-200 hover:bg-sky-400/20"
              : "border-rose-400/40 bg-rose-400/15 text-rose-200 hover:bg-rose-400/20")
          }
        >
          {region}
        </button>

        {items.map(({ label, href, Icon, kind }) => {
          const ring =
            region === "한섭"
              ? "ring-1 ring-sky-400/25 hover:ring-sky-300/35"
              : "ring-1 ring-rose-400/25 hover:ring-rose-300/35";

          const palette =
            kind === "yt"
              ? {
                  btn: "border-red-400/25 bg-red-400/10 hover:bg-red-400/15",
                  icon: "text-red-200 group-hover:text-red-100",
                  glow:
                    "hover:shadow-[0_0_0_1px_rgba(248,113,113,0.18),0_0_18px_rgba(248,113,113,0.10)]",
                }
              : kind === "x"
              ? {
                  btn: "border-white/10 bg-zinc-900/40 hover:bg-white/10",
                  icon: "text-zinc-200 group-hover:text-white",
                  glow:
                    "hover:shadow-[0_0_0_1px_rgba(255,255,255,0.12),0_0_18px_rgba(255,255,255,0.06)]",
                }
              : {
                  btn: "border-violet-400/25 bg-violet-400/10 hover:bg-violet-400/15",
                  icon: "text-violet-200 group-hover:text-violet-100",
                  glow:
                    "hover:shadow-[0_0_0_1px_rgba(167,139,250,0.18),0_0_18px_rgba(167,139,250,0.10)]",
                };

          return (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noreferrer"
              aria-label={label}
              className={
                "group relative flex h-11 w-11 items-center justify-center rounded-full border transition " +
                ring +
                " " +
                palette.btn +
                " " +
                palette.glow
              }
            >
              <Icon className={"h-5 w-5 transition " + palette.icon} />

              {/* 말풍선 tooltip */}
              <span
                className="
                  pointer-events-none absolute right-full top-1/2 -translate-y-1/2
                  mr-3 whitespace-nowrap
                  rounded-lg border border-white/10 bg-zinc-950/90 px-2 py-1
                  text-[11px] text-zinc-100 shadow-lg
                  opacity-0 translate-x-1
                  transition-all duration-150
                  group-hover:opacity-100 group-hover:translate-x-0
                "
              >
                {label}
                <span
                  className="
                    absolute left-full top-1/2 -translate-y-1/2
                    h-2 w-2 rotate-45
                    border-r border-t border-white/10
                    bg-zinc-950/90
                  "
                />
              </span>
            </a>
          );
        })}
      </div>

      <div className="text-[10px] text-zinc-500">
        서버 아이콘을 누르면 서버 변경이 가능합니다.
      </div>
    </>
  );
}