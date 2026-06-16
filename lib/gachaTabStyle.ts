import type { GachaType } from "@/lib/types";

export const GACHA_TAB_STYLE: Record<GachaType, { active: string; inactive: string }> = {
  통상: {
    active:
      "border-sky-300/45 bg-sky-400/16 text-sky-100 shadow-[0_0_0_1px_rgba(56,189,248,0.18)]",
    inactive:
      "border-white/10 bg-white/0 text-zinc-200 hover:border-sky-300/25 hover:bg-sky-400/8 hover:text-sky-100",
  },
  한정: {
    active:
      "border-pink-300/45 bg-pink-400/16 text-pink-100 shadow-[0_0_0_1px_rgba(236,72,153,0.18)]",
    inactive:
      "border-white/10 bg-white/0 text-zinc-200 hover:border-pink-300/25 hover:bg-pink-400/8 hover:text-pink-100",
  },
  페스: {
    active:
      "border-violet-300/45 bg-violet-400/16 text-violet-100 shadow-[0_0_0_1px_rgba(167,139,250,0.20)]",
    inactive:
      "border-white/10 bg-white/0 text-zinc-200 hover:border-violet-300/25 hover:bg-violet-400/8 hover:text-violet-100",
  },
  월링: {
    active:
      "text-emerald-100",
    inactive:
      "border-white/10 bg-white/0 text-zinc-200 hover:border-emerald-300/25 hover:bg-emerald-400/8 hover:text-emerald-100",
  },
  콜라보: {
    active:
      "border-amber-300/45 bg-amber-400/16 text-amber-100 shadow-[0_0_0_1px_rgba(251,191,36,0.18)]",
    inactive:
      "border-white/10 bg-white/0 text-zinc-200 hover:border-amber-300/25 hover:bg-amber-400/8 hover:text-amber-100",
  },
};