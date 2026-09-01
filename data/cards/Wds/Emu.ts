import { defineCharacterCards } from "../template"; // 경로가 다르면 수정해 주세요!

// 🎪 Wonderlands×Showtime (원더쇼) 에무
// -> 얼굴 아이콘: Emu.png 자동 매핑
const EmuWds = defineCharacterCards("원더쇼", "오오토리 에무", "Wds", "Emu", {
  cards: [
        {
          info: {
            id: "Wds_Emu_001",
            cardName: "[질주! 마지막 주자☆]",
            attribute: "pure",
            gachaType: "통상",
            gachaPoolName: "생기발랄♪ 응원단 뽑기",
            eventName: "달려라! 운동회! ~바쁜 실행 위원~",
            skillType: "힐",
            releaseDate: "2022-06-14",
          },
          media: {
            gachaBannerPath: "/gachas/22y/banner_22_05.png",
            eventBannerPath: "/events/22y/banner_22_04.png",
          },
          costume: {
            hasCostume: true,
            costumeName: "스마일리 옐",
          },
        },

  ]
});

// 🌟 에무 카드를 배열로 내보내기!
export const EmuCards = [
  ...EmuWds,
];