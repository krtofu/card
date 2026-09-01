import { defineCharacterCards } from "../template"; // 경로가 다르면 수정해 주세요!

// 🐧 MORE MORE JUMP! (모모점) 하루카
// -> 얼굴 아이콘: Haruka.png 자동 매핑
const HarukaMMJ = defineCharacterCards("모모점", "키리타니 하루카", "MMJ", "Haruka", {
  cards: [

  ]
});

// 🌟 하루카 카드를 배열로 내보내기!
export const HarukaCards = [
  ...HarukaMMJ,
];