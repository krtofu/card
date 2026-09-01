import { defineCharacterCards } from "../template"; // 경로가 다르면 수정해 주세요!

// 💧 MORE MORE JUMP! (모모점) 시즈쿠
// -> 얼굴 아이콘: Shizuku.png 자동 매핑
const ShizukuMMJ = defineCharacterCards("모모점", "히노모리 시즈쿠", "MMJ", "Shizuku", {
  cards: [

  ]
});

// 🌟 시즈쿠 카드를 배열로 내보내기!
export const ShizukuCards = [
  ...ShizukuMMJ,
];