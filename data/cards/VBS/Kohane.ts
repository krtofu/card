import { defineCharacterCards } from "../template"; // 경로가 다르면 수정해 주세요!

// 🎤 Vivid BAD SQUAD (비배스) 코하네
// -> 얼굴 아이콘: Kohane.png 자동 매핑
const KohaneVbs = defineCharacterCards("비배스", "아즈사와 코하네", "vbs", "Kohane", {
  cards: [

  ]
});

// 🌟 코하네 카드를 배열로 내보내기!
export const KohaneCards = [
  ...KohaneVbs,
];