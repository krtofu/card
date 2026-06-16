/* ---------- Core Types ---------- */

import type { VirtualSinger, UnitName } from "./colors";

export type GachaType = "통상" | "한정" | "페스" | "월링" | "콜라보";
export type Region = "한섭" | "일섭";

export type WorldLinkBase =
  | { kind: "character"; value: VirtualSinger }
  | { kind: "unit"; value: UnitName };

/**
 * ✅ 옵션 A 핵심:
 * - tags: 화면에 띄울 "뱃지 종류/키" 목록
 * - badgeHints: 그 뱃지의 "이번 가챠에서의 의미"를 적는 곳(선택)
 * - tagTooltips: 원하는 태그에 대해 툴팁을 직접 덮어쓰는 곳(선택)
 */
export type BadgeHints = {
  /** 단일 유닛 뱃지에 대한 '이번 가챠 구성원' 텍스트 */
  unit?: Partial<Record<UnitName, string>>;

  /** 스까(합동) 태그(예: "원더쇼+모모점")에 대한 표시 텍스트 */
  mix?: Partial<Record<string, string>>;

  /** 기타 태그(가구/다마고치/n차 등)의 툴팁 텍스트 */
  other?: Partial<Record<string, string>>;
};

export type GachaInfo = {
  type: GachaType;
  title: string;
  period: string;
  status: string;
  image: string;
  note?: string;

  tags?: string[];
  start?: string; // "YYYY-MM-DD"
  end?: string;   // "YYYY-MM-DD"

  /** ✅ 옵션 A: 태그 의미(선택) */
  badgeHints?: BadgeHints;

  /**
   * ✅ (선택) 태그 단위로 툴팁을 직접 덮어쓰기
   * - badgeHints보다 우선순위가 낮게 두고 싶으면(원하면) keywordBadge에서 순서 바꿔도 됨
   */
  tagTooltips?: Partial<Record<string, string>>;

  // ✅ 월링 전용 (선택)
  worldLinkBase?: WorldLinkBase;
};

export type Notice = {
  id: string;
  title: string;
  date: string;
};

/* ---------- Reprints Types ---------- */

export type ReprintItem = { src: string; period?: string };
export type ReprintSectionData = { title: string; items: ReprintItem[] };

// 유저의 커스텀 카드 상태 타입
export type UserCardState = {
  isOwned: boolean;   // 보유 여부
  isTarget: boolean;  // 미래시 가챠 계획용 목표 체크
  masterRank: number; // 🌟 마스터 랭크 (0 ~ 5)
  skillLevel: number; // 🌟 스킬 레벨 (1 ~ 4)
};