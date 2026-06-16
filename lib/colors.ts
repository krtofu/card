export const UNIT_COLORS = {
  버싱: "#2ED7E1",
  레오니: "#4455DD",
  모모점: "#88DD44",
  비배스: "#EE1166",
  원더쇼: "#FF9900",
  니고: "#884499",
} as const;

export type UnitName = keyof typeof UNIT_COLORS;

/* 버싱 */
export const VIRTUAL_SINGER_COLORS = {
  "하츠네 미쿠": "#39C5BB",
  "카가미네 린": "#FFA500",
  "카가미네 렌": "#FFE211",
  "메구리네 루카": "#FFC0CB",
  "메이코": "#D80000",
  "카이토": "#3468CD",
} as const;

export type VirtualSinger = keyof typeof VIRTUAL_SINGER_COLORS;

/* 레오니 */
export const LEONEED_COLORS = {
  "호시노 이치카": "#33AAEE",
  "텐마 사키": "#FFDD44",
  "모치즈키 호나미": "#EE6666",
  "히노모리 시호": "#BBDD22",
} as const;

export type Leoneed = keyof typeof LEONEED_COLORS;

/* 모모점 */
export const MORE_MORE_JUMP_COLORS = {
  "하나사토 미노리": "#FFCCAA",
  "키리타니 하루카": "#99CCFF",
  "모모이 아이리": "#FFAACC",
  "히노모리 시즈쿠": "#99EEDD",
} as const;

export type MoreMoreJump = keyof typeof MORE_MORE_JUMP_COLORS;

/* 비배스 */
export const VIVID_BAD_SQUAD_COLORS = {
  "아즈사와 코하네": "#FF6699",
  "시라이시 안": "#00BBDD",
  "시노노메 아키토": "#FF7722",
  "아오야기 토우야": "#0077DD",
} as const;

export type VividBadSquad = keyof typeof VIVID_BAD_SQUAD_COLORS;

/* 원더쇼 */
export const WONDERLANDXSHOWTIME_COLORS = {
  "텐마 츠카사": "#FFBB00",
  "오오토리 에무": "#FF66BB",
  "쿠사나기 네네": "#33DD99",
  "카미시로 루이": "#BB88EE",
} as const;

export type WonderlandxShowtime = keyof typeof WONDERLANDXSHOWTIME_COLORS;

/* 니고 */
export const NIGHTCORD_COLORS = {
  "요이사키 카나데": "#BB6688",
  "아사히나 마후유": "#8888CC",
  "시노노메 에나": "#CCAA88",
  "아키야마 미즈키": "#DDAACC",
} as const;

export type Nightcord = keyof typeof NIGHTCORD_COLORS;

/* 전체 캐릭터 컬러(찾기용 단일 맵) */
export const CHARACTER_COLORS = {
  ...VIRTUAL_SINGER_COLORS,
  ...LEONEED_COLORS,
  ...MORE_MORE_JUMP_COLORS,
  ...VIVID_BAD_SQUAD_COLORS,
  ...WONDERLANDXSHOWTIME_COLORS,
  ...NIGHTCORD_COLORS,
} as const;

export type CharacterName = keyof typeof CHARACTER_COLORS;

export const COLLAB_COLORS = {
  다마고치: {
    bg: "#2F7DBF",
    border: "#BFEFFF",
    text: "#FFFFFF",
  },

  산리오: {
    bg: "#F05A86",      //  Hello 핑크(추천 값)
    border: "#FFD0DF",  //  밝은 테두리
    text: "#FFF7FB",    //  밝은 글씨(크림화이트)
  },
} as const;