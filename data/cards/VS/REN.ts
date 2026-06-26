import { defineCharacterCards } from "../template"; // 경로가 다르면 수정해 주세요!

// 🎵 1. 오리지널 (무소속 / VIRTUAL SINGER) 렌
// -> 얼굴 아이콘: REN_0.png 자동 매핑
const RenOriginal = defineCharacterCards("버싱", "카가미네 렌", "VS", "REN", {
  cards: [
    // 👉 여기에 만능 스니펫(sekai)을 치고 번호순으로 쭉쭉 추가하세요!
    
  ]
});

// 🎸 2. Leo/need (레오니) 렌
// -> 얼굴 아이콘: REN_l.png 자동 매핑
const RenLeoneed = defineCharacterCards("레오니", "카가미네 렌", "VS", "REN", {
  cards: [

  ]
});

// ☘️ 3. MORE MORE JUMP! (모모점) 렌
// -> 얼굴 아이콘: REN_m.png 자동 매핑
const RenMmj = defineCharacterCards("모모점", "카가미네 렌", "VS", "REN", {
  cards: [

  ]
});

// 🎤 4. Vivid BAD SQUAD (비배스) 렌
// -> 얼굴 아이콘: REN_v.png 자동 매핑
const RenVbs = defineCharacterCards("비배스", "카가미네 렌", "VS", "REN", {
  cards: [

  ]
});

// 🎪 5. Wonderlands×Showtime (원더쇼) 렌
// -> 얼굴 아이콘: REN_w.png 자동 매핑
const RenWxs = defineCharacterCards("원더쇼", "카가미네 렌", "VS", "REN", {
  cards: [
        {
          info: {
            id: "VS_REN_001",
            cardName: "[새로운 단원 등장!]",
            attribute: "cool",
            gachaType: "통상",
            gachaPoolName: "서비스 시작 기념 뽑기",
            skillType: "힐",
            releaseDate: "2022-05-20",
          },
          media: {
            gachaBannerPath: "/gachas/22y/banner_22_01.png",
          },
          costume: {
            hasCostume: true,
            costumeName: "리틀 스타",
          },
        },

  ]
});

// 🎧 6. 25시, 나이트코드에서. (니고) 렌
// -> 얼굴 아이콘: REN_n.png 자동 매핑
const RenNigo = defineCharacterCards("니고", "카가미네 렌", "VS", "REN", {
  cards: [

  ]
});

// 🌟 7. 모든 렌 카드를 하나의 배열로 싹 다 통합해서 내보내기!
export const RenCards = [
  ...RenOriginal,
  ...RenLeoneed,
  ...RenMmj,
  ...RenVbs,
  ...RenWxs,
  ...RenNigo,
];