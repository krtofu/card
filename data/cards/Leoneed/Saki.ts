import { defineCharacterCards } from "../template"; // Leoneed 폴더 위치에 맞게 ../ 혹은 ../../ 로 경로를 맞춰주세요!

// 🎸 Leo/need (레오니) 사키
// -> 얼굴 아이콘: Saki.png 자동 매핑
const SakiLeoneed = defineCharacterCards("레오니", "텐마 사키", "ln", "Saki", {
  cards: [
        {
          info: {
            id: "ln_Saki_001",
            cardName: "[레이니 디스턴스]",
            attribute: "mysterious",
            gachaType: "통상",
            gachaPoolName: "별 내리는 밤하늘의 추억 뽑기",
            eventName: "비 갠 뒤 첫 번째 별",
            skillType: "스업",
            releaseDate: "2022-05-21",
          },
          media: {
            gachaBannerPath: "/gachas/22y/banner_22_02_l.png",
            eventBannerPath: "/events/22y/banner_22_01_l.png",
            songName: "스텔라",
            songJacketPath: "/jacket/22y/Stella.png",
          },
          costume: {
            hasCostume: true,
            costumeName: "스텔라 록",
          },
        },
    
  ]
});

// 🌟 사키 카드를 배열로 내보내기!
export const SakiCards = [
  ...SakiLeoneed,
];