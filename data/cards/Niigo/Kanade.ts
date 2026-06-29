import { defineCharacterCards } from "../template"; // 경로가 다르면 수정해 주세요!

// 🎧 25시, 나이트코드에서. (니고) 카나데
// -> 얼굴 아이콘: Kanade.png 자동 매핑
const KanadeNiigo = defineCharacterCards("니고", "요이사키 카나데", "Niigo", "Kanade", {
  cards: [
        {
          info: {
            id: "ng_Kanade_001",
            cardName: "[살아 있는 것처럼]",
            attribute: "cool",
            gachaType: "통상",
            gachaPoolName: "인형들의 무도회 뽑기",
            eventName: "사로잡힌 마리오네트",
            skillType: "스업",
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
            costumeName: "마스크 오브 티어",
          },
        },
    
  ]
});

// 🌟 카나데 카드를 배열로 내보내기!
export const KanadeCards = [
  ...KanadeNiigo,
];