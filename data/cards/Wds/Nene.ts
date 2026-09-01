import { defineCharacterCards } from "../template"; // 경로가 다르면 수정해 주세요!

// 🎪 Wonderlands×Showtime (원더쇼) 네네
// -> 얼굴 아이콘: Nene.png 자동 매핑
const NeneWds = defineCharacterCards("원더쇼", "쿠사나기 네네", "Wds", "Nene", {
  cards: [

  ]
});

// 🌟 네네 카드를 배열로 내보내기!
export const NeneCards = [
  ...NeneWds,
];