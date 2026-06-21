import { defineCharacterCards } from "../template";

// 🎵 1. 오리지널 (무소속 / VIRTUAL SINGER) 미쿠
// -> 얼굴 아이콘: MIKU_0.png 자동 매핑
const MikuOriginal = defineCharacterCards("버싱", "하츠네 미쿠", "VS", "MIKU", {
  normal: [
    // 예시: { info: { id: "vs_Miku_001", cardName: "...", ... releaseDate: "YYYY-MM-DD" } }
  ],
  limited: [],
  fes: []
});

// 🎸 2. Leo/need (레오니) 미쿠
// -> 얼굴 아이콘: MIKU_l.png 자동 매핑
const MikuLeoneed = defineCharacterCards("레오니", "하츠네 미쿠", "VS", "MIKU", {
  normal: [],
  limited: [],
  fes: []
});

// ☘️ 3. MORE MORE JUMP! (모모점) 미쿠
// -> 얼굴 아이콘: MIKU_m.png 자동 매핑
const MikuMmj = defineCharacterCards("모모점", "하츠네 미쿠", "VS", "MIKU", {
  normal: [
    {
        info: {
          id: "VS_MIKU_001",
          cardName: "[새 스테이지 의상]",
          attribute: "cute",
          gachaType: "통상",
          gachaPoolName: "서비스 시작 기념 뽑기",
          eventName: "",
          skillType: "힐",
          releaseDate: "2022-05-20",
        },
        media: {
          gachaBannerPath: "/gachas/22y/banner_22_01.png",
        },
        costume: {
          hasCostume: true,
          costumeName: "트윙클 사운드",
        },
      },
  ],
  limited: [],
  fes: []
});

// 🎤 4. Vivid BAD SQUAD (비배스) 미쿠
// -> 얼굴 아이콘: MIKU_v.png 자동 매핑
const MikuVbs = defineCharacterCards("비배스", "하츠네 미쿠", "VS", "MIKU", {
  normal: [],
  limited: [],
  fes: []
});

// 🎪 5. Wonderlands×Showtime (원더쇼) 미쿠
// -> 얼굴 아이콘: MIKU_w.png 자동 매핑
const MikuWxs = defineCharacterCards("원더쇼", "하츠네 미쿠", "VS", "MIKU", {
  normal: [],
  limited: [],
  fes: []
});

// 🎧 6. 25시, 나이트코드에서. (니고) 미쿠
// -> 얼굴 아이콘: MIKU_n.png 자동 매핑
const MikuNigo = defineCharacterCards("니고", "하츠네 미쿠", "VS", "MIKU", {
  normal: [],
  limited: [],
  fes: []
});

// 🌟 7. 모든 미쿠 카드를 하나의 배열로 싹 다 통합해서 내보내기!
export const MikuCards = [
  ...MikuOriginal,
  ...MikuLeoneed,
  ...MikuMmj,
  ...MikuVbs,
  ...MikuWxs,
  ...MikuNigo,
];