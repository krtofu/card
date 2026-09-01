import { defineCharacterCards } from "../template"; // 경로가 다르면 수정해 주세요!

// 🍑 MORE MORE JUMP! (모모점) 아이리
// -> 얼굴 아이콘: Airi.png 자동 매핑
const AiriMMJ = defineCharacterCards("모모점", "모모이 아이리", "MMJ", "Airi", {
  cards: [

  ]
});

// 🌟 아이리 카드를 배열로 내보내기!
export const AiriCards = [
  ...AiriMMJ,
];