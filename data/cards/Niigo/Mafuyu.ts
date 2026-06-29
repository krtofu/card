import { defineCharacterCards } from "../template"; // 경로가 다르면 수정해 주세요!

// 🎧 25시, 나이트코드에서. (니고) 마후유
// -> 얼굴 아이콘: Mafuyu.png 자동 매핑
const MafuyuNiigo = defineCharacterCards("니고", "아사히나 마후유", "ng", "Mafuyu", {
  cards: [
        {
          info: {
            id: "ng_Mafuyu_001",
            cardName: "[얽매인 매스커레이드]",
            attribute: "cool",
            gachaType: "통상",
            gachaPoolName: "인형들의 무도회 뽑기",
            eventName: "사로잡힌 마리오네트",
            skillType: "판강",
            releaseDate: "2022-05-29",
          },
          media: {
            gachaBannerPath: "/gachas/22y/banner_22_03_n.png",
            eventBannerPath: "/events/22y/banner_22_02_n.png",
            songName: "잭팟 새드 걸",
            songJacketPath: "/jacket/22y/Jack_Pot_Sad_Girl.png",
          },
          costume: {
            hasCostume: true,
            costumeName: "매스커레이드 돌",
          },
        },
    
  ]
});

// 🌟 마후유 카드를 배열로 내보내기!
export const MafuyuCards = [
  ...MafuyuNiigo,
];