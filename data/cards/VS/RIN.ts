import { defineCharacterCards } from "../template";

// 🎵 1. 오리지널 (무소속 / VIRTUAL SINGER) 린
// -> 얼굴 아이콘: RIN_0.png 자동 매핑
const RinOriginal = defineCharacterCards("버싱", "카가미네 린", "VS", "RIN", {
  cards: [
    // 👉 여기에 sekai 스니펫을 치고 번호순(001, 002...)으로 쭉쭉 추가하세요!
    
  ]
});

// 🎸 2. Leo/need (레오니) 린
// -> 얼굴 아이콘: RIN_l.png 자동 매핑
const RinLeoneed = defineCharacterCards("레오니", "카가미네 린", "VS", "RIN", {
  cards: [

  ]
});

// ☘️ 3. MORE MORE JUMP! (모모점) 린
// -> 얼굴 아이콘: RIN_m.png 자동 매핑
const RinMmj = defineCharacterCards("모모점", "카가미네 린", "VS", "RIN", {
  cards: [

  ]
});

// 🎤 4. Vivid BAD SQUAD (비배스) 린
// -> 얼굴 아이콘: RIN_v.png 자동 매핑
const RinVbs = defineCharacterCards("비배스", "카가미네 린", "VS", "RIN", {
  cards: [
        {
          info: {
            id: "VS_RIN_001",
            cardName: "[아웅다웅 히트 업]",
            attribute: "pure",
            gachaType: "통상",
            gachaPoolName: "서비스 시작 기념 뽑기",
            skillType: "판강",
            releaseDate: "2022-05-20",
          },
          media: {
            gachaBannerPath: "/gachas/22y/banner_22_1.png",
          },
          costume: {
            hasCostume: true,
            costumeName: "액티브 스트리트",
          },
        },

  ]
});

// 🎪 5. Wonderlands×Showtime (원더쇼) 린
// -> 얼굴 아이콘: RIN_w.png 자동 매핑
const RinWxs = defineCharacterCards("원더쇼", "카가미네 린", "VS", "RIN", {
  cards: [

  ]
});

// 🎧 6. 25시, 나이트코드에서. (니고) 린
// -> 얼굴 아이콘: RIN_n.png 자동 매핑
const RinNigo = defineCharacterCards("니고", "카가미네 린", "VS", "RIN", {
  cards: [

  ]
});

// 🌟 7. 모든 린 카드를 하나의 배열로 싹 다 통합해서 내보내기!
export const RinCards = [
  ...RinOriginal,
  ...RinLeoneed,
  ...RinMmj,
  ...RinVbs,
  ...RinWxs,
  ...RinNigo,
];