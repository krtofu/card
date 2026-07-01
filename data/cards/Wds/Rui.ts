import { defineCharacterCards } from "../template"; // 경로에 맞게 ../ 혹은 ../../ 로 맞춰주세요!

// 🎪 Wonderlands×Showtime (원더쇼) 루이
// -> 얼굴 아이콘: Rui.png 자동 매핑
const RuiWxs = defineCharacterCards("원더쇼", "카미시로 루이", "Wds", "Rui", {
  cards: [
        {
          info: {
            id: "wds_Rui_001",
            cardName: "[뜻밖의 지적]",
            attribute: "happy",
            gachaType: "통상",
            gachaPoolName: "젠틀★포테이토 스타 뽑기",
            eventName: "전력! 원더 핼러윈!",
            skillType: "스업",
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
            costumeName: "마스터 테일코트",
          },
        },
    
  ]
});

// 🌟 루이 카드를 배열로 내보내기!
export const RuiCards = [
  ...RuiWxs,
];