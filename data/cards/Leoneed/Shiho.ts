import { defineCharacterCards } from "../template"; // 경로에 맞게 ../../ 로 맞춰주세요!

// 🎸 Leo/need (레오니) 시호
// -> 얼굴 아이콘: Shiho.png 자동 매핑
const ShihoLeoneed = defineCharacterCards("레오니", "히노모리 시호", "ln", "Shiho", {
  cards: [
        {
          info: {
            id: "ln_Shiho_001",
            cardName: "[깨닫고 싶었던 열기]",
            attribute: "mysterious",
            gachaType: "통상",
            gachaPoolName: "별 내리는 밤하늘의 추억 뽑기",
            eventName: "비 갠 뒤 첫 번째 별",
            skillType: "퍼스업",
            releaseDate: "2022-05-21",
          },
          media: {
            gachaBannerPath: "/gachas/22y/banner_22_02_l.png",
            eventBannerPath: "/events/22y/banner_22_01_l.png",
            songName: "스텔라",
            songJacketPath: "/jacket/22y/Stella.png",
          },
        },
    
  ]
});

// 🌟 시호 카드를 배열로 내보내기!
export const ShihoCards = [
  ...ShihoLeoneed,
];