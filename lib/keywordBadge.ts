import type { CSSProperties } from "react";
import type { GachaInfo } from "@/lib/types";
import { UNIT_COLORS, COLLAB_COLORS } from "@/lib/colors";
import type { UnitName } from "@/lib/colors";

/* ---------- 속성 아이콘 ---------- */

const ATTR_ICON: Record<string, string> = {
  pure: "/icons/attrs/pure.png",
  happy: "/icons/attrs/happy.png",
  cute: "/icons/attrs/cute.png",
  mysterious: "/icons/attrs/mysterious.png",
  cool: "/icons/attrs/cool.png",
};

/* ---------- 타입 ---------- */

type BadgeResult = {
  label: string;          // 화면 표시(스까는 "스까")
  className: string;
  style?: CSSProperties;
  iconSrc?: string;       // 속성 아이콘 경로(아이콘만 띄우는 용도)
  tooltip?: string;       // 커스텀 말풍선에 띄울 텍스트
};

/* ---------- 타입가드 ---------- */

const isUnitTag = (tag: string): tag is UnitName => tag in UNIT_COLORS;

/* ---------- 안전 접근 ---------- */

const getUnitColor = (tag: string): string | undefined =>
  (UNIT_COLORS as Record<string, string>)[tag];

const getAttrIcon = (tag: string): string | undefined =>
  ATTR_ICON[tag];

/* ---------- tooltip resolver (옵션 A) ---------- */

function resolveTooltip(tag: string, gacha?: GachaInfo): string | undefined {
  if (!gacha) return undefined;

  // 1) badgeHints (옵션 A): 가장 우선
  const hints = gacha.badgeHints;

  // 스까: mix에서 찾기
  if (tag.includes("+")) {
    const mix = hints?.mix?.[tag];
    if (mix) return mix;
  }

  // 단일 유닛: unit에서 찾기
  if (isUnitTag(tag)) {
    const unit = hints?.unit?.[tag];
    if (unit) return unit;
  }

  // 기타: other에서 찾기
  const other = hints?.other?.[tag];
  if (other) return other;

  // 2) tagTooltips (선택): 다음 우선
  const tt = gacha.tagTooltips?.[tag];
  if (tt) return tt;

  // 3) fallback: 스까는 유닛명 기본 표기
  if (tag.includes("+")) {
    const units = tag.split("+").filter(Boolean);
    if (units.length >= 2) return units.join(" ⨯ ");
  }

  return undefined;
}

/* ---------- 핵심 ---------- */

export function getKeywordBadgeStyle(tag: string, gacha?: GachaInfo): BadgeResult {
  // 1) 속성(아이콘만)
  const attrIcon = getAttrIcon(tag);
  if (attrIcon) {
    return {
      label: tag,
      tooltip: tag,
      iconSrc: attrIcon,
      className: "inline-flex items-center font-semibold justify-center",
    };
  }

  // 2) 단일 유닛
  if (isUnitTag(tag)) {
    const color = UNIT_COLORS[tag];
    return {
      label: tag,
      tooltip: resolveTooltip(tag, gacha),
      className:
        "inline-flex items-center rounded-full border px-3.5 py-1.5 text-xs font-semibold text-white",
      style: {
        backgroundColor: color,
        borderColor: "rgba(255,255,255,0.35)",
        backgroundImage:
          "linear-gradient(180deg, rgba(255,255,255,0.18), rgba(255,255,255,0) 55%)",
        // 🌟 [변경] 선명한 테두리 대신, 배경색과 자연스럽게 겹쳐서 '더 진한 배경색'처럼 느껴지게 만드는 미세 음영 조합
        textShadow: "0px 1px 2px rgba(24, 24, 27, 0.5), 0px 0px 3px rgba(24, 24, 27, 0.2)",
      },
    };
  }

  // 3) 스까(합동)
  if (tag.includes("+")) {
    const units = tag.split("+").filter(isUnitTag);
    const colors = units.map((u) => UNIT_COLORS[u]);

    if (colors.length >= 2) {
      return {
        label: "스까",
        tooltip: resolveTooltip(tag, gacha),
        className:
          "inline-flex items-center rounded-full border px-3.5 py-1.5 text-xs font-semibold text-white",
        style: {
          background: `linear-gradient(90deg, ${colors.join(", ")})`,
          borderColor: "rgba(255,255,255,0.35)",
          // 🌟 스까 그라데이션 뱃지에도 동일하게 부드러운 자연 음영 적용
          textShadow: "0px 1px 2px rgba(24, 24, 27, 0.5), 0px 0px 3px rgba(24, 24, 27, 0.2)",
        },
      };
    }
  }

  // 3.5) 다마고치(콜라보 스타일)
  if (tag === "다마고치") {
    const c = COLLAB_COLORS.다마고치;
    return {
      label: tag,
      tooltip: resolveTooltip(tag, gacha),
      className:
        "relative inline-flex items-center rounded-full border px-3.5 py-1.5 text-xs font-semibold overflow-visible",
      style: {
        background: `
          linear-gradient(
            to bottom,
            rgba(255,255,255,0.35) 0%,
            rgba(255,255,255,0.15) 15%,
            rgba(255,255,255,0.0) 40%
          ),
          ${c.bg}
        `,
        borderColor: c.border,
        color: c.text,
      },
    };
  }

  // 3.5) 산리오(콜라보)
  if (tag === "산리오") {
    const c = COLLAB_COLORS.산리오;
    return {
      label: tag,
      tooltip: resolveTooltip(tag, gacha),
      className:
        "relative inline-flex items-center rounded-full border px-3.5 py-1.5 text-xs font-semibold overflow-visible",
      style: {
        background: `
          linear-gradient(
            to bottom,
            rgba(255,255,255,0.35) 0%,
            rgba(255,255,255,0.15) 15%,
            rgba(255,255,255,0.0) 40%
          ),
          ${c.bg}
        `,
        borderColor: c.border,
        color: c.text,
      },
    };
  }

  // 4) 기타 키워드 (가구/n차 등) → tooltip도 resolveTooltip로 받음
  return {
    label: tag,
    tooltip: resolveTooltip(tag, gacha),
    className:
      "inline-flex items-center rounded-full border border-white/20 bg-white/10 px-3.5 py-1.5 text-xs font-semibold text-zinc-100",
  };
}

/* ---------- 정렬 우선순위 ---------- */

export function getKeywordRank(tag: string): number {
  // 0: 유닛 단일/스까
  if (getUnitColor(tag)) return 0;
  if (tag.includes("+") || tag.includes("⨯") || tag.includes("×")) return 0;

  // 2: 속성
  if (getAttrIcon(tag)) return 2;

  // 1: 기타
  return 1;
}