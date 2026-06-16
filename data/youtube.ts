import { type Region } from "@/lib/types";

export const YT_IDS: Record<Region, string> = {
  한섭: "73z9ZsDK4co",
  일섭: "pWc8oCbtGKc",
};

export const YT_META: Record<
  Region,
  { header?: string; title: string; subtitle?: string; credits?: string }
> = {
  한섭: {
    header: "ヘイヴン",
    title: "헤이븐",
    subtitle: "〈 Time to take off! 〉",
    credits: "작사·작곡 - 니루 카지츠",
  },
  일섭: {
    header: "こうふくけい(幸福刑)",
    title: "행복형(幸福刑)",
    subtitle: "〈 깨지 않는 환상을 노크하며 〉",
    credits: "작사·작곡 - LonePi",
  },
};