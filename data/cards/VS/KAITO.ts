import { defineCharacterCards } from "../template"; // 경로가 다르면 수정해 주세요!

// 🎵 1. 오리지널 (무소속 / VIRTUAL SINGER) 카이토
// -> 얼굴 아이콘: KAITO_0.png 자동 매핑
const KAITOOriginal = defineCharacterCards("버싱", "카이토", "VS", "KAITO", {
  cards: [
    // 👉 여기에 만능 스니펫(sekai)을 치고 번호순으로 쭉쭉 추가하세요!
    
  ]
});

// 🎸 2. Leo/need (레오니) 카이토
// -> 얼굴 아이콘: KAITO_l.png 자동 매핑
const KAITOLeoneed = defineCharacterCards("레오니", "카이토", "VS", "KAITO", {
  cards: [

  ]
});

// ☘️ 3. MORE MORE JUMP! (모모점) 카이토
// -> 얼굴 아이콘: KAITO_m.png 자동 매핑
const KAITOMmj = defineCharacterCards("모모점", "카이토", "VS", "KAITO", {
  cards: [

  ]
});

// 🎤 4. Vivid BAD SQUAD (비배스) 카이토
// -> 얼굴 아이콘: KAITO_v.png 자동 매핑
const KAITOVbs = defineCharacterCards("비배스", "카이토", "VS", "KAITO", {
  cards: [

  ]
});

// 🎪 5. Wonderlands×Showtime (원더쇼) 카이토
// -> 얼굴 아이콘: KAITO_w.png 자동 매핑
const KAITOWxs = defineCharacterCards("원더쇼", "카이토", "VS", "KAITO", {
  cards: [
        {
          info: {
            id: "VS_KAITO_001",
            cardName: "[헤매는 아이들의 말 상대]",
            attribute: "happy",
            gachaType: "통상",
            gachaPoolName: "젠틀★포테이토 스타 뽑기",
            eventName: "전력! 원더 핼러윈!",
            skillType: "퍼스업",
            releaseDate: "2022-06-06",
          },
          media: {
            gachaBannerPath: "/gachas/22y/banner_22_04_w.png",
            eventBannerPath: "/events/22y/banner_22_03_w.png",
            songName: "potato가 되어가",
            songJacketPath: "/jacket/22y/Becoming_Potatoes.png",
          },
        },

  ]
});

// 🎧 6. 25시, 나이트코드에서. (니고) 카이토
// -> 얼굴 아이콘: KAITO_n.png 자동 매핑
const KAITONiigo = defineCharacterCards("니고", "카이토", "VS", "KAITO", {
  cards: [

  ]
});

// 🌟 카이토 카드를 배열로 싹 다 통합해서 내보내기!
export const KAITOCards = [
  ...KAITOOriginal,
  ...KAITOLeoneed,
  ...KAITOMmj,
  ...KAITOVbs,
  ...KAITOWxs,
  ...KAITONiigo,
];