import { defineCharacterCards } from "../template"; // 경로가 다르면 수정해 주세요!

// 🎸 Leo/need (레오니) 호나미
// -> 얼굴 아이콘: Honami.png 자동 매핑
const HonamiLn = defineCharacterCards("레오니", "모치즈키 호나미", "ln", "Honami", {
  cards: [

  ]
});

// 🌟 호나미 카드를 배열로 내보내기!
export const HonamiCards = [
  ...HonamiLn,
];