import { defineCharacterCards } from "../template"; // 경로에 맞게 ../ 혹은 ../../ 로 맞춰주세요!

// 🎪 Wonderlands×Showtime (원더쇼) 츠카사
// -> 얼굴 아이콘: Tsukasa.png 자동 매핑
const TsukasaWxs = defineCharacterCards("원더쇼", "텐마 츠카사", "Wds", "Tsukasa", {
  cards: [
        {
          info: {
            id: "wds_Tsukasa_001",
            cardName: "[조마조마?! 좀비 패닉!]",
            attribute: "happy",
            gachaType: "통상",
            gachaPoolName: "젠틀★포테이토 스타 뽑기",
            eventName: "전력! 원더 핼러윈!",
            skillType: "힐",
            releaseDate: "2022-06-06",
          },
          media: {
            gachaBannerPath: "/gachas/22y/banner_22_04_w.png",
            eventBannerPath: "/events/22y/banner_22_03_w.png",
            songName: "potato가 되어가",
            songJacketPath: "/jacket/22y/Becoming_Potatoes.png",
          },
          costume: {
            hasCostume: true,
            costumeName: "더 포멀 스타",
          },
        },
    
  ]
});

// 🌟 츠카사 카드를 배열로 내보내기!
export const TsukasaCards = [
  ...TsukasaWxs,
];