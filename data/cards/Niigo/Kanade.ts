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
        {
          info: {
            id: "ng_Kanade_002",
            cardName: "[마음을 멜로디로······]",
            attribute: "happy",
            gachaType: "통상",
            gachaPoolName: "빛이 내리쬐는 캔버스 뽑기",
            eventName: "채워지지 않는 페일 컬러",
            skillType: "퍼스업",
            releaseDate: "2022-08-25",
          },
          media: {
            gachaBannerPath: "/gachas/22y/banner_22_14_n.png",
            eventBannerPath: "/events/22y/banner_22_13_n.png",
            songName: "끝없이 잿빛으로",
            songJacketPath: "/jacket/22y/Close_to_Gray.png",
          },
        },
        {
          info: {
            id: "ng_Kanade_003",
            cardName: "[언젠가 꿨던 꿈을]",
            attribute: "mysterious",
            gachaType: "페스",
            gachaPoolName: "[200만 명 돌파 기념] 컬러풀 페스티벌 뽑기",
            skillType: "체스업",
            releaseDate: "2022-09-30",
          },
          media: {
            gachaBannerPath: "/gachas/22y/banner_22_f01.png",
          },
          costume: {
            hasCostume: true,
            costumeName: "레퀴엠 나이트",
            hasHair: true,
          },
        },
  ]
});

// 🌟 카나데 카드를 배열로 내보내기!
export const KanadeCards = [
  ...KanadeNiigo,
];